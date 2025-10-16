# How to Change Production Branch in Vercel (master → main)

## ⚠️ Important Note
The production branch setting in Vercel **cannot be found in the traditional Git settings page** for some project types. Here's where to actually find it:

---

## Option 1: Project Settings → Git (Most Common)

**This is usually hidden or not available for some projects!**

1. Go to your project: https://vercel.com/shaktech/shak-fun
2. Click **Settings** (in top nav)
3. Click **Git** (in left sidebar)
4. Look for **"Production Branch"** section
   - If you see it: Change `master` to `main` and click Save
   - If you DON'T see it: Try Option 2 or 3

---

## Option 2: Git Integration Settings (Alternative)

1. Go to: https://vercel.com/shaktech/shak-fun/settings/git-integration
2. Or navigate: **Settings** → **General** → scroll to **Git** section
3. Look for **Connected Git Repository** section
4. There should be a **Production Branch** dropdown or input
5. Change to `main` and save

---

## Option 3: Via GitHub Integration (If Above Don't Work)

Sometimes you need to disconnect and reconnect:

1. Go to: https://vercel.com/shaktech/shak-fun/settings/git-integration
2. Click **Disconnect** (if you see it)
3. Click **Connect Git Repository** button
4. Select your repo: `shaktech786/shak-fun`
5. During connection, you'll be asked to specify the **Production Branch**
6. Select or type: `main`
7. Complete the connection

---

## Option 4: Direct Link (Try This First!)

Sometimes Vercel hides settings in weird places. Try this direct link:

**https://vercel.com/shaktech/shak-fun/settings**

Then look for ANY of these terms:
- "Production Branch"
- "Git Branch"
- "Deploy Branch"
- "Branch Configuration"

It might be under:
- Settings → Git
- Settings → General (scroll down)
- Settings → Git Integration
- Settings → Deployment

---

## Option 5: Via Vercel Support Page

If you still can't find it, the setting might be locked or missing because:

1. **Your project might be using a `.git` config**: Check if you have `.vercel/project.json` with git settings
2. **The repo might be connected differently**: Try the GitHub App integration instead of Git integration
3. **It's a legacy project**: Some older projects don't expose this setting

**Workaround**:
- Create a new Vercel project
- Import from the same GitHub repo
- During setup, select `main` as production branch
- Delete the old project

---

## How to Verify It Worked

After changing the production branch:

1. Push a commit to `main` branch:
   ```bash
   git checkout main
   git commit --allow-empty -m "Test production deployment"
   git push origin main
   ```

2. Check deployments:
   ```bash
   vercel ls
   ```

3. Look for a deployment with:
   - ✅ `Production` environment (not Preview)
   - ✅ From `main` branch
   - ✅ Deployed to your custom domain

---

## Current Status

**Your project:**
- Project: `shaktech/shak-fun`
- Repo: `shaktech786/shak-fun`
- Current production branch: `master` (needs change)
- Desired production branch: `main`
- Custom domain: `verygoodmelon.fun`

**After successful change:**
- Pushes to `main` → Deploy to production (verygoodmelon.fun)
- Pushes to `dev` → Deploy to preview (auto-generated URL)
- Pushes to `master` → Deploy to preview (legacy, will be ignored)

---

## Still Can't Find It?

If none of these work, take a screenshot of your **Settings** page and I'll help you identify where the setting is hidden!

Common UI variations:
- Some projects show it under "Deployment Protection"
- Some show it under "Build & Development Settings"
- Some require you to edit `vercel.json` instead

---

## Alternative: Use vercel.json (If UI Setting Doesn't Exist)

If the setting truly doesn't exist in the UI, you might need to configure it via code.

However, based on Vercel API testing, the production branch setting is **Git repository metadata**, not a project setting, so it's controlled by the GitHub integration.

**Solution**: Make sure `main` is the **default branch on GitHub**:

1. Go to: https://github.com/shaktech786/shak-fun/settings/branches
2. Change default branch from `master` to `main`
3. Vercel should automatically use the default branch as production

---

Let me know which option works for you!
