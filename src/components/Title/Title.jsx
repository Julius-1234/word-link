import styles from "./Title.module.scss";

export default function Title({ children, className }) {
  return (
    <div className={`${styles.box} ${className ? className : ""}`}>
      {children}
    </div>
  );
}
