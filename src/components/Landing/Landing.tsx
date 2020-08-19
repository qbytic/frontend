import {
  VNode,
  useState,
  useEffect,
  useCallback,
} from "@hydrophobefireman/ui-lib";
import { useInterval, useMount } from "../../customHooks";
import { Logo, SkipLogo } from "../shared/Logo";
import * as store from "../../globalStore";
import { ChevronDown } from "../shared/ChevronDown";
import { LandingInfo } from "./LandingInfo";
import * as styles from "../../styles";
import { css } from "catom";

const landingLogo = css({
  transition: "0.3s linear",
  fontSize: "6rem",
  media: {
    "only screen and (max-width: 1100px)": { fontSize: " 3.5rem" },
    "only screen and (max-width: 600px)": {
      fontSize: "2.3rem",
    },
    "only screen and (max-width: 400px)": {
      fontSize: "1.2rem",
    },
  } as any,
});

const animatingTextWrap = css({
  display: "inline-flex",
  flexDirection: "column",
});

const landingLogoAnimWrapper = css({
  userSelect: "none",
  display: "flex",
  position: "fixed",
  height: "100%",
  width: "100%",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "left",
  top: "0",
  padding: "2rem",
});

const skipIntroCSS = css({
  bottom: "0",
  position: "fixed",
  right: "0",
  margin: "1rem",
  padding: "8px",
  textAlign: "right",
});
const logoBox = css({ marginTop: "20vh" });

const chevr = css({
  position: "relative",
  display: "block",
  marginBottom: "40vh",
  transform: "translateY(10vh)",
  cursor: "pointer",
});

const animIn = css({ animation: "anim-in 0.1s linear" });

const logoAnim = css({
  animationFillMode: "forwards",
  transition: "0.3s linear",
});

const flBold = css({
  pseudo: {
    "::first-letter": {
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  },
});

export default function Landing(): VNode {
  const eventNames = [
    "flikkx",
    "anthem",
    "deliniate",
    "neoteric",
    "pentesting",
    "cryptichunt",
    "hackathon",
    "Get Ready",
  ];
  const cls = [styles.qBlue, styles.nexa, logoAnim, landingLogo, flBold].join(
    " "
  );
  const [index, setIndex] = useState(0);
  const stopAnim = index >= eventNames.length;
  useInterval(() => setIndex((i: number) => i + 1), stopAnim ? null : 600);
  const skipIntro = useCallback(() => setIndex(eventNames.length), []);
  useEffect(() => stopAnim && store.updateStore("showHeader", true), [
    stopAnim,
  ]);

  if (stopAnim) return <MainLanding />;
  return (
    <div class={landingLogoAnimWrapper}>
      <span
        class={[styles.nexa, landingLogo, flBold]}
        style={{ marginLeft: "20px" }}
      >
        Qbytic
      </span>
      {<span class={[styles.nexa, landingLogo]}>|</span>}
      <div class={animatingTextWrap}>
        {eventNames.map((x, i) => (
          <span class={`${cls} ${i === index ? animIn : styles.hide}`}>
            {x}
          </span>
        ))}
      </div>
      <span onClick={skipIntro} class={[skipIntroCSS, styles.hoverable]}>
        <SkipLogo size={10} />
      </span>
    </div>
  );
}
function scrollToTopIfNeeded(): void {
  window.scrollY && window.scroll({ top: 0, behavior: "smooth" });
}

function MainLanding(): VNode {
  useMount(scrollToTopIfNeeded);
  const [scrollIntoView, setScrollIntoView] = useState(null);
  // use an object here instead of a boolean as we get a new value on every click
  // causing the useEffect hook to run
  const scrollLanding = useCallback(() => setScrollIntoView({}), []);
  return (
    <div>
      <div class={styles.fadeIn}>
        <section class={logoBox}>
          <Logo size={150} />
          <div
            class={`${landingLogo} ${flBold} ${styles.nexa}`}
            style={{ fontSize: "8rem" }}
          >
            Qbytic
          </div>
          <div>
            <ActionButtons />
          </div>
        </section>
        <ChevronDown wrapperClass={chevr} onClick={scrollLanding} />
      </div>
      <LandingInfo scroll={scrollIntoView} />
    </div>
  );
}

function ActionButtons() {
  return;
}
