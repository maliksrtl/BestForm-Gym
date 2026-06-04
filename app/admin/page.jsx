import {
  defaultPricing,
  formatCurrency,
  formatDate,
  getAdminDashboardData,
  getExpiredDays,
  getTodayInputValue
} from "@/src/features/admin/data/adminDashboard";

export const dynamic = "force-dynamic";

function AdminSidebar() {
  const links = [
    ["overview", "Ciro"],
    ["members", "Üyeler"],
    ["expired", "Pasif"],
    ["pricing", "Fiyat"]
  ];

  return (
    <aside className="adminSidebar">
      <div className="adminLogo">BF</div>
      {links.map(([id, label]) => (
        <a key={id} href={`#${id}`}>
          {label}
        </a>
      ))}
      <form action="/api/admin/logout" method="post">
        <button type="submit">Çıkış</button>
      </form>
    </aside>
  );
}

function SiteReturnLink() {
  return (
    <a className="siteReturn" href="/">
      Siteye dön
    </a>
  );
}

function OverviewSection({ totalRevenue, monthRevenue, yearRevenue, unpaidMembers, members, pricing }) {
  const monthlyRevenue = Array.from({ length: 6 }, (_, index) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (5 - index));
    const value = members
      .filter((member) => {
        const createdAt = new Date(member.created_at);
        return (
          member.payment_status === "paid" &&
          createdAt.getMonth() === month.getMonth() &&
          createdAt.getFullYear() === month.getFullYear()
        );
      })
      .reduce((sum, member) => sum + Number(member.price_amount || 0), 0);

    return {
      label: month.toLocaleDateString("tr-TR", { month: "short" }),
      value
    };
  });
  const maxValue = Math.max(...monthlyRevenue.map((item) => item.value), 1);

  return (
    <section className="adminSection" id="overview">
      <div className="adminSectionHead">
        <p className="adminKicker">Panel</p>
        <h1>Ödeme ve ciro takibi</h1>
        <SiteReturnLink />
      </div>

      <div className="metricGrid">
        <article className="metricCard large">
          <span>Toplam ciro</span>
          <strong>{formatCurrency(totalRevenue)}</strong>
          <p>Ödendi durumundaki üyeliklerden hesaplandı.</p>
        </article>
        <article className="metricCard">
          <span>Bu ay</span>
          <strong>{formatCurrency(monthRevenue)}</strong>
          <p>Bu ay kaydedilen tahsilat.</p>
        </article>
        <article className="metricCard">
          <span>Bu yıl</span>
          <strong>{formatCurrency(yearRevenue)}</strong>
          <p>2026 yılı içindeki ödenen üyelikler.</p>
        </article>
        <article className="metricCard warn">
          <span>Bekleyen ödeme</span>
          <strong>{formatCurrency(unpaidMembers.reduce((sum, member) => sum + Number(member.price_amount || 0), 0))}</strong>
          <p>{unpaidMembers.length} üyede ödenmedi işareti var.</p>
        </article>
      </div>

      <div className="adminPanel">
        <div className="panelHeader">
          <div>
            <p className="adminKicker">Ciro</p>
            <h2>Aylık gelir akışı</h2>
          </div>
          <div className="pricePills">
            <span>Aylık üyelik {formatCurrency(pricing.monthly_price)}</span>
            <span>Yıllık üyelik {formatCurrency(pricing.yearly_price)}</span>
          </div>
        </div>
        <div className="barChart">
          {monthlyRevenue.map((item) => (
            <div key={item.label} className="barItem">
              <strong>{formatCurrency(item.value)}</strong>
              <span style={{ height: `${Math.max(16, (item.value / maxValue) * 190)}px` }} />
              <em>{item.label}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberForm({ pricing }) {
  const today = getTodayInputValue();

  return (
    <form className="adminPanel memberForm" action="/api/admin/members" method="post">
      <p className="adminKicker">Üye ekle</p>
      <h2>Yeni üye kaydı</h2>
      <div className="formGrid">
        <label>
          Ad soyad
          <input name="full_name" required placeholder="Üye adı" />
        </label>
        <label>
          Telefon
          <input name="phone" required placeholder="05xx xxx xx xx" />
        </label>
        <label>
          E-posta
          <input name="email" type="email" placeholder="uye@example.com" />
        </label>
        <label>
          Üyelik tipi
          <select name="membership_type" defaultValue="monthly">
            <option value="monthly">Aylık</option>
            <option value="yearly">Yıllık</option>
          </select>
        </label>
        <label>
          Başlangıç tarihi
          <input name="membership_start_date" type="date" defaultValue={today} required />
        </label>
        <label>
          Ücret
          <input name="price_amount" type="number" defaultValue={pricing.monthly_price} required />
        </label>
        <label>
          Ödeme durumu
          <select name="payment_status" defaultValue="paid">
            <option value="paid">Ödendi</option>
            <option value="unpaid">Ödenmedi</option>
          </select>
        </label>
        <label>
          Not
          <input name="notes" placeholder="Opsiyonel not" />
        </label>
      </div>
      <button type="submit">Üyeyi kaydet</button>
    </form>
  );
}

function MembersSection({ members, pricing }) {
  return (
    <section className="adminSection" id="members">
      <div className="adminSectionHead">
        <p className="adminKicker">Üye yönetimi</p>
        <h1>Üye ekleme, arama ve güncelleme</h1>
        <SiteReturnLink />
      </div>
      <div className="memberGrid">
        <MemberForm pricing={pricing} />
        <div className="adminPanel">
          <div className="panelHeader">
            <div>
              <p className="adminKicker">Üye listesi</p>
              <h2>Aktif takip</h2>
            </div>
            <span>{members.length} kayıt</span>
          </div>
          <div className="tableFilters">
            <input placeholder="Üye ara" />
            <select defaultValue="all">
              <option value="all">Tüm üyelikler</option>
              <option value="monthly">Aylık</option>
              <option value="yearly">Yıllık</option>
            </select>
            <select defaultValue="all">
              <option value="all">Tüm ödemeler</option>
              <option value="paid">Ödendi</option>
              <option value="unpaid">Ödenmedi</option>
            </select>
          </div>
          <div className="memberTable">
            {members.map((member) => (
              <article key={member.id} className="memberRow">
                <div>
                  <strong>{member.full_name}</strong>
                  <span>{member.phone}</span>
                </div>
                <div>
                  <strong>{member.membership_type === "yearly" ? "Yıllık" : "Aylık"}</strong>
                  <span>{formatCurrency(member.price_amount)}</span>
                </div>
                <span className={member.payment_status === "paid" ? "statusPill paid" : "statusPill unpaid"}>
                  {member.payment_status === "paid" ? "Ödendi" : "Ödenmedi"}
                </span>
                <div>
                  <strong>{formatDate(member.membership_start_date)}</strong>
                  <span>{formatDate(member.membership_end_date)}</span>
                </div>
                <span className={member.status === "active" ? "statusPill active" : "statusPill passive"}>
                  {member.status === "active" ? "Aktif" : "Pasif"}
                </span>
                <a className="outlineButton" href="#members">
                  Güncelle
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpiredSection({ expiredMembers, pricing }) {
  return (
    <section className="adminSection" id="expired">
      <div className="adminSectionHead">
        <p className="adminKicker">Pasif üyeler</p>
        <h1>Süresi biten üyelikler</h1>
        <SiteReturnLink />
      </div>
      <div className="expiredLayout">
        <div className="adminPanel filtersPanel">
          <p className="adminKicker">Pasif panel</p>
          <h2>Süresi biten üyeler</h2>
          <label>
            Üye ara
            <input placeholder="Ad, telefon veya e-posta" />
          </label>
          <label>
            Üyelik tipi
            <select defaultValue="all">
              <option value="all">Tüm üyelikler</option>
              <option value="monthly">Aylık</option>
              <option value="yearly">Yıllık</option>
            </select>
          </label>
          <label>
            Ödeme
            <select defaultValue="all">
              <option value="all">Tüm ödemeler</option>
              <option value="paid">Ödendi</option>
              <option value="unpaid">Ödenmedi</option>
            </select>
          </label>
        </div>
        <div className="expiredCards">
          <span>{expiredMembers.length} pasif kayıt</span>
          {expiredMembers.map((member) => (
            <article key={member.id} className="expiredCard">
              <h3>{member.full_name}</h3>
              <p>{member.phone}</p>
              <p>
                Üyelik {formatDate(member.membership_end_date)} tarihinde bitti.
                <br />
                {getExpiredDays(member)} gündür pasif.
              </p>
              <div className="cardActions">
                <form action={`/api/admin/members/${member.id}/renew`} method="post">
                  <input type="hidden" name="membership_type" value={member.membership_type} />
                  <input
                    type="hidden"
                    name="price_amount"
                    value={member.membership_type === "yearly" ? pricing.yearly_price : pricing.monthly_price}
                  />
                  <button type="submit">Yenile</button>
                </form>
                <a href="#members">Düzenle</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ pricing }) {
  return (
    <section className="adminSection" id="pricing">
      <div className="adminSectionHead">
        <p className="adminKicker">Fiyat yönetimi</p>
        <h1>Aylık ve yıllık fiyatlar</h1>
        <SiteReturnLink />
      </div>
      <form className="adminPanel pricingForm" action="/api/admin/pricing" method="post">
        <p className="adminKicker">Paket fiyatları</p>
        <h2>Aylık ve yıllık ücretler</h2>
        <div className="pricingCards">
          <label>
            Aylık fiyat
            <input name="monthly_price" type="number" defaultValue={pricing.monthly_price} required />
            <strong>{formatCurrency(pricing.monthly_price)}</strong>
            <span>1 aylık üyelik süresi formda otomatik bitiş tarihi üretir.</span>
          </label>
          <label>
            Yıllık fiyat
            <input name="yearly_price" type="number" defaultValue={pricing.yearly_price} required />
            <strong>{formatCurrency(pricing.yearly_price)}</strong>
            <span>12 aylık üyelik süresi formda otomatik bitiş tarihi üretir.</span>
          </label>
        </div>
        <button type="submit">Fiyatları kaydet</button>
      </form>
    </section>
  );
}

export default async function AdminPage() {
  const data = await getAdminDashboardData();
  const pricing = data.pricing || defaultPricing;

  return (
    <main className="adminShell">
      <AdminSidebar />
      <div className="adminMain">
        {data.schemaError && (
          <div className="adminAlert">
            Supabase şeması hazır değil: <strong>{data.schemaError}</strong>. Migration SQL'i Supabase SQL Editor'da
            çalıştır.
          </div>
        )}
        <OverviewSection {...data} pricing={pricing} />
        <MembersSection members={data.members} pricing={pricing} />
        <ExpiredSection expiredMembers={data.expiredMembers} pricing={pricing} />
        <PricingSection pricing={pricing} />
      </div>
    </main>
  );
}
