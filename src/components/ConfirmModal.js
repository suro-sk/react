import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';

function ConfirmModal(props) {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want do delete {props.tasksCount} task{props.tasksCount > 1 ? 's' : ''}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer className="justify-content-center">
                <Button variant="danger" onClick={props.onAccept}>Delete</Button>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

ConfirmModal.propTypes = {
    tasksCount: PropTypes.number.isRequired,
    onAccept: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default ConfirmModal;