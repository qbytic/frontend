interface ChevronProps {
  width?: number;
  height?: number;
  color?: string;
  class?: string;
  wrapperClass?: string;
  onClick: EventListener;
}
export function ChevronDown(props: ChevronProps) {
  return (
    <div class={props.wrapperClass}>
      <svg
        onClick={props.onClick}
        class={props.class}
        width={props.width || 72}
        height={props.height || 72}
        viewBox="0 0 24 24"
        stroke-width=".5"
        stroke={props.color || "var(--current-color)"}
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M7 7l5 5 5-5M7 13l5 5 5-5" />
      </svg>
    </div>
  );
}
