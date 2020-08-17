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
  backgroundColor: "#c4c4c4",
  borderRadius: "20px",
  border: "2px solid #c4c4c4",
});

export const formInpWrapper = css({ width: "60%", margin: "auto" });

export const upper = css({ textTransform: "uppercase" });

export const mHeading = css({ marginTop: "50px" });
