import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CvsModule } from './cvs/cvs.module';
import { SkillsModule } from './skills/skills.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CvsControllerV2 } from './cvs/cvs2.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    CvsModule,
    SkillsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest-tp1',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
      logging:true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public','uploads'),
      serveStaticOptions: {
        index: false
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CvsControllerV2);
  }
}