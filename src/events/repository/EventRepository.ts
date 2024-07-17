import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { IEvent } from './Event';

export class EventRepository extends BaseRepository<IEvent> {
  constructor() {
    super(db, 'events');
    this._collection.withConverter({
      toFirestore: (event: IEvent) => {
        return {
          ...event
        };
      },
      fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return {
          ...data,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate()
        };
      }
    });
  }
}
