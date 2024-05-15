import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateCvHistoryDto } from "./dto/create-cvHistory.dto";
import { CvHistory } from "./entities/cvHistory.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CvListener {
    constructor(
        @InjectRepository(CvHistory)
        private cvHistoryRepository: Repository<CvHistory>){}

    @OnEvent("cv.added")
    @OnEvent("cv.updated")
    @OnEvent("cv.deleted")
    async handleEvent(payload: any) {
        const cvHistoryToAdd : CreateCvHistoryDto = {
            operation : payload.operation ,
            date : payload.date ,
            userId : payload.userId ,
            cvId : payload.cv.id ,
            name : payload.cv.name ,
            firstname : payload.cv.firstname ,
            age : payload.cv.age ,
            cin : payload.cv.cin ,
            job : payload.cv.job ,
            path : payload.cv.path
        }     
        const historyItem = await this.cvHistoryRepository.create(cvHistoryToAdd);
        await this.cvHistoryRepository.save(historyItem);
    }
}