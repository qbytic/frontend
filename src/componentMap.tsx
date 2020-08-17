import {
  AsyncComponent,
  Router,
  createRoutePath,
  Path,
  VNode,
  ComponentType,
  redirect,
} from "@hydrophobefireman/ui-lib";

import entries from "@hydrophobefireman/j-utils/@build-modern/src/modules/Object/entries";
import { useGlobalState } from "./customHooks";
import { Header } from "./components/Header/Header";
import { auth } from "./http/auth";

interface Mod<T> {
  default: T;
}

const routeMap: Record<string, () => Promise<ComponentType>> = {};

function addRoute(route: string, component: () => Promise<ComponentType>) {
  routeMap[route] = component;
}

const getDefault: <T>(mod: Mod<T>) => Mod<T>["default"] = (mod) => mod.default;

addRoute("/", () => import("./components/Landing/Landing").then(getDefault)) ;
addRoute("/login", () => import("./components/Login/Login").then(getDefault));
addRoute("/register", () =>
  import("./components/Register/Register").then(getDefault)
);
addRoute("/logout", () => auth.logout().then(() => void redirect("/login")));

// addRoute("/u/-/discord/auth/flow/signup",()=>//)

/*
===========ADD ALL CODE SPLIT POINTS ABOVE============
 */
interface CustomRouteFallback {
  promise: () => Promise<ComponentType>;
  fallback: ComponentType;
}

function getRouteChild(
  path: string,
  compPromise: CustomRouteFallback | CustomRouteFallback["promise"]
) {
  return (
    <Path
      match={createRoutePath(path)}
      component={
        <section data-app-state={path} class="route-path">
          <AsyncComponent
            componentPromise={
              (compPromise as CustomRouteFallback).promise ||
              (compPromise as CustomRouteFallback["promise"])
            }
            fallback={
              (compPromise as CustomRouteFallback).fallback || (
                <div>Loading...</div>
              )
            }
          />
        </section>
      }
    />
  );
}

const routes: VNode[] = entries(routeMap).map(([path, comp]) =>
  getRouteChild(path, comp)
);
export function ComponentLoader() {
  const header = useGlobalState<boolean>("showHeader");
  return (
    <>
      {header && <Header />}
      <main class="app">
        <Router>{routes}</Router>
      </main>
    </>
  );
}
