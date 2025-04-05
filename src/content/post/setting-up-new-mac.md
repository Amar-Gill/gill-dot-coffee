---
title: "Setting up a new MacBook for development"
description: "Common steps I take to set up a new MacBook for software development"
publishDate: "04 April 2025"
tags: ["mac", "zsh", "neovim", "security"]
draft: false
---
## XCode
- Start by installing `xcode-select`
:::tip
run `git --version` in the Terminal app to have MacOS prompt you for `xcode-select` installation
:::
- Afterwards you can install XCode Command Line Tools with `xcode-select --install`

## Package Manager
- Install the [Homebrew](https://brew.sh/) package manager:

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
- Update `.zprofile` to add `brew` to your `PATH`

```zsh title=".zprofile" ins={1}
eval "$(/opt/homebrew/bin/brew shellenv)"
```
- Open a new terminal and verify with `brew --version` or `which brew`

## Download Terminal Emulator
- Right now I'm enjoying [ghostty](https://ghostty.org/)
```zsh
brew install ghostty
```
- Other fine choices are [iterm2](https://iterm2.com/), [kitty](https://sw.kovidgoyal.net/kitty/), [wezterm](https://wezterm.org/) and [alacritty](https://alacritty.org/) to name a few

## Password Manager
- Install 1Password utility
```zsh
brew install 1password
```
- And install the browser extension too

## Configure SSH Agent
- Start by adding a new SSH key on GitHub with the help of 1Password:
  - Go to [SSH keys settings page](https://github.com/settings/keys) on GitHub
  - Select **New SSH Key**
  - Use 1Password prompt to generate an SSH key; it will automatically be saved into your 1Password vault
:::important
 Use the prompts by 1Password browser extension to create your SSH key for the most seamless experience
:::
- Make sure 1Password SSH agent is enabled, under **1Password > Settings > Developer**
- Finish configuration by updating `.ssh/config` to use 1Password as an `IdentityAgent`
```txt title=".ssh/config" ins={1-2}
Host *
	IdentityAgent "~/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"
```
- Now, whenever an application attempts to read your private SSH keys, you will be prompted by the 1Password app to authorize the action
- [Read more about the 1Password SSH agent](https://developer.1password.com/docs/ssh/get-started)

## Configure Dev Environment
### Dotfiles
- I'm using [dotbot](https://github.com/anishathalye/dotbot) as a dotfiles manager
- It works by symlinking files from my `/dotfiles` repository to the locations required by my system
```zsh
git clone git@github.com:Amar-Gill/dotfiles.git; cd dotfiles; ./install
```

### Command Prompt
- I'm using [p10k.zsh](https://github.com/romkatv/powerlevel10k), a tried and true zsh theme
```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```
- look into [Starship](https://starship.rs/) as another good choice

### Command Line Utilities
- The following can be installed with `brew`
  - [fzf](https://github.com/junegunn/fzf) fuzzy finder utility
  - [ripgrep](https://github.com/BurntSushi/ripgrep) an oxidized alternative for `BSD/GNU grep`
  - [fd](https://github.com/sharkdp/fd) an oxidized alternative for `BSD/GNU find`
  - [tealdear](https://github.com/tealdeer-rs/tealdeer) an oxidized alternative for `tldr`
  - [thefuck](https://github.com/nvbn/thefuck) correct mistyped console commands

### Languages and Runtimes
- Install [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) to manage NodeJS installations
```zsh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```
:::important
Official recommendation is to *not* use homebrew
:::

- Install [pnpm](https://pnpm.io/); A more performant alternative of `npm` that leverages a local cache for packages
:::tip
`pnpm` supports managing NodeJS versions as well using the [pnpm env](https://pnpm.io/cli/env) command. Something to consider for your own set up.
:::

- Golang programming language and toolchain
```zsh
brew install go
```

- Rust programming language and toolchain
```zsh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- [pyenv](https://github.com/pyenv/pyenv); A Python version manager
```zsh
brew install pyenv
```

- [rbenv](https://rbenv.org/); A Ruby version manager
```zsh
brew install rbenv
```

### Neovim
- Install [Neovim](https://neovim.io/) with `brew`
```zsh
brew install neovim
```
- Thanks to the [lazy.nvim](https://github.com/folke/lazy.nvim) plugin manager, my plugins will auto install when first starting up
- The [mason-lspconfig.nvim](https://github.com/williamboman/mason-lspconfig.nvim) plugin will auto install the language servers as well
- Treesitter syntaxes will auto-install thanks to the [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) plugin
- Do a `:healthcheck` to see if anything else is missing in your Neovim environment

### Docker
- For working with Docker containers I like [OrbStack](https://orbstack.dev/) over Docker Desktop
```zsh
brew install orbstack
```

## Keyboard Remaps
### Karabiner Elements
- Use [Karabiner Elements](https://karabiner-elements.pqrs.org/) to remap keys on the Apple Internal Keyboard of your MacBook
```zsh
brew install karabiner-elements
```
- I don't make many modifications, only the following:
  - remap `caps_lock` to `left_control`
  - remap `right_option` to `right_control`
- Useful when editing with Neovim where the control key is often used
:::important
Remaps made in Karabiner Elements take precedence over remaps made in native MacOS settings
:::

### Vial
- Use [Vial](https://get.vial.today/) to program your external keyboard if it supports QMK firmware
```zsh
brew install vial
```

## Instantly Show Dock
- Out of the box, the MacOS dock has a brief delay before it unhides itself when you move your mouse to the edge of the screen
- There is also an animation which takes up more time as well
- I like to make the dock reveal itself instantly, which can be done using the following commands in your terminal:
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
- Currently giving [OneMenu](https://www.withmarko.com/one-menu) a try as my window manager
- [Rectangle](https://rectangleapp.com/) is another solid choice
:::tip
OneMenu comes with additional features:
- keyboard cleaning mode
- system monitoring
:::

## Note Taking
- [Obsidian](https://obsidian.md/) is my go to note taking app
- Some reasons why:
  - Local first
  - Markdown syntax
  - Native vim bindings
```zsh
brew install obsidian
```
