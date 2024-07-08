# Update dependencies

## Main package

- `pnpm up`
- `git add . && git commit -m "chore(main): update dependencies"`

## Templates

- `pnpm up -r`
- Patch versions in the following files according to the changes
  in the `package.json` files in the `examples` directory:
  - `src/cypress.ts`
  - `src/histoire.ts`
  - `src/ladle.ts`
  - `src/playwright.ts`
  - `src/storybook.ts`
- `cd templates`
- `find . -maxdepth 1 -type d \( ! -name . \) -exec bash -c "cd '{}' && pnpm up" \;`
- `git add src/ && git add templates/ && git commit -m "chore(templates): update dependencies"`
- `git reset --hard`

## Rebuild examples using the playground script

- `pnpm playground`
- `cd plaground`
- `find . | grep -Ei '.gitignore|.gitattributes' | xargs rm -fR`
- `cd ..`
- `rm -rf examples && mv playground examples`
- `pnpm i`
- `nx run-many -t format`
- `git add examples/ && git commit -m "chore(examples): update dependencies"`
