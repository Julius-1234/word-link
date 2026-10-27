import styles from "./Btn.module.scss";

export default function Btn({ children, className, onClick, onMouseDown }) {
  return (
    <button
      className={`${className} ${styles.box}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  );
}
