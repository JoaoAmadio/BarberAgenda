import axios from "axios";
import { environment } from "../environments/environment";
export class LoginService {
  public async loginTelegram(username: string, code: string): Promise<any> {
    return axios.post(
      `${environment.REST_API_URL}/login.php?type=TELEGRAM`,
      {
        username,
        code,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  }

  public async regsterTelegram(code: string): Promise<any> {
    code = code.toUpperCase();
    return axios.post(
      `${environment.REST_API_URL}/register?type=TELEGRAM`,
      {
        code,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
