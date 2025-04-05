---
title: Automatic Migrations in Nuxt 3 with Drizzle
description: Apply migrations on each deployment of your Nuxt 3 application using Drizzle Kit.
publishDate: December 30, 2023
tags: ["nuxt", "vue", "drizzle", "turso", "database"]
draft: false
---

## TLDR

1. Add the [nuxt-prepare](https://nuxt.com/modules/prepare) nuxt module to your project.
2. Copy this [code](#method-2-nuxt-prepare-module) into your `server.prepare.ts` script (assuming Drizzle and Turso are set up already).

## Drizzle ORM

[Drizzle](https://orm.drizzle.team/) is a TypeScript ORM that can also manage migrations for you with [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview). During development you can prototype with the [db push](https://orm.drizzle.team/kit-docs/overview#prototyping-with-db-push) feature of Drizzle Kit. When you are ready to go to production, you can [generate migration scripts](https://orm.drizzle.team/kit-docs/overview#migration-files) with Drizzle Kit as well.

Instead of copying the SQL scripts and applying them manually, it would be nice to have your generated migrations be applied automatically when you push code up for a deployment. We will cover two methods to achieve this.

## Architecture

This will work for a [Nuxt](https://nuxt.com/) 3 application deployed to [Vercel](https://vercel.com/) or a similar hosting provider with a Github integration.

In this example we use [Turso](https://turso.tech/) as our hosted database provider. It should work the same for other hosted database providers such as [PlanetScale](https://planetscale.com/) or [Neon](https://neon.tech/).

<aside className="info">
  Nuxt is at version 3.9 at the time of publishing.
</aside>

## Prerequisites

1. Set up `@libsql` in your Nuxt app which is used by Turso.
2. Get Drizzle ORM set up in your project, including Drizzle Kit for managing migrations.

## Method 1: Nuxt Lifecycle Hooks

Nuxt 3 has a powerful system of [lifecycle hooks](https://nuxt.com/docs/api/advanced/hooks) that we can leverage to execute the migrations. We will use the `build:before` hook because the migrations should run before application changes are deployed.

We can add handlers for hooks in the `nuxt.config.ts` file:

```ts
// nuxt.config.ts
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';
import consola from 'consola';

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    tursoDbUrl: 'file:./server/sqlite.db',
    tursoDbToken: '',
  },
  hooks: {
    async 'build:before'() {
      if (process.env.NODE_ENV === 'development') {
        consola.box(
          'Skipping migrations in dev mode.\n\n
          Run `db:push` script to use latest schema.'
        );
        return;
      }

      console.info('Migrating database...');

      const client = createClient({
        url: process.env.NUXT_TURSO_DB_URL as string,
        authToken: process.env.NUXT_TURSO_DB_TOKEN,
      });

      const db = drizzle(client);

      await migrate(db, { migrationsFolder: './migrations' })
        .then(() => consola.info('Database migrated'))
        .catch((err) => {
          console.error('%s', err);
          process.exit(1);
        });
    },
  },
});

```

Things to note:
- as this handler runs before Nuxt is initialized, we access our Turso environment variables through `process.env` instead of `runtimeConfig`
- we exit the handler early during development and instead rely on db push to apply schema changes to the database
- make sure to use the same migrations folder that you specify in your `drizzle.config.ts` file
- the process fails with exit code 1 if the migration fails, so your application will not get deployed without the required database changes

<aside className="info">
  Drizzle will connect to Turso on each deployment, but only new migration scripts will be applied.
</aside>

## Method 2: Nuxt Prepare Module

In the second method, we will leverage the [nuxt-prepare module](https://nuxt.com/modules/prepare) instead of our own lifecycle hook handler. Start by adding the module to your `nuxt.config.ts` file.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-prepare'],
});
```

Then create a new `server.prepare.ts` file in your project root. The code is identical to what we used in the lifecycle hook example, except that we return an empty object to satisfy the return type of the prepare handler.

```ts
// server.prepare.ts
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';
import consola from 'consola';

export default defineNuxtPrepareHandler(async () => {
  if (process.env.NODE_ENV === 'development') {
    consola.box(
      'Skipping migrations in dev mode.\n\n
      Run `db:push` script to use latest schema.'
    );
    return {};
  }

  console.info('Migrating database...');

  const client = createClient({
    url: process.env.NUXT_TURSO_DB_URL as string,
    authToken: process.env.NUXT_TURSO_DB_TOKEN,
  });

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: './migrations' })
    .then(() => consola.success('Database migrated'))
    .catch((err) => {
      console.error('%s', err);
      process.exit(1);
    });

  return {};
});

```

I prefer the use of a dedicated server prepare script over a build time hook handler, as it provides a nice separation of concerns.

## Bonus

In the code examples, you will see that I import the [consola](https://github.com/unjs/consola) module. It is an [UnJS](https://unjs.io/) package that comes with Nuxt.

Consola helps to prettify logs during development. I encourage you to check it out =]
