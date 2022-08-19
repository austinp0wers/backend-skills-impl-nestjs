import { ShopEntity } from '../../entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBoardPostDto } from './dto/createBoardDto';

export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private shopRepo: Repository<ShopEntity>,
  ) {}

  async registerShop(createPostDto: CreateBoardPostDto) {
    try {
      await this.shopRepo.insert(createPostDto);
    } catch (err) {
      throw new Error('insert failed');
    }
    return 'OK';
  }

  async getShopList(category: string) {
    if (!category) {
      category = `%%`;
    }
    const boardList = await this.shopRepo.find({
      where: { category: Like(category), visible: true },
    });
    return boardList;
  }

  async getShop(shop_id: string) {
    const post = this.shopRepo.findOne({ where: { shop_id, visible: true } });
    return post;
  }

  async updateShop(shop_id, updatePostDto) {
    const updateInfo = { ...updatePostDto, updatedOn: new Date() };
    this.shopRepo.update({ shop_id }, updateInfo);
  }

  async deleteShop(shop_id) {
    this.shopRepo.update({ shop_id }, { visible: false });
    const deletedAt = new Date();
    return { success: true, post_title: shop_id, deletedAt };
  }
}
