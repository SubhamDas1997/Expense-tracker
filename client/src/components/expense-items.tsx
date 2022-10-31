import { Table } from "react-bootstrap";
import IExpenseItem from "../models/item";

type itemsModel = {
    expenseItems: IExpenseItem[];
}

const ExpenseItems = ({expenseItems}: itemsModel) => {
     return (
        <>
            <Table striped bordered hover>
                <thead className="text-center">
                    <tr>
                        <th>Sr No.</th>
                        <th>Expense Description</th>
                        <th>Payee Name</th>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenseItems.map((expenseItems, index) => (
                            <tr key={expenseItems.id}>
                                <td>{index + 1}</td>
                                <td>{expenseItems.expenseDescription}</td>
                                <td>{expenseItems.payeeName}</td>
                                <td>{expenseItems.date.toString()}</td>
                                <td>{expenseItems.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
     )
}

export default ExpenseItems;



