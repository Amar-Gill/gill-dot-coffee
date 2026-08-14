---
title: Using vim and emacs Keybindings in zsh
description: "Configuring you zsh session to use emacs and vim keybindings and a guide to some core features"
publishDate: 13 August 2026
tags: ["zsh", "vim", "emacs"]
draft: true
---

Default in zsh is emacs.

To explicitly configure each mode add the following line to zshrc:

Enable emacs keybindings:
```zsh
bindkey -e
```

Emacs mode is the default for zsh.

Enable vim keybindings:
```zsh
bindkey -v
```

Talk about $EDITOR and $VISUAL environment variables and side effects

