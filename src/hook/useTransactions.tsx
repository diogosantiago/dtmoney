import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type TransactionProps = {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>

interface TransactionsContextData{
    transactions: TransactionProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps{
    children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transaction: TransactionInput){
        await api.post('transactions', transaction).then(response =>{
            const transaction = response?.data?.transaction;

            if(transaction){
                console.log(transaction);
                setTransactions(oldValue => [...oldValue, transaction])
            }
        })
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)
    return context;
}