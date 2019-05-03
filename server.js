const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const {google} = require('googleapis')
const run = require('./google-auth')

async function getListRow () {
  return new Promise((resolve, reject) => {
    run(function(auth) {
      const sheets = google.sheets({version: 'v4', auth})
      sheets.spreadsheets.values.get({
        spreadsheetId: '1H1WJOgiMzhXAXmPv_MsOsg_RjAa3_iWktsWT8xYNYaY',
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

function getNameByPasscode (rows, passcode) {
  const row = rows.find(row => row[2] === passcode)
  if (row) {
    return {
      title: row[0],
      name: row[1]
    }
  } else {
    return null
  }
}

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/', async (req, res) => {
      const actualPage = '/unauthorized'
      app.render(req, res, actualPage)
    })

    server.get('/:passcode', async (req, res) => {
      const row = await getListRow()
      const recipientDetail = getNameByPasscode(row, req.params.passcode)
      if (recipientDetail) {
        const actualPage = '/index'
        const queryParams = { recipient: recipientDetail.name }
        app.render(req, res, actualPage, queryParams)  
      } else {
        const actualPage = '/unauthorized'
        app.render(req, res, actualPage)
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