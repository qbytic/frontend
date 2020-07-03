import {
  AsyncComponent,
  Router,
  createRoutePath,
  Path,
} from "@hydrophobefireman/ui-lib";
import { ComponentType } from "@hydrophobefireman/ui-lib/src/types";
import entries from "@hydrophobefireman/j-utils/@build-modern/src/modules/Object/entries";

interface Mod<T> {
  default: T;
}

const routeMap: Record<string, () => Promise<ComponentType>> = {};

function addRoute(route: string, component: () => Promise<ComponentType>) {
  routeMap[route] = component;
}

const getDefault: <T>(mod: Mod<T>) => Mod<T>["default"] = (mod) => mod.default;

addRoute("/", () => import("./components/Landing/Landing").then(getDefault));
addRoute("/login", () => import("./components/Login/Login").then(getDefault));
addRoute("/register", () =>
  import("./components/Register/Register").then(getDefault)
);

// addRoute("/u/-/discord/auth/flow/signup",()=>//)

/*
===========ADD ALL CODE SPLIT POINTS ABOVE============
 */
function getRouteChild(
  path: string,
  compPromise: () => Promise<ComponentType>
) {
  return (
    <Path
      match={createRoutePath(path)}
      component={
        <section data-app-state={path}>
          <AsyncComponent componentPromise={compPromise} fallback={<div>Loading...</div>} />
        </section>
      }
    />
  );
}

export function ComponentLoader() {
  return (
    <main class="router-app">
      <div class="route-container">
        <Router>
          {entries(routeMap).map(([path, comp]) => getRouteChild(path, comp))}
        </Router>
      </div>
    </main>
  );
}
