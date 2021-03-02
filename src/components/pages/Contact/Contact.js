import React, {useState} from "react";
import {Form, Button, Alert} from 'react-bootstrap';
import styles from './contact.module.scss';

export default function Contact() {

    const [fieldsState, setFieldsState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [fieldsErrorsState, setFieldsErrorsState] = useState({
        name: null,
        email: null,
        message: null
    });

    const [formState, setFormState] = useState({
        isSent: false,
        isValid: false
    });

    const handleFieldChange = (e) => {
        const {value, name} = e.target,
            emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setFieldsState({
            ...fieldsState,
            [name]: value
        });


        if (!value.trim()) {
            setFieldsErrorsState({
                ...fieldsErrorsState,
                [name]: 'This field can\'t be empty'
            })
        } else {
            setFieldsErrorsState({
                ...fieldsErrorsState,
                [name]: null
            })
        }

        if (name === 'email' && value && !emailRegex.test(value.toLowerCase())) {
            setFieldsErrorsState({
                ...fieldsErrorsState,
                email: 'Incorrect email address'
            })
        }


    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const hasErrors = !Object.values(fieldsErrorsState).every(item => item === null),
            hasValues = !Object.values(fieldsState).some(item => item === '');

        if (!hasValues && !hasErrors) {
            setFieldsErrorsState({
                name: `Name can't be empty.`,
                email: `Email can't be empty.`,
                message: `Message can't be empty.`
            });
        }

        if (hasValues && !hasErrors) {
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
                    setFormState({
                        isValid: false,
                        isSent: true
                    });

                })
                .catch((e) => {
                    console.log(e);
                });
        }
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
                    <Form.Text className="text-muted">
                        {fieldsErrorsState.name}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={fieldsState.email}
                        onChange={handleFieldChange}
                    />
                    <Form.Text className="text-muted">
                        {fieldsErrorsState.email}
                    </Form.Text>
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
                    <Form.Text className="text-muted">
                        {fieldsErrorsState.message}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {
                    formState.isSent &&
                    <Alert variant="success" className="mt-3">
                        Your message successfully sent!
                    </Alert>
                }
            </Form>
        </div>
    )
}