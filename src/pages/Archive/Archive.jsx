import styles from "./Archive.module.scss";
import ArchiveCalendar from "../../components/ArchiveCalendar/ArchiveCalendar.jsx";
import ArchiveKey from "../../components/ArchiveKey/ArchiveKey.jsx";

export default function Archive() {
  return (
    <>
      <div className={styles.archiveTitle}>Archive</div>
      <ArchiveKey />
      <ArchiveCalendar />
    </>
  );
}
