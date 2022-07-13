import { IsString, IsNumber, IsInt } from 'class-validator';

export class createCatSchema {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
