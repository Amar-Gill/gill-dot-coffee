---
title: Find and replace a term in all files of a directory
description: Find and replace a search term in all files of a directory recursively, using the command line
publishDate: "2025-04-04T22:00:00Z"
---
Using `ripgrep` combined with `sed` utilities, use the snippet below:

```bash
rg --files-with-matches <term> | xargs sed -i '' 's/<term>/<new-term>/g'
```
:::note
MacOS `sed` implementation is different from GNU/Linux implementation
:::

[source](https://stackoverflow.com/questions/1585170/how-to-find-and-replace-all-occurrences-of-a-string-recursively-in-a-directory-t)
