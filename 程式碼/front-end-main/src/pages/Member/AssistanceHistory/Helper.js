// 引入 React 功能
import React from 'react'
import { useEffect, useState } from 'react'

// 引入 utils
import axios from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../../utils/config'
import 'react-bootstrap'
import './Helper.scss'

function Helper(props) {
  const [data, setData] = useState([])
  const { noteDate, setNoteDate } = props

  // 處理錯誤
  const [errMsg, setErrMsg] = useState({ msg: '' })

  // 讀取案件資料API
  const getTaker = async () => {
    let response = await axios.get(`${API_URL}/history/` + noteDate)
    setData(response.data)
  }
  useEffect(() => {
    getTaker()
  }, [noteDate])

  // radio
  const [eventTag, setEventTag] = useState('0')
  const [schedule, setSchedule] = useState({
    category: '0',
    noteDate: '0',
  })

  // 修改案件狀態API
  async function handleSubmit(e) {
    e.preventDefault() //關掉預設行為
    try {
      Swal.fire('確定回覆', '已寄信通知並寫入行事曆', 'success')
      let response = await axios.post(
        `${API_URL}/history/caseState/`,
        schedule,
        {
          withCredentials: true,
        }
      )
    } catch (e) {
      console.error('寫入資料庫失敗', e.response.data)
      setErrMsg({ ...errMsg, msg: e.response.data.msg })
    }
  }

  // 媒合成功寫入API  從這裡開始複製
  const [schedule2, setSchedule2] = useState({
    date: '2022-05-16 00:00:00', // 看一下案子是哪天
    important: '1',
    pets: '0', // 看一下寵物編號
    tagOne: '巧虎',
    tagTwo: '互助接案',
    category: '4',
    textareaValue: '您有與許巧虎的接案互助的委託要進行喔！',
  })

  function handleChange(e) {
    setSchedule2({ ...schedule2, [e.target.name]: e.target.value })
  }

  async function handleSubmitSchedual(e) {
    e.preventDefault() //關掉預設行為

    try {
      // Swal.fire('已成功建立行事曆', '請重新整理', 'success')
      let response = await axios.post(
        `${API_URL}/calenderForm/register`,
        schedule2,
        {
          withCredentials: true,
        }
      )
      //重新渲染
    } catch (e) {
      console.error('寫入行事曆失敗', e.response.data)
      setErrMsg({ ...errMsg, msg: e.response.data.msg })
    }
    // alert('已成功建立行事曆')
    // Swal.fire('Any fool can use a computer')
  }
  // 到這裡結束

  return (
    <>
      {data.map((item, i) => {
        return (
          <div className="helper">
            <div className="helpPeople">
              <div className="helpPhoto">
                {item.image}
                {/* <img src={item.image} /> */}
              </div>
              <div className="helpName">
                <h6 className="nameTextH3">{item.takerName}</h6>
                <p className="nameTextp">maobook</p>
              </div>
            </div>

            <hr className="helperBr" />

            <div className="helpInfo">
              <div className="helpInfoUp">
                <h6>信箱：{item.takerEmail} </h6>
                <h6>電話：{item.takerMobile}</h6>
              </div>
              <div className="helpInfoDown">
                <div className="helpInfoIcon">
                  {/* <fieldset id="category"> */}
                  <label
                    for="a"
                    className={`labelNo ${eventTag === '1' ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      id="a"
                      name="category"
                      value="1"
                      check={'1' === eventTag}
                      onClick={(e) => {
                        setEventTag(e.target.value)
                        setSchedule({
                          ...schedule,
                          takenemail: item.takerEmail,
                          noteDate: item.case_id,
                          category: e.target.value,
                        })
                      }}
                      className="inputCircle"
                    />
                  </label>

                  <label
                    for="b"
                    className={`labelOk ${eventTag === '2' ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      id="b"
                      name="category"
                      value="2"
                      check={'2' === eventTag}
                      onChange={(e) => {
                        setEventTag(e.target.value)
                        setSchedule({
                          ...schedule,
                          takenemail: item.takerEmail,
                          noteDate: item.case_id,
                          category: e.target.value,
                        })
                      }}
                      className="inputCircle"
                    />
                  </label>

                  <label
                    for="c"
                    className={`labelDo lg ${eventTag === '3' ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      id="c"
                      name="category"
                      value="3"
                      check={'3' === eventTag}
                      onChange={(e) => {
                        setEventTag(e.target.value)
                        setSchedule({
                          ...schedule,
                          takenemail: item.takerEmail,
                          noteDate: item.case_id,
                          category: e.target.value,
                        })
                        handleSubmitSchedual(e)
                      }}
                      className="inputCircle"
                    />
                  </label>

                  <label
                    for="d"
                    className={`labelFinish ${
                      eventTag === '4' ? 'active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      id="d"
                      name="category"
                      value="4"
                      check={'4' === eventTag}
                      onChange={(e) => {
                        setEventTag(e.target.value)
                        setSchedule({
                          ...schedule,
                          takenemail: item.takerEmail,
                          noteDate: item.case_id,
                          category: e.target.value,
                        })
                      }}
                      className="inputCircle"
                    />
                  </label>

                  {/* </fieldset> */}
                </div>
              </div>
            </div>

            <hr className="helperBr" />

            <div className="helpTextDiv">
              <div>
                <p className="helpText">{item.content}</p>
              </div>
              <div>
                <button
                  className="HelperSummitButton"
                  type="submit"
                  onClick={handleSubmit}
                  data-dismiss="alert"
                >
                  確定回覆
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </>
    //   )
    // }
  )
}

export default Helper
