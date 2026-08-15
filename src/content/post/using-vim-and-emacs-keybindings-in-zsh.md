---
title: Using vim and emacs Keybindings in zsh
description: "Configuring you zsh session to use emacs and vim keybindings and a guide to some core features"
publishDate: 13 August 2026
tags: ["zsh", "vim", "emacs"]
draft: true
---

## Why Understand Different Keybind Modes

As a Neovim user I spent alot of time working in the terminal. So it's beneficial to optimize how you interact with the command line.

## Configuring Keybindings

The default out of the box keybindings for a zsh terminal is emacs mode. At least on MacOS.

To explicitly configure each mode run the following commands in your terminal session:

```zsh
# enable emacs bindings
bindkey -e
```
<br />

```zsh
# enable vim bindings
bindkey -v
```

These commands can also be added to your `.zshrc` file as needed.

## Core Features of Emacs Mode

If you are an emacs user these won't be new to you. Here is a short overview of some core movements.

| Key | Movement |
--------|---------
|<kbd>ctrl + b</kbd> | Move cursor back one character |
|<kbd>ctrl + f</kbd> | Move cursor forward one character |
|<kbd>alt + b</kbd> | Move cursor back one word |
|<kbd>alt + f</kbd> | Move cursor forward one word |
|<kbd>ctrl + a</kbd> | Move cursor to beginning of command |
|<kbd>ctrl + e</kbd> | Move cursor to end of command |
|<kbd>ctrl + d</kbd> | Delete the character ahead of cursor |
|<kbd>ctrl + w</kbd> | Delete the full word behind the cursor |

Look up [emacs documentation](https://www.gnu.org/software/emacs/manual/html_node/emacs/index.html) for full reference.

## Core Features of Vim Mode

To enter Vim mode hit <kbd>esc</kbd> or <kbd>ctrl + [</kbd>. A zsh prompt like [powerlevel10k](todo) gives you a convenient visual prompt indicator that you are using vim mode.

From there you can use vim keybindings to edit the current terminal command.

Brief overview of some core commands:

| Key | Command |
|-----| ------- |
| <kdb>h</kdb> | Move cursor back one character |
| <kdb>l</kdb> | Move cursor forward one character |
| <kdb>b</kdb> | Move cursor to beginning of last word |
| <kdb>w</kdb> | Move cursor forward back to beginning of next word |
| <kdb>e</kdb> | Move cursor forward to end of next word |

You can hit enter to execute the command from Vim mode or enter insert mode by hitting <kbd>i</kbd> or <kbd>a</kbd>. Which are also basic Vim keybinds.

## Working With Command History

A useful tool in the terminal is to cycle through your shell history.

### Emacs Mode

In emacs mode you can use <kbd>ctrl +p</kbd> to access previously executed commands.

Use <kbd>ctrl +n</kbd> to move forward in history.

### Vim Mode

You will need to enter Vim mode before using the <kbd>ctrl + p</kbd> and <kbd>ctrl + n</kbd> keybindings to do the same. Alternatively you can use <kbd>-</kbd> and <kbd>+</kbd> to do the same.

## Understanding $EDITOR and $VISUAL Environment Variables

It's useful to configure your terminal session with the `$EDITOR` or `$VISUAL` environment variables. This lets you use your preferred editor when doing things like editing the commit message for a merge conflict.

A caveat to be aware of is that by default, zsh will use Vim mode if the `$EDITOR` or `$VISUAL` environment variable is set to `vi`, `vim`, or `nvim`.

If you prefer to to emacs mode and still have vim or nvim as your editor, you must explicitly set the `bindkey -e` option in your `.zshrc` file.

```zsh
export EDITOR=nvim
# manually configure default emacs keybindings but still have nvim as editor
# because zsh will automatically switch to vim keybindings when $EDITOR or $VISUAL matches on "vi"
bindkey -e
```

