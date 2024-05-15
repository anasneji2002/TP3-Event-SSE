import { Controller, Sse, UseGuards } from '@nestjs/common';
import { Observable, fromEvent, map, merge } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserDec } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { cvEvents } from 'src/cvs/CvEvents';

@UseGuards(JwtAuthGuard)
@Controller('sse')
export class SseController {
    constructor(private readonly eventEmitter: EventEmitter2) { }

    @Sse()
    sse(@UserDec() SubscribedUser: User): Observable<MessageEvent> {
        const cvAdd$ = fromEvent(this.eventEmitter, cvEvents.add);
        const cvDelete$ = fromEvent(this.eventEmitter, cvEvents.delete);
        const cvUpdate$ = fromEvent(this.eventEmitter, cvEvents.update);
        
        console.log(SubscribedUser.id);
        return merge(cvAdd$, cvDelete$, cvUpdate$).pipe(
            map((payload) => {
                if (SubscribedUser.role === 'admin'){
                  console.log("entered first condition")
                  return ({ data : {payload} });

                }
                else if (SubscribedUser.role === 'user'){
                  console.log(SubscribedUser.id);
                  console.log(payload['userId']);
                  if (payload['userId'] === SubscribedUser.id){
                    console.log("entered second condition")
                    return ({ data : {payload} });
                  }
                }  
              }),
        );
    }
}


