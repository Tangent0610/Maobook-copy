// 引入 React 功能
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'
// 引入 user context
import { useAuth } from '../../context/auth'
// 引入 utils
import { API_URL } from '../../utils/config'
// 引入圖片們
import Logo from '../../img/LOGO_no_word.svg'
import LogoWord from '../../img/LOGO_word.svg'
import LoginWord from '../../img/Login/login_word.svg'
import { ReactComponent as PawBtn } from '../../img/Login/paw_btn.svg'
import './Login.scss'
import { BsGoogle, BsFacebook } from 'react-icons/bs'
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// 引入第三方登入
import { fbLogin, googleLogin } from '../../service/UserData'
import FacebookLogin from '@greatsumini/react-facebook-login'
import GoogleLogin from 'react-google-login'

function Login(props) {
  const history = useHistory()
  // 來自 context 的 user 狀態
  const { user, setUser } = useAuth()
  // 登入 inpuut 輸入
  const [member, setMember] = useState({
    email: '',
    password: '',
  })
  // 登入驗證錯誤訊息
  const [errMsg, setErrMsg] = useState({ msg: '' })
  // sweetalert
  const MySwal = withReactContent(Swal)

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value })
    setErrMsg({ msg: '' })
  }

  async function handleSubmit(e) {
    // 關掉原本預設送出行為
    e.preventDefault()

    try {
      let response = await axios.post(`${API_URL}/auth/login`, member, {
        // 跨源存取 cookies
        withCredentials: true,
      })
      console.log(response.data)
      // 登入成功 --> 將 user 資料存入 context 中
      setUser(response.data.data)
    } catch (e) {
      console.error('login error', e.response.data)
      // 登入失敗錯誤訊息
      setErrMsg({ ...errMsg, msg: e.response.data.msg })
    }
  }

  useEffect(() => {
    if (user) {
      // 登入成功 --> 自動導向會員頁面
      MySwal.fire({
        title: `歡迎！${user.name}`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          history.push('/member/data')
        }
      })
      // return <Redirect to="/member/data" />
    }
  }, [user])

  // Google 登入
  const responseGoogle = async (response) => {
    console.log(response)
    let result = await googleLogin(response)
    if (result.id > 0) {
      setUser(result)
      if (user) {
        // sweetalert 第三方
        MySwal.fire({
          title: `歡迎！${user.name}`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            history.push('/member/data')
          }
        })
      }
    }
  }
  // FB 登入
  const handleFBLogin = async (response) => {
    // console.log('response', response)
    let result = await fbLogin(response)
    if (result.id > 0) {
      setUser(result)
      if (user) {
        // sweetalert 第三方
        MySwal.fire({
          title: `歡迎！${user.name}`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            history.push('/member/data')
          }
        })
      }
    }
  }

  return (
    <div>
      <div className="container">
        <form className="row no-gutters" onSubmit={handleSubmit}>
          {/* 排版用空白區塊 */}
          <div className="col-lg-6 d-none d-lg-block"></div>
          {/* 登入區塊 */}
          <div className="col-lg-4">
            {/* maobook 字 logo */}
            <div className="login-logo-word">
              <img alt="" className="img-fluid" src={LogoWord} />
            </div>
            <h4 className="text-secondary text-center py-3 m-0">
              It's Mao Life!
            </h4>
            {/* 登入欄位 */}
            <div className="login-form">
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="帳號"
                  name="email"
                  value={member.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="密碼"
                  name="password"
                  value={member.password}
                  onChange={handleChange}
                />
              </div>
              {/* 登入錯誤訊息 */}
              <div className="errMsg">{errMsg.msg ? errMsg.msg : ' '}</div>
            </div>
          </div>
          {/* 登入按鈕 */}
          <div className="col-lg-2 align-self-end login-btn">
            <button className="btn" type="submit">
              <PawBtn className="paw-btn" />
            </button>
          </div>
        </form>
      </div>
      <div className="bg-primary position-relative login-section">
        <div className="container">
          {/* logo 大圖  */}
          <div className="login-logo-noword position-absolute">
            <img alt="" className="img-fluid" src={Logo} />
          </div>
          {/* 會員登入文字圖 */}
          <div className="position-absolute d-none d-lg-block img-login-word">
            <img alt="" className="img-fluid" src={LoginWord} />
          </div>
          <div className="row">
            {/* 排版用區塊 */}
            <div className="col-lg-6"></div>
            {/* 右方第三方登入區塊 */}
            <div className="col-lg-4">
              <div className="d-flex w-100 thirdParty-login">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <button
                      className="thirdParty-icon-login"
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
                  className="thirdParty-icon-login"
                >
                  <BsFacebook color="white" fontSize="2.5rem" />
                </FacebookLogin>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
