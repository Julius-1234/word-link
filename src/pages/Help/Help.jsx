import HomeLink from "../../components/HomeLink/HomeLink.jsx";
import Title from "../../components/Title/Title.jsx";
import styles from "./Help.module.scss";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <>
      <HomeLink />
      <div className={styles.help}>
        <Title className={styles.header1}>Welcome!</Title>
        <p>
          Welcome to Word Link! This is a word game where you can modify words
          in different ways to reach a target word. You can add letters, remove
          letters, change letters, and even rearrange letters to reach the
          target word. More details can be found in the "How to Play" section
          below.
        </p>
        <p>
          Created by Julius Williams. You can find the credits for this website{" "}
          <Link to="/credits">here</Link>.
        </p>
        <Title className={styles.header2}>Why you should play this game</Title>
        <p>
          <small>
            Feel free to skip this section if you just want to learn how to
            play. But if you want to know why you should play this game, read
            on!
          </small>
        </p>
        <p>
          There are lots of games out there that have similar gameplay to this
          one, but none of them are quite like Word Link.
          <p>
            As we will explore in more detail later, this game has many unique
            ways to modify words that set it apart from others. Not only does
            this game combine the classic 'add letter', 'remove letter', and
            'change letter' mechanics, but it also has the unique 'rearrange
            letters' ability (more on that later).
          </p>
          <p>
            This game not only has a daily challenge, but different tiers of
            difficulty. This makes this game perfect for anyone. You can also
            view your stats to see how you are doing, and even catch up on
            missed daily challenges in the archive. There is also practice mode,
            so you can continue to play even after you have completed the daily
            challenge.
          </p>
        </p>
        <Title className={styles.header2}>How to Play</Title>
        <p>
          The goal of this game is to reach the target word by modifying the
          starting word. You can add letters, remove letters, change letters,
          and rearrange letters to reach the target word. You can do this in as
          many steps as you need, but each change must result in a valid word.
        </p>
        <p>
          You can:
          <ul>
            <li>Add 1 letter to the word</li>
            <li>Remove 1 letter from the word</li>
            <li>Change 1 letter in the word</li>
            <li>Rearrange the letters in the word</li>
          </ul>
        </p>
        <p>
          Once you complete a path (i.e. get from the start word to the end
          word), you unlock the next difficulty.
        </p>
        <p>That's about it!</p>
        <Title className={styles.header2}>Features</Title>
        <p>
          As mentioned earlier, this game offers several extra features to
          enhance your experience. These features are all accessible from the{" "}
          <Link to="/">home</Link> page.
          <p>
            <Title>Extra game modes</Title>
            You can play extra game modes from the dropdown list in home. You
            can play daily, practice, or archive.
          </p>
          <p>
            <Title>
              <Link to="/archive" className={styles.titleLink}>
                archive
              </Link>
            </Title>
            You can play games from previous days in the archive.
          </p>
          <p>
            <Title>
              <Link className={styles.titleLink} to="/stats">
                stats
              </Link>
            </Title>
            You can view your stats to see how you are doing. There are
            practice, daily, and current game stats. Current game stats show you
            all the paths you have found in the current game.
          </p>
        </p>
        <p>
          If something doesn't make sense, try playing the game to see how it
          works!
        </p>
      </div>
    </>
  );
}
