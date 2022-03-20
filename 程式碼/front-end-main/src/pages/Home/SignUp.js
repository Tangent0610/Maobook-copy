// 引入 React 功能
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// 引入 context
import { useAuth } from '../../context/auth'
// 引入 utils
import { API_URL } from '../../utils/config'
// 引入圖片們
import Logo from '../../img/SignUp/LOGO_no_word.svg'
import SignupWord from '../../img/SignUp/signupWord.svg'
import LogoWord from '../../img/LOGO_word.svg'
import Paws from '../../img/SignUp/paws.svg'
import PawsLeft from '../../img/SignUp/small_paws_left.svg'
import PawsRight from '../../img/SignUp/small_paws_right.svg'
import './SignUp.scss'
import { BsGoogle, BsFacebook } from 'react-icons/bs'
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// 引入第三方登入
import { fbLogin, googleLogin } from '../../service/UserData'
import FacebookLogin from '@greatsumini/react-facebook-login'
import GoogleLogin from 'react-google-login'

function SignUp(props) {
  // 註冊 input 輸入值
  const [member, setMember] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  // 註冊驗證錯誤訊息
  const [signUpErr, setSignUpErr] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  // 轉頁用
  const history = useHistory()
  // Modal 相關狀態
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', type: '' })
  // 來自 context 的 user 狀態
  const { user, setUser } = useAuth()
  // sweetalert
  const MySwal = withReactContent(Swal)

  // 偵測表單內容變化 (onChange)
  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value })
    setSignUpErr({ ...signUpErr, [e.target.name]: '' })
  }

  // 表單有不合法的檢查出現時 (onChange 即時檢查 TODO: 改成 Debounce 寫法)
  // name 欄位前端檢查
  const handleNameInvalid = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setSignUpErr({ ...signUpErr, [e.target.name]: '此欄位不可為空' })
    }
  }
  // Email 欄位前端檢查
  const handleEmailInvalid = (e) => {
    e.preventDefault()
    const regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!e.target.value) {
      setSignUpErr({ ...signUpErr, [e.target.name]: '此欄位不可為空' })
    } else if (!regEmail.test(e.target.value)) {
      setSignUpErr({ ...signUpErr, [e.target.name]: 'email 格式不符' })
    }
  }
  // password 欄位前端檢查
  const handlePswInvalid = (e) => {
    e.preventDefault()
    const regPassword = /.{8}/
    if (!e.target.value) {
      setSignUpErr({ ...signUpErr, [e.target.name]: '此欄位不可為空' })
    } else if (!regPassword.test(e.target.value)) {
      setSignUpErr({ ...signUpErr, [e.target.name]: '密碼長度至少為 8' })
    }
  }
  // confirmPassword 欄位前端檢查
  const handleConfirmPswInvalid = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setSignUpErr({ ...signUpErr, [e.target.name]: '此欄位不可為空' })
    } else if (e.target.value !== member.password) {
      setSignUpErr({ ...signUpErr, [e.target.name]: '密碼驗證不一致' })
    }
  }

  // 送出表單 (onSubmit)
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      let response = await axios.post(`${API_URL}/auth/register`, member)
      console.log(response.data.message)
      if (response.data.message === 'ok') {
        // sweetalert 一般註冊
        MySwal.fire({
          title: '註冊成功！',
          text: '請登入並設定個人資料',
          icon: 'success',
          confirmButtonColor: '#f6bc54',
          confirmButtonText: '確認',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push('/login')
          }
        })
      }
    } catch (e) {
      console.error('error', e.response.data)
      // 後端驗證
      setSignUpErr({
        ...signUpErr,
        name: e.response.data.name,
        email: e.response.data.email,
        password: e.response.data.password,
        confirmPassword: e.response.data.confirmPassword,
      })
    }
  }

  // FB 登入
  const handleFBLogin = async (response) => {
    // console.log('response', response)
    let result = await fbLogin(response)
    if (result.id > 0) {
      setUser(result)
      // sweetalert 第三方
      MySwal.fire({
        title: '第三方登入成功！',
        text: '請前往會員頁面設定個人資料',
        icon: 'success',
        confirmButtonText: '確認',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/member/data')
        }
      })
    }
  }
  // Google 登入
  const responseGoogle = async (response) => {
    console.log(response)
    let result = await googleLogin(response)
    if (result.id > 0) {
      setUser(result)
      // sweetalert 第三方
      MySwal.fire({
        title: '第三方登入成功！',
        text: '請前往會員頁面設定個人資料',
        icon: 'success',
        confirmButtonText: '確認',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/member/data')
        }
      })
    }
  }

  return (
    <div id="sign-up">
      {/* 排版用空白區塊 */}
      <div className="container">
        {/* maobook 字 logo */}
        <div className="logo-word">
          <img alt="" className="img-fluid" src={LogoWord} />
        </div>
      </div>
      {/* 黃色註冊區塊 */}
      <div className="bg-primary position-relative">
        <div className="container">
          {/* 無字 logo 大圖   */}
          <div className="logo-noword position-absolute">
            <img alt="" className="img-fluid" src={Logo} />
          </div>
          <form className="row" onSubmit={handleSubmit}>
            {/* 左方註冊區塊 */}
            <div className="col-lg-3">
              {/* 立即註冊文字圖 */}
              <div className="d-none d-lg-block img-word">
                <img alt="" className="img-fluid" src={SignupWord} />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="signup-form">
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="姓名"
                    name="name"
                    value={member.name}
                    onChange={(e) => {
                      handleChange(e)
                      handleNameInvalid(e)
                    }}
                  />
                  {/* name 欄位錯誤訊息 */}
                  <div className="errMsg">
                    {signUpErr.name ? signUpErr.name : ''}
                  </div>
                </div>
                <div className="form-group mb-2">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email 帳號"
                    name="email"
                    value={member.email}
                    onChange={(e) => {
                      handleChange(e)
                      handleEmailInvalid(e)
                    }}
                  />
                  {/* email 欄位錯誤訊息 */}
                  <div className="errMsg">
                    {signUpErr.email ? signUpErr.email : ''}
                  </div>
                </div>
                <div className="form-group mb-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="密碼"
                    name="password"
                    value={member.password}
                    onChange={(e) => {
                      handleChange(e)
                      handlePswInvalid(e)
                    }}
                  />
                  {/* password 欄位錯誤訊息 */}
                  <div className="errMsg">
                    {signUpErr.password ? signUpErr.password : ''}
                  </div>
                </div>
                <div className="form-group mb-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="確認密碼"
                    name="confirmPassword"
                    value={member.confirmPassword}
                    onChange={(e) => {
                      handleChange(e)
                      handleConfirmPswInvalid(e)
                    }}
                  />
                  {/* confirmPassword 欄位錯誤訊息 */}
                  <div className="errMsg">
                    {signUpErr.confirmPassword ? signUpErr.confirmPassword : ''}
                  </div>
                </div>
              </div>
            </div>
            {/* 右方第三方註冊區塊 */}
            <div className="col-lg-6 position-relative">
              <h2 className="text-white text-right d-none d-lg-block sigh-slogan">
                最貼心的寵物管家
              </h2>
              <hr className="d-lg-none login-divider" />
              <div className="d-flex thirdParty-signup">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <button
                      className="thirdParty-icon"
                      onClick={renderProps.onClick}
                    >
                      <BsGoogle color="white" fontSize="2.5rem" />
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  className="thirdParty-icon"
                />
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                  fields="name,email,picture"
                  scope="public_profile,email"
                  onSuccess={handleFBLogin}
                  // onSuccess={(response) => {
                  //   console.log('success!', response)
                  // }}
                  className="thirdParty-icon"
                >
                  <BsFacebook color="white" fontSize="2.5rem" />
                </FacebookLogin>
              </div>
              <div className="d-none d-lg-block img-paws">
                <img alt="" className="img-fluid" src={Paws} />
              </div>
              {/* 註冊按鈕 */}
              <div className="signUp-btn">
                <img
                  alt=""
                  className="img-fluid d-lg-none left-paw"
                  src={PawsLeft}
                />
                <button className="btn px-4 py-1 text-primary" type="submit">
                  立即註冊
                </button>
                <img
                  alt=""
                  className="img-fluid d-lg-none right-paw"
                  src={PawsRight}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
