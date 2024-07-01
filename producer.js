const {kafka} = require('./client');

async function init() {
    const producer = kafka.producer();
    await producer.connect();
    console.log('Producer connected');

    // Function to generate random coordinates
    function getRandomCoordinates() {
        const latitude = (Math.random() * 180 - 90).toFixed(6); // Latitude between -90 and 90
        const longitude = (Math.random() * 360 - 180).toFixed(6); // Longitude between -180 and 180
        return { latitude, longitude };
    }

    // Function to send random coordinates
    async function sendCoordinates() {
        const coordinates = getRandomCoordinates();
        const driverName = "Ali Bhai"
        await producer.send({
            topic: 'uber-updates',
            messages: [
                {
                    partition: 0,
                    value: JSON.stringify({ driverName: driverName,
                        coordinates: coordinates})
                },
            ],
        });
        // console.log('Sent coordinates:', coordinates);
    }

    // Send coordinates every second
    setInterval(sendCoordinates, 2000);
}

init().catch(console.error);
