"use client";

import { useEffect, useState } from "react";

const loginErrorMessages = {
  invalid: "E-posta veya sifre hatali.",
  missing: "E-posta ve sifre zorunlu.",
  unauthorized: "Bu kullanici admin paneline yetkili degil.",
  config: "Supabase baglanti ayarlari eksik.",
  "login-required": "Devam etmek icin admin girisi yapmalisin.",
  "session-expired": "Guvenlik icin 20 gun doldu. Lutfen tekrar giris yap.",
  default: "Giris sirasinda hata olustu."
};

export function AdminLoginModal({ errorCode = "", open, onClose }) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setError(errorCode ? loginErrorMessages[errorCode] || loginErrorMessages.default : "");
  }, [errorCode, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.classList.add("modalOpen");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modalOpen");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  async function submitLogin(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: {
          Accept: "application/json"
        }
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(loginErrorMessages[result.error] || loginErrorMessages.default);
        return;
      }

      window.location.href = result.redirectTo || "/admin";
    } catch {
      setError(loginErrorMessages.default);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="adminLoginOverlay" role="presentation" onMouseDown={onClose}>
      <section
        className="adminLoginModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modalCloseButton" type="button" aria-label="Kapat" onClick={onClose}>
          x
        </button>
        <p className="adminEyebrow">Admin girisi</p>
        <h2 id="admin-login-title">Yonetim paneli</h2>
        <form className="adminModalForm" onSubmit={submitLogin}>
          <label>
            E-posta
            <input name="email" type="email" required placeholder="admin@example.com" autoComplete="email" />
          </label>
          <label>
            Sifre
            <input
              name="password"
              type="password"
              required
              placeholder="Sifren"
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="adminModalError">{error}</p> : null}
          <button type="submit" disabled={submitting}>
            {submitting ? "Kontrol ediliyor" : "Panele giris yap"}
          </button>
        </form>
      </section>
    </div>
  );
}
