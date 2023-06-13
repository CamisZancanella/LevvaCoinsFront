import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domain/request";

import { NewTransactionParams, TransactionValues } from "../../domain/transactions";

const createTransaction = async ({
    description,
    amount,
    type,
    categoryId,
}: NewTransactionParams): Promise<any> => {
    return Api.post ({
        url: "/transaction",
        body: {
            description,
            amount,
            type,
            categoryId,
        },
    })
    .then((response) => {
        return response.data;
    })
    .catch ((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
};

const getTransaction = async (): Promise<TransactionValues[]> => {
    return Api.get({
        url: "/transaction"
    })
    .then((response) => {
        return response.data;
    })
    .catch ((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
};

const searchTransaction = async (textTransaction?: string) => {
    if(textTransaction === null) return getTransaction();

    return Api.get({
        url: "/transaction",
        config: {
            params:{
                search: textTransaction
            }
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch ((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
}

const deleteTransaction = async (idTransaction: string) => {
    return Api.delete({
        url: `/transaction/${idTransaction}`,
    })
    .then((response) => {
        return response.data;
    })
    .catch ((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    }); 
}
export const TransactionService = {
    createTransaction,
    getTransaction,
    searchTransaction,
    deleteTransaction
};