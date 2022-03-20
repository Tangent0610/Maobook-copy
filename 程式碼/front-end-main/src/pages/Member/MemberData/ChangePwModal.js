import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { API_URL } from '../../../utils/config'
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ChangePwModal(props) {
  const { setShowModal } = props
  const [changePw, setChangePw] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [editErr, setEditErr] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  // sweetalert
  const MySwal = withReactContent(Swal)

  const handleCloseModal = () => {
    setShowModal(false)
    setChangePw({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })
    setEditErr({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })
  }
  // input onChange
  const handleChange = (e) => {
    setChangePw({ ...changePw, [e.target.name]: e.target.value })
    setEditErr({ ...editErr, [e.target.name]: '' })
  }
  // form submit
  async function handleChangePwSubmit(e) {
    e.preventDefault()
    try {
      let result = await axios.post(`${API_URL}/member/changePw`, changePw, {
        withCredentials: true,
      })
      console.log(result.data)
      if (result.data.message === 'ok') {
        setShowModal(false)
        setChangePw({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        })
        MySwal.fire({
          title: '密碼修改成功！',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
      }
    } catch (e) {
      console.error('error', e.response.data)
      setEditErr({
        ...editErr,
        oldPassword: e.response.data.oldPassword,
        newPassword: e.response.data.newPassword,
        confirmNewPassword: e.response.data.confirmNewPassword,
      })
    }
  }
  // 表單有不合法的檢查出現時
  // 原密碼欄位前端檢查
  const handleOldInvalid = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setEditErr({ ...editErr, [e.target.name]: '此欄位不可為空' })
    }
  }
  // 新密碼欄位前端檢查
  const handleNewInvalid = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setEditErr({ ...editErr, [e.target.name]: '此欄位不可為空' })
    } else if (e.target.value === changePw.oldPassword) {
      setEditErr({ ...editErr, [e.target.name]: '新密碼不可與舊密碼相同' })
    } else if (e.target.value.length < 8) {
      setEditErr({ ...editErr, [e.target.name]: '密碼長度至少為 8 碼唷' })
    }
  }
  // 確認密碼欄位前端檢查
  const handleConfirmInvalid = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setEditErr({ ...editErr, [e.target.name]: '此欄位不可為空' })
    } else if (e.target.value !== changePw.newPassword) {
      setEditErr({ ...editErr, [e.target.name]: '密碼驗證不一致' })
    }
  }
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        animation={false}
        className="changePw-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>修改密碼</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container px-5">
            <div className="form-group row">
              <label
                htmlFor="oldPassword"
                className="col-4 col-form-label text-center"
              >
                原密碼
              </label>
              <div className="col-6">
                <input
                  type="password"
                  className="form-control "
                  id="oldPassword"
                  name="oldPassword"
                  value={changePw.oldPassword}
                  onChange={(e) => {
                    handleChange(e)
                    handleOldInvalid(e)
                  }}
                />
                <div className="errMsg">
                  {editErr.oldPassword ? editErr.oldPassword : ''}
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="newPassword"
                className="col-4 col-form-label text-center"
              >
                新密碼
              </label>
              <div className="col-6">
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={changePw.newPassword}
                  onChange={(e) => {
                    handleChange(e)
                    handleNewInvalid(e)
                  }}
                />
                <div className="errMsg">
                  {editErr.newPassword ? editErr.newPassword : ''}
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="confirmNewPassword"
                className="col-4 col-form-label text-center"
              >
                確認新密碼
              </label>
              <div className="col-6">
                <input
                  type="password"
                  className="form-control"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={changePw.confirmNewPassword}
                  onChange={(e) => {
                    handleChange(e)
                    handleConfirmInvalid(e)
                  }}
                />
                <div className="errMsg">
                  {editErr.confirmNewPassword ? editErr.confirmNewPassword : ''}
                </div>
              </div>
            </div>
            <div className="text-center my-3">
              <button
                type="button"
                className="btn btn-secondary mx-1"
                onClick={handleCloseModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={handleChangePwSubmit}
              >
                確認
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ChangePwModal
