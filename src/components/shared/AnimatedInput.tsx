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
  margin: "auto",
  textAlign: "left",
  fontWeight: 700,
  textTransform: "uppercase",
  width: "auto;width:fit-content;",
  paddingLeft: "4px",
  paddingRight: "4px",
  display: "inline-flex",
  flexWrap: "wrap",
  userSelect: "none",
  transform: "var(--translate-normal-pos)",
  pointerEvents: "none",
  fontSize: "1.3rem",
  transition: "0.3s linear",
});

const moveUp = css({
  animation: "moveUp 0.1s linear 0s 1  normal  forwards",
  animationIterationCount: "1",
  transformOrigin: "50% 50%",
});

const moveDown = css({
  animation: "moveDown 0.1s linear 0s 1  normal  forwards",
  animationIterationCount: "1",
  transformOrigin: "50% 50%",
});

const paperInput = css({
  display: "block",
  width: "80%",
  fontSize: "1.2rem",
  padding: "5px",
  outline: "0",
  height: "30px",
  transition: "0.1s cubic-bezier(0.46, 1, 0.74, 1.07)",
  color: "var(--input-color)",
  fontWeight: 700,
  margin: "auto",
  textAlign: "left",
});

const errorCss = css({ color: "red !important" });

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
  const randomId = useMemo(() => "" + Math.random(), []);

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

  return (
    <div class={["inp_wrapper"].concat(wrapperClass)}>
      <label
        class={[animateCSS].concat(
          value || isFocused || errorText ? moveUp : moveDown,
          [errorText ? errorCss : null]
        )}
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
        class={[paperInput].concat(inputClass)}
        ref={$ref}
        {...rest}
      />
    </div>
  );
}
