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

import { modes, toGameKey } from "../../utils/modes.js";

import { Link } from "react-router-dom";

import { toQueryString } from "../../utils/url.js";

export default function ArchiveCalendar() {
  const data = getData();

  const loaded = data.loaded;
  const currentGame =
    loaded.key && loaded.gameMode !== modes.practice
      ? new Date(formatFromDays(loaded.key))
      : null;

  const today = new Date();

  const [days, setDays] = useState([]);
  const [loadedAll, setLoadedAll] = useState(false);

  const lastDayRef = useRef(new Date(today));
  const scrollTopRef = useRef(0);
  const containerRef = useRef(null);

  const makeDay = (date, special = "") => {
    const asDays = formatToDays(date);
    const gameKey = toGameKey(modes.daily, asDays);
    const day = data.sets[gameKey];

    let best = null;
    const order = difficultyInfo.order;

    order.forEach((difficulty) => {
      const game = day?.games[difficulty];
      if (game?.found?.length > 0) best = difficulty;
    });

    const style = best ? difficultyInfo.difficulties[best]?.beatenStyles : {};

    return (
      <Link
        key={asDays}
        to={{
          pathname: "/",
          search: `${formatToDays(today) !== asDays ? toQueryString(modes.archive, asDays) : ""}`,
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
    if (
      loadedAll ||
      formatToDays(lastDayRef.current) < formatToDays(archiveStart)
    ) {
      setLoadedAll(true);
      return;
    }
    const newDay = makeDay(lastDayRef.current);
    setDays((prev) => [...prev, newDay]);
  };

  const checkForNewDay = (e) => {
    const el = containerRef.current;
    if (!el) return;
    scrollTopRef.current = el.scrollTop;
    const scrollBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (scrollBottom < 200) addDay();
  };

  useEffect(() => {
    checkForNewDay();
  });

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

  const toTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.archiveCalendar}>
      <div className={styles.archiveCalendarSpecial}>
        Today:
        {makeDay(today, styles.today)}
        {!!currentGame && !isToday(currentGame) && (
          <>Current Game: {makeDay(currentGame)}</>
        )}
      </div>
      <div className={styles.toTop} onClick={toTop}>
        to top
      </div>
      <div
        ref={containerRef}
        onScroll={!loadedAll ? checkForNewDay : null}
        className={`${styles.archiveCalendarBox} scrollbar-styles`}
      >
        {days}
        {loadedAll && <div className={styles.archiveEnd}>End Of Archive</div>}
      </div>
    </div>
  );
}
