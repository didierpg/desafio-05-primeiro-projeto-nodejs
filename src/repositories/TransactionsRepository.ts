import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all() {

    return {
      transactions: this.transactions,
      balance: this.getBalance()
    };
  }

  public getBalance(): Balance {

    const incomeTransactions = this.transactions.map((transaction) => (transaction.type === 'income' ? transaction.value : 0));
    const outcomeTransactions = this.transactions.map((transaction) => (transaction.type === 'outcome' ? transaction.value : 0));
    const income = incomeTransactions.reduce((accumulator, currentValue) => (accumulator + currentValue),0);
    const outcome = outcomeTransactions.reduce((accumulator, currentValue) => (accumulator + currentValue),0);
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionRequest): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction)
    return transaction;
  }
}

export default TransactionsRepository;
