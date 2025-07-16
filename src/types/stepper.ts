// types/stepper.ts

export type PackageType = 'Basic' | 'Premium' | 'Ultra Premium'
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
  package: PackageType;
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
