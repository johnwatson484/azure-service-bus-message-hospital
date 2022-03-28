const { getEntities } = require('../messaging')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: async (request, h) => {
    const { queues, topics } = await getEntities()
    return h.view('home', { queues, topics })
  }
}]
