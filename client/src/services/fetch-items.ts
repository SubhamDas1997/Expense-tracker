import axios from "axios";
import IExpenseItem from "../models/item";


const fetAllExpenseItems = async () => {
    const itemsURL = "http://localhost:4001/items";
    const response = await axios.get<IExpenseItem[]>(itemsURL);
    return response.data;
}

export default fetAllExpenseItems;
