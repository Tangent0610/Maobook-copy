import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Modal, Button } from 'react-bootstrap'
import axios from 'axios'
// 引入 context
import { useAuth } from '../../../context/auth'
// 引入 utils
import { API_URL, IMG_URL } from '../../../utils/config'
// 引入圖片 icon scss
import defaultPet from '../../../img/avatar_pet.png'
import './PetList.scss'
import { BsPencilSquare, BsPlusLg, BsTrash } from 'react-icons/bs'
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AddPet(props) {
  const { user, setUser } = useAuth()
  const [preview, setPreview] = useState('')
  const [addPet, setAddPet] = useState({
    name: '',
    arrDay: '',
    birthday: '',
    gender: '',
    cate: '',
    height: '',
    weight: '',
  })
  const [editErr, setEditErr] = useState({
    name: '',
    arrDay: '',
    birthday: '',
    gender: '',
    cate: '',
  })
  // 性別 radio
  const genderValues = ['1', '2', '3']
  const genderOptions = ['男孩', '女孩', '不確定']
  // 種類 radio
  const cateValues = ['1', '2']
  const cateOptions = ['狗狗', '貓貓']
  // 疫苗 checkbox
  const vaccineValues = ['1', '2', '3']
  const vaccineOptions = ['三合一', '五合一', '狂犬病']
  const [vaccineList, setVaccineList] = useState([])
  // 健康狀態 checkbox
  const healthValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
  const healthOptions = [
    '慢性腎衰竭',
    '糖尿病',
    '下泌尿道症候群',
    '體重過重',
    '關節炎',
    '腸胃敏感',
    '皮膚敏感',
    '心臟疾病',
    '心血管疾病',
    '挑嘴',
    '眼疾',
  ]
  const [healthList, setHealthList] = useState([])
  // sweetalert
  const MySwal = withReactContent(Swal)
  const history = useHistory()

  function handleChange(e) {
    setAddPet({ ...addPet, [e.target.name]: e.target.value })
    setEditErr({ ...editErr, [e.target.name]: '' })
  }

  // 圖片預覽函式
  function handlePreview(e) {
    const file = e.target.files[0]
    e.target.value = null

    const reader = new FileReader()
    reader.addEventListener(
      'load',
      function () {
        setPreview(reader.result)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  function handleImage(e) {
    setAddPet({ ...addPet, image: e.target.files[0] })
  }
  function handleImageDelete() {
    setAddPet({ ...addPet, image: '' })
    setPreview('')
  }

  // 表單有不合法的檢查出現時
  // name 欄位前端檢查
  const handleNameInvalid = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setEditErr({ ...editErr, [e.target.name]: '此欄位不可為空' })
    }
  }
  // Arrival Day 欄位前端檢查
  const handleArrDayInvalid = (e) => {
    e.preventDefault()
    const today = Date.parse(new Date().toDateString())
    const inputDate = Date.parse(e.target.value)
    // console.log(today, inputDate)
    if (e.target.value && inputDate > today) {
      setEditErr({ ...editErr, [e.target.name]: '請選擇早於今天的日期' })
    }
  }
  // birthday 欄位前端檢查
  const handleBirthInvalid = (e) => {
    e.preventDefault()
    if (addPet.arrDay) {
      const arrDate = Date.parse(addPet.arrDay)
      const inputDate = Date.parse(e.target.value)
      if (inputDate > arrDate) {
        setEditErr({ ...editErr, [e.target.name]: '毛孩生日不可晚於到家日' })
      }
    }
  }

  // 上傳圖片用 formData
  async function handleSubmit(e) {
    e.preventDefault()
    if (editErr.name || editErr.arrDay || editErr.birthday) {
      return
    } else {
      try {
        let formData = new FormData()
        formData.append('id', user.id)
        formData.append('image', addPet.image)
        formData.append('name', addPet.name)
        formData.append('arrDay', addPet.arrDay)
        formData.append('birthday', addPet.birthday)
        formData.append('gender', addPet.gender)
        formData.append('cate', addPet.cate)
        formData.append('height', addPet.height)
        formData.append('weight', addPet.weight)
        formData.append('vaccine', vaccineList)
        formData.append('health', healthList)

        let response = await axios.post(`${API_URL}/pet/add`, formData, {
          withCredentials: true,
        })
        console.log(response.data)
        if (response.data.message === 'ok') {
          // setShowModal(true)
          MySwal.fire({
            title: `新增成功！`,
            html: (
              <p>
                歡迎 {addPet.name} 加入{' '}
                {addPet.cate === '1' ? (
                  <span>&#128054;</span>
                ) : (
                  <span>&#128049;</span>
                )}
              </p>
            ),
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              history.push('/member/pet')
            }
          })
        }
      } catch (e) {
        console.error('新增毛孩失敗: ', e.response.data)
        setEditErr({
          ...editErr,
          name: e.response.data.name,
          arrDay: e.response.data.arrDay,
          birthday: e.response.data.birthday,
          gender: e.response.data.gender,
          cate: e.response.data.cate,
        })
      }
    }
  }

  return (
    <form className="position-relative info-card">
      <div className="row">
        {/* 大頭照區域 */}
        <div className="col-lg-5 w-100">
          <div className="embed-responsive embed-responsive-1by1 avatar-info position-relative">
            <img
              alt=""
              className="avatar-cover-fit embed-responsive-item"
              src={defaultPet}
            />
            <img
              alt=""
              className="avatar-cover-fit embed-responsive-item"
              src={preview}
            />
            <div className="edit-avatar position-absolute">
              <div className="position-absolute edit-avatar-icons">
                <label htmlFor="edit-avatar">
                  <BsPencilSquare color="white" />
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      handleImage(e)
                      handlePreview(e)
                    }}
                    id="edit-avatar"
                    className="d-none"
                  />
                </label>
                <button
                  type="button"
                  className="mx-2"
                  onClick={handleImageDelete}
                >
                  <BsTrash color="white" />
                </button>
              </div>
            </div>
          </div>
          {/* 毛孩姓名 */}
          <div className="pt-3 d-flex justify-content-center">
            <span className="required-icon">*</span>
            <input
              type="text"
              className="form-control text-center w-50"
              name="name"
              placeholder="毛孩姓名"
              value={addPet.name}
              onChange={(e) => {
                handleChange(e)
                handleNameInvalid(e)
              }}
            />
          </div>
          <div className="text-center py-1 errMsg">
            {editErr.name ? editErr.name : ''}
          </div>
          <input type="hidden" name="id" value={user.id} />
        </div>
        {/* 個人資料表格 */}
        <div className="col-lg-7 text-nowrap info-table">
          <Table borderless size="sm" responsive="sm">
            <tbody>
              <tr>
                <td>到家日</td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    name="arrDay"
                    value={addPet.arrDay}
                    onChange={(e) => {
                      handleChange(e)
                      handleArrDayInvalid(e)
                    }}
                  />
                  <div className="errMsg">
                    {editErr.arrDay ? editErr.arrDay : ''}
                  </div>
                </td>
              </tr>
              <tr>
                <td>生日</td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    name="birthday"
                    value={addPet.birthday}
                    onChange={(e) => {
                      handleChange(e)
                      handleBirthInvalid(e)
                    }}
                  />
                  <div className="errMsg">
                    {editErr.birthday ? editErr.birthday : ''}
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="require-td">性別</td>
                <td className="edit-gender">
                  {genderValues.map((v, i) => {
                    return (
                      <div key={i} className="form-check-inline">
                        <input
                          type="radio"
                          id={`gender${v}`}
                          value={v}
                          checked={v === `${addPet.gender}`}
                          onChange={handleChange}
                          name="gender"
                        />
                        <label
                          htmlFor={`gender${v}`}
                          className={
                            v === `${addPet.gender}` ? 'active-label' : ''
                          }
                        >
                          {genderOptions[i]}
                        </label>
                      </div>
                    )
                  })}
                </td>
              </tr>
              <tr className={editErr.gender ? '' : 'd-none'}>
                <td></td>
                <td className="errMsg">{editErr.gender}</td>
              </tr>
              <tr>
                <td className="require-td">種類</td>
                <td className="edit-gender">
                  {cateValues.map((v, i) => {
                    return (
                      <div key={i} className="form-check-inline">
                        <input
                          type="radio"
                          id={`cate${v}`}
                          value={v}
                          checked={v === `${addPet.cate}`}
                          onChange={handleChange}
                          name="cate"
                        />
                        <label
                          htmlFor={`cate${v}`}
                          className={
                            v === `${addPet.cate}` ? 'active-label' : ''
                          }
                        >
                          {cateOptions[i]}
                        </label>
                      </div>
                    )
                  })}
                </td>
              </tr>
              <tr className={editErr.cate ? '' : 'd-none'}>
                <td></td>
                <td className="errMsg">{editErr.cate}</td>
              </tr>
              <tr>
                <td>體態</td>
                <td>
                  <div className="d-flex pet-body-data">
                    <input
                      type="number"
                      min="1.0"
                      max="999.9"
                      step="0.1"
                      placeholder="身高 (cm)"
                      className="form-control text-center w-50 mx-1"
                      name="height"
                      value={addPet.height}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                    <input
                      type="number"
                      min="1.0"
                      max="99.9"
                      step="0.1"
                      placeholder="體重 (kg)"
                      className="form-control text-center w-50 mx-1"
                      name="weight"
                      value={addPet.weight}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>疫苗</td>
                <td className="edit-gender">
                  {vaccineValues.map((v, i) => {
                    return (
                      <div key={i} className="form-check-inline">
                        <input
                          type="checkbox"
                          name="vaccine"
                          id={`vaccine${v}`}
                          value={v}
                          checked={vaccineList.includes(v)}
                          onChange={(e) => {
                            if (vaccineList.includes(e.target.value)) {
                              const newVaccineList = vaccineList.filter(
                                (v, i) => v !== e.target.value
                              )
                              setVaccineList(newVaccineList)
                            } else {
                              const newVaccineList = [
                                ...vaccineList,
                                e.target.value,
                              ]
                              setVaccineList(newVaccineList)
                            }
                          }}
                        />
                        <label
                          htmlFor={`vaccine${v}`}
                          className={
                            vaccineList.includes(v) ? 'active-label' : ''
                          }
                        >
                          {vaccineOptions[i]}
                        </label>
                      </div>
                    )
                  })}
                </td>
              </tr>
              <tr>
                <td className="align-baseline">狀態</td>
                <td className="edit-gender">
                  <div className="d-flex flex-wrap health-checkbox">
                    {healthValues.map((v, i) => {
                      return (
                        <div key={i}>
                          <input
                            type="checkbox"
                            name="health"
                            id={`health${v}`}
                            value={v}
                            checked={healthList.includes(v)}
                            onChange={(e) => {
                              if (healthList.includes(e.target.value)) {
                                const newHealthList = healthList.filter(
                                  (v, i) => v !== e.target.value
                                )
                                setHealthList(newHealthList)
                              } else {
                                const newHealthList = [
                                  ...healthList,
                                  e.target.value,
                                ]
                                setHealthList(newHealthList)
                              }
                            }}
                          />
                          <label
                            htmlFor={`health${v}`}
                            className={
                              healthList.includes(v) ? 'active-label' : ''
                            }
                          >
                            {healthOptions[i]}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <button className="edit-icon" title="新增毛孩資料" onClick={handleSubmit}>
        <BsPlusLg color="white" fontSize="1.6rem" />
      </button>
    </form>
  )
}

export default AddPet
