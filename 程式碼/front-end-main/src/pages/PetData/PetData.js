import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import './PetData.scss'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInDays from 'date-fns/differenceInDays'
// 引入 context
import { useAuth } from '../../context/auth'
// 引入 utils
import { API_URL, IMG_URL } from '../../utils/config'
// 引入 圖片 icon
import defaultPet from '../../img/avatar_pet.png'
import loading from '../../img/loading_paw.svg'
import { BsPencilSquare, BsPlusLg } from 'react-icons/bs'
// 引入元件
import PetDataDemo from './PetDataDemo'
// 引入 chart 套件
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

function PetData(props) {
  const { user, setUser } = useAuth()
  // 毛孩列表 state
  const [petList, setPetList] = useState([])
  // 選到的毛孩 state
  const [selectedPet, setSelectedPet] = useState()
  // 毛孩資料 state
  const [petInfo, setPetInfo] = useState({
    id: '',
    user_id: '',
    image: '',
    name: '',
    arrDay: '',
    birthday: '',
    health: [],
    heightLabel: [],
    heightData: [],
    weightLabel: [],
    weightData: [],
  })
  // 毛孩健康狀態
  const healthOptions = [
    '無/尚未提供',
    '慢性腎衰竭',
    '糖尿病',
    '下泌尿道症候群',
    '體重過重',
    '關節炎',
    '腸胃敏感',
    '皮膚敏感',
    '心臟疾病',
    '心血管疾病',
    '挑食',
  ]

  // 取得毛孩基資 & 數值資料
  useEffect(() => {
    let getPetInfo = async () => {
      try {
        // 先取得已登入使用者所有毛孩列表
        let listResult = await axios.get(`${API_URL}/pet`, {
          withCredentials: true,
        })
        console.log(listResult.data.data)
        let newPetList = [...petList]
        newPetList = listResult.data.data.map((v, i) => [v.id, v.name])
        console.log(newPetList)
        // 將所有毛孩 id 依序存入陣列
        setPetList(newPetList)
        // 預設抓取第一個毛孩 id 的詳細資料
        const newSelectedPet = newPetList[0][0]
        console.log(newSelectedPet)
        setSelectedPet(newSelectedPet)
      } catch (e) {
        console.error('pet data 錯誤', e.response.data)
      }
    }
    getPetInfo()
  }, [])

  useEffect(() => {
    if (selectedPet) {
      // 取得該預設毛孩 id 的詳細資料
      let getSelectedPet = async () => {
        try {
          let infoResult = await axios.get(
            `${API_URL}/pet/data/${selectedPet}`,
            { withCredentials: true }
          )
          console.log(infoResult.data)
          setPetInfo({
            ...petInfo,
            id: infoResult.data.data.id,
            user_id: infoResult.data.data.user_id,
            image: infoResult.data.data.image,
            name: infoResult.data.data.name,
            arrDay: infoResult.data.data.adoptime,
            birthday: infoResult.data.data.birthday,
            health: infoResult.data.health,
            heightLabel: infoResult.data.heightLabel,
            heightData: infoResult.data.heightData,
            weightLabel: infoResult.data.weightLabel,
            weightData: infoResult.data.weightData,
          })
        } catch (e) {
          console.error('selected pet 錯誤', e.response.data)
        }
      }
      getSelectedPet()
    }
  }, [selectedPet])

  // 處理歲數
  const today = new Date()
  const todayY = today.getFullYear()
  const todayM = today.getMonth()
  const todayD = today.getDate()
  let petAgeY, petAgeM
  if (petInfo.birthday) {
    // const today = new Date();
    // let todayY = today.getFullYear();
    // let todayM = today.getMonth();
    // let todayD = today.getDate();
    let birthY = petInfo.birthday.split('-')[0]
    let birthM = parseInt(petInfo.birthday.split('-')[1]) - 1
    if (birthM < 10) {
      birthM = `0${birthM}`
    }
    let birthD = petInfo.birthday.split('-')[2]
    //   console.log("birthday", birthY, birthM, birthD);
    let monthDiff = differenceInMonths(
      new Date(todayY, todayM, todayD),
      new Date(birthY, birthM, birthD)
    )
    petAgeY = Math.floor(monthDiff / 12)
    petAgeM = monthDiff % 12
  }
  // 處理到家天數
  let arrDays
  if (petInfo.arrDay) {
    let arrY = petInfo.arrDay.split('-')[0]
    let arrM = parseInt(petInfo.arrDay.split('-')[1]) - 1
    if (arrM < 10) {
      arrM = `0${arrM}`
    }
    let arrD = petInfo.arrDay.split('-')[2]
    arrDays = differenceInDays(
      new Date(todayY, todayM, todayD),
      new Date(arrY, arrM, arrD)
    )
  }

  // 使用 chart.js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  )
  const optionsHeight = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false,
        // grid: {
        //     display: false,
        // },
      },
      y: {
        display: false,
        min: Math.floor(Math.min(...petInfo.heightData) * 0.95),
        max: Math.ceil(Math.max(...petInfo.heightData) * 1.05),
        // grid: {
        //     display: false,
        // }
      },
    },
  }
  const optionsWeight = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false,
        // grid: {
        //     display: false,
        // },
      },
      y: {
        display: false,
        min: Math.floor(Math.min(...petInfo.weightData) * 0.95),
        max: Math.ceil(Math.max(...petInfo.weightData) * 1.05),
        // grid: {
        //     display: false,
        // }
      },
    },
  }
  const dataHeight = {
    labels: petInfo.heightLabel,
    datasets: [
      {
        data: petInfo.heightData,
        borderColor: 'rgb(246, 188, 84)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        spanGaps: true,
      },
    ],
  }
  const dataWeight = {
    labels: petInfo.weightLabel,
    datasets: [
      {
        data: petInfo.weightData,
        borderColor: 'rgb(246, 188, 84)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        spanGaps: true,
      },
    ],
  }
  // 未有資料提醒
  const loadingPaw = (
    <div className="text-center mt-4">
      <img alt="" className="my-2" src={loading} />
      <p className="text-secondary">
        尚未有毛孩
        <br />
        立即新增試試吧！
      </p>
    </div>
  )
  return (
    <>
      {user ? (
        <div className="pet-data">
          <Nav
            variant="tabs"
            activeKey={parseInt(selectedPet)}
            onSelect={(selectedKey) => setSelectedPet(selectedKey)}
          >
            {petList.map((pet, i) => {
              return (
                <Nav.Item key={pet[0]}>
                  <Nav.Link eventKey={pet[0]}>{pet[1]}</Nav.Link>
                </Nav.Item>
              )
            })}
          </Nav>
          <div className="pet-data-card">
            <div className="row text-center">
              {/* 左欄: 毛孩資料 */}
              <div className="col-lg-6 align-self-center">
                {petList.length !== 0 ? (
                  <>
                    {/* 大頭照 */}
                    <Link
                      to={{
                        pathname: `/member/pet/info`,
                        state: { selectedPet: petInfo.id },
                      }}
                    >
                      <div className="embed-responsive embed-responsive-1by1 pet-data-avatar">
                        <img
                          alt=""
                          className="avatar-cover-fit embed-responsive-item"
                          src={
                            petInfo.image
                              ? `${IMG_URL}${petInfo.image}`
                              : defaultPet
                          }
                        />
                      </div>
                    </Link>
                    {/* 毛孩姓名 */}
                    <div>{petInfo.name ? petInfo.name : '未有資料'}</div>
                    <div className="my-3">
                      {petInfo.birthday ? (
                        <>
                          {`${petAgeY} 歲 ${petAgeM} 個月`}
                          <br />
                        </>
                      ) : (
                        ''
                      )}
                      {petInfo.arrDay ? (
                        <span className="text-primary">
                          已經陪伴你 {arrDays} 天
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                    {petInfo.health.length ? (
                      <>
                        <div>這孩子有</div>
                        <div className="d-flex flex-column my-3 text-primary">
                          {petInfo.health.map((v) => {
                            return <div key={v}>{healthOptions[v]}</div>
                          })}
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  loadingPaw
                )}
              </div>
              {/* 右欄: 毛孩圖表 */}
              <div className="col-lg-6">
                <div className="pet-height-chart">
                  <div>身長 (cm)</div>
                  <div className="chart">
                    {petInfo.heightData.length ? (
                      <>
                        <span className="data-length">
                          最新{petInfo.heightData.length}筆資料
                        </span>
                        {petInfo.heightData.length === 1 ? (
                          <span className="one-data">試試新增更多資料吧！</span>
                        ) : (
                          ''
                        )}
                        <Line options={optionsHeight} data={dataHeight} />
                      </>
                    ) : (
                      <div className="no-data-word">
                        未有資料，點擊下方立即新增
                      </div>
                    )}
                  </div>
                </div>
                <div className="pet-weight-chart">
                  <div>體重 (kg)</div>
                  <div className="chart">
                    {petInfo.weightData.length ? (
                      <>
                        <span className="data-length">
                          最新{petInfo.weightData.length}筆資料
                        </span>
                        {petInfo.weightData.length === 1 ? (
                          <span className="one-data">試試新增更多資料吧！</span>
                        ) : (
                          ''
                        )}
                        <Line options={optionsWeight} data={dataWeight} />
                      </>
                    ) : (
                      <div className="no-data-word">
                        未有資料，點擊下方立即新增
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {petList.length !== 0 ? (
                <>
                  <Link
                    to={{
                      pathname: '/member/pet/data/edit',
                      state: { selectedPet: petInfo.id },
                    }}
                  >
                    <button className="edit-icon" title="新增/編輯毛孩數值">
                      <BsPencilSquare color="white" fontSize="1.3rem" />
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/member/pet">
                    <button className="join-icon" title="新增毛孩">
                      <BsPlusLg color="white" />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <PetDataDemo />
      )}
    </>
  )
}

export default withRouter(PetData)
