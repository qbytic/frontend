import * as store from "../globalStore";
import { userRoutes } from "../util/api_routes";
import * as requests from "./requests";

interface SecuredUserData {
  email: string;
  discord_id: string;
  clan_invites: Record<string, string[]>;
  clan_requests: Record<string, string[]>;
}
export interface UserData {
  name: string;
  user: string;
  school: string;
  team_data: Record<string, Record<string, string>>;
  is_admin: boolean;
  has_verified_email: boolean;
  created_at: number;
  _secure_?: SecuredUserData;
}

export interface ClanData {
  name: string;
  event: string;
  members: string[];
  leader: string;
  is_disqualified: boolean;
  disqualification_reason: string;
  created_at: number;
  current_round: number;
  score: number[];
  _secure_?: SecuredTeamData;
}
interface SecuredTeamData {
  clan_invites: string[];
  clan_requests: string[];
  event_data: any;
  submissions: Record<string, Record<string, unknown>>[];
}

interface Subscriber<T> {
  (newData: T): void;
}

interface LoginResponse {
  success?: boolean;
  user_data: UserData;
}

class Auth {
  get isLoggedIn(): boolean {
    const resp = store.data.get("authData") as UserData;
    return resp && resp.user != null;
  }

  login(
    user: string,
    password: string
  ): requests.AbortableFetchResponse<LoginResponse> {
    const response = requests.postJSON<LoginResponse>(userRoutes.login, {
      user,
      password,
    });
    return {
      controller: response.controller,
      json: response.json.then((resp) => {
        const js = resp.data;
        const data = js && js.user_data;
        if (data) store.updateStore("authData", data);
        return resp;
      }),
    };
  }
  logout() {
    const req = requests
      .get(userRoutes.logout)
      .json.then(() => store.updateStore("authData", null));
    return req;
  }
}

export const auth = new Auth();
