const { kafka } = require('./client');
async function init() {


    const admin = kafka.admin();
    await admin.connect();

    try {
        await admin.createTopics({
            topics: [
                { topic: 'uber-updates', numPartitions: 2
                    // , replicationFactor: 1
                 }
            ]
        });
        console.log('Topic created successfully');
    } catch (error) {
        console.error('Error creating topic:', error);
    } finally {
        await admin.disconnect();
    }
}

init();