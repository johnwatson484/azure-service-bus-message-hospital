const { ServiceBusAdministrationClient, ServiceBusClient } = require('@azure/service-bus')
const { connectionString } = require('./config')

const getEntities = async () => {
  const serviceBusAdministrationClient = new ServiceBusAdministrationClient(connectionString)
  const queues = []
  for await (const queue of serviceBusAdministrationClient.listQueues()) {
    const info = await serviceBusAdministrationClient.getQueueRuntimeProperties(queue.name)
    queues.push({ ...queue, ...info })
  }
  const topics = []
  for await (const topic of serviceBusAdministrationClient.listTopics()) {
    topic.subscriptions = []
    const topicInfo = await serviceBusAdministrationClient.getTopicRuntimeProperties(topic.name)
    for await (const subscription of serviceBusAdministrationClient.listSubscriptions(topic.name)) {
      const info = await serviceBusAdministrationClient.getSubscriptionRuntimeProperties(topic.name, subscription.subscriptionName)
      topic.subscriptions.push({ ...subscription, ...info })
    }
    topics.push({ ...topic, ...topicInfo })
  }
  return {
    queues,
    topics
  }
}

const getQueueMessages = async (queueName) => {
  let messages = []
  const sbClient = new ServiceBusClient(connectionString)
  const queueReceiver = sbClient.createReceiver(queueName, { subQueueType: 'deadLetter' })

  try {
    console.log('Attempting to peek 1000 messages at a time')
    messages = await queueReceiver.peekMessages(1000)
    console.log(`Got ${messages.length} messages.`)
    await queueReceiver.close()
  } finally {
    await sbClient.close()
  }
  console.log(messages)
  return messages
}

const getSubscriptionMessages = async (topicName, subscriptionName) => {
  let messages = []
  const sbClient = new ServiceBusClient(connectionString)
  const queueReceiver = sbClient.createReceiver(topicName, subscriptionName, { subQueueType: 'deadLetter' })

  try {
    console.log('Attempting to peek 1000 messages at a time')
    messages = await queueReceiver.peekMessages(1000)
    console.log(`Got ${messages.length} messages.`)
    await queueReceiver.close()
  } finally {
    await sbClient.close()
  }
  return messages
}

module.exports = {
  getEntities,
  getQueueMessages,
  getSubscriptionMessages
}
