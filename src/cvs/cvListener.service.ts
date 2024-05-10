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
        const historyItem = await this.cvHistoryRepository.create(payload);
        await this.cvHistoryRepository.save(historyItem);
    }
}