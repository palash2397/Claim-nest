export const Msg = {
  // General
  SERVER_ERROR: `Internal server error`,
  SUCCESS: `Success`,
  VALIDATION_ERROR: `Validation failed`,
  BAD_REQUEST: `Bad request`,

  // User
  USER_REGISTER: `User registered successfully`,
  USER_LOGIN: `User logged in successfully`,
  USER_EXISTS: `User already exists`,
  USER_ALREADY_VERIFIED: `User Already verified`,
  USER_NOT_VERIFIED: `User not verified`,
  USER_NOT_FOUND: `User not found`,
  ACCOUNT_DEACTIVATED: `Account has been temporarily deactivated`,
  ACCOUNT_VERIFIED: `User account verified successfully.`,
  USER_FETCHED: `User fetched successfully`,
  USERS_FETCHED: `Users fetched successfully`,
  USER_DELETED: `User deleted successfully`,
  USER_UPDATED: `User updated successfully`,
  USER_ADDED: `User added successfully`,
  USER_INACTIVE: `User account is temporarily inactive`,

  // Authentication
  INVALID_CREDENTIALS: `Invalid Credentials`,
  LOGIN_SUCCESS: `Login successful`,
  LOGOUT_SUCCESS: `Logout successful`,
  UNAUTHORIZED: `Unauthorized access`,
  FORBIDDEN: `Access forbidden`,
  TOKEN_EXPIRED: `Token has expired`,
  TOKEN_INVALID: `Invalid token`,
  PASSWORD_CHANGED: `Password changed successfully`,
  PASSWORD_INCORRECT: `Incorrect password`,
  PASSWORD_OLD_INCORRECT: `Incorrect old password`,
  ENTERED_OLD_PASSWORD: `You have entered your old password. Please enter a new password`,

  // Data
  DATA_FETCHED: `Data fetched successfully`,
  DATA_GENERATED: `Data generated successfully`,
  DATA_NOT_FOUND: `No data found`,
  DATA_UPDATED: `Data updated successfully`,
  DATA_DELETED: `Data deleted successfully`,
  DATA_ADDED: `Data added successfully`,
  DATA_REQUIRED: `Data is required`,
  DATA_ALREADY_EXISTS: `Data  already exists`,
  DATA_IS_CLOSED: `Data is closed`,

  // Id
  ID_REQUIRED: `Id is required`,

  // Profile
  USERNAME_EXISTS: `Username already exists`,

  // OTP
  OTP_SENT: `The OTP has been successfully sent to your registered email. Please check your inbox.`,
  OTP_VERIFIED: `OTP verified successfully`,
  OTP_NOT_VERIFIED: `OTP not verified. Please verify OTP.`,
  OTP_EXPIRED: `OTP has expired`,
  OTP_INVALID: `Invalid or expired OTP`,
  OTP_RESENT: `OTP resent successfully`,
  OTP_LIMIT_EXCEEDED: `OTP request limit exceeded, please try again later`,
  OTP_NOT_FOUND: `OTP not found. Please request a new OTP.`,

  // Verification
  EMAIL_VERIFICATION_SENT: `The verification link has been successfully sent to your registered email. Please check your inbox.`,
  EMAIL_VERIFIED: `Email verified successfully`,
  EMAIL_SENT: `Email sent successfully`,
  EMAIL_RESET_PASSWORD_LINK_SENT: `Password reset link has been sent to your email.`,
  EMAIL_ALREADY_VERIFIED: `Email already verified`,
  PHONE_VERIFIED: `Phone number verified successfully`,
  PHONE_ALREADY_VERIFIED: `Phone number already verified`,

  // Thumbnail
  THUMBNAIL_GENERATED: `Thumbnail generated successfully`,
  THUMBNAIL_GENERATION_FAILED: `Thumbnail generation failed`,
  THUMBNAIL_GENERATION_ERROR: `Thumbnail generation error`,
  THUMBNAIL_GENERATION_LIMIT_EXCEEDED: `Thumbnail generation limit exceeded`,

  // Case
  CASE_NOT_FOUND: `Case not found`,
  CASE_ALREADY_EXISTS: `Case already exists`,
  CASE_HAS_NO_ASSIGNED_MANAGER: `Case has no assigned manager`,
  CASE_MESSAGE_ADDED: `Case message added successfully`,
  ACTIVITY_ADDED: `Activity added successfully`,
  NOTE_ADDED: `Note added successfully`,
  MESSAGE_ADDED: `Message / Call added successfully`,
  TIME_LOSS_ADDED: `Time Loss added successfully`,
  PROTEST_APPEAL_ADDED: `Protest / Appeal added successfully`,
  DOCUMENT_ADDED: `Document added successfully`,

  CASE_EMAIL_ADDED: `Case email added successfully`,

  PROTEST_APPEAL_FETCHED: `Protest / Appeal fetched successfully`,
  PROTEST_APPEAL_UPDATED: `Protest / Appeal updated successfully`,
  PROTEST_APPEAL_DELETED: `Protest / Appeal deleted successfully`,
  PROTEST_APPEAL_NOT_FOUND: `Protest / Appeal not found`,
  PROTEST_APPEAL_ALREADY_EXISTS: `Protest / Appeal already exists`,
  PROTEST_APPEAL_CREATED: `Protest / Appeal created successfully`,

  // Task
  TASK_CREATED: `Task created successfully`,
  TASK_FETCHED: `Task fetched successfully`,
  TASK_LIST_FETCHED: `Task list fetched successfully`,
  TASK_NOT_FOUND: `Task not found`,
  TASK_ALREADY_EXISTS: `Task already exists`,
  TASK_UPDATED: `Task updated successfully`,
  TASK_DELETED: `Task deleted successfully`,
  ASSIGNED_USER_NOT_FOUND: `Assigned user not found`,
  ASSIGNED_USER_UPDATED: `Assigned user updated successfully`,

  // Event
  EVENT_CREATED: `Event created successfully`,
  EVENT_FETCHED: `Event fetched successfully`,
  EVENT_LIST_FETCHED: `Event list fetched successfully`,
  EVENT_NOT_FOUND: `Event not found`,
  EVENT_ALREADY_EXISTS: `Event already exists`,
  EVENT_UPDATED: `Event updated successfully`,
  EVENT_DELETED: `Event deleted successfully`,

  // Contact
  CONTACT_CREATED: `Contact created successfully`,
  CONTACT_FETCHED: `Contact fetched successfully`,
  CONTACT_LIST_FETCHED: `Contact list fetched successfully`,
  CONTACT_NOT_FOUND: `Contact not found`,
  CONTACTS_NOT_FOUND: `Contacts not found`,
  CONTACT_ALREADY_EXISTS: `Contact already exists`,
  CONTACT_UPDATED: `Contact updated successfully`,
  CONTACT_DELETED: `Contact deleted successfully`,

  // Case Contact
  CASE_CONTACT_FETCHED: `Case contact fetched successfully`,
  CASE_CONTACT_NOT_FOUND: `Case contact not found`,
  CASE_CONTACT_ALREADY_EXISTS: `Case contact already exists`,
  CASE_CONTACT_UPDATED: `Case contact updated successfully`,
  CASE_CONTACT_DELETED: `Case contact deleted successfully`,

  // Client
  CLIENT_CREATED: `Client created successfully`,
  CLIENT_FETCHED: `Client fetched successfully`,
  CLIENT_LIST_FETCHED: `Client list fetched successfully`,
  CLIENT_ALREADY_EXISTS: `Client already exists`,
  CLIENT_UPDATED: `Client updated successfully`,
  CLIENT_DELETED: `Client deleted successfully`,
  CLIENT_NOT_CREATED: `Client not created`,
  CLIENT_NOT_UPDATED: `Client not updated`,
  CLIENT_NOT_DELETED: `Client not deleted`,
  CLIENT_NOT_FOUND: `Client not found`,
  CLIENT_NOT_EXISTS: `Client not exists`,

  // Message
  MESSAGE_UPDATED: `Message updated successfully`,
  MESSAGE_NOT_FOUND: `Message not found`,
  MESSAGE_DELETED: `Message deleted successfully`,
  MESSAGE_NOT_DELETED: `Message not deleted`,
  MESSAGE_CREATED: `Message created successfully`,
  MESSAGE_FETCHED: `Message fetched successfully`,
  MESSAGE_LIST_FETCHED: `Message list fetched successfully`,

  // call log
  CALL_LOG_CREATED: `Call log created successfully`,
  CALL_LOG_FETCHED: `Call log fetched successfully`,
  CALL_LOG_LIST_FETCHED: `Call log list fetched successfully`,
  CALL_LOG_NOT_FOUND: `Call log not found`,
  CALL_LOG_ALREADY_EXISTS: `Call log already exists`,
  CALL_LOG_UPDATED: `Call log updated successfully`,
  CALL_LOG_DELETED: `Call log deleted successfully`,

  // Activity Log
  ACTIVITY_LOG_CREATED: `Activity log created successfully`,
  ACTIVITY_LOG_FETCHED: `Activity log fetched successfully`,
  ACTIVITY_LOG_LIST_FETCHED: `Activity log list fetched successfully`,
  ACTIVITY_LOG_NOT_FOUND: `Activity log not found`,
  ACTIVITY_LOG_ALREADY_EXISTS: `Activity log already exists`,
  ACTIVITY_LOG_UPDATED: `Activity log updated successfully`,
  ACTIVITY_LOG_DELETED: `Activity log deleted successfully`,

  // Notes
  NOTE_CREATED: `Note created successfully`,
  NOTE_FETCHED: `Note fetched successfully`,
  NOTE_LIST_FETCHED: `Note list fetched successfully`,
  NOTE_NOT_FOUND: `Note not found`,
  NOTE_ALREADY_EXISTS: `Note already exists`,
  NOTE_UPDATED: `Note updated successfully`,
  NOTE_DELETED: `Note deleted successfully`,

  // Time Loss
  TIME_LOSS_CREATED: `Time Loss created successfully`,
  TIME_LOSS_FETCHED: `Time Loss fetched successfully`,
  TIME_LOSS_LIST_FETCHED: `Time Loss list fetched successfully`,
  TIME_LOSS_NOT_FOUND: `Time Loss not found`,
  TIME_LOSS_ALREADY_EXISTS: `Time Loss already exists`,
  TIME_LOSS_UPDATED: `Time Loss updated successfully`,
  TIME_LOSS_DELETED: `Time Loss deleted successfully`,

  // Excel
  EXCEL_UPLOADED_SUCCESSFULLY: `Excel uploaded successfully`,
  EXCEL_UPDATED_SUCCESSFULLY: `Excel updated successfully`,
  EXCEL_NOT_UPLOADED: `Excel not uploaded`,
  EXCEL_ERROR: `Excel error`,
  EXCEL_INVALID_FORMAT: `Excel invalid format`,
  EXCEL_INVALID_DATA: `Excel invalid data`,
  EXCEL_FETCHED_SUCCESSFULLY: `Excel fetched successfully`,
  EXCEL_DELETED_SUCCESSFULL: `Excel deleted successfully`,

  //Aws
  AWS_ERROR: `Aws error`,

  //Fee
  FEE_CREATED: `Fee created successfully`,
  FEE_FETCHED: `Fee fetched successfully`,
  FEE_LIST_FETCHED: `Fee list fetched successfully`,
  FEE_NOT_FOUND: `Fee not found`,
  FEE_ALREADY_EXISTS: `Fee already exists`,
  FEE_UPDATED: `Fee updated successfully`,
  FEE_DELETED: `Fee deleted successfully`,
  FEES_LIST_FETCHED: `Fees list fetched successfully`,

  // Conversation
  CONVERSATION_CREATED: `Conversation created successfully`,
  CONVERSATION_FETCHED: `Conversation fetched successfully`,
  CONVERSATION_LIST_FETCHED: `Conversation list fetched successfully`,
  CONVERSATION_NOT_FOUND: `Conversation not found`,
  CONVERSATION_ALREADY_EXISTS: `Conversation already exists`,
  CONVERSATION_UPDATED: `Conversation updated successfully`,
  CONVERSATION_DELETED: `Conversation deleted successfully`,


  // Chat
  CHAT_MESSAGE_CREATED: `Chat message created successfully`,
  CHAT_MESSAGE_FETCHED: `Chat message fetched successfully`,
  CHAT_MESSAGE_LIST_FETCHED: `Chat message list fetched successfully`,
  CHAT_MESSAGE_NOT_FOUND: `Chat message not found`,
  CHAT_MESSAGE_ALREADY_EXISTS: `Chat message already exists`,
  CHAT_MESSAGE_UPDATED: `Chat message updated successfully`,
  CHAT_MESSAGE_DELETED: `Chat message deleted successfully`,



  // target user
  TARGET_USER_NOT_FOUND: `Target user not found`,

};
