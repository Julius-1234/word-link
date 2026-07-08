import styles from "./ArchiveCalendar.module.scss";

import {
  formatDate,
  timeAgo,
  formatToDays,
  formatFromDays,
  isToday,
} from "../../utils/date.js";

import { archiveStart, difficultyInfo } from "../../utils/constants.js";

import { getData } from "../../utils/storage.js";

import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

export default function ArchiveCalendar() {
  const data = getData();
  const current = formatFromDays(data.dateKey);
  const today = new Date();
  const [days, setDays] = useState([]);
  const lastDayRef = useRef(new Date(today));
  const scrollTopRef = useRef(0);
  const containerRef = useRef(null);
  const [loadedAll, setLoadedAll] = useState(false);

  const makeDay = (date, special = "") => {
    const formattedDate = formatToDays(date);
    const day = data.days?.[formattedDate];
    let best = null;
    const order = difficultyInfo.order;
    order.forEach((difficulty) => {
      const game = day?.games[difficulty];
      if (game?.found?.length > 0) best = difficulty;
    });
    const style = best ? difficultyInfo.difficulties[best]?.beatenStyles : {};
    return (
      <Link
        to={{
          pathname: "/",
          search: `${formatToDays(today) !== formatToDays(date) ? "?archive=" + formatToDays(date) : ""}`,
        }}
        className={`${styles.day} ${special}`}
        style={style}
      >
        <div className={styles.date}>{formatDate(date)}</div>
        <div className={styles.timeAgo}>{timeAgo(date)}</div>
      </Link>
    );
  };
  const addDay = () => {
    lastDayRef.current.setDate(lastDayRef.current.getDate() - 1);
    if (formatToDays(lastDayRef.current) <= formatToDays(archiveStart)) {
      setLoadedAll(true);
      return;
    }
    const newDay = makeDay(lastDayRef.current);
    setDays((prev) => [...prev, newDay]);
  };
  useEffect(() => {
    checkForNewDay();
  });
  const checkForNewDay = (e) => {
    const el = containerRef.current;
    if (!el) return;
    scrollTopRef.current = el.scrollTop;
    const scrollBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (scrollBottom < 200) addDay();
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTopRef.current;
    }
  }, [days]);
  useEffect(() => {
    window.addEventListener("resize", checkForNewDay);
    return () => {
      window.removeEventListener("resize", checkForNewDay);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      onScroll={!loadedAll ? checkForNewDay : null}
      className={`${styles.archiveCalendarBox} scrollbar-styles`}
    >
      <div className={styles.archiveCalendarSpecial}>
        Today:
        {makeDay(today, styles.today)}
        Current Game:
        {!isToday(current) && makeDay(current)}
      </div>
      <div className={styles.archiveCalendar}>
        {days}
        {loadedAll && <div className={styles.archiveEnd}>End Of Archive</div>}
      </div>
    </div>
  );
}
