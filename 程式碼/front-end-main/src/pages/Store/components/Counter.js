import React from 'react'

//圖片
import minusIcon from '../storePic/minusIcon.svg'
import plusIcon from '../storePic/plusIcon.svg'

function Counter(props) {
  const { item, amount, updateCartToLocalStorage } = props

  return (
    <>
      <button
        className="minusIcon"
        onClick={() => {
          if (amount === 1) return
          updateCartToLocalStorage(item, false, false)
        }}
      >
        <img src={minusIcon} alt="minusIcon" />
      </button>
      <span className="num">{amount}</span>
      <button
        className="plusIcon"
        onClick={() => updateCartToLocalStorage(item, true, false)}
      >
        <img src={plusIcon} alt="plusIcon" />
      </button>
    </>
  )
}

export default Counter
