# 🚀 Vercel Setup - Complete Step-by-Step Guide

## Step 1: Go to Vercel

1. Visit: https://vercel.com/new
2. Sign in with GitHub (if not already signed in)

## Step 2: Import Repository

1. You should see "Import Git Repository" section
2. Look for **MVP2---GreenLedger** in your repositories
3. If you don't see it, click "Adjust GitHub App Permissions" and grant access
4. Click **"Import"** next to MVP2---GreenLedger

## Step 3: Configure Project

Vercel will auto-detect Next.js. Verify these settings:

**Project Settings:**
- **Framework Preset**: Next.js ✅ (should be auto-detected)
- **Root Directory**: `./` ✅ (default - leave as is)
- **Build Command**: `prisma generate && next build` ✅ (should be auto-set)
- **Output Directory**: `.next` ✅ (should be auto-set)
- **Install Command**: `npm install` ✅ (default)

**DO NOT click "Deploy" yet!** We need to add the database first.

## Step 4: Add Environment Variable (CRITICAL!)

**Before clicking Deploy:**

1. Look for **"Environment Variables"** section (usually below project settings)
2. Click **"Environment Variables"** or the **"+"** button
3. Add new variable:
   - **Key/Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:Jm%21stmCu5%26f%40%2Am%3F@db.yoxoijwcwfiohsrbjoib.supabase.co:5432/postgres`
   - **Environments**: Check ALL THREE:
     - ☑ Production
     - ☑ Preview
     - ☑ Development
4. Click **"Save"** or **"Add"**

## Step 5: Deploy!

1. Scroll down and click the big **"Deploy"** button
2. Wait 2-3 minutes for deployment
3. You'll see build logs in real-time

## Step 6: Get Your URL

After deployment completes:

1. You'll see "Congratulations! Your project has been deployed"
2. Click on the deployment
3. Copy the URL (e.g., `https://mvp2---green-ledger.vercel.app`)
4. This is your live app URL!

## Step 7: Test Your App

Visit these URLs:

1. **Main page**: `https://your-app.vercel.app/`
2. **Test page** (no database): `https://your-app.vercel.app/test`
3. **Health check**: `https://your-app.vercel.app/api/health`

## ✅ Success Checklist

- [ ] Repository imported successfully
- [ ] DATABASE_URL environment variable added
- [ ] All three environments checked (Production, Preview, Development)
- [ ] Deployment completed successfully
- [ ] Got the deployment URL
- [ ] Can access the app

## 🆘 Troubleshooting

**"Repository not found"**
- Make sure you've granted Vercel access to your GitHub repositories
- Check that MVP2---GreenLedger exists on GitHub

**"Build failed"**
- Check build logs in Vercel
- Make sure DATABASE_URL is set
- Verify the connection string is correct

**"404 Not Found" after deployment**
- Wait a minute for DNS propagation
- Use the exact URL from Vercel dashboard
- Check deployment status is "Ready"

## 📋 Quick Reference

**DATABASE_URL Value:**
```
postgresql://postgres:Jm%21stmCu5%26f%40%2Am%3F@db.yoxoijwcwfiohsrbjoib.supabase.co:5432/postgres
```

**GitHub Repository:**
```
https://github.com/VL20202021/MVP2---GreenLedger
```

