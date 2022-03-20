import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/config"
import { format } from 'date-fns'


import './components/DayHelps.scss'
import pawicon from './img/paw.svg'
import arrowright from './img/arrowright.svg'

import HelpDetail from './HelpDetail'
import Pagination from '../Store/components/Pagination';


function DayHelps({ HelpDate }) {
  const [data, setData] = useState([])

  const [showdetail, setShowdetail] = React.useState(false)
  const [detailid, setDetailid] = useState()
  const OpenHelpdetail = (detailid) => {
    setDetailid(detailid)}

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    let getDayHelps = async () => {
      let response = await axios.get(
        `${API_URL}/help/dayhelps/`+        
        HelpDate.getFullYear() +
        '/' +
        (HelpDate.getMonth() + 1) +
        '/' +
        HelpDate.getDate() +
        `?page=${page}`)
      setData(response.data.data);
      setLastPage(response.data.pagination.lastPage);
    }
    getDayHelps()
  }, [HelpDate, page])

  return (
    <>
      <div className="dayhelps">
        <div className="maintitle">{format(HelpDate, 'yyyy/MM/dd')}的所有案件</div>
        <div className="mainframe">
          {data.length == 0 ? (
                <div className="nodayhelp">這一天還沒有案件喔！</div>
              ) : (        
          data.map((data) => {
            return (
              <>
                <div className="bars"
                              key={data.id}
                              id={data.id}
                              onClick={() => {
                                setShowdetail(true)
                                OpenHelpdetail(data.id)
                                setDetailid(data.id)
                              }}>
                  <div className="headdate">
                    {data.date.substring(5, 7)}/{data.date.substring(8, 10)}
                  </div>

                  <div className="datadisplay">
                    <div className="region">{data.region}</div>
                    <div className="category">{data.category}</div>
                    <div className="tags">{data.tag_name}</div>
                    <div className="price">
                      <div className="pricetitle">NT$ </div>
                      <div className="priceamount">{data.price}</div>
                    </div>
                    <div className="casetitle">{data.title}</div>
                    <div className="arrowicon">
                      <img src={arrowright} alt="" />
                    </div>
                  </div>

                  <div className="pawbox">
                    <img className="pawicon" src={pawicon} alt="" />
                    <div className="icontext">
                      已有{' '}
                      <span className="takercount">{data.taker_count} </span>
                      人應徵
                    </div>
                  </div>
                </div>
              </>
            )}
          ))}
          <HelpDetail
        show={showdetail}
        onHide={() => setShowdetail(false)}
        detailid={detailid}
      />
      <div className='dayhelppage'><Pagination page={page} lastPage={lastPage} setPage={setPage} /></div>
        </div>
      </div>
    </>
  )
}

export default DayHelps
