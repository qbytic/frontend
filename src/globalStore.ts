import FakeMap from "@hydrophobefireman/j-utils/@build-modern/src/modules/es6/loose/Map/index";
import FakeSet from "@hydrophobefireman/j-utils/@build-modern/src/modules/es6/loose/Set/index";

export type Events =
  | "gaming"
  | "prog"
  | "pentest"
  | "lit"
  | "music"
  | "video"
  | "minihalo";

export type Listener = (newValue: unknown) => void;

export type ConfigTypes = "showHeader" | "theme" | "authData" | Events;

export const data = new FakeMap<ConfigTypes, unknown>();

const subscribers = new FakeMap<ConfigTypes, FakeSet<Listener>>();

export function subscribe(conf: ConfigTypes, listener: Listener) {
  let subs = subscribers.get(conf);
  if (subs) {
    subs.add(listener);
  } else {
    subscribers.set(conf, new FakeSet([listener]));
  }
}

export function unsubscribe(conf: ConfigTypes, listener: Listener) {
  const subs = subscribers.get(conf);
  return subs.delete(listener);
}

export function updateStore<T>(conf: ConfigTypes, value: T) {
  data.set(conf, value);
  const subs = subscribers.get(conf);
  subs && subs.forEach((listener) => listener(value));
}
