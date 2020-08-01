import { useObserver, Themes, updateTheme, useMount } from "../../customHooks";
import { useRef, useEffect, VNode } from "@hydrophobefireman/ui-lib";

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
    <div class="landing__info" ref={divRef}>
      <AboutQbytic changeTheme={updateTheme} />
      <EventDetails changeTheme={updateTheme} />
    </div>
  );
}
interface ThemeChangeProps {
  changeTheme(theme: Themes): void;
}

function AboutQbytic(props: ThemeChangeProps): VNode {
  const ref = useRef<HTMLElement>();
  const obs = useObserver(ref, 0.5);
  useEffect(() => {
    props.changeTheme(obs ? "light" : "dark");
  }, [obs]);
  return (
    <section ref={ref} class="landing_section_info">
      <div class="q-blue nexa bold heading">What is Qbytic</div>
      <div class="landing-answer">
        <p>
          Qbytic is a collection of events ranging from programming, gaming,
          hackathon to literature.
        </p>
        <p>
          You can play as an individual or bring an entire team or as we like to
          call it, a clan.
        </p>
      </div>
    </section>
  );
}

function EventDetails(props: ThemeChangeProps): VNode {
  return (
    <section
      class="landing_section_info"
      style={{ height: "500px", marginTop: "100px" }}
    >
      <div class="q-blue nexa bold heading">Event Details Here</div>
      <div class="landing-answer">
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
