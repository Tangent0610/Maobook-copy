import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function SignUpModal(props) {
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.handleCloseModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={props.showBody}>請登入並設定個人資料</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleCloseModal}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SignUpModal
