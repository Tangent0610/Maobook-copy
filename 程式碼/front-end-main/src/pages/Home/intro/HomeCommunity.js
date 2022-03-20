import React from 'react'
// 引入圖片
import WebDevelopment from '../img/web_development.svg'
import BgPaw from '../img/bg_paw.svg'
// 引用共同Intro樣式
import '../intro/HomeIntro.scss'
// 引入動態特效文件
import './IntroAnimation'

function HomeCommunity() {
  return (
    <>
      <div className="home-intro">
        <div className="home-intro-page">
          {/* 1. 簡介文字 */}
          <div className="home-info-txt">
            <h2>每一瞬美好</h2>
            <h2>都值得你與大家分享</h2>
            <br />
            <h5>溫馨的寵物餐廳</h5>
            <h5>美好的戶外踏青</h5>
            <h5>毛孩到家的第一次慶祝</h5>
            <h5>都值得你細心紀錄</h5>
          </div>
          {/* 2. 對話框 */}
          <div className="home-dialog">
            <div className="dialogBox1">
              <p>寵物界Dcard快來PO文🥳</p>
            </div>
            <div className="dialogBox2">
              <p>我家喵喵超可愛😻</p>
            </div>
            <div className="dialogBox3">
              <p>毛孩怎麼了！求解20點！</p>
            </div>
          </div>
          {/* 3. 主角插畫 */}
          <div className="home-intro-down">
            <div className="home-main-pic mx-auto">
              <img src={WebDevelopment} alt="" />
            </div>
          </div>
          {/* 4. 中文大標題 */}
          <div className="home-intro-title">
            <h1>
              毛孩
              <br />
              社群
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

export default HomeCommunity
