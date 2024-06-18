import {ColorSchemeSystem} from 'nativewind/dist/style-sheet/color-scheme';
import {MMKV} from 'react-native-mmkv';
import {Person} from './api/get-account-by-auth-id';

class StorageService {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV({
      id: 'storage-audie',
    });
  }

  // Person

  savePerson = (person: Person) => {
    this.storage.set('person', JSON.stringify(person));
  };

  getPerson = (): Person | null => {
    const person = this.storage.getString('person');
    return person ? JSON.parse(person) : null;
  };

  removePerson = () => {
    this.storage.delete('person');
  };

  // UserInfo

  saveUserInfo = (info: UserInfo) => {
    this.storage.set('user_info', JSON.stringify(info));
  };

  getUserInfo = (): UserInfo | null => {
    const info = this.storage.getString('user_info');
    return info ? JSON.parse(info) : null;
  };

  removeUserInfo = () => {
    this.storage.delete('user_info');
  };

  // UserPreferences

  saveUserPreferences = (preferences: UserPreferences) => {
    this.storage.set('user_preferences', JSON.stringify(preferences));
  };

  getUserPreferences = (): UserPreferences | null => {
    const preferences = this.storage.getString('user_preferences');
    return preferences ? JSON.parse(preferences) : null;
  };

  removeUserPreferences = () => {
    this.storage.delete('user_preferences');
  };

  // DarkMode

  getDarkMode = (): ColorSchemeSystem | null => {
    const preferences = this.getUserPreferences();
    return preferences ? preferences.themeMode : null;
  };

  setDarkMode = async (type: string) => {
    let preferences = this.getUserPreferences();
    if (!preferences) {
      preferences = {
        savedNews: [],
        firstAccess: false,
        themeMode: type,
      };
    } else {
      preferences = {...preferences, themeMode: type};
    }
    this.saveUserPreferences(preferences);
  };
}

export default new StorageService();
