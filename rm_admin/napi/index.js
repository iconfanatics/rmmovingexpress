const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const axios = require('axios')
const bodyParser = require('body-parser')
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cookieParser())

/**
 * Set Refresh Token in http only cookie
 * @param  refreshToken
 */
app.post('/set-refresh-token', jsonParser, function(req, res) {
  res.cookie('_najd_a_t_', req.body.refreshToken, {
    httpOnly: true
  })
  if (app.get('env') === 'production') {
    res.cookie.secure = true // serve secure cookies
  }
  res.status(200).send('OK')
})

/**
 * Get New Access and Refresh Token after Access Token is expired
 * @param  null
 */
app.post('/get-refresh-token', jsonParser, async function(req, res) {
  try {
    const refresh_token =
      req && req.cookies['_najd_a_t_'] ? req.cookies['_najd_a_t_'] : null
    // send old refresh token to generate new refresh token and new access token
    await axios
      .post(`${process.env.API_URL}/admin/auth/token/refresh`, { refresh_token })
      .then((response) => {
        if (response.status == 200) {
          {
            if (
              response &&
              response.data &&
              response.data.tokens &&
              response.data.tokens.refreshToken
            )
              // set new refresh token in httponly cookie
              res.cookie('_najd_a_t_', response.data.tokens.refreshToken, {
                httpOnly: true
              })
            if (app.get('env') === 'production') {
              res.cookie.secure = true // serve secure cookies
            }
            res.status(200).send(response.data)
          }
        } else {
          // Sending Error to Front End
          res.status(500).send({
            error: 'Something went wrong',
            status: 500,
            code: 'Refresh_Token_Error'
          })
        }
      })
      .catch((error) => {
        // console.log(error.response.status, error.response.data)
        // set refresh token to NULL
        res.cookie('_najd_a_t_', false, {
          httpOnly: true
        })
        if (app.get('env') === 'production') {
          res.cookie.secure = true // serve secure cookies
        }
        res.status(500).send({
          error: 'Something went wrong',
          status: 500,
          code: 'Refresh_Token_Error'
        })
      })
  } catch (error) {
    if (res && res.cookie('_najd_a_t_')) {
      // set refresh token to NULL
      res.cookie('_najd_a_t_', false, {
        httpOnly: true
      })
      if (app.get('env') === 'production') {
        res.cookie.secure = true // serve secure cookies
      }
    }
    res.status(500).send({
      error: 'Something went wrong',
      status: 500,
      code: 'Refresh_Token_Error'
    })
  }
})

/**
 * Logout from Server
 * @param  null
 */
app.post('/logout', jsonParser, async function(req, res) {
  const refresh_token = req.cookies['_najd_a_t_']
  // logout from backend server
  axios
    .post(`${process.env.API_URL}/logout`, { refresh_token })
    .then((response) => {})
    .catch((e) => {})
  // set refresh token to NULL
  res.cookie('_najd_a_t_', false, {
    httpOnly: true
  })
  if (app.get('env') === 'production') {
    res.cookie.secure = true // serve secure cookies
  }
  res.status(200).send('OK')
})
/**
 * Getting the IP Details
 * @param null
 */
// app.get('/ipdetector', jsonParser, async function(req, res) {
//   try {
//     const instance = axios.create({})
//     const details = await instance.get(
//       'https://ipgeolocation.abstractapi.com/v1/?api_key=b1c306b0411e44d6b910537ea80bd293'
//     )
//     res.status(200).send(details && details.data ? details.data : [])
//   } catch (error) {
//     // console.log(error.response)
//     res.status(500).send({
//       error: 'Something went wrong',
//       status: 500,
//       code: 'GET_IP_ERROR'
//     })
//   }
// })

module.exports = {
  path: '/napi',
  handler: app
}
