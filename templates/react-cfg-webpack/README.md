# 🔥 React CFG Webpack Setup 🔥

This is a template for creating a React application with the following Tech Stack:

## Tech Stack

- React
- Typescript
- Tailwnd CSS
- Shadcn UI (Few Component in the components/ui folder)
- React Router
- MUI (Material UI)
- CFG AI Platform
- @semoss/sdk
- @semoss/sdk-react
- Webpack 5
- Zod
- RecoilJS (State Management)


## Pre-requisites
- NodeJS (v18 or above)
- pnpm (v7 or above)

## Installation

<strong>Step 1:</strong> <br/> 
  Go to the client folder
  ```bash
  cd client
  ```
  this will take you to the client folder, where the react application is present.
  
<strong>Step 2:</strong> <br/>
  Install the dependencies under client folder
  ```bash
  pnpm install
  ```
<strong>Step 3:</strong> <br/>  
Create a `.env.local` file in the root of the client folder and add the following environment variables.
  ```env
    # Backend where your application is running
    ENDPOINT=

    # Backend Module name
    MODULE=

    # Access key to authenticate (do not commit this)
    ACCESS_KEY=

    # Secret key to authenticate
    SECRET_KEY=
  ```

<strong>Step 4:</strong> <br/> 
Run the application
  ```bash
  pnpm dev
  ```

Thats it! You are ready to go. <br/>
Go to `http://localhost:3000` to see the application.

## Before Deployement

Before deploying the application, make sure to build the application using the following command:
```bash
pnpm build
```
which should create a `dist` folder in the root of the client folder. But for CFG to work, you need to create a `portals` folder in the root of the project folder , outside of the client. This is taken care with webpack configuration. You won't have to worry about it.

<b>Just make sure to have the `portals` folder in the root of the project folder.</b>

> Note: This is a template for creating a React application with the above mentioned Tech Stack. You can modify the template as per your requirements. Make sure to have the required dependencies installed.

## Deployment to CFG

Now, just make a `.zip` of the `portals, py, java` folder and create a new application in CFG AI Platform. Choose via Code and It will create an application with the given name.

p.s. `py` and `java` folder aren't required for this template. You can remove them if you aren't using in your application.

Go to `Edit app` section, then `Settings` --> `Data Apps` --> Upload zip file.

That's it! Your application is now deployed to CFG AI Platform.

