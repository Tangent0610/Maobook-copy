const express = require('express')
const router = express.Router()
const connection = require('../utils/db')
const moment = require('moment')

// 行事曆的日曆事件API
router.get('/:year/:month', async (req, res, next) => {
  // http://localhost:3002/api/calendarE/:year/:month
  let [data, fields] = await connection.execute(
    'SELECT  day(date) AS date, GROUP_CONCAT(DISTINCT category_id) AS category_id FROM Schedules WHERE year(date) = ? AND month(date)= ?  group by DATE(date) order by DATE(date);',
    [req.params.year, req.params.month]
  )
  data.map((d) => {
    d.category_id = d.category_id.split(',')
  })
  res.json(data)
})

module.exports = router
