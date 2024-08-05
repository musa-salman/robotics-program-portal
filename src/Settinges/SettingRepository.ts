import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { Setting } from './Setting';

export class SettingRepository extends BaseRepository<Setting> {
  constructor() {
    super(db, 'gptApi');
  }
}
