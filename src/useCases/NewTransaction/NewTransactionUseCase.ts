import { TransactionService } from "../../services/TransactionService/TransactionService";

import { loadTransaction, 
    loadCreateTransactionDone,
    loadTransactionFail }
    from '../../stores/TransactionStore/TransactionEvents';

import { NewTransactionParams, TransactionValues } from "../../domain/transactions";
import { RequestError } from "../../domain/request";

const execute = async ({
    description,
    amount,
    type,
    categoryId,
}: NewTransactionParams): Promise<void> => {
    loadTransaction();

    return TransactionService.createTransaction({
        description,
        amount,
        type,
        categoryId,
    })
    .then((transaction:TransactionValues) => {
        loadCreateTransactionDone(transaction);
    })
    .catch(({ hasError, message }: RequestError) => {
        loadTransactionFail({ hasError, message});
        throw new Error();
    });
};

    const NewTransactionUseCase = {
        execute,
    };

    export default NewTransactionUseCase;
