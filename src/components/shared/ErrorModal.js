import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ErrorModal = (props) => {
    return (
        props.error ? 
            <Modal show={props.error} onClick={props.handleClose}>
                <Modal.Header closeButton onClick={props.handleClose}>
                <Modal.Title>{props.error.code ? `${props.error.code} Error happens` : `Cannot get weather of the required city name.`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.error.message ? `${props.error.message.replace('locationInfo.data[0]','Location name')}` : `Please re-input the city name then try again. Sometimes a typo mistake can make the result unfetchable.`}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    Close
                </Button>
                
                </Modal.Footer>
            </Modal> :
            <div></div> 
    )
}

export default ErrorModal;