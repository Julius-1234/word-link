import styles from "./Btn.module.scss";

export default function Btn({ children, className, onClick }) {
  return <button className={`${styles.box} ${className}`} onClick={onClick}>{children}</button>;
}
