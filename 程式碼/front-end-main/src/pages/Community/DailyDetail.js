import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Modal, Containerm, Row, Col } from 'react-bootstrap'
// 引入 utils
import { API_URL, IMG_URL } from '../../utils/config'
// 樣式
import './style/Daily.scss'
import '../Community.scss'

//

//\\ [[[彈出視窗]]] //\\
function DailyDetail(modalProps) {
  // 卡片內容
  const [cards, setCards] = useState([])
  //  留言列表
  const [comments, setComments] = useState([])
  // 處理錯誤
  const [errMsg, setErrMsg] = useState({ msg: '' })
  const { cardID } = modalProps
  console.log('cardID', cardID)

  // 送出表單 (onSubmit)
  const [comment, setComment] = useState({
    comment: '',
  })
  // function handleChange(e) {
  //   setComments({ ...comment, [e.target.name]: e.target.value })
  // }

  // Card-List API
  useEffect(() => {
    let getCardList = async () => {
      let cardModalInfo = await axios.get(
        `${API_URL}` + '/discuss/discuss-list'
      )
      // console.log(cardModalInfo.data)
      // 欲取得後端 http://localhost:3005/api/daily/card-list 資料
      let cardIDContent = cardModalInfo.data.filter((v) => {
        return v.id === cardID
      })
      // console.log('XXX', cardIDContent)
      setCards(cardIDContent)
      // console.log('cardIDContent', cardIDContent)
      // console.log('CadListResponse.data:  ', cardModalInfo.data)
    }
    getCardList()
  }, [cardID])

  // 抓留言列表API
  // useEffect(() => {
  //   console.log('cardID', cardID)
  //   let getCommentList = async () => {
  //     let commentArr = await axios.get(
  //       `${API_URL}/discuss/comment-list/${cardID}`
  //     )
  //     setComments(commentArr.data)
  //     console.log('留言列表', commentArr.data)
  //     // console.log('CadListResponse.data:  ', cardModalInfo.data)
  //   }
  //   getCommentList()
  // }, [cardID])

  // // 送出表單 (onSubmit)
  // const [inputComment, setInputComment] = useState('')

  // function handleChange(e) {
  //   inputComment({ ...inputComment, [e.target.name]: e.target.value })
  // }
  // // 送出留言
  // async function handleSubmit(e) {
  //   e.preventDefault() //關掉預設行為
  //   //setInputComment('') //送出後清空欄位
  //   try {
  //     let commentRes = await axios.post(
  //       'http://localhost:3002/api/daily/AddComment',
  //       inputComment,
  //       {
  //         withCredentials: true,
  //       },
  //       Swal.fire('已成功留言', '請重新整理', 'success')
  //     )
  //     console.log('測試', commentRes.data)
  //   } catch (e) {
  //     console.error('留言失敗', e.response.data)
  //     setErrMsg({ ...errMsg, msg: e.response.data.msg })
  //   }
  // }

  // 跳出來的視窗內容
  return (
    <Modal
      {...modalProps}
      size="xl"
      centered
      dialogClassName="modal-90w d-flex position-absulote"
      z-index="999"
    >
      <Container>
        {/* 彈出式視窗: 左側 */}

        <Row className="card-detail-modal">
          <Col xs={12} md={6} className="card-detail-slider bg-black">
            {cards.map((card) => {
              return (
                <>
                  <div className="carousel-hashtag">{/* <Hashtag /> */}</div>
                  <img
                    className="carousel-img"
                    src={`${IMG_URL}${card.image}`}
                    alt="First slide"
                  />
                </>
              )
            })}
          </Col>
          <Col xs={6} md={6} className="px-5 overflow-y-scroll">
            {/* 關閉 */}
            <div className="zoomOut-btn" tittle="關閉視窗">
              <img
                src={cardLeave}
                onClick={modalProps.onHide}
                tittle="關閉視窗"
                alt={'close-Window'}
              />
            </div>
            {/* 彈出式視窗: 右側 */}
            <Container fluid className="scrolling-area">
              {/* 發文者抬頭 */}

              <Row className="mt-4">
                <Col className="">
                  <Row>
                    {cards.map((card) => {
                      return (
                        <>
                          <Col sm={2} md={2}>
                            {/* 大頭貼 */}
                            <div className="daily-post-avatar" key={card.id}>
                              <img
                                src={`${IMG_URL}${card.avatar}`}
                                alt={'card-avatar'}
                              />
                            </div>
                          </Col>
                          <Col sm={3} md={3}>
                            {card.poster}
                            {/* 地點 */}
                            {/* <br />
                        ＠maobook */}
                          </Col>
                        </>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
              {/* 發文者抬頭 end */}
              {/* 內文 */}
              {cards.map((card) => {
                return (
                  <>
                    <Row
                      className="daily-post-body border-top-primary"
                      key={card.id}
                    >
                      <Col>
                        {/* 內文標題 */}
                        <Row className="pt-2">
                          <Col>
                            <h4>{card.tittle}</h4>
                            <h6 className="text-muted">{card.created_at}</h6>
                          </Col>
                          <Col
                            sm={{ span: 2, offset: 3 }}
                            md={{ span: 2, offset: 3 }}
                            className="text-center text-primary"
                          >
                            {/* <img src={pawpaw} />
                            收藏 */}
                          </Col>
                        </Row>
                        <Row className="py-3">
                          <Col className="text-indent">{card.content}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )
              })}
              {/* 內文 end */}
              {/* 留言 */}
              <Row className="daily-post-comment border-top-primary">
                <Col>
                  <div className="comment-bar"></div>
                  <ul className="comment-list">
                    {/* 發文者 */}
                    <Form className="comment-list-rows">
                      <div className="comment-no py-2 invisibility  mr-1 ">
                        B0
                      </div>
                      {cards.map((card) => {
                        return (
                          <>
                            <img
                              className="commenter-avatar bd-highlight"
                              alt={'card-avatar'}
                              src={`${IMG_URL}${card.avatar}`}
                              key={card.id}
                            />
                          </>
                        )
                      })}
                      {/* 發文者送出留言欄位 */}
                      <input
                        type="text"
                        className="comment-border p-2 bd-highlight flex-fill text-wrap"
                        // value={}
                        onChange={(e) => setInputComment(e.target.value)}
                        // onChange={handleChange}
                        value={inputComment.comment}
                        placeholder={'請留言...'}
                        id={cardID}
                        name="comment"
                      />
                      <button
                        type="submit"
                        className="btn btn-outline-primary rounded-pill py-1 my-1 "
                        onClick={handleSubmit}
                      >
                        送出
                      </button>
                    </Form>
                    {comments.map((comment) => {
                      return (
                        <>
                          {/* 留言列表 */}
                          <li
                            className="comment-list-rows"
                            key={comment.diary_id}
                          >
                            {/* TODO 文字垂直置中 */}
                            <span className="align-text-bottom">
                              {comment.name}
                            </span>
                            <div className="commenter-avatar bd-highlight">
                              {/* 留言者頭貼 */}
                              <img
                                src={`${IMG_URL}${comment.avatar}`}
                                alt={'comment-avatar'}
                              />
                            </div>
                            <div className="comment-border px-3 py-2 bd-highlight flex-fill ">
                              {/* 留言內容 */}
                              {comment.comment}
                            </div>
                          </li>
                        </>
                      )
                    })}
                    {/* 留言列表end */}
                  </ul>
                </Col>
              </Row>
              {/* 留言 end */}
            </Container>
          </Col>
        </Row>
      </Container>
    </Modal>
  )
}

//\\ [[[彈出視窗end]]] //\\

export default DailyDetail
