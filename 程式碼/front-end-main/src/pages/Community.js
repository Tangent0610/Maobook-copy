import React from 'react'
import { Container } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import 'animate.css'
import axios from 'axios'
import { API_URL } from '../utils/config'

// 樣式
import '../style/UI/global.scss'
import './Community.scss'

// 次頁面(錨點)
import Intro from './Community/Intro'
import Discuss from './Community/Discuss'
import Daily from './Community/Daily'
import Post from './Community/ComPost'

// 懸浮元件
import Tools from './Community/component/Tools'

// 插圖
import coummunity from './Community/images/text-mao-community.svg'
import drownArrow from './Community/images/icon-down-arrow.svg'

function Community() {
  // console.log();

  return (
    <>
      <Tools />
      <img src={coummunity} className="text-community " alt="coummunity" />
      {/* .scroll-page */}
      <div className="container">
        <div className="Intro-Page ">
          <AnchorLink className="go-on d-block" href="#Daily-Page">
            一起來看看
            <br />
            大家最平凡的毛孩生活吧
            <br />
            <img src={drownArrow} />
          </AnchorLink>
          <Intro />
        </div>
        <div id="Daily-Page" className="Daily-Page" name="Daily-Page">
          <Daily />
        </div>
        <div className="Discuss-Page">
          <Discuss />
        </div>
      </div>
      <div className="Post-Page">
        <Post />
      </div>
    </>
  )
}

export default Community
