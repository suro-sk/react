import React, {PureComponent } from 'react';
import {Modal, Button, FormControl, Form} from 'react-bootstrap'
import PropTypes from 'prop-types';

class TaskEditModal extends PureComponent  {

    constructor(props) {
        super(props);
        this.state = {
            ...props.task
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleTaskSave = ()=>{
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        this.props.onAccept({
            _id: this.state._id,
            title,
            description
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
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={this.handleTaskSave}>Create</Button>
                    <Button variant="danger" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

TaskEditModal.propTypes = {
    task: PropTypes.object.isRequired,
    onAccept: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default TaskEditModal;