// import { Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL, IMG_URL } from '../../utils/config'
import '../Store/style/RecomStyle.scss'
import Swal from 'sweetalert2'
//元件
import ProductItem from './components/ProductItem'
//圖片
import weRecom from './storePic/weRecom.svg'
import goadd from './storePic/goadd.svg'
import defaultPet from '../../img/avatar_pet.png'

function Recom(props) {
  const [data, setData] = useState([]) //紀錄全部寵物資料
  const [pet, setPet] = useState(null) //紀錄單隻寵物因為要塞進去的資料是物件，不能設陣列
  const [recomProduct, setrecomProduct] = useState([]) //紀錄寵物專屬推薦商品用
  //寵物清單API 開始
  useEffect(() => {
    let getPetlist = async () => {
      // http://localhost:3002/api/store/petlist
      let response = await axios.get(`${API_URL}/store/petlist`, {
        withCredentials: true,
      })
      setData(response.data)
      setPet(response.data[0])
    }
    getPetlist()
  }, [])

  //推薦商品
  useEffect(() => {
    if (pet) {
      let getrecomProduct = async () => {
        // http://localhost:3002/api/store//recomProduct
        let response1 = await axios.get(
          `${API_URL}/store/recomProduct?petID=${pet.id}`,
          {
            withCredentials: true,
          }
        )
        setrecomProduct(response1.data)
      }
      console.log(recomProduct)
      getrecomProduct()
    }
  }, [pet])

  //加入購物車
  const [mycart, setMycart] = useState([])

  //加入購物車訊息窗用
  const [show, setShow] = useState(false)
  const [productName, setProductName] = useState('')

  //購物車判斷
  const ADDToLocalStorage = (item) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    // find if the product in the localstorage with its id
    const index = currentCart.findIndex((v) => v.id === item.id)
    console.log('index', index)
    // found: index! == -1
    if (index > -1) {
      //currentCart[index].amount++
      // setProductName('這個商品已經加過了')
      // handleShow()
      Swal.fire(
        '這個商品已經加過了', //標題
        '', //訊息內容(可省略)
        'warning' //圖示(可省略) success/info/warning/error/question
      )
      return
    } else {
      currentCart.push(item)
    }

    localStorage.setItem('cart', JSON.stringify(currentCart))

    // 設定資料
    setMycart(currentCart)
    // setProductName(item.name + '\n已成功加入購物車')
    // handleShow()
    Swal.fire(
      '成功加入購物車!', //標題
      '', //訊息內容(可省略)
      'success' //圖示(可省略) success/info/warning/error/question
    )
  }

  //購物車加入視窗
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{productName}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={handleClose}>
          繼續購物
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            props.history.push('/store/cart')
          }}
        >
          前往購物車結帳
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const getlist = () => {
    //建立寵物清單元件
    let list = []
    for (let i = 0; i < data.length; i++) {
      list.push(
        <li
          key={i}
          onClick={(e) => {
            setPet(data[i]) //點下後針對index做寵物切換
          }}
        >
          <button className="mx-2  recom-pet">
            <img
              alt=""
              className=" cover-fit recom-pet"
              src={data[i].image ? `${IMG_URL}${data[i].image}` : defaultPet}
            />
          </button>
        </li>
      )
    }
    return list
  }

  const havePet = (
    <>
      <section className="d-flex justify-content-center">
        <div className="recom-yourpets d-flex">
          <div className="text6 text-center">
            <div>今天的你</div>
            <div>想為哪個毛孩買禮物呢</div>
          </div>

          <ul className="allpet list-unstyled d-flex m-0">
            {getlist()} {/*印出寵物清單元件*/}
          </ul>
        </div>
      </section>
      {/* {console.log('pet pet.image', pet, pet.image)} */}
      <section className="d-flex justify-content-center">
        <Row className="recomArea d-flex" md={12}>
          <Col md={3}>
            <div>
              {/*照片*/}
              <img
                alt=""
                className="cover-fit recom-avatar"
                src={pet && pet.image ? `${IMG_URL}${pet.image}` : defaultPet}
              />
            </div>
            <h5 className="recom-petname text-center mb-3 ">
              {pet ? pet.name : ''}
            </h5>
            <div className="recom-describe text-center ">
              今年的牠
              <span className="introTag">{pet ? pet.birthday : ''}歲</span>
              <br />
              是隻<span>{pet ? pet.age_category : ''}</span>的
              <span>{pet ? pet.category : ''}</span>
              <br />
              有以下問題
              {pet
                ? pet.illnessTags.map((data, index) => {
                    return (
                      <>
                        <br />
                        <span>{data}</span>
                      </>
                    )
                  })
                : ''}
            </div>
          </Col>

          <Col className="recomlist" md={9}>
            <img className="weRecom" src={weRecom} alt="weRecom" />
            <Row className="recomPro ">
              {/* 推薦商品 */}

              {recomProduct.map((product) => {
                return (
                  <Col md={4} className="mt-3">
                    <ProductItem
                      name={product.name}
                      price={product.price}
                      des={product.description}
                      stock={product.stock_num}
                      image={product.image}
                      id={product.id}
                      ADDToLocalStorage={ADDToLocalStorage}
                    />
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </section>
    </>
  )

  const nohavepet = (
    <>
      <section className="d-flex justify-content-center">
        <div className="recom-yourpets ">
          <p className="m-0 text-center">
            趕快新增寶貝
            <br />
            讓我們推薦產品給您!
          </p>
          <div className="d-flex justify-content-center mt-2">
            <Link to="/member/pet">
              <img src={goadd} alt="doadd" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )

  return (
    <>
      {messageModal}
      {pet ? havePet : nohavepet}
    </>
  )
}

export default withRouter(Recom)
