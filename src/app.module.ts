import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecipeModule } from './recipe/recipe.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RecipeModule,
    RatingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
