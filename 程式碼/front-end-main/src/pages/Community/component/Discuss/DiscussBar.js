import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'

// 引入 utils
import { API_URL, IMG_URL } from '../../../../utils/config'
// 樣式
import './style/DiscussBar.scss'
// 元件
import DiscussModal from './DiscussModal'
// 插圖
import rightArrow from './images/icon-right-arrow.svg'
import pawpaw from './images/icon-float-paw.svg'

function DiscussBar(props) {
  // 彈跳視窗
  const [barModalShow, setBarModalShow] = React.useState(false)
  //討論內容
  const [bars, setBars] = useState([])
  const [barID, setBarID] = useState()
  console.log('barIDFU', barID)
  // lastPage 為總頁，預設是1
  const [lastPage, setLastPage] = useState(1) //預設是1
  // 頁數
  const { currentPage } = useParams()
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1)
  console.log('CurrentPage:', currentPage, page)
  // 在打開卡片的Detail
  const openBarDetail = (findBarId) => {
    setBarID(findBarId)
    // setInputComment({ ...inputComment, cardID: findCardId })
  }
  // Bar-List API
  // 抓頁數和資料的API
  useEffect(() => {
    let getPrices = async () => {
      let response = await axios.get(
        `${API_URL}/discuss/discuss-pages?page=${page}`
      )
      setBars(response.data.data)
      setLastPage(response.data.pagination.lastPage)
    }
    getPrices()
  }, [page]) //讓資料跟著page一起改變
  // 插入分頁的JSX
  const GetPages = () => {
    let pages = []
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            backgroundColor: page === i ? '#F6BC54' : '',
            borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          key={i}
          onClick={(e) => {
            setPage(i)
            // navigate(`/daily/${cardId}/${i}`)
          }}
        >
          {i}
        </li>
      )
    }
    return pages
  }

  return (
    <>
      <GetPages />
      {bars.map((bar) => {
        return (
          <>
            <div
              className="post-bars pointer"
              key={bar.id}
              id={bar.id}
              onClick={() => {
                setBarModalShow(true)
                openBarDetail(bar.id)
                setBarID(bar.id)
              }}
            >
              <div className="post-date">
                {bar.month}/{bar.date}
              </div>

              <img
                className="discuss-avatar rounded-circle bg-secondary"
                src={`${IMG_URL}${bar.avatar}`}
                alt=""
              />
              <div className="bar-container">
                <div className="bar-border">
                  {/* <div className="category">{bar.category}</div> */}
                  <div className="tags">{bar.category}</div>
                  <div className="bar-title1 ">{bar.tittle}</div>
                  <div className="bar-title2 ">{bar.content}</div>
                  <div className="arrowicon">
                    <img src={rightArrow} className="arrow" alt="" />
                    <img src={pawpaw} className="d-none paw" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}
      <DiscussModal
        show={barModalShow}
        onHide={() => setBarModalShow(false)}
        barID={barID}
      />
    </>
  )
}

DiscussBar.propTypes = {}

export default DiscussBar
