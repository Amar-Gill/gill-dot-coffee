---
title: Deploy to multiple subdomains on Cloudflare Workers
description: todo
publishDate: 28 December 2025
tags: ["Cloudflare Workers", "CICD"]
draft: true
---

## What are we building?

In this guide we will purchase a custom domain from the Cloudflare Registrar and use it to host a web application on the Cloudflare Workers serverless compute platform.

We'll configure the application to be deployed on separate environments each with their own subdomain:

  - dev.my-domain.com
  - staging.my-domain.com
  - prod.my-domain.com

Lastly, we set up CICD on each domain via Git integration, where the `staging` branch will deploy to `staging.my-domain.com` and the `main` branch will deploy to `prod.my-domain.com`.


:::note
I am not employed by or affiliated with Cloudflare. I'm a web developer that enjoys using the platform and I want to help others do the same.
:::

## Get your domain

Head over to the [Cloudflare Domain Registrar]() and purchase your domain. We'll assume for this guide it's `my-domain.com`.

## Initialize your web application

Visit the [frameworks guides]() and choose your web application framework. For this guide we'll use Tanstack Start:
```
pnpm create cloudflare@latest my-tanstack-start-app --framework=tanstack-start
```

## Configure your Wrangler file

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

## Deploy to each environment

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

## Configure Git integration

At the time of writing, Git integration cannot be done through the Wrangler file. So we must visit the Cloudflare developer dashboard.

## Going Further with bindings

TODO infra is bindings

## Conclusion

TODO




