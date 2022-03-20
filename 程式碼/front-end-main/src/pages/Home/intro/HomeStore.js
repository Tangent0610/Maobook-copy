import React, { useEffect } from 'react'
// 引入圖片
import Shop from '../img/shop.svg'
import BgPaw from '../img/bg_paw.svg'
// 引用共同Intro樣式
import '../intro/HomeIntro.scss'
// 引入動態特效文件
import './IntroAnimation'

function HomeStore() {
  return (
    <>
      <div className="home-intro">
        <div className="home-intro-page">
          {/* 1. 簡介文字 */}
          <div className="home-info-txt">
            <h2>每個毛孩</h2>
            <h2>都有最適合牠的禮物</h2>
            <br />
            <h5>毛孩乾食、濕食、點心</h5>
            <h5>舒服的被窩、合適的玩具</h5>
            <h5>在這裡，你可以找到最適合毛孩的禮物</h5>
          </div>
          {/* 2. 對話框 */}
          <div className="home-dialog">
            <div className="dialogBox1">
              <p>買罐罐、買零食✨</p>
            </div>
            <div className="dialogBox2">
              <p>這件小毯毯好可愛❤️</p>
            </div>
            <div className="dialogBox3">
              <p>買個小玩具給他吧</p>
            </div>
          </div>
          {/* 3. 主角插畫 */}
          <div className="home-intro-down">
            <div className="home-main-pic mx-auto">
              <img src={Shop} alt="shop" />
            </div>
          </div>
          {/* 4. 中文大標題 */}
          <div className="home-intro-title">
            <h1>
              毛孩
              <br />
              選物
            </h1>
          </div>
          {/* 5. 背景大腳印 */}
          <div className="home-bg-paw">
            <img src={BgPaw} alt="bg-paw" />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeStore
