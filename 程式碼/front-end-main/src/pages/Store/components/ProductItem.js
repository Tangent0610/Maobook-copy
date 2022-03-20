import { Link, withRouter, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './ProductItemStyle.scss'
//元件
import { IMG_URL, API_URL } from './../../../utils/config'
import ProductDetails from '../ProductDetails'
//圖片
import Hill from '../productsImages/Hill’s-001-1.png'
import productCartIcon from '../storePic/productCartIcon.svg'

function ProductItem(props) {
  const { name, price, des, stock, id, image, item, ADDToLocalStorage } = props
  const [show, setShow] = useState(false) //Modal
  console.log('image', image)

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
      <div className="setbg ">
        <div className="product-img mt-4 ">
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
            show={show}
            setShow={setShow}
            id={id}
            name={name}
            price={price}
            des={des}
            stock={stock}
          />
        </div>
        <div>
          <h6
            className=" s-title"
            dangerouslySetInnerHTML={{ __html: name }}
          ></h6>
          <div className="s-price">${price}</div>
        </div>
      </div>
      <button
        className="productCartIcon"
        type="button"
        onClick={() => {
          ADDToLocalStorage({
            id: id,
            name: name,
            des: des,
            amount: 1,
            price: price,
            image: image,
          })
        }}
      >
        <img src={productCartIcon} alt="productCartIcon" />
      </button>
    </>
  )
}

export default withRouter(ProductItem)
