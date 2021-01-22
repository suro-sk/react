import React, {Component} from 'react';
import {Modal, Button, FormControl, Form} from 'react-bootstrap'
import PropTypes from 'prop-types';

class TaskCreateModal extends Component {
    render() {
        const {onHide, onInputChange, onAccept} = this.props
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
                    <Form onSubmit={onAccept}>

                        <Form.Group>
                            <FormControl
                                placeholder="Task Name"
                                aria-label="Add Your Task"
                                aria-describedby="basic-addon2"
                                name="title"
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                placeholder="Task Description"
                                name="description"
                                as="textarea"
                                onChange={onInputChange}
                                rows={4}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success" onClick={onAccept}>Create</Button>
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