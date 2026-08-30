import HomeLink from "../../components/HomeLink/HomeLink.jsx";
import Title from "../../components/Title/Title.jsx";
import styles from "./Help.module.scss";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <>
      <HomeLink />
      <div className={styles.help}>
        <Title className={styles.header1}>How to play Word Link</Title>{" "}
        <p>
          The goal of this game is to reach the target word by modifying the
          starting word to get to the end word. <br />
          Every time you change the start word, it must result in a valid word.
          You can:
        </p>
        <ul>
          <li>Add a letter</li>
          <li>Remove a letter</li>
          <li>Change a letter</li>
          <li>Rearrange the whole word</li>
        </ul>
        <br />
        <p>
          For example, if the starting word was cat, and the ending word was
          tar, then
        </p>
        <p>cat &rarr; rat &rarr; rats &rarr; star &rarr; tar</p>
        <p>However, this is not necessarily the shortest path.</p>
        <p>cat &rarr; car &rarr; tar</p> <p>is also valid, and much shorter.</p>
        <br />
        <p>
          Once you find one path, you can double click the clear button in the
          bottom right corner in home to re-start.
        </p>
        <br />
        <p>There are 3 difficulties for this game:</p>{" "}
        <ul>
          <li>easy</li>
          <li>normal</li>
          <li>hard</li>
        </ul>
        <br />
        <p>
          You can only progress to normal once you complete easy, and you can
          only progress to hard once you complete normal.
        </p>
        <br />
        <p>
          Your stats and current game info are in <a href="/stats">history</a>{" "}
          (bottom left in home). There are also practice and archive game modes.
        </p>
        <br />
        <p>
          If something doesn't make sense, try playing the game to see how it
          works!
        </p>
      </div>
    </>
  );
}
