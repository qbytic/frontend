import { useRef, useEffect, VNode } from "@hydrophobefireman/ui-lib";
import { useKeyPress } from "../../customHooks";
import * as styles from "../../styles";
import { css } from "catom";
const appPopupTitle = css({
  marginTop: "10px",
  borderBottom: "2px solid var(--current-color)",
  fontSize: "1.5rem",
  color: "var(--qbytic-blue)",
});

const appPopopClose = css({
  display: "block",
  bottom: "0",
  zIndex: 100,
  textAlign: "center",
  left: "0",
  right: "0",
  border: "1px solid var(--current-color)",
  margin: "auto auto 10px",
  borderRadius: "5px",
  cursor: "pointer",
  width: "50%",
  color: "var(--current-color)",
  padding: "5px",
});

const modalPopup = css({
  width: "40vw",
  border: "2px solid var(--current-color)",
  margin: "auto",
  left: "0",
  right: "0",
  top: "0",
  transform: "scale(0.01)",
  bottom: "0",
  borderRadius: "16px",
  textAlign: "center",
  overflow: "auto",
  zIndex: 25,
  background: "var(--current-bg)",
  WebkitAnimation: "scale_anim 0.2s linear",
  animation: "scale_anim 0.2s linear",
  WebkitAnimationFillMode: "forwards",
  animationFillMode: "forwards",
});

interface PopupProps {
  title: string;
  text: string | VNode;
  onClose(): void;
}
export function Popup(props: PopupProps) {
  const buttonRef = useRef<HTMLButtonElement>();
  useKeyPress("Escape", props.onClose);
  useEffect(() => buttonRef.current && buttonRef.current.focus(), []);
  return (
    <div class={styles.mask} onClick={props.onClose}>
      <section class={modalPopup} onClick={stopPropagation}>
        <div class={[styles.heading, styles.qBlue, appPopupTitle]}>
          {props.title}
        </div>
        <div class="err-reasons">
          <div>{props.text}</div>
        </div>
        <button
          ref={buttonRef}
          class={`${appPopopClose} hoverable`}
          onClick={props.onClose}
        >
          OK
        </button>
      </section>
    </div>
  );
}

function stopPropagation(e: MouseEvent): void {
  return e.stopPropagation();
}
