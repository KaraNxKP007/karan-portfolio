import { useState, useRef } from "react";
import { about } from "../constants";
import { lazy, Suspense } from "react";
import { Send } from "lucide-react";
const MoonCanvas = lazy(() => import("./MoonCanvas"));

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.sendForm("service_fygy1mx", "template_32sj1io", formRef.current!, "qzjEXYIQbiTpYTj_b");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(145,94,255,0.25)",
    borderRadius: "12px",
    padding: "14px 18px",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
    fontFamily: "Poppins, sans-serif",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const contactLinks = [
    { label: "Email",    value: about.email,        href: "mailto:" + about.email, color: "#c084fc" },
    { label: "LinkedIn", value: "karanpratap7",       href: about.linkedin,          color: "#0ea5e9" },
    { label: "GitHub",   value: "KaraNxKP007",        href: about.github,            color: "#aaa6c3" },
  ];

  return (
    <section id="contact" style={{ backgroundColor: "#050816", padding: "80px 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 20px" }}>

        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
          Get in touch
        </p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", marginBottom: "40px" }}>
          Contact.
        </h2>

        <div className="kp-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "stretch" }}>

          {/* Form */}
          <div style={{ backgroundColor: "#100d25", border: "1px solid rgba(145,94,255,0.25)", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", height: "100%" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "24px" }}>Send me a message</h3>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px", flex:1, justifyContent:"space-between"}}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[
                  { id: "name",  label: "Your Name",  type: "text",  placeholder: "Your full name" },
                  { id: "email", label: "Your Email", type: "email", placeholder: "your@email.com" },
                ].map((f) => (
                  <div key={f.id}>
                    <label style={{ color: "#c084fc", fontSize: "11px", fontWeight: 600, display: "block", marginBottom: "7px", textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>{f.label}</label>
                    <input type={f.type} name={f.id} value={(form as any)[f.id]} onChange={handleChange} placeholder={f.placeholder} required style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#915EFF"; }}
                      onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = "rgba(145,94,255,0.25)"; }} />
                  </div>
                ))}
                <div>
                  <label style={{ color: "#c084fc", fontSize: "11px", fontWeight: 600, display: "block", marginBottom: "7px", textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="What would you like to discuss?" rows={5} required
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px", maxHeight: "300px" }}
                    onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "#915EFF"; }}
                    onBlur={(e)  => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(145,94,255,0.25)"; }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  background: "linear-gradient(135deg, #915EFF, #6d28d9)",
                  color: "#ffffff",

                  border: "none",
                  borderRadius: "12px",

                  padding: "13px 26px",

                  fontSize: "15px",
                  fontWeight: 600,

                  cursor: status === "sending" ? "not-allowed" : "pointer",

                  fontFamily: "Poppins, sans-serif",

                  boxShadow: "0 0 24px rgba(145,94,255,0.3)",

                  width: "fit-content",

                  opacity: status === "sending" ? 0.7 : 1,

                  transition: "all 0.25s ease",
                }}
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    <span>Send</span>
                    <Send size={18} strokeWidth={2.2} />
                  </>
                )}
              </button>


              {status === "sent"  && <p style={{ color: "#00cea8", fontSize: "14px", fontWeight: 600 }}>Message sent! I will reply soon.</p>}
              {status === "error" && <p style={{ color: "#f87171", fontSize: "14px" }}>Error — email me at <a href={"mailto:" + about.email} style={{ color: "#f87171" }}>{about.email}</a></p>}
            </form>
          </div>

          {/* Right: Moon + links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Moon — transparent, blends into page */}
            <div className="kp-moon-wrap" style={{ height: "320px", position: "relative" }}>
              <Suspense fallback={<div style={{ width: "100%", height: "100%" }} />}>
                <MoonCanvas />
              </Suspense>
            </div>

            {/* Open to work */}
            <div style={{ backgroundColor: "#151030", border: "1px solid rgba(145,94,255,0.2)", borderRadius: "14px", padding: "16px 20px", position: "relative", overflow: "hidden" }}>
              <p style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Let us work together</p>
              <p style={{ color: "#aaa6c3", fontSize: "13px", lineHeight: 1.6 }}>Open to internships, research projects, freelance projects and, full time roles.</p>
            </div>

            {/* Links */}
            {contactLinks.map((item) => (
              <a key={item.label} href={item.href}
                target={item.label === "Email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#151030", border: "1px solid rgba(145,94,255,0.15)", borderRadius: "12px", padding: "13px 18px", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = item.color; el.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(145,94,255,0.15)"; el.style.transform = "translateX(0)"; }}
              >
                <span style={{ color: "#aaa6c3", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: item.color, fontSize: "13px", fontWeight: 600 }}>{item.value} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;