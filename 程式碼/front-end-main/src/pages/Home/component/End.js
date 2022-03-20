import React from 'react'
// 引入圖片
import Paw from '../img/paw.svg'
import Ending from '../img/home_end.svg'
// 引入樣式
import './Start.scss'

function End() {
  return (
    <>
      <div className="home-start">
        {/* 小腳印*4 */}
        <div className="content-up">
          <div>
            <img className="paw1" src={Paw} alt="paw1" />
          </div>
          <div>
            <img className="paw2" src={Paw} alt="paw2" />
          </div>
          <div className="paw-txt1">
            <p>
              最暖心的毛孩網站
              <br />
              歡迎你的加入
            </p>
          </div>
          <div>
            <img className="paw3" src={Paw} alt="paw3" />
          </div>
          <div>
            <img className="paw4" src={Paw} alt="paw4" />
          </div>
        </div>
        {/* 結尾 */}
        <div className="content-down">
          <div>
            <img className="ending" src={Ending} alt="giftbox" />
          </div>
          <div>
            <p className="py-0">開始書寫你和毛孩的故事</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default End
