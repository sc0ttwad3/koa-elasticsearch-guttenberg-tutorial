const {Client} = require('@elastic/elasticsearch');
const chalk = require('chalk');

const index = 'library';
const type = 'novel';

const client = new Client({
  node: 'https://localhost:9200',
  ssl: {
    rejectUnauthorized: false
  },
  auth: {username: 'admin', password: 'admin'}
});

/** Check the ES connection status */
async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    console.log('--------------------------------------------');
    console.log('Connecting to ES...');
    try {
      const health = await client.cluster.health({});
      console.log(health);
      isConnected = true;
      console.log(chalk.greenBright('[✓] Connected to ES index...'));
    } catch (err) {
      console.log(chalk.red('[ ] Connection failed.'), err);
    } finally {
      console.log('--------------------------------------------');
      break;
    }
  }
}

// DEBUG
checkConnection();

/** Clear the index, recreate it, and add mappings */
// NOTE: IF FAILS - SHOULDN't PASS ANY PARAMETERS
async function resetIndex() {
  if (await client.indices.exists({index})) {
    await client.indices.delete({index});
  }

  await client.indices.create({index});
  await putBookMapping();
}

/** Add book section schema mapping to ES */
async function putBookMapping() {
  const schema = {
    title: {type: 'keyword'},
    author: {type: 'keyword'},
    location: {type: 'integer'},
    text: {type: 'text'}
  };

  return client.indices.putMapping({index, type, body: {properties: schema}});
}

/****
elasticsearch-js

https://github.com/elastic/elasticsearch-js


  Request specific options
  If needed you can pass request specific options in a second object:

// Promise API
const result = await client.search({
  index: 'my-index',
  body: { foo: 'bar' }
}, {
  ignore: [404],
  maxRetries: 3
})


The supported request specific options are:

{
  ignore: [number], // default `null`
  requestTimeout: number, // client default
  maxRetries: number, // default `5`
  asStream: boolean, // default `false`
  compression: string, // default `false`
  headers: object, // default `null`
  querystring: object // default `null`,
  context: object // default `null`,
  id: any // default incr. integer
}

*/

module.exports = {
  client,
  index,
  type,
  checkConnection,
  resetIndex
};
