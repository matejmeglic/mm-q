# mm-q - High School Sex Life Survey

A simple, mobile-first survey app for research purposes. Built with React + Vite, using Supabase for data storage.

## Features

- Mobile-first, minimalist design
- 5-question survey tailored for high schoolers
- Anonymous data collection via Supabase (PostgreSQL)
- Easy deployment to Netlify

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run the following SQL to create the table:

```sql
CREATE TABLE survey_responses (
  id BIGSERIAL PRIMARY KEY,
  age INTEGER NOT NULL,
  had_sex BOOLEAN NOT NULL,
  first_sex_age INTEGER,
  partner_age INTEGER,
  would_change BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, for public access)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (public access for survey)
CREATE POLICY "Allow public inserts" ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads (optional, if you want to query data)
CREATE POLICY "Allow public reads" ON survey_responses
  FOR SELECT
  TO public
  USING (true);
```

4. Go to Project Settings > API
5. Copy your Project URL and anon/public key

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Deployment to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site settings > Environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Deploy!

## Querying Results

Once you have responses, you can query them using SQL in Supabase:

```sql
-- Get all responses
SELECT * FROM survey_responses;

-- Count responses
SELECT COUNT(*) FROM survey_responses;

-- Average age at first sex
SELECT AVG(first_sex_age) FROM survey_responses WHERE had_sex = true;

-- Percentage who would change
SELECT 
  COUNT(*) FILTER (WHERE would_change = true) * 100.0 / COUNT(*) as percentage_would_change
FROM survey_responses 
WHERE had_sex = true;
```

## Survey Questions

1. Your age (default: 18)
2. Have you had sex already? (Yes/No)
3. How old were you when you first had sex? (if answered Yes)
4. How old was your partner? (if answered Yes)
5. Would you change it (have sex sooner, wait longer)? (if answered Yes)

## Tech Stack

- **Frontend**: React + Vite
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Netlify (or GitHub Pages)
