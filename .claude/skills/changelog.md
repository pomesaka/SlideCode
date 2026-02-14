# Skill: /changelog

CHANGELOG.md を main ブランチとの差分から更新する。

## 手順

1. `git diff origin/main...HEAD -- src/` の差分を取得する
2. `git diff origin/main...HEAD -- src/index.ts` でエクスポートの変更を特定する
3. `git log origin/main...HEAD --oneline` でコミット履歴を確認する
4. 現在の `CHANGELOG.md` を読む

## CHANGELOG 更新ルール

差分を分析し、`CHANGELOG.md` の `## [Unreleased]` セクションを更新する。

### フォーマット

```markdown
## [Unreleased]

### Added — 新規 API
新しいコンポーネント・型・フック・props の追加。使用例つき。

### Changed — 破壊的変更
既存 API の型変更・リネーム・デフォルト値変更。

### Deprecated — 非推奨
次バージョンで削除予定の API。

### Removed — 削除
削除された API。

### Fixed — バグ修正
API の動作修正（内部リファクタリングは記載不要）。
```

### 記載基準

**記載する:**
- 新しいコンポーネント/型/フックのエクスポート追加
- 既存コンポーネントへの props 追加
- props の型変更（例: `string` → `ReactNode`）
- エクスポートの追加・削除・リネーム

**記載しない:**
- 内部リファクタリング（API に影響しないもの）
- コメント・JSDoc の追加
- テスト・ドキュメントのみの変更
- CLAUDE.md の更新

### コンポーネント記載テンプレート

```markdown
- **`ComponentName`** — 説明 (`PropsType`)
  ```tsx
  <ComponentName prop="value" />
  ```
```

## 最終確認

- `## [Unreleased]` のみを更新する（過去バージョンは変更しない）
- 各項目に最低限の使用例コード（1-3行）を含める
- 型名は正確にエクスポート名と一致させる
