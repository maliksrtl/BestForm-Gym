export const dynamic = "force-dynamic";

const errorMessages = {
  invalid: "E-posta veya şifre hatalı.",
  missing: "E-posta ve şifre zorunlu.",
  unauthorized: "Bu kullanıcı admin paneline yetkili değil."
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <main className="adminLoginPage">
      <section className="loginPanel">
        <p className="adminKicker">Admin girişi</p>
        <h1>BESTFORM yönetim paneli</h1>
        <p className="adminMuted">
          Form post adresi: <code>/api/admin/login</code>. Aynı kontrol mantığı auth adresi olan{" "}
          <code>/api/admin/auth</code> altında da hazır.
        </p>

        {error && <p className="adminAlert">{errorMessages[error] || "Giriş sırasında hata oluştu."}</p>}

        <form className="adminForm" action="/api/admin/login" method="post">
          <label>
            E-posta
            <input name="email" type="email" required placeholder="admin@example.com" />
          </label>
          <label>
            Şifre
            <input name="password" type="password" required placeholder="••••••••" />
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
