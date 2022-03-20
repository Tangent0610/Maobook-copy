import Intro from './Store/Intro'
import Recom from './Store/Recom'
import ProductList from './Store/ProductList'
import FAQ from './Store/FAQ'
import './Store/style/style.scss'

import { Container } from 'react-bootstrap'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Store(props) {
  return (
    <Container>
      <Intro />
      <Recom />
      <ProductList />
      <FAQ />
    </Container>
  )
}

export default Store
