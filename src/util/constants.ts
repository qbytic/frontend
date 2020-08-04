export const devHost = "http://localhost:5000";
export const prodHost = "https://front.qbytic.com";

export const devMode = location.hostname.includes("localhost");

export const host = devMode ? devHost : prodHost;

const ORIGIN = location.origin || `${location.protocol}//${location.host}`;

const discordRedirectURL = encodeURIComponent(
  `${ORIGIN}/u/-/discord/auth/flow/signup`
);

export const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=723962054695845889&redirect_uri=${discordRedirectURL}&response_type=code&scope=guilds.join%20identify`;

export const DISCORD_SERVER_LINK = "https://discord.gg/wWxRwk8";
