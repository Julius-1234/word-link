import HomeLink from "../../components/HomeLink/HomeLink";
import Title from "../../components/Title/Title.jsx";
import styles from "./Credits.module.scss";

export default function Credits() {
  return (
    <>
      <HomeLink />
      <div className={styles.credits}>
        <Title className={styles.header1}>Credits</Title>
        <p>
          All resources used to create this game and the dictionaries for this
          game are used in accordance with their respective licenses.
        </p>
        <p>
          Created by Julius Williams. <br />
          Official repositry for this website:
        </p>
        <Title className={styles.header2}>Dictionary resources:</Title>
        <p>
          The dictionaries used in this game were generated using publicly
          available dictionaries and filters. As a result, non‑existent words
          may occasionally appear, and some valid words may be rejected. <br />
          The following resources are all used accoring to their licenses.
        </p>
        <Title>Base dictionary:</Title>
        <p>
          SCOWL (Spell Checker Oriented Word Lists)
          <br />
          This project uses a dictionary based on the SCOWL word lists. You can
          find the license for the SCOWL lists in the licenses folder, or here
        </p>
        <Title className={styles.header2}>Other resources:</Title>
        <p>
          The following resources were used only as python modules, and were
          only used to filter the dictionaries that have been used in this
          website. They are not actually included in this project.
          <br />I have no legal obligation to meantion these resources, but this
          is been done as a courtesy.
        </p>
        <Title>Bad‑word filter:</Title>
        <p>
          LDNOOBW_v2
          <br />
          This was used just to create the dictionaries for this website, so the
          usual license notice isn't nessisary.
        </p>
        <Title>Second filter:</Title>
        <p>
          PyEnchant (python module)
          <br />
          This version of pyenchant uses the hunspell libaries. Again, due to
          the way it has been used, I have no legal obligations. This was used
          as a second layer of validation.
        </p>
        <Title>Other python modules:</Title>
        <p>
          Wordfreq (python module) was used to filter the generation dictionary,
          so ensure that the words used were not too uncommon/common.
          <br />
          Better-Profanity (python module) was also used alongside LDNOOBW_v2,
          as a second layer of protection to filter the generation dictionary.
        </p>
        <Title className={styles.header1}>Other resources:</Title>
        <p>
          Fonts are used from by Google Fonts.
          <br />
          This website was built using React and Vite.
        </p>

        <br />
        <small>
          Copyright © 2026 Julius Williams
          <br />
          All rights reserved.
          <br />
          This repository and its contents are protected by copyright law. No
          part of this repository may be copied, modified, distributed,
          published, sublicensed, or used in any form without prior written
          permission from the copyright holder.
        </small>
      </div>
    </>
  );
}
