import { useObserver, Themes, updateTheme, useMount } from "../../customHooks";
import { useRef, useEffect, VNode } from "@hydrophobefireman/ui-lib";
import { DISCORD_SERVER_LINK } from "../../util/constants";
import { css } from "catom";
import * as styles from "../../styles";

export function LandingInfo(props: { scroll: boolean }): VNode {
  useMount(() => () => updateTheme("dark"));
  const divRef = useRef<HTMLDivElement>();
  useEffect(
    () =>
      props.scroll &&
      divRef.current &&
      divRef.current.scrollIntoView({ behavior: "smooth" }),
    [props.scroll]
  );
  return (
    <div ref={divRef}>
      <AboutQbytic changeTheme={updateTheme} />
      <EventDetails />
    </div>
  );
}
interface ThemeChangeProps {
  changeTheme(theme: Themes): void;
}

const landingSectionInfo = css({ padding: "2rem", textAlign: "left" });

const landingAnswer = css({ fontSize: "1.3rem" });
const headingCss = [styles.qBlue, styles.nexa, styles.bold, styles.heading];

function AboutQbytic(props: ThemeChangeProps): VNode {
  const ref = useRef<HTMLElement>();
  const obs = useObserver(ref, 0.5);
  useEffect(() => {
    props.changeTheme(obs ? "light" : "dark");
  }, [obs]);
  return (
    <section ref={ref} class={landingSectionInfo}>
      <div class={headingCss}>What is Qbytic</div>
      <div class={landingAnswer}>
        <div>
          Qbytic is a collection of events ranging from programming, gaming,
          hackathon to literature.
        </div>
        <div>
          You can play as an individual or bring an entire team or as we like to
          call it, a clan.
        </div>
        <div>
          {"The prizes are to be announced, be sure to join our "}
          <a
            class={[styles.hoverable, styles.qbyticLink, styles.bold]}
            title="Qbytic Discord"
            aria-label="Qbytic Discord"
            rel="noreferrer"
            target="_blank"
            href={DISCORD_SERVER_LINK}
          >
            Discord Server.
          </a>
        </div>
        <div>
          All the events have been planned to ensure maximum cross
          participation. You can compete in multiple events forming alliances
          with different clans. Check the leaderboard to find the clan you
          want... or create one!
        </div>
      </div>
    </section>
  );
}

function EventDetails(): VNode {
  return (
    <section
      class={landingSectionInfo}
      style={{ height: "500px", marginTop: "100px" }}
    >
      <div class={headingCss}>Event Details</div>
      <div class={landingAnswer}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci
          sem, laoreet dapibus ultricies sed, ultricies rutrum arcu. Proin
          gravida a quam eget aliquet. Praesent bibendum risus vel lectus tempor
          feugiat. Quisque eget ipsum et lectus convallis aliquam. Nam id tempor
          enim. Vestibulum vel sapien ut erat convallis tempor. Nam in pulvinar
          purus. Aenean mattis accumsan est id scelerisque. Praesent tincidunt
          eget nunc nec venenatis. Praesent iaculis in est at scelerisque. Donec
          consequat ultricies diam, ac accumsan lacus mollis a.
        </p>
      </div>
    </section>
  );
}
