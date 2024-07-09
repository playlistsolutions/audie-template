/// <reference types="nativewind/types" />

type RouteName =
  | 'Home'
  | 'Promotions'
  | 'News'
  | 'ProfileUser'
  | 'SheetPromotion'
  | 'Television';

type RootTabParamList = {
  MainScreen: undefined;
  WelcomeScreen: undefined;
  Home: undefined;
  News: {categoryId?: number};
  Promotions: undefined;
  ProfileUser: {refresh: boolean};
  SheetNews: any;
  SheetPromotion: {promotiom: Promotiom};
  PersonalData: {refresh: boolean} | undefined;
  ManageLevel: undefined;
  SocialMedia: undefined;
  About: undefined;
  ContractInformation: undefined;
  BirthdayAndGender: undefined;
  Address: undefined;
  Welcome: undefined;
  RegisterUser: {phoneNumber: string};
  LoginOrRegister: undefined;
  OTPVerification: {phoneNumber: string};
};

interface UserPreferences {
  savedNews: News[];
  firstAccess: boolean;
  themeMode: ColorSchemeSystem | null;
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

interface UserInfo {
  createTime: string;
  dateJoined: string;
  id: number;
  isActive: boolean;
  lastLogin: string;
  provider: any;
  station: any;
  extraData: ExtraData;
  stationId: number;
  uid: any;
  updateTime: string;
  userId: string;
}

interface Rules {
  ageStart: number;
  ageEnd: number;
  rangeAge: boolean;
  operatorBetweenAges: boolean;
  operatorBetween: string | null;
  state: string | null;
  neighborhood: string | null;
  city: string | null;
  gender: string | null;
}

interface PromotionRules {
  id: number;
  promotionId: number;
  rules: Rules;
  isActive: boolean;
  createTime: string;
  updateTime: string;
  stationId: number;
  station: string | null;
}

interface Promotiom {
  id: number;
  stationId: number;
  localId: number;
  description: string;
  title: string;
  image: string;
  imageUrl: string;
  isAd: boolean;
  position: number;
  externalUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dateUndefined: boolean;
  promotionRules: PromotionRules;
}
