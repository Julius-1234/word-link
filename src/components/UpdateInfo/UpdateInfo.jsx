import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { loadLastUpdate, saveLastUpdate } from "../../utils/storage";
import styles from "./UpdateInfo.module.scss";
import Title from "../Title/Title";
import Btn from "../Btn/Btn";
import ShadowScrollBox from "../ShadowScrollBox/ShadowScrollBox";

export default function UpdateInfo() {
  const [info, setInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const lastUpdateSeen = loadLastUpdate();
  const [updateMessages, setUpdateMessages] = useState([]);

  useEffect(() => {
    fetch("/updateInfo.json")
      .then((res) => res.json())
      .then((data) => setInfo(data));
  }, []);

  useEffect(() => {
    if (!info) return;
    if (lastUpdateSeen === 0) {
      saveLastUpdate(info.updates.length + 1);
      return;
    }
    const updates = info.updates;
    const newUpdates = updates.slice(lastUpdateSeen - 1);
    setUpdateMessages(newUpdates.flat());
  }, [info]);

  const close = () => {
    setIsOpen(false);
    saveLastUpdate(info.updates.length + 1);
  };

  return createPortal(
    <>
      {info && updateMessages.length > 0 && isOpen ? (
        <div className={styles.updateInfoWrapper}>
          <div className={styles.updateInfo}>
            <Title className={styles.title}>Updates</Title>
            <ShadowScrollBox className={styles.updates}>
              {updateMessages.map((message, i) => (
                <div key={i} className={styles.update}>
                  {message}
                </div>
              ))}
            </ShadowScrollBox>
            <Btn className={styles.close} onClick={close}>
              Close
            </Btn>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("updateInfo"),
  );
}
