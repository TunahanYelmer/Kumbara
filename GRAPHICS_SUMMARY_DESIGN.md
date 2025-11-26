# 📊 Graphics & Summary Screen Design

## Overview
Add visual insights to help users understand their spending patterns through charts and statistics.

---

## 🎯 Goals

1. **Visual Understanding**: See spending patterns at a glance
2. **Category Insights**: Which categories consume most money
3. **Time Trends**: How spending changes over time
4. **Financial Health**: Income vs Expenses comparison

---

## 📱 Summary Screen Design

### Screen Layout

```
┌─────────────────────────────────┐
│  ← Summary              🔄       │ (Header)
├─────────────────────────────────┤
│                                 │
│   📊 This Month                 │
│   ─────────────────────────     │
│   Income:     +$2,450  ↗        │
│   Expenses:   -$1,823  ↘        │
│   Net:        +$627    ✅       │
│                                 │
├─────────────────────────────────┤
│                                 │
│   Spending by Category          │
│   ┌──────────────────────┐     │
│   │     🍔 Food: 40%      │     │
│   │   🛒 Market: 25%     │     │
│   │    🚗 Trans: 20%     │     │
│   │    💡 Bills: 15%     │     │
│   └──────────────────────┘     │
│                                 │
├─────────────────────────────────┤
│                                 │
│   Weekly Trend                  │
│   ┌──────────────────────┐     │
│   │     Line Chart        │     │
│   │    /\  /\            │     │
│   │   /  \/  \__         │     │
│   │ Mon Tue Wed Thu Fri  │     │
│   └──────────────────────┘     │
│                                 │
├─────────────────────────────────┤
│                                 │
│   Recent Insights               │
│   ⚠️  Food spending up 15%      │
│   ✅ Transport spending down    │
│   💡 Tip: Set a budget limit    │
│                                 │
└─────────────────────────────────┘
```

---

## 📊 Chart Types Recommended

### 1. **Pie Chart** - Category Breakdown
**Use Case**: Show spending distribution by category

```typescript
<PieChart
  data={[
    { name: 'Food', amount: 450, color: '#ca8a04' },
    { name: 'Market', amount: 320, color: '#c2410c' },
    { name: 'Transport', amount: 250, color: '#be185d' },
    { name: 'Bills', amount: 180, color: '#7c3aed' },
  ]}
/>
```

**Why**: Easy to see proportions at a glance

### 2. **Line Chart** - Spending Trends
**Use Case**: Show daily/weekly spending patterns

```typescript
<LineChart
  data={[
    { date: 'Mon', amount: 45 },
    { date: 'Tue', amount: 78 },
    { date: 'Wed', amount: 32 },
    // ...
  ]}
/>
```

**Why**: See trends over time (spending more lately?)

### 3. **Bar Chart** - Category Comparison
**Use Case**: Compare categories side-by-side

```typescript
<BarChart
  data={[
    { category: 'Food', thisMonth: 450, lastMonth: 380 },
    { category: 'Market', thisMonth: 320, lastMonth: 350 },
  ]}
/>
```

**Why**: Easy comparison between time periods

### 4. **Progress Bars** - Budget Tracking
**Use Case**: Show budget usage per category

```typescript
<BudgetProgress
  spent={450}
  budget={500}
  category="Food"
/>
```

**Why**: Quick visual feedback on budget status

---

## 🛠️ Recommended Library

### **Option 1: react-native-chart-kit** ⭐ RECOMMENDED

**Pros:**
- ✅ Easy to use
- ✅ Good performance
- ✅ Beautiful default styles
- ✅ Small bundle size
- ✅ Well maintained

**Cons:**
- ⚠️  Limited customization

**Installation:**
```bash
npm install react-native-chart-kit react-native-svg
```

**Example:**
```typescript
import { LineChart } from 'react-native-chart-kit';

<LineChart
  data={{
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{ data: [45, 78, 32, 65, 89] }]
  }}
  width={Dimensions.get("window").width - 32}
  height={220}
  chartConfig={{
    backgroundColor: theme.BackgroundColor,
    backgroundGradientFrom: theme.BalanceCardColor[0],
    backgroundGradientTo: theme.BalanceCardColor[1],
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  }}
  bezier
/>
```

### **Option 2: victory-native**

**Pros:**
- ✅ Very customizable
- ✅ Animated
- ✅ React-like API

**Cons:**
- ⚠️  Larger bundle size
- ⚠️  More complex setup

### **Option 3: react-native-svg-charts**

**Pros:**
- ✅ Good performance
- ✅ SVG-based

**Cons:**
- ⚠️  Less intuitive API
- ⚠️  Fewer examples

---

## 📐 Data Structure

### Transaction Statistics Interface

```typescript
// types/statistics.ts

export interface CategoryStat {
  category: 'food' | 'market' | 'transport' | 'bill';
  amount: number;
  percentage: number;
  count: number;
  color: string;
}

export interface PeriodStat {
  income: number;
  expenses: number;
  net: number;
  transactions: number;
}

export interface TrendDataPoint {
  date: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface SummaryStats {
  period: 'week' | 'month' | 'year';
  current: PeriodStat;
  previous: PeriodStat;
  categoryBreakdown: CategoryStat[];
  trend: TrendDataPoint[];
  insights: string[];
}
```

---

## 🔧 Implementation Plan

### Phase 1: Data Processing (Priority 1)

Create utilities to process transaction data:

