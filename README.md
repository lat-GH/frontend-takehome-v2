# Autone's Frontend Test

## Using this repo

This a monorepo that is built using Turborepo, which is actually what we use at autone. Don't worry if you haven't used Turborepo or haven't worked in a monorepo before. We just wanted to get you familiar with the type of codebase you'd be using here.

To start the test run the following commands:

```sh
npm i
npm run dev
```

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `docs`: a Storybook app, used define your tasks as well as to document the components and API
- `web`: a React SPA, which is where you'll be working when doing the tasks
- `@repo/ui`: a React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app, aside from `packages/eslint-config` and `packages/typescripts-config`, is 100% [TypeScript](https://www.typescriptlang.org/).
