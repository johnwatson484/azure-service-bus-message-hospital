const { ServiceBusAdministrationClient } = require('@azure/service-bus')
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

module.exports = {
  getEntities
}
