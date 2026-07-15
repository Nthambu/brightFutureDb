# Render Deployment Guide for BFEF Kenya Backend

This guide will walk you through deploying your NestJS backend API to Render.com.

## Prerequisites

- [Render account](https://render.com) (free tier available)
- GitHub repository with your code (already done ✅)
- Basic understanding of environment variables

## 🚀 Quick Deployment Steps

### Step 1: Create PostgreSQL Database

1. **Log into Render Dashboard**
   - Go to [render.com](https://render.com) and sign in

2. **Create New PostgreSQL Database**
   - Click **"New"** → **"PostgreSQL"**
   - Configure:
     - **Name**: `bfef-kenya-database` (or your preference)
     - **Database**: `brightfuture` (matches your local DB name)
     - **User**: `brightfuture` (or your preference)
     - **Region**: Choose closest to your users
     - **Plan**: Free (or paid for production)

3. **Save Database Connection Details**
   - After creation, note the **External Database URL**
   - Format: `postgresql://username:password@hostname:port/database`
   - You'll need this for the web service

### Step 2: Create Web Service

1. **Create New Web Service**
   - Click **"New"** → **"Web Service"**
   - Connect your GitHub account if not already connected
   - Select your `bfef-sprint1` repository

2. **Configure Build Settings**

   ```
   Name: bfef-kenya-api
   Environment: Node
   Region: Same as your database
   Branch: main (or your default branch)
   Build Command: npm install
   Start Command: npm start
   ```

3. **Advanced Settings**
   - **Node Version**: Latest (18.x or higher)
   - **Auto-Deploy**: Yes (recommended)

### Step 3: Set Environment Variables

In your Render Web Service dashboard, go to **"Environment"** and add these variables:

#### Required Variables:

```env
NODE_ENV=production
DATABASE_URL=<your-external-database-url-from-step-1>
PORT=10000
```

#### CORS Configuration:

```env
FRONTEND_URL=https://yourdomain.com
```

_Replace with your actual frontend domain(s). For multiple domains, separate with commas:_

```env
FRONTEND_URL=https://yourdomain.com,https://www.yourdomain.com,https://admin.yourdomain.com
```

#### Optional (if not using DATABASE_URL):

```env
DATABASE_HOST=<host-from-render>
DATABASE_PORT=5432
DATABASE_USERNAME=<username-from-render>
DATABASE_PASSWORD=<password-from-render>
DATABASE_NAME=<database-name-from-render>
DATABASE_SSL=true
```

### Step 4: Deploy

1. **Trigger Deployment**
   - Click **"Deploy Latest Commit"** or push to your main branch
   - Watch the build logs for any errors

2. **Monitor Deployment**
   - Build should complete successfully
   - Service should start and show "Live" status
   - Check logs for startup messages

## 🔧 Database Setup

### Option 1: Using Database Migrations (Recommended)

If you have TypeORM migrations set up:

1. **Connect to your Render database** using the External Database URL
2. **Run your schema file**:
   ```sql
   -- Copy contents of 01_sprint1_schema.sql and run in Render's database console
   ```

### Option 2: Direct SQL Execution

1. **Access Render Database Console**
   - Go to your PostgreSQL service in Render
   - Click **"Connect"** → **"External Connection"**
   - Use a PostgreSQL client (pgAdmin, DBeaver, etc.)

2. **Execute Schema**

   ```bash
   # Using psql command line
   psql <your-external-database-url> < 01_sprint1_schema.sql
   ```

3. **Execute Seed Data (Optional)**
   ```bash
   psql <your-external-database-url> < 02_sprint1_seed.sql
   ```

## 🌐 API Endpoints

After successful deployment, your API will be available at:

```
https://your-service-name.onrender.com
```

### Available Endpoints:

#### Public Endpoints:

- `GET /api/v1/public/pages` - Get all pages
- `GET /api/v1/public/pages/:slug` - Get page by slug
- `GET /api/v1/public/leadership` - Get leadership team
- `POST /api/v1/public/contact` - Submit contact message

#### Admin Endpoints:

- `GET /api/v1/admin/pages` - Get all pages (admin)
- `POST /api/v1/admin/pages` - Create new page
- `PATCH /api/v1/admin/pages/:id` - Update page
- `DELETE /api/v1/admin/pages/:id` - Delete page
- `GET /api/v1/admin/members` - Get all members
- `POST /api/v1/admin/members` - Create member
- `GET /api/v1/admin/members/:id` - Get member by ID
- `PATCH /api/v1/admin/members/:id` - Update member
- `DELETE /api/v1/admin/members/:id` - Delete member
- `GET /api/v1/admin/contact-messages` - Get contact messages
- `GET /api/v1/admin/contact-messages/:id` - Get message by ID
- `PATCH /api/v1/admin/contact-messages/:id/status` - Update message status

## 🔍 Testing Your Deployment

### Basic Health Check:

```bash
curl https://your-service-name.onrender.com/api/v1/public/pages
```

### Using Browser:

Visit: `https://your-service-name.onrender.com/api/v1/public/pages`

## 🚨 Troubleshooting

### Common Issues:

#### 1. Build Failures - "nest: not found"

**Symptoms**: Build fails during npm install or build with "nest: not found" error
**Solutions**:

- ✅ **FIXED**: `@nestjs/cli` is now in `dependencies` (not `devDependencies`)
- ✅ **FIXED**: `typescript` is now in `dependencies` for build process
- ✅ **FIXED**: Build script uses correct `nest build` command
- If still failing, check Node.js version compatibility (requires 18+)

#### 2. Start Command Issues

**Symptoms**: Service fails to start after successful build
**Solutions**:

- ✅ **FIXED**: Start script now uses `node dist/main` instead of `nest start`
- Ensure `PORT=10000` environment variable is set on Render
- Check that build completed successfully and `dist/` folder exists

#### 3. Dependency Issues

**Symptoms**: Missing dependencies or version conflicts
**Solutions**:

- All build dependencies are now in `dependencies` section
- Node.js version >=18.0.0 is specified in package.json
- npm version >=9.0.0 is specified for compatibility
  **Symptoms**: "Unable to connect to database" errors
  **Solutions**:
- Verify `DATABASE_URL` is correctly set
- Ensure database is running and accessible
- Check if database SSL settings match configuration

#### 3. CORS Errors

**Symptoms**: Browser blocks requests from frontend
**Solutions**:

- Update `FRONTEND_URL` with correct domain(s)
- Remove `http://localhost` URLs from production `FRONTEND_URL`
- Ensure CORS origins match your actual frontend domain

#### 4. Port Issues

**Symptoms**: Service fails to start with port errors
**Solutions**:

- Ensure `PORT=10000` is set (Render's requirement)
- Don't hardcode ports in your application

#### 6. Security Vulnerabilities Warning

**Symptoms**: npm audit shows vulnerabilities during build
**Solutions**:

- **For Production**: Most vulnerabilities are in dev dependencies and don't affect runtime
- **Critical vulnerabilities**: Only update if they affect production dependencies
- **Breaking changes**: Avoid `npm audit fix --force` as it may break your application
- **Recommendation**: Monitor for security updates and update incrementally
- **Alternative**: Use tools like Snyk or GitHub Dependabot for safer updates

**Symptoms**: App crashes with missing configuration errors
**Solutions**:

- Double-check all required environment variables are set
- Verify `NODE_ENV=production`
- Ensure no typos in variable names

## 📊 Monitoring

### Render Dashboard:

- **Logs**: Real-time application logs
- **Metrics**: CPU, Memory, Response times
- **Events**: Deployment history and status

### Key Metrics to Watch:

- Response time < 2 seconds
- Memory usage < 80% of limit
- Zero 5xx errors
- Database connection pool health

## 🔒 Security Checklist

- ✅ **Environment Variables**: All secrets in environment variables, not code
- ✅ **CORS**: Properly configured for your domain(s)
- ✅ **SSL**: Enabled by default on Render
- ✅ **Database**: SSL connections enforced
- ✅ **Helmet**: Security headers middleware enabled
- ✅ **Input Validation**: Class-validator pipes active
- ✅ **Rate Limiting**: Consider adding for production

## 💰 Cost Optimization

### Free Tier Limitations:

- **Web Service**: Sleeps after 15 minutes of inactivity
- **Database**: 1GB storage, 97 hours/month compute
- **Bandwidth**: 100GB/month

### Production Recommendations:

- **Web Service**: Upgrade to paid plan for 24/7 availability
- **Database**: Monitor storage and upgrade as needed
- **CDN**: Consider Cloudflare for static assets

## 🚀 Going Live Checklist

- [ ] Database created and schema deployed
- [ ] Web service deployed successfully
- [ ] All environment variables configured
- [ ] CORS configured for production domain
- [ ] SSL certificate active (automatic on Render)
- [ ] API endpoints tested and working
- [ ] Frontend can connect to API
- [ ] Database connections stable
- [ ] Error monitoring set up (optional: Sentry, LogRocket)

## 🆘 Support

### Render Resources:

- [Render Documentation](https://render.com/docs)
- [Node.js Deployment Guide](https://render.com/docs/deploy-node-express-app)
- [Environment Variables Guide](https://render.com/docs/environment-variables)

### NestJS Resources:

- [NestJS Production Documentation](https://docs.nestjs.com/)
- [TypeORM Production Guide](https://typeorm.io/)

---

## 📝 Post-Deployment Notes

After deployment, remember to:

1. **Update your frontend** to use the new API URL
2. **Test all functionality** in production environment
3. **Monitor logs** for any runtime errors
4. **Set up monitoring** and alerts for production issues
5. **Document your production API URL** for team reference

Your BFEF Kenya Backend API is now live and ready to serve your frontend application! 🎉
