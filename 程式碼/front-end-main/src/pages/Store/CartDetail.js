import './style/CartDetailStyle.scss'
import React, { useState, useEffect } from 'react'

import { Col, Row, Button, Container, Modal } from 'react-bootstrap'

import { useHistory, withRouter, Link, Redirect } from 'react-router-dom'
import OrderDetail from './OrderDetail'
//元件
import CartProductItem from './components/CartProductItem'

//圖片
import MaoStore from './storePic/MaoStore.png'
import cartListBG from './storePic/cartListBG.svg'
import arrow from './storePic/arrow.svg'

function CartDetail() {
  const cartHistory = useHistory() //連到下一步

  //購物車用
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  //select用
  const [selectedValue, setSelectedValue] = useState('')
  const [errMsg, seterrMsg] = useState(false)
  //確認購物車是否有商品提視窗用
  const [show, setShow] = useState(false)

  //先判斷購物車內是否有商品
  useEffect(() => {
    const newCart = localStorage.getItem('cart') || '[]'
    setMycart(JSON.parse(newCart)) //JSON字串轉換成JavaScript的數值或是物件
  }, [])

  useEffect(() => {
    // mycartDisplay運算
    let newMycartDisplay = []

    //尋找mycartDisplay
    for (let i = 0; i < mycart.length; i++) {
      //尋找mycartDisplay中有沒有此mycart[i].id
      //有找到會返回陣列成員的索引值
      //沒找到會返回-1
      const index = newMycartDisplay.findIndex(
        (value) => value.id === mycart[i].id
      )
      //有的話就數量+1
      if (index !== -1) {
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }
    console.log('newMycartDisplay', newMycartDisplay)
    setMycartDisplay(newMycartDisplay)
  }, [mycart])

  //購物車加減數量更新
  const updateCartToLocalStorage = (item, isAdded = true) => {
    console.log(item, isAdded)
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    // find if the product in the localstorage with its id
    const index = currentCart.findIndex((v) => v.id === item.id)

    console.log('index', index)
    // found: index! == -1
    if (index > -1) {
      isAdded ? currentCart[index].amount++ : currentCart[index].amount--
    }
    localStorage.setItem('cart', JSON.stringify(currentCart))

    // 設定資料
    setMycart(currentCart)
  }

  //購物車刪除特定商品
  const deletItem = (item, isDelete = false) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    // find if the product in the localstorage with its id
    const index = currentCart.findIndex((v) => v.id === item.id)

    console.log('index', index)
    // found: index! == -1
    if (index > -1) {
      isDelete ? currentCart.splice(index, 1) : (isDelete = false)
    }
    localStorage.setItem('cart', JSON.stringify(currentCart))

    // 設定資料
    setMycart(currentCart)
  }

  //設定總金額
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }

  const total = sum(mycartDisplay)
  const checkout = sum(mycartDisplay) + parseInt(selectedValue)

  //確認購物車是否有商品提視窗
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const messageModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>購物車內沒有商品</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            handleClose()
            cartHistory.push('/store/productList')
          }}
        >
          回商店選購
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            handleClose()
          }}
        >
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const errmsg = <p className="payerrmsg">請選擇一個運送方式!</p>

  return (
    <>
      {messageModal} {/*確認購物車是否有商品提視窗*/}
      <Container>
        {/* 上區背景圖 */}
        <Row className="cartbg">
          <Col md={2}>
            <img
              className="MaoStore2 img-fluid"
              src={MaoStore}
              alt="MaoStore"
            />
          </Col>
          <Col md={10} className="cartListBG">
            <img className=" img-fluid" src={cartListBG} alt="cartListBG" />
          </Col>
        </Row>

        <section className="cart-list mt-5 ">
          <Button
            className="clearCartbtn"
            variant="primary"
            size="sm"
            onClick={() => setMycart([])(localStorage.removeItem('cart'))}
          >
            清空購物車
          </Button>
          {/* 購物車商品區*/}
          <Row className="pt-3 m-auto justify-content-center" xs={2} md={4}>
            {mycartDisplay.map((item, index) => {
              return (
                <Col className="p-0" key={item.id}>
                  <CartProductItem
                    image={item.image}
                    item={item}
                    name={item.name}
                    price={item.price}
                    des={item.des}
                    stock={item.stock}
                    id={item.id}
                    amount={item.amount}
                    updateCartToLocalStorage={updateCartToLocalStorage}
                    deletItem={deletItem}
                    setMycart={setMycart}
                  />
                  {/*購物車商品元件*/}
                </Col>
              )
            })}
          </Row>
          <Row className="mt-5 mb-2 delivery-area">
            <Col className="delivery pl-5">
              <div>共 {mycartDisplay.length} 件商品，請選擇運送方式</div>
              <select
                className="mt-2 custom-select custom-select-sm"
                value={selectedValue}
                onChange={(e) => {
                  setSelectedValue(e.target.value)
                }}
              >
                <option selected value="">
                  請選擇
                </option>
                <option value="80">郵寄 NT$80</option>
                <option value="200">宅配 NT$200</option>
              </select>
              {errMsg ? errmsg : ''}
              {console.log('selectedValue', selectedValue)}
            </Col>
            <Col>
              <div>商品總計 NT${total}</div>
              <div className="mt-2">
                運費總計 NT${selectedValue ? selectedValue : '0'}
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-center ">
              <div className="fintotal">
                結帳總金額 NT$
                {checkout ? checkout : '0'}
              </div>
            </Col>
          </Row>
        </section>

        <div>
          <img className="cart-arrow" src={arrow} alt="arrow" />
        </div>
        <div className="d-flex justify-content-center mt-2 mb-5">
          <Button
            onClick={(value) => {
              if (mycartDisplay.length === 0) {
                handleShow()
              } else if (selectedValue === '') {
                seterrMsg(true)
              } else {
                cartHistory.push({
                  pathname: '/store/cart/orderdetail',
                  state: {
                    cart: mycartDisplay,
                    sum: total,
                    checkout: checkout,
                    fee: selectedValue,
                  },
                })
              }
            }}
            className="gobuyBtn"
            variant="primary"
          >
            去買單
          </Button>
        </div>
      </Container>
    </>
  )
}

export default CartDetail
