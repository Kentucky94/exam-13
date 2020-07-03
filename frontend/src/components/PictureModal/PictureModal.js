import React from 'react';
import {Button, Modal, ModalBody, ModalFooter} from 'reactstrap';

const PictureModal = props => {
  return (
    <div>
      <Modal size='xl' isOpen={props.isOpen} toggle={props.toggle}>
        <ModalBody>
          <img style={{maxWidth: '100%', margin: '10px auto', display: 'block'}} src={props.image} alt="Some nice pic"/>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PictureModal;