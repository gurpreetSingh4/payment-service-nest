import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "src/common/mongoose-config.service";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        })
    ],
    exports: [MongooseModule]

})
export class DatabaseModule {}