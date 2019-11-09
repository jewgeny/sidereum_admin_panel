import React from "react";
import { ButtonToolbar, Modal } from 'react-bootstrap';
import "../../styles/modalbox.css";

const ModalBoxNewProduct = (props) => {
    return (
      <ButtonToolbar>
        <Modal
         className="modalBox"
          size="lg"
          show={props.showNewProductModal}
          onHide={props.hideNewProductModal}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Neuen Sarg hinzufügen
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="widthBody">
              ...jo Daniel, du machst das schon :)
            </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }

  export default ModalBoxNewProduct;
  