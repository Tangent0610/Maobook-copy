import React, { useState, useEffect } from 'react'
import { NavDropdown, Table, Modal, Button } from 'react-bootstrap'
import { NavLink, Route, Switch, useHistory } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/config'
// 引入 user context
import { useAuth } from '../context/auth'
// 引入函式庫
import { getUser } from '../service/UserData'
// 引入樣式和圖片
import './Member.scss'
import loading from '../img/loading_paw.svg'
// 引入元件
import MemberData from './Member/MemberData/MemberData'
import MemberEdit from './Member/MemberData/MemberEdit'
import PetList from './Member/PetList/PetList'
import PetInfo from './Member/PetList/PetInfo'
import EditPetInfo from './Member/PetList/EditPetInfo'
import AddPet from './Member/PetList/AddPet'
import AddPetData from './PetData/AddPetData'
import OrderHistory from './Member/OrderHistory/OrderHistory'
import CommunityHistory from './Member/CommunityHistory/CommunityHistory'
import AssistanceHistory from './Member/AssistanceHistory/AssistanceHistory'
import NoLoginModal from './NoLoginModal'
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Member(props) {
  // sweetalert
  const MySwal = withReactContent(Swal)
  // 來自 context 的 user 狀態
  const { user, setUser } = useAuth()
  console.log(user)
  // 取得會員詳細資料
  const [userInfo, setUserInfo] = useState({
    id: '',
    image: '',
    name: '',
    email: '',
    gender: '',
    mobile: '',
    birthday: '',
    address: '',
  })
  // 取得毛孩列表
  const [petList, setPetList] = useState([])
  // 取得毛孩詳細資料
  const [pet, setPet] = useState({
    id: '',
    user_id: '',
    name: '',
    image: '',
    arrDay: '',
    birthday: '',
    ageCate: '',
    gender: '',
    cate: '',
    height: 0,
    weight: 0,
    vaccine: [],
    health: [],
  })
  // 導頁用
  const history = useHistory()
  // Modal 切換顯示狀態用
  const [showModal, setShowModal] = useState(false)
  // 會員後台頁面
  const memberPage = (
    <div className="member-content">
      <div className="container h-100">
        <div className="row">
          {/* side nav */}
          <div className="col-lg-2 member-sidenav">
            <nav className="d-flex flex-row flex-lg-column justify-content-center text-right">
              <NavLink
                activeClassName="active"
                className="nav-link d-md-block d-none"
                to="/member/data"
              >
                會員資料
              </NavLink>
              <NavLink
                activeClassName="active"
                className="nav-link d-md-block d-none"
                to="/member/pet"
              >
                毛孩資料
              </NavLink>
              <NavLink
                activeClassName="active"
                className="nav-link d-md-block d-none"
                to="/member/order"
              >
                選物紀錄
              </NavLink>
              <NavLink
                activeClassName="active"
                className="nav-link d-md-block d-none"
                to="/member/community"
              >
                社群紀錄
              </NavLink>
              <NavLink
                activeClassName="active"
                className="nav-link d-md-block d-none"
                to="/member/assistance"
              >
                互助紀錄
              </NavLink>
              <NavDropdown
                title="會員資料"
                id="nav-dropdown"
                className="d-md-none d-block"
              >
                <NavDropdown.Item as={NavLink} to="/member/data">
                  會員資料
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/member/pet">
                  毛孩資料
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="會員紀錄"
                id="nav-dropdown"
                className="d-md-none d-block"
              >
                <NavDropdown.Item as={NavLink} to="/member/order">
                  選物紀錄
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/member/community">
                  社群紀錄
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/member/assistance">
                  互助紀錄
                </NavDropdown.Item>
              </NavDropdown>
            </nav>
          </div>
          {/* 可切換資料卡 */}
          <div className="col-lg-10 member-info">
            <Switch>
              {/* 會員個資相關 Route */}
              <Route path="/member/data/edit">
                <MemberEdit userInfo={userInfo} setUserInfo={setUserInfo} />
              </Route>
              <Route path="/member/data">
                <MemberData userInfo={userInfo} setUserInfo={setUserInfo} />
              </Route>
              {/* 會員毛孩相關 Route */}
              <Route path="/member/pet/data/edit">
                <AddPetData />
              </Route>
              <Route path="/member/pet/info/edit">
                <EditPetInfo pet={pet} setPet={setPet} />
              </Route>
              <Route path="/member/pet/info">
                <PetInfo
                  petList={petList}
                  setPetList={setPetList}
                  pet={pet}
                  setPet={setPet}
                />
              </Route>
              <Route path="/member/pet/add">
                <AddPet />
              </Route>
              <Route path="/member/pet">
                <PetList petList={petList} setPetList={setPetList} />
              </Route>
              {/* 會員歷史訂單 Route */}
              <Route path="/member/order">
                <OrderHistory />
              </Route>
              {/* 會員歷史社群紀錄 Route */}
              <Route path="/member/community">
                <CommunityHistory />
              </Route>
              {/* 會員歷史互助紀錄 Route */}
              <Route path="/member/assistance">
                <AssistanceHistory />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )

  // 未登入者導頁
  useEffect(() => {
    // if (!user) {
    getUser().then((res) => {
      if (res === '未登入') {
        MySwal.fire({
          title: '尚未登入！',
          text: '請先註冊或登入',
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
    })
    // }
  }, [])

  // Loading Paw
  const loadingPaw = (
    <div className="member-content">
      <div className="position-absolute loading-paw">
        <div className="spinner-grow text-primary" role="status">
          <img alt="" className="sr-only" src={loading} />
        </div>
      </div>
    </div>
  )

  return <>{user ? memberPage : loadingPaw}</>
}

export default Member
