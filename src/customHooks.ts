import {
  useMemo,
  loadURL,
  RouterSubscription,
  useEffect,
  useState,
  useRef,
  useCallback,
  Router,
} from "@hydrophobefireman/ui-lib";
import { auth, UserData, ClanData } from "./http/auth";
import * as store from "./globalStore";

type QueryParams =
  | string[][]
  | Record<string, string>
  | string
  | URLSearchParams;

interface QueryStringHook {
  (): [URLSearchParams, (queryString: QueryParams) => void];
}

export function useMount<T extends Array<any>>(fn: (...args: T) => void): void {
  return useEffect(fn, []);
}

export const useQueryString: QueryStringHook = () =>
  useMemo(() => {
    const pathname = location.pathname;
    return [
      new URLSearchParams(location.search),
      (queryString: QueryParams): void =>
        loadURL(`${pathname}?${new URLSearchParams(queryString).toString()}`),
    ];
  }, [location.search]);

/**
 * This hook might look useless at first but the important thing that this does is
 * re render the component on any route state change
 * this can be used by our header components
 * that normally live outside of a <Router/>
 */
const getPath = () => Router.path;
export const useLocation = (): string => {
  const [loc, setLoc] = useState(getPath);

  useMount(() => {
    const current = () => setLoc(getPath);
    RouterSubscription.subscribe(current);
    return () => RouterSubscription.unsubscribe(current);
  });
  return loc;
};
interface CB {
  (...a: unknown[]): unknown;
}
export function useInterval(callback: CB, delay?: number) {
  const savedCallback = useRef<CB>();
  savedCallback.current = callback;
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useAuthenticationState() {
  const [authState, setAuth] = useState<UserData>(
    () => store.data.get("authData") as UserData
  );
  useMount(() => {
    const cb = (data: UserData) => setAuth(data);
    store.subscribe("authData", cb);
    return () => store.unsubscribe("authData", cb);
  });
  return authState;
}

// export function useClanDataState(event: store.Events) {
//   const [clanData, setClanData] = useState<ClanData>(() =>
//     auth.clanData.get(event)
//   );
//   useMount(() => {
//     const cb = (data: ClanData) => setClanData(data);
//     auth.addClanDataSubscription(event, cb);
//     return () => auth.removeClanStateSubscription(event, cb);
//   });
//   return clanData;
// }
const getDimensions = () => [window.innerHeight, window.innerWidth];
export function useViewportSize() {
  const [dimensions, setDimensions] = useState(getDimensions);

  useMount(() => {
    const callback = () => setDimensions(getDimensions);
    addEventListener("resize", callback);
    return () => removeEventListener("resize", callback);
  });

  return dimensions;
}

export function useObserver(
  nodeRef: { current: HTMLElement },
  threshold: number = 0.5
): boolean {
  const [intersecting, setIntersecting] = useState(false);
  const callback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) =>
      entries.some((entry) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          return true;
        }
      }) || setIntersecting(false)
  );
  useEffect(() => {
    if (!nodeRef.current) return;
    const observer = new IntersectionObserver(callback, { threshold });
    observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [threshold, nodeRef.current]);

  return intersecting;
}

export function useTitle(title: string) {
  return useMount(() => void (document.title = title));
}
export type Themes = "dark" | "light";
export function useTheme(
  $theme: Themes
): [Themes, (arg: Themes | ((old: Themes) => Themes)) => void] {
  const [theme, setTheme] = useState($theme);
  useEffect(() => {
    updateTheme(theme);
  }, [theme]);
  return [theme, setTheme];
}
export function updateTheme(theme: Themes) {
  const classList = document.body.classList;
  const other = theme === "dark" ? "light" : "dark";
  classList.remove(other);
  classList.add(theme);
}

export function useGlobalState<T>(conf: store.ConfigTypes): T {
  const [value, setValue] = useState(() => store.data.get(conf) as T);
  useEffect(() => {
    const listener = (nv: T) => setValue(nv);
    store.subscribe(conf, listener);
    const newVal = store.data.get(conf);
    newVal != value && setValue(newVal as T);
    return () => store.unsubscribe(conf, listener);
  }, [conf]);
  return value;
}

export function useKeyPress(key: string, onKeyPress: EventListener): void {
  useEffect(() => {
    if (!key) return;
    const keyDownListener = (e: KeyboardEvent) =>
      e.key === key && onKeyPress(e);

    window.addEventListener("keydown", keyDownListener);

    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [key, onKeyPress]);
}

export function useInputFocus(
  props$focus: boolean
): { current: HTMLInputElement } {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => props$focus && inputRef.current && inputRef.current.focus(), [
    props$focus,
  ]);
  return inputRef;
}
