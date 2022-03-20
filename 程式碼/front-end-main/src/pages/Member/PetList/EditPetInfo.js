import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Modal, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
// 引入 utils
import { API_URL, IMG_URL } from '../../../utils/config'
// 引入 圖片 icon css
import { BsReply, BsPencilSquare, BsTrash } from 'react-icons/bs'
import defaultPet from '../../../img/avatar_pet.png'
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function EditPetInfo(props) {
  const history = useHistory()
  const { pet, setPet } = props
  console.log('pet state: ', pet)
  const [preview, setPreview] = useState('')
  const [editErr, setEditErr] = useState({
    name: '',
    arrDay: '',
    birthday: '',
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
  // 毛孩現況
  const petStatusValue = ['1', '2', '3', '4', '9']
  const petStatusOptions = [
    '活躍中(預設)',
    '已送養',
    '失蹤中',
    '在天堂',
    '刪除所有資料',
  ]
  // sweetalert
  const MySwal = withReactContent(Swal)

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value })
    setEditErr({ ...editErr, [e.target.name]: '' })
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
    if (e.target.value && inputDate > today) {
      setEditErr({ ...editErr, [e.target.name]: '請選擇早於今天的日期' })
    }
  }
  // birthday 欄位前端檢查
  const handleBirthInvalid = (e) => {
    e.preventDefault()
    const inputDate = Date.parse(e.target.value)
    if (pet.arrDay) {
      const arrDate = Date.parse(pet.arrDay)
      if (inputDate > arrDate) {
        setEditErr({ ...editErr, [e.target.name]: '毛孩生日不可晚於到家日' })
      }
    } else if (inputDate) {
      const today = Date.parse(new Date().toDateString())
      if (inputDate > today) {
        setEditErr({ ...editErr, [e.target.name]: '請選擇早於今天的日期' })
      }
    }
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
    setPet({ ...pet, image: e.target.files[0] })
  }
  function handleImageDelete() {
    setPet({ ...pet, image: '' })
    setPreview('')
  }

  // 刪除所有資料 alert
  useEffect(() => {
    if (pet.valid === '9') {
      MySwal.fire({
        title: '注意！刪除動作無法復原',
        text: '毛孩列表將不再顯示該位毛孩',
        icon: 'warning',
        confirmButtonText: '確認',
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
    }
  }, [pet])

  // 上傳圖片用 formData
  async function handleSubmit(e) {
    e.preventDefault()
    if (editErr.name || editErr.arrDay || editErr.birthday) {
      return
    } else {
      try {
        let formData = new FormData()
        formData.append('id', pet.id)
        formData.append('image', pet.image)
        formData.append('name', pet.name)
        formData.append('arrDay', pet.arrDay)
        formData.append('birthday', pet.birthday)
        formData.append('ageCate', pet.ageCate)
        formData.append('gender', pet.gender)
        formData.append('cate', pet.cate)
        formData.append('valid', pet.valid)
        formData.append('vaccine', pet.vaccine)
        formData.append('health', pet.health)

        let response = await axios.post(`${API_URL}/pet/editInfo`, formData, {
          withCredentials: true,
        })
        console.log(response.data)
        if (response.data.message === 'ok') {
          MySwal.fire({
            title: '修改成功！',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              if (pet.valid === '9') {
                history.push('/member/pet')
              } else {
                history.push({
                  pathname: '/member/pet/info',
                  state: { selectedPet: pet.id },
                })
              }
            }
          })
        }
      } catch (e) {
        console.error('編輯毛孩失敗: ', e.response.data)
        setEditErr({
          ...editErr,
          name: e.response.data.name,
          arrDay: e.response.data.arrDay,
          birthday: e.response.data.birthday,
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
              src={pet.image.length ? `${IMG_URL}${pet.image}` : defaultPet}
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
          <div className="pt-3 px-5">
            <div className="d-flex justify-content-center mb-2">
              <span className="required-icon">*</span>
              <input
                type="text"
                className="form-control text-center w-50"
                name="name"
                placeholder="毛孩姓名"
                value={pet.name}
                onChange={(e) => {
                  handleChange(e)
                  handleNameInvalid(e)
                }}
              />
            </div>
            <select
              name="valid"
              value={pet.valid}
              onChange={(e) => handleChange(e)}
              className="form-control"
            >
              {petStatusValue.map((v, i) => {
                return (
                  <option key={v} value={v}>
                    {petStatusOptions[i]}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="text-center py-1 errMsg">
            {editErr.name ? editErr.name : ''}
          </div>
          <input type="hidden" name="id" value={pet.id} />
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
                    value={pet.arrDay && pet.arrDay}
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
                    value={pet.birthday && pet.birthday}
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
                          checked={v === `${pet.gender}`}
                          onChange={handleChange}
                          name="gender"
                        />
                        <label
                          htmlFor={`gender${v}`}
                          className={
                            v === `${pet.gender}` ? 'active-label' : ''
                          }
                        >
                          {genderOptions[i]}
                        </label>
                      </div>
                    )
                  })}
                </td>
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
                          checked={v === `${pet.cate}`}
                          onChange={handleChange}
                          name="cate"
                        />
                        <label
                          htmlFor={`cate${v}`}
                          className={v === `${pet.cate}` ? 'active-label' : ''}
                        >
                          {cateOptions[i]}
                        </label>
                      </div>
                    )
                  })}
                </td>
              </tr>
              <tr>
                <td>體態</td>
                <td>
                  <Link
                    to={{
                      pathname: '/member/pet/data/edit',
                      state: { selectedPet: pet.id },
                    }}
                  >
                    <button className="btn btn-secondary">編輯體態資料</button>
                  </Link>
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
                          defaultValue={v}
                          checked={pet.vaccine.includes(v)}
                          onChange={(e) => {
                            if (pet.vaccine.includes(e.target.value)) {
                              const newVaccineList = pet.vaccine.filter(
                                (v, i) => v !== e.target.value
                              )
                              setPet({ ...pet, vaccine: newVaccineList })
                            } else {
                              const newVaccineList = [
                                ...pet.vaccine,
                                e.target.value,
                              ]
                              setPet({ ...pet, vaccine: newVaccineList })
                            }
                          }}
                        />
                        <label
                          htmlFor={`vaccine${v}`}
                          className={
                            pet.vaccine.includes(v) ? 'active-label' : ''
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
                            defaultValue={v}
                            checked={pet.health.includes(v)}
                            onChange={(e) => {
                              if (pet.health.includes(e.target.value)) {
                                const newHealthList = pet.health.filter(
                                  (v, i) => v !== e.target.value
                                )
                                setPet({ ...pet, health: newHealthList })
                              } else {
                                const newHealthList = [
                                  ...pet.health,
                                  e.target.value,
                                ]
                                setPet({ ...pet, health: newHealthList })
                              }
                            }}
                          />
                          <label
                            htmlFor={`health${v}`}
                            className={
                              pet.health.includes(v) ? 'active-label' : ''
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
      <button className="edit-icon" title="儲存毛孩資料" onClick={handleSubmit}>
        <BsReply color="white" fontSize="1.6rem" />
      </button>
    </form>
  )
}

export default withRouter(EditPetInfo)
