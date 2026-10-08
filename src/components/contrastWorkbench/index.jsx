import { useMemo, useState } from "react";
import { FiCheck, FiInfo, FiRepeat, FiX } from "react-icons/fi";
import { contrastRatio, getContrastLevels, normalizeHex } from "../../utils/contrast.js";
import styles from "./styles.module.css";

const presets = [
  { label: "Ink on paper", foreground: "#232736", background: "#FFFFFF" },
  { label: "Blue on mist", foreground: "#244BC5", background: "#EEF1FF" },
  { label: "Forest on mint", foreground: "#28624A", background: "#E8F5EC" },
  { label: "Clay on cream", foreground: "#9B402A", background: "#FFF1E7" },
];

const normalizeOrNull = (value) => {
  try { return normalizeHex(value); } catch { return null; }
};

const ContrastWorkbench = () => {
  const [foregroundText, setForegroundText] = useState("#232736");
  const [backgroundText, setBackgroundText] = useState("#FFFFFF");
  const foreground = normalizeOrNull(foregroundText);
  const background = normalizeOrNull(backgroundText);
  const ratio = useMemo(() => foreground && background ? contrastRatio(foreground, background) : null, [foreground, background]);
  const levels = ratio === null ? null : getContrastLevels(ratio);

  const applyPreset = ({ foreground: nextForeground, background: nextBackground }) => {
    setForegroundText(nextForeground);
    setBackgroundText(nextBackground);
  };

  const swapColors = () => {
    setForegroundText(background ?? backgroundText);
    setBackgroundText(foreground ?? foregroundText);
  };

  const normalizeField = (value, setValue) => {
    const normalized = normalizeOrNull(value);
    if (normalized) setValue(normalized);
  };

  return (
    <section className={styles.workbench} id="checker" aria-labelledby="checker-title">
      <div className={styles.heading}><div><p>LIVE CONTRAST TEST</p><h2 id="checker-title">Check a color pair.</h2><span>Set a text color and a background. The preview and WCAG results update as you type.</span></div><span className={styles.liveTag}><i /> Live</span></div>
      <div className={styles.layout}>
        <div className={styles.controls}>
          <div className={styles.colorField}>
            <label htmlFor="foreground-hex">Text / foreground</label>
            <div className={styles.colorRow}><input aria-label="Choose foreground color" type="color" value={foreground ?? "#232736"} onChange={(event) => setForegroundText(event.target.value.toUpperCase())} /><input id="foreground-hex" value={foregroundText} maxLength={7} aria-invalid={!foreground} aria-describedby={!foreground ? "foreground-error" : undefined} onChange={(event) => setForegroundText(event.target.value)} onBlur={() => normalizeField(foregroundText, setForegroundText)} spellCheck="false" /></div>
            {!foreground && <span className={styles.fieldError} id="foreground-error">Use a 3 or 6 digit hex value.</span>}
          </div>
          <button className={styles.swapButton} type="button" onClick={swapColors} aria-label="Swap foreground and background colors"><FiRepeat aria-hidden="true" /><span>Swap colors</span></button>
          <div className={styles.colorField}>
            <label htmlFor="background-hex">Background</label>
            <div className={styles.colorRow}><input aria-label="Choose background color" type="color" value={background ?? "#FFFFFF"} onChange={(event) => setBackgroundText(event.target.value.toUpperCase())} /><input id="background-hex" value={backgroundText} maxLength={7} aria-invalid={!background} aria-describedby={!background ? "background-error" : undefined} onChange={(event) => setBackgroundText(event.target.value)} onBlur={() => normalizeField(backgroundText, setBackgroundText)} spellCheck="false" /></div>
            {!background && <span className={styles.fieldError} id="background-error">Use a 3 or 6 digit hex value.</span>}
          </div>
          <fieldset className={styles.presets}><legend>Try a color pair</legend><div>{presets.map((preset) => <button key={preset.label} type="button" onClick={() => applyPreset(preset)}><span style={{ color: preset.foreground, backgroundColor: preset.background }}>Aa</span>{preset.label}</button>)}</div></fieldset>
          <div className={styles.note}><FiInfo aria-hidden="true" /><p>Contrast is calculated from relative luminance using the WCAG formula.</p></div>
        </div>
        <div className={styles.previewColumn}>
          <div className={styles.preview} style={{ color: foreground ?? "#232736", backgroundColor: background ?? "#FFFFFF" }}>
            <span>PREVIEW / BODY AND HEADING</span>
            <h3>Clear words make a difference.</h3>
            <p>Good contrast helps more people read the information on your page, across screens and in different conditions.</p>
            <a href="#guide">A sample text link</a>
          </div>
          <div className={styles.ratioCard}>
            <div><span>CONTRAST RATIO</span><strong>{ratio === null ? "--" : `${ratio.toFixed(2)}:1`}</strong></div>
            <p>{ratio === null ? "Enter a valid hex color to calculate the ratio." : levels.aaNormal ? "This pair meets AA for normal text." : levels.aaLarge ? "This pair meets AA for large text." : "This pair does not meet the AA text thresholds."}</p>
          </div>
          <div className={styles.levelGrid} aria-live="polite">
            {[
              { label: "AA", detail: "Normal text", pass: levels?.aaNormal },
              { label: "AA", detail: "Large text", pass: levels?.aaLarge },
              { label: "AAA", detail: "Normal text", pass: levels?.aaaNormal },
              { label: "AAA", detail: "Large text", pass: levels?.aaaLarge },
            ].map(({ label, detail, pass }) => <div className={`${styles.level} ${pass ? styles.pass : styles.fail}`} key={`${label}-${detail}`}><span>{label} <small>{detail}</small></span><b>{levels === null ? "--" : pass ? <><FiCheck aria-hidden="true" /> Pass</> : <><FiX aria-hidden="true" /> Fail</>}</b><i>{label === "AAA" ? (detail === "Normal text" ? "7:1" : "4.5:1") : (detail === "Normal text" ? "4.5:1" : "3:1")}</i></div>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContrastWorkbench;
