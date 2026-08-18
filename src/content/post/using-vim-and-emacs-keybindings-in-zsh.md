---
title: Using vim and emacs keybindings in zsh
description: "Configuring you zsh session to use emacs and vim keybindings and a guide to some core features"
publishDate: 17 August 2026
tags: ["zsh", "vim", "emacs"]
draft: false
---

## Why Understand Different Keybind Modes

As a Neovim user I spend alot of time working in the terminal. So it's beneficial to optimize how I interact with the command line.

## Configuring Keybindings

The default out of the box keybindings for a zsh session is emacs mode.

To explicitly configure each mode run the following commands in your zsh session.

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

Here is a short overview of some core keymaps. If you are an emacs user these won't be new to you.

| Key | Movement |
--------|---------
|<kbd>ctrl + b</kbd> | Move cursor back one character |
|<kbd>ctrl + f</kbd> | Move cursor forward one character |
|<kbd>alt + b</kbd> | Move cursor back one word |
|<kbd>alt + f</kbd> | Move cursor forward one word |
|<kbd>ctrl + a</kbd> | Move cursor to beginning of line |
|<kbd>ctrl + e</kbd> | Move cursor to end of line |
|<kbd>ctrl + d</kbd> | Delete the character ahead of cursor |
|<kbd>ctrl + w</kbd> | Delete the full word behind the cursor |

Refer to the [emacs documentation](https://www.gnu.org/software/emacs/manual/html_node/emacs/index.html) for full reference.

## Core Features of Vim Mode

If you have Vim keybindings enabled, you can toggle between insert mode and normal mode like you would in the Vim editor program.

Your session will start in insert mode on opening. It's where you can enter new text into the command line.

Like in the Vim editor, normal mode is where you can navigate text objects and manipulate the text by deleting or copy pasting.

To enter normal mode hit <kbd>esc</kbd> or <kbd>ctrl + [</kbd>.

A zsh prompt like [powerlevel10k](https://github.com/romkatv/powerlevel10k) gives you a convenient visual prompt indicator that you are using normal mode. Another visual indicator is that your cursor should change from a blinking vertical line to a blinking rectangle.

Below is brief overview of some core keymaps to use in normal mode. If you are a Vim user you will likely know all of these as well as the many modifiers available to each keymap.


| Key | Command |
|-----| ------- |
| <kbd>h</kbd> | Move cursor back one character |
| <kbd>l</kbd> | Move cursor forward one character |
| <kbd>b</kbd> | Move cursor to beginning of last word |
| <kbd>w</kbd> | Move cursor forward to beginning of next word |
| <kbd>e</kbd> | Move cursor forward to end of next word |
| <kbd>d + a + w</kbd> | Delete the whole word |
| <kbd>c + a + w</kbd> | Change the whole word, puts you back into insert mode |
| <kbd>C</kbd> | Change the portion of the line from the cursor to the end of the line, puts you back into insert mode |


Any key that takes you back into insert mode for the Vim editor can be used to go back into insert mode in your zsh session. Those are the following.

- <kbd>a</kbd>
- <kbd>i</kbd>
- <kbd>c</kbd>
- <kbd>s</kbd>
- <kbd>o</kbd>

## Working With Command History

A useful tool in the terminal is to cycle through your shell history.

### Emacs Mode

In emacs mode you can use <kbd>ctrl +p</kbd> and <kbd>ctrl +n</kbd> cycle backwards and forwards through your command history respectively.

### Vim Mode

In Vim mode, you will need to enter normal mode before using the <kbd>ctrl + p</kbd> and <kbd>ctrl + n</kbd> keybindings to do the same. Alternatively you can use <kbd>-</kbd> and <kbd>+</kbd>.

## Understanding $EDITOR and $VISUAL Environment Variables

It's useful to configure your terminal session with the `$EDITOR` or `$VISUAL` environment variables. This lets you use your preferred editor when doing things like editing the commit message for a merge conflict.

:::important
> A caveat to be aware of is that by default, zsh will use Vim mode if the `$EDITOR` or `$VISUAL` environment variable is set to `vi`, `vim`, or `nvim`.
:::

If you prefer to use emacs mode and still have vim or nvim as your editor, you must explicitly set the `bindkey -e` option in your `.zshrc` file.

```zsh
// .zshrc
export EDITOR=nvim
# manually configure default emacs keybindings but still have nvim as editor
# because zsh will automatically switch to vim keybindings when $EDITOR or $VISUAL matches on "vi"
bindkey -e
```

