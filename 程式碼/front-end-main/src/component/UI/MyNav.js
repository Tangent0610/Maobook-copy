import React from 'react'
import { Navbar, Nav, Form, NavDropdown, Container } from 'react-bootstrap'
import axios from 'axios'
// 引入 context
import { useAuth } from '../../context/auth'
// 引入 utils
import { API_URL, IMG_URL } from '../../utils/config'
import Logo from '../../img/Logo_nav.svg'
// 引入圖片
import defaultAvatar from '../../img/avatar_user.png'
import cartIcon from '../../img/cartIcon.svg' //購物車ICON
// 引入 global.scss
import '../../style/UI/global.scss'
// 要使用能有active css效果的NavLink元件
import { NavLink, useHistory } from 'react-router-dom'
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function MyNav(props) {
  const history = useHistory()
  // 來自 context 的 user 狀態
  const { user, setUser } = useAuth()
  // sweetalert
  const MySwal = withReactContent(Swal)
  // 登出功能
  const handleLogout = async () => {
    await axios.get(`${API_URL}/auth/logout`, { withCredentials: true })
    setUser(null)
  }

  const handleLogin = () => {
    MySwal.fire({
      title: `請先註冊或登入!`,
      icon: 'warning',
      confirmButtonText: '確認',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/login')
      }
    })
  }

  return (
    <>
      <Navbar
        className="navbar text-center"
        collapseOnSelect
        expand="lg px-3"
        fixed="top"
      >
        {/* Nav左側Logo */}
        <Navbar.Brand href="/">
          <img
            className="navbar-logo mr-2 img-fluid"
            src={Logo}
            width="150"
            alt="Logo"
          />
        </Navbar.Brand>
        {/* Nav中間 連結各平台頁面 */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container>
            <Nav className="me-auto px-4">
              <Nav.Link as={NavLink} to="/">
                HOME
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={NavLink} to="/schedule">
                    SCHEDULE
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/store">
                    STORE
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/community">
                    COMMUNITY
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/assistance">
                    ASSISTANCE
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleLogin}>SCHEDULE</Nav.Link>
                  <Nav.Link onClick={handleLogin}>STORE</Nav.Link>
                  <Nav.Link onClick={handleLogin}>COMMUNITY</Nav.Link>
                  <Nav.Link onClick={handleLogin}>ASSISTANCE</Nav.Link>
                </>
              )}
            </Nav>
          </Container>

          {/* Nav右側*/}
          {/* 登入前 */}
          {/* Sign in按鈕 */}
          {!user && (
            <Nav className="nav-login">
              <Nav.Link as={NavLink} to="/login">
                <div className="nav-login-btn btn btn-outline-primary">
                  SIGN IN
                </div>
              </Nav.Link>
            </Nav>
          )}

          {/* 登入後 */}

          {/* 會員專區 下拉式選單 */}
          {user && (
            <Form className="member d-flex">
              {/* 購物車連結鈕 */}
              <Nav.Link as={NavLink} to="/store/cart">
                <img className="cartIcon" src={cartIcon} alt="cartIcon" />
              </Nav.Link>
              <NavDropdown title="會員專區" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <p>
                    Hi, {user.name} <br></br>
                    歡迎來到毛毛日記！
                    {/* 您有 3 則提醒未讀 */}
                  </p>
                </NavDropdown.Item>
                {/* 主要資訊功能 */}
                <NavDropdown.Item as={NavLink} to="/member/data">
                  會員資料
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/member/pet">
                  毛孩資料
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/member/order">
                  選物紀錄
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/member/community">
                  社群紀錄
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/member/assistance">
                  互助紀錄
                </NavDropdown.Item>
                {/* 登出按鈕 */}
                <Nav.Link as={NavLink} to="/" onClick={handleLogout}>
                  登出
                </Nav.Link>
              </NavDropdown>
              <div className="d-inline-block"></div>
              {/* 會員頭像*/}
              <Nav.Link as={NavLink} to="/member/data">
                <div
                  className="rounded-circle embed-responsive embed-responsive-1by1"
                  style={{ width: '40px', height: '40px' }}
                >
                  <img
                    alt=""
                    className="w-100 h-100 embed-responsive-item"
                    style={{ objectFit: 'cover' }}
                    src={
                      user.image !== null
                        ? user.google
                          ? user.image
                          : `${IMG_URL}${user.image}`
                        : defaultAvatar
                    }
                  />
                </div>
              </Nav.Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default MyNav
