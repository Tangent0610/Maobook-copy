import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ModalComponent(props) {
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={props.handleClose}
        backdrop={props.backdrop}
        keyboard={props.keyboard}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Footer className={props.showFooter}>
          <Button variant="secondary" onClick={props.handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={props.handleConfirm}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalComponent
