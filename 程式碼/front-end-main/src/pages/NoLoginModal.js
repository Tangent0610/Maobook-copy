import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import loading from '../img/loading_paw.svg'

function NoLoginModal(props) {
  return (
    <div className="member-content position-relative">
      <Modal
        show={props.showModal}
        onHide={props.handleCloseModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>尚未登入</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleCloseModal}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="text-center position-absolute loading-paw">
        <div className="spinner-grow text-primary" role="status">
          <img alt="" className="sr-only" src={loading} />
        </div>
      </div>
    </div>
  )
}

export default NoLoginModal
