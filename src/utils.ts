import { execa } from 'execa';

import { CliOptions } from './options';

export const addDevDependency = async (packageName: string, version: string, options: CliOptions) => {
  await execa('npm', ['pkg', 'set', `devDependencies.${packageName}=${version}`], {
    cwd: options.projectPath
  });
};

export const addPackageScript = async (scriptName: string, scriptValue: string, options: CliOptions) => {
  await execa('npm', ['pkg', 'set', `scripts.${scriptName}=${scriptValue}`], {
    cwd: options.projectPath
  });
};
