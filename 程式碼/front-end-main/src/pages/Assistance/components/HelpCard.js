import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import './HelpCard.scss'
import Hashtag from './HelpTag'

// 插圖
import example from '../img/example.svg'

function HelpCard(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    let cardData = async () => {
      let response = await axios.get(
        'http://localhost:3002/api/help/helpcard/台北市'
      )
      setData(response.data)
    }
    cardData()
  }, [])

  return (
    <div className="helpcard d-inline-block">
      {/* [[[頭像、標籤Tag]]] */}
      <Container className="px-2">
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            {/* <div className="helpavatar rounded-circle bg-secondary"></div> */}
            <div className="helpavatar rounded-circle bg-secondary">
              {data.user_image}
            </div>
          </Col>

          <Col xs={1} sm={1} md={1} lg={1}></Col>

          <Col xs={6} sm={6} md={6} lg={6}>
            <Hashtag style={{ width: '100%' }} className="hash-tag" />
            <div>
              {data.category}
              {data.tag_name}
            </div>
          </Col>
        </Row>
      </Container>

      {/* [[[主體]]] */}
      <div className="card-body">
        {/* 圖片 */}
        <div className="imgandregion">
          <img className="card-img" src={example} alt="" />
          {/* <img className="card-img" src={data.image} alt="" /> */}
          <div className="cardregion">{data.region}</div>
          <div className="cardregion">{data.date}</div>
        </div>
        {/* 內文 */}
        <div className="card-content pt-3 px-3">{data.title}</div>
      </div>

      {/* [[[價格]]] */}
      <div className="card-footer d-line-block text-center my-3">
        <div className="cardprice">$ {data.price}</div>
      </div>
    </div>
  )
}

HelpCard.propTypes = {}

export default HelpCard