```typescript
// utils/statistics.ts

export function calculatePeriodStats(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): PeriodStat {
  const filtered = transactions.filter(t =>
    t.created_at >= startDate && t.created_at <= endDate
  );

  const income = filtered
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = filtered
    .filter(t => t.type === 'withdraw')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expenses,
    net: income - expenses,
    transactions: filtered.length
  };
}

export function calculateCategoryBreakdown(
  transactions: Transaction[]
): CategoryStat[] {
  const categories = ['food', 'market', 'transport', 'bill'];
  const total = transactions
    .filter(t => t.type === 'withdraw')
    .reduce((sum, t) => sum + t.amount, 0);

  return categories.map(category => {
    const amount = transactions
      .filter(t => t.type === 'withdraw' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category,
      amount,
      percentage: (amount / total) * 100,
      count: transactions.filter(t => t.category === category).length,
      color: getCategoryColor(category)
    };
  });
}

export function getTrendData(
  transactions: Transaction[],
  days: number
): TrendDataPoint[] {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const trendData: TrendDataPoint[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dayTransactions = transactions.filter(t =>
      isSameDay(new Date(t.created_at), date)
    );

    const expenses = dayTransactions
      .filter(t => t.type === 'withdraw')
      .reduce((sum, t) => sum + t.amount, 0);

    trendData.push({
      date: formatDate(date),
      amount: expenses,
      type: 'expense'
    });
  }

  return trendData;
}
```

### Phase 2: Summary Screen Component (Priority 2)

```typescript
// screens/summary/SummaryScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { getTransactions } from '@/database/db';
import { calculatePeriodStats, calculateCategoryBreakdown } from '@/utils/statistics';

export default function SummaryScreen() {
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const transactions = await getTransactions();

      // This month
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const currentStats = calculatePeriodStats(transactions, monthStart, now);

      // Last month
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      const previousStats = calculatePeriodStats(transactions, lastMonthStart, lastMonthEnd);

      // Category breakdown
      const categoryBreakdown = calculateCategoryBreakdown(
        transactions.filter(t => t.created_at >= monthStart)
      );

      setStats({
        period: 'month',
        current: currentStats,
        previous: previousStats,
        categoryBreakdown,
        trend: getTrendData(transactions, 7),
        insights: generateInsights(currentStats, previousStats)
      });
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <StatsCard stats={stats.current} />
      <CategoryPieChart data={stats.categoryBreakdown} />
      <TrendLineChart data={stats.trend} />
      <InsightsList insights={stats.insights} />
    </ScrollView>
  );
}
```

### Phase 3: Chart Components (Priority 3)

Create reusable chart components:

```typescript
// components/charts/CategoryPieChart.tsx
// components/charts/TrendLineChart.tsx
// components/charts/StatsCard.tsx
// components/charts/BudgetProgress.tsx
```

---

## 🎨 Theme Integration

Add chart colors to your theme:

```typescript
// themeReducer.ts

export interface Theme {
  // ... existing properties

  // Chart colors
  charts: {
    income: string;
    expense: string;
    net: string;
    gridLines: string;
    labels: string;
    tooltipBg: string;
    tooltipText: string;
  };
}

// Light theme
charts: {
  income: '#10b981',
  expense: '#ef4444',
  net: '#3b82f6',
  gridLines: '#e5e7eb',
  labels: '#6b7280',
  tooltipBg: '#1f2937',
  tooltipText: '#ffffff',
}

// Dark theme
charts: {
  income: '#34d399',
  expense: '#f87171',
  net: '#60a5fa',
  gridLines: '#374151',
  labels: '#9ca3af',
  tooltipBg: '#f3f4f6',
  tooltipText: '#1f2937',
}
```

---

## 📊 Statistics to Display

### 1. **Overview Card**
- Total Income (this month)
- Total Expenses (this month)
- Net Savings (income - expenses)
- Trend indicators (↗ up, ↘ down, → same)

### 2. **Category Breakdown**
- Pie chart showing percentage per category
- Top spending category highlighted
- Comparison with last month

### 3. **Time Trends**
- Last 7 days spending (line chart)
- Daily average
- Highest spending day

### 4. **Insights** (Auto-generated)
- "Food spending is up 15% from last month"
- "You're saving 25% of your income"
- "Transport costs decreased by $50"
- "You haven't spent on Bills yet this month"

### 5. **Budget Progress** (Future feature)
- Set monthly budget per category
- Visual progress bars
- Warnings when approaching limit

---

## 🚀 Quick Start Implementation

### Step 1: Install Dependencies
```bash
npm install react-native-chart-kit react-native-svg
```

### Step 2: Create Utilities
```bash
mkdir utils
touch utils/statistics.ts
```

### Step 3: Create Summary Screen
```bash
mkdir -p screens/summary
touch screens/summary/SummaryScreen.tsx
```

### Step 4: Add to Navigation
```typescript
// navigation/RootStack.tsx
import SummaryScreen from '@/screens/summary/SummaryScreen';

<Stack.Screen name="Summary" component={SummaryScreen} />
```

### Step 5: Add Tab Icon
```typescript
// navigation/TabNavigator.tsx
<Tab.Screen
  name="Summary"
  component={SummaryScreen}
  options={{
    tabBarLabel: "Özet",
    tabBarIcon: ({ focused }) => (
      <Image
        source={require("@assets/chart.png")}  // Add chart icon
        style={{ ... }}
      />
    )
  }}
/>
```

---

## 🎯 Success Metrics

After implementation, user should be able to:
- ✅ See spending breakdown by category
- ✅ Understand trends over time
- ✅ Compare current vs previous periods
- ✅ Get actionable insights
- ✅ View all data in under 2 seconds

---

## 📝 Notes

- **Performance**: Use `useMemo` for expensive calculations
- **Accessibility**: Add proper labels for screen readers
- **Offline**: Works with local SQLite database
- **Theme**: All charts adapt to light/dark mode

---

Want me to implement any of these components?
