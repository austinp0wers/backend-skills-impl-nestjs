import { CreateBoardPostDto } from './dto/createBoardDto';
import { reqShopList } from './interfaces/ShopListReq.interface';
import { ShopRepository } from './shop.repository';
import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/updateBoardDto';

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  async registerShop(createPostDto: CreateBoardPostDto) {
    return await this.shopRepository.registerShop(createPostDto);
  }

  async getShopList(shopReqQuery: reqShopList) {
    if (!shopReqQuery.category) {
      shopReqQuery.category = `%%`;
    }
    return await this.shopRepository.getShopList(shopReqQuery);
  }

  async getShop(shop_id: string) {
    return await this.shopRepository.getShopDetail(shop_id);
  }

  async updateShop(shop_id: string, updatePostDto: UpdatePostDto) {
    return this.shopRepository.updateShopDetail(shop_id, updatePostDto);
  }

  async deleteShop(shop_id) {
    return this.shopRepository.deleteShop(shop_id);
  }
}
