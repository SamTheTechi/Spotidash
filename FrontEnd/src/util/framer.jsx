export const FRAMER_FADE = {
  initial: {
    opacity: 0,
  },
  whileInView: {
    opacity: 1,
  },
};

export const FRAMER_FADE_INOUT = {
  initial: {
    opacity: 0,
    y: 80,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: easeOut,
  },
};
