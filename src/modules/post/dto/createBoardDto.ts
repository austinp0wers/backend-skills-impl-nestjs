import { mainCategory } from 'src/common/enum/categoryType.enum';

export class CreateBoardPostDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly category: mainCategory;
}
