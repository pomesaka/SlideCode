#!/usr/bin/env bash
# npm version の preversion/version フックから呼ばれるスクリプト
# CHANGELOG.md の [Unreleased] を現在の package.json バージョンに置き換える

set -euo pipefail

VERSION=$(node -p "require('./package.json').version")
DATE=$(date +%Y-%m-%d)

if ! grep -q '## \[Unreleased\]' CHANGELOG.md; then
  echo "CHANGELOG.md に [Unreleased] セクションが見つかりません"
  exit 0
fi

# [Unreleased] → [x.y.z] — YYYY-MM-DD に置換し、新しい空の Unreleased を挿入
sed -i "s/## \[Unreleased\]/## [${VERSION}] — ${DATE}/" CHANGELOG.md
sed -i "/^## \[${VERSION}\]/i ## [Unreleased]\n\n---\n" CHANGELOG.md

git add CHANGELOG.md
echo "CHANGELOG.md updated: [Unreleased] → [${VERSION}] — ${DATE}"
