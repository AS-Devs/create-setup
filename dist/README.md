# @susanta96/create-setup

This is an idea to built an scafolling CLI tool which helps you to run different templates for different projects. To Start an project you just need to run the command and it will ask you for the project name and the template you want to use. It will create a folder with the project name and will copy the template files to the project folder.

## Quick start guide

Directly use this command in your terminal.

```bash
npx @susanta96/create-setup@latest

#or

pnpm dlx @susanta96/create-setup@latest

#or

bunx @susanta96/create-setup@latest
```

It will ask the following questions:

- Project name
- Template type

The CLI will create a new directory named by the project name.
Go to project folder, and run these commands.

```bash
cd "folder_name"
pnpm install
pnpm dev
```

## Available Templates Types

- React with CFG SDK & ViteJS (Recommended)
- React with CFG SDK & Webpack

## Features that helps you

- vite.js
- webpack
- React
- TypeScript (optional)
- EsLint
- Prettier
- Visual Studio Code Extension recommendations
- Visual Studio Code settings (format & lint your code on save)
- TailwindCSS (optional)
- Shadcn-ui (optional)
- Recoil (state-management)
- TanStack Query (optional)
- @semoss/sdk
- @semoss/sdk-react

## Notes

All templates provide a simple counter app without styles or very basic styles. But for CFG specific apps will have proper README to setup the Semoss SDK and Environment Variable Required.
