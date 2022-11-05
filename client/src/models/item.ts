interface IExpenseItem {
    payeeName: string,
    expenseDescription: string,
    price: number,
    date: Date,
    id: number
}

export type INewExpenseItem = Omit<IExpenseItem, "id">;

export default IExpenseItem;
