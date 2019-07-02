import redis from 'redis';
import asyncRedis from '../src/index';

let client: redis.RedisClient;

beforeAll(() => {
  client = asyncRedis(redis.createClient());
});

afterAll(async () => {
  await client.flushall();
  await client.quit();
});

test('test set method', async () => {
  const status = await client.set('hello', 'world');
  expect(status).toBe('OK');
});

test('test get method', async () => {
  const value = await client.get('hello');
  expect(value).toBe('world');
});

test('test del method', async () => {
  const status = await client.del('hello');
  expect(status).toBe(1);
});

test('test multi method', async () => {
  const values = await client
    .multi()
    .set('string key', 'string val')
    .set('other key', 'other val')
    .get('string key')
    .get('other key')
    .keys('*')
    .dbsize()
    .exec();
  expect(values).toEqual([
    'OK',
    'OK',
    'string val',
    'other val',
    ['other key', 'string key'],
    2,
  ]);
});
