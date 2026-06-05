alter table public.members
add column if not exists profile_image_path text;

alter table public.members
add column if not exists profile_image_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'member-profile-images',
  'member-profile-images',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload member profile images" on storage.objects;
create policy "Admins can upload member profile images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'member-profile-images'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
);

drop policy if exists "Admins can update member profile images" on storage.objects;
create policy "Admins can update member profile images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'member-profile-images'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
)
with check (
  bucket_id = 'member-profile-images'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
);

drop policy if exists "Admins can delete member profile images" on storage.objects;
create policy "Admins can delete member profile images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'member-profile-images'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
  )
);
