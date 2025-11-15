# ☁️ Vercel Deployment - Step by Step Guide

## ✅ Prerequisites Complete
- ✅ Code pushed to GitHub: https://github.com/VL20202021/MVP2---GreenLedger
- ✅ Repository is ready

## 🚀 Step-by-Step Deployment

### Step 1: Go to Vercel
1. Visit: https://vercel.com/new
2. Sign in with GitHub (if not already signed in)
3. Authorize Vercel to access your GitHub repositories

### Step 2: Import Repository
1. Click "Import Git Repository"
2. You should see "MVP2---GreenLedger" in the list
3. Click "Import" next to it

### Step 3: Configure Project
Vercel will auto-detect Next.js, but verify these settings:

**Project Settings:**
- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` ✅ (default)
- **Build Command**: `prisma generate && next build` ✅ (auto-set)
- **Output Directory**: `.next` ✅ (auto-set)
- **Install Command**: `npm install` ✅ (default)

**DO NOT click Deploy yet!** We need to add the database first.

### Step 4: Add Environment Variable
1. Before clicking "Deploy", look for "Environment Variables" section
2. Click "Environment Variables" or the "+" button
3. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: [Your database connection string - see below]
   - **Environments**: Check all three:
     - ☑ Production
     - ☑ Preview  
     - ☑ Development
4. Click "Save" or "Add"

### Step 5: Get Database Connection String

**Option A: Supabase (Recommended)**
1. Go to: https://supabase.com
2. Sign up/Login → Create New Project
3. Fill in:
   - Project name: `green-ledger` (or any name)
   - Database password: **Save this password!**
   - Region: Choose closest to you
4. Click "Create new project"
5. Wait 2 minutes for setup
6. Go to: Settings (gear icon) → Database
7. Scroll to "Connection string"
8. Select "URI" tab
9. Copy the connection string
   - Format: `postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
10. Replace `[YOUR-PASSWORD]` with your actual password

**Option B: Neon**
1. Go to: https://neon.tech
2. Sign up → Create Project
3. Copy the connection string shown

**Option C: Vercel Postgres**
1. In Vercel dashboard → Storage tab
2. Click "Create" → "Postgres"
3. Select region
4. Copy the connection string

### Step 6: Deploy!
1. Make sure `DATABASE_URL` is added to Environment Variables
2. Click "Deploy" button
3. Wait 2-3 minutes for deployment

### Step 7: Run Database Migrations

After deployment completes:

1. **Get Production DATABASE_URL**:
   - Go to Vercel dashboard → Your project
   - Settings → Environment Variables
   - Copy the `DATABASE_URL` value

2. **Run migrations locally**:
   ```bash
   cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
   DATABASE_URL="your-production-database-url" npx prisma migrate deploy
   ```

   Or use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel login
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

## ✅ Success!

Your app will be live at: `https://mvp2---green-ledger.vercel.app` (or similar)

## 🆘 Troubleshooting

**"Build failed"**
- Check build logs in Vercel dashboard
- Ensure `DATABASE_URL` is set
- Check that Prisma client generates correctly

**"Database connection failed"**
- Verify `DATABASE_URL` is correct
- Check database allows external connections
- For Supabase: Use connection pooling URL (port 6543)

**"Migration failed"**
- Ensure `DATABASE_URL` is correct
- Check database is accessible
- Verify Prisma schema is correct

## 📋 Quick Checklist

- [ ] Signed in to Vercel with GitHub
- [ ] Imported MVP2---GreenLedger repository
- [ ] Verified project settings (Next.js auto-detected)
- [ ] Added DATABASE_URL environment variable
- [ ] Got database connection string (Supabase/Neon/Vercel)
- [ ] Clicked Deploy
- [ ] Deployment completed successfully
- [ ] Ran database migrations
- [ ] App is accessible at Vercel URL

