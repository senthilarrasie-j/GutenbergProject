# Gutenberg Project

This app contains a responsive React Native mobile cataloging application built using the Gutendex API. Users can browse books by genre, search by title/author, read books in their browser, and toggle themes and languages.

---

## 📱 Demo Video & Screenshots

> [!TIP]
> Place the demo video showcasing portrait and landscape responsiveness here.
> Example markdown to insert:
> `![Demo Video](/path/to/demo_video.mp4)`

---

## 📖 Project Overview

This app is a social cataloging client for the Gutendex API (hosted Project Gutenberg catalog). Key features:
- **Genre Directory**: Quick access to categories (Fiction, Drama, Humor, etc.).
- **Infinite Scrolling**: Lazy loads books as the user scrolls.
- **Unified Search**: Search title and author while maintaining the active genre filter.
- **Browser Integration**: Automatically resolves and opens preferred ebook formats (HTML > PDF > TXT).
- **Responsive Layout**: Designed for mobile devices and adapts to portrait & landscape orientations.
- **Offline Cache**: Instantly caches book metadata using MMKV for fast offline browsing.
- **Multilingual Support**: Fully localized in English, Spanish, Hindi, and Tamil.

---

## 🛠 Setup & Run Instructions

> [!NOTE]
> Currently, this project targets and supports the Android platform only.

### Prerequisites
- Node.js >= 22.11.0
- Android SDK & Emulator/Device (supported versions):
  - **Minimum Android version**: API Level 24 (Android 7.0)
  - **Target Android version**: API Level 36 (Android 15)
  - **Compile SDK version**: API Level 37
  - **Gradle version**: 9.4.1

### 1. Installation
Clone the repository and install npm packages:
```bash
npm install
```

### 2. Environment Configuration
Create `.env` file in the root directory:
```ini
API_BASE_URL=https://gutendex.careers.ignitesol.com/books
NEXT_URL_TARGET=http://gutendex-api:8974
NEXT_URL_REPLACEMENT=https://gutendex.careers.ignitesol.com
```

### 3. Running the App

#### Start Metro Bundler
```bash
npx react-native start
```

#### Run on Android
```bash
npx react-native run-android
```

#### Running Tests
```bash
npm run test
# OR
npx jest
```

#### Running Linter
```bash
npm run lint
```

---

## 🏗 Architecture Overview

The app follows a structured **Feature-Based Layered Architecture**:

```
src/
├── features/          # Feature modules
│   └── books/         # Books feature directory
│       ├── api/       # Axios API layer
│       ├── components/# Reusable UI components (BookCard, GenreCard, etc.)
│       ├── constants/ # Constants, genres, and translated string keys
│       ├── hooks/     # Custom React hooks (useBooks, etc.)
│       ├── screens/   # App screens (GenreScreen, BookListScreen)
│       └── store/     # Redux slices and state managers
├── navigation/        # React Navigation stack config
├── services/          # Services (i18n, storage, theme)
├── store/             # Global Redux store configuration
├── ui/                # Shared theme & style systems
└── utils/             # Helper utilities
```

### Key Architectural Systems
1. **State Management**: Redux Toolkit handles book lists, loading, and errors.
2. **Local Storage**: `react-native-mmkv` provides fast, low-overhead key-value storage for cached books.
3. **Localization**: `i18next` combined with `react-native-localize` detects the device language and loads localized strings dynamically.
4. **Environment Config**: `react-native-dotenv` injects env variables into build-time assets.
5. **React Hooks**:
   - **Custom Hooks**:
     - `useBooks`: Manages book loading, infinite scroll pagination, search queries, and local offline cache integration.
     - `useExitApp`: Listens to Android back button behavior to confirm/exit app on home screen.
   - **Standard Hooks**: Uses `useState`, `useEffect`, `useCallback`, `useMemo`, and `useRef` for component lifecycle and performance.
   - **Redux Hooks**: Uses `useDispatch` and `useSelector` to connect components to the global store.

### System Configuration

- **Babel Configuration**:
  - [babel.config.js](./babel.config.js) uses `babel-plugin-module-resolver` to map `@/*` import paths to `./src`.
  - Integrates `module:react-native-dotenv` Babel plugin for compile-time environment variable injection.
- **Jest Configuration**:
  - [jest.config.js](./jest.config.js) maps `@env` to the mock file `__tests__/__mocks__/env.js` and resolves `@/*` aliases.
  - Mocks native mobile dependencies (`react-native-mmkv`, `netinfo`, `localize`, `safe-area-context`).
- **React Native Testing Library**:
  - Used for unit and integration testing of hooks, APIs, Redux slices, and UI components using `@testing-library/react-native`.
- **Asset & Font Configuration**:
  - Configured custom Montserrat fonts under `./assets/fonts/` as per the design requirements in the PDF style guide.
  - Linked using [react-native.config.js](./react-native.config.js) to bundle custom assets.

---

## 📦 Third-Party Libraries Used

| Library                                | Purpose                                    |
| :------------------------------------- | :----------------------------------------- |
| **@reduxjs/toolkit** & **react-redux** | Centralized global state management        |
| **axios**                              | HTTP networking client                     |
| **react-native-mmkv**                  | High-performance offline key-value storage |
| **react-native-localize**              | Detects device system language and region  |
| **i18next** & **react-i18next**        | Dynamic runtime localization               |
| **react-native-reanimated**            | Fluid animations and layout transitions    |
| **react-native-vector-icons**          | Consistent iconography                     |
| **react-native-dotenv**                | Secure environment variables               |

---

## 🤖 AI Tools Used

- **Google Antigravity AI**: Assisted with environment variable configuration, TypeScript typing, and Jest testing setups.

---

## ⚠️ Assumptions & Known Limitations

- **MIME-Type Image Filter**: The app requests `mime_type: 'image'` in API calls to ensure all displayed books have covers, as recommended in the assessment requirements.
- **Next Page Domain Remapping**: The Gutendex API returns next-page URLs referencing an unreachable internal docker hostname (`http://gutendex-api:8974`). The app rewrites these to the public gateway `https://gutendex.careers.ignitesol.com` at runtime using env variables.
- **Zip Files**: Ebooks returned as `.zip` formats are skipped in browser selection as they are not natively viewable in standard mobile web views.
