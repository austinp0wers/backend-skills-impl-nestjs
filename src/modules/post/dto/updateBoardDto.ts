import { mainCategory } from 'src/common/enum/categoryType.enum';
export class UpdatePostDto {
  readonly post_id: string;
  readonly title: string;
  readonly content: string;
  readonly category: mainCategory;
}
