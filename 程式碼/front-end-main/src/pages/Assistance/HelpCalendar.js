import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import { format, getDate, isSameDay } from 'date-fns'
import useCalendar, { WEEKS } from './components/UseCalendar'
import 'react-bootstrap'
import './components/HelpCalendar.scss'
import buttonIconL from './img/calArrowL.svg'
import buttonIconR from './img/calArrowR.svg'
import dateCircle from './img/calDateCircle.svg'

const HelpCalendar = (props) => {
  const calendar = useCalendar()

  const [data, setData] = useState([])

  useEffect(() => {
    let getCaseNum = async () => {
      let response = await axios.get(
        `${API_URL}/help/helpcalendar/` +
          // '${API_URL}/help/helcalendar'
          calendar.today.getFullYear() +
          '/' +
          (calendar.today.getMonth() + 1)
      )

      let map = response.data.reduce((accu, current) => {
        console.log(accu, current)
        if (!accu[current.day]) {
          accu[current.day] = 1
        } else {
          accu[current.day]++
        }
        return accu
      }, {})
      console.log('mapmap', map)
      setData(map)
    }
    props.setHelpDate(calendar.today)
    getCaseNum()
  }, [calendar.today])

  return (
    <>
      <div className="calendar">
        {/* 年月 & setState前後按鈕 */}
        <table>
          <thead>
            <tr>
              <td colSpan="100%" className="calendarHead">
                <div className="d-flex justify-content-center">
                  <img
                    src={buttonIconL}
                    className="imgIcon mx-5"
                    onClick={calendar.setPreMonth}
                    alt="上一個月"
                  />

                  {/* 可替換format: dd(加上日期) MM(數字月) MMMM(完整英文月) */}
                  <div className="thisYear d-inline-block">
                    {format(calendar.today, 'MMM yyyy')}
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
            <tr className="week">
              {WEEKS.map((title, i) => {
                return <td key={i}>{title}</td>
              })}
            </tr>

            {/* 分隔線 */}
            <tr>
              <td colSpan="100%">
                {' '}
                <hr className="divider" />{' '}
              </td>
            </tr>

            {/* 印出日期 */}
            {calendar.days.map((week, i) => {
              return (
                <>
                  <tr key={i}>
                    {week.map((date, i) => {
                      const otherMonth = date.otherMonth
                      //const isSelected = isSameDay(calendar.today,date.date)
                      //const className = `${
                      //    otherMonth && 'other'
                      //} ${isSelected && 'selected'}`
                      const selectedToday = () => {
                        calendar.selectDate(date.date)
                      }

                      return (
                        <>
                          <td
                            key={i}
                            // className={className}
                            className="today"
                            // onClick={selectedToday}
                          >
                              <button
                              onClick={() => {
                                props.setHelpDate(date.date)
                              }}
                            >
                            <tr>
                              <td>{!otherMonth && getDate(date.date)}</td>
                            </tr>

                            <tr>
                              <td>
                                {!otherMonth && (
                                  <div className="linkCircle">
                                    <div>
                                      {data[getDate(date.date)] ? (
                                        <div>
                                          <div className="circleText">
                                            {data[getDate(date.date)]}
                                          </div>
                                          <img
                                            src={dateCircle}
                                            className="dateCircle"
                                            alt=""
                                          />
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
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

export default HelpCalendar
