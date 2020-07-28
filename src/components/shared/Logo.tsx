import { A } from "@hydrophobefireman/ui-lib";

interface LogoProps {
  size?: number;
  class?: string;
}
export function Logo(props: LogoProps) {
  const height = props.size || "60";
  const width = props.size || "60";

  return (
    <A href="/" class={["hoverable", "qbytic-logo"].concat(props.class)}>
      <svg viewBox="0 0 257.25 257.25" height="100" width="100">
        <defs>
          <linearGradient
            id="A"
            x1="344.47"
            x2="400.13"
            y1="453.82"
            y2="550.23"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="var(--qbytic-blue)"></stop>
            <stop offset=".84" stop-color="#008aa2"></stop>
          </linearGradient>
          <linearGradient
            id="B"
            x1="362.67"
            x2="290.7"
            y1="475.12"
            y2="433.58"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".3" stop-color="var(--qbytic-blue)"></stop>
            <stop offset="1" stop-color="#5f4dff"></stop>
          </linearGradient>
          <radialGradient
            id="C"
            cx="297.97"
            cy="420.33"
            r="128.62"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".82" stop-color="var(--qbytic-blue)"></stop>
            <stop offset="1" stop-color="#007594"></stop>
          </radialGradient>
        </defs>
        <g transform="translate(-169.35 -291.71)">
          <path
            fill="url(#A)"
            d="M426.52 420.34c0 58.05-70.5 128.54-128.54 128.54h128.54V420.34z"
          ></path>
          <path
            fill="none"
            stroke="url(#C)"
            stroke-miterlimit="10"
            stroke-width="47"
            d="M298 525.46a105.13 105.13 0 11105.1-105.13"
          ></path>
          <path
            fill="url(#B)"
            d="M298.35 420.33L298 502s80.1 2.5 81.58-81.27z"
          ></path>
        </g>
      </svg>{" "}
    </A>
  );
}
