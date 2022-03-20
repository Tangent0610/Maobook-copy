// 引入 React 功能
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

// 引入 utils
import { API_URL } from '../../utils/config'
import 'react-bootstrap'
// import 'bootstrap' react 說找不到所以先註解起來
import './Notes.scss'
import { format } from 'date-fns'

// 引入圖片
import star from './img/scheduleIcon5.svg'
// import event1 from './img/event1.svg';
// 線段圖片
import event9 from './img/event9.svg'
import event10 from './img/event10.svg'
import event11 from './img/event11.svg'
import event12 from './img/event12.svg'
import event0 from './img/event0.svg'
import event00 from './img/event00.svg'

// import event5 from './img/event5.svg';

function Notes({ NoteDate }) {
  // const {notedate, setNotedate}=props;
  const [data, setData] = useState([])
  console.log(NoteDate)

  // API
  const queryEvent = async () => {
    let response = await axios.get(
      `${API_URL}/calenderNote/` +
        NoteDate.getFullYear() +
        '/' +
        (NoteDate.getMonth() + 1)
    )
    setData(response.data)
  }
  useEffect(() => {
    queryEvent()
  }, [NoteDate])
  let CheckData = data.filter((a) => {
    return a.DATE == NoteDate.getDate()
  })

  // 判斷事件顏色直線
  function eventColor(i) {
    switch (i) {
      case 1:
        return event9
      case 2:
        return event10
      case 3:
        return event11
      case 4:
        return event12
      default:
        return ''
    }
  }

  // 判斷事件TAG背景顏色
  function eventbackground(i) {
    switch (i) {
      case 1:
        return 'scheduleEvents9tagsText'
      case 2:
        return 'scheduleEvents10tagsText'
      case 3:
        return 'scheduleEvents11tagsText'
      case 4:
        return 'scheduleEvents12tagsText'
      default:
        return ''
    }
  }

  // 判斷是否為當月重要事件
  function MonthStar(i) {
    switch (i) {
      case 1:
        return event0
      case 0:
        return event00
      default:
        return ''
    }
  }

  // 判斷有沒有重要事件的星星
  function showStar(i) {
    switch (i) {
      case 1:
        return event0
      case 0:
        return event00
      default:
        return ''
    }
  }

  return (
    <>
      <div className="scheduleNotes">
        <div className="scheduleNotesStar">
          <div className="scheduleNotesStarTitle">
            <img src={star} className="notesStarImg" />
            <h3 className="scheduleNotesStarH1" bg-light border>
              本月重要記事
            </h3>
          </div>
          <div className="scheduleNotesStarbox">
            <div className="scheduleEvents">
              {data.length == 0 ? (
                <div>
                  <b className="restTime">目前沒有重要記事喔</b>
                </div>
              ) : (
                data.map((item, i) => {
                  return (
                    <>
                      {!item.importance == 0 && (
                        <div className="asd">
                          <div className="scheduleEvents1">
                            <p className="scheduleEventDay">{item.DATE}</p>
                            {/* <img src={event1} className="events1Img" /> */}
                          </div>
                          <div className="scheduleEvents2">
                            <img
                              src={eventColor(item.category_id)}
                              className="scheduleEvents2Img"
                              alt="pet event category"
                            />
                          </div>
                          {/* 處理要不要印星星  0不印 1要印 */}
                          <div className="scheduleEvents3">
                            <img src={event0} alt="pet event category" />
                            {item.importer}
                          </div>
                          {item.tags.map((tag, i) => {
                            console.log('item', item)
                            return (
                              <div className="scheduleEvents4 d-flex">
                                <div className="bbb">
                                  <div
                                    className={eventbackground(
                                      item.category_id
                                    )}
                                  >
                                    {tag}
                                  </div>
                                  {/* <img src={event5} className="scheduleEvents4tags"/> */}
                                </div>
                              </div>
                            )
                          })}
                          <div className="aaaaaa"></div>
                          <div className="scheduleEvents5">
                            {/* {item.name} */}
                            {item.title}
                          </div>
                          <br />
                        </div>
                      )}
                    </>
                  )
                })
              )}
            </div>
          </div>
        </div>

        <div></div>

        <div className="scheduleNotesToday">
          <h3 className="scheduleNotesTodayTitle">
            {' '}
            當日行程 {format(NoteDate, 'yyyy/MM/dd')}
          </h3>
          <div className="scheduleNotesTodaybox">
            <div>
              {CheckData.length == 0 ? (
                <div>
                  <b className="restTime">本日沒有行程喔～快去安排吧！</b>
                </div>
              ) : (
                CheckData.map((Dateitem, i) => {
                  return (
                    <>
                      <div className="asd">
                        <div className="scheduleEvents1">
                          <p className="scheduleEventDay"></p>
                          {/* <img src={event1} className="events1Img" /> */}
                        </div>
                        <div className="scheduleEvents2">
                          <img
                            src={eventColor(Dateitem.category_id)}
                            className="scheduleEvents2Img"
                            alt="pet event"
                          />
                        </div>
                        <div className="scheduleEvents3">
                          <img
                            src={showStar(Dateitem.importance)}
                            alt="pet important event"
                          />
                        </div>
                        <div className="scheduleEvents4">
                          {Dateitem.tags.map((Datetag, i) => {
                            return (
                              <>
                                <div className="scheduleEvents4 d-flex">
                                  <div className="bbb">
                                    {/* <img src={event5} className="scheduleEvents4tags"/> */}
                                    <div
                                      className={eventbackground(
                                        Dateitem.category_id
                                      )}
                                    >
                                      {Datetag}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                          })}
                        </div>
                        <div className="aaaaaa"></div>
                        <div className="scheduleEvents5">{Dateitem.title}</div>

                        <br />
                      </div>
                    </>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Member.propTypes = {}

export default Notes
