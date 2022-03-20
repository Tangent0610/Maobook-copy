import React from 'react'
import './PetData.scss'
import { Link, withRouter } from 'react-router-dom'
// 引入 圖片 icon
import dogDemo from '../../img/dog_demo.jpg'
import { BsPlusLg } from 'react-icons/bs'

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
        min: 99.6 * 0.95,
        max: 100.3 * 1.05,
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
        min: 7.5 * 0.95,
        max: 8 * 1.05,
        // grid: {
        //     display: false,
        // }
      },
    },
  }
  const dataHeight = {
    labels: [
      '01-17',
      '01-23',
      '01-25',
      '01-26',
      '01-31',
      '02-01',
      '02-10',
      '02-24',
      '03-02',
      '03-07',
    ],
    datasets: [
      {
        data: [
          99.6, 100, 100.1, 100.1, 100.2, 100.2, 100.2, 100.3, 100.3, 100.3,
        ],
        borderColor: 'rgb(246, 188, 84)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        spanGaps: true,
      },
    ],
  }
  const dataWeight = {
    labels: [
      '02-01',
      '02-10',
      '02-12',
      '02-13',
      '02-19',
      '02-22',
      '02-24',
      '02-28',
      '03-02',
      '03-07',
    ],
    datasets: [
      {
        data: [7.5, 7.6, 7.6, 7.5, 7.9, 7.9, 8.0, 7.8, 7.8, 7.9],
        borderColor: 'rgb(246, 188, 84)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        spanGaps: true,
      },
    ],
  }
  return (
    <div className="pet-data">
      <div className="pet-data-card">
        <h4 className="text-primary">毛孩數據管理</h4>
        <div className="row text-center">
          {/* 左欄: 毛孩資料 */}
          <div className="col-lg-6 align-self-center">
            {/* 大頭照 */}
            <div className="embed-responsive embed-responsive-1by1 pet-data-avatar">
              <img
                alt=""
                className="avatar-cover-fit embed-responsive-item"
                src={dogDemo}
              />
            </div>
            {/* 毛孩姓名 */}
            <div>Lucky</div>
            <div className="my-3">
              2 歲 5 個月
              <br />
              <span className="text-primary">已經陪伴你 732 天</span>
            </div>
            <div>這孩子有</div>
            <div className="d-flex flex-column my-3 text-primary">
              <div>皮膚敏感</div>
              <div>體重過重</div>
            </div>
          </div>
          {/* 右欄: 毛孩圖表 */}
          <div className="col-lg-6">
            <div className="pet-height-chart">
              <div>身長 (cm)</div>
              <div className="chart">
                <span className="data-length">最新 10 筆資料</span>
                <Line options={optionsHeight} data={dataHeight} />
              </div>
            </div>
            <div className="pet-weight-chart">
              <div>體重 (kg)</div>
              <div className="chart">
                <span className="data-length">最新 10 筆資料</span>
                <Line options={optionsWeight} data={dataWeight} />
              </div>
            </div>
          </div>
          <Link to="/" exact>
            <button className="join-icon" title="立即註冊">
              <BsPlusLg color="white" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withRouter(PetData)
