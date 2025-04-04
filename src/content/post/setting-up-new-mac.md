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

```zsh title=".zprofile" ins={1}
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
- install 1Password utility
```zsh
brew install 1password
```
- and install browser extension also

## Configure SSH Agent
- start by adding a new SSH key on GitHub with the help of 1Password:
  - go to [SSH keys settings page](https://github.com/settings/keys) on GitHub
  - select **New SSH Key**
  - use 1Password prompt to generate an SSH key; it will automatically be saved into your 1Password vault
:::important
 Use the prompts by 1Password browser extension to create your SSH key for the most seamless experience
:::
- make sure 1Password SSH agent is enabled, under Settings -> Developer
- finish configuration by updating `.ssh/config` to use 1Password as an `IdentityAgent`
```txt title=".ssh/config"
TODO
```
- now whenever an application attempts to read your private SSH keys, you will be prompted by the 1Password app to authorize the action
- [read more about the 1Password SSH agent](https://developer.1password.com/docs/ssh/agent/)

## Configure Dev Environment
### Dotfiles
- I'm using [dotbot](https://github.com/anishathalye/dotbot) as a dotfiles manager; I find to quite easy to work with
- it uses symlinks to link files from my dotfiles repository to the locations required by my system
```zsh
git clone git@github.com:Amar-Gill/dotfiles.git; cd dotfiles; ./install
```

### Command Prompt
- I'm still using [p10k.zsh](https://github.com/romkatv/powerlevel10k)
- I know it's not actively developed any more, but it still works well
```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

### Command Line Utilities
- [fzf](https://github.com/junegunn/fzf) fuzzy finder utility
- [ripgrep](https://github.com/BurntSushi/ripgrep) an oxidized alternative for `BSD/GNU grep`
- [fd](https://github.com/sharkdp/fd) an oxidized alternative for `BSD/GNU find`
- [tealdear](https://github.com/tealdeer-rs/tealdeer) an oxidized alternative for `tldr`
- [thefuck](https://github.com/nvbn/thefuck)

### fzf Command History Integration
- fzf command history integration IS TODO

### Languages and Run Times
- install Node Version Manager
  - install [nvm](todo) -- official recommendation is to *not* use homebrew
  - OR use [pnpm env](https://pnpm.io/cli/env)??
- Golang
- Rust
- pyenv

### Neovim
- Install Neovim with brew
```zsh
brew install neovim
```
- thanks to `lazy.nvim` the plugins and should auto install when first starting up
- `mason.nvim` will auto install the language servers
- also treesitter syntaxes will auto-install
- do a `:healthcheck` to see if anything else is missing in your Neovim environment

### Docker
- OrbStack (Docker Desktop alternative)

## Keyboard Remaps
- Karabiner Elements -- remap keys as required
- this will override keyboard modifications made in native MacOS settings
- useful when editing with Neovim where the control key is often used
- vial

## Adjust Dock Hide Delay and Animation
- the default delay and animation time of the MacOS dock can be adjusted to be instant
- open a terminal and execute the following:
```zsh
defaults write com.apple.dock autohide-delay -float 0;\
defaults write com.apple.dock autohide-time-modifier -int 0;\
killall Dock;
```
- To restore the default settings run the following in a terminal:
```zsh
defaults delete com.apple.Dock autohide-delay; killall Dock
```

## Window Manager
- OneMenu (or Rectangle)

## Notes
- Obsidian
