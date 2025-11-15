# 🗄️ Supabase Setup Guide - Step by Step

## Step 1: Create Account / Sign In

1. Go to: https://supabase.com
2. Click "Start your project" or "Sign in"
3. Sign in with:
   - GitHub (recommended - easiest)
   - Email
   - Or create new account

## Step 2: Create New Project

1. Once logged in, you'll see your dashboard
2. Click "New Project" button (usually top right or center)
3. Fill in the form:

   **Organization:**
   - If you don't have one, create a new organization
   - Name: Your name or company name
   - Click "Create organization"

   **Project Details:**
   - **Name**: `green-ledger` (or any name you prefer)
   - **Database Password**: 
     - Create a strong password
     - **IMPORTANT**: Save this password! You'll need it for the connection string
     - Write it down or save it securely
   - **Region**: Choose the closest region to you
     - US East (recommended for most)
     - Europe West
     - Asia Pacific
   - **Pricing Plan**: Free tier is fine for MVP

4. Click "Create new project"
5. **Wait 2-3 minutes** for Supabase to set up your database

## Step 3: Get Connection String

Once your project is ready (you'll see a green checkmark):

1. Click on your project name to open it
2. Go to **Settings** (gear icon in the left sidebar)
3. Click **Database** in the settings menu
4. Scroll down to **Connection string** section
5. You'll see different connection methods:
   - **URI** (this is what we need!)
   - Session mode
   - Transaction mode
   - Connection pooling

6. Click on the **URI** tab
7. You'll see a connection string like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

8. **Important**: Replace `[YOUR-PASSWORD]` with the actual password you created in Step 2
9. **Copy the complete connection string** (with your password)

## Step 4: Connection String Format

Your final connection string should look like:
```
postgresql://postgres.xxxxxxxxxxxxx:your-actual-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Key points:**
- Use the **pooler** URL (port 6543) - this is better for serverless/Vercel
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- The connection string should NOT have brackets `[]`

## Step 5: Test Connection (Optional)

You can test the connection string works by running:

```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
DATABASE_URL="your-connection-string-here" npx prisma db pull
```

If it works, you'll see Prisma connect successfully.

## Step 6: Use in Vercel

1. Copy your complete connection string
2. Go to Vercel dashboard
3. Add as environment variable:
   - Name: `DATABASE_URL`
   - Value: Your connection string
   - Environments: All (Production, Preview, Development)

## 🆘 Troubleshooting

**"Project creation failed"**
- Wait a bit longer (can take 3-5 minutes)
- Try refreshing the page
- Check if you have any existing projects at the limit

**"Can't find connection string"**
- Make sure you're in Settings → Database
- Scroll down to "Connection string" section
- Click the "URI" tab

**"Connection failed"**
- Verify password is correct (no brackets)
- Make sure you're using the pooler URL (port 6543)
- Check that the project is fully set up (green checkmark)

**"Password not working"**
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- The password should not have spaces or special characters that need encoding
- Try resetting the database password in Supabase settings

## ✅ Success Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Saved database password securely
- [ ] Project is fully set up (green checkmark)
- [ ] Found connection string in Settings → Database
- [ ] Copied URI connection string
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] Connection string is ready to use

## 📋 Next Steps

Once you have your connection string:
1. Add it to Vercel as `DATABASE_URL` environment variable
2. Deploy your project
3. Run migrations: `DATABASE_URL="your-url" npx prisma migrate deploy`

---

**Need help?** Share your connection string (you can mask the password) and I'll help verify it's correct!

