-- Users table (if not already present)
create table
if not exists public.users
(
    id uuid primary key default gen_random_uuid
(),
    email text unique not null,
    created_at timestamp
with time zone default now
()
);

-- Transactions table
create table public.transactions
(
 id uuid primary key default gen_random_uuid(),
 user_id uuid references public.users(id) on delete cascade,
 date date not null,
 description text not null,
 category text not null,
 amount numeric not null,
 created_at timestamp
 with time zone default now
 ()
);

 -- Advice table
 create table public.advice
 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  message text not null,
  recommendations jsonb not null,
  -- array of strings
  created_at timestamp
  with time zone default now
  ()
);

  -- Budget table
  create table public.budgets
  (
   id uuid primary key default gen_random_uuid(),
   user_id uuid references public.users(id) on delete cascade,
   total numeric not null,
   created_at timestamp
   with time zone default now
   ()
);

   -- Budget categories table
   create table public.budget_categories
   (
    id uuid primary key default gen_random_uuid(),
    budget_id uuid references public.budgets(id) on delete cascade,
    name text not null,
    allocated numeric not null,
    spent numeric not null
   );

   -- Alerts table
   create table public.alerts
   (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.users(id) on delete cascade,
    type text not null,
    -- 'suspicious' or 'info'
    message text not null,
    date date not null,
    disputed boolean default false,
    created_at timestamp
    with time zone default now
    ()
);
