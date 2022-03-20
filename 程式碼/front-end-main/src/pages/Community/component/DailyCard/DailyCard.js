import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Carousel,
} from 'react-bootstrap'
import './style/DailyCard.scss'
import axios from 'axios'
import 'sweetalert2'
// import { getDate } from 'date-fns'
// import { id } from 'date-fns/locale'
// 引入 context
import { useAuth } from '../../../../context/auth'
// 引入 utils
import { API_URL, IMG_URL } from '../../../../utils/config'
// 元件
import CardModal from './DailyCardModal'
import { useParams } from 'react-router-dom'

// 插圖
import photo from './images/card-photo.svg'
import like from './images/icon-like.svg'
import comment from './images/icon-comment.svg'

// 卡片 card
function DailyCard(modalProps) {
  const { user, setUser } = useAuth()
  // 彈跳視窗
  const [modalShow, setModalShow] = React.useState(false)
  //卡片內容
  const [cards, setCards] = useState([])
  const [cardID, setCardID] = useState()
  console.log('cardID父元件', cardID)
  // 在打開卡片的Detail
  const openCardDetail = (findCardId) => {
    setCardID(findCardId)
  }
  // 最新一筆留言
  const [addComment, setAddComment] = useState([])

  // 按讚收藏
  // const [like, setLike] = useState([])
  // useEffect(() => {
  //   let getPrices = async () => {
  //     let response = await axios.get(`${API_URL}/daily/like-list/${user.id}`)
  //     setLike(response.data)
  //     console.log('按讚用戶：', response.data)
  //   }
  //   getPrices()
  // }, [user.id])

  // Card-List API 測試
  const [error, setError] = useState(null)
  // lastPage 為總頁，預設是1
  const [lastPage, setLastPage] = useState(1) //預設是1

  const { currentPage } = useParams()
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1)
  console.log('CurrentPage:', currentPage, page)

  let getPages = async () => {
    let response = await axios.get(`${API_URL}/daily/card-pages?page=${page}`)
    setCards(response.data.data)
    setLastPage(response.data.pagination.lastPage)
  }
  // 抓頁數和資料的API
  useEffect(() => {
    getPages()
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
            borderColor: page === i ? '#ccc' : '#dbdbdb',
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

  // TODO: 按讚功能
  return (
    <>
      <div className="get-pages">
        <GetPages />
      </div>

      {cards.map((card) => {
        {
          /* console.log('標籤', [...hashtag]) */
        }
        return (
          <>
            <div
              key={card.id}
              id={card.id}
              className="daily-card d-inline-block"
              // 跳出視窗的點擊事件
              onClick={() => {
                setModalShow(true)
                openCardDetail(card.id)
                setCardID(card.id)
              }}
            >
              {/* [[[頭像、標籤Tag]]] */}
              <Container className="px-2">
                <Row className="card-tittle">
                  {/* <Col sm={1} md={1} lg={1}></Col> */}
                  <Col sm={3} md={3}>
                    <img
                      className="daily-avatar rounded-circle bg-secondary"
                      src={`${IMG_URL}${card.avatar}`}
                      alt={'daily-avatar'}
                    />
                  </Col>
                  {/* <Col xs={1} sm={1} md={1} lg={1}></Col> */}
                  <Col
                    sm={{ span: 7, offset: 2 }}
                    md={{ span: 7, offset: 2 }}
                    className="hash-tags"
                  >
                    {card.tags ? (
                      card.tags.split(',').map((tag, i) => {
                        return (
                          <div className="hash-tag " key={card.id}>
                            {tag ? `#${tag}` : ''}
                          </div>
                        )
                      })
                    ) : (
                      <div className="hash-tag">尚未有標籤</div>
                    )}
                  </Col>
                </Row>
              </Container>
              {/* [[[卡片主體]]] */}
              <div className="card-body">
                {/* 卡片封面圖 */}
                <img
                  className="card-img"
                  src={`${card.image}` ? `${IMG_URL}${card.image}` : photo}
                  // { photo }
                  alt="card-img"
                />

                {/* 內文 */}
                <div className="card-content">
                  {/* 卡片內文預覽 */}
                  {card.content}
                </div>
              </div>
              {/* [[[統計]]] */}
              <div className="card-counter d-line-block text-center">
                {/* 按讚數 */}
                {/* <a>
                  {card.likes} <img src={like} />
                </a> */}
                {/* 留言數 */}
                <a>
                  {card.comments} <img src={comment} />
                </a>
              </div>
            </div>
          </>
        )
      })}

      <CardModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        cardID={cardID}
      />
    </>
  )
}

export default DailyCard
