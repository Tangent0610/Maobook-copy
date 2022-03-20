import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, withRouter, Link, useHistory } from 'react-router-dom'
// 引入 context
import { useAuth } from '../../../context/auth'
// 引入 utils
import { API_URL, IMG_URL } from '../../../utils/config'
// 引入圖片 icon scss
import defaultPet from '../../../img/avatar_pet.png'
import { BsPlusLg } from 'react-icons/bs'
import loading from '../../../img/loading_paw.svg'
import './PetList.scss'

function PetList(props) {
  const { petList, setPetList } = props
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const history = useHistory()
  const loadingPaw = (
    <div className="text-center">
      <div className="spinner-grow text-primary" role="status">
        <img alt="" className="sr-only" src={loading} />
      </div>
    </div>
  )

  // 取得毛孩列表
  useEffect(() => {
    let getPetList = async () => {
      try {
        let result = await axios.get(`${API_URL}/pet/?page=${page}`, {
          withCredentials: true,
        })
        console.log('getPetList', result.data)
        setPetList(result.data.data)
        setLastPage(result.data.pagination.lastPage)
      } catch (e) {
        console.error('pet list 錯誤', e.response.data)
      }
    }
    getPetList()
  }, [page])
  // 分頁
  const getPages = () => {
    let pages = []
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          className={page === i ? 'active' : ''}
          key={i}
          onClick={(e) => {
            setPage(i)
          }}
        >
          {i}
        </li>
      )
    }
    return pages
  }

  return (
    <div className="info-card text-secondary">
      <h3>毛孩列表</h3>
      <div className="d-flex justify-content-around flex-wrap">
        {petList.map((pet, i) => {
          return (
            <div key={pet.id} className="d-flex flex-column pet-list-card">
              <Link
                to={{
                  pathname: `/member/pet/info`,
                  state: { selectedPet: pet.id },
                }}
              >
                <div className="embed-responsive embed-responsive-1by1 pet-avatar">
                  <img
                    alt=""
                    className="avatar-cover-fit embed-responsive-item"
                    src={
                      pet.image.length ? `${IMG_URL}${pet.image}` : defaultPet
                    }
                  />
                </div>
                <div className="text-center text-secondary">{pet.name}</div>
              </Link>
            </div>
          )
        })}
        <NavLink to="/member/pet/add" className="align-self-center py-3">
          <div className="add-pet-btn position-relative" title="新增毛孩">
            <BsPlusLg className="plus-icon" />
          </div>
        </NavLink>
      </div>
      {petList.length ? (
        <div className="text-center petList-pages">
          <ul className="m-auto">{getPages()}</ul>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default withRouter(PetList)
