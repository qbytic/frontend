import {
  VNode,
  useState,
  useCallback,
  redirect,
} from "@hydrophobefireman/ui-lib";
import { Popup } from "../shared/Popup";
import { useInputFocus } from "../../customHooks";
import * as validators from "../../util/validators";
import { AnimatedInput } from "../shared/AnimatedInput";
import * as requests from "../../http/requests";
import { userRoutes } from "../../util/api_routes";
import * as styles from "../../styles";
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
      {registerError && (
        <Popup
          title="Could not log in"
          text={registerError}
          onClose={closePopup}
        />
      )}
      <div class="heading nexa bold upper m-heading">Register</div>
      <RegisterInputRenderer focus={!registerError} register={registerUser} />
      {isLoading && <div>Connecting to the server</div>}
    </section>
  );
}

interface RegRendererProps {
  register(user: string, password: string, email: string, name: string): void;
  focus: boolean;
}
function RegisterInputRenderer(props: RegRendererProps) {
  const inputRef = useInputFocus(props.focus);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [userError, setUserError] = useState<string>(null);
  const [nameError, setNameError] = useState<string>(null);
  const [emailError, setEmailError] = useState<string>(null);
  const [passwordError, setPasswordError] = useState<string>(null);

  const [isFormValid, setFormValid] = useState(true);

  const onUserInput = useCallback((e: string) => {
    setUser(e);
    setFormValid(true);
  }, []);

  const onNameInput = useCallback((e: string) => {
    setName(e);
    setFormValid(true);
  }, []);

  const onEmailInput = useCallback((e: string) => {
    setEmail(e);
    setFormValid(true);
  }, []);

  const onPasswordInput = useCallback((e: string) => {
    setPw(e);
    setFormValid(true);
  });

  const onSubmit = useCallback(() => {
    const [userIsValid, userErrorText] = validators.validateUsername(user);
    const [passwordIsValid, passwordErrorText] = validators.validatePassword(
      pw
    );
    const [emailIsValid, emailErrorText] = validators.validateEmail(email);
    const [nameIsValid, nameErrorText] = validators.validateName(name);
    [
      [userIsValid, userErrorText, setUserError, userError],
      [passwordIsValid, passwordErrorText, setPasswordError, passwordError],
      [emailIsValid, emailErrorText, setEmailError, emailError],
      [nameIsValid, nameErrorText, setNameError, nameError],
    ].forEach(([isValid, errorText, setError, currentError]) => {
      if (!isValid) {
        (setError as any)(errorText);
      } else if (currentError) {
        (setError as any)(null);
      }
    });
    const valid = userIsValid && passwordIsValid && emailIsValid && nameIsValid;
    setFormValid(valid);
    if (!valid) return;
    props.register(user, pw, email, name);
  }, [user, pw, email, name, props.register]);

  return (
    <form action="javascript:" onSubmit={onSubmit}>
      <AnimatedInput
        wrapperClass="form-inp-wrapper"
        onInput={onUserInput}
        labelText="Username"
        inputClass="form-inp"
        aria-label="username"
        spellcheck={false}
        $ref={inputRef}
        errorText={isFormValid ? null : userError}
      />
      <AnimatedInput
        wrapperClass="form-inp-wrapper"
        onInput={onNameInput}
        labelText="Name"
        inputClass="form-inp"
        aria-label="name"
        spellcheck={false}
        errorText={isFormValid ? null : nameError}
      />
      <AnimatedInput
        wrapperClass="form-inp-wrapper"
        onInput={onEmailInput}
        labelText="email"
        inputClass="form-inp"
        aria-label="email"
        spellcheck={false}
        type="email"
        errorText={isFormValid ? null : emailError}
      />
      <AnimatedInput
        wrapperClass="form-inp-wrapper"
        onInput={onPasswordInput}
        labelText="Password"
        inputClass="form-inp"
        aria-label="Password"
        errorText={isFormValid ? null : passwordError}
        type="password"
      />
      <button class={[styles.hoverable, styles.actionBtn]}>Log In</button>
    </form>
  );
}
