# 📤 Push Code to GitHub - Quick Guide

## ✅ Repository Configured

- **Remote**: `https://github.com/VL20202021/MVP2---GreenLedger.git`
- **Branch**: `main`
- **Status**: Ready to push

## 🔐 Authentication Required

GitHub requires authentication to push code. Choose one method:

### Method 1: Personal Access Token (Easiest)

1. **Create Token**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: "Green Ledger Deployment"
   - Expiration: 90 days (or your preference)
   - Select scope: ✅ **repo** (all repo permissions)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Push Code**:
   ```bash
   cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
   git push -u origin main
   ```
   
   When prompted:
   - **Username**: `VL20202021`
   - **Password**: Paste your personal access token (not your GitHub password!)

### Method 2: SSH (If you have SSH keys)

```bash
# Switch to SSH URL
git remote set-url origin git@github.com:VL20202021/MVP2---GreenLedger.git

# Push
git push -u origin main
```

### Method 3: GitHub CLI

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Login
gh auth login

# Push
git push -u origin main
```

## ✅ After Successful Push

Once code is pushed, you'll see:
```
✅ Code pushed successfully!
```

Then proceed to Vercel deployment.

## 🆘 Troubleshooting

**"Repository not found"**
- Make sure the repository exists on GitHub
- Check the repository name matches exactly: `MVP2---GreenLedger` (with dashes)

**"Authentication failed"**
- For Personal Access Token: Make sure you're using the token, not your password
- Token must have `repo` scope
- Token might have expired

**"Permission denied"**
- Verify you have push access to the repository
- Check if the repository is private and you're authenticated

## 🎯 Quick Command

```bash
git push -u origin main
```

Then enter your credentials when prompted.

