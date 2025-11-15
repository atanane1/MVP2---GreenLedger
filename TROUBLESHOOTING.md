# 🔧 Troubleshooting Server Error

## Error: "Application error: a server-side exception has occurred"

This usually means `DATABASE_URL` is not set correctly in Vercel.

## ✅ Step-by-Step Fix

### Step 1: Verify DATABASE_URL in Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your project: **MVP2---GreenLedger**
3. Go to: **Settings** → **Environment Variables**
4. Look for `DATABASE_URL`

**If it doesn't exist:**
- Click "Add New"
- Name: `DATABASE_URL`
- Value: `postgresql://postgres:Jm%21stmCu5%26f%40%2Am%3F@db.yoxoijwcwfiohsrbjoib.supabase.co:5432/postgres`
- Environments: ☑ Production ☑ Preview ☑ Development
- Click "Save"

**If it exists:**
- Click on it to edit
- Verify the value matches exactly (see above)
- Make sure all environments are checked

### Step 2: Redeploy After Adding/Updating

After adding or updating `DATABASE_URL`:
1. Go to **Deployments** tab
2. Click the three dots (...) on latest deployment
3. Click **Redeploy**
4. Or wait for auto-deploy (if you just pushed code)

### Step 3: Test Health Endpoint

After deployment completes, visit:
```
https://your-app.vercel.app/api/health
```

This will show:
- If DATABASE_URL is set
- If database connection works
- Any error messages

### Step 4: Check Vercel Logs

1. Go to your project → **Deployments**
2. Click on the latest deployment
3. Click **Logs** tab
4. Look for error messages

Common errors:
- `Environment variable not found: DATABASE_URL`
- `Can't reach database server`
- `Authentication failed`

## 🔍 Common Issues

### Issue 1: DATABASE_URL Not Set
**Solution:** Add it in Vercel Settings → Environment Variables

### Issue 2: Wrong Connection String Format
**Solution:** Make sure it's URL-encoded:
```
postgresql://postgres:Jm%21stmCu5%26f%40%2Am%3F@db.yoxoijwcwfiohsrbjoib.supabase.co:5432/postgres
```

### Issue 3: Database Not Accessible
**Solution:** 
- Check Supabase dashboard
- Verify database is running
- Check firewall/network settings

### Issue 4: Password Special Characters
**Solution:** Make sure password is URL-encoded in connection string

## ✅ Quick Checklist

- [ ] DATABASE_URL exists in Vercel environment variables
- [ ] DATABASE_URL value is correct (with URL-encoded password)
- [ ] All environments checked (Production, Preview, Development)
- [ ] Redeployed after adding/updating variable
- [ ] Health endpoint shows database connected
- [ ] No errors in Vercel logs

## 🆘 Still Not Working?

1. Check Vercel logs for specific error
2. Test health endpoint: `/api/health`
3. Verify Supabase database is accessible
4. Try resetting database password in Supabase

