# 🔧 Fix Database Connection Error

## Problem

The direct database connection (port 5432) doesn't work with Vercel/serverless environments. We need to use the **connection pooler** (port 6543).

## Solution: Update DATABASE_URL in Vercel

### Step 1: Get Connection Pooler URL from Supabase

1. Go to: https://supabase.com/dashboard/project/yoxoijwcwfiohsrbjoib/settings/database
2. Scroll to **"Connection pooling"** section
3. Click on **"URI"** tab
4. Copy the connection string
5. It should look like:
   ```
   postgresql://postgres.yoxoijwcwfiohsrbjoib:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with your actual password: `Jm!stmCu5&f@*m?`
7. URL-encode the password: `Jm%21stmCu5%26f%40%2Am%3F`

### Step 2: Update in Vercel

1. Go to Vercel dashboard → Your project
2. **Settings** → **Environment Variables**
3. Find `DATABASE_URL`
4. Click to edit
5. Replace the value with the pooler URL:
   ```
   postgresql://postgres.yoxoijwcwfiohsrbjoib:Jm%21stmCu5%26f%40%2Am%3F@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   **Replace `[REGION]` with your actual region** (e.g., `us-east-1`, `eu-west-1`)
6. Make sure all environments are checked
7. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click three dots (...) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Quick Reference

**Your password (URL-encoded):** `Jm%21stmCu5%26f%40%2Am%3F`

**Connection Pooler Format:**
```
postgresql://postgres.yoxoijwcwfiohsrbjoib:Jm%21stmCu5%26f%40%2Am%3F@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Common Regions:**
- `us-east-1` (US East)
- `us-west-1` (US West)
- `eu-west-1` (Europe West)
- `ap-southeast-1` (Asia Pacific)

## Find Your Region

1. Supabase dashboard → Settings → General
2. Look for "Region" field
3. Use that region code in the connection string

## Test After Fix

After redeploying, visit:
- `/api/health` - Should show database connected
- `/` - Should load without database error

