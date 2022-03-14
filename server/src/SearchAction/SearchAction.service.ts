import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class SearchActionService {
  constructor() {}
  default(): String {
    return "hello user"
  }
}
