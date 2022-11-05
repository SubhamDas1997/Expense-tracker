import IExpenseItem from "../models/item";

const getAllPayeeNames = (expenseItems: IExpenseItem[]) => {
    const uniquePayeeName: string[] = [];

    expenseItems.forEach((expenseItems) => {
        let payeeName = expenseItems.payeeName;

        if (!uniquePayeeName.includes(payeeName)) uniquePayeeName.push(payeeName);
    })
    
    return uniquePayeeName;
}

export default getAllPayeeNames;
