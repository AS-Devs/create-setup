import { existsSync } from 'fs';
import { mkdir, readdir, readFile, writeFile, stat } from 'fs/promises';
import path from 'path';

import { red } from 'colorette';
import ejs from 'ejs';

import { CliOptions } from './options';

export const createProjectPath = async (options: CliOptions): Promise<boolean> => {
  const { projectName } = options;
  if (existsSync(projectName)) {
    console.log(red(`Folder ${projectName} already exists. Delete or use another name.`));
    return false;
  }

  await mkdir(projectName);
  return true;
};

const subDirectory = (templatePath: string, templateName: string): string => {
  if (!templatePath) return '';

  const delimiter = process.platform === 'win32' ? '\\' : '/';
  const folders = templatePath.split(delimiter);
  const index = folders.lastIndexOf(templateName);
  return folders.slice(index + 1).join(delimiter);
};

const rename = (file: string): string => {
  return file
    .replace('_gitignore', '.gitignore')
    .replace('.storybook.jsx', '.stories.jsx')
    .replace('.ladle.tsx', '.stories.tsx');
};

export const copyTemplate = async (templatePath: string, options: CliOptions): Promise<void> => {
  const files = await readdir(templatePath);
  const ignoreFiles: string[] = [];

  // if (!options.cypress) {
  //   ignoreFiles.push('cypress', 'cy.ts');
  // }

  // if (!options.playwright) {
  //   ignoreFiles.push('playwright', 'spec.ts');
  // }

  // if (!options.storybook) {
  //   ignoreFiles.push('.storybook', '.npmrc', 'stories.js');
  // }

  // if (!options.ladle) {
  //   ignoreFiles.push('.ladle');
  // }

  // if (!options.histoire) {
  //   ignoreFiles.push('histoire', 'story.vue', 'story.svelte');
  // }

  files.forEach(async (file) => {
    if (ignoreFiles.filter((pattern) => file.includes(pattern)).length > 0) return;

    const sourcePath = path.join(templatePath, file);
    const stats = await stat(sourcePath);
    const targetPath = path.join(
      process.cwd(),
      options.projectName,
      subDirectory(templatePath, options.template),
      rename(file)
    );

    if (stats.isFile()) {
      const contents = await readFile(sourcePath, 'utf8');
      await writeFile(targetPath, ejs.render(contents, options), 'utf8');
    } else if (stats.isDirectory()) {
      await mkdir(targetPath);
      await copyTemplate(path.join(templatePath, file), options);
    }
  });
};
