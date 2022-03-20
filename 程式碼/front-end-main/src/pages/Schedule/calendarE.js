import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/config'

import { format, getDate } from 'date-fns'
import { useCalendar, eventSelect, WEEKS } from './component/useCalendarE'
import 'react-bootstrap'
import './calendarE.scss'
import 'date-fns'
import buttonIconL from './img/scheduleIcon3.svg'
import buttonIconR from './img/scheduleIcon4.svg'

const Calendar = (props) => {
  // const [err, setError] = useState(null)
  const [data, setData] = useState([])
  const calendar = useCalendar()

  const queryEvent = async () => {
    let response = await axios.get(
      `${API_URL}/calendarE/` +
        calendar.today.getFullYear() +
        '/' +
        (calendar.today.getMonth() + 1)
    )
    setData(response.data)
  }
  useEffect(() => {
    props.setNoteDate(calendar.today)
    queryEvent()
  }, [calendar.today])

  return (
    <>
      <div className="calendarE">
        {/* 年月 & setState前後按鈕 */}
        <table
          border="0"
          cellPadding="0"
          cellSpacing="0"
          className="m-5 mx-auto"
        >
          <thead>
            <tr calssName="tr123">
              <td colSpan="100%" calssName="abc">
                <div className="d-flex justify-content-center">
                  <img
                    src={buttonIconL}
                    className="imgIconE mx-5"
                    onClick={calendar.setPreMonth}
                    alt="上一個月"
                  />
                  {/* 可替換format: dd(加上日期) MM(數字月) MMMM(完整英文月) */}
                  <div className="thisYearE d-inline-block">
                    {format(calendar.today, 'MMM  yyyy')}
                  </div>
                  <img
                    src={buttonIconR}
                    className="mx-5"
                    onClick={calendar.setNextMonth}
                    alt="下一個月"
                  />
                </div>
              </td>
            </tr>
          </thead>

          <br />

          <tbody>
            {/* 印出星期標頭 */}
            <tr className="weekendE tr123">
              {WEEKS.map((title, i) => {
                return (
                  <td key={i} className="tdsizeE">
                    {title}
                  </td>
                )
              })}
            </tr>
            {/* 印出水平線 */}
            <tr>
              <td colSpan="100%">
                {' '}
                <hr className="calenderHrE" />
              </td>
            </tr>
            {/* 印出日期 */}
            {calendar.days.map((week, i) => {
              //map出來的值是月份
              return (
                <>
                  <tr key={i}>
                    {week.map((date, i) => {
                      const otherMonth = date.otherMonth //判斷當月或是前後月
                      const selectedToday = () => {
                        calendar.selectDate(date.date)
                      }
                      const iconsvg = []
                      let checkdate = data.find((a) => {
                        return a.date == getDate(date.date)
                      })
                      let icondata =
                        checkdate === undefined ? [] : checkdate.category_id
                      for (let i = 0; i < icondata.length; i++) {
                        iconsvg.push(eventSelect(icondata[i]))
                      }

                      return (
                        <>
                          <td
                            key={i}
                            className="dayE tdsizeE"
                            // className={calendarEvent}
                          >
                            <button
                              onClick={() => {
                                props.setNoteDate(date.date)
                              }}
                            >
                              <tr className="tr123">
                                <td className="tdsizeE">
                                  {!otherMonth && getDate(date.date)}
                                </td>
                              </tr>
                              {/* 印出事件ICON */}
                              {!otherMonth && (
                                <tr className="trSizeE">
                                  {iconsvg.map((srcItem) => {
                                    return <img src={srcItem} />
                                  })}
                                </tr>
                              )}
                            </button>
                          </td>
                        </>
                      )
                    })}
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Calendar
