import { mainCategory } from 'src/common/enum/categoryType.enum';
export class UpdateShopInfoDto {
  readonly title: string;
  readonly description: string;
  readonly category: mainCategory;
}
