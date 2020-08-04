import { useState, useCallback, A } from "@hydrophobefireman/ui-lib";
import {
  useAuthenticationState,
  useLocation,
  useKeyPress,
  useViewportSize,
} from "../../customHooks";
import { Logo } from "../shared/Logo";
import { DISCORD_SERVER_LINK } from "../../util/constants";

export function Header() {
  const [isActive, setIsActive] = useState(false);
  const route = useLocation();
  const onClick = useCallback(() => setIsActive((isActive) => !isActive), []);
  return (
    <header>
      {route !== "/" && <LinkHome />}
      <nav class="header-nav">
        <MenuButton onClick={onClick} active={isActive} />
        {<LinkRenderer onClick={onClick} active={isActive} />}
      </nav>
    </header>
  );
}
function LinkHome() {
  const [, width] = useViewportSize();
  const mobileLayout = width <= 600;
  return mobileLayout ? (
    <A href="/" class="center nexa link-home-mob">
      Qbytic
    </A>
  ) : (
    <div class="link-home">
      <Logo />
    </div>
  );
}
export function MenuButton(props: { onClick: EventListener; active: boolean }) {
  return (
    <button
      class="hoverable menubtn"
      onClick={props.onClick}
      tabindex={0}
      title="menu"
      aria-label="menu"
    >
      <div>
        <svg
          class="menu-btn-svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="var(--current-color)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d={
              props.active
                ? "M18 6L6 18M6 6l12 12"
                : "M4 6h 161M10 12h 10M6 18h45"
            }
          />
        </svg>
      </div>
    </button>
  );
}

function LinkRenderer(props: { active: boolean; onClick: EventListener }) {
  const auth = useAuthenticationState();
  const loc = useLocation();
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Leaderboards", "/leaderboards"],
    ["Sponsors", "/sponsors"],
  ]
    .concat(
      auth != null
        ? [
            ["Dashboard", "/dashboard"],
            ["Logout", "/logout"],
          ]
        : [
            ["Login", "/login"],
            ["Register", "/register"],
          ]
    )
    .filter((x) => loc != x[1]);

  const closeMenu = useCallback(() => props.active && props.onClick(null), [
    props.active,
    props.onClick,
  ]);
  useKeyPress("Escape", closeMenu);

  return (
    <>
      {props.active && <div class="mask" onClick={props.onClick} />}
      <div class={"link-wrapper" + (props.active ? "" : " out")}>
        {links.map(([text, url]) => (
          <A
            class="header-link hoverable"
            href={url}
            tabindex={props.active ? 0 : -1}
            onClick={props.onClick}
          >
            {text}
          </A>
        ))}
        <SocialLinks active={props.active} />
      </div>
    </>
  );
}

function SocialLinks({ active }: { active: boolean }) {
  const dimensions = 30;
  const size = { height: dimensions, width: dimensions };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <a
        href="https://github.com/qbytic"
        rel="noreferrer"
        target="_blank"
        aria-label="Qbytic Github"
        class="hoverable social-logo"
        tabindex={active ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" {...size}>
          <path
            fill="var(--current-color)"
            stroke="var(--current-bg)"
            d="M0 0v24h24V0H0zm14.53 19.6c-.4.08-.53-.17-.53-.38V17c0-.75-.26-1.23-.55-1.48 1.78-.2 3.65-.87 3.65-3.95 0-.87-.3-1.58-.82-2.14.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82a7.57 7.57 0 00-4 0c-1.53-1.04-2.2-.82-2.2-.82a2.88 2.88 0 00-.08 2.12 3.09 3.09 0 00-.83 2.14c0 3.07 1.87 3.75 3.65 3.96-.23.2-.44.55-.5 1.07-.46.2-1.62.56-2.34-.67 0 0-.42-.77-1.22-.82 0 0-.78-.01-.06.48 0 0 .53.25.9 1.17 0 0 .46 1.43 2.68.95v1.49c0 .2-.13.46-.53.38A8 8 0 0112 4a8 8 0 018 8 8.03 8.03 0 01-5.47 7.6z"
          />
        </svg>
      </a>
      <a
        rel="noreferrer"
        target="_blank"
        href={DISCORD_SERVER_LINK}
        aria-label="Qbytic Discord"
        class="hoverable social-logo"
        tabindex={active ? 0 : -1}
      >
        <svg viewBox="0 0 245 240" fill="var(--current-color)" {...size}>
          <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zm36.5 0c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1zM189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6l-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8l-6.7 8.3c-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
        </svg>
      </a>
    </div>
  );
}
