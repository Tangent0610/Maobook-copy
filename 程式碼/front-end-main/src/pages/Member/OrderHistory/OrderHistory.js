import React from 'react'
import { Table } from 'react-bootstrap'

function Cancel(props) {
  return (
    <>
      <Table className="OrderDetailTable" hover size="sm">
        <thead>
          <tr>
            <th>序號</th>
            <th>品項</th>
            <th>單價</th>
            <th>數量</th>
            <th>總價</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>美味無添加香草貓貓化毛膏</td>
            <td>2000</td>
            <td>3</td>
            <td>6000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>美味無添加香草貓貓化毛膏</td>
            <td>2000</td>
            <td>3</td>
            <td>6000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>美味無添加香草貓貓化毛膏</td>
            <td>2000</td>
            <td>3</td>
            <td>6000</td>
          </tr>
          <tr>
            <td>4</td>
            <td>美味無添加香草貓貓化毛膏</td>
            <td>2000</td>
            <td>3</td>
            <td>6000</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default Cancel
