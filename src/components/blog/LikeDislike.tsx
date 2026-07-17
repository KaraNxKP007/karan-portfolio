import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useTheme, tokens } from "../../context/ThemeContext";
import { getVote, setVote } from "../../utils/likeStorage";

const LikeDislike = ({ slug }: { slug: string }) => {
  const { theme } = useTheme();
  const t = tokens[theme];
  const [vote, setLocalVote] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    setLocalVote(getVote(slug));
  }, [slug]);

  const handleVote = (v: "like" | "dislike") => {
    const result = setVote(slug, v);
    setLocalVote(result.vote);
  };

  const btnStyle = (active: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "9999px",
    border: `1px solid ${active ? t.accent : t.border}`,
    backgroundColor: active ? `${t.accent}22` : "transparent",
    color: active ? t.accent : t.textSub,
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
  });

  return (
    <div style={{ display: "flex", gap: "10px", margin: "12px 0" }}>
      <button style={btnStyle(vote === "like")} onClick={() => handleVote("like")}>
        <FaThumbsUp size={13} />
      </button>
      <button style={btnStyle(vote === "dislike")} onClick={() => handleVote("dislike")}>
        <FaThumbsDown size={13} />
      </button>
    </div>
  );
};

export default LikeDislike;