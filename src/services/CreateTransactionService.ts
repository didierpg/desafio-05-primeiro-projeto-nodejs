import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionRequest: TransactionRequest): Transaction {

    const transactions = this.transactionsRepository.all();
    const balance = transactions.balance.total;
    const ammount = transactionRequest.value;

    if(transactionRequest.type === 'outcome' && ammount >= transactions.balance.total) {
      throw Error(`Não é possível retirar o valor ${ammount} de um saldo de ${balance}`);
    }
    return this.transactionsRepository.create(transactionRequest)
  }
}

export default CreateTransactionService;
