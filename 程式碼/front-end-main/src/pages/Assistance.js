import React from 'react'
import { useState, useEffect } from 'react'
import HelpIntro from './Assistance/HelpIntro'
import HelpCalendar from './Assistance/HelpCalendar'
import DayHelps from './Assistance/DayHelps'
import HelpList from './Assistance/HelpList'
import HelpPost from './Assistance/HelpPost'
import HelpDetail from './Assistance/HelpDetail'
import AnchorLink from 'react-anchor-link-smooth-scroll'


import './Assistance/components/Assistance.scss'

import posticon from './Assistance/img/posticon.svg'
import maoassistance from './Assistance/img/maoassistance.svg'
import downarrow from './Assistance/img/downarrow.svg'


function Assistance() {
  const [HelpDate, setHelpDate] = useState(new Date())
  return (
    <>
      <div className="assistance">
        <div className="leftandright">
          <img className="maoassistance" src={maoassistance} alt="" />
          <AnchorLink href="#helppost">
          <img className="helpposticon" src={posticon} alt="" />
          </AnchorLink>
        </div>

        <div className="middle">
          <div className="helpintro">
            <HelpIntro />
          </div>
          <AnchorLink href="#helpcalendar" className="leadingdown">
          <div className="arrowtext1">找一位朋友</div>
          <div className="arrowtext2">一起來幫你吧</div>
          <img className="downarrow" src={downarrow} alt="" />
          </AnchorLink>
          <div className="helpcalendar" id="helpcalendar">
            <HelpCalendar setHelpDate={setHelpDate}/>
          </div>
          <div className="dayhelps">
            <DayHelps HelpDate={HelpDate}/>
          </div>
          <br />
          <div className="helplist">
            <HelpList />
          </div>
          <br />
          <div className="helppost" id="helppost">
            <HelpPost />
          </div>
        </div>
      </div>
    </>
  )
}

export default Assistance
