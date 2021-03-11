import React, {useState} from "react";
import {Button, Card, Row, Col, Form} from "react-bootstrap";
import styles from './Signup.module.scss';

function Signup(props) {

    let emptyMsg = 'This field can\'t be empty';

    let [fieldValues, setFieldValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirm: '',
    });

    let [formErrors, setformErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        password_confirm: null
    });


    let handleUserInput = (e) => {
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

        if (name === 'password' || name === 'password_confirm') {
            let anotherFieldValue = name === 'password' ? fieldValues.password_confirm : fieldValues.password;
            if (value !== anotherFieldValue) {
                setformErrors({
                    ...formErrors,
                    password_confirm: 'Passwords must match'
                })
            }
            else {
                setformErrors({
                    ...formErrors,
                    password_confirm: null
                })
            }
        }

        if (name === 'password' && value && value.trim().length < 6) {
            setformErrors({
                ...formErrors,
                password: 'Password must be at least 6 characters'
            })
        }

    }


    let handleFormSubmit = (e) => {
        e.preventDefault();

        let isEmpty = Object.values(fieldValues).every(item => item === '');
        let hasErrors = Object.values(formErrors).some(item => item !== null);

        if (isEmpty && !hasErrors) {
            setformErrors({
                name: emptyMsg,
                surname: emptyMsg,
                email: emptyMsg,
                password: emptyMsg,
                password_confirm: emptyMsg
            });

            return false;
        }

        if (hasErrors) {
            return false;
        }

        // Form Submission
    }

    let {name, surname, email, password, password_confirm} = fieldValues;

    return (
        <div className={styles.accountForm}>
            <Row className="justify-content-center mt-5">
                <Col xs={6}>
                    <Form onSubmit={handleFormSubmit}>
                        <Card style={{width: '100%'}}>
                            <Card.Header>
                                <h2 className="text-center">Sign Up</h2>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group controlId="name">
                                    <Form.Control type="text" placeholder="First name" value={name}
                                                  name="name"
                                                  onChange={handleUserInput}/>
                                    {
                                        formErrors.name &&
                                        <Form.Text className={styles.errorMsg}>
                                            {formErrors.name}
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group controlId="surname">
                                    <Form.Control type="text" placeholder="Last name" value={surname}
                                                  name="surname"
                                                  onChange={handleUserInput}/>
                                    {
                                        formErrors.surname &&
                                        <Form.Text className={styles.errorMsg}>
                                            {formErrors.surname}
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Control type="text" placeholder="Enter email" value={email}
                                                  name="email"
                                                  onChange={handleUserInput}/>
                                    {
                                        formErrors.email &&
                                        <Form.Text className={styles.errorMsg}>
                                            {formErrors.email}
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Control type="password" placeholder="Password" value={password}
                                                  name="password"
                                                  onChange={handleUserInput}/>
                                    {
                                        formErrors.password &&
                                        <Form.Text className={styles.errorMsg}>
                                            {formErrors.password}
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group controlId="password_confirm">
                                    <Form.Control type="password" placeholder="Password confirmation"
                                                  value={password_confirm}
                                                  name="password_confirm"
                                                  onChange={handleUserInput}/>
                                    {
                                        formErrors.password_confirm &&
                                        <Form.Text className={styles.errorMsg}>
                                            {formErrors.password_confirm}
                                        </Form.Text>
                                    }
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}


export default Signup;