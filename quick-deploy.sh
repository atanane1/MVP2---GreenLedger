#!/bin/bash

# Quick deployment script - minimal prompts

echo "🚀 Green Ledger - Quick Deploy"
echo "=============================="
echo ""

# Get GitHub username
if [ -z "$GITHUB_USERNAME" ]; then
    echo "Enter your GitHub username:"
    read -p "Username: " GITHUB_USERNAME
fi

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username required"
    exit 1
fi

# Get repository name
REPO_NAME=${REPO_NAME:-green-ledger}
echo ""
read -p "Repository name (default: green-ledger): " input_repo
REPO_NAME=${input_repo:-$REPO_NAME}

echo ""
echo "📋 Configuration:"
echo "   GitHub Username: $GITHUB_USERNAME"
echo "   Repository Name: $REPO_NAME"
echo ""

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists:"
    git remote get-url origin
    echo ""
    read -p "Remove and recreate? (y/N): " recreate
    if [ "$recreate" = "y" ] || [ "$recreate" = "Y" ]; then
        git remote remove origin
    else
        echo "Using existing remote"
        REMOTE_EXISTS=true
    fi
fi

if [ "$REMOTE_EXISTS" != "true" ]; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
fi

echo ""
echo "📤 Pushing to GitHub..."
git branch -M main 2>/dev/null

# Try to push
if git push -u origin main 2>&1; then
    echo ""
    echo "✅ Code pushed successfully!"
    echo ""
    echo "🌐 Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "☁️  Next: Deploy to Vercel"
    echo "   1. Go to: https://vercel.com/new"
    echo "   2. Import: $REPO_NAME"
    echo "   3. Add DATABASE_URL environment variable"
    echo "   4. Deploy!"
else
    echo ""
    echo "❌ Push failed. Possible reasons:"
    echo "   - Repository doesn't exist on GitHub yet"
    echo "   - You need to create it first at: https://github.com/new"
    echo "   - Check your GitHub credentials"
    echo ""
    echo "After creating the repository, run this script again."
    exit 1
fi

