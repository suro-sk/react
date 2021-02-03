import React, {PureComponent} from 'react';
import {Modal, Button, FormControl, Form, Spinner} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../helpers/functions';
import PropTypes from 'prop-types';

class TaskCreateModal extends PureComponent {

    state = {
        title: '',
        description: '',
        isLoading: false,
        date: new Date()
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleTaskAdding = (e) => {
        e.preventDefault();
        let upcomingTaskTitle = this.state.title.trim(),
            upcomingTaskDescription = this.state.description.trim();
        if (!upcomingTaskTitle) return;

        let upcomingTask = {
            title: upcomingTaskTitle,
            description: upcomingTaskDescription,
            date: formatDate(this.state.date.toISOString())
        };
        this.setState({
            isLoading: true
        })
        this.props.onAccept(upcomingTask);
    }

    handleDateChange = (val) => {
        this.setState({
            date: val || new Date()
        })
    }

    render() {
        const {onHide} = this.props
        return (
            <Modal
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create New Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleTaskAdding}>

                        <Form.Group>
                            <FormControl
                                placeholder="Task Name"
                                aria-label="Add Your Task"
                                aria-describedby="basic-addon2"
                                name="title"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                placeholder="Task Description"
                                name="description"
                                as="textarea"
                                onChange={this.handleInputChange}
                                rows={4}/>
                        </Form.Group>
                        <Form.Group>
                            <DatePicker
                                className="form-control"
                                minDate = {new Date()}
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={this.handleTaskAdding}>{this.state.isLoading ?
                        <Spinner animation="border" variant="light" size="sm"/> : 'Create'}</Button>
                    <Button variant="danger" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

TaskCreateModal.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default TaskCreateModal;