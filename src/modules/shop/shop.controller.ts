import { DeleteShopStatus } from './interfaces/shopDelete.interface';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from 'src/exceptions/httpException';
import { ShopService } from './shop.service';
import { UpdateShopInfoDto } from './dto/updateShopInfoDto';
import { CreateShopDto } from './dto/createShopDto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  HttpStatus,
  Res,
  HttpCode,
  UseGuards,
  Headers,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { reqShopList } from './interfaces/ShopListReq.interface';

@Controller('shop')
@ApiTags('Shop')
@UseFilters(new HttpExceptionFilter())
export class ShopController {
  constructor(
    private shopService: ShopService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '계시물 등록' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Headers('Authorization') authorization: any,
    @Body() createPostDto: CreateShopDto,
    @Res() res: Response,
  ) {
    // 'Bearer ' 제거 하고 decode 해야 한다.
    await this.shopService.registerShop(createPostDto);
    return res.status(HttpStatus.OK).json({
      code: 200,
      msg: 'OK',
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '계시물 수정' })
  @Patch(':shop_id')
  @HttpCode(200)
  async updatePost(
    @Param('shop_id') shop_id: string,
    @Body() updatePostDto: UpdateShopInfoDto,
  ) {
    return this.shopService.updateShop(shop_id, updatePostDto);
  }

  @ApiOperation({ summary: '계시물 조회' })
  @Get(':shop_id')
  @HttpCode(200)
  async readPost(@Param('shop_id') shop_id: string) {
    return this.shopService.getShop(shop_id);
  }

  @ApiOperation({ summary: '계시물 목록 전체 조회' })
  @Get('')
  @HttpCode(200)
  async getBoardList(@Query() shopReqQuery: reqShopList) {
    return await this.shopService.getShopList(shopReqQuery);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '계시물 삭제' })
  @Delete(':shop_id')
  @HttpCode(200)
  async deletePoset(
    @Param('shop_id') shop_id: string,
  ): Promise<DeleteShopStatus> {
    return this.shopService.deleteShop(shop_id);
  }
}
