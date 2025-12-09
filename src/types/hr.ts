export type PersonnelCategory = 'specialist_doctor' | 'occupational_doctor' | 'pharmacist' | 'dentist' | 'paramedical';

export type PromotionDuration = 'minimum' | 'average' | 'maximum';

export interface Grade {
  id: string;
  code: string;
  designationFr: string;
  designationAr: string;
}

export interface Body {
  id: string;
  code: string;
  designationFr: string;
  designationAr: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headCount: number;
}

export interface Domain {
  id: string;
  name: string;
  specialties: string[];
}

export interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  originalRank: string;
  currentRank: string;
  reference: string;
  step: number;
  category: PersonnelCategory;
  departmentId: string;
  specialty?: string;
  hireDate: string;
  status: 'active' | 'retired' | 'transferred';
}

export interface Promotion {
  id: string;
  personnelId: string;
  previousRank: string;
  newRank: string;
  previousStep: number;
  newStep: number;
  duration: PromotionDuration;
  effectiveDate: string;
  decisionNumber: string;
}

export interface Retiree {
  id: string;
  personnelId: string;
  retirementDate: string;
  yearsOfService: number;
  lastRank: string;
  lastStep: number;
}
