export enum TaskCallStatus {
  RETURNED = 'Returned',
  NO_CALLBACK_NEEDED = 'No Callback Needed',
  WILL_CALL_BACK = 'Will Call Back',
}

export enum TaskStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export enum TaskType {
  FOLLOW_UP_CALL = 'Follow-Up Call',
  DOCUMENT_REVIEW = 'Document Review',
  ORDER_REVIEW = 'Order Review',
  MEDICAL_RECORDS = 'Medical Records',
  APF_WS = 'APF/WSF',
  PAYMENT_FOLLOW_UP = 'Payment Follow-Up',
  VOCATIONAL_REVIEW = 'Vocational Review',
  OTHER = 'Other',
}
