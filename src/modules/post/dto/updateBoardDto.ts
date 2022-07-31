import { mainCategory } from 'src/common/enum/categoryType.enum';
export class UpdatePostDto {
  readonly title: string;
  readonly description: string;
  readonly category: mainCategory;
}
