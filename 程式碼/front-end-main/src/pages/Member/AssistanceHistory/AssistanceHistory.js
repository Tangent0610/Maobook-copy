import React, { useState, useEffect } from 'react'
import axios from 'axios'

// 引入 user context
import { useAuth } from '../../../context/auth'

// 引入元件
import HelpedTask from './HelpedTask'
import Helper from './Helper'
import './AssistanceHistory.scss'

function AssistanceHistory(props) {
  const [noteDate, setNoteDate] = useState()
  console.log(noteDate)
  return (
    <>
      <div className="Takercontainer">
        <div className="Takerdiv mx-auto">
          <HelpedTask setNoteDate={setNoteDate} noteDate={noteDate} />
        </div>
        <hr className="Takerbr" />
        <div className="Takerdiv mx-auto">
          <Helper noteDate={noteDate} />
        </div>
      </div>
    </>
  )
}

export default AssistanceHistory
