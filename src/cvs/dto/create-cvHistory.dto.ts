import { IsDate, IsNotEmpty, IsString} from "class-validator";

export class CreateCvHistoryDto {

    @IsNotEmpty()
    @IsString()
    operation: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    userId: number
    
    @IsNotEmpty()
    cvId: number

}
