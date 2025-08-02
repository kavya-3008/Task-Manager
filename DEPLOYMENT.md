# Deployment Guide

This guide will help you deploy the Task Manager application to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Node.js installed on your machine
3. Git installed on your machine

## Step 1: Prepare Your Repository

1. **Create a new repository on GitHub**
   - Go to GitHub and create a new repository named `Task-Manager`
   - Make it public (required for GitHub Pages)

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/Task-Manager.git
   git push -u origin main
   ```

## Step 2: Set Up Backend Deployment

Since GitHub Pages only hosts static files, you'll need to deploy the backend separately. Here are some options:

### Option A: Render (Recommended - Free)

1. **Sign up for Render**
   - Go to [render.com](https://render.com) and create an account

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Set the following configuration:
     - **Name**: task-manager-backend
     - **Environment**: Node
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Root Directory**: `backend`

3. **Add Environment Variables**
   - Go to your service settings
   - Add these environment variables:
     ```
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     NODE_ENV=production
     ```

4. **Deploy**
   - Render will automatically deploy your backend
   - Note the URL (e.g., `https://your-app.onrender.com`)

### Option B: Railway

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app) and create an account

2. **Deploy your backend**
   - Connect your GitHub repository
   - Set the root directory to `backend`
   - Add the same environment variables as above

### Option C: Heroku

1. **Sign up for Heroku**
   - Go to [heroku.com](https://heroku.com) and create an account

2. **Deploy using Heroku CLI**
   ```bash
   heroku create your-app-name
   heroku config:set MONGODB_URI=your-mongodb-connection-string
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set NODE_ENV=production
   git push heroku main
   ```

## Step 3: Update Frontend Configuration

1. **Update the API base URL**
   
   Edit `frontend/src/config/api.js`:
   ```javascript
   // Replace with your actual backend URL
   export const API_BASE_URL = isDevelopment 
     ? 'http://localhost:5000/api' 
     : 'https://your-backend-url.com/api';
   ```

2. **Commit and push the changes**
   ```bash
   git add .
   git commit -m "Update API base URL"
   git push origin main
   ```

## Step 4: Enable GitHub Pages

1. **Go to your repository settings**
   - Navigate to Settings > Pages

2. **Configure GitHub Pages**
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

3. **The GitHub Action will automatically:**
   - Build your frontend
   - Deploy to GitHub Pages
   - Make your app available at `https://yourusername.github.io/Task-Manager/`

## Step 5: Test Your Deployment

1. **Wait for the GitHub Action to complete**
   - Check the Actions tab in your repository
   - The build should complete successfully

2. **Test your application**
   - Visit `https://yourusername.github.io/Task-Manager/`
   - Try creating an account and using the app

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check the GitHub Actions logs
   - Ensure all dependencies are properly installed
   - Verify the Node.js version in the workflow

2. **API calls fail**
   - Verify your backend URL is correct
   - Check that your backend is running
   - Ensure CORS is properly configured

3. **Authentication issues**
   - Check that JWT_SECRET is set correctly
   - Verify the token is being sent in requests

### Debugging

1. **Check browser console**
   - Open developer tools
   - Look for any JavaScript errors

2. **Check network requests**
   - Monitor API calls in the Network tab
   - Verify requests are going to the correct URL

3. **Check backend logs**
   - View your backend service logs
   - Look for any server errors

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Production Backend
```env
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```

## Security Notes

1. **Never commit .env files**
   - They're already in .gitignore
   - Use environment variables in your deployment platform

2. **Use strong JWT secrets**
   - Generate a random string for production
   - Keep it secure and private

3. **Use HTTPS in production**
   - Most deployment platforms provide this automatically
   - Update your API base URL to use HTTPS

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify your backend is running
3. Test API endpoints directly
4. Check browser console for errors
5. Open an issue on GitHub with detailed error information

---

**Your Task Manager app should now be live at: `https://yourusername.github.io/Task-Manager/`** 🎉 