import fs from "fs";
import handlebars from "handlebars";
import { injectable } from "inversify";
import { createTransport } from "nodemailer";
import path from "path";

import {
  IEmailRepository,
  IMailOptions,
} from "../domain/emailRepository.interface";

@injectable()
export class EmailRepository implements IEmailRepository {
  public send(mailOptions: IMailOptions): void {
    const transporter = this.createTransport();
    transporter.sendMail(mailOptions).catch(() => {});
  }

  public mailOptions(
    email: string,
    subject: string,
    source: string,
    replacements: { [key: string]: string },
  ): IMailOptions {
    const template = handlebars.compile(this.getSource(source));

    return {
      from: {
        name: "Anatoquiz Team",
        address: process.env.NODEMAILER_USER_GMAIL ?? "",
      },
      to: email,
      subject,
      html: template(replacements),
    };
  }

  private createTransport() {
    return createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER_GMAIL,
        pass: process.env.NODEMAILER_PASSWORD_GMAIL,
      },
    });
  }

  private getSource(source: string) {
    return fs
      .readFileSync(
        path.resolve(`${__dirname}/templates/${source}.html`),
        "utf-8",
      )
      .toString();
  }
}
