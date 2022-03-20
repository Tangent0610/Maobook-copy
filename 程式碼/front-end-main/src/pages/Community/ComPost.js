import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import './style/ComPost.scss'
import axios from 'axios'
import Swal from 'sweetalert2'

// 引入 context
import { useAuth } from '../../context/auth'
// 引入 utils
import { API_URL, IMG_URL } from '../../utils/config'

// 引入圖片
import 'react-icons'

function ComPost(modalProps) {
  const { cardID, getPages } = modalProps
  const { user, setUser } = useAuth()
  // 日常 || 討論 //
  let [whichForm, setWhichForm] = useState('0')

  function handleChange(e) {
    // setWhichForm({ ...whichForm, [e.target.name]: e.target.value })
  }

  // 卡片資訊
  const [cardInfo, setCardInfo] = useState('')
  // 處理錯誤
  const [errMsg, setErrMsg] = useState({ msg: '' })
  // 日常貼文 -> 圖片預覽
  const [preview, setPreview] = useState('')
  // 日常貼文
  const [dailyPost, setDailyPost] = useState({
    id: '',
    userID: '',
    image: '',
    tittle: '',
    content: '',
    createdAt: '',
    fsTag: '',
    mdTag: '',
    lsTag: '',
  })
  // 討論貼文
  const [discussPost, setDiscussPost] = useState({
    id: '',
    userID: '',
    categoryID: '',
    tittle: '',
    content: '',
    createdAt: '',
    Tags: '',
  })

  function handleDailyChange(e) {
    setDailyPost({ ...dailyPost, [e.target.name]: e.target.value })
  }
  function handleDisChange(e) {
    setDiscussPost({ ...discussPost, [e.target.name]: e.target.value })
  }

  // 圖片預覽
  function handleImage(e) {
    setCardInfo({ ...cardInfo, image: e.target.files[0] })
  }

  const handleToDaily = () => {
    setWhichForm('0')
  }
  const handleToDiscuss = () => {
    setWhichForm('1')
  }
  // 圖片預覽
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

  // 切換 日常/討論 [[[送出表單]]]
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (whichForm === '0') {
        let formData = new FormData()
        formData.append('id', dailyPost.id)
        // formData.append('userID', dailyPost.userID)
        formData.append('image', cardInfo.image)
        formData.append('tittle', dailyPost.tittle)
        formData.append('content', dailyPost.content)
        // formData.append('createdAt', dailyPost.createdAt)
        formData.append('fsTag', dailyPost.fsTag)
        formData.append('mdTag', dailyPost.mdTag)
        formData.append('lsTag', dailyPost.lsTag)
        let response = await axios.post(`${API_URL}/daily/Add`, formData, {
          withCredentials: true,
        })

        // setDailyPost('response.data', response.data)
        console.log('日常切換文:', response.data)
        Swal.fire('已分享一篇日常')
        setDailyPost({
          id: '',
          userID: '',
          image: '',
          tittle: '',
          content: '',
          createdAt: '',
          fsTag: '',
          mdTag: '',
          lsTag: '',
        })
        // 討論
      } else if (whichForm === '1') {
        let response = await axios.post(`${API_URL}/discuss/Add`, discussPost, {
          withCredentials: true,
        })
        // setDiscussPost(response.data)
        setDiscussPost({
          id: '',
          userID: '',
          categoryID: '',
          tittle: '',
          content: '',
          createdAt: '',
          Tags: '',
        })
        console.log('討論切換文:', response.data)
        Swal.fire('已送出一則討論')
      }
    } catch (e) {
      console.error('貼文失敗', e.response.data)
      setErrMsg({ ...errMsg, msg: e.response.data.msg })
    }

    // 上傳圖片
    function handleImage(e) {
      setCardInfo({ ...cardInfo, image: e.target.files[0] })
    }
    // // 送出日常文 API
    // async function handleDailySubmit(e) {
    //   Swal.fire('成功送出貼文', '請重新整理', 'success')
    //   e.preventDefault() //關掉預設行為
    //   try {
    //     let response = await axios.post(`${API_URL}/daily/Add`, daily, {
    //       withCredentials: true,
    //     })
    //     console.log('Add資料', response.data)
    //   } catch (e) {
    //     console.error('文章送出失敗', e.response.data)
    //     Swal.fire({
    //       icon: 'error',
    //       title: '文章送出失敗',
    //       text: { ...errMsg, msg: e.response.data.msg },
    //     })
    //   }
    // }

    // // 送出討論文 API
    // async function handleDailySubmit(e) {
    //   Swal.fire('成功送出貼文', '請重新整理', 'success')
    //   e.preventDefault() //關掉預設行為
    //   try {
    //     let response = await axios.post(`${API_URL}/discuss/Add`, discussion, {
    //       withCredentials: true,
    //     })
    //   } catch (e) {
    //     console.error('文章送出失敗', e.response.data)
    //     Swal.fire({
    //       icon: 'error',
    //       title: '文章送出失敗',
    //       text: { ...errMsg, msg: e.response.data.msg },
    //     })
    //   }
  }

  // 討論標籤
  const discussNo = [
    // '1', '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
  ]
  const discussOptions = [
    // '貓貓',
    // '狗狗',
    '問卦',
    '求助',
    '閒聊',
    '轉發',
    '推薦',
    '黑特',
  ]

  return (
    <div id="Post-Page">
      {/* 標題 */}
      <h1 className="post-h1 mt-5">今天</h1>
      <div className="bg-primary position-relative">
        <div className="community-post">
          <h2 className="post-h2">&emsp;想分享什麼嗎❓</h2>
          {/* 表單 */}
          {user ? (
            <div
              className={`post-controll mt-md-50 d-sm-inline-block d-md-inline-flex `}
            >
              <div className="postinput ">
                {/* 相片上傳區 */}
                {/* 圖片 */}

                <label
                  htmlFor="fileUploader"
                  className="img-uploader"
                  title="點擊以上傳圖片"
                  onChange={handleDailyChange}
                  value={handleDailyChange}
                >
                  {/*圖片預覽 | 無圖隱藏 */}
                  {whichForm === '0' ? (
                    <>
                      <img
                        className={preview ? 'previewer' : 'd-none'}
                        src={preview}
                        alt=""
                      />

                      {/* 圖片 */}
                      <input
                        type="file"
                        id="fileUploader"
                        className="d-none w-100"
                        onChange={(e) => {
                          handleImage(e)
                          handlePreview(e)
                        }}
                        name="filename"
                      />
                    </>
                  ) : (
                    <img
                      className={preview ? 'previewer' : 'd-none'}
                      src={preview}
                      alt=""
                    />
                  )}
                </label>
                {/* 發文模式切換 */}
                <div className="postClass ">
                  {/* 重要與普通radio */}
                  <div className="com-PostClass">
                    <div className="helppostcategory">
                      <fieldset id="category">
                        <label
                          for="Daily"
                          className={`categoryPostButton1 lg ${
                            whichForm === '0' ? 'active' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            id="Daily"
                            name="category"
                            value="日常分享"
                            check={'0' === whichForm}
                            onChange={(e) => {
                              setWhichForm()
                              handleToDaily()
                            }}
                            className="helpPostCircle"
                          />
                          <span className="com-PostButtontext">日常分享</span>
                        </label>

                        <label
                          for="Discuss"
                          className={`categoryPostButton2 lg ${
                            whichForm === '1' ? 'active' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            id="Discuss"
                            name="category"
                            value="社群討論"
                            check={'1' === whichForm}
                            onChange={(e) => {
                              setWhichForm()
                              handleToDiscuss(e.target.value)
                            }}
                            className="helpPostCircle"
                          />
                          <span className="com-PostButtontext">社群討論</span>
                        </label>
                      </fieldset>
                    </div>
                  </div>
                </div>
                {/* 兩個標籤區 */}
                <div className="postTag">
                  <div className="postTag1">
                    <form>
                      <label htmlFor="firstTag" className="postLabel">
                        ＃
                      </label>
                      <input
                        className="community-Input"
                        type="text"
                        id="fsTag"
                        name="fsTag"
                        onChange={handleDailyChange}
                        required="required"
                      />
                      <br />
                      <label htmlFor="midTag" className="postLabel">
                        ＃
                      </label>
                      <input
                        className="community-Input"
                        type="text"
                        id="mdTag"
                        name="mdTag"
                        onChange={handleDailyChange}
                      />
                      <br />
                      <label htmlFor="lastTag" className="postLabel">
                        ＃
                      </label>
                      <input
                        className="community-Input"
                        type="text"
                        id="lsTag"
                        name="lsTag"
                        onChange={handleDailyChange}
                      />
                    </form>
                  </div>
                  {/* 討論文：固定標籤 */}
                  <div className="postTag2">
                    {discussNo.map((v, i) => {
                      return (
                        <button
                          id={v}
                          type="checkbox"
                          value={v}
                          className="post-tag"
                          onChange={handleDisChange}
                          key={v}
                        >
                          {discussOptions[i]}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              {/* 撰寫貼文區域 */}
              <div className="post-content-area d-sm-flex d-md-inline-flex ">
                <div className="post-content-container">
                  <div className="post-content-textarea">
                    {whichForm === '0' ? (
                      <Form>
                        <textarea
                          className="community-tittle"
                          placeholder={'請填寫標題'}
                          onChange={handleDailyChange}
                          name="tittle"
                        ></textarea>
                        <textarea
                          className="community-textarea filled-md-100"
                          placeholder={'寫一些內容吧!'}
                          onChange={handleDailyChange}
                          name="content"
                          required="required"
                        ></textarea>
                      </Form>
                    ) : (
                      <Form>
                        <textarea
                          className="community-tittle"
                          placeholder={'請填寫標題'}
                          onChange={handleDisChange}
                          name="tittle"
                        ></textarea>
                        <textarea
                          className="community-textarea filled-md-100"
                          placeholder={'寫一些內容吧!'}
                          onChange={handleDisChange}
                          name="content"
                          required="required"
                        ></textarea>
                      </Form>
                    )}
                  </div>
                  <button className="community-submit" onClick={handleSubmit}>
                    送 出
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="compost-unlogin">登入後尚可留言</div>
          )}
        </div>
      </div>
      {/*postinput*/}
    </div> //Post-page
  )
}

// Member.propTypes = {}

export default ComPost
