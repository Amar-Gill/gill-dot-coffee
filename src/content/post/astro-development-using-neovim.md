---
title: Setting Up Neovim For Astro Development
description: The settings and plugins I use to build Astro websites.
publishDate: January 31, 2023
tags: ["astro", "neovim"]
draft: false
---

## TLDR

- [Astro](https://astro.build) is a web framework that ships zero JavaScript to the client by default.
- The `astro` [language server](https://github.com/withastro/language-tools/tree/main/packages/language-server) can be installed with [mason](https://github.com/williamboman/mason.nvim) and set up through the [nvim-lsp-config](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro) plugin.
- For syntax highlighting of `.astro` files, the [tree-sitter-astro](https://github.com/virchau13/tree-sitter-astro) grammar is available through the [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter#supported-languages) plugin.
- Use the [Lua filetype module](https://neovim.io/doc/user/lua.html#lua-filetype) to detect the `.mdx` filetype. Otherwise use the [jxnblk/vim-mdx-js](https://github.com/jxnblk/vim-mdx-js) plugin for syntax highlighting of `.mdx` files. (neovim 0.8.2)
- Make sure the [prettierd](https://github.com/fsouza/prettierd) built in formatting source (via [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim/blob/main/doc/BUILTINS.md#prettierd)) attaches to `astro` buffers. Otherwise you can format using the Astro Language Server. [Sample code](#formatting).
- Look into the `wrap` and `sidescroll` options to control how you want to work with lines that trail off the screen. Useful for Markdown editing.

## Basics

To get started we need LSP support and syntax highlighting for `.astro` files. Neovim supports this through the [nvim-lsp-config](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro) and [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter#supported-languages) plugins.

## MDX Syntax Highlighting

I noticed `.mdx` files were not being highlighted at all, because the `markdown.mdx` file type was not being detected by neovim. The neovim version as of writing is 0.8.2.

I couldn't find a tree-sitter grammar for `.mdx` files, but I have the tree-sitter grammar for [markdown](https://github.com/MDeiml/tree-sitter-markdown) installed. So I leveraged the [Lua filetype module](https://neovim.io/doc/user/lua.html#lua-filetype) to set the file type to `markdown.mdx` when I enter a new buffer:

```lua title="ft-add.lua"
vim.filetype.add({
	extension = {
		mdx = "markdown.mdx",
	},
	filename = {},
	pattern = {},
})
```

Call this method during neovim initialization. I have a file named `ft-add.lua` which I require in my root `init.lua` file.

I'm happy with this solution. It provides syntax highlighting of frontmatter which is in `.yaml` format. And it correctly highlights code blocks for all the programming languages I write about.

We only need to match the `.mdx` extension, but the linked documentation describes the other options available for filetype detection.

There is a Vim plugin that could achieve this as well: [jxnblk/vim-mdx-js](https://github.com/jxnblk/vim-mdx-js).

## Formatting

Consistent and fast formatting is non-negotiable for me. Luckily, many of the [community astro themes](https://astro.build/themes/) have [prettier](https://prettier.io/) and [eslint](https://eslint.org/) already configured. Great!

However, the formatter was not working for me in Neovim. Running the `:LspInfo` nvim command revealed that the `null-ls` server was not attached to the buffer.

Looking at the [prettierd](https://github.com/jose-elias-alvarez/null-ls.nvim/blob/main/doc/BUILTINS.md#prettierd) default arguments, the `.astro` filetype was not included. So I added it as an [extra_filetype](https://github.com/jose-elias-alvarez/null-ls.nvim/blob/main/doc/BUILTIN_CONFIG.md#filetypes):

```lua title="null-ls.lua"
local null_ls = require("null-ls")
local formatting = null_ls.builtins.formatting

local sources = {
  formatting.prettierd.with({
    extra_filetypes = { "astro" },
  }),
}
```

Now I was able to get the `null-ls` server attached to the `astro` buffer.

If you prefer instead to have the Astro Language Server do the formatting, you can update your LSP formatting handler like so:

```lua title="lsp-handlers.lua"
local lsp_formatting = function(bufnr)
  vim.lsp.buf.format({
    filter = function(client)
      local name = client.name
      return name == "null-ls" or name == "astro"
    end,
    bufnr = bufnr,
  })
end
```

## Editing Markdown in Neovim

Markdown files usually contain long lines that will trail off the screen if you don't enable text wrapping. If you want to keep text wrapping off, you can modify the `sidescroll` option. It controls the minimum number of columns to scroll horizontally when the `wrap` option is off and the cursor moves off the screen.

The default value is 1 column. You can try setting it to 5 which will move the cursor back by 5 columns as you write. Setting the option to 0 will move the cursor to the middle column of the screen which you may prefer instead:

```lua title="ftplugin/markdown.lua"
vim.opt.wrap = false
vim.opt.sidescroll = 0 | 1 | 5
```
