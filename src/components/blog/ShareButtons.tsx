import { FaTwitter, FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
import { useTheme, tokens } from "../../context/ThemeContext";

const ShareButtons = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  const t = tokens[theme];
  const url = window.location.href;

  const share = (platform: "twitter" | "facebook" | "linkedin") => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const iconStyle = {
    color: t.textSub,
    fontSize: "18px",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", margin: "12px 0" }}>
      <FaTwitter style={iconStyle} onClick={() => share("twitter")} title="Share on Twitter" />
      <FaFacebook style={iconStyle} onClick={() => share("facebook")} title="Share on Facebook" />
      <FaLinkedin style={iconStyle} onClick={() => share("linkedin")} title="Share on LinkedIn" />
      <FaLink style={iconStyle} onClick={copyLink} title="Copy link" />
    </div>
  );
};

export default ShareButtons;