import React, {useState} from "react";
import {Button, Card, Row, Col, Form} from "react-bootstrap";
import styles from './Signin.module.scss';

function Signin(props) {

    let emptyMsg = 'This field can\'t be empty';

    let [fieldValues, setFieldValues] = useState({
        email: '',
        password: '',
    });

    let [formErrors, setformErrors] = useState({
        email: null,
        password: null,
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

            return false;
        } else {
            setformErrors({
                ...formErrors,
                [name]: null
            })

        }

        if (name === 'email' && !emailRegex.test(value.trim().toLowerCase())) {
            setformErrors({
                ...formErrors,
                email: 'Incorrect email address'
            })
        }

        if (name === 'password' && value.trim().length < 6) {
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
                email: emptyMsg,
                password: emptyMsg,
            });

            return false;
        }

        if (hasErrors) {
            return false;
        }

        // Form Submission
    }

    let {email, password} = fieldValues;

    return (
        <div className={styles.accountForm}>
            <Row className="justify-content-center mt-5">
                <Col xs={6}>
                    <Form onSubmit={handleFormSubmit}>
                        <Card style={{width: '100%'}}>
                            <Card.Header>
                                <h2 className="text-center">Sign In</h2>
                            </Card.Header>
                            <Card.Body>
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
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="primary" type="submit">
                                    Sign In
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}


export default Signin;