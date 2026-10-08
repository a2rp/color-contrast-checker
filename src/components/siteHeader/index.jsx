import { FiGithub, FiEye } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <a className={styles.brand} href="#top" aria-label="Color Contrast Checker home">
        <span className={styles.brandMark}><FiEye aria-hidden="true" /></span>
        <span>Color <b>Check</b></span>
      </a>
      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="#checker">Generator</a>
        <a href="#guide">About UUIDs</a>
      </nav>
      <a className={styles.repository} href="https://github.com/a2rp/color-contrast-checker" target="_blank" rel="noreferrer">
        <FiGithub aria-hidden="true" /> <span>Repository</span>
      </a>
    </div>
  </header>
);

export default SiteHeader;

