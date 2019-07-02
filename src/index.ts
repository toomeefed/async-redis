import { promisify } from 'util';
import { RedisClient } from 'redis';
import { list as commands } from 'redis-commands';

export function asyncRedis(client: RedisClient) {
  commands.forEach(function(name) {
    if (name !== 'multi') {
      client[name] = promisify(client[name]).bind(client);
    }
  });

  const multi = client.multi();
  const mlproto = multi.constructor.prototype;

  mlproto.exec_transaction = promisify(mlproto.exec_transaction);
  mlproto.exec = mlproto.exec_transaction;
  // mlproto.EXEC = mlproto.exec;

  return client;
}

export default asyncRedis;
