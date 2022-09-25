import { CreateShopDto } from './dto/createShopDto';
import { reqShopList } from './interfaces/ShopListReq.interface';
import { ShopRepository } from './shop.repository';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UpdateShopInfoDto } from './dto/updateShopInfoDto';
import { Cache } from 'cache-manager';
@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepository: ShopRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async registerShop(createPostDto: CreateShopDto) {
    const saveResult = await this.shopRepository.registerShop(createPostDto);

    console.log('saveResult', saveResult);
    const temp = saveResult.identifiers[0].shop_id;
    const saveRedisResult = await this.cacheManager.set('shops', temp);
    console.log('saveRedisResult', saveRedisResult);
    // const shopId = saveResult.shop_id;
    // if(saveResult){
    //   await this.cacheManager.set('shops', )
    // }
    return saveResult;
  }

  async getShopList(shopReqQuery: reqShopList) {
    const shops = await this.cacheManager.get('shops');

    if (!shopReqQuery.category) {
      shopReqQuery.category = `%%`;
    }
    return await this.shopRepository.getShopList(shopReqQuery);
  }

  async getShop(shop_id: string) {
    return await this.shopRepository.getShopDetail(shop_id);
  }

  async updateShop(shop_id: string, updatePostDto: UpdateShopInfoDto) {
    return this.shopRepository.updateShopDetail(shop_id, updatePostDto);
  }

  async deleteShop(shop_id) {
    return this.shopRepository.deleteShop(shop_id);
  }
}
