# Async Redis

Light weight wrapper over the node_redis library with first class async & promise support.

## Installation

To install the stable version:

```sh
npm i redis @toomee/async-redis
# or
yarn add redis @toomee/async-redis
```

## Usage Example

### Creating Connection

```js
const redis = require('redis');
const { asyncRedis } = require('@toomee/async-redis');

const redisClient = redis.createClient();
const client = asyncRedis(redisClient);

client.on('error', function(err) {
  console.log('Error ', err.message);
});

(async () => {
  await client.set('string key', 'string val');
  const value = await client.get('string key');
  console.log(value);

  // multi chain
  const values = await client
    .multi()
    .set('string key', 'string val')
    .set('other key', 'other val')
    .get('string key')
    .get('other key')
    .keys('*')
    .dbsize()
    .exec();
  console.log(values);

  await client.flushall();
})();
```

## API Information

This library does very little modification to the api of node_redis. It simply appends a promise resolving/rejecting callback for every command.

For information on redis commands and configuration visit [node_redis docs](http://redis.js.org/).

## License

MIT
