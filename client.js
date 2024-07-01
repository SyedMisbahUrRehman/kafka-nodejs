const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['localhost:9092']
});