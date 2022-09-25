import { CacheModule, Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

export const cacheModule = CacheModule.registerAsync({
  useFactory: async () => ({
    store: redisStore,
    host: 'localhost',
    port: 6379,
    ttl: 0,
    auth_pass: 1234,
  }),
});

@Global()
@Module({
  imports: [cacheModule],
  exports: [CacheModule],
})
export class CacheDBModule {}
