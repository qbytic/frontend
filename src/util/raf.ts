export const raf: Window["requestAnimationFrame"] = window.requestAnimationFrame
  ? function (f: FrameRequestCallback) {
      return requestAnimationFrame(f);
    }
  : (f: FrameRequestCallback) => (setTimeout(f, 32) as unknown) as number;
