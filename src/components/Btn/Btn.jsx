import styles from "./Btn.module.scss";

export default function Btn({ children, className }) {
  return <button className={`${styles.box} ${className}`}>{children}</button>;
}
