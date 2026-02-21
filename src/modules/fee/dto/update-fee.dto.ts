import { PartialType } from '@nestjs/mapped-types';
import { CreateFeeDto } from './create-fee.dto';
import { IsNotEmpty, IsMongoId,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeeDto extends PartialType(CreateFeeDto) {

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}