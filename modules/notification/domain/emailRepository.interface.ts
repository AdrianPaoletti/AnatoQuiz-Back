export interface IMailOptions {
  from: {
    name: string;
    address: string;
  };
  to: string;
  subject: string;
  html: string;
}

export interface IEmailRepository {
  send: (mailOptions: IMailOptions) => void;
  mailOptions: (
    email: string,
    subject: string,
    source: string,
    replacements: { [key: string]: string },
  ) => IMailOptions;
}
