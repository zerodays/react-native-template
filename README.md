# React Native Template

Welcome to `react-native-template` 👋, the go-to template for building mobile applications with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/). This template is designed to kickstart your project, utilizing the Expo router, TypeScript, and Nativewind 4.0 (TailwindCSS for React Native) for a smooth and type-safe development experience.

## Quick Start 🚀

To create a new project using this template, run:

```bash
npx create-react-native-app -t react-native-template
```

## Project Structure 🏗️

This template provides a well-organized directory structure with a set of pre-configured files to streamline your development process. Here's an overview of the essential components:

- `app`: Contains the screens (utilizing expo-router file naming).
- `components`: Houses reusable components that can be shared across multiple screens.
- `assets`: Stores static files like images, fonts, and videos.
- `utils`: A place for utility functions, hooks, stores and types that can be shared across your application.

## Configuration Files 📑

Each configuration file is set up to ensure that your development experience is as smooth as possible:

- `.eslintrc.js`: Configures ESLint for identifying and reporting on patterns in JavaScript, helping you to write clean code.
- `.eslintignore`: Lists the files and directories that ESLint should ignore.
- `.gitignore`: Specifies intentionally untracked files to ignore by Git, like `node_modules`.
- `.prettierrc`: Configuration for Prettier, a code formatter that enforces a consistent style.
- `app.json`: Contains metadata about your app that Expo and EAS Build use to configure your app correctly.
- `babel.config.js`: Configuration file for Babel, a tool that is used to convert ECMAScript 2015+ code into a backwards-compatible version of JavaScript.
- `global.css`: A global stylesheet that imports tailwindcss styles (needed for Nativewind to work).
- `index.js`: The entry point of your React Native application (should NOT be modified).
- `metro.config.js`: Configuration for Metro, the JavaScript bundler for React Native.
- `nativewind-env.d.ts`: TypeScript declaration file for Nativewind, providing autocompletion for Tailwind classes.
- `package.json`: Lists the dependencies of the project and defines build and start (and other) scripts.
- `tailwind.config.js`: Configuration file for Tailwind CSS, where you can define custom styles, themes, and responsive breakpoints.
- `tsconfig.json`: The TypeScript compiler configuration file that specifies the root files and the compiler options required to compile the project.
- `yarn.lock`: Auto-generated file that ensures consistent installation of node modules across environments.