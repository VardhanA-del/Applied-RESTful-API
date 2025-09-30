import { useState } from "react";

const themes = [
  {
    background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
    border: "#0077cc",
  },
  {
    background: "linear-gradient(135deg, #e0f7fa, #e1f5fe)",
    border: "#0288d1",
  },
  {
    background: "linear-gradient(135deg, #f1f8e9, #e8f5e9)",
    border: "#388e3c",
  },
  {
    background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
    border: "#f57c00",
  },
  {
    background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
    border: "#c2185b",
  },
];

function SpecificVerse() {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("John 3:16");
  const [theme, setTheme] = useState(themes[0]);

  const fetchVerse = async () => {
    try {
      const res = await fetch(
        `https://labs.bible.org/api/?passage=${encodeURIComponent(
          reference
        )}&type=json`
      );
      const data = await res.json();
      if (data.length > 0) {
        const v = data[0];
        setVerse(`${v.bookname} ${v.chapter}:${v.verse} — ${v.text}`);
        // change theme each time
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setTheme(randomTheme);
      } else {
        setVerse("Verse not found!");
      }
    } catch (err) {
      setVerse("Failed to fetch verse!");
    }
  };

  return (
    <div
      className="card"
      style={{
        background: theme.background,
        borderLeft: `6px solid ${theme.border}`,
        transition: "all 0.5s ease",
      }}
    >
      <h2>🔎 Get Specific Verse</h2>
      <div className="input-row">
        <input
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <button onClick={fetchVerse}>Fetch</button>
      </div>
      <p className="verse">{verse}</p>
    </div>
  );
}

export default SpecificVerse;
