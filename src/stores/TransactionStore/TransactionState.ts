import { TransactionValues } from "../../domain/transactions";

export interface TransactionState {
    isLoading: boolean;
    transactions: TransactionValues[];
    hasError: boolean;
    errorMessage: string;
}