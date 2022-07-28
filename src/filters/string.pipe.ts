import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ConvertToStringPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return String(value);
  }
}
