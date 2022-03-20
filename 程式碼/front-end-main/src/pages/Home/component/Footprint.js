import React from 'react'
// 引入圖片
import Paw from '../img/paw.svg'
// 引入樣式
import './Footprint.scss'

function Footprint() {
  return (
    <div className="home-footprint img-fluid">
      <div>
        <img className="paw1" src={Paw} alt="paw1" />
      </div>
      <div>
        <img className="paw2" src={Paw} alt="paw2" />
      </div>
      <div>
        <img className="paw3" src={Paw} alt="paw3" />
      </div>
    </div>
  )
}

export default Footprint
