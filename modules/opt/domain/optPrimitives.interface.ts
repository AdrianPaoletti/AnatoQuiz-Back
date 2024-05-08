export enum SUBJECT_TYPES {
  REGISTRATION = "registration",
  CHANGE_PASSWORD = "changePassword",
}

export interface OPTPrimitives {
  id: string;
  email: string;
  value: string;
  subject: string;
}
