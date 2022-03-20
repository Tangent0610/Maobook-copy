import '../Store/style/ProductDetailsStyle.scss'
import { Modal, Button, Row, Col, Carousel } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { IMG_URL, API_URL } from '../../utils/config'
import Swal from 'sweetalert2'
//圖片
import Hill from './productsImages/Hill’s-001-1.png'
import minusIcon from './storePic/minusIcon.svg'
import plusIcon from './storePic/plusIcon.svg'

function ProductDetails(props) {
  //Modal用
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }
  ////商品細節頁接收傳入值
  const { name, price, des, stock, setMycart, id, img } = props
  const { show, setShow } = props
  //計數器用
  const [total, setTotal] = useState(1)

  //加入購物車訊息窗用
  const [show1, setShow1] = useState(false)
  const [productName, setProductName] = useState('')

  //商品細節 加商品用
  const updateCartToLocalStorage = (item) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [] //判斷localStorage購物車是否存在
    const index = currentCart.findIndex((v) => v.id === item.id) //比對ID
    console.log('index', index)
    if (index > -1) {
      //如果index!=0，代表陣列裡有這個產品
      currentCart[index].amount += total //直接加上計數器數量
      // setProductName(
      //   item.name + '數量更新，目前數量：' + currentCart[index].amount
      // )
      // handleShow()
      Swal.fire(
        '加入成功!', //標題
        '數量更新，目前數量：' + currentCart[index].amount, //訊息內容(可省略)
        'success' //圖示(可省略) success/info/warning/error/question
      )
    } else {
      currentCart.push(item) //若找不到直接加入購物車
      // setProductName(item.name + '\n已成功加入購物車')
      // handleShow()
      Swal.fire(
        '成功加入購物車!', //標題
        '', //訊息內容(可省略)
        'success' //圖示(可省略) success/info/warning/error/question
      )
    }
    localStorage.setItem('cart', JSON.stringify(currentCart)) //設定回去localStorage
    setMycart(currentCart)
  }

  //購物車加入視窗
  const handleClose = () => setShow1(false)
  const handleShow = () => setShow1(true)

  const messageModal = (
    <Modal show={show1} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{productName}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            handleClose()
            props.history.push('/Store/CartDetail')
          }}
        >
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <>
      {/* <Button variant="primary" onClick={() => setShow(true)}>
                Custom Width Modal
            </Button> */}
      {messageModal}
      <Modal
        centered
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="m-header" closeButton></Modal.Header>
        <Modal.Body className="show-grid">
          <Row>
            <Col xs={12} md={7}>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                className="imgchange"
              >
                {/* 印圖片 */}
                {img
                  ? img.map((d) => {
                      return (
                        <Carousel.Item>
                          <div className="imgarea">
                            <img
                              className="d-block "
                              src={`${IMG_URL}/static/products/${d.image}`}
                              alt={d.image}
                            />
                          </div>
                        </Carousel.Item>
                      )
                    })
                  : ''}
              </Carousel>
            </Col>
            <Col xs={6} md={5} className="d-flex align-items-center">
              <section className="pro-detail">
                <h2 dangerouslySetInnerHTML={{ __html: name }}></h2>
                <p
                  className="mt-3"
                  dangerouslySetInnerHTML={{ __html: des }}
                ></p>
                {/* <p>庫存:{stock}</p> */}
                <div className="d-flex justify-content-between align-items-center mr-5">
                  <h3>${price}</h3>
                  {/*加數器*/}
                  <div className="mr-5 d-flex">
                    <button
                      className="minusIcon"
                      onClick={() => {
                        if (total > 0) setTotal(total - 1)
                      }}
                    >
                      <img src={minusIcon} alt="minusIcon" />
                    </button>
                    <p className=" num">{total}</p>
                    <button
                      className="plusIcon"
                      onClick={() => {
                        setTotal(total + 1)
                      }}
                    >
                      <img src={plusIcon} alt="plusIcon" />
                    </button>
                  </div>
                </div>
                <Row className="mt-3 pt-3 d-flex align-items-center share">
                  <Col>
                    <button>分享商品</button>
                  </Col>
                  <Col className=" ml-5">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        updateCartToLocalStorage({
                          id: id,
                          name: name,
                          des: des,
                          amount: total,
                          price: price,
                        })
                      }}
                    >
                      加入購物車
                    </button>
                  </Col>
                </Row>
              </section>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default withRouter(ProductDetails)
