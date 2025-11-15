# 🚀 Automated Deployment - Follow These Steps

## Step 1: Create GitHub Repository

I'll open the GitHub page for you. Then:

1. **Repository name**: `green-ledger`
2. **Description**: `CSRD/ESRS Reporting Platform`
3. **Visibility**: Choose Public or Private
4. **IMPORTANT**: Leave all checkboxes UNCHECKED (no README, .gitignore, or license)
5. **Click**: "Create repository"

After creating, come back here with your GitHub username!

---

## Step 2: I'll Push Your Code

Once you provide your GitHub username, I'll run:
```bash
git remote add origin https://github.com/YOUR-USERNAME/green-ledger.git
git push -u origin main
```

---

## Step 3: Get Database

While I push code, you can get a database:

1. Go to: https://supabase.com
2. Sign up → Create Project
3. Wait 2 minutes
4. Settings → Database → Copy connection string (URI format)

---

## Step 4: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import your `green-ledger` repository
3. Add environment variable: `DATABASE_URL` = your connection string
4. Deploy!

---

## Step 5: Run Migrations

After deployment:
```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

