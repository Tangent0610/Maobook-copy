import React, { useState, useEffect } from 'react'
import { NavDropdown, Table, Modal, Button } from 'react-bootstrap'
import { NavLink, Route, Switch, useHistory } from 'react-router-dom'
import axios from 'axios'
// import { API_URL } from '../utils/config'

// 引入 user context
import { useAuth } from '../../../context/auth'

// 引入元件
import DailyFollow from './DailyFollow'
import DailyHistory from './DailyHistory'
import DiscussHistory from './DiscussHistory'
import DiscussFollow from './DiscussFollow'
import MemberFollow from './MemberFollow'

function CommunityHistory(props) {
  return (
    <>
      <div className="info-card h-100">
        <div className="member-content ">
          <div className="container">
            <div className="row">
              {/* side nav */}
              <div className="col-lg-2 member-sidenav">
                <nav className="d-flex flex-row flex-lg-column justify-content-center text-right">
                  <NavLink
                    activeClassName="active"
                    className="nav-link d-md-block d-none"
                    to="/member/community/DailyHistory"
                  >
                    發表日常文
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="nav-link d-md-block d-none"
                    to="/member/community/DailyFollow"
                  >
                    追蹤日常文
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="nav-link d-md-block d-none"
                    to="/member/community/DiscussHistory"
                  >
                    發表社群文
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="nav-link d-md-block d-none"
                    to="/member/community/DiscussFollow"
                  >
                    追蹤社群文
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="nav-link d-md-block d-none"
                    to="/member/community/MemberFollow"
                  >
                    追蹤毛主人
                  </NavLink>
                  <NavDropdown
                    title="日常開箱文"
                    id="nav-dropdown"
                    className="d-md-none d-block"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to="/member/community/DailyHistory"
                    >
                      發表的日常文
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/member/community/DailyFollow"
                    >
                      追蹤的日常文
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="社群討論文"
                    id="nav-dropdown"
                    className="d-md-none d-block"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to="/member/community/DiscussHistory"
                    >
                      選物紀錄
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/member/community/DiscussFollow"
                    >
                      社群紀錄
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="社群討論文"
                    id="nav-dropdown"
                    className="d-md-none d-block"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to="/member/community/MemberFollow"
                    >
                      追蹤毛主人
                    </NavDropdown.Item>
                  </NavDropdown>
                </nav>
              </div>
              {/* 可切換資料卡 */}
              <div className="col-lg-10 member-info">
                <Switch>
                  {/* 日常 Route */}
                  <Route path="/member/community/DailyHistory">
                    <DailyHistory />
                  </Route>
                  <Route path="/member/community/DailyFollow">
                    <DailyFollow />
                  </Route>
                  {/* 社群 Route */}
                  <Route path="/member/community/DiscussHistory">
                    <DiscussHistory />
                  </Route>
                  <Route path="/member/community/DiscussFollow">
                    <DiscussFollow />
                  </Route>
                  <Route path="/member/community/MemberFollow">
                    <MemberFollow />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommunityHistory
