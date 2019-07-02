declare module 'redis-commands' {
  import { Commands } from 'redis';
  type commandTypes = keyof Commands<boolean> | 'multi';
  export const list: commandTypes[];
}
