-- Supabase Schema for Cybersecurity Portfolio
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  tech text[] default '{}',
  github text,
  demo text,
  image text,
  category text,
  created_at timestamptz default now()
);

-- CTF Writeups table  
create table if not exists writeups (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  category text[] default '{}',
  difficulty text,
  content_md text,
  tools text[] default '{}',
  published boolean default true,
  created_at timestamptz default now()
);

-- Blog posts table
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content_md text,
  tags text[] default '{}',
  og_image text,
  published boolean default false,
  published_at timestamptz,
  reading_time integer,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table projects enable row level security;
alter table writeups enable row level security;
alter table posts enable row level security;

-- Public read policies (anyone can view)
create policy "Public read projects" on projects 
  for select using (true);

create policy "Public read published writeups" on writeups 
  for select using (published = true);

create policy "Public read published posts" on posts 
  for select using (published = true);

-- Authenticated user policies (CRUD for logged-in users)
create policy "Authenticated users manage projects" on projects 
  for all using (auth.role() = 'authenticated');

create policy "Authenticated users manage writeups" on writeups 
  for all using (auth.role() = 'authenticated');

create policy "Authenticated users manage posts" on posts 
  for all using (auth.role() = 'authenticated');

-- Create indexes for better query performance
create index if not exists idx_writeups_published on writeups(published);
create index if not exists idx_writeups_slug on writeups(slug);
create index if not exists idx_posts_published on posts(published);
create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_projects_category on projects(category);
