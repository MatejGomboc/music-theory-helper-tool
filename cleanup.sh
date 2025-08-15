#!/bin/bash
# Cleanup script to remove files marked for deletion
# Run this script locally to complete the cleanup

echo "Removing conflicting files from mixed build tool setup..."

# Remove Vite-related files
if [ -f "vite.config.js" ]; then
  rm vite.config.js
  echo "✓ Removed vite.config.js"
fi

if [ -f "index.html" ]; then
  rm index.html
  echo "✓ Removed root index.html"
fi

if [ -f "src/main.jsx" ]; then
  rm src/main.jsx
  echo "✓ Removed src/main.jsx"
fi

# Remove duplicate files
if [ -f "src/musicTheory.js" ]; then
  rm src/musicTheory.js
  echo "✓ Removed src/musicTheory.js (keeping src/utils/musicTheory.js)"
fi

if [ -f "src/audioUtils.js" ]; then
  rm src/audioUtils.js
  echo "✓ Removed src/audioUtils.js (audio handled in Piano.js)"
fi

echo ""
echo "Cleanup complete! The project now uses Create React App exclusively."
echo ""
echo "To commit these deletions, run:"
echo "  git add -A"
echo "  git commit -m 'Remove conflicting Vite files and duplicates'"
echo "  git push"
echo ""
echo "To start the development server, run:"
echo "  npm install"
echo "  npm start"
