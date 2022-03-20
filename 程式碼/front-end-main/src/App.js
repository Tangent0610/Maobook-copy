import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
// 引入 context
import { AuthContext } from './context/auth'

//錯誤頁面
import NotFound404 from './pages/Home/NotFound404'

// 引入 API 相關工具
import { API_URL } from './utils/config'
import axios from 'axios'

//主頁面
// [[[ 首頁 Home       ]]]
import Home from './pages/Home'
import Login from './pages/Home/Login'
// [[[ 會員 Member     ]]]
import Member from './pages/Member'
// [[[ 行事曆 Schedule ]]]
import Schedule from './pages/Schedule'
// [[[ 電商 Store      ]]]
import Store from './pages/Store'
import CartDetail from './pages/Store/CartDetail'
import ProductDetails from './pages/Store/ProductDetails'
import OrderDetail from './pages/Store/OrderDetail'
// [[[ 社群 Community  ]]]
import Community from './pages/Community'
// [[[ 互助 Assistance ]]]
import Assistance from './pages/Assistance'

// 引入元件
import MyNav from './component/UI/MyNav'
// import Navbar from "./component/UI/Navbar";
import ScrollToTop from './component/UI/ScrollToTop'
import Footer from './component/UI/Footer'

function App() {
  const [user, setUser] = useState(null)

  // 避免重新整理時 user 狀態內的資料變回 null
  useEffect(() => {
    const getUser = async () => {
      try {
        let result = await axios.get(`${API_URL}/member`, {
          withCredentials: true,
        })
        setUser(result.data)
      } catch (e) {
        console.error(e.response.data)
      }
    }
    if (!user) {
      getUser()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <>
          <MyNav />
          <ScrollToTop>
            <Switch>
              <Route path="/assistance">
                <Assistance />
              </Route>
              <Route path="/community">
                <Community />
              </Route>
              <Route path="/member">
                <Member />
              </Route>
              <Route path="/store/cart/orderdetail">
                <OrderDetail />
              </Route>
              <Route path="/store/cart">
                <CartDetail />
              </Route>
              <Route path="/store">
                <Store />
              </Route>
              <Route path="/schedule">
                <Schedule />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NotFound404 />
              </Route>
            </Switch>
          </ScrollToTop>
          <Footer />
        </>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
