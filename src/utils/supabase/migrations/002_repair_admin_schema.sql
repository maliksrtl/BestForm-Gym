create extension if not exists "pgcrypto";

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_settings (
  id text primary key default 'default',
  monthly_price integer not null default 2500,
  quarterly_price integer not null default 7000,
  semiannual_price integer not null default 13500,
  yearly_price integer not null default 24000,
  updated_at timestamptz not null default now()
);

alter table public.pricing_settings
add column if not exists monthly_price integer not null default 2500;

alter table public.pricing_settings
add column if not exists quarterly_price integer not null default 7000;

alter table public.pricing_settings
add column if not exists semiannual_price integer not null default 13500;

alter table public.pricing_settings
add column if not exists yearly_price integer not null default 24000;

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  membership_type text not null default 'monthly',
  membership_start_date date not null,
  membership_duration_months integer not null check (membership_duration_months > 0),
  membership_end_date date not null,
  price_amount integer not null default 0,
  payment_status text not null default 'paid',
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.members
drop constraint if exists members_membership_type_check;

alter table public.members
add constraint members_membership_type_check
check (membership_type in ('monthly', 'quarterly', 'semiannual', 'yearly'));

alter table public.members
drop constraint if exists members_payment_status_check;

alter table public.members
add constraint members_payment_status_check
check (payment_status in ('paid', 'unpaid'));

alter table public.members
drop constraint if exists members_status_check;

alter table public.members
add constraint members_status_check
check (status in ('active', 'expired', 'cancelled'));

insert into public.pricing_settings (
  id,
  monthly_price,
  quarterly_price,
  semiannual_price,
  yearly_price
)
values ('default', 2500, 7000, 13500, 24000)
on conflict (id) do update
set
  monthly_price = coalesce(public.pricing_settings.monthly_price, excluded.monthly_price),
  quarterly_price = coalesce(public.pricing_settings.quarterly_price, excluded.quarterly_price),
  semiannual_price = coalesce(public.pricing_settings.semiannual_price, excluded.semiannual_price),
  yearly_price = coalesce(public.pricing_settings.yearly_price, excluded.yearly_price);

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
