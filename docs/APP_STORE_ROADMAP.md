# 📱 Kumbara App Store Publication Roadmap

**Complete Guide to Publishing Your Savings Tracker on Android & iOS**

---

## 📋 Table of Contents

1. [Pre-Launch Essentials](#1-pre-launch-essentials)
2. [Missing Features - Prioritized](#2-missing-features---prioritized)
3. [Report & Analytics Feature](#3-report--analytics-feature-detailed-design)
4. [Design Enhancements](#4-design-enhancements)
5. [Android Publication Process](#5-android-publication-process)
6. [iOS Publication Process](#6-ios-publication-process)
7. [CI/CD Pipeline](#7-cicd-pipeline)
8. [Post-Launch Strategy](#8-post-launch-strategy)

---

## 🎯 Current State

### ✅ What Kumbara Has

**Core Features:**

- ✅ Balance tracking with backend API (Go + SQLite)
- ✅ Deposit/withdrawal transactions with 5 categories
- ✅ Transaction history (filterable by type)
- ✅ Google OAuth authentication with JWT
- ✅ Currency selection (₺, $, €)
- ✅ Dark/light theme toggle
- ✅ Professional fintech UI redesign completed
- ✅ Design system implemented
- ✅ Testing infrastructure (Jest + React Testing Library)

**Technical Foundation:**

- React Native 0.81.5 + Expo 54
- TypeScript with proper type safety
- EAS configured for builds
- Navigation structure (React Navigation)
- State management (Context + Reducer pattern)

### ❌ Critical Gaps for App Store

**Legal & Security:**

- ❌ No privacy policy or terms of service
- ❌ OAuth credentials in .env (not production-safe)
- ❌ No environment separation (dev/staging/prod)
- ❌ No app signing configuration

**Features:**

- ❌ No savings goals
- ❌ No reports/analytics
- ❌ No data export
- ❌ No transaction editing/deletion
- ❌ Settings features are UI-only (PIN, biometric, notifications)

**Deployment:**

- ❌ No CI/CD pipeline
- ❌ No backend deployment strategy
- ❌ No app store listing content

---

## 1. Pre-Launch Essentials

### 1.1 Legal Requirements

**🤔 Critical Question:** What data does Kumbara collect?

**Answer:**

- ✅ Email address (from Google OAuth)
- ✅ Name and profile photo (from Google)
- ✅ Financial data (balance, transactions)
- ✅ Device information (for authentication)
- ✅ Usage analytics (potentially)

**Privacy Policy - What to Include:**

1. **Data Collection**

   - What data you collect
   - Why you collect it
   - How long you store it

2. **Data Usage**

   - How you use the data (app functionality)
   - Third-party services (Google OAuth, analytics)
   - Data sharing policies (do you sell data? No!)

3. **User Rights**

   - Right to access data
   - Right to delete account
   - Right to export data

4. **Security**
   - How data is protected (JWT, HTTPS)
   - Encryption practices

**Tools to Generate Privacy Policy:**

- [PrivacyPolicies.com](https://www.privacypolicies.com/) - Free generator
- [Termly](https://termly.io/products/privacy-policy-generator/) - Customizable templates
- [FreePrivacyPolicy.com](https://www.freeprivacypolicy.com/) - Simple generator

**Terms of Service - What to Include:**

- User responsibilities (accurate financial data)
- Prohibited uses (no illegal activity tracking)
- Disclaimer (app is for personal tracking, not financial advice)
- Limitation of liability
- Termination policy

**📝 Action Items:**

- [ ] List all data points Kumbara collects
- [ ] Generate privacy policy using template
- [ ] Host privacy policy (GitHub Pages, or simple HTML page)
- [ ] Create terms of service
- [ ] Add links to app settings screen

---

### 1.2 Environment Configuration

**🎓 Teaching Point:** Professional apps use at least 3 environments:

| Environment     | Purpose                | Backend URL                     | Database     |
| --------------- | ---------------------- | ------------------------------- | ------------ |
| **Development** | Local coding           | http://192.168.1.108:8082       | Local SQLite |
| **Staging**     | Pre-production testing | https://staging-api.kumbara.com | Cloud DB     |
| **Production**  | Live users             | https://api.kumbara.com         | Cloud DB     |

**File Structure:**

```
project/
├── .env.development
├── .env.staging
├── .env.production
└── app.config.js (reads from .env)
```

**Example `.env.production`:**

```bash
# Production environment - DO NOT commit this file!
API_BASE_URL=https://api.kumbara.com
GOOGLE_WEB_CLIENT_ID=your-prod-client-id
GOOGLE_ANDROID_CLIENT_ID=your-prod-android-id
GOOGLE_IOS_URL_SCHEME=your-prod-ios-scheme
SENTRY_DSN=your-sentry-dsn
```

**Update `app.config.js`:**

```javascript
import 'dotenv/config'

export default {
  expo: {
    name: process.env.APP_ENV === 'production' ? 'Kumbara' : 'Kumbara Dev',
    slug: 'Kumbara',
    version: '1.0.0',
    extra: {
      apiBaseUrl: process.env.API_BASE_URL,
      googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID
      // Access in app: import Constants from 'expo-constants';
      // Constants.expoConfig.extra.apiBaseUrl
    }
  }
}
```

**📝 Action Items:**

- [ ] Create 3 .env files (dev, staging, prod)
- [ ] Update app.config.js to read from .env
- [ ] Add .env.production to .gitignore (CRITICAL!)
- [ ] Document environment setup in README

---

### 1.3 Secure Secrets Management

**⚠️ Current Problem:**
Your `.env` file contains:

```bash
GOOGLE_WEB_CLIENT_ID=128505674528-6svobv6hrhgnghh3il98o98idt94p4t9.apps.googleusercontent.com
```

**🤔 Why is this bad?**

- If .env is accidentally committed, credentials are public
- Anyone can impersonate your app
- Users' Google accounts could be compromised

**✅ Solution: Expo Secrets (EAS)**

**Setup:**

```bash
# Install EAS CLI (you already have it)
npm install -g eas-cli

# Login to Expo
eas login

# Store secrets securely
eas secret:create --scope project --name GOOGLE_WEB_CLIENT_ID --value "your-client-id" --type string

# Repeat for all secrets
eas secret:create --scope project --name GOOGLE_ANDROID_CLIENT_ID --value "your-android-id"
eas secret:create --scope project --name GOOGLE_IOS_URL_SCHEME --value "your-ios-scheme"
eas secret:create --scope project --name JWT_SECRET --value "your-jwt-secret"
```

**Access in builds:**

```javascript
// eas.json
{
  "build": {
    "production": {
      "env": {
        "GOOGLE_WEB_CLIENT_ID": "@GOOGLE_WEB_CLIENT_ID",
        "GOOGLE_ANDROID_CLIENT_ID": "@GOOGLE_ANDROID_CLIENT_ID"
      }
    }
  }
}
```

**Backend Secrets (Go API):**
For production, use environment variables:

```go
// Instead of loading from .env:
jwtSecret := os.Getenv("JWT_SECRET")
if jwtSecret == "" {
    log.Fatal("JWT_SECRET environment variable not set")
}
```

**📝 Action Items:**

- [ ] Create Expo account (free)
- [ ] Run `eas secret:create` for all sensitive values
- [ ] Remove sensitive data from .env files
- [ ] Update backend to use environment variables
- [ ] Test that app works with EAS secrets

---

### 1.4 App Signing

**🎓 Teaching Point:** Why is signing critical?

When you publish an app, Google/Apple verify it's really YOU updating it. Without the same signing key, you can't update your app - you'd have to publish a completely new app!

#### Android Keystore

**Generate keystore:**

```bash
# Run this command ONCE and SAVE THE FILE SAFELY!
keytool -genkeypair -v \
  -keystore kumbara-release.keystore \
  -alias kumbara-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# You'll be asked:
# - Keystore password (SAVE THIS!)
# - Key password (SAVE THIS!)
# - Your name, organization, city, etc.
```

**⚠️ CRITICAL: Back up this keystore!**

- Store in password manager (1Password, LastPass)
- Email encrypted copy to yourself
- Store in secure cloud storage
- If you lose it, you CANNOT update your app!

**Using EAS credentials (recommended):**

```bash
# Let EAS manage your keystore
eas credentials

# Select: Android → Production → Build Credentials → Generate new keystore
```

#### iOS Certificates

**🤔 What certificates do you need?**

1. **Development Certificate** - For testing on devices
2. **Distribution Certificate** - For App Store submission

**Manual Process:**

1. Go to developer.apple.com/account
2. Certificates, IDs & Profiles
3. Create new certificate
4. Download and install

**Automatic with EAS (easier!):**

```bash
eas credentials

# Select: iOS → Production → Distribution Certificate → Generate new
# EAS will handle everything automatically
```

**📝 Action Items:**

- [ ] Generate Android keystore OR use EAS credentials
- [ ] Back up keystore in 3 locations
- [ ] Save passwords securely
- [ ] Configure iOS certificates (when you have Apple Developer account)
- [ ] Test signing by building a release APK

---

### 1.5 Backend Deployment

**🤔 Current Setup:** Backend runs on `http://192.168.1.108:8082` (local network only)

**Problem:** Users can't access this! You need a public server.

#### Hosting Options

| Service          | Cost       | Ease       | Best For         |
| ---------------- | ---------- | ---------- | ---------------- |
| **Railway.app**  | $5/month   | ⭐⭐⭐⭐⭐ | Quickest setup   |
| **Fly.io**       | $0-5/month | ⭐⭐⭐⭐   | Good free tier   |
| **DigitalOcean** | $6/month   | ⭐⭐⭐     | Full control     |
| **AWS EC2**      | $8+/month  | ⭐⭐       | Enterprise-grade |
| **Heroku**       | $7/month   | ⭐⭐⭐⭐   | Simple, reliable |

**Recommended: Railway.app** (easiest for beginners)

#### Dockerize Your Backend

**Create `backend/Dockerfile`:**

```dockerfile
FROM golang:1.24-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .
COPY --from=builder /app/.env .

EXPOSE 8082
CMD ["./main"]
```

**Create `backend/.dockerignore`:**

```
*.db
.env
.git
```

**Deploy to Railway:**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
cd backend
railway init

# 4. Add environment variables
railway variables set JWT_SECRET=your-secret-here

# 5. Deploy!
railway up

# 6. Get your URL
railway domain
# Example: kumbara-api-production.up.railway.app
```

**Update mobile app API URL:**

```bash
# .env.production
API_BASE_URL=https://kumbara-api-production.up.railway.app
```

#### Database Consideration

**🤔 Question:** Should you use SQLite in production?

**Answer:** For 100s of users: ✅ Yes
For 1000s+ users: ❌ No, migrate to PostgreSQL

**SQLite Pros:**

- Simple, no separate server
- Fast for single-user queries
- Easy backups (just copy .db file)

**SQLite Cons:**

- No concurrent writes (one write at a time)
- Limited scalability
- Backup strategy needed

**Migration Path (future):**

```bash
# When you outgrow SQLite:
# 1. Use Railway's PostgreSQL
railway add postgresql

# 2. Update Go code to use postgres driver
# 3. Migrate data with a script
```

**📝 Action Items:**

- [ ] Create Railway account
- [ ] Dockerize backend
- [ ] Deploy backend to Railway
- [ ] Get production URL
- [ ] Update mobile app to use production URL
- [ ] Test authentication and transactions
- [ ] Set up automated backups for SQLite

---

## 2. Missing Features - Prioritized

### 🎯 MVP Philosophy

**"What's the minimum you can launch that provides real value?"**

You could launch Kumbara TODAY with existing features. But to compete with other savings apps, you need:

1. **Goals** (why are people saving?)
2. **Reports** (what insights do users get?)
3. **Export** (user data ownership builds trust)

---

### Phase 1: MVP Features (Required for Launch)

#### 2.1 Savings Goals 🎯

**Why Critical:** "Savings tracker" without goals is just a ledger. Goals give users motivation and progress tracking.

**User Stories:**

- "I want to save ₺5,000 for a vacation by July 2025"
- "I want to track progress toward my emergency fund"
- "I want multiple goals at once (vacation, car, emergency)"

**Database Schema:**

```sql
CREATE TABLE goals (
  goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  target_amount REAL NOT NULL,
  current_amount REAL DEFAULT 0,
  deadline DATE,
  category TEXT, -- 'vacation', 'emergency', 'purchase', 'other'
  emoji TEXT, -- '✈️', '🚗', '🏠', '💰'
  color TEXT, -- '#3B82F6'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

**API Endpoints:**

```go
// backend/main.go - Add these endpoints
GET    /goals              // List all user goals
POST   /goals              // Create new goal
PATCH  /goals/:id          // Update goal (name, target, deadline)
DELETE /goals/:id          // Delete goal
POST   /goals/:id/allocate // Allocate money to goal
```

**UI Components to Create:**

```
screens/goals/
  GoalsScreen.tsx          // List of all goals
  CreateGoalModal.tsx      // Create/edit goal form
  GoalCard.tsx             // Individual goal display
  GoalProgress.tsx         // Progress bar component
```

**Goal Card Design:**

```
┌─────────────────────────────┐
│ ✈️ Vacation                 │
│ ₺3,500 / ₺5,000            │
│ ████████░░░░░░░ 70%        │
│ 📅 45 days remaining        │
└─────────────────────────────┘
```

**🎓 Learning Exercise:**

1. **Design Question:** How do users add money to goals?

   - Option A: Manually allocate from balance
   - Option B: Percentage of each deposit auto-allocated
   - Option C: Both
   - **Think:** Which provides better UX?

2. **Technical Question:** What happens when a goal is reached?
   - Move to "Completed" section?
   - Celebration animation?
   - Remove from active goals?

**Implementation Steps:**

```typescript
// 1. Create Goal type
interface Goal {
  goal_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: 'vacation' | 'emergency' | 'purchase' | 'other';
  emoji: string;
  progress: number; // calculated: (current / target) * 100
}

// 2. Add to state reducer
type Action =
  | { type: 'SET_GOALS'; Goals: Goal[] }
  | { type: 'ADD_GOAL'; Goal: Goal }
  | { type: 'UPDATE_GOAL'; goal_id: number; updates: Partial<Goal> }
  | ... existing actions

// 3. Create API functions
// api/goals.ts
export const getGoals = async (token: string): Promise<Goal[]> => {
  const response = await axios.get(`${BASE_URL}/goals`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// 4. Build UI component
// screens/goals/GoalsScreen.tsx
```

**Estimated Time:** 3-4 days

- Backend endpoints: 4 hours
- Frontend components: 8 hours
- Testing & polish: 4 hours

**📝 Action Items:**

- [ ] Sketch goal card UI on paper
- [ ] Decide: How do users allocate money to goals?
- [ ] Create goals table in database
- [ ] Implement backend endpoints
- [ ] Build GoalsScreen with list
- [ ] Create CreateGoalModal
- [ ] Add "Goals" tab to navigation
- [ ] Test goal creation and progress tracking

---

#### 2.2 Basic Analytics/Reports 📊

**See Section 3 for detailed design**

Quick summary:

- Monthly income/expense summary
- Category breakdown pie chart
- 6-month spending trend
- Top 5 transactions
- Export to CSV/PDF

**Estimated Time:** 5-7 days

---

#### 2.3 Transaction Management ✏️

**Why Critical:** Users make mistakes. They'll want to fix them.

**Features Needed:**

1. **Edit Transaction**

   - Change amount
   - Change category
   - Change date
   - Update balance accordingly

2. **Delete Transaction**

   - Remove transaction
   - Recalculate balance
   - Show confirmation dialog

3. **Transaction Details Modal**
   - Show full transaction info
   - Edit/Delete buttons

**🤔 Critical Question:** What happens to balance when editing?

**Answer:** You must recalculate!

```typescript
// If user changes transaction amount from ₺100 → ₺150 (deposit)
// Balance should increase by ₺50

const handleEditTransaction = async (
  transactionId: number,
  oldAmount: number,
  newAmount: number,
  type: 'deposit' | 'withdraw'
) => {
  const difference = newAmount - oldAmount

  // Adjust balance
  const newBalance =
    type === 'deposit'
      ? currentBalance + difference
      : currentBalance - difference

  // Update both transaction and balance
  await updateTransaction(transactionId, newAmount)
  await updateBalance(newBalance)
}
```

**API Endpoints:**

```go
PATCH  /transactions/:id   // Update transaction
DELETE /transactions/:id   // Delete transaction
```

**UI Changes:**

```typescript
// Make transaction items tappable
<TouchableOpacity
  onPress={() => setSelectedTransaction(transaction)}
>
  <TransactionItem {...transaction} />
</TouchableOpacity>

// Transaction Details Modal
<Modal visible={!!selectedTransaction}>
  <View>
    <Text>Amount: ₺{selectedTransaction.amount}</Text>
    <Text>Category: {selectedTransaction.category}</Text>
    <Text>Date: {selectedTransaction.date}</Text>

    <Button onPress={handleEdit}>Edit</Button>
    <Button onPress={handleDelete} color="red">Delete</Button>
  </View>
</Modal>
```

**Estimated Time:** 1-2 days

**📝 Action Items:**

- [ ] Add PATCH/DELETE endpoints to backend
- [ ] Create TransactionDetailsModal component
- [ ] Implement balance recalculation logic
- [ ] Add edit form (reuse AddMoneyModal pattern)
- [ ] Add confirmation dialog for deletion
- [ ] Test edge cases (editing multiple times)

---

#### 2.4 Data Export 📄

**Why Critical:** Users want to:

- Back up their data
- Share with accountant/family
- Import to Excel for analysis
- Proves you respect their data ownership

**Features:**

1. **Export to CSV**

   - All transactions
   - Date range selection
   - Include balance snapshots

2. **Export to PDF**
   - Formatted monthly report
   - Include charts
   - Professional layout

**CSV Format:**

```csv
Date,Type,Category,Amount,Balance After
2024-11-01,deposit,income,1000.00,1000.00
2024-11-02,withdraw,food,50.00,950.00
2024-11-03,withdraw,transport,30.00,920.00
```

**Implementation:**

**CSV Export:**

```typescript
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

const exportToCSV = async (transactions: Transaction[]) => {
  // Build CSV string
  const header = 'Date,Type,Category,Amount,Balance After\n'
  const rows = transactions
    .map(t => `${t.date},${t.type},${t.category},${t.amount},${t.balanceAfter}`)
    .join('\n')

  const csv = header + rows

  // Save to file
  const fileUri = FileSystem.documentDirectory + 'kumbara_export.csv'
  await FileSystem.writeAsStringAsync(fileUri, csv)

  // Share
  await Sharing.shareAsync(fileUri)
}
```

**PDF Export:**

```bash
# Install package
npm install react-native-html-to-pdf
```

```typescript
import RNHTMLtoPDF from 'react-native-html-to-pdf'

const exportToPDF = async (summary: MonthlySummary) => {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          .header { text-align: center; color: #3B82F6; }
          .summary { background: #f0f0f0; padding: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Kumbara Monthly Report</h1>
          <p>${summary.month} ${summary.year}</p>
        </div>
        <div class="summary">
          <p>Income: ₺${summary.income}</p>
          <p>Expenses: ₺${summary.expenses}</p>
          <p>Net Savings: ₺${summary.net}</p>
        </div>
        <h2>Transactions</h2>
        <table>
          ${summary.transactions
            .map(
              t => `
            <tr>
              <td>${t.date}</td>
              <td>${t.category}</td>
              <td>₺${t.amount}</td>
            </tr>
          `
            )
            .join('')}
        </table>
      </body>
    </html>
  `

  const options = {
    html,
    fileName: 'kumbara_report',
    directory: 'Documents'
  }

  const pdf = await RNHTMLtoPDF.convert(options)
  await Sharing.shareAsync(pdf.filePath)
}
```

**UI Addition:**

```typescript
// In ReportsScreen or SettingsScreen
<TouchableOpacity onPress={handleExport}>
  <Text>Export Data</Text>
</TouchableOpacity>

// Export Modal
<Modal visible={showExportModal}>
  <Text>Export Format:</Text>
  <Button onPress={() => exportToCSV()}>CSV (Excel)</Button>
  <Button onPress={() => exportToPDF()}>PDF (Report)</Button>
</Modal>
```

**Estimated Time:** 1 day

**📝 Action Items:**

- [ ] Install export packages
- [ ] Implement CSV generation
- [ ] Implement PDF generation with styling
- [ ] Add export button to Reports screen
- [ ] Test on both Android and iOS
- [ ] Verify exported files open correctly

---

#### 2.5 Push Notifications 🔔

**Why Critical:** Your settings have notification toggles, but they don't work!

**Notification Types:**

1. **Daily Reminder** - "Time to track your spending!" (user-configured time)
2. **Goal Milestone** - "You're 50% toward your vacation goal! 🎉"
3. **Weekly Summary** - "Last week: ₺500 saved, ₺300 spent"

**Setup with Expo Notifications:**

```bash
npx expo install expo-notifications
```

**Request Permission:**

```typescript
import * as Notifications from 'expo-notifications'

const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Please enable notifications to get savings reminders')
  }
}
```

**Schedule Daily Reminder:**

```typescript
const scheduleDailyReminder = async (hour: number, minute: number) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💰 Kumbara Reminder',
      body: "Don't forget to track today's transactions!",
      data: { type: 'daily_reminder' }
    },
    trigger: {
      hour,
      minute,
      repeats: true
    }
  })
}
```

**Goal Milestone Notification:**

```typescript
// Trigger when goal reaches 25%, 50%, 75%, 100%
const checkGoalMilestone = async (goal: Goal) => {
  const progress = (goal.current_amount / goal.target_amount) * 100
  const milestones = [25, 50, 75, 100]

  if (milestones.includes(Math.floor(progress))) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${goal.emoji} Goal Progress!`,
        body: `You're ${Math.floor(progress)}% toward ${goal.name}!`,
        data: { type: 'goal_milestone', goalId: goal.goal_id }
      },
      trigger: null // Send immediately
    })
  }
}
```

**Connect to Settings:**

```typescript
// When user toggles "Daily Reminder" in Settings
const handleDailyReminderToggle = async (enabled: boolean) => {
  if (enabled) {
    await requestNotificationPermission()
    await scheduleDailyReminder(9, 0) // 9:00 AM
  } else {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  // Save preference
  dispatch({ type: 'SET_DAILY_REMINDER', enabled })
}
```

**Estimated Time:** 1-2 days

**📝 Action Items:**

- [ ] Install expo-notifications
- [ ] Request permissions on first launch
- [ ] Implement daily reminder scheduling
- [ ] Add time picker to settings
- [ ] Trigger goal milestone notifications
- [ ] Test notifications on real device
- [ ] Make settings toggles functional

---

### Phase 2: Enhanced Features (Post-Launch)

#### 2.6 Budgeting System 💰

**🎓 Teaching Point:** Budget ≠ Goal

| Feature   | Budget               | Goal                  |
| --------- | -------------------- | --------------------- |
| Purpose   | Limit spending       | Save money            |
| Timeframe | Monthly, recurring   | One-time, deadline    |
| Direction | Control expenses     | Grow savings          |
| Example   | "₺500/month on food" | "₺5,000 for vacation" |

**User Story:** "I want to limit my food spending to ₺500/month"

**Database Schema:**

```sql
CREATE TABLE budgets (
  budget_id INTEGER PRIMARY KEY,
  user_id INTEGER,
  category TEXT, -- 'food', 'transport', etc.
  monthly_limit REAL,
  current_spent REAL DEFAULT 0,
  month_year TEXT, -- '2024-11'
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

**Features:**

- Set budget per category per month
- Warning when 80% spent
- Alert when budget exceeded
- Reset automatically each month

**Estimated Time:** 3-4 days

---

#### 2.7 Recurring Transactions 🔄

**User Story:** "My rent is ₺2,000 every 1st of the month - track it automatically"

**Database Schema:**

```sql
CREATE TABLE recurring_transactions (
  recurring_id INTEGER PRIMARY KEY,
  user_id INTEGER,
  type TEXT, -- 'deposit' or 'withdraw'
  category TEXT,
  amount REAL,
  frequency TEXT, -- 'daily', 'weekly', 'monthly', 'yearly'
  next_date DATE,
  active BOOLEAN DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

**Implementation Approach:**

- Backend cron job checks every day
- Creates transaction when `next_date` is reached
- Updates `next_date` based on frequency
- Sends notification before auto-creating

**Estimated Time:** 3-4 days

---

#### 2.8-2.10 Additional Features

See plan document for:

- Advanced Charts
- Transaction Search & Filters
- Biometric & PIN Lock

**Total Phase 2 Time:** 8-10 weeks

---

### Phase 3: Advanced Features (Long-term)

- Multi-Account Support
- Bill Reminders
- AI Financial Insights
- Social Features
- Bank Integration (Plaid API)

**Total Phase 3 Time:** 12-16 weeks

---

## 3. Report & Analytics Feature (Detailed Design)

### 🎯 Vision

Transform raw transaction data into actionable insights. Users should understand:

- **Where** their money goes (category breakdown)
- **How** their spending changes (trends over time)
- **If** they're improving (month-over-month comparison)

---

### 3.1 Reports Screen Structure

**Add "Reports" Tab to Navigation:**

```typescript
// navigation/TabNavigator.tsx
<Tab.Screen
  name='Reports'
  component={ReportsScreen}
  options={{
    tabBarIcon: ({ color }) => (
      <Image source={require('@assets/chart-icon.png')} />
    )
  }}
/>
```

**Screen Layout:**

```
╔═══════════════════════════════╗
║  📊 Reports                   ║
║  [< Oct 2024 | Nov 2024 | >]  ║ ← Month Selector
╠═══════════════════════════════╣
║  ┌────────┬────────┬────────┐ ║
║  │ Income │Expenses│ Saved  │ ║ ← Summary Cards
║  │ ₺3,200 │ ₺1,500 │ ₺1,700 │ ║
║  │  +12%  │  -8%   │  +45%  │ ║ ← vs last month
║  └────────┴────────┴────────┘ ║
╠═══════════════════════════════╣
║  Category Breakdown           ║
║      ┌─────────┐              ║
║      │  🥧    │              ║ ← Pie Chart
║      └─────────┘              ║
║  Food 35% • Transport 20%     ║
║  Market 25% • Bills 15%       ║
╠═══════════════════════════════╣
║  Spending Trend (6 months)    ║
║    ₺                          ║
║  4k│     ╱╲                   ║
║  3k│   ╱    ╲   ╱╲           ║ ← Line Chart
║  2k│ ╱        ╲╱  ╲          ║
║  1k│────────────────────      ║
║     Jun Jul Aug Sep Oct Nov   ║
╠═══════════════════════════════╣
║  Top Transactions             ║
║  Largest Expense:             ║
║  • Bills - ₺500               ║
║  • Market - ₺300              ║
║  Largest Income:              ║
║  • Salary - ₺3,000            ║
╠═══════════════════════════════╣
║  [Export Report] button       ║
╚═══════════════════════════════╝
```

---

### 3.2 Summary Cards Implementation

**Component: SummaryCard.tsx**

```typescript
interface SummaryCardProps {
  title: string
  amount: number
  currency: string
  changePercent: number // vs last period
  type: 'income' | 'expense' | 'savings'
}

const SummaryCard = ({
  title,
  amount,
  currency,
  changePercent,
  type
}: SummaryCardProps) => {
  const { width, height } = useWindowDimensions()
  const [theme] = useTheme()
  const styles = createSummaryCardStyles(theme, width, height)

  const colorMap = {
    income: accentColors.success,
    expense: accentColors.warning,
    savings: accentColors.primary
  }

  const isPositive = type === 'income' ? changePercent > 0 : changePercent < 0 // For expenses, decrease is good!

  return (
    <View style={[styles.card, { borderLeftColor: colorMap[type] }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>
        {currency}
        {amount.toLocaleString()}
      </Text>
      <View style={styles.changeRow}>
        <Text
          style={[
            styles.change,
            { color: isPositive ? accentColors.success : accentColors.warning }
          ]}
        >
          {changePercent > 0 ? '+' : ''}
          {changePercent.toFixed(1)}%
        </Text>
        <Text style={styles.changeLabel}>vs last month</Text>
      </View>
    </View>
  )
}
```

**Data Fetching:**

```typescript
// api/reports.ts
export const getMonthlySummary = async (
  token: string,
  period: string // '2024-11'
): Promise<MonthlySummary> => {
  const response = await axios.get(`${BASE_URL}/reports/summary`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { period }
  })
  return response.data
}

// Response shape:
interface MonthlySummary {
  period: string
  total_income: number
  total_expenses: number
  net_savings: number
  transaction_count: number
  income_change_percent: number
  expense_change_percent: number
  savings_change_percent: number
}
```

**Backend Endpoint:**

```go
// GET /reports/summary?period=2024-11
func handleGetSummary(w http.ResponseWriter, r *http.Request) {
    userID := r.Context().Value("user_id").(int)
    period := r.URL.Query().Get("period") // "2024-11"

    // Current month
    var totalIncome, totalExpenses float64
    err := db.QueryRow(`
        SELECT
            COALESCE(SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END), 0) as income,
            COALESCE(SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END), 0) as expenses
        FROM transactions
        WHERE user_id = ? AND strftime('%Y-%m', date) = ?
    `, userID, period).Scan(&totalIncome, &totalExpenses)

    // Previous month
    // ... similar query with strftime('%Y-%m', date, '-1 month')

    // Calculate change percentages
    incomeChange := ((totalIncome - prevIncome) / prevIncome) * 100

    json.NewEncoder(w).Encode(MonthlySummary{
        Period: period,
        TotalIncome: totalIncome,
        TotalExpenses: totalExpenses,
        NetSavings: totalIncome - totalExpenses,
        IncomeChangePercent: incomeChange,
        // ...
    })
}
```

---

### 3.3 Category Breakdown Chart

**Library Choice:** Victory Native or react-native-chart-kit

**Installation:**

```bash
npm install victory-native
# Victory Native is built on top of React Native SVG
npx expo install react-native-svg
```

**Component:**

```typescript
import { VictoryPie, VictoryLegend } from 'victory-native'

interface CategoryData {
  category: string
  amount: number
  percentage: number
  color: string
}

const CategoryPieChart = ({ data }: { data: CategoryData[] }) => {
  return (
    <View>
      <VictoryPie
        data={data}
        x='category'
        y='amount'
        colorScale={data.map(d => d.color)}
        labels={({ datum }) => `${datum.percentage}%`}
        labelRadius={({ innerRadius }) => innerRadius + 30}
        style={{
          labels: { fill: 'white', fontSize: 14, fontWeight: 'bold' }
        }}
        innerRadius={60} // Donut chart
      />

      <VictoryLegend
        x={20}
        y={250}
        orientation='horizontal'
        gutter={20}
        data={data.map(d => ({
          name: `${d.category} ${d.percentage}%`,
          symbol: { fill: d.color }
        }))}
      />
    </View>
  )
}
```

**Data Processing:**

```typescript
const processCategoryData = (
  breakdown: CategoryBreakdown[]
): CategoryData[] => {
  const categoryColors = {
    food: '#EF4444',
    market: '#F59E0B',
    transport: '#3B82F6',
    bills: '#8B5CF6',
    other: '#6B7280'
  }

  const total = breakdown.reduce((sum, cat) => sum + cat.amount, 0)

  return breakdown.map(cat => ({
    category: cat.category,
    amount: cat.amount,
    percentage: (cat.amount / total) * 100,
    color: categoryColors[cat.category] || '#6B7280'
  }))
}
```

**Backend Endpoint:**

```go
// GET /reports/category-breakdown?period=2024-11
func handleCategoryBreakdown(w http.ResponseWriter, r *http.Request) {
    userID := r.Context().Value("user_id").(int)
    period := r.URL.Query().Get("period")

    rows, err := db.Query(`
        SELECT category, SUM(amount) as total
        FROM transactions
        WHERE user_id = ?
          AND type = 'withdraw'
          AND strftime('%Y-%m', date) = ?
        GROUP BY category
        ORDER BY total DESC
    `, userID, period)

    // Return array of {category, amount}
}
```

---

### 3.4 Spending Trend Chart

**Chart Type:** Line chart showing income vs expenses over 6 months

**Component:**

```typescript
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLegend
} from 'victory-native'

const SpendingTrendChart = ({ data }: { data: MonthlyTrend[] }) => {
  return (
    <VictoryChart>
      <VictoryAxis
        tickFormat={month => month.substring(5, 7)} // "2024-11" → "11"
        style={{ tickLabels: { fontSize: 12 } }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={value => `₺${value / 1000}k`}
        style={{ tickLabels: { fontSize: 12 } }}
      />

      {/* Income Line */}
      <VictoryLine
        data={data}
        x='month'
        y='income'
        style={{ data: { stroke: '#10B981', strokeWidth: 3 } }}
      />

      {/* Expense Line */}
      <VictoryLine
        data={data}
        x='month'
        y='expenses'
        style={{ data: { stroke: '#EF4444', strokeWidth: 3 } }}
      />

      <VictoryLegend
        x={20}
        y={10}
        orientation='horizontal'
        data={[
          { name: 'Income', symbol: { fill: '#10B981' } },
          { name: 'Expenses', symbol: { fill: '#EF4444' } }
        ]}
      />
    </VictoryChart>
  )
}
```

**Backend Endpoint:**

```go
// GET /reports/trend?months=6
func handleSpendingTrend(w http.ResponseWriter, r *http.Request) {
    userID := r.Context().Value("user_id").(int)
    months := r.URL.Query().Get("months") // "6"

    rows, err := db.Query(`
        SELECT
            strftime('%Y-%m', date) as month,
            SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END) as expenses
        FROM transactions
        WHERE user_id = ?
          AND date >= date('now', '-' || ? || ' months')
        GROUP BY month
        ORDER BY month
    `, userID, months)

    // Return array of {month, income, expenses}
}
```

---

### 3.5 Top Transactions List

**Component:**

```typescript
const TopTransactionsList = ({
  topExpenses,
  topIncomes
}: {
  topExpenses: Transaction[]
  topIncomes: Transaction[]
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Largest Expenses</Text>
      {topExpenses.map(t => (
        <View key={t.id} style={styles.item}>
          <Text>
            {getCategoryEmoji(t.category)} {t.category}
          </Text>
          <Text style={styles.amount}>-₺{t.amount}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Largest Incomes</Text>
      {topIncomes.map(t => (
        <View key={t.id} style={styles.item}>
          <Text>💰 {t.category}</Text>
          <Text style={styles.amount}>+₺{t.amount}</Text>
        </View>
      ))}
    </View>
  )
}
```

---

### 3.6 Export Functionality

**Export Modal:**

```typescript
const ExportModal = ({ visible, onClose, period }: ExportModalProps) => {
  const [exporting, setExporting] = useState(false)

  const handleExportCSV = async () => {
    setExporting(true)
    const transactions = await getTransactions(period)
    await exportToCSV(transactions)
    setExporting(false)
    onClose()
  }

  const handleExportPDF = async () => {
    setExporting(true)
    const summary = await getMonthlySummary(period)
    const breakdown = await getCategoryBreakdown(period)
    await exportToPDF(summary, breakdown)
    setExporting(false)
    onClose()
  }

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modal}>
        <Text style={styles.title}>Export Report</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={handleExportCSV}
          disabled={exporting}
        >
          <Text>📊 Export as CSV</Text>
          <Text style={styles.subtitle}>For Excel/Google Sheets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={handleExportPDF}
          disabled={exporting}
        >
          <Text>📄 Export as PDF</Text>
          <Text style={styles.subtitle}>Formatted monthly report</Text>
        </TouchableOpacity>

        {exporting && <ActivityIndicator />}

        <Button onPress={onClose}>Cancel</Button>
      </View>
    </Modal>
  )
}
```

**CSV Format:**

```csv
Kumbara Transaction Export
Period: November 2024
Generated: 2024-11-30

Date,Time,Type,Category,Amount,Balance After,Notes
2024-11-01,09:30,deposit,income,3000.00,3000.00,Monthly salary
2024-11-02,12:15,withdraw,food,50.00,2950.00,Lunch
2024-11-03,18:00,withdraw,market,200.00,2750.00,Weekly groceries
```

**PDF Template (HTML):**

```html
<html>
  <head>
    <style>
      body {
        font-family: 'Helvetica', Arial, sans-serif;
        padding: 40px;
        color: #1f2937;
      }
      .header {
        text-align: center;
        margin-bottom: 40px;
        border-bottom: 3px solid #3b82f6;
        padding-bottom: 20px;
      }
      .logo {
        font-size: 48px;
        font-weight: bold;
        color: #3b82f6;
      }
      .summary-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        margin: 30px 0;
      }
      .summary-card {
        background: #f3f4f6;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid;
      }
      .summary-card.income {
        border-left-color: #10b981;
      }
      .summary-card.expense {
        border-left-color: #ef4444;
      }
      .summary-card.savings {
        border-left-color: #3b82f6;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
      }
      th {
        background: #1f2937;
        color: white;
        padding: 12px;
        text-align: left;
      }
      td {
        padding: 10px;
        border-bottom: 1px solid #e5e7eb;
      }
      .footer {
        margin-top: 60px;
        text-align: center;
        color: #6b7280;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="logo">Kumbara</div>
      <h2>Monthly Financial Report</h2>
      <p>November 2024</p>
    </div>

    <div class="summary-grid">
      <div class="summary-card income">
        <h3>Total Income</h3>
        <p style="font-size: 32px; font-weight: bold;">₺3,200</p>
        <p style="color: #10B981;">+12% vs last month</p>
      </div>
      <div class="summary-card expense">
        <h3>Total Expenses</h3>
        <p style="font-size: 32px; font-weight: bold;">₺1,500</p>
        <p style="color: #10B981;">-8% vs last month</p>
      </div>
      <div class="summary-card savings">
        <h3>Net Savings</h3>
        <p style="font-size: 32px; font-weight: bold;">₺1,700</p>
        <p style="color: #10B981;">+45% vs last month</p>
      </div>
    </div>

    <h2>Category Breakdown</h2>
    <table>
      <tr>
        <th>Category</th>
        <th>Amount</th>
        <th>Percentage</th>
      </tr>
      <tr>
        <td>🍔 Food</td>
        <td>₺525</td>
        <td>35%</td>
      </tr>
      <!-- More rows... -->
    </table>

    <div class="footer">
      <p>Generated by Kumbara on ${new Date().toLocaleDateString()}</p>
      <p>Your savings, simplified.</p>
    </div>
  </body>
</html>
```

---

### 3.7 Complete File Structure

```
screens/reports/
├── ReportsScreen.tsx              # Main screen
├── styles/
│   └── ReportsScreen.styles.ts
└── components/
    ├── SummaryCard.tsx            # Income/Expense/Savings cards
    ├── CategoryPieChart.tsx       # Pie chart component
    ├── SpendingTrendChart.tsx     # Line chart component
    ├── TopTransactionsList.tsx    # Top 5 lists
    ├── ExportModal.tsx            # Export options modal
    └── PeriodSelector.tsx         # Month/year picker

api/
└── reports.ts                     # API functions
    ├── getMonthlySummary()
    ├── getCategoryBreakdown()
    ├── getSpendingTrend()
    └── getTopTransactions()

utils/
└── exportHelpers.ts               # CSV/PDF generation
    ├── exportToCSV()
    └── exportToPDF()
```

**Estimated Time: 5-7 days**

- Backend endpoints: 1 day
- Summary cards: 1 day
- Charts (pie + line): 2 days
- Export functionality: 1 day
- Polish & testing: 1 day

**📝 Action Items:**

- [ ] Install Victory Native and react-native-svg
- [ ] Create backend /reports endpoints
- [ ] Build ReportsScreen layout
- [ ] Implement SummaryCard component
- [ ] Add pie chart with real data
- [ ] Add line chart for trends
- [ ] Implement CSV export
- [ ] Implement PDF export with styling
- [ ] Add period selector (month picker)
- [ ] Test all charts with different data volumes
- [ ] Add empty state ("Not enough data yet")

---

## 4. Design Enhancements

### 4.1 Alternative Color Schemes

**Current: Fintech Blue**

- Primary: `#3B82F6` (Blue 500)
- Success: `#10B981` (Emerald 500)
- Warning: `#F59E0B` (Amber 500)
- **Vibe:** Trustworthy, professional, tech-forward
- **Best for:** Users who want traditional banking feel

---

**Alternative 1: Mint Green (Growth)**

```typescript
export const mintGreenScheme = {
  primary: '#10B981', // Emerald 500
  secondary: '#14B8A6', // Teal 500
  accent: '#06B6D4', // Cyan 500
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Gradients
  primaryGradient: ['#10B981', '#14B8A6'],
  heroGradient: ['#6EE7B7', '#3B82F6']
}
```

**Visual Preview:**

```
┌─────────────────┐
│ ░░░░░░░░░░░░░░ │ ← Emerald gradient
│ Balance: ₺5,000 │
│ ░░░░░░░░░░░░░░ │
└─────────────────┘
```

- **Psychology:** Green = growth, freshness, prosperity
- **Best for:** Users focused on saving and growing wealth
- **Mood:** Optimistic, nature-inspired, calming

---

**Alternative 2: Purple Premium (Sophistication)**

```typescript
export const purplePremiumScheme = {
  primary: '#8B5CF6', // Violet 500
  secondary: '#A78BFA', // Violet 400
  accent: '#EC4899', // Pink 500
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Gradients
  primaryGradient: ['#8B5CF6', '#EC4899'],
  heroGradient: ['#A78BFA', '#8B5CF6']
}
```

- **Psychology:** Purple = luxury, wisdom, creativity
- **Best for:** Users who want a premium, unique app
- **Mood:** Sophisticated, modern, distinctive
- **Note:** Less common in finance apps = stands out

---

**Alternative 3: Sunset Gradient (Energy)**

```typescript
export const sunsetScheme = {
  primary: '#F59E0B', // Amber 500
  secondary: '#EF4444', // Red 500
  accent: '#FB923C', // Orange 400
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Gradients
  primaryGradient: ['#F59E0B', '#EF4444'],
  heroGradient: ['#FCD34D', '#F59E0B']
}
```

- **Psychology:** Warm colors = energy, motivation, passion
- **Best for:** Users who need motivation to save
- **Mood:** Energetic, warm, inspiring
- **Caution:** Red can signal danger - use carefully

---

**Implementation:**

```typescript
// constants/colorSchemes.ts
export const colorSchemes = {
  fintechBlue: { /* current colors */ },
  mintGreen: { /* ... */ },
  purplePremium: { /* ... */ },
  sunset: { /* ... */ }
};

// Add to Settings
<View style={styles.settingGroup}>
  <Text style={styles.groupTitle}>Appearance</Text>

  <TouchableOpacity onPress={() => setShowColorPicker(true)}>
    <Text>Color Scheme</Text>
    <View style={[styles.colorPreview, { backgroundColor: theme.primary }]} />
  </TouchableOpacity>
</View>

// Color Picker Modal
<Modal visible={showColorPicker}>
  {Object.entries(colorSchemes).map(([name, scheme]) => (
    <TouchableOpacity
      key={name}
      onPress={() => applyColorScheme(scheme)}
    >
      <Text>{name}</Text>
      <View style={styles.gradientPreview}>
        {/* Show gradient preview */}
      </View>
    </TouchableOpacity>
  ))}
</Modal>
```

**🎨 User Research Activity:**

1. Create mockups in all 4 schemes
2. Show to 10-15 potential users
3. Ask: "Which makes you most excited to save money?"
4. Track preferences by age/gender
5. Consider allowing user choice!

---

### 4.2 Onboarding Flow

**Problem:** Users open app → immediately see Google Sign-In → confusing!

**Solution:** 3-screen onboarding that educates and excites

#### Screen 1: Welcome

```
┌─────────────────────────────┐
│                             │
│         🏦 Kumbara          │
│                             │
│   Smart Savings Made Simple │
│                             │
│  [Animated coin jar filling]│
│                             │
│     [Get Started] button    │
│                             │
│         Skip ────────>      │
└─────────────────────────────┘
```

**Animation:** Coins dropping into jar, filling from empty to full (3 seconds)

---

#### Screen 2: Features

```
┌─────────────────────────────┐
│  What You'll Love            │
│                             │
│  📊 Track Every Lira        │
│  See exactly where          │
│  your money goes            │
│                             │
│  🎯 Set Savings Goals       │
│  Stay motivated with        │
│  progress tracking          │
│                             │
│  📈 Visualize Progress      │
│  Beautiful charts and       │
│  insights                   │
│                             │
│  ● ● ○   [Next]  [Skip]     │
└─────────────────────────────┘
```

**Swipeable:** Users can swipe between 3 feature highlights

---

#### Screen 3: Setup

```
┌─────────────────────────────┐
│  Quick Setup                 │
│                             │
│  Choose Your Currency        │
│  ┌────┬────┬────┐           │
│  │ ₺  │ $  │ €  │           │
│  └────┴────┴────┘           │
│                             │
│  Enable Notifications?       │
│  Get daily savings reminders │
│  [✓] Yes, keep me motivated  │
│                             │
│  [Let's Go!] button         │
│                             │
│  You can change these later  │
└─────────────────────────────┘
```

---

**Implementation:**

```bash
# Install onboarding library (optional)
npm install react-native-onboarding-swiper
```

```typescript
// screens/OnboardingScreen.tsx
import Onboarding from 'react-native-onboarding-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OnboardingScreen = ({ navigation }) => {
  const completeOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true')
    navigation.replace('Auth')
  }

  return (
    <Onboarding
      onDone={completeOnboarding}
      onSkip={completeOnboarding}
      pages={[
        {
          backgroundColor: '#3B82F6',
          image: <LottieAnimation source={require('@assets/coin-jar.json')} />,
          title: 'Kumbara',
          subtitle: 'Smart Savings Made Simple'
        },
        {
          backgroundColor: '#10B981',
          image: (
            <Image source={require('@assets/features-illustration.png')} />
          ),
          title: 'Track, Save, Succeed',
          subtitle: 'Everything you need to reach your financial goals'
        },
        {
          backgroundColor: '#8B5CF6',
          image: <SetupForm />,
          title: 'Quick Setup',
          subtitle: 'Personalize your experience'
        }
      ]}
    />
  )
}

// App.tsx - Check if onboarding seen
const checkOnboarding = async () => {
  const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding')
  return hasSeenOnboarding === 'true'
}
```

**Estimated Time:** 1 day

---

### 4.3 Empty States

**Current Problem:** Blank screens when no data

**Design Pattern:**

```
     ┌──────────────────┐
     │                  │
     │     📊 Icon      │  ← Large, friendly icon
     │                  │
     │  No data yet!    │  ← Clear message
     │                  │
     │  [+ Add First]   │  ← Clear action
     │                  │
     └──────────────────┘
```

**Implementation:**

```typescript
// components/EmptyState.tsx
interface EmptyStateProps {
  icon: string // emoji
  title: string
  message: string
  actionText: string
  onAction: () => void
}

const EmptyState = ({
  icon,
  title,
  message,
  actionText,
  onAction
}: EmptyStateProps) => {
  const { width, height } = useWindowDimensions()
  const [theme] = useTheme()
  const styles = createEmptyStateStyles(theme, width, height)

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onAction}>
        <Text style={styles.buttonText}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  )
}

// Usage in TransactionHistory
{
  transactions.length === 0 ? (
    <EmptyState
      icon='💰'
      title='No transactions yet'
      message='Start your savings journey! Add your first deposit to see it here.'
      actionText='Add Money'
      onAction={() => setAddMoneyModalVisible(true)}
    />
  ) : (
    <TransactionList transactions={transactions} />
  )
}
```

**Empty States to Add:**

1. **Home Screen - No Transactions**

   - Icon: 💰
   - Message: "Start your savings journey!"
   - Action: "Add First Deposit"

2. **Goals Screen - No Goals**

   - Icon: 🎯
   - Message: "Create your first savings goal!"
   - Action: "Create Goal"

3. **Reports Screen - Insufficient Data**

   - Icon: 📊
   - Message: "Not enough data to generate insights. Add more transactions!"
   - Action: "Add Transaction"

4. **Notifications Screen - No Notifications**
   - Icon: 🔔
   - Message: "No notifications yet. We'll notify you about your savings progress!"
   - Action: "Enable Notifications"

**Estimated Time:** Half day

---

### 4.4 Loading States

**Current:** Simple `<ActivityIndicator />` or nothing

**Better UX:** Skeleton screens (content placeholders)

**Install:**

```bash
npm install react-native-skeleton-content
```

**Implementation:**

```typescript
import SkeletonContent from 'react-native-skeleton-content';

// Skeleton for BalanceCard
<SkeletonContent
  containerStyle={styles.balanceCard}
  isLoading={loading}
  layout={[
    { key: 'balance', width: 200, height: 40, marginBottom: 12 },
    { key: 'label', width: 100, height: 20 },
  ]}
>
  <BalanceCard balance={balance} />
</SkeletonContent>

// Skeleton for Transaction List
<SkeletonContent
  containerStyle={styles.list}
  isLoading={loading}
  layout={Array.from({ length: 5 }).map((_, i) => ({
    key: `transaction-${i}`,
    width: '100%',
    height: 60,
    marginBottom: 12,
  }))}
>
  <TransactionList transactions={transactions} />
</SkeletonContent>
```

**Shimmer Effect:**

```typescript
// Add shimmer animation
<SkeletonContent
  isLoading={loading}
  animationType="shiver" // or "pulse"
  boneColor="#E1E9EE"
  highlightColor="#F2F8FC"
  // ...
>
```

**Estimated Time:** 1 day

---

### 4.5 Error Handling Improvements

**Current:** Alert dialogs for errors

**Problems with Alerts:**

- Interrupt user flow
- Can't be easily dismissed
- Not visually integrated
- No retry option

**Better Approach: Toast Notifications + Inline Errors**

**Install:**

```bash
npm install react-native-toast-message
```

**Setup:**

```typescript
// App.tsx
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <>
      {/* Your app content */}
      <Toast />
    </>
  )
}
```

**Usage:**

```typescript
// Replace Alert.alert() with Toast.show()

// Success
Toast.show({
  type: 'success',
  text1: 'Money Added!',
  text2: '₺100 has been added to your balance',
  visibilityTime: 3000,
  position: 'top'
})

// Error
Toast.show({
  type: 'error',
  text1: 'Connection Failed',
  text2: 'Could not reach server. Check your internet.',
  visibilityTime: 4000,
  position: 'top'
})

// Info
Toast.show({
  type: 'info',
  text1: 'Tip',
  text2: 'Set a savings goal to stay motivated!'
})
```

**Inline Error State:**

```typescript
const [error, setError] = useState<string | null>(null)

return (
  <View>
    {error && (
      <View style={styles.errorBanner}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => setError(null)}>
          <Text style={styles.dismiss}>✕</Text>
        </TouchableOpacity>
      </View>
    )}

    {/* Rest of screen */}
  </View>
)
```

**Retry Button Pattern:**

```typescript
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const fetchData = async () => {
  try {
    setLoading(true)
    setError(null)
    const data = await getBalance()
    // ...
  } catch (err) {
    setError('Failed to load balance')
  } finally {
    setLoading(false)
  }
}

return (
  <View>
    {error ? (
      <View style={styles.errorState}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text>Try Again</Text>
        </TouchableOpacity>
      </View>
    ) : loading ? (
      <ActivityIndicator />
    ) : (
      <Content />
    )}
  </View>
)
```

**Network Status Indicator:**

```typescript
import NetInfo from '@react-native-community/netinfo'

const NetworkBanner = () => {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected)
    })

    return unsubscribe
  }, [])

  if (!isOffline) return null

  return (
    <View style={styles.offlineBanner}>
      <Text style={styles.offlineText}>📡 No internet connection</Text>
    </View>
  )
}

// Add to App.tsx
;<NetworkBanner />
```

**Estimated Time:** 1 day

**📝 Action Items:**

- [ ] Replace all Alert.alert() with Toast
- [ ] Add inline error states to all data fetching
- [ ] Implement retry buttons
- [ ] Add network status indicator
- [ ] Test offline behavior

---

## 5. Android Publication Process

### 📱 Overview

**Steps:**

1. Prepare assets and content
2. Configure build settings
3. Generate release build (AAB)
4. Create Play Console account
5. Fill app listing
6. Submit for review
7. Wait 2-7 days
8. LAUNCH! 🚀

**Budget: $25** (one-time Google Play Developer account fee)

---

### 5.1 Prerequisites Checklist

- [ ] **Google Play Developer Account** ($25)
- [ ] **Privacy Policy** (hosted URL)
- [ ] **App Icon** (512x512 PNG, no transparency)
- [ ] **Feature Graphic** (1024x500 PNG)
- [ ] **Screenshots** (at least 2, max 8, 16:9 ratio)
- [ ] **Short Description** (max 80 characters)
- [ ] **Full Description** (max 4000 characters)
- [ ] **App Category** (Finance)
- [ ] **Contact Email**
- [ ] **Target API Level** (34+ for Android 14)

---

### 5.2 Create Assets

#### App Icon (512x512)

**Requirements:**

- 512 x 512 pixels
- 32-bit PNG
- No transparency
- Should look good at small sizes

**Design Tips:**

- Simple, recognizable shape
- One focal point
- High contrast
- Test on different backgrounds

**Tools:**

- Figma (free)
- Canva (easy templates)
- Adobe Illustrator (professional)

**Example Design:**

```
┌─────────┐
│         │
│   🏦    │  ← Your logo/icon
│  Kumbara │
│         │
└─────────┘
```

---

#### Feature Graphic (1024x500)

**Purpose:** Header banner in Play Store listing

**Design:**

```
┌────────────────────────────────────────┐
│  💰          Kumbara          📊       │
│                                        │
│    Smart Savings Made Simple           │
└────────────────────────────────────────┘
```

**Tips:**

- Use brand colors
- Include app name
- Show key benefit
- Avoid text on edges (may be cropped)

---

#### Screenshots

**Requirements:**

- 16:9 aspect ratio
- JPEG or 24-bit PNG
- Minimum 320px side
- Maximum 3840px side
- At least 2 required

**Best Practice:** 4-8 screenshots showing:

1. Home screen with balance
2. Add money flow
3. Transaction history
4. Savings goals (if implemented)
5. Reports/analytics (if implemented)
6. Settings screen

**Pro Tip:** Add marketing text overlay

```
┌─────────────────────┐
│   [Screenshot]      │
│                     │
│  "Track Every Lira" │  ← Text overlay
│  💰                 │
└─────────────────────┘
```

**Tools for Marketing Overlay:**

- [Previewed.app](https://previewed.app) - Device frames
- [Mockuphone.com](https://mockuphone.com) - Free mockups
- Figma - Custom designs

---

### 5.3 Build Configuration

#### Update `app.json`:

```json
{
  "expo": {
    "name": "Kumbara",
    "slug": "kumbara",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#3B82F6"
    },
    "android": {
      "package": "com.tunahanyelmer.kumbara",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": ["INTERNET", "ACCESS_NETWORK_STATE"],
      "googleServicesFile": "./google-services.json",
      "playStoreUrl": "https://play.google.com/store/apps/details?id=com.tunahanyelmer.kumbara"
    }
  }
}
```

**Important:**

- `versionCode` must increment with each release (1, 2, 3...)
- `version` is user-facing ("1.0.0", "1.0.1", "1.1.0")
- `package` is permanent - can't change after first upload!

---

#### Update `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleDebug"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./service-account.json",
        "track": "internal"
      }
    }
  }
}
```

---

### 5.4 Generate Release Build

**Step 1: Install EAS CLI** (if not already)

```bash
npm install -g eas-cli
```

**Step 2: Login**

```bash
eas login
```

**Step 3: Configure Project**

```bash
eas build:configure
```

**Step 4: Build for Production**

```bash
eas build --platform android --profile production
```

**What happens:**

1. Code is uploaded to Expo servers
2. Build environment is prepared
3. Android App Bundle (AAB) is generated
4. Build completes in 10-20 minutes
5. You get download link

**Step 5: Download AAB**

- EAS provides download link
- Save the `.aab` file
- This is what you'll upload to Play Console

**🤔 APK vs AAB:**

| Format  | Size    | What                                       |
| ------- | ------- | ------------------------------------------ |
| **AAB** | Smaller | Google optimizes per-device (recommended!) |
| **APK** | Larger  | Universal, works on all devices            |

**Recommendation:** Use AAB for Play Store, APK for testing

---

### 5.5 Google Play Console Setup

#### Create Developer Account

1. Go to [play.google.com/console](https://play.google.com/console/signup)
2. Pay $25 registration fee (one-time)
3. Verify email
4. Complete identity verification
5. Accept Developer Distribution Agreement

**Time:** 24-48 hours for account approval

---

#### Create App

1. Click "Create app"
2. Fill in:
   - **App name:** Kumbara
   - **Default language:** Turkish (or English)
   - **App or Game:** App
   - **Free or Paid:** Free
3. Accept declarations
4. Click "Create app"

---

#### Complete App Content

**Dashboard → Policy → App Content**

1. **Privacy Policy**

   - Enter your privacy policy URL
   - Must be publicly accessible
   - Example: `https://tunahanyelmer.github.io/kumbara-privacy`

2. **App Access**

   - Select "All functionality is available without special access"
   - If you had login-only features, you'd provide test credentials here

3. **Ads**

   - "No, my app does not contain ads"

4. **Content Rating**

   - Click "Start questionnaire"
   - Select "Finance"
   - Answer questions honestly:
     - User interaction? No
     - Personal info shared? Yes (for authentication)
     - Location sharing? No
   - Get rating (likely PEGI 3, ESRB Everyone)

5. **Target Audience**

   - Select age groups: 18+
   - Why? Financial apps typically for adults

6. **News App**

   - "No, my app is not a news app"

7. **COVID-19 Contact Tracing**

   - "No"

8. **Data Safety**
   - This is CRITICAL - see detailed section below

---

#### Data Safety Form (CRITICAL!)

**Google requires you to disclose:**

- What data you collect
- How it's used
- If it's shared with third parties

**For Kumbara:**

**Data Collected:**

1. **Personal Info**

   - Email address (from Google OAuth)
   - Name (from Google OAuth)
   - Photo (from Google OAuth)
   - **Purpose:** Account creation, personalization
   - **Shared:** No
   - **Optional:** No (required for login)

2. **Financial Info**
   - Account balance
   - Transaction history
   - Savings goals
   - **Purpose:** App functionality
   - **Shared:** No
   - **Optional:** No (core feature)

**Data Security:**

- ✅ Data is encrypted in transit (HTTPS)
- ✅ Users can request deletion
- ✅ Data is not sold to third parties
- ✅ Compliance with Play Family Policy

**Example Form Answers:**

```
Q: Does your app collect or share user data?
A: Yes

Q: Is all data collected encrypted in transit?
A: Yes

Q: Do you provide a way for users to request data deletion?
A: Yes (provide email: support@kumbara.app)

Q: Is data shared with third parties?
A: No

Q: Can users opt out of data collection?
A: No (required for app functionality)
```

---

### 5.6 Store Listing

**Dashboard → Main Store Listing**

#### App Details

**App Name:**

```
Kumbara - Savings Tracker
```

(Can include keyword for SEO)

**Short Description** (80 chars):

```
Track savings, set goals, visualize progress. Simple and secure. 💰
```

**Full Description** (4000 chars):

```
📊 TRACK YOUR SAVINGS EFFORTLESSLY

Kumbara (Turkish for "piggy bank") is a simple yet powerful savings tracker that helps you:

✅ Track every lira you save
✅ Set and achieve savings goals
✅ Visualize your progress with beautiful charts
✅ Export your financial data anytime

🎯 KEY FEATURES

• Simple Balance Tracking
  Add deposits and withdrawals in seconds. See your balance update in real-time.

• Savings Goals
  Set targets for vacation, emergency fund, or any goal. Track progress with visual bars.

• Category-Based Spending
  Categorize expenses: Food, Transport, Bills, Market, Other. See where money goes.

• Beautiful Reports & Analytics
  Monthly summaries, category breakdowns, spending trends. Gain insights to save more.

• Secure Authentication
  Sign in with Google. Your data is encrypted and private.

• Dark Mode
  Beautiful interface in light or dark theme. Easy on the eyes, day or night.

• Multi-Currency Support
  Choose Turkish Lira (₺), US Dollar ($), or Euro (€).

📈 WHY KUMBARA?

Unlike complex budgeting apps, Kumbara focuses on what matters: helping you save. No bank account linking required. Your data stays private. Simple, secure, effective.

🔒 PRIVACY & SECURITY

• Your data is encrypted in transit and at rest
• We never sell your data to third parties
• You can export or delete your data anytime
• Compliant with GDPR and privacy regulations

💡 PERFECT FOR

• First-time savers looking for a simple tool
• Students tracking allowance or part-time income
• Anyone wanting to save for a specific goal
• People who want financial insights without complexity

📱 BEAUTIFUL DESIGN

Kumbara features a modern, professional interface inspired by leading fintech apps like Revolut, N26, and Monzo. Every screen is crafted for clarity and ease of use.

🆓 COMPLETELY FREE

No ads, no subscriptions, no hidden fees. Kumbara is free now and forever.

---

Start your savings journey today! Download Kumbara and take control of your financial future. 💰

Questions or feedback? Email us at support@kumbara.app

Follow us on Instagram: @kumbaraapp
```

**Tips:**

- Use emojis for visual appeal
- Highlight benefits, not just features
- Include keywords naturally (savings, tracker, budget, goals)
- Address user concerns (privacy, complexity)
- End with clear call-to-action

---

#### Graphics

1. **App Icon** (512x512) - Upload the icon you created
2. **Feature Graphic** (1024x500) - Header banner
3. **Phone Screenshots** - Upload 4-8 screenshots
4. **7-inch Tablet Screenshots** (optional but recommended)
5. **10-inch Tablet Screenshots** (optional)
6. **Promotional Video** (optional, YouTube link)

---

#### Categorization

- **App Category:** Finance
- **Tags:** savings, money, budget, tracker, goals

---

#### Contact Details

- **Email:** your.email@example.com
- **Website:** (optional) https://kumbara.app
- **Phone:** (optional)

---

#### Store Presence

- **Countries:** Select countries where you want app available
  - Start with Turkey, then expand globally
  - Or select "All countries"

---

### 5.7 Release Track

**Dashboard → Release → Production → Create new release**

**Upload AAB:**

1. Click "Upload"
2. Select the `.aab` file from EAS build
3. Wait for upload and processing

**Release Name:**

```
1.0.0 - Initial Release
```

**Release Notes** (Turkish if targeting Turkey, English for global):

```
🎉 Welcome to Kumbara!

✨ Features in this release:
• Track your savings with an intuitive balance display
• Add deposits and track withdrawals by category
• View transaction history with filters
• Set multiple savings goals
• Beautiful reports with charts and insights
• Export your data to CSV or PDF
• Secure Google Sign-In
• Dark mode for comfortable viewing
• Multi-currency support (₺, $, €)

We're excited to help you achieve your savings goals! 💰

Questions? Email us at support@kumbara.app
```

**Roll-out Percentage:**

- Start with 100% (full release)
- Or start with 10% for staged rollout (safer)

---

### 5.8 Submit for Review

**Final Checklist:**

- [✓] App content form completed
- [✓] Data safety form filled
- [✓] Store listing complete with all assets
- [✓] AAB uploaded
- [✓] Release notes written
- [✓] Privacy policy accessible

**Click "Review Release" → "Start Rollout to Production"**

---

### 5.9 Review Process

**Timeline:** 2-7 days (usually 3-4 days)

**Status Updates:**

1. **Pending Publication** - Submitted, in queue
2. **Under Review** - Google is reviewing
3. **Approved** - Passed review!
4. **Published** - Live on Play Store! 🎉

**Common Rejection Reasons:**

1. **Missing Privacy Policy**

   - ❌ URL not accessible
   - ✅ Fix: Host on GitHub Pages or simple website

2. **Misleading Description**

   - ❌ Claims not supported by app
   - ✅ Fix: Be honest about features

3. **Data Safety Form Incomplete**

   - ❌ Didn't disclose all data collection
   - ✅ Fix: Be thorough and transparent

4. **Crashes on Launch**

   - ❌ App doesn't open
   - ✅ Fix: Test on multiple devices, check logs

5. **Permissions Not Explained**
   - ❌ Requesting permissions without reason
   - ✅ Fix: Explain why (e.g., "Internet for data sync")

**If Rejected:**

1. Read rejection email carefully
2. Fix issues
3. Upload new AAB with incremented `versionCode`
4. Resubmit

---

### 5.10 Post-Launch

**Monitor:**

- **Crashes:** Dashboard → Android Vitals → Crashes
- **ANRs** (App Not Responding): Dashboard → Android Vitals
- **Ratings & Reviews:** Respond to all reviews!
- **Installs:** Track user acquisition

**Respond to Reviews:**

```
Example response to negative review:

"Hi [Name], thank you for your feedback! We're sorry to hear about [issue].
We've fixed this in version 1.0.1 which will be available soon.
Please email support@kumbara.app if you need immediate assistance.
We're committed to making Kumbara the best savings app for you!"
```

**Update Cadence:**

- **Patch** (1.0.1): Bug fixes, release as needed
- **Minor** (1.1.0): New features, monthly
- **Major** (2.0.0): Major overhaul, yearly

---

## 6. iOS Publication Process

### 🍎 Overview

**Similar to Android, but:**

- More expensive ($99/year vs $25 one-time)
- Stricter review guidelines
- Faster review (1-3 days vs 2-7 days)
- Requires Mac for some steps (or EAS)

**Budget: $99/year**

---

### 6.1 Apple Developer Program

**Enroll:**

1. Go to [developer.apple.com/programs/enroll/](https://developer.apple.com/programs/enroll/)
2. Sign in with Apple ID
3. Complete enrollment form
4. Pay $99 (annual subscription)
5. Wait for verification (24-48 hours)

**What You Get:**

- Ability to publish on App Store
- TestFlight for beta testing
- Access to developer tools
- Analytics and reports

---

### 6.2 App Store Connect Setup

**Go to:** [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

**Create App:**

1. My Apps → + → New App
2. **Platform:** iOS
3. **Name:** Kumbara
4. **Primary Language:** Turkish (or English)
5. **Bundle ID:** com.tunahanyelmer.kumbara
   - Must match `app.json` exactly!
6. **SKU:** kumbara-app-001 (internal identifier)
7. **User Access:** Full Access

---

### 6.3 App Information

**Subtitle** (30 chars):

```
Smart Savings Tracker
```

**Category:**

- **Primary:** Finance
- **Secondary:** (optional) Productivity

**Content Rights:**

- ✅ I own all rights to the content

**Age Rating:**

- Complete questionnaire
- Answer questions (similar to Android)
- Likely result: 4+

**Privacy Policy URL:**

```
https://tunahanyelmer.github.io/kumbara-privacy
```

---

### 6.4 Pricing & Availability

**Price:**

- Free (select "Free")

**Availability:**

- Select countries
- Recommended: Start with Turkey, expand globally

**Release Timing:**

- **Manually release this version:** You control when it goes live after approval
- **Automatically release:** Goes live immediately after approval

---

### 6.5 Prepare for Submission

#### Screenshots

**Required Sizes:**

| Device                   | Resolution  | Name        |
| ------------------------ | ----------- | ----------- |
| 6.5" (iPhone 14 Pro Max) | 1284 x 2778 | Required    |
| 5.5" (iPhone 8 Plus)     | 1242 x 2208 | Required    |
| iPad Pro (12.9")         | 2048 x 2732 | Recommended |

**How to Capture:**

1. Use iOS Simulator (Xcode required, or run on Mac)
2. OR use Android app + resize in Figma
3. OR use screenshot generators:
   - [Mockuuups.studio](https://mockuuups.studio/)
   - [Smartmockups.com](https://smartmockups.com/)

**Upload 2-10 screenshots per size**

---

#### App Preview Video (Optional)

- 15-30 second video
- Upload to App Store Connect
- Shows app in action
- Can significantly boost conversions (+20%!)

**Tools:**

- Screen recording on iPhone
- Edit with iMovie or QuickTime
- Add music and text overlay

---

#### App Icon

**Requirements:**

- 1024 x 1024 pixels
- RGB (no transparency!)
- Square (no rounded corners - Apple adds them)

---

### 6.6 App Store Description

**Promotional Text** (170 chars) - Can update anytime without review:

```
🎉 NEW: Set savings goals and track progress! Export your data to PDF. Available in dark mode. Start saving smarter today!
```

**Description** (4000 chars):

```
(Use similar description as Android, tailored for iOS users)

📊 TRACK YOUR SAVINGS EFFORTLESSLY

Kumbara is a beautifully designed savings tracker built specifically for iOS. Track every lira, set goals, and visualize your financial progress.

✨ DESIGNED FOR iPHONE

• Native iOS design following Apple Human Interface Guidelines
• Smooth animations and gestures
• Dark Mode support
• Face ID and Touch ID integration (coming soon)
• Optimized for all iPhone and iPad models

🎯 KEY FEATURES

• Intuitive Balance Tracking
• Savings Goals with Progress Bars
• Beautiful Charts and Reports
• Secure Google Sign-In
• Export to CSV or PDF
• Category-Based Spending Analysis
• Multi-Currency Support

🔒 PRIVACY FIRST

Your data stays on your device and our secure servers. We never sell your information. Full control to export or delete anytime.

---

Download Kumbara and start your savings journey! 💰

Support: support@kumbara.app
```

**Keywords** (100 chars, comma-separated):

```
savings,tracker,budget,money,finance,goals,save,piggy bank,kumbara
```

**💡 Keyword Tips:**

- Research competitors' keywords
- Use [AppTweak](https://www.apptweak.com/) or [Sensor Tower](https://sensortower.com/)
- Include misspellings users might search
- Avoid trademarked terms

**Support URL:**

```
https://kumbara.app/support
```

(Can be GitHub README or simple webpage)

**Marketing URL** (optional):

```
https://kumbara.app
```

---

### 6.7 Build & Upload

**Option 1: Using EAS (Recommended)**

```bash
# Build for iOS
eas build --platform ios --profile production

# After build completes, submit to App Store
eas submit --platform ios
```

**Option 2: Using Xcode (Requires Mac)**

```bash
# Generate iOS project
npx expo prebuild

# Open in Xcode
open ios/Kumbara.xcworkspace

# Archive and upload via Xcode
```

---

### 6.8 TestFlight (Beta Testing)

**Before Submitting for Review, Test with TestFlight:**

1. Upload build via EAS or Xcode
2. Build appears in TestFlight section (1 hour processing)
3. Add internal testers:
   - Up to 100 testers
   - No review required
   - Instant distribution
4. Add external testers (optional):
   - Up to 10,000 testers
   - Requires Apple review
   - Use for public beta

**Invite Testers:**

```
Email: tester@example.com
```

**TestFlight Link:**

- Share public link OR
- Invite via email

**Collect Feedback:**

- Testers can submit feedback in TestFlight app
- Check for crashes
- Verify all features work
- Test on different devices and iOS versions

---

### 6.9 App Review Information

**Contact Information:**

- **First Name:** Tunahan
- **Last Name:** Yelmer
- **Phone:** +90-XXX-XXX-XXXX
- **Email:** support@kumbara.app

**Demo Account** (if app requires login):

- **Username:** demo@kumbara.app
- **Password:** Demo1234!
- **Notes:** "Test account with sample data. Feel free to add/delete transactions."

**Notes for Reviewer:**

```
Kumbara is a personal finance tracker that helps users save money.

Key flows to test:
1. Sign in with Google
2. Add a deposit transaction
3. Add a withdrawal transaction
4. View transaction history
5. Create a savings goal (optional)
6. View reports (optional)

All features work without internet once authenticated.

Thank you for reviewing!
```

---

### 6.10 Submit for Review

**Checklist:**

- [✓] App icon uploaded (1024x1024)
- [✓] Screenshots uploaded (required sizes)
- [✓] Description written
- [✓] Keywords optimized
- [✓] Privacy policy URL provided
- [✓] Build uploaded and processed
- [✓] TestFlight testing completed
- [✓] App Review Information filled

**Click "Submit for Review"**

---

### 6.11 App Review Process

**Timeline:** 1-3 days (often faster than Android!)

**Status:**

1. **Waiting for Review** - In queue
2. **In Review** - Apple is testing
3. **Pending Developer Release** - Approved! (if manual release selected)
4. **Ready for Sale** - Live on App Store! 🎉

**Common Rejection Reasons:**

1. **Guideline 2.1 - App Completeness**

   - ❌ App crashes on launch
   - ❌ Features don't work
   - ✅ Fix: Test thoroughly on real devices

2. **Guideline 4.3 - Spam**

   - ❌ App too similar to others with same name
   - ✅ Fix: Add unique features, differentiate

3. **Guideline 5.1.1 - Privacy**

   - ❌ Missing usage descriptions
   - ✅ Fix: Add to `app.json`:
     ```json
     "ios": {
       "infoPlist": {
         "NSPhotoLibraryUsageDescription": "To export transaction receipts",
         "NSCameraUsageDescription": "To take photos of receipts",
         "NSFaceIDUsageDescription": "To securely unlock the app"
       }
     }
     ```

4. **Guideline 5.1.2 - Data Use and Sharing**

   - ❌ Data collection not disclosed
   - ✅ Fix: Update privacy policy, add disclosures

5. **Guideline 5.1.5 - Location Services**
   - ❌ Requesting location without explanation
   - ✅ Fix: Remove if not needed, or explain why

**If Rejected:**

- Apple provides detailed feedback
- Fix issues
- Increment `buildNumber` in `app.json`
- Rebuild and resubmit
- Usually approved faster second time

---

### 6.12 Post-Launch

**Monitor:**

- **Crashes:** App Store Connect → Analytics → Crashes
- **Usage:** Active devices, sessions, retention
- **Reviews:** Respond within 24-48 hours

**Optimize:**

- A/B test app icon (2 variants)
- A/B test screenshots
- Update keywords based on search performance
- Track conversion rate (impressions → downloads)

**Update Process:**

1. Fix bugs or add features
2. Increment `buildNumber` and `version`
3. Build and submit
4. 1-3 day review
5. Release update

---

## 7. CI/CD Pipeline

### 🤖 Why Automate?

**Problems Without CI/CD:**

- Manual testing = easy to forget tests
- Inconsistent builds
- Slow releases
- Human error

**Benefits:**

- ✅ Automatic testing on every commit
- ✅ Consistent build environment
- ✅ Faster feedback loop
- ✅ Professional workflow

---

### 7.1 GitHub Actions Setup

**Create `.github/workflows/ci.yml`:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Run tests
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  # Lint code
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint

  # TypeScript type check
  typecheck:
    name: TypeScript
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx tsc --noEmit

  # Build preview for PRs
  build-preview:
    name: Build Preview
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform android --profile preview --non-interactive --no-wait

  # Deploy to production
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: [test, lint, typecheck]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: Publish EAS Update
        run: eas update --branch production --message "${{ github.event.head_commit.message }}"
```

---

### 7.2 GitHub Secrets

**Add these to:** Repository → Settings → Secrets → Actions

```
EXPO_TOKEN = your-expo-access-token
```

**Get Expo Token:**

```bash
eas whoami
# Login if needed: eas login

# Create token
eas build:create
# OR go to expo.dev → Account Settings → Access Tokens
```

---

### 7.3 EAS Update (OTA Updates)

**What is OTA?** Over-The-Air updates = push updates without app store review

**Setup:**

```bash
eas update:configure
```

**Publish Update:**

```bash
# After fixing a bug
eas update --branch production --message "Fix: Balance display rounding error"
```

**What Can Be Updated OTA:**

- ✅ JavaScript/TypeScript code
- ✅ React components
- ✅ Assets (images, fonts)
- ❌ Native code (requires new build)
- ❌ Dependencies that use native modules

**Example Workflow:**

```
Day 1: User reports bug
Day 1: Fix bug, push to GitHub
Day 1: CI runs, publishes EAS update
Day 1: Users get update automatically (no app store!)
```

---

### 7.4 Backend CI/CD

**For Go Backend on Railway:**

**Create `.github/workflows/deploy-backend.yml`:**

```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Railway CLI
        run: npm install -g @railway/cli

      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        working-directory: ./backend
```

**Add Railway Token to Secrets:**

```bash
# Get token
railway login
railway token

# Add to GitHub Secrets as RAILWAY_TOKEN
```

---

### 7.5 Automated Testing

**Test Levels:**

```
        /\
       /E2E\       <- 5 tests (full user flows)
      /──────\
     /  API   \    <- 20 tests (API calls)
    /──────────\
   / Component \   <- 50 tests (UI components)
  /─────────────\
 /     Unit      \ <- 100 tests (functions)
```

**Update `package.json`:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage --collectCoverageFrom='**/*.{ts,tsx}' --coveragePathIgnorePatterns='node_modules|.expo|coverage'",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

**Set Coverage Thresholds** in `jest.config.js`:

```javascript
module.exports = {
  preset: 'jest-expo',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}
```

---

## 8. Post-Launch Strategy

### 🚀 You Launched - Now What?

**Reality Check:**

- Week 1: 10-50 downloads (mostly friends/family)
- Month 1: 100-500 downloads (organic + word of mouth)
- Month 3: 500-2000 downloads (if you market well)

**Success Metrics:**

- **Retention:** 40% Day 1, 20% Day 7, 10% Day 30 (good targets)
- **Engagement:** 3-4 sessions per week
- **Ratings:** 4.5+ stars with 50+ reviews
- **Crash-free:** >99.5% sessions

---

### 8.1 Analytics Integration

#### Expo Analytics (Built-in)

**Already tracking:**

- App opens
- Screen views
- User sessions
- Geographic data

**View in:** [expo.dev](https://expo.dev) → Your Project → Analytics

---

#### Sentry (Crash Reporting)

**Setup:**

```bash
npx expo install @sentry/react-native
```

**Configure `app.config.js`:**

```javascript
export default {
  expo: {
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'your-org',
            project: 'kumbara',
            authToken: process.env.SENTRY_AUTH_TOKEN
          }
        }
      ]
    }
  }
}
```

**Initialize in `App.tsx`:**

```typescript
import * as Sentry from '@sentry/react-native'

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: 1.0
})

export default Sentry.wrap(App)
```

**Track Custom Events:**

```typescript
Sentry.captureMessage('User created first goal', 'info')
Sentry.captureException(error)
```

---

#### Mixpanel or Amplitude (Product Analytics)

**Why?** Understand user behavior deeply

**Setup Mixpanel:**

```bash
npm install mixpanel-react-native
```

**Track Events:**

```typescript
import { Mixpanel } from 'mixpanel-react-native'

// Initialize
await Mixpanel.init('YOUR_TOKEN')

// Track events
Mixpanel.track('Transaction Added', {
  type: 'deposit',
  amount: 100,
  currency: 'TRY'
})

Mixpanel.track('Goal Created', {
  target_amount: 5000,
  category: 'vacation'
})

// User properties
Mixpanel.identify(userId)
Mixpanel.set({
  $email: user.email,
  $name: user.name,
  signup_date: new Date()
})
```

**Key Events to Track:**

1. App Opened
2. Sign In Completed
3. Transaction Added (type, amount, category)
4. Goal Created
5. Goal Completed
6. Report Viewed
7. Data Exported
8. Settings Changed

**Use Funnels:**

```
Funnel: New User Activation
1. App Opened (100%)
2. Signed In (80%)
3. Added First Transaction (50%)
4. Created First Goal (30%)
5. Added 10 Transactions (20%)
```

**Identify Drop-offs:**

- Where do users leave?
- What features are unused?
- Which screens have high exit rates?

---

### 8.2 User Feedback Collection

#### In-App Feedback

**Create Feedback Modal:**

```typescript
const FeedbackModal = () => {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(5)

  const sendFeedback = async () => {
    await fetch('https://api.kumbara.app/feedback', {
      method: 'POST',
      body: JSON.stringify({ feedback, rating, userId })
    })

    Toast.show({
      type: 'success',
      text1: 'Thank you!',
      text2: 'Your feedback helps us improve Kumbara.'
    })
  }

  return (
    <Modal visible={visible}>
      <Text>How are you liking Kumbara?</Text>

      {/* Star rating */}
      <StarRating rating={rating} onRate={setRating} />

      {/* Text input */}
      <TextInput
        placeholder='Tell us more...'
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      <Button onPress={sendFeedback}>Send Feedback</Button>
    </Modal>
  )
}
```

**When to Show:**

- After user completes first goal
- After 10 transactions
- After 1 week of usage
- Never more than once per week

---

#### App Store Reviews

**Request Review (iOS):**

```typescript
import * as StoreReview from 'expo-store-review'

const requestReview = async () => {
  const canReview = await StoreReview.isAvailableAsync()
  if (canReview) {
    await StoreReview.requestReview()
  }
}

// Trigger after positive moment
if (goalCompleted && transactionCount > 10) {
  setTimeout(() => requestReview(), 2000) // Wait 2s
}
```

**Respond to All Reviews:**

- Thank positive reviews
- Address concerns in negative reviews
- Show you're listening and improving

**Example Responses:**

```
⭐⭐⭐⭐⭐ "Love this app!"
→ "Thank you! We're so glad Kumbara is helping you save. Happy saving! 💰"

⭐⭐ "Can't export data"
→ "Thanks for the feedback! Data export is available in Reports → Export. If you still have issues, email support@kumbara.app and we'll help immediately."
```

---

### 8.3 Marketing & Growth

#### App Store Optimization (ASO)

**Optimize Every 2 Weeks:**

1. **Keywords:** Test different combinations
2. **Screenshots:** A/B test (iOS only officially, but can manually test Android)
3. **Description:** Improve based on feedback
4. **Icon:** Test variants (major impact!)

**Track:**

- Impressions (how many see your app)
- Conversion rate (impressions → downloads)
- Goal: 30-40% conversion rate

---

#### Social Media

**Instagram Strategy:**

1. **Content Ideas:**

   - Savings tips ("5 Ways to Save ₺500/month")
   - Feature highlights ("Did you know you can export to PDF?")
   - User testimonials (with permission)
   - Behind-the-scenes (development process)
   - Motivational quotes about saving

2. **Posting Schedule:**

   - 3-4 posts per week
   - 2-3 stories per day
   - Engage with comments within 1 hour

3. **Growth Tactics:**
   - Follow users who like competitor apps
   - Use hashtags: #savings #personalfinance #budgeting #turkiye
   - Collaborate with micro-influencers (10k-50k followers)

---

#### Content Marketing

**Start a Blog:**

1. **Topics:**

   - "How to Save for Vacation in 6 Months"
   - "Emergency Fund: Why You Need ₺10,000"
   - "5 Painless Ways to Cut Expenses"
   - "Understanding Your Spending Patterns"

2. **SEO:**

   - Target long-tail keywords
   - Include app CTAs in articles
   - Build backlinks

3. **Platforms:**
   - Medium
   - Dev.to (for tech audience)
   - Your own blog (kumbara.app/blog)

---

#### Referral Program (Future)

**Concept:** "Invite friend, both get bonus"

**Implementation:**

```typescript
const generateReferralCode = (userId: number) => {
  return `KUM${userId.toString().padStart(6, '0')}`
}

// Example: User ID 123 → KUM000123

// Share flow
const shareReferralCode = async () => {
  await Share.share({
    message: `Join me on Kumbara! Use my code ${referralCode} and we both get a free premium feature! 💰 Download: https://kumbara.app/ref/${referralCode}`
  })
}
```

**Incentive Ideas:**

- Unlock premium goal categories
- Export unlimited reports
- Priority support
- Custom app icon

---

### 8.4 Monetization Strategy

**⏰ When to Monetize:** After 10,000+ active users

**Option 1: Freemium Model**

| Tier        | Price        | Features                                                            |
| ----------- | ------------ | ------------------------------------------------------------------- |
| **Free**    | ₺0           | 3 goals, basic reports, ads                                         |
| **Premium** | ₺29.99/month | Unlimited goals, advanced reports, export, no ads, priority support |

**Option 2: Lifetime Purchase**

- Free 30-day trial
- One-time payment: ₺199

**Option 3: Tiered Features**

- Free: Basic tracking
- Plus (₺19.99/mo): Goals + Reports
- Pro (₺39.99/mo): Plus + Export + Budgets + Recurring Transactions

**Implementation:**

```bash
npx expo install expo-in-app-purchases
```

**Don't Monetize Too Early:**

- Need product-market fit first
- Need loyal user base
- Need feature parity with free competitors

---

### 8.5 Update Roadmap

**First 3 Months:**

**Month 1:**

- 🐛 Fix critical bugs
- 📊 Improve reports based on feedback
- ✨ Add savings goals (if not in MVP)
- 🔔 Enable push notifications

**Month 2:**

- 📱 Improve onboarding
- 🎨 Add alternative color schemes
- 📈 Advanced charts
- ✏️ Transaction editing

**Month 3:**

- 💰 Budgeting system
- 🔄 Recurring transactions
- 🔐 Biometric lock
- 🔍 Transaction search

**Version History:**

```
v1.0.0 - Initial release
v1.1.0 - Added savings goals and notifications
v1.2.0 - Reports with charts and export
v1.3.0 - Budgeting and recurring transactions
v2.0.0 - Major redesign, multi-account support
```

---

## 🎓 Learning Checkpoints

As your software engineering professor, here are the **critical lessons** from this roadmap:

### Technical Skills

- [ ] Understanding production-ready deployments (not just local dev)
- [ ] Security best practices (secrets, authentication, encryption)
- [ ] CI/CD pipelines (automation saves time and prevents errors)
- [ ] Analytics integration (measure what matters)
- [ ] Iterative development (launch, learn, improve)

### Product Skills

- [ ] MVP thinking (ship value quickly, not perfection)
- [ ] Feature prioritization (what users actually need vs. what's cool)
- [ ] User feedback loops (listen, respond, iterate)
- [ ] App store optimization (visibility = downloads)
- [ ] Retention strategies (getting users is hard, keeping them is harder)

### Business Skills

- [ ] Legal requirements (privacy policy is not optional)
- [ ] Platform economics ($25 Android, $99/year iOS)
- [ ] Monetization timing (too early kills growth)
- [ ] Marketing basics (great product + no users = failure)
- [ ] Sustainable growth (organic > paid ads for small apps)

---

## 📝 Final Checklist

### Before Android Launch

- [ ] Privacy policy hosted and accessible
- [ ] All app assets created (icon, graphics, screenshots)
- [ ] Backend deployed to production
- [ ] Environment variables secured
- [ ] Google Play Developer account created ($25)
- [ ] App tested on multiple Android devices
- [ ] Release build generated with EAS
- [ ] Store listing completed
- [ ] Data safety form filled honestly

### Before iOS Launch

- [ ] Apple Developer Program enrollment ($99)
- [ ] iOS-specific screenshots captured
- [ ] TestFlight beta testing completed
- [ ] App Store listing optimized
- [ ] Keywords researched and selected
- [ ] Build uploaded and processed
- [ ] Demo account provided for reviewers

### Post-Launch

- [ ] Sentry configured for crash reporting
- [ ] Analytics dashboard set up
- [ ] Social media accounts created
- [ ] Support email monitored
- [ ] Responding to reviews daily
- [ ] Tracking key metrics (DAU, retention, crashes)
- [ ] Planning first update based on feedback

---

## 🚀 Next Steps

1. **Week 1-2:** Complete Pre-Launch Essentials (legal, environment, backend deployment)
2. **Week 3-4:** Implement Phase 1 MVP features (goals, reports, export, notifications)
3. **Week 5:** Create all app store assets and listings
4. **Week 6:** Test extensively, fix bugs
5. **Week 7:** Submit to Android
6. **Week 8:** Submit to iOS (while Android is in review)
7. **Week 9+:** Monitor, respond, iterate

**Estimated Time to Launch:** 8-10 weeks

---

## 💡 Remember

**"Done is better than perfect."**

You can always update the app. The goal is to get Kumbara into users' hands, learn from real usage, and improve. Every successful app started as an imperfect v1.0.

**"Build, Measure, Learn."**

Launch → Collect data → Understand users → Improve → Repeat.

Good luck with your launch! 🎉

---

## 📞 Resources

**Documentation:**

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Documentation](https://docs.expo.dev/eas/)
- [React Native](https://reactnative.dev/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)

**Tools:**

- [PrivacyPolicies.com](https://www.privacypolicies.com/) - Privacy policy generator
- [AppTweak](https://www.apptweak.com/) - ASO tools
- [Sentry](https://sentry.io/) - Error tracking
- [Mixpanel](https://mixpanel.com/) - Product analytics
- [Railway](https://railway.app/) - Backend hosting

**Communities:**

- [Expo Discord](https://chat.expo.dev/)
- [React Native Community](https://www.reactnative.dev/community/overview)
- [r/reactnative](https://www.reddit.com/r/reactnative/)
- [Indie Hackers](https://www.indiehackers.com/)

---

**This roadmap was created specifically for Kumbara by Claude Code. May your app reach thousands of users and help them achieve their savings goals! 💰**
