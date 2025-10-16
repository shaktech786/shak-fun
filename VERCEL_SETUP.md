# Vercel Configuration Guide

## ✅ Automated Configuration (Already Done)

The following has been configured via `vercel.json`:

- ✅ **Framework Detection**: Next.js
- ✅ **Build Command**: `npm run build`
- ✅ **Dev Command**: `npm run dev`
- ✅ **Install Command**: `npm install`
- ✅ **Git Deployments**: Enabled for `main` and `dev` branches
- ✅ **Auto Aliases**: Enabled
- ✅ **Auto Job Cancelation**: Enabled (cancels old deployments when new ones start)

## ⚙️ Manual Configuration Required (One-Time Setup)

The following settings **must be configured in the Vercel Dashboard** (cannot be set via CLI):

### 1. Set Production Branch to `main`

**Current Status**: Production branch is set to `master` (legacy)

**Action Required**:
1. Go to: https://vercel.com/shaktech/shak-fun/settings/git
2. Find **"Production Branch"** section
3. Change from `master` to `main`
4. Click **Save**

**Why**: This ensures only the `main` branch deploys to production (verygoodmelon.fun)

---

### 2. Enable Vercel Analytics

**Action Required**:
1. Go to: https://vercel.com/shaktech/shak-fun/analytics
2. Click **"Enable Analytics"**
3. Analytics will start tracking on next deployment

**What You Get**:
- Page views
- Unique visitors
- Top pages
- Geographic data
- User paths
- Conversion funnels

**Cost**: Free for up to 100k data points/month

---

### 3. Configure Environment Variables (Optional)

If you need different values for dev vs production:

1. Go to: https://vercel.com/shaktech/shak-fun/settings/environment-variables
2. For each variable, specify environment:
   - **Production**: Only for `main` branch
   - **Preview**: For all other branches (including `dev`)
   - **Development**: For local development

**Current Variables**:
- `GOOGLE_GEMINI_API_KEY`
- `GOOGLE_GEMINI_MODEL`
- `GOOGLE_PROJECT_ID`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

All are currently set for all environments (Production + Preview).

---

## 🎯 Expected Behavior After Configuration

### Production Deployments
- **Trigger**: Push to `main` branch
- **URL**: https://verygoodmelon.fun
- **Environment**: Production
- **Variables**: Production environment variables

### Preview Deployments
- **Trigger**: Push to any branch except `main`
- **URL**: Auto-generated (e.g., `verygoodmelon-git-dev-shaktech.vercel.app`)
- **Environment**: Preview
- **Variables**: Preview environment variables

### Branch-Specific URLs
- `dev` branch gets consistent preview URL
- Feature branches get unique preview URLs
- All preview deployments are listed in dashboard

---

## 📊 Monitoring & Analytics

### Speed Insights (Already Active)
- **Location**: https://vercel.com/shaktech/shak-fun/speed-insights
- **Tracks**: Core Web Vitals, page load performance, real user metrics
- **Already configured**: Via `@vercel/speed-insights` package

### Analytics (Needs Activation)
- **Location**: https://vercel.com/shaktech/shak-fun/analytics
- **Tracks**: Page views, visitors, geographic data, user paths
- **Action needed**: Click "Enable Analytics" in dashboard
- **Already configured**: Via `@vercel/analytics` package

---

## 🔍 Verification Commands

### Check Current Production Branch
```bash
# Via API (requires Vercel token)
curl -s -X GET "https://api.vercel.com/v9/projects/prj_MCkwLalUqiYR1QYyFiKt3qKahj50" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq '.link.productionBranch'
```

### Check Deployments
```bash
vercel ls
```

### Check Environment Variables
```bash
vercel env ls
```

### Deploy Manually
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🚨 Important Notes

### Production Branch Change
After changing production branch to `main`, the first deployment may take a few extra minutes as Vercel rebuilds the production environment.

### Old Deployments
Deployments from `master` branch will remain accessible at their unique URLs, but new pushes to `master` will only create preview deployments (not production).

### Analytics Data Retention
- Free plan: 24 hours of data
- Pro plan: 30 days of data
- Enterprise: Custom retention

---

## 📝 Quick Links

- **Project Dashboard**: https://vercel.com/shaktech/shak-fun
- **Git Settings**: https://vercel.com/shaktech/shak-fun/settings/git
- **Environment Variables**: https://vercel.com/shaktech/shak-fun/settings/environment-variables
- **Analytics**: https://vercel.com/shaktech/shak-fun/analytics
- **Speed Insights**: https://vercel.com/shaktech/shak-fun/speed-insights
- **Deployments**: https://vercel.com/shaktech/shak-fun/deployments
- **Domains**: https://vercel.com/shaktech/shak-fun/settings/domains

---

## ✅ Checklist

Before considering setup complete:

- [ ] Set production branch to `main` in dashboard
- [ ] Enable Analytics in dashboard
- [ ] Verify `verygoodmelon.fun` points to `main` branch deployments
- [ ] Test preview deployment by pushing to `dev` branch
- [ ] Confirm Speed Insights is collecting data
- [ ] Confirm Analytics starts collecting after enablement

---

## 🤔 Troubleshooting

### Production still deploys from master
1. Check production branch setting in Git settings
2. Ensure `main` branch has recent commits
3. Trigger manual production deployment: `vercel --prod`

### Analytics not showing data
1. Ensure Analytics is enabled in dashboard
2. Deploy after enabling (data collection starts post-deployment)
3. Visit site to generate some page views
4. Wait 5-10 minutes for data to appear

### Preview URLs not working
1. Check GitHub integration is connected
2. Verify branch has been pushed to remote
3. Check deployments tab for error messages
4. Ensure `vercel.json` has no syntax errors

---

*Last updated: 2025-01-16*
