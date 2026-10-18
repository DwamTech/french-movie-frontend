import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#071322", borderRadius: 20 }}>
      <svg width="76" height="76" viewBox="0 0 76 76" fill="none">
        <rect x="4" y="10" width="68" height="56" rx="9" stroke="#e2bd65" strokeWidth="4" />
        <path d="M5 24H71M5 52H71" stroke="#e2bd65" strokeWidth="3" />
        <path d="M17 11V24M31 11V24M45 11V24M59 11V24M17 52V65M31 52V65M45 52V65M59 52V65" stroke="#e2bd65" strokeWidth="3" />
        <path d="M31 29L48 38L31 47V29Z" fill="#f7e4ab" />
      </svg>
    </div>,
    size,
  );
}
