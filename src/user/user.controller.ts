import { 
  Controller, 
  Get, 
  Post,
  Res,
  Req, 
  UseGuards,
  HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser (
    @Req() req: RequestWithUser
  ) {
    return req.user
  }

  @HttpCode(200)
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @Res({passthrough: true}) res: Response
  ) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    })
    return {success: true, message: "Logged out successfully"}
  }

}