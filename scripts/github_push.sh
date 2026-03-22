#!/bin/bash
# github_push.sh - Skript zum Pushen von Änderungen oder PRs nach GitHub

# Nutzung: ./github_push.sh <branch_name> <commit_message>

BRANCH="$1"
COMMIT_MSG="$2"

if [[ -z "$BRANCH" || -z "$COMMIT_MSG" ]]; then
  echo "Usage: $0 <branch_name> <commit_message>"
  exit 1
fi

# Beispielbasis: Alle Änderungen hinzufügen, committen, pushen

git checkout -b "$BRANCH"
git add .
git commit -m "$COMMIT_MSG"
git push --set-upstream origin "$BRANCH"

# Hinweis: Für PR Automatisierung ggf. GitHub CLI 'gh' einsetzen (nicht enthalten)
echo "Code auf Branch $BRANCH gepusht."