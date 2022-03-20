import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal, Form } from 'react-bootstrap'
// 引入 utils
import { API_URL, IMG_URL } from '../../../../utils/config'
import axios from 'axios'
import Swal from 'sweetalert2'
// 引入 context
import { useAuth } from '../../../../context/auth'
// 圖片
import cardLeave from './images/ZoomOut.svg'
// 樣式
import './style/DiscussBar.scss'

function DiscussModal(props) {
  const { user, setUser } = useAuth()
  const { barID } = props
  //   送出留言的state
  const [inputComment, setInputComment] = useState({
    id: '0',
    barID: '',
    memberID: '0',
    comment: '',
    // createdAt: ' ',
  })

  // 卡片內容
  const [cards, setCards] = useState([])
  console.log('cards', cards)
  //  留言列表
  const [comments, setComments] = useState([])
  // 處理錯誤
  const [errMsg, setErrMsg] = useState({ msg: '' })
  console.log('barID', barID)

  // 送出表單 (onSubmit)
  const [comment, setComment] = useState({
    comment: '',
  })

  // Card-List API
  useEffect(() => {
    let getCardList = async () => {
      let cardModalInfo = await axios.get(`${API_URL}` + '/discuss/bar-list')
      // console.log(cardModalInfo.data)
      // 欲取得後端 http://localhost:3005/api/daily/card-list 資料
      let barIDContent = cardModalInfo.data.filter((v) => {
        return v.id === barID
      })
      console.log('barIDContent', barIDContent)
      setCards(barIDContent)
      // console.log('barIDContent', barIDContent)
      // console.log('CadListResponse.data:  ', cardModalInfo.data)
    }
    getCardList()
  }, [barID])

  let getCommentList = async () => {
    let commentArr = await axios.get(`${API_URL}/discuss/comment-list/${barID}`)
    setComments(commentArr.data)
    console.log('討論文留言列表', commentArr.data)
    // console.log('CadListResponse.data:  ', cardModalInfo.data)
  }
  // 抓留言列表API
  useEffect(() => {
    console.log('barID', barID)

    getCommentList()
  }, [barID])

  console.log(inputComment)
  useEffect(() => {
    setInputComment({ ...inputComment, barID: barID })
  }, [barID])
  //   送出表單 (onSubmit)
  //   const [inputComment, setInputComment] = useState({
  //     id: '0',
  //     barID: `0`,
  //     memberID: `0`,
  //     comment: 'type sth..',
  //     createdAt: `${new Date()}`,
  //   })

  function handleChange(e) {
    setInputComment({ ...inputComment, [e.target.name]: e.target.value })
  }
  // 送出留言
  async function handleSubmit(e) {
    e.preventDefault() //關掉預設行為
    try {
      let commentRes = await axios.post(
        `${API_URL}/discuss/AddComment`,
        inputComment,
        {
          withCredentials: true,
        }
      )
      Swal.fire('已成功留言', 'success')
      setInputComment({
        id: '',
        barID: '',
        memberID: '',
        comment: '',
      })
      // 重新渲染留言列表
      setComment({
        comment: '',
      })
      getCommentList()
      console.log('測試', commentRes.data)
    } catch (e) {
      console.error('留言失敗', e.commentRes.data)
      setErrMsg({ ...errMsg, msg: e.commentRes.data.msg })
    }
  }

  // 跳出來的視窗內容
  return (
    <Modal
      {...props}
      size="xl"
      centered
      dialogClassName="modal-90w d-flex position-absulote"
      z-index="999"
    >
      {cards.map((bar) => {
        return (
          <>
            <div className="scrolling-bar-area bar-content" key={bar.id}>
              <Container>
                {/* 發文者抬頭 */}
                <Row className="mt-4">
                  <Col className="">
                    <Row>
                      <Col sm={1} md={1}>
                        {/* 大頭貼 */}
                        <div className="daily-post-avatar">
                          <img
                            src={`${IMG_URL}${bar.avatar}`}
                            alt={'card-avatar'}
                          />
                        </div>
                      </Col>
                      <Col sm={2} md={2}>
                        {bar.poster}
                        <h6 className="text-muted">{bar.created_at}</h6>
                        {/* 地點 */}
                        {/* <br />
                            ＠maobook */}
                      </Col>
                      <Col>
                        {/* 關閉 */}
                        <div className="zoomOut-btn pointer" tittle="關閉視窗">
                          <img
                            src={cardLeave}
                            onClick={props.onHide}
                            tittle="關閉視窗"
                            alt={'close-Window'}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* 發文者抬頭 end */}
                {/* 內文 */}

                <Row className="daily-post-body border-top-primary">
                  <Col>
                    {/* 內文標題 */}
                    <Row className="pt-2">
                      <Col>
                        <span className="btn-primary rounded-pill p-1 my-2 mr-3">
                          {bar.category}
                        </span>
                        <span className="h4">{bar.tittle}</span>
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
                      <Col className="text-indent">{bar.content}</Col>
                    </Row>
                  </Col>
                </Row>

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

                        <img
                          className="commenter-avatar bd-highlight"
                          alt={'card-avatar'}
                          src={`${IMG_URL}${user.image}`}
                        />

                        {/* 發文者送出留言欄位 */}
                        {/* 留言 */}
                        <input
                          type="text"
                          className="comment-border p-2 bd-highlight flex-fill text-wrap focus-primary align-bottom"
                          // value={}
                          onChange={handleChange}
                          value={inputComment.comment}
                          placeholder={'請留言..'}
                          name={'comment'}
                        />
                        {/* 文章ID */}
                        <input
                          type="hidden"
                          name="barID"
                          // onChange={handleChange}
                          value={barID}
                        />
                        <input
                          type="hidden"
                          name={`createdAt`}
                          onChange={handleChange}
                          value={inputComment.createdAt}
                        />
                        <button
                          type="submit"
                          className="btn btn-outline-primary rounded-pill py-1 my-1 "
                          onClick={handleSubmit}
                          // value={'送出'}
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
                              <div className="commenter-avatar bd-highlight">
                                {/* 留言者頭貼 */}
                                <img
                                  src={`${IMG_URL}${comment.avatar}`}
                                  alt={'comment-avatar'}
                                />
                              </div>
                              <div className="comment-border px-3 py-2 bd-highlight flex-fill ">
                                {/* 文字垂直置中 */}
                                <span className="align-text-bottom text-secondary">
                                  {comment.name}&ensp;
                                  <span className="text-middle">|</span>
                                  &ensp;
                                </span>
                                {/* 留言內容 */}
                                <span className="align-text-bottom">
                                  {comment.comment}
                                </span>
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
            </div>
          </>
        )
      })}
    </Modal>
  )
}

DiscussModal.propTypes = {}

export default DiscussModal
