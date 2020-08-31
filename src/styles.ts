import { css } from "catom";

export const qBlue = css({ color: "var(--qbytic-blue)" });

export const bold = css({ fontWeight: "bold" });

export const heading = css({ fontSize: "3rem" });

export const nexa = css({ fontFamily: "nexa, ubuntu, sans-serif" });

export const hide = css({ display: "none !important" });

export const fadeOut = css({ transition: "0.3s linear", opacity: 0 });

export const fadeIn = css({
  animation: "fade__in 0.3s linear",
  animationFillMode: "forwards",
});

export const qbyticLogo = css({
  display: "inline-block",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
});

export const mask = css({
  height: "100vh",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "var(--mask-color)",
  zIndex: 5,
  position: "fixed",
  width: "100vw",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export const center = css({ margin: "auto", textAlign: "center" });

export const formInp = css({
  backgroundColor: "var(--current-bg)",
  borderRadius: "10px",
  border: "2px solid var(--current-color)",
  transition: "0.3s linear",
  pseudo: {
    "[data-active]": { borderColor: "var(--qbytic-blue)" },
    "[data-error]": { borderColor: "red !important" },
  },
});

export const formInpWrapper = css({
  width: "50%",
  margin: "auto",
  marginTop: "1.35rem",
  media: { "only screen and (max-width:800px)": { width: "60%" } },
});

export const upper = css({ textTransform: "uppercase" });

export const mHeading = css({ marginTop: "50px" });

export const hoverable = css({
  pseudo: {
    ":not([disabled])": {
      cursor: "pointer",
      transition: "0.3s ease-in-out",
      transformStyle: "preserve-3d",
    },
    ":active:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
    ":focus:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
    ":hover:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
  },
});

export const qbyticLink = css({
  display: "inline-block",
  pseudo: {
    "::after": {
      transition: "0.3s linear",
      position: "absolute",
      width: "100%",
      transform: "scaleX(0)",
      height: "2px",
      background: "var(--qbytic-blue)",
      display: "block",
      content: '""',
      marginTop: "calc(2px - 1rem)",
    },
    ":hover::after": { transform: "scaleX(1)" },
  },
});

export const actionBtn = css({
  marginTop: "10px",
  width: "10rem",
  height: "2rem",
  borderRadius: "5px",
  outline: "none",
  border: "2px solid var(--qbytic-blue)",
  background: "var(--current-bg)",
  color: "var(--current-color)",
  pseudo: {
    ":hover": { filter: "grayscale(1)" },
  },
});
