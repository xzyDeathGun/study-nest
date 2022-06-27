import { Inject, Injectable, Optional } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: any
  ) {}
  private cats: any[] = [];
  create(cat) {
    this.cats.push(cat);
  }
  findAll() {
    return this.cats;
  }
}
