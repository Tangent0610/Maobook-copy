import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useAuth } from '../../context/auth'
import { API_URL, IMG_URL } from '../../utils/config'
import Swal from 'sweetalert2'

import { ButtonGroup, Button, Form } from 'react-bootstrap'
import './components/HelpPost.scss'
import cameraicon from './img/camera.svg'

function HelpPost(props) {
  const { user, setUser } = useAuth()
  const [errMsg, setErrMsg] = useState({ msg: '' })

  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')
  const [region, setRegion] = useState('')
  const [price, setPrice] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [cardInfo, setCardInfo] = useState('')
  const [preview, setPreview] = useState('')

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
    setCardInfo({ ...cardInfo, image: e.target.files[0] })
  }

  const [helppost, setHelppost] = useState({
    // user_id_giver: '',
    category: '狗狗',
    tag: '1',
    date: '',
    region: '台北市',
    price: '請輸入金額',
    title: '請輸入標題',
    content: '請輸入內容',
    image: '',
  })

  function handleHelpChange(e) {
    setHelppost({ ...helppost, [e.target.name]: e.target.value })
  }

  async function handleHelpSubmit(e) {
    Swal.fire('發案成功', '', 'success')
    e.preventDefault() 
    try {
      let response = await axios.post(`${API_URL}/help/helppost`, helppost, {
        withCredentials: true,
      })
      console.log('Add資料', response.data)
    } catch (e) {
      console.error('發案失敗', e.response.data)
      Swal.fire({
        icon: 'error',
        title: '案件送出失敗',
        text: { ...errMsg, msg: e.response.data.msg },
      })
    }
  }


  return (
    <>
      <h1 className="helpposttitle1">忙碌的你</h1>

      <div className="bg-primary position-relative">
        <div className="helppost">
          <h2 className="helpposttitle2">需要幫忙嗎</h2>

          {user ? (

          <div className="helppostinput">


            <div className="helppostimage">
            <label
                  htmlFor="fileUploader"
                  className="img-uploader"
                  title="點擊上傳圖片"
                >
                  <img
                    className={preview ? 'previewer' : 'd-none'}
                    src={preview}
                    alt=""
                  />
                  <input
                    type="file"
                    id="fileUploader"
                    className="d-none w-100"
                    onChange={(e) => {
                      handleImage(e)
                      handlePreview(e)
                    }}
                    name="image"
                  />
                  </label>
              {/* <img src={cameraicon} className="cameraicon" alt="" /> */}
            </div>

            <div className="helppostcategory">
            <fieldset id="category">
            <label
                  for="狗狗"
                  className={`categoryPostButton1 lg ${
                    category === '狗狗' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    id="狗狗"
                    name="category"
                    value="狗狗"
                    check={'狗狗' === category}
                    onClick={(e) => {
                      setCategory(e.target.value)
                      handleHelpChange(e)
                    }}
                    className="helpPostCircle"
                  />
                  <span className="helpPostButtontext">狗 狗</span>
                </label>

                <label
                  for="貓貓"
                  className={`categoryPostButton2 lg ${
                    category === '貓貓' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    id="貓貓"
                    name="category"
                    value="貓貓"
                    check={'貓貓' === category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      handleHelpChange(e)
                    }}
                    className="helpPostCircle"
                  />
                  <span className="helpPostButtontext">貓 貓</span>
                </label>
              </fieldset>
            </div>

            <div className="helppostinfo">
              <div className="helppostdate">
                <input
                  className="helpchoosedate"
                  type="date"
                  name="date"
                  value={helppost.date}
                  onChange={handleHelpChange}
                />
              


                <div className="helpdropdownregion">
                <div class="dropdown">
                  <select
                      name="region"
                      title='選擇地區'
                      className="postchooseregion"
                      type="select"
                      value={helppost.region}
                      onChange={handleHelpChange}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                  >
                    <option className="dropdown-item" value="台北市">台北市</option>
                    <option className="dropdown-item" value="桃園市">桃園市</option>
                    <option className="dropdown-item" value="台中市">台中市</option>
                    <option className="dropdown-item" value="台南市">台南市</option>
                    <option className="dropdown-item" value="高雄市">高雄市</option>
                   </select>
                  </div>
                </div>
                
                <div>
                  <label for="price" className="helppostpricetitle">
                    報酬 $
                  </label>
                  <input
                    className="helppostprice"
                    type="text"
                    id="price"
                    name="price"
                    value={helppost.price}
                    onChange={handleHelpChange}
                  />
                </div>
                </div>
              
              <div className="helpposttag">
              <fieldset id="tag">

              <label for="代遛" className={`helptag1 ${tag === '1' ? 'active' : ''}`}>
                <input type="radio" id="代遛" name="tag" value="1" check={'1' === tag}
                      onChange={(e) => {
                        setTag(e.target.value) 
                        handleHelpChange(e)}}
                      className="helpPostCircle"/>
                    <span className="helptagtext">代遛</span>
                  </label>

                <label for="代買" className={`helptag2 ${tag === '2' ? 'active' : ''}`}>
                <input type="radio" id="代買" name="tag" value="2" check={'2' === tag}
                      onChange={(e) => {
                        setTag(e.target.value) 
                        handleHelpChange(e)}}
                      className="helpPostCircle"/>
                    <span className="helptagtext">代買</span>
                  </label>

                <label for="收養" className={`helptag3 ${tag === '3' ? 'active' : ''}`}>
                <input type="radio" id="收養" name="tag" value="3" check={'3' === tag}
                      onChange={(e) => {
                        setTag(e.target.value) 
                        handleHelpChange(e)}}
                      className="helpPostCircle"/>
                    <span className="helptagtext">收養</span>
                  </label>
                
                <label for="借宿" className={`helptag4 ${tag === '4' ? 'active' : ''}`}>
                <input type="radio" id="借宿" name="tag" value="4" check={'4' === tag}
                      onChange={(e) => {
                        setTag(e.target.value) 
                        handleHelpChange(e)}}
                      className="helpPostCircle"/>
                    <span className="helptagtext">借宿</span>
                  </label>


                <label for="便車" className={`helptag5 ${tag === '5' ? 'active' : ''}`}>
                <input type="radio" id="便車" name="tag" value="5" check={'5' === tag}
                      onChange={(e) => {
                        setTag(e.target.value) 
                        handleHelpChange(e)}}
                      className="helpPostCircle"/>
                    <span className="helptagtext">便車</span>
                  </label>
                
                <label for="其他" className={`helptag6 ${tag === '6' ? 'active' : ''}`}>
                <input type="radio" id="其他" name="tag" value="6" check={'6' === tag}
                      onChange={(e) => {
                        setTag(e.target.value) 
                        handleHelpChange(e)}}
                      className="helpPostCircle"/>
                    <span className="helptagtext">其他</span>
                  </label>

                </fieldset>
              </div>
            </div>

            <div className="helpposttext">
              <div className="helpposttitleandcontent">
                <div>
                  <textarea className="givertitle" name="title" value={helppost.title}
                    onChange={handleHelpChange}>標題</textarea>
                  <textarea className="helptextarea" name="content" value={helppost.content}
                    onChange={handleHelpChange}>案件內容</textarea>
                </div>
              </div>
              <button className="helpSummitButton" type="submit" onClick={handleHelpSubmit}
                data-dismiss="alert">送 出</button>
            </div>
          </div>
           ) : (
            <div className="helppostunlogin">登入後才能發案喔</div>
          )}
        </div>
      </div>
    </>
  )
}

export default HelpPost