import {
  useState,
  VNode,
  useCallback,
  useMemo,
  JSXInternal,
  useEffect,
} from "@hydrophobefireman/ui-lib";
interface InputProps extends Omit<JSXInternal.HTMLAttributes, "onInput"> {
  id?: string;
  onInput(value: string): void;
  value?: string;
  wrapperClass?: string;
  labelText?: string;
  inputClass?: any;
  inputProps?: any;
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
        class={[
          "_animate",
          value || isFocused ? "moveup" : "movedown",
          errorText ? "error" : null,
        ]}
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
        class={["paper-input"].concat(inputClass)}
        ref={$ref}
        {...rest}
      />
    </div>
  );
}
