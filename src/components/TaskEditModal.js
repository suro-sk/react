import React, {PureComponent, createRef} from 'react';
import {Modal, Button, FormControl, Form} from 'react-bootstrap'
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import {connect} from 'react-redux';
import {editTask} from "./store/actions";
import {formatDate} from "../helpers/functions";

class TaskEditModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...props.task,
            date: props.task.date ? new Date(props.task.date) : new Date()
        }

        this.titleInputRef = createRef();
    }

    componentDidMount() {
        this.titleInputRef.current.focus();
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleDateChange = (val) => {
        this.setState({
            date: val || new Date()
        })
    }

    handleTaskSave = (e) => {
        e.preventDefault();
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        this.props.editTask({
            _id: this.state._id,
            title,
            description,
            date: formatDate(this.state.date.toISOString())
        });
    };

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
                        Edit Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleTaskSave}>

                        <Form.Group>
                            <FormControl
                                placeholder="Task Title"
                                aria-label="Task Title"
                                aria-describedby="basic-addon2"
                                name="title"
                                onChange={this.handleChange}
                                value={this.state.title}
                                ref={this.titleInputRef}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                placeholder="Task Description"
                                name="description"
                                as="textarea"
                                value={this.state.description}
                                onChange={this.handleChange}
                                rows={4}/>
                        </Form.Group>
                        <Form.Group>
                            <DatePicker
                                className="form-control"
                                minDate={new Date()}
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={this.handleTaskSave}>Save</Button>
                    <Button variant="danger" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

TaskEditModal.propTypes = {
    task: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    editTask
};

export default connect(null, mapDispatchToProps)(TaskEditModal);