const {kafka} = require('./client');

async function init(){

    // await kafka.connect();
    const consumer = kafka.consumer({groupId: 'group-1'});
    await consumer.connect();
    await consumer.subscribe({topic: 'uber-updates', fromBeginning: true});
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                Driver: JSON.parse(message.value).driverName,
                Coordinates: JSON.parse(message.value).coordinates
            });
        }
    }); 
    // await consumer.disconnect();


}
init().catch(console.error);