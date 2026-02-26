export enum NOTE_TYPES {
  General = 'General',
  Medical = 'Medical',
  Legal = 'Legal',
  ClientContact = 'Client Contact',
  Vocational = 'Vocational',
  TL = 'TL',
  Strategy = 'Strategy',
  Other = 'Other',
  Internal = 'Internal',
}

export enum NOTE_VISIBILITY {
  Internal = 'Internal',
  AdminOnly = 'Admin-Only',
}

// Helper functions for validation
export const VALID_NOTE_TYPES = [
  'General',
  'Medical', 
  'Legal',
  'Client Contact',
  'Vocational',
  'TL',
  'Strategy',
  'Other',
  'Internal',
];

export const VALID_NOTE_VISIBILITY = [
  'Internal',
  'Admin-Only',
];