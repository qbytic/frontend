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
  const cls = "landing-logo nexa fl-bold q-blue logo-anim ";
  const [index, setIndex] = useState(0);
  const stopAnim = index >= eventNames.length;
  useInterval(() => setIndex((i: number) => i + 1), stopAnim ? null : 600);
  const skipIntro = useCallback(() => setIndex(eventNames.length), []);
  useEffect(() => stopAnim && store.updateStore("showHeader", true), [
    stopAnim,
  ]);

  if (stopAnim) return <MainLanding />;
  return (
    <div class="landing-logo-anim-wrapper">
      <span class="landing-logo nexa fl-bold" style={{ marginLeft: "20px" }}>
        Qbytic
      </span>
      {<span class="landing-logo nexa">|</span>}
      <div class="animating-text-wrap">
        {eventNames.map((x, i) => (
          <span class={cls + (i === index ? " anim-in" : "hide")}>{x}</span>
        ))}
      </div>
      <span onClick={skipIntro} class="hoverable skip-intro">
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
      <div class="fade-in">
        <section class="logo-box">
          <Logo size={150} />
          <div class="landing-logo nexa fl-bold" style={{ fontSize: "8rem" }}>
            Qbytic
          </div>
          <div>
            <ActionButtons />
          </div>
        </section>
        <ChevronDown wrapperClass="chevr" onClick={scrollLanding} />
      </div>
      <LandingInfo scroll={scrollIntoView} />
    </div>
  );
}

function ActionButtons() {
  return;
}
