import FakeSet from "@hydrophobefireman/j-utils/@build-modern/src/modules/es6/loose/Set/index";
import FakeMap from "@hydrophobefireman/j-utils/@build-modern/src/modules/es6/loose/Map/index";

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
export type Events =
  | "gaming"
  | "prog"
  | "pentest"
  | "lit"
  | "music"
  | "video"
  | "minihalo";

interface Subscriber<T> {
  (newData: T): void;
}

class Auth {
  userData: UserData = null;
  clanData: FakeMap<Events, ClanData> = null;

  private userStateSubscribers = new FakeSet<Subscriber<UserData>>();

  private clanDataSubscribers = new FakeMap<
    Events,
    FakeSet<Subscriber<ClanData>>
  >();

  get isLoggedIn(): boolean {
    return this.userData != null && this.userData.user != null;
  }

  setUserData(data: UserData): void {
    this.userData = data;
    this.userStateSubscribers.forEach((subscriber) => subscriber(data));
  }
  setClanData(event: Events, data: ClanData): void {
    this.clanData.set(event, data);
    const subs = this.clanDataSubscribers.get(event);
    subs && subs.forEach((subscriber) => subscriber(data));
  }

  async login(user: string, password: string) {
    const response = requests.postJSON<UserData>(userRoutes.login, {
      user,
      password,
    });
    const data = (await response.json).data;
    if (data) this.setUserData(data);
    return response;
  }
  logout() {
    const req = requests
      .get(userRoutes.logout)
      .json.then(() => this.setUserData(null));
    return req;
  }
  addAuthStateSubscription(subscriber: Subscriber<UserData>) {
    this.userStateSubscribers.add(subscriber);
  }
  removeAuthStateSubscription(subscriber: Subscriber<UserData>) {
    this.userStateSubscribers.delete(subscriber);
  }
  removeClanStateSubscription(event: Events, subscriber: Subscriber<ClanData>) {
    const set = this.clanDataSubscribers.get(event);
    set && set.delete(subscriber);
  }
  addClanDataSubscription(event: Events, subscriber: Subscriber<ClanData>) {
    const set = this.clanDataSubscribers.get(event);
    if (set) {
      set.add(subscriber);
    } else {
      const eventSet = new FakeSet<Subscriber<ClanData>>([subscriber]);
      this.clanDataSubscribers.set(event, eventSet);
    }
  }
}

export const auth = new Auth();
