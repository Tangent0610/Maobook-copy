import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-bootstrap'
// 引入 utils
import { API_URL, IMG_URL } from '../../../../utils/config'
// 元件
import Hashtag from './HashTag'
// 樣式
import './style/DailyCardCarousel.scss'

const gallery = [
  'https://shoplineimg.com/58a81a0d72fdc0ec2700333f/60a33d32974d6000140df206/800x.webp?source_format=jpg',
  'https://shoplineimg.com/58a81a0d72fdc0ec2700333f/60a33d30446995001dba846b/800x.webp?source_format=jpg',
  'https://shoplineimg.com/58a81a0d72fdc0ec2700333f/60a33d2c4d4c94002c7e12ea/800x.webp?source_format=jpg',
]

const CarouselItems = () => {
  return (
    <>
      {gallery.map((CarouselItems) => (
        <Carousel.Item>
          <img
            style={{ width: '100%' }}
            className="d-block w-50"
            src={`${CarouselItems}`}
            // src={`${IMG_URL}${CarouselItem}`}
            alt="First slide"
          />
          {/* <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </>
  )
}

function DailyCardCarousel(props) {
  return (
    <>
      <Carousel fade width="60%">
        <Carousel.Item>
          <div className="carousel-hashtag pl-3 pt-2">
            <Hashtag />
          </div>
          <img
            className="d-block w-100"
            src="https://shoplineimg.com/58a81a0d72fdc0ec2700333f/60a33d32974d6000140df206/800x.webp?source_format=jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>

        {/* <Carousel.Item>
          <div className="carousel-hashtag pl-3 pt-2">
            <Hashtag />
          </div>
          <img
            className="d-block w-100"
            src="https://shoplineimg.com/58a81a0d72fdc0ec2700333f/60a33d2c4d4c94002c7e12ea/800x.webp?source_format=jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-hashtag pl-3 pt-2">
            <Hashtag />
          </div>
          <img
            className="d-block w-100"
            src="https://shoplineimg.com/58a81a0d72fdc0ec2700333f/60a33d30446995001dba846b/800x.webp?source_format=jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    </>
  )
}

export default DailyCardCarousel
