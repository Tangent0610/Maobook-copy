import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './HelpedTask.scss'

// 引入圖片
import HelpedTask1 from './img/HelpedTask1.svg'
import HelpedTask2 from './img/HelpedTask2.svg'

function HelpingTask(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    let getDayHelps = async () => {
      let response = await axios.get(
        // `http://localhost:3002/api/help/dayhelps?year=${year}&month=${month}&day=${day}`
        // `http://localhost:3002/api/help/dayhelps/${year}/${month}/${day}`
        `http://localhost:3002/api/help/dayhelps/2022/03/12`
      )
      setData(response.data)
    }
    getDayHelps()
  }, [])

  return (
    <>
      <div className="helpedTask0">
        <div className="helpedTask">
          {data.map((data) => {
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
                      <div className="helpEventTitle">NT$</div>
                      <div className="helpEventPriceamount">{data.price}</div>
                    </div>
                    <div className="helpEventCasetitle">{data.title}</div>
                    <div className="HelpedTask1">
                      <img src={HelpedTask1} alt="" />
                    </div>
                  </div>

                  <button className="HelpedTaskPawbox">
                    <div className="icontext">
                      <img
                        className="HelpedTaskPawicon"
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
              </>
            )
          })}
          <br />
        </div>
      </div>
    </>
  )
}

export default HelpingTask
