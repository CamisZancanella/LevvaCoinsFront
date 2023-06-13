import { TransactionService } from "../../services/TransactionService/TransactionService";

import { loadTransaction, 
    loadTransactionFail, 
    loadDeleteTransactionDone}
    from '../../stores/TransactionStore/TransactionEvents';

import { RequestError } from "../../domain/request";

const execute = async (idTransaction: string): Promise<void> => {
    loadTransaction();

    return TransactionService.deleteTransaction(idTransaction)
    .then(() => {
        loadDeleteTransactionDone(idTransaction);
    })
    .catch(({ hasError, message }: RequestError) => {
        loadTransactionFail({ hasError, message});
        throw new Error();
    });
};

    const DeleteTransactionUseCase = {
        execute,
    };

    export default DeleteTransactionUseCase;