import React, {PureComponent, createRef} from 'react';
import {Modal, Button, FormControl, Form} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../helpers/functions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addTask} from "./store/actions";

class TaskCreateModal extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            date: new Date()
        }

        this.titleInputRef = createRef();
    }

    componentDidMount() {
        this.titleInputRef.current.focus()
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
        this.props.addTask(upcomingTask);
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
                                ref={this.titleInputRef}
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
                    <Button variant="success" onClick={this.handleTaskAdding}>Create</Button>
                    <Button variant="danger" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

TaskCreateModal.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    addTask
};


export default connect(null, mapDispatchToProps)(TaskCreateModal);