---
title: Deploy to multiple subdomains on Cloudflare Workers
description: todo
publishDate: 28 December 2025
tags: ["cloudflare-workers", "cicd"]
draft: true
---

## What Are We Building?

In this guide we will purchase a custom domain from the Cloudflare Registrar and use it to host a web application on the Cloudflare Workers serverless compute platform.

We'll configure the application to be deployed on separate environments each with their own subdomain.

Lastly, we will set up CICD on each domain via Git integration, where each Worker will have it's own Git branch that will trigger automatic deployment on new commits being pushed to GitHub.

Refer to the following table for a summary.


| Domain | Worker Name | Git Branch |
|--------|------------|-------------|
| dev.my-domain.com | dev-my-tanstack-start-app | dev |
| staging.my-domain.com | staging-my-tanstack-start-app | staging |
| prod.my-domain.com | prod-my-tanstack-start-app | main |


:::note
I am not employed by or affiliated with Cloudflare. I'm a web developer that enjoys using the platform and I want to help others do the same.
:::

## Get Your Domain

Head over to the [Cloudflare Domain Registrar](https://dash.cloudflare.com/?to=/:account/registrar/register) and purchase your domain. We'll assume for this guide it's `my-domain.com`.

## Initialize Your Web Application

Visit the [framework guides](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/) and choose your web application framework. For this guide we'll use Tanstack Start:
```
pnpm create cloudflare@latest my-tanstack-start-app --framework=tanstack-start
```

## Configure Your Wrangler File

Your app will come scaffolded with a minimal `wrangler.jsonc` file. Edit this file to configure your custom subdomain deployments.
```json ins={12-37}
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
    "dev": {
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

First we must build the application: `pnpm run build`

Then deploy it via command line with the wrangler CLI tool:
1. `wrangler deploy --env dev`
1. `wrangler deploy --env staging`
1. `wrangler deploy --env production`

This will deploy three separate Cloudflare Workers applications to your account.

The name of each worker will be the top level `name` field in your wrangler file, prefixed with the environment name. In this example:
- `dev-my-tanstack-start-app`
- `staging-my-tanstack-start-app`
- `prod-my-tanstack-start-app`

You can revise the node scripts of your `package.json` also:
TODO

## Configure Git Integration

At the time of writing, Git integration cannot be done through the Wrangler file. So we must visit the Cloudflare developer dashboard.

## Going Further With Bindings

TODO infra is bindings

## Conclusion

TODO
