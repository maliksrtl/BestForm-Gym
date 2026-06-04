create extension if not exists "pgcrypto";

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_settings (
  id text primary key default 'default',
  monthly_price integer not null default 2500,
  yearly_price integer not null default 24000,
  updated_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  membership_type text not null default 'monthly'
    check (membership_type in ('monthly', 'yearly')),
  membership_start_date date not null,
  membership_duration_months integer not null check (membership_duration_months > 0),
  membership_end_date date not null,
  price_amount integer not null default 0,
  payment_status text not null default 'paid'
    check (payment_status in ('paid', 'unpaid')),
  status text not null default 'active'
    check (status in ('active', 'expired', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.pricing_settings (id, monthly_price, yearly_price)
values ('default', 2500, 24000)
on conflict (id) do nothing;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists members_set_updated_at on public.members;
create trigger members_set_updated_at
before update on public.members
for each row execute function public.set_updated_at();

drop trigger if exists pricing_settings_set_updated_at on public.pricing_settings;
create trigger pricing_settings_set_updated_at
before update on public.pricing_settings
for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.members enable row level security;
alter table public.pricing_settings enable row level security;

drop policy if exists "Admins can read admin profiles" on public.admin_profiles;
create policy "Admins can read admin profiles"
on public.admin_profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Admins can manage members" on public.members;
create policy "Admins can manage members"
on public.members
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
);

drop policy if exists "Admins can manage pricing" on public.pricing_settings;
create policy "Admins can manage pricing"
on public.pricing_settings
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
);
