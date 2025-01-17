import { createClient } from 'redis';

// initialise redis
const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on('connect', ()=> {
    console.log('Connected to Redis');
});

redisClient.on('error', (error)=> {
    console.log('Error connecting to Redis', error);
});

await redisClient.connect(); // Establish the connection

export default redisClient;