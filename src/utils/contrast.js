export const normalizeHex = (input) => {
  const raw = String(input ?? "").trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(raw)) return `#${raw.split("").map((digit) => `${digit}${digit}`).join("").toUpperCase()}`;
  if (/^[0-9a-fA-F]{6}$/.test(raw)) return `#${raw.toUpperCase()}`;
  throw new Error("Enter a 3 or 6 digit hex color, such as #336699.");
};

export const hexToRgb = (hex) => {
  const normalized = normalizeHex(hex).slice(1);
  return [0, 2, 4].map((start) => Number.parseInt(normalized.slice(start, start + 2), 16));
};

const linearize = (channel) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

export const relativeLuminance = (hex) => {
  const [red, green, blue] = hexToRgb(hex).map(linearize);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export const contrastRatio = (foreground, background) => {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

export const getContrastLevels = (ratio) => ({
  aaNormal: ratio >= 4.5,
  aaLarge: ratio >= 3,
  aaaNormal: ratio >= 7,
  aaaLarge: ratio >= 4.5,
});
