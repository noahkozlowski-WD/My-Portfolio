#!/bin/bash

echo "================================"
echo "Noah's Portfolio Deployment Helper"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Push to GitHub${NC}"
echo "Your repository: https://github.com/noahkozlowski-WD/Web-develeopement"
echo ""
echo "Pushing code to GitHub..."
cd /app
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}✗ Push failed. You may need to authenticate.${NC}"
    echo ""
    echo "If GitHub asks for credentials:"
    echo "1. Username: Your GitHub username"
    echo "2. Password: Use a Personal Access Token (not your password)"
    echo ""
    echo "To create a token:"
    echo "- Go to: https://github.com/settings/tokens"
    echo "- Click 'Generate new token (classic)'"
    echo "- Select 'repo' scope"
    echo "- Copy the token and use it as password"
    echo ""
    exit 1
fi

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}GitHub Push Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "1. Set up MongoDB Atlas (Free Cloud Database)"
echo "   → Go to: https://www.mongodb.com/cloud/atlas/register"
echo "   → Create FREE M0 cluster"
echo "   → Create database user"
echo "   → Get connection string"
echo ""
echo "2. Deploy Backend to Railway (Free Hosting)"
echo "   → Go to: https://railway.app"
echo "   → Login with GitHub"
echo "   → Import your repository"
echo "   → Set root directory: /backend"
echo "   → Add environment variables"
echo ""
echo "3. Deploy Frontend to Vercel (Free Hosting)"
echo "   → Go to: https://vercel.com"
echo "   → Login with GitHub"
echo "   → Import your repository"
echo "   → Set root directory: /frontend"
echo "   → Add REACT_APP_BACKEND_URL variable"
echo ""
echo -e "${YELLOW}📖 See VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions${NC}"
echo ""
