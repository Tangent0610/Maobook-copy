import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import { HiPlus } from 'react-icons/hi'
// 樣式
import './style/Daily.scss'
import '../Community.scss'

// 元件
import DailyCard from './component/DailyCard/DailyCard'
// 插圖
import daily from './images/text-daily.svg'
import search from './images/icon-search.svg'

function Daily(props) {
  return (
    <>
      <Container className="px-5">
        <div className="mt-5 w-50 w-sm-75 ">
          {/* 搜尋功能 */}
          {/* <div className=" daily-search input-group justify-content-center pt-3 pb-2">
          <input
            type="search"
            className="border border-primary rounded-pill mx-2 pl-4 vw-md-50 focus-primary"
            placeholder="開個話題吧.."
          />
          <Button className="rounded-circle">
            <img src={search} className="btn" />
          </Button>
        </div> */}
        </div>
        <Row className="daily-title">
          <Col md={4} className="">
            <img src={daily} />
          </Col>
          {/* <Col></Col> */}
          {/* <Col md={3}>
            <Button variant="outline-primary rounded-pill text-end">
              <HiPlus /> <a>發個文吧</a>
            </Button>
          </Col> */}
        </Row>
        <div className="daily-post-area  mao-rounded mt-lg-2 mt-md-2 container">
          <div className="daily-container text-center">
            <DailyCard />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Daily
