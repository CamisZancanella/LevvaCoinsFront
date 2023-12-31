import { createEvent } from 'effector';

import { RequestError } from '../../domain/request';
import { TransactionValues } from '../../domain/transactions';

export const loadTransaction = createEvent("loadTransaction");
export const loadCreateTransactionDone = createEvent<TransactionValues>("loadCreateTransactionDone");
export const loadTransactionDone = createEvent<TransactionValues[]>("loadTransactionDone");
export const loadTransactionFail = createEvent<RequestError>("loadTransactionFail");
export const loadDeleteTransactionDone = createEvent<string>("loadDeleteTransactionDone");