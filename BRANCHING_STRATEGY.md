# Git Branching Strategy

## Overview

This project uses a **two-branch workflow** to separate development from production:

- **`main`** → Production (verygoodmelon.fun)
- **`dev`** → Development/Preview (dev.verygoodmelon.fun or Vercel preview URL)

---

## Branch Descriptions

### `main` (Production)
- **Purpose**: Stable, production-ready code
- **Deployments**: Auto-deploys to https://verygoodmelon.fun
- **Protection**: Should be protected on GitHub
- **Merges**: Only from `dev` via Pull Request
- **Direct commits**: ❌ Not recommended

### `dev` (Development)
- **Purpose**: Active development and testing
- **Deployments**: Auto-deploys to Vercel preview environment
- **Protection**: Not protected (allows direct commits)
- **Merges**: Pull Requests optional but recommended
- **Direct commits**: ✅ Allowed for quick iterations

---

## Workflow

### Daily Development

1. **Work on dev branch**
   ```bash
   git checkout dev
   git pull origin dev

   # Make changes
   git add .
   git commit -m "Add feature X"
   git push origin dev
   ```

2. **Test on preview**
   - Vercel automatically deploys `dev` branch
   - Check preview URL (provided in Vercel dashboard or GitHub PR)
   - Verify changes work correctly

3. **Merge to production**
   ```bash
   # Create PR from dev → main on GitHub
   # OR merge directly (if you're confident):

   git checkout main
   git pull origin main
   git merge dev
   git push origin main
   ```

---

## Environment-Specific Behavior

### Local Development
- **Branch**: Any
- **Environment**: Development
- **Config**: `.env.local`
- **URL**: http://localhost:3000

### Preview Deployments (dev branch)
- **Branch**: `dev`
- **Environment**: Preview
- **Config**: Vercel environment variables (Preview)
- **URL**: Auto-generated (e.g., `verygoodmelon-git-dev-shaktech.vercel.app`)

### Production Deployments (main branch)
- **Branch**: `main`
- **Environment**: Production
- **Config**: Vercel environment variables (Production)
- **URL**: https://verygoodmelon.fun

---

## Vercel Configuration

### Production Branch
Set in Vercel Dashboard:
1. Go to **Project Settings** → **Git**
2. Set **Production Branch**: `main`
3. Enable **Automatic Deployments**

### Preview Branches
- All branches except `main` deploy to preview
- `dev` branch gets consistent preview URL
- Feature branches get unique preview URLs

---

## Quick Commands

### Switch to dev
```bash
git checkout dev
```

### Switch to main
```bash
git checkout main
```

### Create feature branch
```bash
git checkout dev
git checkout -b feature/your-feature-name
# Work on feature
git push origin feature/your-feature-name
# Create PR to dev
```

### Sync dev with main (if needed)
```bash
git checkout dev
git merge main
git push origin dev
```

---

## Protection Rules (Recommended)

### GitHub Branch Protection for `main`
1. Go to **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass (Vercel deployment)
   - ✅ Require branches to be up to date before merging
   - ⚠️ Do not allow force pushes
   - ⚠️ Do not allow deletions

This prevents accidental direct commits to production.

---

## Rollback Strategy

### If production breaks:
1. **Quick fix**: Revert the bad commit on `main`
   ```bash
   git checkout main
   git revert HEAD
   git push origin main
   ```

2. **Redeploy previous version**: In Vercel dashboard
   - Go to **Deployments**
   - Find last working deployment
   - Click **⋯** → **Promote to Production**

---

## FAQ

**Q: Can I deploy a feature branch to preview?**
A: Yes! Push any branch and Vercel will create a preview deployment.

**Q: How do I test before production?**
A: Always merge to `dev` first, test the preview deployment, then merge to `main`.

**Q: What if I accidentally commit to main?**
A: Cherry-pick the commit to `dev`, then revert it on `main`:
```bash
git checkout main
git revert HEAD
git push origin main

git checkout dev
git cherry-pick <commit-hash>
git push origin dev
```

**Q: Should I delete feature branches?**
A: Yes, after merging to `dev`. Keep `main` and `dev` permanent.

---

## Summary

✅ **DO**:
- Work on `dev` branch
- Test on preview before production
- Use PRs for `dev` → `main`
- Keep commits atomic and well-described

❌ **DON'T**:
- Commit directly to `main`
- Skip testing on `dev`
- Force push to `main`
- Deploy without reviewing changes

---

**Current Branch**:
```bash
git branch
```

**Current Remote**:
```bash
git remote -v
```
