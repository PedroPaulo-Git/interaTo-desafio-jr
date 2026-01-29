import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AnimalsModule } from './animals/animals.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, AnimalsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
