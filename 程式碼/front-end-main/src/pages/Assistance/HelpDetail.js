import { Modal, Button, Row, Col, Carousel } from 'react-bootstrap'
import { Form, FormControl, Container, Dropdown, DropdownButton } from 'react-bootstrap'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import Swal from 'sweetalert2'
import axios from 'axios'
import { API_URL,  IMG_URL } from "../../utils/config"

import './components/HelpDetail.scss'

import example from './img/helpexample.jpeg'
import emptypaw from './img/emptypaw.svg'
import helpclosebutton from './img/helpclosebutton.svg'
import fullpaw from './img/paw.svg'
import userimage from './img/helpuserimage.svg'

function HelpDetail(props) {
  const { detailid } = props
  const [data, setData] = useState([])

  const { user, setUser } = useAuth()
  const [errMsg, setErrMsg] = useState({ msg: '' })

  const [helpdetailpost, setHelpdetailpost] = useState({
    caseid: detailid,
    contact: 'phone',
    content: '請輸入內容',
  })


  useEffect(() => {
    let getHelpDetail = async () => {
      let response = await axios.get(
        `${API_URL}/help/helpdetails/${detailid}`
      )
      setData(response.data)
    }
    getHelpDetail()
    setHelpdetailpost({...helpdetailpost, caseid: detailid})
  }, [detailid])

  function handleHelpDetailChange(e) {
    setHelpdetailpost({ ...helpdetailpost, [e.target.name]: e.target.value })
  }

  async function handleHelpDetailSubmit(e) {
    Swal.fire('應徵成功', '', 'success')
    e.preventDefault() 
    try {
      let response = await axios.post(`${API_URL}/help/helptake`, helpdetailpost, {
        withCredentials: true,
      })
      console.log('Add資料', response.data)
    } catch (e) {
      console.error('應徵失敗', e.response.data)
      Swal.fire({
        icon: 'error',
        title: '應徵失敗',
        text: { ...errMsg, msg: e.response.data.msg },
      })
    }
  }

  return (
    <Modal
    {...props}
      // size="lg"
      centered
      dialogClassName="modal-100w d-flex"
      z-index="999"
      >
      {data.map((data) => {
        return (
          <div className='helpdetailmodal'>
          <div className="helpdetails">
            <div className="lefeside">
              <img src={require('./img/' + [data.image])} className="helpdetailimg" alt="" />
            </div>

            <div className="rightside">
              <div className="righthead">
                <div className="helpdetailuser">
                  {/* <img src={userimage} className="helpdetailuserimage" alt="" /> */}
                  <img src={`${IMG_URL}${data.user_image}`} className="helpdetailuserimage" alt="" />
                </div>
                <div className="helpdetailusername">
                  {data.user_name}
                  <br />@ Maobook
                </div>
                <div className="helpdetailclose">
                  <img
                    className="helpclosebutton"
                    src={helpclosebutton}
                    onClick={props.onHide}
                    tittle="關閉視窗"
                    alt={'close'}
                  />
                </div>
              </div>
              <hr className="rightdivider" />

              <div className="rightbody">
                <div className="bodyinfo1">
                  <div className="detailregion">{data.region}</div>
                  <div className="detailcategory">{data.category}</div>
                  <div className="detailtags">{data.tag_name}</div>
                  <div className="detailprice">報酬 NT$ {data.price}</div>
                  <div className="detailimg">
                    <img src={emptypaw} alt="" />
                  </div>
                </div>

                <div className="bodyinfo2">
                  <div className="detailcasetitle">{data.title}</div>
                  <div className="detailtime">{data.date}</div>
                </div>

                <div className="casecontent">{data.content}</div>

                <hr className="rightdivider" />

                <div className="rightfoot">
                  <div className="showpaw">
                    <img className="pawicon" src={fullpaw} alt="" />
                    <br />
                    <div className="pawtext">我要應徵</div>
                  </div>

                  <div className="takerpost">
                    <div className="contactchoice">
                    <div className="choosetitle">聯絡方式</div>
                    <div class="dropdown">
                  <select
                      name="contact"
                      title="聯絡方式"
                      className="helpchoosecontact"
                      type="select"
                      value={helpdetailpost.contact}
                      onChange={handleHelpDetailChange}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                  >
                    <option className="dropdown-item" value="phone">提供手機</option>
                    <option className="dropdown-item" value="email">提供信箱</option>
                   </select>
                  </div>

                      {/* <div className="choosetitle">聯絡方式</div>
                      <div className="choosephone">提供手機</div>
                      <div className="chooseemail">提供信箱</div> */}
                    </div>

                    <div className="textpost">
                      <div className="takercontenttitle">我要留言</div>
                      <textarea className="takertextarea" name="content" value={helpdetailpost.content}
                    onChange={handleHelpDetailChange}>請輸入內容</textarea>
                    </div>

                    <div className="sendpost">
                      <button className="takepostbutton" type="submit" onClick={handleHelpDetailSubmit}
                data-dismiss="alert">送出</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      })}
    </Modal>
  )
}

export default HelpDetail
