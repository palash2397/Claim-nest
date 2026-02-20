import { PartialType } from '@nestjs/mapped-types';
import { CreateFeeDto } from './create-fee.dto';
import { IsNotEmpty, IsMongoId,} from 'class-validator';

export class UpdateFeeDto extends PartialType(CreateFeeDto) {

    @IsMongoId()
    @IsNotEmpty()
    id: string;
}