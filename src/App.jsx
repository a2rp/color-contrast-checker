import { FiArrowDown, FiCheck, FiEye, FiInfo } from "react-icons/fi";
import BackToTop from "./components/backToTop/index.jsx";
import ContrastWorkbench from "./components/contrastWorkbench/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const criteria = [
  { label: "AA", type: "Normal text", ratio: "4.5:1", detail: "The usual target for body copy and smaller labels." },
  { label: "AA", type: "Large text", ratio: "3:1", detail: "Applies to large text at 18pt regular or 14pt bold." },
  { label: "AAA", type: "Normal text", ratio: "7:1", detail: "A more demanding target for normal-sized text." },
  { label: "AAA", type: "Large text", ratio: "4.5:1", detail: "A higher target for large text." },
];

const App = () => (
  <div className={styles.appShell} id="top">
    <SiteHeader />
    <main>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div><p className={styles.heroLabel}><FiEye aria-hidden="true" /> COLOR ACCESSIBILITY / WCAG 2.2</p><h1 id="hero-title">Color you can<br /><span>count on.</span></h1><p className={styles.heroDescription}>A quick, clear check for text and background colors. See the pair in context and understand which contrast targets it meets.</p><a className={styles.startLink} href="#checker">Check a color pair <FiArrowDown aria-hidden="true" /></a></div>
          <div className={styles.heroPreview} aria-label="Contrast sample preview"><div><span>TEXT</span><span>BACKGROUND</span></div><p><b>Aa</b><span>Readability has a ratio.</span></p><footer><FiCheck aria-hidden="true" /> Example pair / 12.63:1</footer></div>
        </div>
        <div className={styles.heroFoot}><span>Relative luminance calculation</span><span>INSTANT FEEDBACK <i /></span></div>
      </section>
      <ContrastWorkbench />
      <section className={styles.guide} id="guide" aria-labelledby="guide-title">
        <div className={styles.guideInner}>
          <div className={styles.guideHeading}><p>How to read the score</p><h2 id="guide-title">Four text targets, one clear ratio.</h2><span>WCAG compares relative luminance on a scale from 1:1 to 21:1.</span></div>
          <div className={styles.criteriaGrid}>{criteria.map(({ label, type, ratio, detail }) => <article key={`${label}-${type}`}><span>{label}</span><div><h3>{type}</h3><p>{detail}</p></div><b>{ratio}</b></article>)}</div>
          <p className={styles.guideFoot}><FiInfo aria-hidden="true" /> Large text means at least 18pt regular or 14pt bold. This tool checks text contrast and does not evaluate every accessibility requirement.</p>
        </div>
      </section>
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
);

export default App;
