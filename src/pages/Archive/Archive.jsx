import styles from "./Archive.module.scss";
import ArchiveCalendar from "../../components/ArchiveCalendar/ArchiveCalendar.jsx";
import ArchiveKey from "../../components/ArchiveKey/ArchiveKey.jsx";
import HomeLink from "../../components/HomeLink/HomeLink.jsx";
import Title from "../../components/Title/Title.jsx";

export default function Archive() {
  return (
    <div className={styles.archive}>
      <HomeLink />
      <Title className={styles.archiveTitle}>Archive</Title>
      <ArchiveKey />
      <ArchiveCalendar />
    </div>
  );
}
