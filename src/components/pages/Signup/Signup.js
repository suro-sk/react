import React, {useState} from "react";
import {Button, Card, Row, Col, Form} from "react-bootstrap";
import {connect} from 'react-redux';
import styles from './Signup.module.scss';
import {signUp} from "../../store/actions";

function Signup({signUp}) {

    let emptyMsg = 'This field can\'t be empty';

    let [fieldValues, setFieldValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    let [formErrors, setformErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
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

        if (name === 'password' || name === 'confirmPassword') {
            let anotherFieldValue = name === 'password' ? fieldValues.confirmPassword : fieldValues.password;
            if (value !== anotherFieldValue) {
                setformErrors({
                    ...formErrors,
                    confirmPassword: 'Passwords must match'
                })
            } else {
                setformErrors({
                    ...formErrors,
                    confirmPassword: null,
                    passwordpassword: null,
                })
            }
        }

        if (name === 'password' && value && value.trim().length < 6) {
            setformErrors({
                ...formErrors,
                passwordpassword: 'Password must be at least 6 characters'
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
                confirmPassword: emptyMsg
            });

            return false;
        }

        if (hasErrors) {
            return false;
        }

        signUp(fieldValues);
    }

    let {name, surname, email, password, confirmPassword} = fieldValues;

    return (
        <div className={styles.accountForm}>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={8} lg={5}>
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
                                <Form.Group controlId="confirmPassword">
                                    <Form.Control type="password" placeholder="Password confirmation"
                                                  value={confirmPassword}
                                                  name="confirmPassword"
                                                  onChange={handleUserInput}/>
                                    {
                                        formErrors.confirmPassword &&
                                        <Form.Text className={styles.errorMsg}>
                                            {formErrors.confirmPassword}
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

const mapDispatchToProps = {
    signUp
};

export default connect(null, mapDispatchToProps)(Signup);