# React Native Template

Welcome to `react-native-template` 👋, the go-to template for building mobile applications with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/). This template is designed to kickstart your project, utilizing the Expo router, TypeScript, and Nativewind 4.0 (TailwindCSS for React Native) for a smooth and type-safe development experience.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Configuration Files](#configuration-files)
4. [Features and Benefits](#features-and-benefits)
   - [Full Linting and Auto Formatting](#1-full-linting-and-auto-formatting)
   - [Easy Aliases with TypeScript](#2-easy-aliases-with-typescript)
   - [Nativewind Integration](#3-nativewind-integration)
   - [Full Localization Support](#4-full-localization-support)
   - [Typed Expo Router Setup](#5-typed-expo-router-setup)
   - [Orval API Client Setup](#6-orval-api-client-setup)
   - [Custom Utility Hooks](#7-custom-utility-hooks)
   - [Zustand State Management](#8-zustand-state-management)
   - [CI/CD Workflow Configuration](#9-cicd-workflow-configuration)
   - [Infisical Environment Variable Support](#10-infisical-environment-variable-support)
   - [Sentry Integration](#11-sentry-integration)
5. [Included Packages and Their Benefits](#included-packages-and-their-benefits)
   - [Zod](#zod)
   - [Lottie-React-Native](#lottie-react-native)
   - [Lucide-React-Native](#lucide-react-native)
   - [React Hook Form](#react-hook-form)
6. [Customizable Components](#customizable-components)
   - [Button](#button)
   - [Dialog](#dialog)
   - [Loading](#loading)
   - [FormTextInput](#formtextinput)
   - [ValidationError](#validationerror)
7. [Using the Template Effectively](#using-the-template-effectively)
   - [Recommended Folder Structure](#recommended-folder-structure)
   - [Development Decision Flow Chart](#development-decision-flow-chart)
   - [Benefits of This Approach](#benefits-of-this-approach)
8. [Finish Line](#finish-line)

<a name="quick-start"></a>

## Quick Start 🚀

To create a new project using this template, run:

```bash
git clone https://github.com/zerodays/react-native-template.git my-app
cd my-app
yarn
```

<a name="project-structure"></a>

## Project Structure 🏗️

This template provides a well-organized directory structure with a set of preconfigured files to streamline your development process. Here's an overview of the essential components:

- `.github`: Contains GitHub Actions workflows for CI/CD.
- `app`: Contains the screens (utilizing expo-router file naming).
- `assets`: Stores static files like images, fonts, and videos.
- `components`: Houses reusable components that can be shared across multiple screens.
- `locales`: Contains localization files for internationalization.
- `utils`: A place for utility functions, hooks, stores and types that can be shared across your application.

<a name="configuration-files"></a>

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

<a name="configuration-files"></a>

## Features and Benefits 🌟

This template comes equipped with a robust set of features and solutions to enhance your development workflow:

<a name="1-full-linting-and-auto-formatting"></a>

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

<a name="2-easy-aliases-with-typescript"></a>

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

<a name="3-nativewind-integration"></a>

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

<a name="4-full-localization-support"></a>

### 4. Full Localization Support 🌐

Achieve effortless internationalization with `react-i18next` and `i18next`. Translation keys are typesafe and localisation files are neatly organized.

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation('common');
i18n.changeLanguage('en'); // Switch languages
<Text>{t('helloWorld')}</Text>; // Typesafe keys
```

<a name="5-typed-expo-router-setup"></a>

### 5. Typed Expo Router Setup 🚦

Pre-configured routing structure for authenticated and guest users. Routes are typed for hassle-free navigation.

```typescript
import { Href } from 'expo-router';

type RouteConstructor = (href: Href) => Href;
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

<a name="6-orval-api-client-setup"></a>

### 6. Orval API Client Setup 📡

A pre-configured Orval setup generates a typed API client and TanStack Query hooks from your OpenAPI spec. The `api/generated` folder contains endpoints, models, and optional MSW mocks, powered by a custom Axios mutator and React Query.

```bash
# Generate the client from your OpenAPI schema
yarn gen-api
```

```typescript
// Use generated React Query hooks
import { useGetRandomFact, useGetFacts } from 'api/generated/endpoints';

const { data, isLoading, error } = useGetRandomFact({ max_length: 140 });
```

```typescript
// Imperative request (without a hook)
import { getRandomFact } from 'api/generated/endpoints';

const { data } = await getRandomFact({ max_length: 140 });
```

```typescript
// Global headers and base URL are configured via Axios
// Base URL: env.EXPO_PUBLIC_API_URL (see api/axios-instance.ts)
// Headers: injected by ApiProvider (see utils/providers/api-provider.ts)
import { ApiProvider } from '@utils/providers/api-provider';

// Wrap your app (e.g., in your root layout)
<ApiProvider>{children}</ApiProvider>;
```

<a name="7-custom-utility-hooks"></a>

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

<a name="8-zustand-state-management"></a>

### 8. Zustand State Management 🏪

Effortlessly manage your application state with Zustand, which includes async persistent storage support.

```typescript
const { value, increment, decrement } = useExampleStore();
```

<a name="9-cicd-workflow-configuration"></a>

### 9. CI/CD Workflow Configuration 🔄

Automate your development processes with pre-defined GitHub Actions workflows located in the `.github` folder:

- `build.yml`: For continuous integration builds.
- `lint.yml`: For code linting checks.
- A pull request template to standardize contributions.

<a name="10-infisical-environment-variable-support"></a>

### 10. Infisical Environment Variable Support 🔐

Incorporate environment variables securely using the Infisical service with a custom script `infisical.sh`, which is run to inject variables into your build process.

<a name="included-packages-and-their-benefits"></a>

### 11. Sentry Integration 🦉

Integrate Sentry for error monitoring and tracking in your application. The template includes a pre-configured setup for Sentry, allowing you to easily track and resolve issues in your app.

```typescript
import * as Sentry from 'sentry-expo';

Sentry.init({
  debug: true,
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: process.env.EXPO_PUBLIC_SENTRY_ENV,
  ...
});
```

These environment variables are injected into the build process using the Infisical service, ensuring that sensitive information is kept secure.

### Included Packages and Their Benefits 📦

The `react-native-template` includes several packages that extend its capabilities and enrich the development experience. Here's a brief overview of these packages and what they offer:

<a name="zod"></a>

#### Zod

[Zod](https://github.com/colinhacks/zod) is a TypeScript-first schema declaration and validation library. It allows you to build schemas using TypeScript syntax, ensuring that data conforms to the specified shapes and types at runtime. Zod is particularly useful for validating data received from external sources, such as APIs or user input, and helps enforce type safety throughout the application.

<a name="lottie-react-native"></a>

#### Lottie-React-Native

[Lottie-React-Native](https://github.com/lottie-react-native/lottie-react-native) is a mobile library for React Native that parses Adobe After Effects animations exported as json with Bodymovin and renders them natively on mobile. This package enables developers to add high-quality animations to their React Native applications easily. Lottie animations are highly performant and can drastically enhance the user interface by providing fluid, eye-catching animations that can be controlled programmatically.

<a name="lucide-react-native"></a>

#### Lucide-React-Native

[Lucide-React-Native](https://github.com/lucide-icons/lucide-react-native) is a fork of the Feather Icons project, specifically tailored for React Native applications. It provides a collection of beautifully crafted, customizable icons which are easy to use in UI development. Using Lucide icons helps maintain consistency and clarity in the app's design, making the interface more intuitive and visually appealing.

<a name="react-hook-form"></a>

#### React Hook Form

[React Hook Form](https://react-hook-form.com/) is a flexible and efficient library for managing forms in React applications. It embraces uncontrolled components and native HTML inputs, utilizing hooks to optimize re-renders and improve performance. React Hook Form reduces the amount of boilerplate code needed to build complex forms while increasing performance compared to traditional form state management practices.

<a name="customizable-components"></a>

## Customizable Components 🎄

This template includes a set of customizable components that you can use to build your application:

<a name="button"></a>

## Button ⏩

A highly customizable button component that adopts the variants pattern inspired by `shadcn/ui`, allowing for a consistent yet adaptable design throughout your application.

### Component Explanation

The `Button` component leverages the power of Tailwind CSS with React Native through Nativewind to offer a range of pre-set button styles, termed 'variants'. You can easily extend or customize these styles to fit your design requirements.

Here's a quick rundown on how it works:

- **Variants**: Define the look of your buttons through a `variants` object. Each variant contains styles for the container, text, and optional icon. Variants are applied using the `cn` function from `utils/cn.ts` which ensures proper sorting of Tailwind classes.

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
  iconLeft={HeartIcon}>
  Like
</Button>;
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

<a name="dialog"></a>

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
<Dialog>{/* ... */}</Dialog>
```

2. **Displaying Content**: The `DialogContent` wraps the content you want to display inside the modal. It's equipped with a fade-in animation and `KeyboardAvoidingView` to ensure that input fields are always in view.

```jsx
<DialogContent>{/* Your content here */}</DialogContent>
```

3. **Trigger**: Use `DialogTrigger` anywhere within the `Dialog` context to provide a button that can open the dialog.

```jsx
<DialogTrigger variant="default">Open Dialog</DialogTrigger>
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
  <DialogTrigger variant="filled">Show Terms of Service</DialogTrigger>
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

<a name="formtextinput"></a>

## FormTextInput 📝

The `FormTextInput` component in the template is a versatile input field designed to work seamlessly with `react-hook-form`. It incorporates features like form context integration, custom icons, and support for different input types including text, number, and multiline text.

### Component Features

- **Integration with `react-hook-form`**: The component is built to automatically hook into the `FormProvider` context, making form state management effortless.
- **Custom Icons**: It supports the inclusion of icons within the text input for a polished look.
- **Multiline Support**: Easily switch between single-line and multiline inputs based on the provided `params`.
- **Display Mode**: A display mode that disables editing, suitable for presenting values in a read-only format.

### How It Works

The `FormTextInput` uses a `Controller` from `react-hook-form` to manage the text input's state and validations. It receives a `name` prop which corresponds to the form field it controls.

### Usage

To use this component, wrap your form in a `FormProvider` and then include `FormTextInput` for each field you need:

```jsx
import { FormProvider } from 'react-hook-form';
import FormTextInput from '@components/FormTextInput';

const formMethods = useForm(); // Initialize react-hook-form methods

// ...

<FormProvider {...formMethods}>
  <FormTextInput
    name="username"
    label="Username"
    icon={UserIcon} // Replace with an actual icon component
    params={{ answerType: 'text' }}
  />
</FormProvider>;
```

### Customizing the TextInput

To customize the text input, pass additional props like `style` for styling and `params` for defining the input's behavior:

```jsx
<FormTextInput
  name="description"
  label="Description"
  params={{ answerType: 'multiline-text' }}
  style={{ ... }}
/>
```

### Custom Icons

Pass your desired icon component through the `icon` prop:

```jsx
import { MailIcon } from 'lucide-react-native';

<FormTextInput name="email" label="Email Address" icon={MailIcon} />;
```

By using `FormTextInput`, form inputs are handled elegantly, providing a streamlined user experience for form interactions.

<a name="validationerror"></a>

## ValidationError 🔍

The `ValidationError` component in the template is a dedicated UI element for displaying form validation errors. It integrates with `react-hook-form` and uses internationalization for error messages.

### Component Features

- **Seamless Integration**: Works in conjunction with `react-hook-form` to display validation messages.
- **Internationalization Support**: Utilizes `react-i18next` for translating error messages, making the component ready for multilingual applications.
- **Flexibility**: Offers a `tiny` prop to display a smaller-sized error message, suitable for inline errors or limited space scenarios.

### How It Works

The `ValidationError` component taps into the `FormProvider` context to access the form's error state. It checks if there are any errors associated with the given `name` prop and renders the error message if present.

### Usage

Wrap your form controls within a `FormProvider` and position the `ValidationError` component where you want to display the error message:

```jsx
import { FormProvider } from 'react-hook-form';
import FormTextInput from '@components/FormTextInput';
import ValidationError from '@components/ValidationError';

const formMethods = useForm(); // Initialize react-hook-form methods

// ...

<FormProvider {...formMethods}>
  <FormTextInput
    name="username"
    label="Username"
    // other props
  />
  <ValidationError name="username" />
</FormProvider>;
```

### Customizing the Display

To show a smaller error message, use the `tiny` prop:

```jsx
<ValidationError name="username" tiny />
```

### Wrapping Components with Error Handling

For convenience, you can wrap any form control with `WithValidationError` to include both the input and its validation message:

```jsx
import { WithValidationError } from '@components/ValidationError';

// ...

<WithValidationError name="password">
  <FormTextInput
    name="password"
    label="Password"
    secureTextEntry
    // other props
  />
</WithValidationError>;
```

The `ValidationError` and `WithValidationError` components help maintain a clean UI by only showing error messages when necessary, enhancing the user experience with clear feedback.

## More Components Comming Soon... 🎉

Stay tuned for more components and features that will be added to the template in the future. We're committed to providing a comprehensive set of tools and solutions to help you build your mobile applications with ease.

<a name="using-the-template-effectively"></a>

## Using the Template Effectively 🛠️

To get the most out of the `react-native-template`, it's crucial to understand and utilize the recommended folder structure. This structure is meticulously designed to guide best practices in maintaining a clean, scalable, and maintainable codebase, enabling you to build applications quickly and efficiently.

<a name="recommended-folder-structure"></a>

### Recommended Folder Structure 📁

The folder structure serves as a blueprint for organizing your project's files:

- **`/app`**: Contains all your screens and pages, adhering to the structure required by Expo Router.
- **`/api`**: Houses Zod schemas, API endpoint definitions, and any inferred types.
- **`/utils`**: For reusable logic across the application.
- **`/locales`**: To manage all localization files.
- **`/assets`**: For all static files like images, fonts, and Lottie animations.
- **`/components`**: Split into two distinct subfolders:
  - **`/ui`**: For generic, reusable UI components.
  - **`/[component-name]`**: For large, complex, or specific components like `/sidebar`, `/complex-navbar`, or `/custom-calendar`.

<a name="development-decision-flow-chart"></a

### Development Decision Flow Chart 🔄

When developing with this template, use the following decision process:

1. **New Screens**: Start by writing code directly in the screen/page file within the `/app` directory.
2. **Component Extraction**: If a piece of UI repeats multiple times within the same screen, extract it as a new component within the same file.
3. **Component Generalization**: Once a component is needed across multiple screens, generalize it and place it in the appropriate `/components` subfolder.

![Flowchart Description](/assets/docs/flow-chart.png)

<a name="benefits-of-this-approach"></a>

### Benefits of This Approach ✨

- **Readability**: Keeping simple, screen-specific components within the screen file makes the code easier to follow.
- **Efficiency**: Components are modularized only when necessary, avoiding premature refactoring.
- **Clarity**: The structure clarifies where each piece of code should reside.
- **Continuous Refinement**: Regularly transitioning components from local to global as needed helps to reduce technical debt.

By following this development flow, you can maintain a clean and organized codebase that is easy to navigate and scale as your application grows.

<a name="finish-line"></a>

## Finish Line 🏁

Now go build something amazing with `react-native-template`! We hope this template provides you with the tools and structure you need to create high-quality mobile applications efficiently. If you have any questions, feedback, or suggestions, feel free to reach out to us. Happy coding! 🚀
