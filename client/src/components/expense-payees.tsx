import { Table } from "react-bootstrap";
import IExpenseItem from "../models/item";
import getAllPayeeNames from "../services/expense-utils"

type ExpensesByPayeeModel = {
    expenseItems: IExpenseItem[];
}

const ExpensesByPayees = ({ expenseItems }: ExpensesByPayeeModel) => {
    const getTotalExpensesByPayee = (payeeName: string) => {
        let totalExpense = 0;

        expenseItems.forEach((expenseItems) => {
            if(expenseItems.payeeName === payeeName) totalExpense += expenseItems.price;
        })

        return totalExpense;
    }

    return (
        <>
            <Table striped bordered hover>
                <thead className="text-center">
                    <tr>
                        <th>Sr No.</th>
                        <th>Payee Name</th>
                        <th>Total Expense</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getAllPayeeNames(expenseItems).map((payeeName, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{payeeName}</td>
                                <td>{getTotalExpensesByPayee(payeeName)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ExpensesByPayees;
