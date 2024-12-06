-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text not null check (role in ('resident', 'provider')),
  name text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create collection_requests table
create table if not exists public.collection_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  address text not null,
  contact_details jsonb not null,
  collection_time text not null check (collection_time in ('morning', 'evening')),
  collection_date date not null,
  subscription_type text not null check (subscription_type in ('single', 'monthly', 'annual')),
  waste_type text not null,
  waste_items text[] not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
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
  with check (auth.uid() = user_id);

create policy "Users can view their own requests"
  on public.collection_requests for select
  to authenticated
  using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'provider'
    )
  );

create policy "Users can update their own requests"
  on public.collection_requests for update
  to authenticated
  using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'provider'
    )
  );

-- Indexes for better performance
create index if not exists idx_collection_requests_user_id on public.collection_requests(user_id);
create index if not exists idx_collection_requests_status on public.collection_requests(status);
create index if not exists idx_collection_requests_date on public.collection_requests(collection_date);