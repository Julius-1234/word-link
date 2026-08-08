import HomeLink from "../../components/HomeLink/HomeLink.jsx";
import Title from "../../components/Title/Title.jsx";
import styles from "./Help.module.scss";

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
      </div>
    </>
  );
}
