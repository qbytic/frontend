import { host } from "./constants";
const absoluteURL = (str: string): string => {
  return new URL(str, host).href;
};

export const userRoutes = {
  register: absoluteURL("/users/register/"),
  login: absoluteURL("/users/login/"),
  logout: absoluteURL("/logout/"),
  refreshAuthToken: absoluteURL("/u/token/refresh/"),
  postDiscordAccessTokens: absoluteURL("/u/discord/auth/code/"),
  allUsers: absoluteURL("/users/all/"),
  resetPassword: absoluteURL("/users/passwords/reset/"),
  verifyEmail: absoluteURL("/users/email/verify/"),
  userData: (userName: string) => absoluteURL(`/users/${userName}/data/`),
  editUserData: (userName: string) => absoluteURL(`/users/${userName}/edit/`),
};

export const clanRoutes = {
  allClans: absoluteURL("/clans/all/"),
  createClan: (eventName: string) => absoluteURL(`/${eventName}/clans/create/`),
  clanData: (clanName: string) => absoluteURL(`/clans/${clanName}/data/`),
  inviteMember: (clanName: string) =>
    absoluteURL(`/clans/${clanName}/members/invite/`),
  acceptRequest: (clanName: string) =>
    absoluteURL(`/clans/${clanName}/members/add/`),

  acceptInvite: (eventName: string, clanName: string) =>
    absoluteURL(`/${eventName}/clans/${clanName}/join/`),
  requestToJoin: (eventName: string, clanName: string) =>
    absoluteURL(`/${eventName}/clans/${clanName}/request/`),

  rejectRequest: (clanName: string) =>
    absoluteURL(`/clans/${clanName}/members/reject/`),
  removeFromClan: (clanName: string) =>
    absoluteURL(`/clans/${clanName}/members/remove/`),
  submitWork: (eventName: string, clanName: string) =>
    absoluteURL(`/${eventName}/clans/${clanName}/submit/`),

  registerForGamingEvent: (game: string) =>
    absoluteURL(`/g/gaming/${game}/register/`),
};

export const adminRoutes = {
  allUsers__Safe: absoluteURL("/admin/users/all/"),
  allClans__Safe: absoluteURL("/admin/teams/all/"),
  scoreTeam: (teamName: string) => absoluteURL(`/admin/<team>/score/`),
  disqualifyTeam: (teamName: string) =>
    absoluteURL(`/admin/<team>/disqualify/`),
  requalifyTeam: (teamName: string) => absoluteURL(`/admin/<team>/requalify/`),
};
