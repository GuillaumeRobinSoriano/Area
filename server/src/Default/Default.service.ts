import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class DefaultService {
  constructor() {}
  default(): String {
    return "hello user"
  }
}
