---
title: Deploy to multiple subdomains on Cloudflare Workers
description: todo
publishDate: 28 December 2025
tags: ["cloudflare-workers", "tanstack-start", "react"]
draft: true
---

## What Are We Building?

In this guide we will purchase a custom domain from the Cloudflare Registrar and use it to host a web application on the Cloudflare Workers serverless compute platform.

We'll configure the application to be deployed on separate environments each with their own subdomain.

Lastly, we will set up CICD on each domain via Git integration, where each Worker will have it's own Git branch that will trigger automatic deployment when new commits are pushed to GitHub.

Refer to the following table for a summary.


| Domain | Worker Name | Git Branch |
|--------|------------|-------------|
| dev.my-domain.com | my-tanstack-start-app-development | dev |
| staging.my-domain.com | my-tanstack-start-app-staging | staging |
| prod.my-domain.com | my-tanstack-start-app-production | main |


:::note
I am not employed by or affiliated with Cloudflare. I'm a web developer that enjoys using the platform and I want to help others do the same.
:::

## Get Your Domain

Head over to the [Cloudflare Domain Registrar](https://dash.cloudflare.com/?to=/:account/registrar/register) and purchase your domain. We'll assume for this guide it's `my-domain.com`.

## Initialize Your Web Application

Visit the [framework guides](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/) and choose your web application framework. For this guide we'll use Tanstack Start.
```
pnpm create cloudflare@latest my-tanstack-start-app --framework=tanstack-start
```

## Configure Your Wrangler File

Your app will come scaffolded with a minimal `wrangler.jsonc` file. Edit this file to configure your custom subdomain deployments.
```jsonc ins={13-38}
// wrangler.jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "my-tanstack-start-app",
	"compatibility_date": "2025-09-02",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"main": "@tanstack/react-start/server-entry",
	"observability": {
		"enabled": true
	},
  "env": {
    "development": {
      "routes": [
        {
          "pattern": "dev.my-domain.com",
          "custom_domain": true
        }
      ]
    },
    "staging": {
      "routes": [
        {
          "pattern": "staging.my-domain.com",
          "custom_domain": true
        }
      ]
    },
    "production": {
      "routes": [
        {
          "pattern": "prod.my-domain.com",
          "custom_domain": true
        }
      ]
    }
  }
}
```

## Deploy To Each Environment

TanStack Start uses the [Cloudflare Vite Plugin](https://developers.cloudflare.com/workers/vite-plugin/) which helps integrate Vite applications with the Cloudflare Workers runtime. It utilizes the new [Vite Environments API](https://vite.dev/guide/api-environment).

To deploy your application to each environment, run the following commands from the command line:

```
CLOUDFLARE_ENV=development pnpm run build && pnpm dlx wrangler deploy
```

<br />

```
CLOUDFLARE_ENV=staging pnpm run build && pnpm dlx wrangler deploy
```

<br />

```
CLOUDFLARE_ENV=production pnpm run build && pnpm dlx wrangler deploy
```

This will deploy three separate Cloudflare Workers applications to your account.

The name of each worker will be the top level `name` field in your wrangler file, suffixed with the environment name.
- `my-tanstack-start-app-development`
- `my-tanstack-start-app-staging`
- `my-tanstack-start-app-production`

You can revise the node scripts of your `package.json` if you like.

```json del={11} ins={12-14}
// package.json
{
	"name": "my-tanstack-start-app",
	"private": true,
	"type": "module",
	"scripts": {
		"dev": "vite dev --port 3000",
		"build": "vite build",
		"serve": "vite preview",
		"test": "vitest run",
		"deploy": "pnpm run build && wrangler deploy",
		"deploy:dev": "CLOUDFLARE_ENV=development pnpm run build && wrangler deploy",
		"deploy:staging": "CLOUDFLARE_ENV=staging pnpm run build && wrangler deploy",
		"deploy:prod": "CLOUDFLARE_ENV=production pnpm run build && wrangler deploy",
		"preview": "pnpm run build && vite preview",
		"cf-typegen": "wrangler types"
	},
  // ...rest of package.json
}
```

## Configure Git Integration

At the time of writing, Git integration cannot be done through the Wrangler file. So we must visit the Cloudflare developer dashboard.

## Going Further With Bindings

TODO infra is bindings

## Conclusion

TODO
