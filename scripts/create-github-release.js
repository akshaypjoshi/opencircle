#!/usr/bin/env node

/**
 * Script to create GitHub releases without npm publishing
 * This script creates a GitHub release with changelog information
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get version from root package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

// Read changelog if it exists
const changelogPath = path.join(__dirname, '../CHANGELOG.md');
let changelogContent = '';

if (fs.existsSync(changelogPath)) {
  const changelog = fs.readFileSync(changelogPath, 'utf8');

  // Extract the latest version section from changelog
  const versionRegex = new RegExp(`## \\[${version}\\]\\([^)]+\\)\\s*\\n\\s*\\n([\\s\\S]*?)(?=## \\[|$)`, 'i');
  const match = changelog.match(versionRegex);

  if (match && match[1]) {
    changelogContent = match[1].trim();
  }
}

// Create release notes
const releaseNotes = `# Release ${version}

${changelogContent || 'No changelog information available.'}

---
This release was created automatically using Changesets.
`;

// Create GitHub release using GitHub CLI (gh)
try {
  console.log(`🚀 Creating GitHub release for version ${version}...`);

  // Check if gh CLI is available
  execSync('which gh', { stdio: 'ignore' });

  // Create release
  const command = `gh release create v${version} --title "Release ${version}" --notes "${releaseNotes.replace(/"/g, '\\"')}"`;
  execSync(command, { stdio: 'inherit' });

  console.log(`✅ GitHub release v${version} created successfully!`);
} catch (error) {
  if (error.status === 1) {
    console.warn('⚠️ GitHub CLI (gh) not found. Skipping GitHub release creation.');
    console.log('To enable GitHub releases, install GitHub CLI: https://cli.github.com/');
    console.log('Or set up GITHUB_TOKEN in your environment for programmatic access.');
  } else {
    console.error('❌ Error creating GitHub release:', error.message);
    process.exit(1);
  }
}
