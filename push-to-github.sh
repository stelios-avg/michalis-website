#!/bin/bash
# Script για ανέβασμα του project στο GitHub
# Πριν τρέξεις: Δημιούργησε νέο repository στο https://github.com/new
# Όνομα προτεινόμενο: michalis-website

REPO_NAME="${1:-michalis-website}"
# Άλλαξε το GITHUB_USER με το username σου στο GitHub
# Άλλαξε το steliosavgousti με το GitHub username σου αν διαφέρει
GITHUB_USER="${GITHUB_USER:-steliosavgousti}"

echo "Προσθήκη remote: https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git" 2>/dev/null || git remote set-url origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
echo "Push στο GitHub..."
git push -u origin main
