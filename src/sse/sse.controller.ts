import { Controller, Sse } from '@nestjs/common';
import { Observable, fromEvent, map, filter } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserDec } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserRoleEnum } from "../enums/user-roles.enum";


@Controller('sse')
export class SseController {
    constructor(private readonly eventEmitter: EventEmitter2) { }

    @Sse()
    sse(@UserDec() SubscribedUser: User): Observable<MessageEvent> {
        return fromEvent(this.eventEmitter, 'cv.added').pipe(
            filter((payload) => {
                return (
                    SubscribedUser.role === UserRoleEnum.ADMIN ||
                    SubscribedUser.id === payload['userId']
                );
            }),
            map((payload) => {
                return { data : {payload}
                };
            }),
        );
    }
}


