import React, { useEffect } from 'react'
// 引入圖片
import Paw from '../img/paw.svg'
import GiftBox from '../img/giftbox.svg'
import GiftBack from '../img/giftback.svg'
// 引入樣式
import './Start.scss'
// 引入動畫套件
import 'animate.css'
// 引入動畫套件
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Swal from 'sweetalert2'

function Start() {
  // 動畫ㄧ 腳印fade in
  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    gsap.from('.starting', {
      scrollTrigger: '.paw3',
      duration: 0.5,
      opacity: 0,
      stagger: 0.5,
    })
  })

  //動畫二 點擊禮物
  function clickGiftBox() {
    Swal.fire({
      title: '立即註冊 領取新會員專屬小禮物',
      width: 600,
      padding: '3em',
      color: '#6a5f4b',
      background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      backdrop: `
        rgba(0,0,10,0.5)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    })
  }

  return (
    <>
      <div className="home-start">
        {/* 小腳印*4 */}
        <div className="content-up">
          <div className="starting">
            <img className="paw1" src={Paw} alt="paw1" />
          </div>
          <div className="starting">
            <img className="paw2" src={Paw} alt="paw2" />
          </div>
          <div className="starting">
            <p className="paw-txt1">
              你也有一個
              <br />
              一直陪伴著你的毛孩嗎
            </p>
          </div>
          <div className="starting">
            <img className="paw3" src={Paw} alt="paw3" />
          </div>
          <div className="starting">
            <img className="paw4" src={Paw} alt="paw4" />
          </div>
        </div>
        {/* 禮物 */}
        <div className="content-down">
          <div className="paw-txt1">
            <p>
              每個毛小孩的到來
              <br />
              都是一份獨一無二的禮物
            </p>
          </div>
          <div className="gift">
            <img
              className="giftbox"
              src={GiftBox}
              alt="giftbox"
              onClick={clickGiftBox}
            />
            <img className="giftback" src={GiftBack} alt="giftback" />
          </div>
          <div>
            <p>
              讓毛毛日記和你一起
              <br />
              用心陪伴牠們的一生
              <br />
              MAO BOOK
              <br />
              您最貼心的寵物管家
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Start
