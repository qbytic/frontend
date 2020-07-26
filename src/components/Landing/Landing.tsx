import {
  VNode,
  useState,
  useEffect,
  useCallback,
} from "@hydrophobefireman/ui-lib";
import { useInterval, useMount } from "../../customHooks";
import { Logo } from "../shared/Logo";
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
      <span class="landing-logo nexa fl-bold">Qbytic</span>
      {<span class="landing-logo nexa">|</span>}
      <div class="animating-text-wrap">
        {eventNames.map((x, i) => (
          <span class={cls + (i === index ? " anim-in" : "hide")}>{x}</span>
        ))}
      </div>
      <button onClick={skipIntro} class="hoverable skip-intro">
        Skip
      </button>
    </div>
  );
}
function scrollToTopIfNeeded(): void {
  window.scrollY && window.scroll({ top: 0, behavior: "smooth" });
}
function scroll150() {
  window.scroll({ top: window.scrollY + 100, behavior: "smooth" });
}
function MainLanding(): VNode {
  useMount(scrollToTopIfNeeded);
  return (
    <div>
      <div class="fade-in">
        <section class="logo-box">
          <Logo size={100} />
          <div class="landing-logo nexa fl-bold" style={{ fontSize: "5rem" }}>
            Qbytic
          </div>
          <div>
            <ActionButtons />
          </div>
        </section>
        <ChevronDown wrapperClass="chevr" onClick={scroll150} />
      </div>
      <LandingInfo />
    </div>
  );
}

function ActionButtons() {
  return;
}
