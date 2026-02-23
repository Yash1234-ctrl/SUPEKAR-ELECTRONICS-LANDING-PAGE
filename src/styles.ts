import React from "react";

// shared layout & element styles
export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontSize: "15px",
  backdropFilter: "blur(8px)",
};

export const buttonStyle: React.CSSProperties = {
  padding: "14px",
  background: "#00ff88",
  border: "none",
  fontWeight: "bold",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

export const socialLinkStyle = (color: string): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color,
  textDecoration: "none",
  fontSize: "18px",
  transition: "0.3s",
});

export const linkStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#cfe6ff",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 500,
  position: "relative",
};

export const primaryStyle: React.CSSProperties = {
  background: "#00d084",
  border: "none",
  color: "#012",
  padding: "12px 22px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
};