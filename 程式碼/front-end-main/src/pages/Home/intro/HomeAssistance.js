import React from 'react'
// 引入圖片
import PlayingFetch from '../img/playing_fetch.svg'
import BgPaw from '../img/bg_paw.svg'
// 引用共同Intro樣式
import '../intro/HomeIntro.scss'
// 引入動態特效文件
import './IntroAnimation'

function HomeAssistance() {
  return (
    <>
      <div className="home-intro">
        <div className="home-intro-page">
          {/* 1. 簡介文字 */}
          <div className="home-info-txt">
            <h2>生活總有無法抽身的時候</h2>
            <h2>讓身旁的人幫助你吧</h2>
            <br />
            <h5>工作忙不過來</h5>
            <h5>臨時有事外出</h5>
            <h5>找一位信任的朋友</h5>
            <h5>請他完成你的委託</h5>
          </div>
          {/* 2. 對話框 */}
          <div className="home-dialog">
            <div className="dialogBox1">
              <p>臨時要出門怎麼辦QQ</p>
            </div>
            <div className="dialogBox2">
              <p>要加班來不及去遛狗</p>
            </div>
            <div className="dialogBox3">
              <p>如果有人能幫忙就好了</p>
            </div>
          </div>
          {/* 3. 主角插畫 */}
          <div className="home-intro-down">
            <div className="home-main-pic mx-auto">
              <img src={PlayingFetch} alt="" />
            </div>
          </div>
          {/* 4. 中文大標題 */}
          <div className="home-intro-title">
            <h1>
              毛孩
              <br />
              互助
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

export default HomeAssistance
