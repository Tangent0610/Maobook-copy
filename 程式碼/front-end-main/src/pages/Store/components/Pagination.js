import React from 'react'
import { Pagination } from 'react-bootstrap'

function paginationBasic(props) {
  const { lastPage, setPage, page } = props
  // let active = 2;
  let items = []
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={(e) => {
          setPage(number)
        }}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    )
  }

  return <Pagination size="sm justify-content-center">{items}</Pagination>
}

export default paginationBasic
