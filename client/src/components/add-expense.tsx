import { FormEvent, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import getAllPayeeNames from "../services/expense-utils";
import IExpenseItem from "../models/item";
import { INewExpenseItem } from "../models/item";
import { postExpenseItem } from "../services/json-service-connection";

type AddExpenseModel = {
    expenseItems: IExpenseItem[];
    refreshParent: (newExpenseItem: IExpenseItem) => void;
}

const AddNewExpense = ({ expenseItems, refreshParent }: AddExpenseModel) => {
    const [show, setShow] = useState(false);

    const expenseDescriptionRef = useRef<HTMLInputElement>(null);
    const payeeRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleAddExpense = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newExpenseItem: INewExpenseItem = {
            expenseDescription: expenseDescriptionRef.current?.value as string,
            payeeName: payeeRef.current?.value as string,
            price: parseFloat(priceRef.current?.value as string),
            date: new Date()
        }

        const newExpense = await postExpenseItem(newExpenseItem);

        refreshParent(newExpense);

        handleClose();
    }

    return (
        <>
            <Button variant="success" className="float-end" onClick={handleShow}>Add Expense</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a new expense</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleAddExpense}>
                        <Form.Group className="mb-3" controlId="expenseDescription">
                            <Form.Label>What was the expense on?</Form.Label>
                            <Form.Control type="text" placeholder="Enter Expense Details" ref = {expenseDescriptionRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="payeeName">
                            <Form.Label>Who Paid?</Form.Label>
                            <Form.Select aria-label="Default select example" ref = {payeeRef}>
                                <option>-- Select payee --</option>
                                {
                                    getAllPayeeNames(expenseItems).map((payeeName, index) => {
                                        return <option key={index} value={payeeName}>{payeeName}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>How much was the expenditure?</Form.Label>
                            <Form.Control type="number" placeholder="Enter the expense amount" ref = {priceRef} />
                        </Form.Group>

                        <Button variant="danger" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddNewExpense;