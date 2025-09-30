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

function RandomVerse() {
  const [verse, setVerse] = useState("");
  const [theme, setTheme] = useState(themes[0]);

  const fetchRandomVerse = async () => {
    try {
      const res = await fetch(
        "https://labs.bible.org/api/?passage=random&type=json"
      );
      const data = await res.json();
      if (data.length > 0) {
        const v = data[0];
        setVerse(`${v.bookname} ${v.chapter}:${v.verse} — ${v.text}`);
        // change theme each time
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setTheme(randomTheme);
      }
    } catch (err) {
      setVerse("⚠️ Failed to fetch verse. Try again.");
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
      <h2>📖 Random Verse</h2>
      <button onClick={fetchRandomVerse}>Get Verse</button>
      <p className="verse">{verse}</p>
    </div>
  );
}

export default RandomVerse;
