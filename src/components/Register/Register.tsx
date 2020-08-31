import {
  VNode,
  useState,
  useCallback,
  redirect,
  JSXInternal,
} from "@hydrophobefireman/ui-lib";
import { SnackBar } from "../shared/Popup";
import { useInputFocus, useErrorRef } from "../../customHooks";
import * as validators from "../../util/validators";
import { AnimatedInput } from "../shared/AnimatedInput";
import * as requests from "../../http/requests";
import { userRoutes } from "../../util/api_routes";
import * as styles from "../../styles";
import { css } from "catom";
import { Logo } from "../shared/Logo";

export default function Register(): VNode {
  const [registerError, setRegisterError] = useState<string>(null);

  const [isLoading, setLoading] = useState(null);
  const registerUser = useCallback(
    async (user: string, password: string, email: string, name: string) => {
      if (isLoading) return;
      setLoading(true);
      const req = await requests.postJSON(userRoutes.register, {
        user,
        password,
        email,
        name,
      }).json;
      setLoading(false);
      const data = req.data;
      const error = req.error;
      if (error) return setRegisterError(error);
      if (data) return redirect("/login");
    },
    []
  );

  const closePopup = useCallback(() => setRegisterError(null), []);

  return (
    <section class="register">
      <div
        class={[
          styles.heading,
          styles.nexa,
          styles.bold,
          styles.upper,
          styles.mHeading,
        ]}
      >
        Register
      </div>
      {/* <div class={grayscaleLogo}>
        <Logo size={"100%"} />
      </div> */}
      <RegisterInputRenderer focus={!registerError} register={registerUser} />
      {isLoading && <div>Connecting to the server</div>}
      <SnackBar text={registerError} onClose={closePopup} />
    </section>
  );
}

interface RegRendererProps {
  register(
    user: string,
    password: string,
    email: string,
    name: string
  ): Promise<void>;
  focus: boolean;
}
function RegisterInputRenderer(props: RegRendererProps) {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const userError = useErrorRef(validators.BLANK_ERROR_USERNAME);
  const nameError = useErrorRef(validators.BLANK_ERROR_NAME);
  const emailError = useErrorRef(validators.BLANK_ERROR_EMAIL);
  const passwordError = useErrorRef(validators.BLANK_ERROR_PASSWORD);

  const [isValid, setValid] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(() => {
    if (isSubmitting || !isValid) return;

    setSubmitting(true);
    const isAnyInvalid = [userError, nameError, emailError, passwordError].some(
      (x) => !!x.current
    );
    if (isAnyInvalid) {
      setSubmitting(false);
      return setValid(false);
    }
    props.register(user, pw, email, name).then(() => setSubmitting(false));
  }, [user, name, email, pw]);

  return (
    <form action="javascript:" onSubmit={onSubmit}>
      <InputWrapper
        label="Username"
        validate={validators.validateUsername}
        localErrorState={userError}
        setValue={setUser}
        setFormValidState={setValid}
        formValidState={isValid}
        $ref={useInputFocus(props.focus)}
        // minLength={validators.MIN_LENGTH}
        pattern="\w+"
        title="Letters, numbers and underscore ( _ )"
        //required
      />
      <InputWrapper
        label="Name"
        validate={validators.validateName}
        localErrorState={nameError}
        setValue={setName}
        setFormValidState={setValid}
        formValidState={isValid}
        // minLength={validators.MIN_LENGTH}
        //required
      />
      <InputWrapper
        label="Email"
        validate={validators.validateEmail}
        localErrorState={emailError}
        setValue={setEmail}
        setFormValidState={setValid}
        formValidState={isValid}
        type="email"
        //required
      />
      <InputWrapper
        label="Password"
        validate={validators.validatePassword}
        localErrorState={passwordError}
        setValue={setPw}
        setFormValidState={setValid}
        formValidState={isValid}
        type="password"
        // minLength={validators.MIN_LENGTH}
        //required
      />
      <button class={[styles.hoverable, styles.actionBtn]}>Log In</button>
    </form>
  );
}

interface WrapperInputProps
  extends Omit<JSXInternal.HTMLAttributes, "onInput" | "value"> {
  label: string;
  validate(value: string): validators.ValidationResponse;
  localErrorState: { current: string };
  setValue(value: string): void;
  formValidState: boolean;
  setFormValidState(value: boolean): void;
  type?: string;
  $ref?: { current: HTMLElement };
}
function InputWrapper(props: WrapperInputProps) {
  const {
    label,
    validate,
    type,
    $ref,
    setFormValidState,
    localErrorState,
    formValidState,
    setValue,
    ...rest
  } = props;
  const currError = localErrorState.current;
  const onInput = useCallback(
    (e: string) => {
      const [isValid, errorText] = validate(e);
      localErrorState.current = isValid ? null : errorText;
      setValue(e);
      setFormValidState(true);
    },
    [setFormValidState, localErrorState, validate]
  );

  return (
    <AnimatedInput
      wrapperClass={styles.formInpWrapper}
      inputClass={styles.formInp}
      onInput={onInput}
      labelText={label}
      aria-label={label}
      type={type || "text"}
      $ref={$ref}
      errorText={!formValidState && currError}
      data-local-error-state={currError}
      name={label.toLowerCase()}
      {...rest}
    />
  );
}
