import { ArgumentConfig } from 'ts-command-line-args';

export type ArgumentOptions = {
  projectName: string;
  template: string;
  // testingFramework: string;
  // componentExplorer: string;
  help: boolean;
};

export const argumentConfig: ArgumentConfig<ArgumentOptions> = {
  projectName: {
    type: String,
    defaultOption: true,
    defaultValue: '',
    description: 'Project name'
  },
  template: {
    type: String,
    defaultValue: '',
    description: 'Template to use: react-cfg-vite | react-cfg-webpack'
  },
  // testingFramework: {
  //   type: String,
  //   defaultValue: '',
  //   description: 'Testing framework to use: none | cypress | playwright'
  // },
  // componentExplorer: {
  //   type: String,
  //   defaultValue: '',
  //   description: 'Component explorer to use: none | storybook | ladle | histoire'
  // },
  help: { type: Boolean, alias: 'h', description: 'Display this help message' }
};

export interface CliOptions {
  projectName: string;
  template: string;
  // testingFramework: string;
  // componentExplorer: string;
  templatePath: string;
  projectPath: string;
  // lit: boolean;
  react: boolean;
  // vue: boolean;
  // svelte: boolean;
  // cypress: boolean;
  // playwright: boolean;
  // storybook: boolean;
  // ladle: boolean;
  // histoire: boolean;
}

interface Template {
  value: string;
  name: string;
}

const templates: Template[] = [
  { value: 'react-cfg-vite', name: 'React with CFG SDK & ViteJS (Recommended)' },
  { value: 'react-cfg-webpack', name: 'React with CFG SDK & Webpack' },
  // { value: 'lit-ts', name: 'Lit' },
  // { value: 'lit-ts-tailwind', name: 'Lit with TailwindCSS' },
  // { value: 'react-ts', name: 'React' },
  // { value: 'react-ts-tailwind', name: 'React with TailwindCSS' },
  // { value: 'vue-ts', name: 'Vue.js' },
  // { value: 'vue-ts-tailwind', name: 'Vue.js with TailwindCSS' },
  // { value: 'svelte-ts', name: 'Svelte' },
  // { value: 'svelte-ts-tailwind', name: 'Svelte with TailwindCSS' }
];

// const testingFrameworks: Template[] = [
//   { value: 'none', name: 'None' },
//   { value: 'cypress', name: 'Cypress.io' },
//   { value: 'playwright', name: 'Playwright' }
// ];

// const componentExplorers: Template[] = [
//   { value: 'none', name: 'None' },
//   { value: 'storybook', name: 'Storybook' }
// ];

export type argQuestionReturnType = {
  name: string;
  type: string;
  message: string;
  value: string;
  when: (answers: CliOptions) => boolean;
  choices?: Template[];
  validate?: (input: string) => string | boolean;
};

export const argumentQuestions = (options: ArgumentOptions): argQuestionReturnType[] => {
  return [
    {
      name: 'projectName',
      type: 'input',
      message: 'Project name:',
      value: options.projectName,
      when: () => !options.projectName,
      validate: (input: string) => {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    },
    {
      name: 'template',
      type: 'list',
      message: 'Chose template:',
      choices: templates,
      value: options.template,
      when: () => !options.template
    }
    // {
    //   name: 'testingFramework',
    //   type: 'list',
    //   message: 'Chose testing framework:',
    //   choices: testingFrameworks,
    //   value: options.testingFramework,
    //   when: () => !options.testingFramework
    // },
    // {
    //   name: 'componentExplorer',
    //   type: 'list',
    //   message: 'Chose component explorer:',
    //   value: options.componentExplorer,
    //   when: (answers: CliOptions) =>
    //     !options.componentExplorer &&
    //     !options.template?.includes('vanilla-ts') &&
    //     !answers.template?.includes('vanilla-ts'),
    //   choices: (answers: CliOptions) => {
    //     const choices = componentExplorers;
    //     if (answers.template?.includes('react')) {
    //       choices.push({ value: 'ladle', name: 'Ladle' });
    //     }

    //     if (answers.template?.includes('vue') || answers.template?.includes('svelte')) {
    //       choices.push({ value: 'histoire', name: 'Histoire' });
    //     }

    //     return choices;
    //   }
    // }
  ];
};
