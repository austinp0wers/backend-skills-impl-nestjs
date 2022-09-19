import { CreateShopDto } from './dto/createShopDto';
import { UpdateShopInfoDto } from './dto/updateShopInfoDto';
import { ShopEntity } from './../../entities/shop.entity';
import { Repository, Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { reqShopList } from '../shop/interfaces/ShopListReq.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopRepository {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async getShopList(shopReqQuery: reqShopList) {
    const shops = await this.shopRepository.find({
      where: { category: Like(shopReqQuery.category), visible: true },
    });
    return shops;
  }

  async getShopDetail(shop_id: string) {
    const post = this.shopRepository.findOne({
      where: { shop_id, visible: true },
    });
    return post;
  }

  async updateShopDetail(shop_id: string, updateShopDto: UpdateShopInfoDto) {
    const updateInfo = { ...updateShopDto, updatedOn: new Date() };
    this.shopRepository.update({ shop_id }, updateInfo);

    return { success: true, msg: 'OK' };
  }

  async deleteShop(shop_id: string) {
    // const deletedAt = new Date();
    this.shopRepository.update({ shop_id }, { visible: false });
    return { success: true, shop_id };
  }

  async registerShop(createShopDto: CreateShopDto) {
    await this.shopRepository.insert(createShopDto);

    return { success: true, msg: 'OK' };
  }
}
