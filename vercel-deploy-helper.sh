#!/bin/bash

echo "☁️  Vercel Deployment Helper"
echo "============================"
echo ""

echo "This script will help you:"
echo "1. Pull environment variables from Vercel"
echo "2. Run database migrations"
echo ""
echo "Prerequisites:"
echo "- Vercel CLI installed: npm i -g vercel"
echo "- Logged in to Vercel: vercel login"
echo "- Project deployed on Vercel"
echo ""

read -p "Continue? (Y/n): " continue_script
if [ "$continue_script" = "n" ] || [ "$continue_script" = "N" ]; then
    exit 0
fi

echo ""
echo "📥 Pulling environment variables from Vercel..."
vercel env pull .env.local

if [ $? -eq 0 ]; then
    echo "✅ Environment variables pulled"
    echo ""
    
    if [ -f .env.local ]; then
        echo "📋 DATABASE_URL found in .env.local"
        echo ""
        read -p "Run database migrations now? (Y/n): " run_migrations
        
        if [ "$run_migrations" != "n" ] && [ "$run_migrations" != "N" ]; then
            echo ""
            echo "🗄️  Running database migrations..."
            npx prisma migrate deploy
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "✅ Migrations completed successfully!"
                echo ""
                echo "🎉 Your app should be live now!"
            else
                echo ""
                echo "❌ Migration failed. Check your DATABASE_URL"
            fi
        fi
    else
        echo "⚠️  .env.local not found. Please check Vercel configuration."
    fi
else
    echo ""
    echo "❌ Failed to pull environment variables"
    echo ""
    echo "Make sure:"
    echo "1. Vercel CLI is installed: npm i -g vercel"
    echo "2. You're logged in: vercel login"
    echo "3. You're in the project directory"
fi

