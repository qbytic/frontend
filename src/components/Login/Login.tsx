import * as store from "../../globalStore";
import * as validators from "../../util/validators";

import {
  VNode,
  redirect,
  useCallback,
  useEffect,
  useState,
} from "@hydrophobefireman/ui-lib";
import { useAuthenticationState, useInputFocus } from "../../customHooks";

import { AnimatedInput } from "../shared/AnimatedInput";
import { Popup } from "../shared/Popup";
import { auth } from "../../http/auth";
import * as styles from "../../styles";
export default function Login(): VNode {
  const authState = useAuthenticationState();
  useEffect(() => authState && authState.user && redirect("/dashboard"), [
    authState,
  ]);
  const [isLoading, setLoading] = useState(null);

  const [loginError, setError] = useState<string>(null);
  const authenticate = useCallback(
    async (user: string, password: string): Promise<void> => {
      if (isLoading) return;
      setLoading(true);
      const req = auth.login(user, password);
      const response = await req.json;
      setLoading(false);
      const data = response.data;
      const error = response.error;
      if (error) return setError(error);
      store.updateStore("authData", data.user_data);
    },
    [isLoading]
  );
  const closePopup = useCallback(() => setError(null), []);
  return (
    <section class="login">
      {loginError && (
        <Popup
          title="Could not log in"
          text={loginError}
          onClose={closePopup}
        />
      )}
      <div
        class={[
          styles.heading,
          styles.bold,
          styles.nexa,
          styles.upper,
          styles.mHeading,
        ]}
      >
        Login
      </div>
      <LoginInputRenderer login={authenticate} focus={!loginError} />
      {isLoading && <div>Connecting to the server</div>}
    </section>
  );
}
interface InputRendererProps {
  login(user: string, password: string): void;
  focus: boolean;
}
function LoginInputRenderer(props: InputRendererProps) {
  const inputRef = useInputFocus(props.focus);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState<string>(null);
  const [passwordError, setPassError] = useState<string>(null);
  const [isFormValid, setFormValid] = useState(true);

  const onUserInput = useCallback((e: string) => {
    setUsername(e);
    setFormValid(true);
  }, []);
  const onPasswordInput = useCallback((e: string) => {
    setPassword(e);
    setFormValid(true);
  }, []);

  const onSubmit = useCallback(() => {
    const [userIsValid, userErrorText] = validators.validateUsername(username);
    const [passwordIsValid, passwordErrorText] = validators.validatePassword(
      password
    );

    [
      [userIsValid, userErrorText, setUserError, userError],
      [passwordIsValid, passwordErrorText, setPassError, passwordError],
    ].forEach(([isValid, errorText, setError, currentError]) => {
      if (!isValid) {
        (setError as any)(errorText);
      } else if (currentError) {
        (setError as any)(null);
      }
    });
    const valid = userIsValid && passwordIsValid;
    setFormValid(valid);
    if (!valid) return;
    props.login(username, password);
  }, [username, password, props.login]);

  return (
    <form action="javascript:" onSubmit={onSubmit}>
      <AnimatedInput
        wrapperClass={styles.formInpWrapper}
        onInput={onUserInput}
        labelText="Username"
        inputClass={styles.formInp}
        aria-label="username"
        spellcheck={false}
        $ref={inputRef}
        errorText={isFormValid ? null : userError}
      />
      <AnimatedInput
        wrapperClass={styles.formInpWrapper}
        onInput={onPasswordInput}
        labelText="Password"
        inputClass={styles.formInp}
        aria-label="Password"
        errorText={isFormValid ? null : passwordError}
        type="password"
      />
      <button class={[styles.hoverable, styles.actionBtn]}>Log In</button>
    </form>
  );
}
