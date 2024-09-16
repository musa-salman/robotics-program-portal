import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import Preference from './Preference';

class PreferenceRepository extends BaseRepository<Preference> {
  constructor() {
    super(db, 'preferences');
  }
}

export { PreferenceRepository };
