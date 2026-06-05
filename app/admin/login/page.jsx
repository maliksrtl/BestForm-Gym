const errorMessages = {
  invalid: "E-posta veya şifre hatalı.",
  missing: "E-posta ve şifre zorunlu.",
  unauthorized: "Bu kullanıcı admin paneline yetkili değil.",
  config: "Supabase bağlantı ayarları eksik.",
  "missing-config": "Supabase bağlantı ayarları eksik.",
  "login-required": "Devam etmek için admin girişi yapmalısın.",
  "session-expired": "Güvenlik için oturum süresi doldu. Lütfen tekrar giriş yap.",
  default: "Giriş sırasında hata oluştu."
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <main className="adminLoginPage">
      <section className="loginPanel">
        <p className="adminKicker">Admin girişi</p>
        <h1>BESTFORM yönetim paneli</h1>
        <p className="adminMuted">Üye, ödeme ve paket yönetimi için yetkili giriş yap.</p>

        {error ? <p className="adminAlert">{errorMessages[error] || errorMessages.default}</p> : null}

        <form className="adminForm" action="/api/admin/login" method="post">
          <label>
            E-posta
            <input name="email" type="email" required placeholder="admin@example.com" autoComplete="email" />
          </label>
          <label>
            Şifre
            <input
              name="password"
              type="password"
              required
              placeholder="Şifren"
              autoComplete="current-password"
            />
          </label>
          <button type="submit">Panele giriş yap</button>
        </form>

        <a className="adminGhostLink" href="/">
          Siteye dön
        </a>
      </section>
    </main>
  );
}
