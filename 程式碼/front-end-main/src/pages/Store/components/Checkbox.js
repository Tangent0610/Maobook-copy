/* eslint-disable prettier/prettier */
import React from 'react'
import { useState } from 'react'

import './Checkbox.scss'

function Checkbox(props) {
  const { filterName, checkeds, setCheckeds } = (props)

  // checkedProduct.includes(1);
  return (
    <>
      {filterName.map((d) => {
        return (
          <div className="checkbox d-flex" key={d.id}>
            <label>
              <input type="checkbox" value={d.id} checked={checkeds.includes(String(d.id))}
                onChange={(e) => {
                  // 先判斷vlaue是否在狀態陣列中
                  if (checkeds.includes(e.target.value)) {
                    // if 在陣列中->移除
                    // e.target.checked=(setcheckState(false))
                    const newcheckedProduct = checkeds.filter((v, i) => v !== e.target.value)
                    setCheckeds(newcheckedProduct)
                  } else {
                    // else 加入到陣列中
                    // e.target.checked=(setcheckState(true))
                    const newcheckedProduct = [...checkeds, e.target.value]
                    setCheckeds(newcheckedProduct)
                  }
                }}
                    // const newcheckedProduct = [...checkeds, e.target.value]
                    // setCheckeds(newcheckedProduct)

              />
              <span id={'i'}>{d.name}</span>
            </label>
          </div>
        )
      })}
    </>
  )
}

export default Checkbox