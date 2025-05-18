import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  Inject,
  Post,
  HttpException,
  HttpStatus,
  Delete,
  Body,
  // Session,
} from '@nestjs/common';
import { PaymentService } from './Payment.service';
import { Response, Request } from 'express';
import { Session } from 'src/common/decorators/session.decorator';
import { EmailUtilFunctions } from 'src/utils/Email.util';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private emailUtilFn: EmailUtilFunctions,
  ) {
    console.log("hello ji payment controller me h")
  }

  @Get('/createpayment')
  async getCurrentUser(@Req() req: Request, @Res() res: Response, @Query() query: { userid: string}, @Session() session: Record<string, any>) {
    const userId = query.userid;
    // const result = await this.paymentService
    return res.status(200).json({
        success: true,
        paymenturl: "https://www.google.com"
    })

  }
  


  // @Post('/createlabel')
  // async createLabel(@Req() req: Request, @Res() res: Response, @Query() query: { userid: string, regemail: string }, @Body() body: Record<string, any>) {
  //   const userId = query.userid;
  //   const regEmail = query.regemail
  //   const accessToken = await this.emailUtilFn.getAccessToken(userId, regEmail)
  //   const result = await this.paymentService
  //   res.status(200).json(result)

  // }

}
