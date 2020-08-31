import {
  useState,
  VNode,
  useCallback,
  useMemo,
  JSXInternal,
  useEffect,
} from "@hydrophobefireman/ui-lib";
import { css } from "catom";

const animateCSS = css({
  fontWeight: 700,
  textTransform: "uppercase",
  userSelect: "none",
  pointerEvents: "none",
  fontSize: "1.3rem",
  transition: "transform 0.2s linear",
  left: "12%",
  position: "absolute",
  top: "0",
  width: "fit-content",
  clipPath: "inset(0px 0px calc(1rem - 4px) 0px)",
});

const moveUp = css({
  background: "var(--current-bg)",
  transform: "translate(0, -48%)",
  color: "var(--qbytic-blue)",
});
const moveDown = css({ background: "transparent" });

const paperInput = css({
  display: "block",
  width: "80%",
  fontSize: "1.2rem",
  padding: "5px",
  outline: "0",
  height: "30px",
  transition: "0.1s cubic-bezier(0.46, 1, 0.74, 1.07)",
  fontWeight: 700,
  margin: "auto",
  color: "var(--current-color)",
  textAlign: "left",
});

const errorCss = css({ color: "red !important" });

const wrapperCSS = css({ position: "relative" });

interface InputProps extends Omit<JSXInternal.HTMLAttributes, "onInput"> {
  id?: string;
  onInput(value: string): void;
  value?: string;
  wrapperClass?: string;
  labelText?: string;
  inputClass?: string | string[];
  inputProps?: JSXInternal.HTMLAttributes;
  errorText?: string;
  $ref?: { current: HTMLElement };
}

export function AnimatedInput(props: InputProps): VNode {
  const randomId = useMemo(() => Math.random().toString(36).substr(2), []);

  const {
    id = randomId,
    onInput: propOnInput,
    wrapperClass,
    labelText,
    inputClass,
    errorText,
    $ref,
    ...rest
  } = props;

  const [isFocused, setFocused] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);

  useEffect(() => setValue(props.value), [props.value]);

  function handleInput(e: InputEvent): void {
    const val = (e.target as HTMLInputElement).value;
    setValue(val);
    propOnInput && propOnInput(val);
  }
  const onInput = useCallback(handleInput, [propOnInput]);
  const active = value || isFocused;
  return (
    <div class={[wrapperCSS].concat(wrapperClass)}>
      <label
        class={[animateCSS].concat(active || errorText ? moveUp : moveDown, [
          errorText ? errorCss : null,
        ])}
        for={id}
      >
        {errorText || labelText}
      </label>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        id={id}
        value={value}
        data-active={active}
        data-error={!!errorText}
        class={[paperInput].concat(inputClass)}
        ref={$ref}
        {...rest}
      />
    </div>
  );
}
