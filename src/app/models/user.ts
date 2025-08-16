export enum EnumRoleUser {
  USER,
  VIP,
  STAFF,
  ADMIN,
}

export enum EnumLangs {
  ES = 'es',
  EN = 'en',
  FR = 'fr',
  IT = 'it',
  PT = 'pt',
  DE = 'de',
}

export interface IUser {
  authProviders: {
    local?: {
      password: string;
      salt: string;
    };
    auth0?: string;
    google?: string;
    facebook?: string;
  };

  firstName: string;
  lastName: string;
  fullName: string;
  profileImage?: string;
  email: string;
  phone?: string;
  role: EnumRoleUser;
  language: EnumLangs; // ISO 639-1 (es, en, fr...)
  dietaryPreferences: string[]; // Ej: ["vegano", "sin gluten"]
  loyaltyPoints: number;
  achievements: Map<string, number>; // Ej: { "ordersCompleted": 5 }
  notificationChannels: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    push: boolean;
  };

  // 2FA
  twoFASecret?: string;
  is2FAEnabled: boolean;
  referrals: IUser[];
}

export enum notificationChannelsEnum {
  email = 'email',
  sms = 'sms',
  whatsapp = 'whatsapp',
  push = 'push',
}
