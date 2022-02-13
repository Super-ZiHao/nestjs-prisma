import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 *  IsNotEmpty 规定不能为空
 *      {
 *          message： 报错提示
 *      }
 *
 *  IsNumber 规定只能是数字
 */

export class CreateBookDto {
  @ApiProperty({
    description: '书名',
  })
  @IsNotEmpty({ message: '书名不能为空' })
  title: string;

  @ApiProperty({
    description: '作者',
  })
  @IsNotEmpty({ message: '作者名不能为空' })
  author: string;

  @ApiProperty({
    description: '价格',
  })
  @IsNotEmpty({ message: '价格不能为空' })
  @IsNumber()
  price: number;
}
