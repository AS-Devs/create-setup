/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { writeFile, mkdir, readdir, readFile, stat } from 'fs/promises';
import { rimraf } from 'rimraf';
import * as path from 'path';

import * as esbuild from 'esbuild';

const script = esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  write: false,
  target: ['node20'],
  format: 'esm',
  banner: {
    js: `
    import { createRequire } from "module";
    import path from 'path';
    import url from 'url';
    const require = createRequire(import.meta.url);
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    `
  }
});

const copyTemplates = async (templatePath) => {
  const files = await readdir(path.resolve(process.cwd(), templatePath));
  const ignoreFiles = ['node_modules', 'dist', 'package-lock.json', '.eslintcache'];

  files.forEach(async (file) => {
    if (ignoreFiles.indexOf(file) >= 0) return;

    const sourcePath = path.join(templatePath, file);
    const targetPath = path.join('dist', templatePath, file === '.gitignore' ? '_gitignore' : file);
    const stats = await stat(sourcePath);

    if (stats.isFile()) {
      const contents = await readFile(sourcePath, 'utf8');
      await writeFile(targetPath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      await mkdir(targetPath);
      await copyTemplates(path.join(templatePath, file));
    }
  });
};

const copyReadme = async () => {
  const contents = await readFile('README.md', 'utf-8');
  await writeFile('dist/README.md', contents, 'utf-8');
};

(async () => {
  await rimraf('dist');
  await mkdir('dist');
  await mkdir('dist/templates');
  await copyTemplates('templates');
  await copyReadme();
  await writeFile('dist/index.js', `#!/usr/bin/env node\n${script.outputFiles[0].text}`);
})();
