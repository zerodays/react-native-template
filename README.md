# React Native Template

Welcome to `react-native-template` 👋, the go-to template for building mobile applications with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/). This template is designed to kickstart your project, utilizing the Expo router, TypeScript, and Nativewind 4.0 (TailwindCSS for React Native) for a smooth and type-safe development experience.

## Quick Start 🚀

To create a new project using this template, run:

```bash
npx create-react-native-app -t react-native-template
```

## Project Structure 🏗️

This template provides a well-organized directory structure with a set of pre-configured files to streamline your development process. Here's an overview of the essential components:
- `.github`: Contains GitHub Actions workflows for CI/CD.
- `app`: Contains the screens (utilizing expo-router file naming).
- `assets`: Stores static files like images, fonts, and videos.
- `components`: Houses reusable components that can be shared across multiple screens.
- `locales`: Contains localization files for internationalization.
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


## Features and Benefits 🌟

This template comes equipped with a robust set of features and solutions to enhance your development workflow:

### 1. Full Linting and Auto Formatting 🛠️

Leverage full linting and auto-formatting with ESLint and Prettier, configured to help maintain a clean and consistent codebase. Auto-sorting of imports and Tailwind classes on save, alongside the enforcement of good practices, keeps your project tidy.

For linting and formatting your code, use these commands in `package.json`:

```json
"scripts": {
  "lint": "eslint .",
  "format-check": "prettier --check . --ignore-path .gitignore",
  "format-fix": "prettier --write . --ignore-path .gitignore"
}
```

### 2. Easy Aliases with TypeScript 🏷️

Clean up your imports with straightforward path aliases in `tsconfig.json`, promoting a more organized code structure.

```json
"compilerOptions": {
  "strict": true,
  "baseUrl": ".",
  "paths": {
    "@assets/*": ["assets/*"],
    "@components/*": ["components/*"],
    "@features/*": ["features/*"],
    "@utils/*": ["utils/*"]
  }
}
```

### 3. Nativewind Integration 🎨

Hit the ground running with Nativewind's setup. Utilize the `theme` object for consistent styling and the `cn` function to conditionally apply classes.

```typescript
import theme from '@utils/theme';
import { cn } from '@utils/cn';

<Text
    className={cn('text-blue-600', value > 0 && 'bg-red-600')}
    style={{
        backgroundColor: value > 5 ? 'red' : theme.primary[500],
    }}>
    Example Text
</Text>
```

### 4. Full Localization Support 🌐

Achieve effortless internationalization with `react-i18next` and `i18next`. Translation keys are typesafe and localisation files are neatly organized.

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation('common');
i18n.changeLanguage('en'); // Switch languages
<Text>{t('helloWorld')}</Text>; // Typesafe keys
```

### 5. Typed Expo Router Setup 🚦

Pre-configured routing structure for authenticated and guest users. Routes are typed for hassle-free navigation.

```typescript
import { Href } from 'expo-router';

type RouteConstructor = <T>(href: Href<T>) => Href<T>;
const Route: RouteConstructor = (href) => href;

const Routes = {
  guest: {
    index: Route('/(guest)/'),
  },
  auth: {
    index: Route('/(authenticated)/'),
  },
} as const;

export default Routes;

// Example usage:
// const router = useRouter();
// router.push(Routes.auth.index);
// router.push(Routes.artists.artist('1').songs.song('2'));
```

### 6. Zodius API Client Setup 📡

A pre-configured Zodius API client with Tenstack Query for managing API calls. The `./api` folder includes a fully set up example for GET and POST requests, complete with schemas, definitions, and global error handling through a custom Zodius plugin.

```typescript
import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import apiErrorPlugin from './api-error-plugin';
import exampleApi from './example';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

// Zodios API client
const apiClient = new Zodios(API_URL, [...exampleApi]);

// Apply global error handling
apiClient.use(apiErrorPlugin);

// Zodios hooks for react
const api = new ZodiosHooks('exampleApi', apiClient);

export { api, apiClient };
```

### 7. Custom Utility Hooks 🔗

Two custom hooks are provided for enhanced functionality:

- `useCustomFonts`: Loads custom fonts and manages splash screen visibility.

```typescript
const [fontsLoaded, fontError] = useCustomFonts({
  callback: async () => {
    await SplashScreen.hideAsync();
  },
});
```

- `useIsOnline`: Checks if the device has network connectivity.

```typescript
const isOnline = useIsOnline();
```

### 8. Zustand State Management 🏪

Effortlessly manage your application state with Zustand, which includes async persistent storage support.

```typescript
const { value, increment, decrement } = useExampleStore();
```

### 9. CI/CD Workflow Configuration 🔄

Automate your development processes with pre-defined GitHub Actions workflows located in the `.github` folder:

- `build.yml`: For continuous integration builds.
- `i18n.yml`: To manage localization files.
- `lint.yml`: For code linting checks.
- A pull request template to standardize contributions.

### 10. Infisical Environment Variable Support 🔐

Incorporate environment variables securely using the Infisical service with a custom script `infisical.sh`, which is run to inject variables into your build process.