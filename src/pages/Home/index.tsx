import { useEffect } from "react";

import { useStore } from "effector-react";

import GetTransactionsUseCase from "../../useCases/GetTransactionsUseCase/GetTransactionsUseCase";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/Header/SearchForm";
import { Summary } from "../../components/Header/Summary";

import {
  ButtonDelete,
  HomeWrapper,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableEmpty,
} from "./styles";
import { TrashSimple } from "phosphor-react";
import DeleteTransactionUseCase from "../../useCases/DeleteTransactionUseCase/DeleteTransactionUseCase";

export function Home() {
  const { isLoading, transactions } = useStore(TransactionStore);

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    GetTransactionsUseCase.execute();
  }, []);

  const onDeleteTransaction = (id: string) => {
    DeleteTransactionUseCase.execute(id);
  }
  return (
    <HomeWrapper>
      <Header />
      <Summary />

      <SearchForm />

      <TransactionsContainer>
        <TransactionsTable>
          <thead>
            <td>Descrição</td>
            <td>Preço</td>
            <td>Categoria</td>
            <td>Data</td>
            <td>Ação</td>
          </thead>
          <tbody>
            {transactions.length > 0 &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type === 0 ? "income" : "outcome"}>
                      {money.format(transaction.amount)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category.description}</td>
                  <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
                  <td>
                    <ButtonDelete type="button" onClick={()=> onDeleteTransaction(transaction.id)}>
                      <TrashSimple size={24}/>
                    </ButtonDelete>
                  </td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
        {!isLoading && transactions.length === 0 && (
          <TransactionsTableEmpty>
            Adicione uma categoria e a sua primeira transação :)
          </TransactionsTableEmpty>
        )}
      </TransactionsContainer>
    </HomeWrapper>
  );
}