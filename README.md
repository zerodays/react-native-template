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

## Customizable Components 🎨

This template includes a set of customizable components that you can use to build your application:

## Button ⏩

A highly customizable button component that adopts the variants pattern inspired by `shadcn/ui`, allowing for a consistent yet adaptable design throughout your application.

### Component Explanation

The `Button` component leverages the power of Tailwind CSS with React Native through Nativewind to offer a range of pre-set button styles, termed 'variants'. You can easily extend or customize these styles to fit your design requirements.

Here's a quick rundown on how it works:

- **Variants**: Define the look of your buttons through a `variants` object. Each variant contains styles for the container, text, and optional icon. Variants are applied using the `cn` function from Nativewind which ensures proper sorting of Tailwind classes.

- **Animation**: The component uses `react-native-reanimated` to provide feedback when the button is pressed, with a gentle fade-in and move-up effect.

- **Icons**: You can include left and right icons within the button by passing `LucideIcon` components.

- **Feedback Text**: Optionally, you can display a feedback text upon button press, which uses the same animation as the button text.

- **Loading State**: When the `loading` prop is true, the button displays an `ActivityIndicator`.

### How to Use

Simply import and use the `Button` component in your screens or components, selecting the variant you need and passing any required icons or handlers:

```jsx
import Button from '@components/Button';
import { HeartIcon } from 'lucide-react-native';

// ...

<Button
  variant="filled"
  onPress={() => console.log('Button pressed')}
  iconLeft={HeartIcon}
>
  Like
</Button>
```

### Customizing Variants

To create or customize variants, edit the `variants` object within the button component file. Add your styles using the `cn` function for auto-sorting of Tailwind classes:

```javascript
const variants = {
  ...,
  custom: {
    container: cn('rounded-lg bg-custom px-4 py-2'),
    text: cn('font-semibold text-custom-dark'),
    icon: cn('text-custom-dark'),
  },
  ...
};
```

To use your custom variant, just set the `variant` prop on the `Button` component:

```jsx
<Button variant="custom" onPress={...}>
  Custom Button
</Button>
```

By modifying the `Button` component's variants or adding new ones, you can cater to all your button design needs across the application with ease.

## Dialog 🗨️

A pre-styled `Dialog` component, using a context-based approach to manage its visibility. This component provides an easy way to create and control modal dialogs within your application.

### Component Structure

- **`Dialog`**: Acts as the provider which holds the state and logic for showing and hiding the dialog.
- **`DialogContent`**: The actual modal view that is displayed. It's customizable and can be dismissable.
- **`DialogTrigger`**: A button that toggles the dialog's visibility.
- **`DialogClose`**: A discreet close button usually displayed at the top-right corner of the dialog.
- **`DialogHeader`**: A styled header for your dialog that can hold a title.
- **`DialogFooter`**: A footer for the dialog which can contain buttons for actions like 'cancel' or 'confirm'.
- **`DialogDismissFooter`**: A pre-styled footer with a single button that closes the dialog.

### How It Works

1. **Initialization**: The `Dialog` is set up to manage its state using a context provider, allowing its children to toggle the dialog's visibility without prop drilling.

```jsx
<Dialog>
  {/* ... */}
</Dialog>
```

2. **Displaying Content**: The `DialogContent` wraps the content you want to display inside the modal. It's equipped with a fade-in animation and `KeyboardAvoidingView` to ensure that input fields are always in view.

```jsx
<DialogContent>
  {/* Your content here */}
</DialogContent>
```

3. **Trigger**: Use `DialogTrigger` anywhere within the `Dialog` context to provide a button that can open the dialog.

```jsx
<DialogTrigger variant="default">
  Open Dialog
</DialogTrigger>
```

4. **Closing**: `DialogClose` provides a clickable icon that closes the dialog when pressed.

```jsx
<DialogClose />
```

### Customizing the Dialog

You can customize the dialog by editing the `Dialog`'s variants or adding new ones directly in the component's file, just like the Button component:

```javascript
const DialogVariants = {
  //... define your custom styles
};
```

### Usage Example

Here's an example of how to use the `Dialog` in a component:

```jsx
<Dialog>
  <DialogTrigger variant="filled">
    Show Terms of Service
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>Terms of Service</DialogHeader>
    {/* ... Your terms content */}
    <DialogFooter>
      <DialogClose />
      {/* ... Other action buttons */}
    </DialogFooter>
  </DialogContent>
</Dialog>
```

This overview should provide you with a good understanding of how to integrate and utilize the `Dialog` component in your application for a variety of modal needs.


## Loading 💫

`Loading` component that provides visual feedback to users during loading states. It's flexible, allowing the choice between a native activity indicator and a more visually rich Lottie animation.

### Component Features

- **Customizable Message**: Display an optional message below the loader to inform users what's happening.
- **Choice of Loader**: Choose between using the native `ActivityIndicator` for a simple loading experience or a Lottie animation for something more engaging.

### How It Works

The `Loading` component checks the `nativeLoader` prop to determine which type of loader to display. It will show a Lottie animation by default. If a `message` is provided, it will be displayed below the loader.

```jsx
<Loading message="Loading your dashboard..." />
```

### Customization

- **Lottie Animation**: You can change the Lottie animation by replacing the `LottieLoader` import with another Lottie file.
- **Message Styling**: Customize the message style by adding Tailwind CSS classes to the `<Text>` component.

### Usage Example

To implement the `Loading` component, import it into your screen or component and add it where you handle your loading logic.

```jsx
import { Loading } from '@components/Loading';

// ...

return isLoading ? (
  <Loading message="Fetching data, please wait..." />
) : (
  // Your content
);
```

With the `Loading` component, you provide a seamless and informative loading experience to your application's users.
