import { Table } from 'react-bootstrap'
import './OrderDetailTableStyle.scss'

function OrderDetailTable(props) {
  const { cart } = props
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
          {cart.map((cart, index) => {
            return (
              <tr>
                <td>{index}</td>
                <td dangerouslySetInnerHTML={{ __html: cart.name }}></td>
                <td>{cart.price}</td>
                <td>{cart.amount}</td>
                <td>{cart.price * cart.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default OrderDetailTable
