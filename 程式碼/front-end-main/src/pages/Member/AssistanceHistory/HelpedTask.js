import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'animate.css'
import './HelpedTask.scss'
import { API_URL } from '../../../utils/config'
import { useAuth } from '../../../context/auth'

// 引入圖片
import HelpedTask1 from './img/HelpedTask1.svg'
import HelpedTask2 from './img/HelpedTask2.svg'

function HelpedTask(props) {
  const { noteDate, setNoteDate } = props
  const [data, setData] = useState([])

  // 處理會員
  const { user, setUser } = useAuth()
  // console.log('會員編號', user.id)

  useEffect(() => {
    let getDayHelps = async () => {
      let response = await axios.get(
        `${API_URL}/help/memberGiveHistory/` + user.id
      )
      setData(response.data)
    }
    getDayHelps()
  }, [])

  console.log('response', data)

  return (
    <>
      <div className="helpedTask0">
        <div className="helpedTask">
          {data.map((data, i) => {
            return (
              <>
                <div className="helpEvent">
                  <h3 className="helpEventDate">
                    {data.date.substring(5, 7)}
                    <br />
                    {data.date.substring(8, 10)}
                  </h3>
                  <div className="helpEventDiv">
                    <div className="helpEventRegion">{data.region}</div>
                    <div className="helpEventCategory">{data.category}</div>
                    <div className="helpEventTags">{data.tag_name}</div>
                    <div className="helpEventprice">
                      <div className="helpEventTitle">NT$ </div>
                      <div className="helpEventPriceamount">{data.price}</div>
                    </div>
                    <div className="helpEventCasetitle">{data.title}</div>
                    <div className="HelpedTask1">
                      <img src={HelpedTask1} alt="" />
                    </div>
                  </div>
                  <div className="HelpedTaskPawbox">
                    <button
                      onClick={() => {
                        setNoteDate(data.id)
                      }}
                    >
                      <div className="icontext ">
                        <img
                          className="HelpedTaskPawicon "
                          src={HelpedTask2}
                          alt=""
                        />
                        <br />
                        <span className="HelpedTaskTakercount">
                          {data.taker_count}{' '}
                        </span>
                        人應徵
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )
          })}
          <br />
        </div>
      </div>
    </>
  )
}

export default HelpedTask
