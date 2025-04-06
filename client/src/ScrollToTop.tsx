import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, []);

  return null;
};

export default ScrollToTop;
