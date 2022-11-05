import { useEffect, useState } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import IExpenseItem from "../models/item";
import { fetchAllExpenseItems } from "../services/json-service-connection";
import AddNewExpense from "./add-expense";
import ExpenseItems from "./expense-items";
import ExpenseByPayees from "./expense-payees";

const ExpenseTracker = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getExpensesInvoker = async () => {
            try{
                const response = await fetchAllExpenseItems();

                setExpenseItems(response);
            } catch( error ) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        getExpensesInvoker();
    }, []);

    const refreshParent = (newExpenseItem: IExpenseItem) => {
        setExpenseItems(
            [
                ...expenseItems, newExpenseItem
            ]
        )
    }

    return(
        <Container className="my-4">
            <h2>Expense Management Application
                <AddNewExpense expenseItems = {expenseItems} refreshParent={refreshParent}></AddNewExpense>
            </h2>

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
                        <ExpenseByPayees expenseItems = {expenseItems}></ExpenseByPayees>
                    </>
                )
            }
        </Container>
    )
}

export default ExpenseTracker;
