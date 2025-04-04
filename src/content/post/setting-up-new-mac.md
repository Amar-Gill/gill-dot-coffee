---
title: "Setting up a new MacBook for development"
description: "toto"
publishDate: "10 April 2025"
tags: ["development", "environment", "vim"]
draft: false
---
## Install XCode Command Line Tools
- because Mac lol
- start by installing `xcode-select`
:::tip
run `git --version` in the Terminal app to have MacOS prompt you for `xcode-select` installation
:::
- afterwards you can install XCode Command Line Tools with `xcode-select --install`

## Package Manager
- install the [homebrew](https://brew.sh/) package manager:

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
- update `.zprofile` for brew PATH variable:

```zsh title=".zprofile"
eval "$(/opt/homebrew/bin/brew shellenv)"
```
- open a new terminal and verify with `brew --version` or `which brew`

## Download Terminal Emulator
- right now I'm enjoying [ghostty](https://ghostty.org/)
```zsh
brew install ghostty
```
- other fine choices are [iterm2](https://iterm2.com/), [kitty](https://sw.kovidgoyal.net/kitty/), [wezterm](https://wezterm.org/) and [alacritty](https://alacritty.org/) to name a few

## Password Manager
- install 1password utility
```zsh
brew install 1password
```
- and install browser extension also

## Configure SSH Agent
- start by adding a new SSH key on GitHub:
  - go to [SSH keys settings page](https://github.com/settings/keys)
  - select New SSH Key
  - use 1password prompt to generate an SSH key; it will automatically be saved into your 1password vault
:::important
 Use the prompts by 1password browser extension to create your SSH key
:::
- make sure 1password ssh agent is enabled, under Settings -> Developer
- finish configuration by updating `.ssh/config` to use 1password as an `IdentityAgent`
```txt title=".ssh/config"
TODO
```

## Configure Dev Environment
- retrieve dotfiles from GitHub `git clone ...`
- install core dev tools via brew:
    - [ripgrep](https://github.com/BurntSushi/ripgrep) an oxidized alternative for `BSD/GNU grep`
    - [fd](https://github.com/sharkdp/fd) an oxidized alternative for `BSD/GNU find`
    - [fzf](https://github.com/junegunn/fzf) fuzzy finder utility
    - [tealdear](https://github.com/tealdeer-rs/tealdeer) an oxidized alternative for `tldr`
    - [thefuck](https://github.com/nvbn/thefuck)
- configure command prompt, such as `p10k.zsh` (I know it's deprecated)
- fzf command history integration IS TODO

## Editor
- Install Neovim
    - thanks to `lazy.nvim` the plugins and should auto install when first starting up
    - `mason.nvim` will auto install the language servers
    - also treesitter syntaxes will auto-install
    - do a `:healthcheck` to see if anything else is missing in your Neovim environment

## Configure Languages and Run Times
- install Node Version Manager
    - install [nvm](todo) -- official recommendation is to *not* use homebrew
    - OR use [pnpm env](https://pnpm.io/cli/env)??
- Golang
- Rust
- pyenv


## Other Goodies
- Update MacOS dock hide delay and animation to 0 seconds
    ```
    defaults write com.apple.dock autohide-delay -float 0;\
    defaults write com.apple.dock autohide-time-modifier -int 0;\
    killall Dock;

    ```

- To undo and restore default settings:

  ```
  defaults delete com.apple.Dock autohide-delay; killall Dock

  ```
- 6. Karabiner Elements -- remap keys as required
    - this will override keyboard modifications made in native MacOS settings

## Other Tools
- OrbStack (Docker Desktop alternative)

Apps
- OneMenu (or Rectangle)
- Obsidian
- vial
