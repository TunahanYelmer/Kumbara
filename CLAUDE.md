# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kumbara is a React Native savings tracker app built with Expo. It consists of:

- **Frontend**: React Native mobile app (TypeScript)
- **Backend**: Go HTTP API server with SQLite database
- Two database layers: Local SQLite (expo-sqlite) for mobile, and backend SQLite for API persistence

## Development Commands

## you are my software engineering profesor your only purpose to teach me how to code

## always plan mode

## always give hints instead of giving the full solution

## use strictly the designsystem.ts if you are suggesting css

### Frontend (React Native/Expo)

```bash
# Start the development server
npm start

# Start on Android device/emulator
npm run android

# Start on iOS simulator
npm run ios

# Start web version
npm run web

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Backend (Go API)

```bash
# Run the backend server from the backend directory
cd backend
go run main.go
# Server runs at http://192.168.1.108:8082 (configured for local network)

# Build the backend
go build -o kumbara-api main.go
```

**Note**: The IP address `192.168.1.108` is hardcoded in multiple places:

- `package.json` (REACT_NATIVE_PACKAGER_HOSTNAME)
- `api/getBalance.ts` (BASE_URL)
- Backend may need to listen on this specific network interface

## Architecture

### Frontend Structure

The app uses a context-based state management pattern with three main providers:

1. **ThemeProvider** (`context/theme/`): Manages app theme/styling
2. **StateProvider** (`context/state/`): Global state using reducer pattern (see `stateReducer.ts`)
3. **NavigationProvider** (`context/navigation/`): Navigation state management

**Navigation hierarchy**:

```
App.tsx
└── RootStack (Stack Navigator)
    ├── Tabs (Tab Navigator)
    │   ├── Home (HomeScreen)
    │   └── Settings (SettingsScreen)
    └── Notifications (NotificationScreen)
```

**Path aliases** (configured in `tsconfig.json` and `package.json`):

- `@/*` → root directory
- `@components/*` → `./components/*`
- `@api/*` → `./api/*`
- `@context/*` → `./context/*`
- `@assets/*` → `./assets/*`
- `@screens/*` → `./screens/*`
- `@navigation/*` → `./navigation/*`
- `@_tabs_/*` → `./_tabs_/*`

### Database Architecture

**Two separate SQLite databases exist**:

1. **Local Mobile DB** (`database/db.ts`):

   - Uses `expo-sqlite` package
   - Database file: `kumbara.db`
   - Tables: `accounts`, `transactions`
   - Direct database operations for offline-first mobile app

2. **Backend API DB** (`backend/main.go`):
   - Uses `go-sqlite3` driver
   - Database file: `../database/database.db`
   - Tables: `balance` (single row, id=1), `transactions`
   - Accessed via REST API endpoints at port 8082

**API Endpoints** (`backend/main.go:189-216`):

- `GET /balance` - Get current balance
- `POST /balance` - Update balance (body: `{"balance": number}`)
- `GET /transactions` - List all transactions (ordered by date DESC)
- `POST /transactions` - Create transaction (body: `{"type": "deposit"|"withdraw", "category": string, "amount": number}`)

**API client** (`api/` directory):

- `getBalance.ts`, `postBalance.ts`
- `getTransactions.ts`, `postTransactions.ts`
- All use axios with BASE_URL `http://192.168.1.108:8082`

### Component Organization

Key components in `components/`:

- `BalanceCard/` - Display current balance with gradient styling
- `TransactionHistory/` - Transaction list view
- `Transactions/` - Individual transaction items
- `AddMoneyModal/` - Modal for depositing money
- `WithDrawMoneyModal/` - Modal for withdrawing money
- `User/` - User profile components
- `notifications/` - Notification-related components

All major components have corresponding test files in `components/__tests__/`

### State Management

The app uses a reducer pattern (`context/state/stateReducer.ts`):

- Access state via `useDataLayerValue()` hook from `StateProvider`
- Returns `[state, dispatch]` tuple
- Initial state defined in `stateReducer.ts`

## Testing

- Test framework: Jest with `jest-expo` preset
- Testing library: `@testing-library/react-native`
- Setup file: `jest.setup.ts`
- Test files: `components/__tests__/*.test.tsx`

Run a single test file:

```bash
npx jest components/__tests__/BalanceCard.test.tsx
```

## Important Notes

- The app is designed for local network development (WSL2 environment)
- UI text is in Turkish (e.g., "Ana Sayfa" = Home, "Ayarlar" = Settings)
- The app supports both light and dark themes via ThemeProvider
- Transaction types are constrained to `'deposit'` or `'withdraw'`
- Backend validates positive amounts and sufficient balance for withdrawals
- Backend uses database transactions for balance updates to ensure consistency
