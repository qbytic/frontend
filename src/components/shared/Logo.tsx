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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 257.25 257.25"
        height={height}
        width={width}
      >
        <defs>
          <linearGradient
            id="A"
            x1="344.47"
            x2="400.13"
            y1="453.82"
            y2="550.23"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#56f8ff" />
            <stop offset=".84" stop-color="#008aa2" />
          </linearGradient>
          <linearGradient
            id="B"
            x1="362.67"
            x2="290.7"
            y1="475.12"
            y2="433.58"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".3" stop-color="#56f8ff" />
            <stop offset="1" stop-color="#5f4dff" />
          </linearGradient>
          <radialGradient
            id="C"
            cx="297.97"
            cy="420.33"
            r="128.62"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".82" stop-color="#00d4d1" />
            <stop offset="1" stop-color="#007594" />
          </radialGradient>
        </defs>
        <g transform="translate(-169.35 -291.71)">
          <path
            fill="url(#A)"
            d="M426.52 420.34c0 58.05-70.5 128.54-128.54 128.54h128.54V420.34z"
          />
          <path
            fill="none"
            stroke="url(#C)"
            stroke-miterlimit="10"
            stroke-width="47"
            d="M298 525.46a105.13 105.13 0 11105.1-105.13"
          />
          <path
            fill="url(#B)"
            d="M298.35 420.33L298 502s80.1 2.5 81.58-81.27z"
          />
        </g>
      </svg>
    </A>
  );
}
