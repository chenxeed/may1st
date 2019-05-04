const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const {google} = require('googleapis')
const run = require('./google-auth')

const spreadsheetId = '1H1WJOgiMzhXAXmPv_MsOsg_RjAa3_iWktsWT8xYNYaY'

async function getListRow () {
  return new Promise((resolve, reject) => {
    run(function(auth) {
      const sheets = google.sheets({version: 'v4', auth})
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'A2:C',
      }, (err, res) => {
        if (err) {
          return reject(err)
        }
        const rows = res.data.values;
        if (rows.length) {
          return resolve(rows)
        } else {
          return reject(new Error('No data found.'))
        }
      })
    })
  })
}

async function updateRow (range, value) {
  return new Promise((resolve, reject) => {
    run(function(auth) {
      const sheets = google.sheets({version: 'v4', auth})
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[value]]
        }
      }, (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
    })
  })
}

function getDataByPasscode (rows, passcode) {
  const row = rows.find(row => row[2] === passcode)
  if (row) {
    return {
      index: rows.indexOf(row),
      name: row[0],
      childName: row[1]
    }
  } else {
    return null
  }
}

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.json())

    server.get('/', async (req, res) => {
      const actualPage = '/unauthorized'
      app.render(req, res, actualPage)
    })

    server.get('/:passcode', async (req, res) => {
      const row = await getListRow()
      const passcode = req.params.passcode
      const recipientDetail = getDataByPasscode(row, passcode)
      if (recipientDetail) {
        const actualPage = '/index'
        const queryParams = {
          recipient: recipientDetail.name,
          children: recipientDetail.childName,
          passcode
        }
        app.render(req, res, actualPage, queryParams)  
      } else {
        const actualPage = '/unauthorized'
        app.render(req, res, actualPage)
      }
    })

    server.post('/confirm', async (req, res) => {
      const {passcode, canAttend} = req.body
      const confirm = canAttend ? 'Yes' : 'No'
      // find the row based on the given passcode
      const row = await getListRow()
      const recipientDetail = getDataByPasscode(row, passcode)
      if (recipientDetail) {
        // add two more because row index start from one,
        // and there's the header
        const rowIndex = recipientDetail.index + 2
        const range = `E${rowIndex}`
        await updateRow(range, confirm)
        res.json({
          message: 'Success'
        })
      } else {
        res.status(404)
        res.json({
          message: 'Failed, recipient not found'
        })
      }
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })