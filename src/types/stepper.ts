// types/stepper.ts
export interface FormData {
  bhkType: string;
  bhkSizes: { [key: string]: 'small' | 'large' };
  rooms: {
    livingRoom: number;
    kitchen: number;
    bedroom: number;
    bathroom: number;
    dining: number;
  };
  package: 'essentials' | 'premium' | 'luxury';
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    propertyName: string;
    subscribeWhatsapp: boolean;
  };
}

export interface StepData {
  step: number;
  title: string;
  isCompleted: boolean;
}
