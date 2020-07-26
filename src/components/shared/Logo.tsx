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
      <svg viewBox="0 0 571 571" height={height} width={width}>
        <defs>
          <clipPath id="a">
            <path d="M-1395-985h3456v2592h-3456z" />
          </clipPath>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="#333"
            d="M287 287h180.4c0 99.64-80.76 180.4-180.4 180.4V287zm283.2-1.6v1.6H467.4c0-99.64-80.76-180.4-180.4-180.4S106.6 187.36 106.6 287 187.36 467.4 287 467.4v102.8h-1.6C128.1 570.2.6 442.7.6 285.4S128.1.6 285.4.6s284.8 127.5 284.8 284.8zM467.4 287c0 99.64-80.76 180.4-180.4 180.4V287h180.4zm102.8 0v283.2H287c156.04-.86 282.34-127.16 283.2-283.2z"
          />
        </g>
      </svg>
    </A>
  );
}
