import "./Archive.css";
import ArchiveCalendar from "../../components/ArchiveCalendar/ArchiveCalendar.jsx";
import ArchiveKey from "../../components/ArchiveKey/ArchiveKey.jsx";

export default function Archive() {
  return (
    <>
      <div className="archiveTitle">Archive</div>
      <ArchiveKey />
      <ArchiveCalendar />
    </>
  );
}
