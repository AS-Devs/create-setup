# CREATE SETUP

This is an idea to built an scafolling CLI tool which helps you to run different templates for different projects. To Start an project you just need to run the command and it will ask you for the project name and the template you want to use. It will create a folder with the project name and will copy the template files to the project folder.

## How to use

```bash
npm init create-setup@latest
```

It will ask the following questions:

- Project name
- Template type

The CLI will create a new directory named by the project name.

## Available Templates Types

- React with CFG SDK & ViteJS (Recommended)
- React with CFG SDK & Webpack
