import {
  useRef,
  useEffect,
  VNode,
  useCallback,
} from "@hydrophobefireman/ui-lib";
import { useKeyPress } from "../../customHooks";
import * as styles from "../../styles";
import { css } from "catom";

// const appPopupTitle = css({
//   marginTop: "10px",
//   borderBottom: "2px solid var(--current-color)",
//   fontSize: "1.5rem",
//   color: "var(--qbytic-blue)",
// });

const appPopopClose = css({
  border: "none",
  fontWeight: "bold",
  color: "var(--qbytic-blue)",
  cursor: "pointer",
  outline: "none",
});

const modalPopup = css({
  width: "90%",
  position: "fixed",
  bottom: "10px",
  left: "0",
  right: "0",
  margin: "auto",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  background: "#000",
  fontSize: "1.2rem",
  zIndex: 100,
  transition: "0.35s linear",

  color: "#fff",
  media: {
    "only screen and (min-width:850px)": { width: "50%" },
  },
});

const modalInactive = css({
  transform: "translateY(35vh)",
  pointerEvents: "none",
});
interface PopupProps {
  text: string | VNode;
  onClose(e?: MouseEvent): void;
}
export function SnackBar(props: PopupProps) {
  const { onClose, text } = props;
  const buttonRef = useRef<HTMLButtonElement>();
  useKeyPress("Escape", onClose);
  useEffect(() => buttonRef.current && buttonRef.current.focus(), []);
  const currentTargetOnly = useCallback(
    (e: MouseEvent) => {
      const { target, currentTarget } = e;
      if (target !== currentTarget) return;
      return onClose(e);
    },
    [onClose]
  );
  const active = !!text;
  return (
    <>
      {active && (
        <div
          class={styles.mask}
          style={{ opacity: 0.5 }}
          onClick={currentTargetOnly}
        ></div>
      )}
      <section
        class={[modalPopup, active ? "" : modalInactive]}
        data-open={`${active}`}
      >
        <span>{text}</span>
        <button
          ref={buttonRef}
          class={[appPopopClose, styles.hoverable]}
          onClick={onClose}
        >
          OK
        </button>
      </section>
    </>
  );
}
