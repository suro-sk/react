import React, {useState} from "react";
import {Form, Button, Alert} from 'react-bootstrap';
import styles from './contact.module.scss';

export default function Contact() {

    const [fieldsState, setFieldsState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [sentState, setSentState] = useState(false);

    const handleFieldChange = (e) => {
        setFieldsState({
            ...fieldsState,
            [e.target.name]: e.target.value
        });
        setSentState(false);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(fieldsState),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(async (res) => {
                if (res.status >= 400 && res.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong')
                    }
                }

                setFieldsState({
                    name: '',
                    email: '',
                    message: ''
                });
                setSentState(true);

            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div className={styles.contactPage}>
            <h1 className="text-center">Contact Us</h1>
            <Form
                className="mt-5"
                onSubmit={handleFormSubmit}
            >
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={fieldsState.name}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={fieldsState.email}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        rows={5}
                        value={fieldsState.message}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {
                    sentState &&
                    <Alert variant="success" className="mt-3">
                        Your message successfully sent!
                    </Alert>
                }
            </Form>
        </div>
    )
}