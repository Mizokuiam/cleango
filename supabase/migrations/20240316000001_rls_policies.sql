-- Update RLS policies for better security
alter table public.profiles enable row level security;
alter table public.collection_requests enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Collection requests policies
create policy "Residents can create their own requests"
  on public.collection_requests for insert
  to authenticated
  with check (
    auth.uid() = user_id and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'resident'
    )
  );

create policy "Users can view appropriate requests"
  on public.collection_requests for select
  to authenticated
  using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'provider'
    )
  );

create policy "Users can update appropriate requests"
  on public.collection_requests for update
  to authenticated
  using (
    (auth.uid() = user_id and status = 'pending') or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'provider'
    )
  );

-- Add function to handle user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'role',
      'resident'
    )
  );
  return new;
end;
$$;

-- Create trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();