# ⚽ Bolão Copa 2026

Site de bolão para a Copa do Mundo 2026. Construído com React + Vite + Supabase.

---

## 🚀 Deploy passo a passo

### 1. Supabase — criar o banco

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **New project**, dê um nome (ex: `bolao2026`) e escolha a senha
3. Aguarde o projeto inicializar (~1 min)
4. No menu lateral, clique em **SQL Editor**
5. Cole e execute o SQL abaixo para criar as tabelas:

```sql
-- Tabela de usuários
create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  dob date not null,
  created_at timestamptz default now()
);

-- Tabela de palpites
create table picks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade not null,
  match_id text not null,
  home int not null,
  away int not null,
  created_at timestamptz default now(),
  unique(user_id, match_id)
);

-- Liberar leitura/escrita pública (sem autenticação)
alter table users enable row level security;
alter table picks enable row level security;

create policy "users_public_read"  on users for select using (true);
create policy "users_public_insert" on users for insert with check (true);

create policy "picks_public_read"   on picks for select using (true);
create policy "picks_public_insert" on picks for insert with check (true);
create policy "picks_public_update" on picks for update using (true);
```

6. Vá em **Project Settings → API**
7. Copie a **Project URL** e a **anon public key** — você vai precisar no Vercel

---

### 2. GitHub — subir o código

1. Crie um repositório novo no GitHub (ex: `bolao2026`)
2. No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU_USUARIO/bolao2026.git
git push -u origin main
```

---

### 3. Vercel — hospedar o site

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em **Add New → Project**
3. Importe o repositório `bolao2026`
4. Na seção **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL` → cole a Project URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` → cole a anon key do Supabase
5. Clique em **Deploy**
6. Em ~1 minuto seu site estará no ar com uma URL do tipo `bolao2026.vercel.app`

---

### 4. Atualizar resultados dos jogos

Edite o arquivo `src/rounds.js` e atualize o campo `result` de cada jogo:

```js
// Antes (sem resultado):
{ id: "m8", home: "Rep. Tcheca", away: "África do Sul", ..., result: null }

// Depois (com resultado):
{ id: "m8", home: "Rep. Tcheca", away: "África do Sul", ..., result: { home: 2, away: 1 } }
```

Faça commit e push — o Vercel atualiza automaticamente em ~30 segundos.

---

## 🛠 Rodar localmente

```bash
npm install
cp .env.example .env   # preencha com suas credenciais do Supabase
npm run dev
```
