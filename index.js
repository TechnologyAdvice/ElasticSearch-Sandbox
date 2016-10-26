'use strict'
const rp = require('request-promise')

const index = 'test'
const type = 'log'
const endpoint = `http://${process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR}:9200/${index}/${type}/`
const mock = {
  statuses: [ 'info', 'warn', 'error' ],
  systems: [ 'red', 'green', 'blue' ],
  messages: [
    'perspiciatis unde omnis iste natus error sit',
    'fugit, sed quia consequuntur magn',
    'sed quia non numquam eius modi tempora',
    'uis autem vel eum iure reprehenderit qui in ea',
    'non numquam eius modi tempora incidunt'
  ]
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * max) + min
}
const genMockPayload = () => {
  return {
    timestamp: +new Date(),
    status: mock.statuses[getRandomInt(0, mock.statuses.length)],
    system: mock.systems[getRandomInt(0, mock.systems.length)],
    message: {
      content: mock.messages[getRandomInt(0, mock.messages.length)],
      flag: getRandomInt(1,5)
    }
  }
}
let timer
const run = () => {
  timer = setTimeout(() => {
    const payload = genMockPayload()
    rp({
      method: 'POST',
      uri: endpoint,
      body: payload,
      json: true
    })
    .then(res => {
      console.log('CREATED', res)
    })
    .catch(err => {
      console.log('FAILED', err)
    })
    run()
  }, getRandomInt(1, 1000))
}

run()