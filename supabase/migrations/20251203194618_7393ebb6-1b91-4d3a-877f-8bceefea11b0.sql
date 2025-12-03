-- Create enum for roles
create type public.app_role as enum ('admin', 'user');

-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  preferred_language text default 'pt',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  unique (user_id, role)
);

-- Create saved_phrases table
create table public.saved_phrases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  text text not null,
  language text not null default 'pt',
  audio_url text,
  category text,
  is_favorite boolean default false,
  created_at timestamp with time zone default now()
);

-- Create scheduled_messages table
create table public.scheduled_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  phrase_id uuid references public.saved_phrases(id) on delete set null,
  custom_phrase text,
  scheduled_time time not null,
  repeat_days text[] default '{}',
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.saved_phrases enable row level security;
alter table public.scheduled_messages enable row level security;

-- Security definer function to check roles (prevents RLS recursion)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS Policies for profiles
create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

-- RLS Policies for user_roles (only admins can manage, users can view own)
create policy "Users can view own roles"
on public.user_roles for select
using (auth.uid() = user_id);

create policy "Admins can manage all roles"
on public.user_roles for all
using (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for saved_phrases
create policy "Users can view own phrases"
on public.saved_phrases for select
using (auth.uid() = user_id);

create policy "Users can insert own phrases"
on public.saved_phrases for insert
with check (auth.uid() = user_id);

create policy "Users can update own phrases"
on public.saved_phrases for update
using (auth.uid() = user_id);

create policy "Users can delete own phrases"
on public.saved_phrases for delete
using (auth.uid() = user_id);

-- RLS Policies for scheduled_messages
create policy "Users can view own schedules"
on public.scheduled_messages for select
using (auth.uid() = user_id);

create policy "Users can insert own schedules"
on public.scheduled_messages for insert
with check (auth.uid() = user_id);

create policy "Users can update own schedules"
on public.scheduled_messages for update
using (auth.uid() = user_id);

create policy "Users can delete own schedules"
on public.scheduled_messages for delete
using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, preferred_language)
  values (new.id, new.raw_user_meta_data ->> 'full_name', coalesce(new.raw_user_meta_data ->> 'preferred_language', 'pt'));
  
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  return new;
end;
$$;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update timestamps
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_scheduled_messages_updated_at
  before update on public.scheduled_messages
  for each row execute function public.update_updated_at_column();