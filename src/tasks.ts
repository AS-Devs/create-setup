import Listr from 'listr';

// import { createCypressTasks } from './cypress';
// import { createHistoireTasks } from './histoire';
// import { createLadleTasks } from './ladle';
import { CliOptions } from './options';
// import { createPlaywrightTasks } from './playwright';
// import { createStorybookTasks } from './storybook';
import { copyTemplate } from './template';

export const createTasks = (options: CliOptions): Listr => {
  return new Listr([
    {
      title: 'Copy template files',
      task: () => copyTemplate(options.templatePath, options)
    }
    // {
    //   title: 'Add Cypress.io',
    //   task: () => createCypressTasks(options),
    //   enabled: () => options.cypress
    // },
    // {
    //   title: 'Add Playwright',
    //   task: () => createPlaywrightTasks(options),
    //   enabled: () => options.playwright
    // },
    // {
    //   title: 'Add Storybook',
    //   task: () => createStorybookTasks(options),
    //   enabled: () => options.storybook
    // },
    // {
    //   title: 'Add Ladle',
    //   task: () => createLadleTasks(options),
    //   enabled: () => options.ladle
    // },
    // {
    //   title: 'Add Histoire',
    //   task: () => createHistoireTasks(options),
    //   enabled: () => options.histoire
    // }
  ]);
};
