import axios from "axios";
import IExpenseItem from "../models/item";
import { INewExpenseItem } from "../models/item";

const itemsURL = "http://localhost:4001/items";

const fetchAllExpenseItems = async () => {
    const response = await axios.get<IExpenseItem[]>(itemsURL);
    return response.data;
}

const postExpenseItem = async (newExpenseItem: INewExpenseItem) => {
    const response = await axios.post<IExpenseItem>(itemsURL, newExpenseItem, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export {fetchAllExpenseItems, postExpenseItem};
