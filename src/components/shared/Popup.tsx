import { useRef, useEffect, VNode } from "@hydrophobefireman/ui-lib";

interface PopupProps {
  title: string;
  text: string | VNode;
  onClose(): void;
}
export function Popup(props: PopupProps) {
  const buttonRef = useRef<HTMLButtonElement>();
  useEffect(() => buttonRef.current && buttonRef.current.focus(), []);
  return (
    <div class="mask" onClick={props.onClose}>
      <section class="modal-popup" onClick={stopPropagation}>
        <div class="heading qbytic-blue app-popup-title">{props.title}</div>
        <div class="err-reasons">
          <div>{props.text}</div>
        </div>
        <button
          ref={buttonRef}
          class="app-popup-close hoverable"
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
