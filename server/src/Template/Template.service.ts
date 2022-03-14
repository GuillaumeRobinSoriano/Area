import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TemplateService {
  constructor() {}
  default(): String {
    return "hello user"
  }
}
