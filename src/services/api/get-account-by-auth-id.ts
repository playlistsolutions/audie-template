import { api } from '../../config/axios';

export interface PromotionPagination {
  page: string,
  lastId: string | undefined
}

export interface AdvertisingPagination {
  page: string,
  lastId: string | undefined
}

export interface Person {
  addresses: Addresses[];
  authId: number;
  birthDate: string;
  cellPhone: string;
  civilState: number;
  contacts: any[];
  createTime: string;
  email: string;
  gender: number;
  id: number;
  isActive: boolean;
  isImported: boolean;
  levelId: number;
  listener: any;
  localId: number;
  name: string;
  nationalRegister: any;
  observation: any;
  participant: any;
  socialMedia: any[];
  stateRegister: any;
  station: any;
  stationId: number;
  updateTime: string;
  winner: any;
}

interface Addresses {
  number: string;
  city: string;
  street: string;
  neighborhood: string;
  state: string;
  country: string;
  complement: string | undefined;
  zip: string;
  mainAddress: boolean;
}

interface ExtraData {
  apiKey: any;
  appName: any;
  createdAt: any;
  displayName: any;
  email: string;
  emailVerified: any;
  gender: number;
  isAnonymous: any;
  lastLogin: any;
  lastLoginAt: any;
  phoneNumber: string;
  photoURL: any;
  provider: any;
  uid: any;
  userId: any;
}

export interface SocialAccount {
  createTime: string;
  dateJoined: string;
  extraData: ExtraData;
  id: number;
  isActive: boolean;
  lastLogin: string;
  password: string;
  provider: any;
  station: any;
  stationId: number;
  uid: any;
  updateTime: string;
  userId: string;
}

export interface Account {
  person: Person;
  socialAccount: SocialAccount;
}

interface AccountResponse {
  data: Account
  message: string
  errors: object[]
}

export async function getAccountByAuthId(Id: string) {
  const response = await api.get<AccountResponse>(
    'api/v1/AuthAccount/authId/' + Id,
  );

  return response.data.data;
}
