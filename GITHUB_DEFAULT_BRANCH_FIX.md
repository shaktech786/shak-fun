# Change GitHub Default Branch (master → main)

## 🎯 The Real Issue

Your GitHub repository's default branch is still `master`, which is why Vercel uses it for production deployments.

**Fixing this on GitHub will automatically fix it in Vercel!**

---

## ✅ Step-by-Step Fix

### 1. Go to Your GitHub Repository Settings

**Direct Link**: https://github.com/shaktech786/shak-fun/settings/branches

Or manually:
1. Go to: https://github.com/shaktech786/shak-fun
2. Click **Settings** tab (top right)
3. Click **Branches** (left sidebar)

### 2. Change Default Branch

You'll see a section that says **"Default branch"**

Current: `master`

1. Click the **two arrows icon** (↔️) or **pencil icon** next to `master`
2. A dropdown will appear - select `main`
3. Click **Update** or **I understand, update the default branch**
4. Confirm the change

### 3. Verify the Change

After changing:
- The default branch badge should now show `main`
- New clones will use `main` by default
- Pull requests will default to `main`

---

## 🔄 What Happens After

Once GitHub's default branch is `main`:

1. **Vercel automatically detects** this change (within a few minutes)
2. **Production deployments** will start using `main` branch
3. **Old `master` deployments** become preview deployments
4. **Your custom domain** (verygoodmelon.fun) will point to `main`

You don't need to do anything else in Vercel!

---

## 🧪 Test the Fix

After changing GitHub's default branch:

1. **Push to main**:
   ```bash
   git checkout main
   git commit --allow-empty -m "Test production deployment on main"
   git push origin main
   ```

2. **Check Vercel deployments**:
   ```bash
   vercel ls
   ```

3. **Look for**:
   - Deployment from `main` branch
   - Environment: `Production`
   - URL: https://verygoodmelon.fun

---

## ⚠️ Important Notes

### Don't Delete `master` Branch Yet

Keep the `master` branch around temporarily:
- Some deployments might still reference it
- Easier to roll back if needed
- You can delete it after confirming `main` works

### Update Local Tracking

After the change, update your local git config:

```bash
# Set main as default for new clones
git config --global init.defaultBranch main

# Update your current repo's head reference
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main
```

### Update Any CI/CD Configs

If you have:
- GitHub Actions workflows
- Other deployment scripts
- Documentation

Make sure they reference `main` instead of `master`.

---

## 📊 Current vs. After

### Current State:
```
GitHub Default: master  ← Vercel follows this
├─ main (exists but not default)
└─ dev
```

### After Change:
```
GitHub Default: main  ← Vercel will follow this
├─ master (legacy, kept for safety)
└─ dev
```

---

## 🚨 Can't Find the Setting?

If you don't see the "Default branch" section in Settings → Branches:

**Possible reasons:**
1. You don't have admin access (need owner/admin permissions)
2. The repository is protected
3. The UI has changed (GitHub updates frequently)

**Alternative Method - Via GitHub CLI**:

```bash
# Install GitHub CLI if not installed
brew install gh

# Authenticate
gh auth login

# Change default branch
gh repo edit shaktech786/shak-fun --default-branch main
```

---

## ✅ Quick Verification Checklist

After making the change:

- [ ] GitHub shows `main` as default branch
- [ ] Push to `main` creates Production deployment in Vercel
- [ ] `verygoodmelon.fun` serves content from `main`
- [ ] Preview deployments still work for `dev` branch
- [ ] No errors in Vercel deployments

---

## 🎉 Expected Result

After this change:
- ✅ Builds are fixed (already done via environment variables!)
- ✅ Production branch is `main` (automatic after GitHub change)
- ✅ No manual Vercel configuration needed
- ✅ Everything "just works"

---

**Go ahead and change it now!** It takes 30 seconds and fixes both issues.

Direct link: https://github.com/shaktech786/shak-fun/settings/branches
