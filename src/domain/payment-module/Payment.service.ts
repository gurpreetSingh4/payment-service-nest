import { Injectable, Logger } from "@nestjs/common";
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { REGISTERED_EMAIL_DATA_MODEL, RegisteredEmailDataModel } from "src/schemas/common/registeredEmailData.schema";
import { USER_MODEL, UserDocument } from "src/schemas/common/user.schema";
import { USER_REG_EMAIL_DATA_MODEL, UserRegisteredEmailsDataModel } from "src/schemas/UserRegisteredEmailsData.schema";

import { RedisService } from "../redis/redis.service";
import { GmailServiceUtilFn } from "src/utils/gmailClient.util";

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    private readonly COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  

    constructor(
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
        private readonly gmailServiceUtilFn: GmailServiceUtilFn,
        @InjectModel(USER_REG_EMAIL_DATA_MODEL) private readonly userRegEmailsModel: Model<UserRegisteredEmailsDataModel>,
        @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
        @InjectModel(REGISTERED_EMAIL_DATA_MODEL) registeredEmailDataModel: Model<RegisteredEmailDataModel>,

    ) { }



    async getEmailLabelStats(accessToken: string) {
        try {
            const labelListRes = await axios.get(
                'https://gmail.googleapis.com/gmail/v1/users/me/labels',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            const labels = labelListRes.data.labels;

            const stats = await Promise.all(
                labels.map(async (label, index) => {
                    const labelRes = await axios.get(
                        `https://gmail.googleapis.com/gmail/v1/users/me/labels/${label.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );

                    const data = labelRes.data;
                    return {
                        labelId: data.id,
                        name: data.name,
                        total: data.messagesTotal,
                        unread: data.messagesUnread,
                        color: this.COLORS[index % this.COLORS.length],
                    };
                }),
            );

            return {
                labels: labels.map(label => ({
                    id: label.id,
                    name: label.name,
                    type: label.type,
                })),
                stats,
            };
        } catch (error) {
            this.logger.error('Error fetching labels', error?.response?.data || error.message);
            throw new Error('Failed to fetch labels');
        }

    }

}
