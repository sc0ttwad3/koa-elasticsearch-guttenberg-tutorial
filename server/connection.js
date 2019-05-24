const {Client} = require('@elastic/elasticsearch');

const index = 'library';
const type = 'novel';

const client = new Client({
  node: 'https://admin:admin@localhost:9200'
});

/** Check the ES connection status */
async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    console.log('Connecting to ES');
    try {
      const health = await client.cluster.health({});
      console.log(health);
      isConnected = true;
    } catch (err) {
      console.log('Connection failed, retrying...', err);
    } finally {
      break;
    }
  }
}

checkConnection();
