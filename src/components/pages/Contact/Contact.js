import React, {useState, useEffect} from "react";
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {sendContactForm} from "../../store/actions";
import styles from './contact.module.scss';

function Contact({sendContactForm, contactFormSent}) {

    let emptyMsg = 'This field can\'t be empty';

    let [fieldValues, setFieldValues] = useState({
        name: '',
        email: '',
        message: '',
    });

    let [formErrors, setformErrors] = useState({
        name: null,
        email: null,
        message: null,
    });

    useEffect(() => {
        if (contactFormSent) {
            setFieldValues({
                name: '',
                email: '',
                message: '',
            });
        }
    }, [contactFormSent])

    const handleFieldChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setFieldValues({
            ...fieldValues,
            [name]: value
        });

        if (!value.trim()) {
            setformErrors({
                ...formErrors,
                [name]: emptyMsg
            })
        } else {
            setformErrors({
                ...formErrors,
                [name]: null
            })
        }

        if (name === 'email' && value && !emailRegex.test(value.toLowerCase())) {
            setformErrors({
                ...formErrors,
                email: 'Incorrect email address'
            })
        }


    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        let isEmpty = Object.values(fieldValues).every(item => item === '');
        let hasErrors = Object.values(formErrors).some(item => item !== null);

        if (isEmpty && !hasErrors) {
            setformErrors({
                name: emptyMsg,
                email: emptyMsg,
                message: emptyMsg,
            });

            return false;
        }

        if (hasErrors) {
            return false;
        }

        sendContactForm(fieldValues);

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
                        value={fieldValues.name}
                        onChange={handleFieldChange}
                    />
                    {
                        formErrors.name &&
                        <Form.Text className={styles.errorMsg}>
                            {formErrors.name}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={fieldValues.email}
                        onChange={handleFieldChange}
                    />
                    {
                        formErrors.email &&
                        <Form.Text className={styles.errorMsg}>
                            {formErrors.email}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        rows={5}
                        value={fieldValues.message}
                        onChange={handleFieldChange}
                    />
                    {
                        formErrors.message &&
                        <Form.Text className={styles.errorMsg}>
                            {formErrors.message}
                        </Form.Text>
                    }
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contactFormSent: state.contactFormSent,
    };
};

const mapDispatchToProps = {
    sendContactForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);