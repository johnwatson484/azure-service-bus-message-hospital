const boom = require('@hapi/boom')
const { getQueueMessages, getSubscriptionMessages } = require('../messaging')

module.exports = [{
  method: 'GET',
  path: '/dlq',
  handler: async (request, h) => {
    const { queueName, topicName, subscriptionName } = request.query
    if (queueName) {
      return h.view('dlq', { messages: await getQueueMessages(queueName), entityName: queueName })
    }
    if (topicName && subscriptionName) {
      return h.view('dlq', { messages: await getSubscriptionMessages(topicName, subscriptionName), entityName: `${topicName}-${subscriptionName}` })
    }
    return boom.badRequest()
  }
}]
