import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { IMG_URL, API_URL } from './../../../utils/config'
import './CartProductItemStyle.scss'
//元件
import Counter from './Counter'
import ProductDetails from '../ProductDetails'
//圖片
import deletIcon from '../storePic/deletIcon.svg'

function CartProductItem(props) {
  const {
    setMycart, //計數器變動連動用
    item,
    name,
    price,
    des,
    stock,
    id,
    amount,
    updateCartToLocalStorage,
    deletItem,
    image,
  } = props
  console.log('item', item)
  //計算數量總和小計
  const [num, setNum] = useState(0)
  const [show, setShow] = useState(false) //Modal
  const [allimg, setallImg] = useState([]) //存商品細節用圖片

  //抓商品細節用圖片
  useEffect(() => {
    let getProductImg = async () => {
      // http://localhost:3002/api/store/productdetails?id=${id}
      let response = await axios.get(
        `${API_URL}/store/productdetails?id=${id}`,
        {
          withCredentials: true,
        }
      )
      setallImg(response.data)
    }
    getProductImg()
  }, [show])
  console.log('allimg', allimg)

  return (
    <>
      {/* 商品*/}
      <button
        className="deletIcon"
        onClick={() => {
          deletItem(item, true)
        }}
      >
        <img src={deletIcon} alt="deletIcon" />
      </button>
      <div className="setbgg">
        <div className="cart-product mt-4 ">
          <button
            className="d-flex justify-content-center"
            onClick={() => setShow(true)}
          >
            <img
              className="cover-fit "
              src={`${IMG_URL}/static/products/${image}`}
              alt={image}
            />
          </button>

          <ProductDetails
            img={allimg}
            setMycart={setMycart}
            show={show}
            setShow={setShow}
            id={id}
            name={name}
            price={price}
            des={des}
            stock={stock}
            item={item}
            amount={amount}
          />
        </div>
        <div>
          <h6
            className="cart-title"
            dangerouslySetInnerHTML={{ __html: name }}
          ></h6>{' '}
          {/* dangerouslySetInnerHTML={{ __html: name }} = 吃到資料庫裡的HTML語法，針對{name}變數*/}
          <p className="cart-price">${price}</p>
          <p className="cart-price2">小計 NT${price * amount}</p>
        </div>
      </div>
      <div className="counter d-flex justify-content-center">
        <Counter
          item={item}
          amount={amount}
          updateCartToLocalStorage={updateCartToLocalStorage}
        />{' '}
        {/*將值傳入屬性*/}
      </div>
    </>
  )
}

export default CartProductItem
