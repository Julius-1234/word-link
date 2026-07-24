import styles from "./ShadowScrollBox.module.scss";
import { useEffect, useState, useRef } from "react";

export default function ShadowScrollBox({ children, classNames }) {
  const elRef = useRef(null);
  const [scrollingTop, setScrollingTop] = useState(false);
  const [scrollingBottom, setScrollingBottom] = useState(false);
  const getShadows = () => {};
  const check = () => {
    if (!elRef) return;
    const scrollTop = elRef.current.scrollTop;
    const scrollBottom =
      elRef.current.scrollHeight -
      elRef.current.scrollTop -
      elRef.current.clientHeight;
    const isTop = scrollTop > 0;
    const isBottom = scrollBottom > 1;
    if (isTop !== scrollingTop) setScrollingTop(isTop);
    if (isBottom !== scrollingBottom) setScrollingBottom(isBottom);
  };
  useEffect(check);
  useEffect(() => {
    window.addEventListener("resize", check);
    return window.addEventListener("resize", check);
  }, []);
  return (
    <div
      ref={elRef}
      className={`scrollbar-styles ${classNames} ${scrollingTop ? styles.scrollingTop : ""} ${scrollingBottom ? styles.scrollingBottom : ""}`}
      onScroll={check}
    >
      {children}
    </div>
  );
}
