import { EmailService } from '@email/email.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';
import { I18nContext } from 'nestjs-i18n';
import { MaybeType } from '@utils/types/maybe.type';
import { appConfig } from '@configs/configs.constants';
import { join } from 'path';

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async createdForm(mailData: MailData<{ id: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    if (18n) {
      [emailTitle, text1, text2, text3, text4] = await Promise.all([
        i18n.t('common.newForm'),
        i18n.t('new-form.text1'),
        i18n.t('new-form.text2'),
        i18n.t('new-form.text3'),
        i18n.t('new-form.text4'),
      ]);
    }
    await this.emailService.sendMail({
      to: mailData.to,
      subject: emailTitle,
      text: `${appConfig.backendDomain}/${appConfig.prefix}/form/${mailData.data.id}`,
      templatePath: join(
        'src',
        'modules',
        'notification',
        'mail-template',
        'new-form.hbs',
      ),
      context: {
        title: emailTitle,
        url: `${appConfig.backendDomain}/${appConfig.prefix}/form/${mailData.data.id}`,
        actionTitle: emailTitle,
        app_name: appConfig.name,
        text1,
        text2,
        text3,
        text4,
      },
    });
  }
}
