export type GuestValidationStatus = 'general' | 'verified' | 'unregistered';

export interface GuestEntry {
  name: string;
  slug: string;
  quota: number;
  category?: string;
}

export interface GuestValidationResult {
  status: GuestValidationStatus;
  name: string;
  quota: number;
  isRsvpAllowed: boolean;
  category?: string;
  rawInput?: string;
}

