-- Drop existing trigger and function
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Create improved function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (
    id,
    email,
    role,
    created_at,
    updated_at
  ) values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'resident'),
    now(),
    now()
  )
  on conflict (id) do update
  set
    email = excluded.email,
    role = coalesce(new.raw_user_meta_data->>'role', profiles.role),
    updated_at = now();
  
  return new;
end;
$$;

-- Recreate trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Ensure RLS policies are properly set
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.profiles to anon, authenticated;
grant all on public.collection_requests to anon, authenticated;