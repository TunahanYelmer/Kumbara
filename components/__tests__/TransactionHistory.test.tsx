import React from 'react';
import { render, screen, waitFor, fireEvent } from '../utils/testUtils';
import TransactionsHistory from '../TransactionHistory';
import { Transactions } from '../../context/reducer';

(global as any).alert = jest.fn();

// Mock the API
jest.mock('../../api/getTransactions');
import { getTransactions } from '../../api/getTransactions';

// Mock TransactionList component
jest.mock('../TransactionList', () => {
  return function MockTransactionList({ paymentType, amount }: any) {
    return <Text testID="transaction-item">{`${paymentType}-${amount}`}</Text>;
  };
});

import { Text } from 'react-native';

const mockGetTransactions = getTransactions as jest.MockedFunction<typeof getTransactions>;

const createMockTransaction = (overrides?: Partial<Transactions>): Transactions => ({
  id: 1,
  type: 'deposit',
  amount: 1000,
  category: undefined,
  date: '2025-01-01',
  ...overrides,
});

const mockTransactions: Transactions[] = [
  createMockTransaction({ id: 1, type: 'deposit', amount: 1000 }),
  createMockTransaction({ id: 2, type: 'withdraw', amount: 500, category: 'food' }),
  createMockTransaction({ id: 3, type: 'withdraw', amount: 200, category: 'transport' }),
];

describe('TransactionsHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetTransactions.mockResolvedValue(mockTransactions);
  });

  it('renders component correctly', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.getByTestId('transaction-history')).toBeTruthy();
    });
  });

  it('shows loading state on mount', () => {
    render(<TransactionsHistory />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('fetches transactions on mount', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(mockGetTransactions).toHaveBeenCalledTimes(1);
    });
  });

  it('displays transactions after loading', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).toBeFalsy();
      expect(screen.queryAllByTestId('transaction-item').length).toBeGreaterThan(0);
    });
  });

  it('displays all transactions in "all" tab', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      const items = screen.queryAllByTestId('transaction-item');
      expect(items.length).toBe(3);
    });
  });

  it('filters to income transactions', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.queryAllByTestId('transaction-item').length).toBeGreaterThan(0);
    });
    fireEvent.press(screen.getByTestId('income-tab'));
    await waitFor(() => {
      const items = screen.queryAllByTestId('transaction-item');
      expect(items.length).toBe(1);
    });
  });

  it('filters to expense transactions', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.queryAllByTestId('transaction-item').length).toBeGreaterThan(0);
    });
    fireEvent.press(screen.getByTestId('expense-tab'));
    await waitFor(() => {
      const items = screen.queryAllByTestId('transaction-item');
      expect(items.length).toBe(2);
    });
  });

  it('switches between tabs correctly', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.queryAllByTestId('transaction-item').length).toBeGreaterThan(0);
    });
    fireEvent.press(screen.getByTestId('income-tab'));
    await waitFor(() => {
      expect(screen.getByTestId('income-tab')).toBeTruthy();
    });
    fireEvent.press(screen.getByTestId('expense-tab'));
    await waitFor(() => {
      expect(screen.getByTestId('expense-tab')).toBeTruthy();
    });
  });

  it('displays empty state when no transactions', async () => {
    mockGetTransactions.mockResolvedValue([]);
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeTruthy();
    });
  });

  it('displays correct empty text for "all" tab', async () => {
    mockGetTransactions.mockResolvedValue([]);
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.getByText('Henüz işlem yok')).toBeTruthy();
    });
  });

  it('displays correct empty text for "income" tab', async () => {
    mockGetTransactions.mockResolvedValue([
      createMockTransaction({ id: 1, type: 'withdraw', amount: 500, category: 'food' }),
    ]);
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.queryAllByTestId('transaction-item').length).toBeGreaterThan(0);
    });
    fireEvent.press(screen.getByTestId('income-tab'));
    await waitFor(() => {
      expect(screen.getByText('Gelir işlemi yok')).toBeTruthy();
    });
  });

  it('handles API error gracefully', async () => {
    mockGetTransactions.mockRejectedValue(new Error('API Error'));
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeTruthy();
    });
  });

  it('handles invalid API response', async () => {
    mockGetTransactions.mockResolvedValue([] as any);
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeTruthy();
    });
  });

  it('displays correct transaction type icons', async () => {
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.getByText('income-1000')).toBeTruthy();
      expect(screen.getByText('food-500')).toBeTruthy();
      expect(screen.getByText('transport-200')).toBeTruthy();
    });
  });

  it('limits displayed transactions to 6', async () => {
    const manyTransactions = Array.from({ length: 10 }, (_, i) =>
      createMockTransaction({ id: i + 1, type: 'deposit', amount: 100 })
    );
    mockGetTransactions.mockResolvedValue(manyTransactions);
    render(<TransactionsHistory />);
    await waitFor(() => {
      const items = screen.queryAllByTestId('transaction-item');
      expect(items.length).toBe(6);
    });
  });

  it('handles transactions with missing fields', async () => {
    mockGetTransactions.mockResolvedValue([
      createMockTransaction({ id: 1, type: 'withdraw', amount: 500 }),
    ]);
    render(<TransactionsHistory />);
    await waitFor(() => {
      expect(screen.queryAllByTestId('transaction-item').length).toBeGreaterThan(0);
    });
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(<TransactionsHistory />);
    expect(() => unmount()).not.toThrow();
  });
});
