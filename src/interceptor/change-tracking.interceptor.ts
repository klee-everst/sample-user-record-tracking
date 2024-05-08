import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HistoryRecord } from '../schema/history-record.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChangeTrackingInterceptor implements NestInterceptor {
    constructor( @InjectModel(HistoryRecord.name) private historyModel: Model<HistoryRecord>) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const beforeData = request.body;

        return next.handle().pipe(
        tap((afterData) => {
            Object.keys(beforeData).forEach(key => {
            if (beforeData[key] !== afterData[key]) {
                const historyRecord = new this.historyModel({
                userId: request.params.id,
                fieldChanged: key,
                oldValue: beforeData[key],
                newValue: afterData[key],
                changedAt: new Date(),
                });
                historyRecord.save();
            }
            });
        }),
        );
    }
}
  