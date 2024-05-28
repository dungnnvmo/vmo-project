import { Injectable } from '@nestjs/common';
import { createTransport, Transporter, SentMessageInfo } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { mailConfig } from '@configs/configs.constants';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';

@Injectable()
export class EmailService {
  private nodemailerTransport: Transporter<SentMessageInfo>;
  constructor() {
    this.nodemailerTransport = createTransport({
      service: mailConfig.emailService,
      auth: {
        user: mailConfig.emailUser,
        pass: mailConfig.emailPassword,
      },
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: Mail.Options & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = handlebars.compile(template, {
        strict: true,
      })(context);
    }
    return this.nodemailerTransport.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${mailConfig.defaultName}" <${mailConfig.defaultEmail}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
