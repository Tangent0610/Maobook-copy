import React from 'react'
import MainHome from './Home/MainHome'
// 引入各頁面 Intro
import Schedule from './Home/intro/HomeSchedule'
import Store from './Home/intro/HomeStore'
import Community from './Home/intro/HomeCommunity'
import Assistance from './Home/intro/HomeAssistance'
// 引入頁尾登入註冊表單
import SignUp from './Home/SignUp'
// 引入串場元件
import Start from './Home/component/Start'
import End from './Home/component/End'
import Footprint from './Home/component/Footprint'

function Home(props) {
  return (
    <>
      <MainHome />
      <Start />
      {/* 各頁面簡介開始 */}
      <Schedule />
      <Footprint />
      <Store />
      <Footprint />
      <Community />
      <Footprint />
      <Assistance />
      {/* 各頁面簡介 */}
      <End />
      <SignUp />
    </>
  )
}

export default Home
