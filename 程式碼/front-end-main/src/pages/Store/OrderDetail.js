import './style/OrderDetailStyle.scss'
import { Container, Button, Modal, Row, Col } from 'react-bootstrap'
import OrderDetailTable from './components/OrderDetailTable'
import React, { useState, useEffect } from 'react'
import { withRouter, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import { useAuth } from '../../context/auth'
import Swal from 'sweetalert2'
//圖片
import MaoStore from './storePic/MaoStore.png'
import prolistBG from './storePic/prolistBG.svg'
import arrow from './storePic/arrow.svg'
import money from './storePic/money.svg'
import { set } from 'date-fns'

function OrderDetail(props) {
  const { user, setUser } = useAuth() //會員資料
  let cart = props.location.state.cart
  let sum = props.location.state.sum
  let checkout = props.location.state.checkout
  let fee = props.location.state.fee

  //運費轉換方便存資料庫
  let deliveryWay = ''
  if (fee === '80') {
    deliveryWay = '郵寄'
  }
  if (fee === '200') {
    deliveryWay = '宅配'
  }

  // console.log('props:', props)
  // console.log('cart:', cart, 'sum:', sum, 'checkout', checkout, 'fee', fee)
  console.log('會員編號', user.id)
  // 轉頁用
  const history = useHistory()
  //接支付方式用
  const [Pay, setPay] = useState([])
  //送出成功提視窗用
  // const [show, setShow] = useState(false)
  // input 輸入值
  const [Order, setOrder] = useState({
    name: '',
    mobile: '',
    address: '',
    email: '',
    user_id: user.id,
    payment: '',
    delivery: deliveryWay,
    delivery_fee: fee,
    cart,
  })

  console.log('Order', Order)

  // 錯誤訊息
  const [OrderErr, setOrderErr] = useState({
    address: '',
    payment: '',
    name: '',
    mobile: '',
    email: '',
  })

  // 偵測表單內容變化 (onChange)
  function handleChange(e) {
    setOrder({ ...Order, [e.target.name]: e.target.value })
    // setOrderErr)
  }
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      let response = await axios.post(`${API_URL}/order`, Order)
      console.log(response.data.message)
      if (response.data.message === 'ok') {
        Swal.fire('訂單已送出', '回到商店頁', 'success')
        history.push('/store')
        localStorage.removeItem('cart')
      }
    } catch (e) {
      // setShow(false)
      console.error('error', e.response.data)
      // 後端驗證
      setOrderErr({
        ...OrderErr,
        address: e.response.data.address,
        payment: e.response.data.payment,
        name: e.response.data.name,
        mobile: e.response.data.mobile,
        email: e.response.data.email,
      })
    }
  }

  // const handleCloseModal = () => {
  //   setShow(false)
  //   history.push('/member/order')
  // }

  // const successModal = (
  //   <Modal show={show} onHide={handleCloseModal}>
  //     <Modal.Header>
  //       <Modal.Title>訂單已送出</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Footer>
  //       <Button variant="secondary" size="sm" onClick={handleCloseModal}>
  //         確定
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // )

  return (
    <Container>
      <section className="orderbgAREA">
        <img className="MaoStore3 img-fluid" src={MaoStore} alt="MaoStore" />
        <img className="prolistBG img-fluid" src={prolistBG} alt="prolistBG" />
      </section>

      <section className="orderdetailArea p-2">
        <OrderDetailTable cart={cart} />

        <div className=" flex-column d-flex  justify-content-center  align-items-center ">
          <p className="calculate">
            {deliveryWay} 運費 ${fee} + 商品總額 ${sum}
          </p>
          <p className="finaltotal">結帳總金額 ${checkout}</p>
        </div>

        <form className="maildetail d-flex  flex-column">
          請正確填寫以下配送資訊：
          <div className="d-flex line2">
            <label className="maillabel" for="address">
              <p> 配送地址 </p>
            </label>
            <input
              id="address"
              className=" form-control"
              type="text"
              name="address"
              value={Order.address}
              placeholder="新北市XX區XX路XX號"
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>
          <div className="errMsg">
            {OrderErr.address ? OrderErr.address : ''}
          </div>
          <div className="d-flex line2">
            <label className="maillabel" for="payment">
              <p>支付方式</p>
            </label>
            <select
              name="payment"
              value={Order.payment}
              class="form-control"
              id="payment"
              onChange={(e) => {
                handleChange(e)
              }}
            >
              <option selected value="">
                請選擇一個
              </option>
              <option value="信用卡">信用卡</option>
              <option value="ATM轉帳">ATM轉帳</option>
            </select>
          </div>
          <div className="errMsg">
            {OrderErr.payment ? OrderErr.payment : ''}
          </div>
          <div className="d-flex line2 ">
            <label className="maillabel" for="name">
              <p>聯絡姓名</p>
            </label>
            <input
              id="name"
              className=" form-control "
              type="text"
              placeholder="毛小孩"
              name="name"
              value={Order.name}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>
          <div className="errMsg">{OrderErr.name ? OrderErr.name : ''}</div>
          <div className="d-flex line2">
            <label className="maillabel" for="mobile">
              <p>聯絡電話</p>
            </label>
            <input
              id="mobile"
              className=" form-control"
              type="tel"
              placeholder="0912345678"
              name="mobile"
              value={Order.mobile}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>
          <div className="errMsg">{OrderErr.mobile ? OrderErr.mobile : ''}</div>
          <div className="d-flex line2">
            <label className="maillabel" for="email">
              <p>E-mail</p>{' '}
            </label>
            <input
              id="email"
              className=" form-control"
              type="email"
              placeholder="test@test.com"
              name="email"
              value={Order.email}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>
          <div className="errMsg">{OrderErr.email ? OrderErr.email : ''}</div>
        </form>
      </section>

      <div>
        <img className="order-arrow" src={arrow} alt="arrow" />
      </div>
      <div className="bbtn d-flex justify-content-center mt-2 mb-5">
        <Button
          className="goBackBtn mr-5 "
          variant="secondary"
          onClick={() => {
            props.history.goBack()
          }}
        >
          上一步
        </Button>
        <Button
          className="checkoutBtn"
          variant="primary"
          onClick={handleSubmit}
        >
          <img className="pr-2" src={money} alt="money" />
          結帳
        </Button>
      </div>
    </Container>
  )
}

export default withRouter(OrderDetail)
