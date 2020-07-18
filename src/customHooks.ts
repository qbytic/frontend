import {
  useMemo,
  loadURL,
  RouterSubscription,
  useEffect,
  useState,
  useRef,
} from "@hydrophobefireman/ui-lib";
import { auth, UserData, ClanData, Events } from "./http/auth";

type QueryParams =
  | string[][]
  | Record<string, string>
  | string
  | URLSearchParams;

interface QueryStringHook {
  (): [URLSearchParams, (queryString: QueryParams) => void];
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
export const useCurrentLocation = (): Location => {
  const [loc, setLoc] = useState(location);
  const ref = useRef<() => void>();
  useEffect(() => {
    ref.current = () => setLoc(location);
    RouterSubscription.subscribe(ref.current);
    return () => RouterSubscription.unsubscribe(ref.current);
  }, []);
  return loc;
};
interface CB {
  (...a: unknown[]): unknown;
}
export function useInterval(callback: CB, delay?: number) {
  const savedCallback = useRef<CB>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useAuthenticationState() {
  const [authState, setAuth] = useState<UserData>(auth.userData);
  useEffect(() => {
    const cb = (data: UserData) => setAuth(data);
    auth.addAuthStateSubscription(cb);
    return () => auth.removeAuthStateSubscription(cb);
  }, []);
  return authState;
}

export function useClanDataState(event: Events) {
  const [clanData, setClanData] = useState<ClanData>(() =>
    auth.clanData.get(event)
  );
  useEffect(() => {
    const cb = (data: ClanData) => setClanData(data);
    auth.addClanDataSubscription(event, cb);
    return () => auth.removeClanStateSubscription(event, cb);
  }, []);
  return clanData;
}

export function useViewportSize() {
  const [innerHeight, setInnerHeight] = useState(() => window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const callback = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };
    addEventListener("resize", callback);
    return () => removeEventListener("resize", callback);
  }, []);

  return [innerHeight, innerWidth];
}
