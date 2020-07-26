import { useState, useCallback, A, useEffect } from "@hydrophobefireman/ui-lib";
import {
  useAuthenticationState,
  useLocation,
  useKeyPress,
  useViewportSize,
} from "../../customHooks";
import { Logo } from "../shared/Logo";

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
    <button class="hoverable menubtn" onClick={props.onClick} tabindex={0}>
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
      <div class={"link-wrapper" + (props.active ? " " : " out")}>
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
      </div>
    </>
  );
}
