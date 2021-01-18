export class TelegramUser {
  public id: number;
  public hash: number;
  public is_bot: boolean;
  public first_name: string;
  public last_name: string;
  public username: string;
  public language_code: string;
  public notifications: boolean;

  constructor() {
    this.notifications = true;
  }
}
