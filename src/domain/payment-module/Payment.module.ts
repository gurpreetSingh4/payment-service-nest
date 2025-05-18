import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { REGISTERED_EMAIL_DATA_MODEL, RegisteredEmailDataSchema } from 'src/schemas/common/registeredEmailData.schema';
import { USER_MODEL, UserSchema } from 'src/schemas/common/user.schema';
import { USER_REG_EMAIL_DATA_MODEL, UserRegisteredEmailsDataSchema } from 'src/schemas/UserRegisteredEmailsData.schema';
import { PaymentService } from './Payment.service';
import { RedisModule } from '../redis/redis.module';
import { PaymentController } from './Payment.controller';
import { EmailUtilFunctions } from 'src/utils/Email.util';
import { GmailServiceUtilFn } from '../../utils/gmailClient.util';
import { UserAuth } from 'src/middlewares/userAuth.middleware';

@Module({
    imports: [
        RedisModule,
        MongooseModule.forFeatureAsync([
            {
                name: REGISTERED_EMAIL_DATA_MODEL,
                useFactory: (configService: ConfigService) => {
                    RegisteredEmailDataSchema.path('regEmailPicture').default(
                        configService.get<string>('DEFAULT_PROFILE_PIC'),
                    );
                    return RegisteredEmailDataSchema;
                },
                inject: [ConfigService],
            },
            {
                name: USER_MODEL,
                useFactory: () => UserSchema,
            },
            {
                name: USER_REG_EMAIL_DATA_MODEL,
                useFactory: () => UserRegisteredEmailsDataSchema,
            },

        ]),
    ],
    providers: [PaymentService, EmailUtilFunctions, GmailServiceUtilFn],
    exports: [MongooseModule, PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes()
    }
}
