import { useEffect, useState } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import IExpenseItem from "../models/item";
import fetchAllExpenses from "../services/fetch-items";
import ExpenseItems from "./expense-items";
import ExpenseByPayees from "./expense-payees";

const ExpenseTracker = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getExpensesInvoker = async () => {
            try{
                const response = await fetchAllExpenses();

                setExpenseItems(response);
            } catch( error ) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        getExpensesInvoker();
    }, [expenseItems]);

    return(
        <Container className="my-4">
            {
                loading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading the expenses!</span>
                    </Spinner>
                )
            }
            
            {
                error && !loading && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }

            {
                !error && !loading && (
                    <>
                        <ExpenseItems expenseItems = {expenseItems}></ExpenseItems>
                        <ExpenseByPayees expenseItems={expenseItems}></ExpenseByPayees>
                    </>
                )
            }
        </Container>
    )
}

export default ExpenseTracker;
