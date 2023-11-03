# Generate Next Release info

This is a GitHub Action generates a new git tag and date for the new GitHub Release.

## Example workflow

```yaml
name: Create Release

on:
  push:
    branches:
      - release

jobs:
  create_release:
    name: Create a Release
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout branch
        uses: actions/checkout@v2
      - name: Generate release tag
        id: next_release
        uses: runaction/next-release@v1.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          tag_prefix: 'v'
      - name: Create a release
        env:
          GH_TOKEN: ${{ github.token }}
          RELEASE_TITLE: Release ${{ steps.next_release.outputs.next_release_date }}
          TAG_NAME: ${{ steps.next_release.outputs.next_release_tag }}
        run: |
          gh release create \
            ${{ env.TAG_NAME }} \
            --generate-notes \
            --target release \
            --title "${{ env.RELEASE_TITLE }}" \
            --latest
```

## Ho to build

Run `npm run dist` (and `npm run lint-and-fix` if needed) to build source code.
