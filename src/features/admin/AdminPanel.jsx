"use client";

import { useEffect, useMemo, useState } from "react";

import { calculateMembershipEndDate } from "@/src/features/members/domain/membershipDates";
import {
  memberStatuses,
  resolveMembershipStatus
} from "@/src/features/members/domain/memberStatus";

const defaultPlanOptions = Object.freeze([
  { value: "monthly", label: "1 Aylık", durationMonths: 1, priceField: "monthly_price", price: 2500 },
  { value: "quarterly", label: "3 Aylık", durationMonths: 3, priceField: "quarterly_price", price: 7000 },
  { value: "semiannual", label: "6 Aylık", durationMonths: 6, priceField: "semiannual_price", price: 13500 },
  { value: "yearly", label: "1 Yıllık", durationMonths: 12, priceField: "yearly_price", price: 24000 }
]);

const paymentStatuses = Object.freeze({
  PAID: "paid",
  UNPAID: "unpaid"
});

const adminViews = Object.freeze({
  OVERVIEW: "overview",
  MEMBERS: "members",
  EXPIRED: "expired",
  PRICING: "pricing"
});

const adminViewItems = Object.freeze([
  { id: adminViews.OVERVIEW, label: "Panel" },
  { id: adminViews.MEMBERS, label: "Üyeler" },
  { id: adminViews.EXPIRED, label: "Pasif üyeler" },
  { id: adminViews.PRICING, label: "Fiyatlar" }
]);

const adminViewTitles = Object.freeze({
  [adminViews.OVERVIEW]: {
    eyebrow: "Panel",
    title: "Ödeme ve ciro takibi"
  },
  [adminViews.MEMBERS]: {
    eyebrow: "Üye yönetimi",
    title: "Üye ekleme, arama ve güncelleme"
  },
  [adminViews.EXPIRED]: {
    eyebrow: "Pasif üyeler",
    title: "Süresi biten üyelikler"
  },
  [adminViews.PRICING]: {
    eyebrow: "Fiyat yönetimi",
    title: "Paket fiyatları"
  }
});

const todayValue = () => new Date().toISOString().slice(0, 10);

function getViewFromHash(hash) {
  const normalizedHash = hash.replace("#", "");

  return adminViewItems.some((item) => item.id === normalizedHash) ? normalizedHash : adminViews.OVERVIEW;
}

const mockMembers = [
  {
    id: "BF-1001",
    fullName: "Mert Kaya",
    phone: "0532 123 45 67",
    email: "mert.kaya@example.com",
    plan: "monthly",
    membershipStartDate: "2026-06-04",
    membershipEndDate: "2026-07-04",
    price: 2500,
    paymentStatus: "paid",
    notes: "Sabah grup derslerine katılıyor."
  },
  {
    id: "BF-1002",
    fullName: "Elif Demir",
    phone: "0541 222 33 44",
    email: "elif.demir@example.com",
    plan: "yearly",
    membershipStartDate: "2026-02-10",
    membershipEndDate: "2027-02-10",
    price: 24000,
    paymentStatus: "paid",
    notes: "Yıllık üyelik, PT talebi olabilir."
  },
  {
    id: "BF-1003",
    fullName: "Can Yıldız",
    phone: "0553 444 55 66",
    email: "can.yildiz@example.com",
    plan: "monthly",
    membershipStartDate: "2026-04-22",
    membershipEndDate: "2026-05-22",
    price: 2500,
    paymentStatus: "unpaid",
    notes: "Süresi bitti, arama yapılacak."
  },
  {
    id: "BF-1004",
    fullName: "Ayşe Arslan",
    phone: "0505 777 88 99",
    email: "ayse.arslan@example.com",
    plan: "quarterly",
    membershipStartDate: "2026-06-01",
    membershipEndDate: "2026-09-01",
    price: 7000,
    paymentStatus: "paid",
    notes: "3 aylık paket, akşam seansını tercih ediyor."
  },
  {
    id: "BF-1005",
    fullName: "Burak Şahin",
    phone: "0538 111 22 33",
    email: "burak.sahin@example.com",
    plan: "semiannual",
    membershipStartDate: "2025-11-18",
    membershipEndDate: "2026-05-18",
    price: 13000,
    paymentStatus: "paid",
    notes: "6 aylık paket, yenileme teklifi gönderilecek."
  }
];

function toClientMember(member) {
  return {
    id: String(member.id),
    fullName: member.fullName ?? member.full_name ?? "",
    phone: member.phone ?? "",
    email: member.email ?? "",
    plan: member.plan ?? member.membership_type ?? "monthly",
    membershipStartDate: member.membershipStartDate ?? member.membership_start_date ?? todayValue(),
    membershipEndDate: member.membershipEndDate ?? member.membership_end_date ?? "",
    price: Number(member.price ?? member.price_amount ?? 0),
    paymentStatus: member.paymentStatus ?? member.payment_status ?? paymentStatuses.PAID,
    notes: member.notes ?? "",
    cancelled: member.status === memberStatuses.CANCELLED
  };
}

function getDefaultForm(plans = defaultPlanOptions) {
  const defaultPlan = plans[0];
  const startDate = todayValue();

  return {
    fullName: "",
    phone: "",
    email: "",
    plan: defaultPlan.value,
    membershipStartDate: startDate,
    price: defaultPlan.price,
    paymentStatus: paymentStatuses.PAID,
    notes: ""
  };
}

function findPlan(planValue, plans = defaultPlanOptions) {
  return plans.find((plan) => plan.value === planValue) ?? plans[0];
}

function toDateValue(date) {
  return date.toISOString().slice(0, 10);
}

function getMembershipEndDate(startDate, planValue, plans = defaultPlanOptions) {
  if (!startDate) {
    return "";
  }

  return toDateValue(calculateMembershipEndDate(startDate, findPlan(planValue, plans).durationMonths));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function sanitizePriceInput(value) {
  const onlyDigits = String(value).replace(/\D/g, "");

  if (!onlyDigits) {
    return "";
  }

  return onlyDigits.replace(/^0+(?=\d)/, "");
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function getStatusLabel(status) {
  if (status === memberStatuses.EXPIRED) {
    return "Pasif";
  }

  if (status === memberStatuses.CANCELLED) {
    return "İptal";
  }

  return "Aktif";
}

function isSameMonth(dateValue, now) {
  const date = new Date(dateValue);

  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

function isSameYear(dateValue, now) {
  return new Date(dateValue).getFullYear() === now.getFullYear();
}

function daysBetween(startValue, endValue) {
  const dayMs = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.ceil((new Date(endValue).getTime() - new Date(startValue).getTime()) / dayMs));
}

function getRemainingMembershipLabel(member, now) {
  if (member.status === memberStatuses.CANCELLED) {
    return "İptal";
  }

  if (member.status === memberStatuses.EXPIRED) {
    return "Süresi bitti";
  }

  const remainingDays = daysBetween(now, member.membershipEndDate);

  if (remainingDays === 0) {
    return "Bugün bitiyor";
  }

  return `${remainingDays} gün kaldı`;
}

function createRevenueMonths(now) {
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);

    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: new Intl.DateTimeFormat("tr-TR", { month: "short" }).format(date),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  });
}

async function parseApiResponse(response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || "Islem tamamlanamadi.");
  }

  return result;
}

function getPricingPayload(plans) {
  return plans.reduce(
    (payload, plan) => ({
      ...payload,
      [plan.priceField]: Number(plan.price) || 0
    }),
    {}
  );
}

export function AdminPanel({
  initialView = adminViews.OVERVIEW,
  initialMembers: initialMemberRecords = mockMembers,
  initialPlans = defaultPlanOptions
}) {
  const safeInitialPlans = initialPlans.length > 0 ? initialPlans : defaultPlanOptions;
  const [activeView, setActiveView] = useState(initialView);
  const [members, setMembers] = useState(() => initialMemberRecords.map(toClientMember));
  const [plans, setPlans] = useState(safeInitialPlans);
  const [form, setForm] = useState(() => getDefaultForm(safeInitialPlans));
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [expiredQuery, setExpiredQuery] = useState("");
  const [expiredPlanFilter, setExpiredPlanFilter] = useState("all");
  const [expiredPaymentFilter, setExpiredPaymentFilter] = useState("all");
  const [savingAction, setSavingAction] = useState("");

  const now = useMemo(() => new Date(), []);
  const previewEndDate = getMembershipEndDate(form.membershipStartDate, form.plan, plans);
  const activeViewTitle = adminViewTitles[activeView];

  useEffect(() => {
    setActiveView(window.location.hash ? getViewFromHash(window.location.hash) : initialView);

    function syncHashView() {
      setActiveView(window.location.hash ? getViewFromHash(window.location.hash) : initialView);
    }

    window.addEventListener("hashchange", syncHashView);

    return () => window.removeEventListener("hashchange", syncHashView);
  }, [initialView]);

  const enrichedMembers = useMemo(
    () =>
      members.map((member) => ({
        ...member,
        status: resolveMembershipStatus({
          cancelled: member.cancelled,
          endDate: member.membershipEndDate,
          now
        })
      })),
    [members, now]
  );

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

    return enrichedMembers.filter((member) => {
      const matchesQuery =
        !normalizedQuery ||
        member.fullName.toLocaleLowerCase("tr-TR").includes(normalizedQuery) ||
        member.phone.includes(normalizedQuery) ||
        member.email.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      const matchesPlan = planFilter === "all" || member.plan === planFilter;
      const matchesPayment = paymentFilter === "all" || member.paymentStatus === paymentFilter;

      return matchesQuery && matchesPlan && matchesPayment;
    });
  }, [enrichedMembers, paymentFilter, planFilter, query]);

  const activeMembers = enrichedMembers.filter((member) => member.status === memberStatuses.ACTIVE);
  const expiredMembers = enrichedMembers.filter((member) => member.status === memberStatuses.EXPIRED);
  const paidMembers = enrichedMembers.filter((member) => member.paymentStatus === paymentStatuses.PAID);
  const unpaidMembers = enrichedMembers.filter((member) => member.paymentStatus === paymentStatuses.UNPAID);

  const filteredExpiredMembers = useMemo(() => {
    const normalizedQuery = expiredQuery.trim().toLocaleLowerCase("tr-TR");

    return expiredMembers.filter((member) => {
      const matchesQuery =
        !normalizedQuery ||
        member.fullName.toLocaleLowerCase("tr-TR").includes(normalizedQuery) ||
        member.phone.includes(normalizedQuery) ||
        member.email.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      const matchesPlan = expiredPlanFilter === "all" || member.plan === expiredPlanFilter;
      const matchesPayment =
        expiredPaymentFilter === "all" || member.paymentStatus === expiredPaymentFilter;

      return matchesQuery && matchesPlan && matchesPayment;
    });
  }, [expiredMembers, expiredPaymentFilter, expiredPlanFilter, expiredQuery]);

  const revenueSummary = useMemo(() => {
    const paidTotal = paidMembers.reduce((total, member) => total + Number(member.price), 0);
    const monthlyTotal = paidMembers
      .filter((member) => isSameMonth(member.membershipStartDate, now))
      .reduce((total, member) => total + Number(member.price), 0);
    const yearlyTotal = paidMembers
      .filter((member) => isSameYear(member.membershipStartDate, now))
      .reduce((total, member) => total + Number(member.price), 0);
    const unpaidTotal = unpaidMembers.reduce((total, member) => total + Number(member.price), 0);

    return { paidTotal, monthlyTotal, yearlyTotal, unpaidTotal };
  }, [now, paidMembers, unpaidMembers]);

  const revenueMonths = useMemo(() => {
    const months = createRevenueMonths(now).map((month) => {
      const total = paidMembers
        .filter((member) => {
          const date = new Date(member.membershipStartDate);
          return date.getMonth() === month.month && date.getFullYear() === month.year;
        })
        .reduce((sum, member) => sum + Number(member.price), 0);

      return { ...month, total };
    });
    const maxTotal = Math.max(...months.map((month) => month.total), 1);
    const chartWidth = 600;
    const chartHeight = 220;
    const paddingX = 42;
    const paddingTop = 24;
    const paddingBottom = 36;
    const usableWidth = chartWidth - paddingX * 2;
    const usableHeight = chartHeight - paddingTop - paddingBottom;

    return months.map((month, index) => ({
      ...month,
      x: paddingX + (usableWidth / Math.max(months.length - 1, 1)) * index,
      y: paddingTop + usableHeight - (Number(month.total) / maxTotal) * usableHeight
    }));
  }, [now, paidMembers]);

  const revenueLinePoints = revenueMonths.map((month) => `${month.x},${month.y}`).join(" ");

  function updateForm(field, value) {
    setForm((current) => {
      if (field === "plan") {
        return { ...current, plan: value, price: findPlan(value, plans).price };
      }

      if (field === "price") {
        return { ...current, price: sanitizePriceInput(value) };
      }

      return { ...current, [field]: value };
    });
  }

  function resetForm() {
    setEditingMemberId(null);
    setForm(getDefaultForm(plans));
  }

  function changeView(viewId) {
    setActiveView(viewId);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `${window.location.pathname}#${viewId}`);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      membershipEndDate: getMembershipEndDate(form.membershipStartDate, form.plan, plans)
    };

    try {
      setSavingAction("member");

      const response = await fetch(editingMemberId ? `/api/admin/members/${editingMemberId}` : "/api/admin/members", {
        method: editingMemberId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await parseApiResponse(response);
      const savedMember = toClientMember(result.member);

      if (editingMemberId) {
        setMembers((current) =>
          current.map((member) => (member.id === editingMemberId ? savedMember : member))
        );
      } else {
        setMembers((current) => [savedMember, ...current]);
      }

      resetForm();
    } catch (error) {
      window.alert(error.message);
    } finally {
      setSavingAction("");
    }
  }

  function editMember(member) {
    changeView(adminViews.MEMBERS);
    const currentPlanPrice = findPlan(member.plan, plans).price;
    setEditingMemberId(member.id);
    setForm({
      fullName: member.fullName,
      phone: member.phone,
      email: member.email,
      plan: member.plan,
      membershipStartDate: member.membershipStartDate,
      price: member.status === memberStatuses.EXPIRED ? currentPlanPrice : member.price,
      paymentStatus: member.paymentStatus,
      notes: member.notes
    });
  }

  function renewMember(member) {
    const plan = findPlan(member.plan, plans);
    const startDate = todayValue();

    changeView(adminViews.MEMBERS);
    setEditingMemberId(member.id);
    setForm({
      fullName: member.fullName,
      phone: member.phone,
      email: member.email,
      plan: plan.value,
      membershipStartDate: startDate,
      price: plan.price,
      paymentStatus: paymentStatuses.PAID,
      notes: member.notes
    });
  }

  async function togglePayment(memberId) {
    const member = members.find((item) => item.id === memberId);

    if (!member) {
      return;
    }

    const payload = {
      ...member,
      paymentStatus:
        member.paymentStatus === paymentStatuses.PAID ? paymentStatuses.UNPAID : paymentStatuses.PAID
    };

    try {
      setSavingAction(`payment-${memberId}`);

      const response = await fetch(`/api/admin/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await parseApiResponse(response);
      const savedMember = toClientMember(result.member);

      setMembers((current) => current.map((item) => (item.id === memberId ? savedMember : item)));
    } catch (error) {
      window.alert(error.message);
    } finally {
      setSavingAction("");
    }
  }

  async function removeMember(memberId) {
    try {
      setSavingAction(`delete-${memberId}`);

      const response = await fetch(`/api/admin/members/${memberId}`, { method: "DELETE" });
      await parseApiResponse(response);

      setMembers((current) => current.filter((member) => member.id !== memberId));

      if (editingMemberId === memberId) {
        resetForm();
      }
    } catch (error) {
      window.alert(error.message);
    } finally {
      setSavingAction("");
    }
  }

  async function savePlanPrices(nextPlans = plans) {
    try {
      setSavingAction("pricing");

      const response = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getPricingPayload(nextPlans))
      });
      await parseApiResponse(response);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setSavingAction("");
    }
  }

  function updatePlanPrice(planValue, price) {
    const sanitizedPrice = sanitizePriceInput(price);

    setPlans((current) =>
      current.map((plan) =>
        plan.value === planValue
          ? {
              ...plan,
              price: sanitizedPrice
            }
          : plan
      )
    );

    setForm((current) => (current.plan === planValue ? { ...current, price: sanitizedPrice } : current));
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar" aria-label="Admin menüsü">
        <a className="adminBrand" href="/">
          <span>BF</span>
          <strong>BestForm Gym</strong>
        </a>
        <nav className="adminMenu">
          {adminViewItems.map((item) => (
            <button
              type="button"
              className={activeView === item.id ? "isSelected" : ""}
              onClick={() => changeView(item.id)}
              key={item.id}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="adminMiniSummary">
          <span>Üye durumu</span>
          <div className="adminMiniMetrics">
            <strong>
              {activeMembers.length}
              <small>Aktif</small>
            </strong>
            <strong>
              {expiredMembers.length}
              <small>Pasif</small>
            </strong>
          </div>
          <p>{unpaidMembers.length} üyede ödeme bekliyor.</p>
        </div>
      </aside>

      <section className="adminWorkspace">
        <header className="adminTopbar">
          <div>
            <p className="adminEyebrow">{activeViewTitle.eyebrow}</p>
            <h1>{activeViewTitle.title}</h1>
          </div>
          <a className="adminHomeLink" href="/">
            Siteye dön
          </a>
        </header>

        {activeView === adminViews.OVERVIEW ? (
          <>
            <section className="adminStatsGrid" aria-label="Panel özeti">
              <article className="adminStatCard">
                <span>Toplam ciro</span>
                <strong>{formatCurrency(revenueSummary.paidTotal)}</strong>
                <p>Ödendi durumundaki üyeliklerden hesaplandı.</p>
              </article>
              <article className="adminStatCard">
                <span>Bu ay</span>
                <strong>{formatCurrency(revenueSummary.monthlyTotal)}</strong>
                <p>{new Intl.DateTimeFormat("tr-TR", { month: "long" }).format(now)} tahsilatı.</p>
              </article>
              <article className="adminStatCard">
                <span>Bu yıl</span>
                <strong>{formatCurrency(revenueSummary.yearlyTotal)}</strong>
                <p>{now.getFullYear()} yılı içindeki ödenen üyelikler.</p>
              </article>
              <article className="adminStatCard isWarning">
                <span>Bekleyen ödeme</span>
                <strong>{formatCurrency(revenueSummary.unpaidTotal)}</strong>
                <p>{unpaidMembers.length} üyede ödenmedi işareti var.</p>
              </article>
            </section>

            <section className="adminRevenuePanel" aria-label="Ciro grafiği">
              <div className="adminSectionTitle">
                <div>
                  <p className="adminEyebrow">Ciro</p>
                  <h2>Aylık gelir akışı</h2>
                </div>
                <div className="adminRevenueTotals">
                  {plans.map((plan) => (
                    <span key={plan.value}>
                      {plan.label} üyelik {formatCurrency(plan.price)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="revenueLineChart">
                <svg viewBox="0 0 600 220" role="img" aria-label="Son 6 ay ciro çizgisel grafiği">
                  <path className="lineChartGrid" d="M42 24H558M42 77H558M42 130H558M42 184H558" />
                  <polyline className="lineChartStroke" points={revenueLinePoints} />
                  {revenueMonths.map((month) => (
                    <g key={month.key}>
                      <circle className="lineChartDot" cx={month.x} cy={month.y} r="5" />
                      <text className="lineChartValue" x={month.x} y={Math.max(16, month.y - 12)}>
                        {formatCurrency(month.total)}
                      </text>
                      <text className="lineChartLabel" x={month.x} y="212">
                        {month.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </section>
          </>
        ) : null}

        {activeView === adminViews.MEMBERS ? (
          <section className="adminGrid">
          <section className="adminPanelBlock">
            <div className="adminSectionTitle">
              <div>
                <p className="adminEyebrow">Üye listesi</p>
                <h2>Aktif takip</h2>
              </div>
              <span>{filteredMembers.length} kayıt</span>
            </div>

            <div className="memberFilters">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Üye ara"
                aria-label="Üye ara"
              />
              <select
                value={planFilter}
                onChange={(event) => setPlanFilter(event.target.value)}
                aria-label="Üyelik tipi filtrele"
              >
                <option value="all">Tüm üyelikler</option>
                {plans.map((plan) => (
                  <option value={plan.value} key={plan.value}>
                    {plan.label}
                  </option>
                ))}
              </select>
              <select
                value={paymentFilter}
                onChange={(event) => setPaymentFilter(event.target.value)}
                aria-label="Ödeme durumu filtrele"
              >
                <option value="all">Tüm ödemeler</option>
                <option value={paymentStatuses.PAID}>Ödendi</option>
                <option value={paymentStatuses.UNPAID}>Ödenmedi</option>
              </select>
            </div>

            <div className="memberTableWrap">
              <table className="memberTable">
                <thead>
                  <tr>
                    <th>Üye</th>
                    <th>Üyelik</th>
                    <th>Ödeme</th>
                    <th>Tarih</th>
                    <th>Kalan</th>
                    <th>Durum</th>
                    <th>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className={member.status === memberStatuses.EXPIRED ? "isMuted" : ""}>
                      <td data-label="Üye">
                        <strong>{member.fullName}</strong>
                        <span>{member.phone}</span>
                      </td>
                      <td data-label="Üyelik">
                        <strong>{findPlan(member.plan, plans).label}</strong>
                        <span>{formatCurrency(member.price)}</span>
                      </td>
                      <td data-label="Ödeme">
                        <button
                          type="button"
                          className={`paymentToggle ${member.paymentStatus}`}
                          disabled={savingAction === `payment-${member.id}`}
                          onClick={() => togglePayment(member.id)}
                        >
                          {member.paymentStatus === paymentStatuses.PAID ? "Ödendi" : "Ödenmedi"}
                        </button>
                      </td>
                      <td data-label="Tarih">
                        <strong className="dateRangeText">
                          {formatDate(member.membershipStartDate)} - {formatDate(member.membershipEndDate)}
                        </strong>
                      </td>
                      <td data-label="Kalan">
                        <span className={`remainingPill ${member.status}`}>
                          {getRemainingMembershipLabel(member, now)}
                        </span>
                      </td>
                      <td data-label="Durum">
                        <span className={`statusPill ${member.status}`}>{getStatusLabel(member.status)}</span>
                      </td>
                      <td data-label="İşlem">
                        <div className="tableActions">
                          <button type="button" className="tableAction" onClick={() => editMember(member)}>
                            Güncelle
                          </button>
                          <button
                            type="button"
                            className="dangerButton"
                            disabled={savingAction === `delete-${member.id}`}
                            onClick={() => removeMember(member.id)}
                          >
                            Kaldır
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan="7">
                        <p className="emptyState">Filtreye uygun üye bulunamadı.</p>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>

          <form className="memberForm" onSubmit={handleSubmit}>
            <div className="adminSectionTitle">
              <div>
                <p className="adminEyebrow">{editingMemberId ? "Üye güncelle" : "Üye ekle"}</p>
                <h2>{editingMemberId ? "Üyelik bilgilerini düzenle" : "Yeni üye kaydı"}</h2>
              </div>
            </div>

            <label>
              Ad soyad
              <input
                value={form.fullName}
                onChange={(event) => updateForm("fullName", event.target.value)}
                placeholder="Üye adı"
                required
              />
            </label>
            <label>
              Telefon
              <input
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                placeholder="05xx xxx xx xx"
                required
              />
            </label>
            <label>
              E-posta
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                placeholder="uye@example.com"
              />
            </label>
            <label>
              Üyelik tipi
              <select value={form.plan} onChange={(event) => updateForm("plan", event.target.value)}>
                {plans.map((plan) => (
                  <option value={plan.value} key={plan.value}>
                    {plan.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="dateRangeField">
              <label>
                Başlangıç tarihi
                <input
                  type="date"
                  value={form.membershipStartDate}
                  onChange={(event) => updateForm("membershipStartDate", event.target.value)}
                  required
                />
              </label>
              <label>
                Bitiş tarihi
                <input value={formatDate(previewEndDate)} readOnly />
              </label>
            </div>
            <label>
              Ücret
              <input
                type="number"
                min="0"
                step="100"
                value={form.price}
                onChange={(event) => updateForm("price", event.target.value)}
                required
              />
            </label>
            <label>
              Ödeme durumu
              <select
                value={form.paymentStatus}
                onChange={(event) => updateForm("paymentStatus", event.target.value)}
              >
                <option value={paymentStatuses.PAID}>Ödendi</option>
                <option value={paymentStatuses.UNPAID}>Ödenmedi</option>
              </select>
            </label>
            <label className="formWide">
              Not
              <textarea
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
                placeholder="Üyelik notu"
              />
            </label>
            <div className="formActions">
              <button type="submit" className="adminPrimaryButton" disabled={savingAction === "member"}>
                {editingMemberId ? "Güncelle" : "Üye ekle"}
              </button>
              {editingMemberId ? (
                <button type="button" className="adminGhostButton" onClick={resetForm}>
                  Vazgeç
                </button>
              ) : null}
            </div>
          </form>
          </section>
        ) : null}

        {activeView === adminViews.EXPIRED ? (
          <section className="adminPanelBlock">
            <div className="adminSectionTitle">
              <div>
                <p className="adminEyebrow">Pasif panel</p>
                <h2>Süresi biten üyeler</h2>
              </div>
              <span>{filteredExpiredMembers.length} pasif kayıt</span>
            </div>

            <div className="expiredLayout">
              <aside className="expiredFilters" aria-label="Pasif üye filtreleri">
                <label>
                  Üye ara
                  <input
                    value={expiredQuery}
                    onChange={(event) => setExpiredQuery(event.target.value)}
                    placeholder="Ad, telefon veya e-posta"
                  />
                </label>
                <label>
                  Üyelik tipi
                  <select
                    value={expiredPlanFilter}
                    onChange={(event) => setExpiredPlanFilter(event.target.value)}
                  >
                    <option value="all">Tüm üyelikler</option>
                    {plans.map((plan) => (
                      <option value={plan.value} key={plan.value}>
                        {plan.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Ödeme
                  <select
                    value={expiredPaymentFilter}
                    onChange={(event) => setExpiredPaymentFilter(event.target.value)}
                  >
                    <option value="all">Tüm ödemeler</option>
                    <option value={paymentStatuses.PAID}>Ödendi</option>
                    <option value={paymentStatuses.UNPAID}>Ödenmedi</option>
                  </select>
                </label>
              </aside>

              <div className="expiredMemberGrid">
                {filteredExpiredMembers.map((member) => (
                  <article className="expiredMember" key={member.id}>
                    <div>
                      <strong>{member.fullName}</strong>
                      <span>{member.phone}</span>
                    </div>
                    <p>
                      Üyelik {formatDate(member.membershipEndDate)} tarihinde bitti.{" "}
                      {daysBetween(member.membershipEndDate, now)} gündür pasif.
                    </p>
                    <div className="expiredActions">
                      <button type="button" className="adminPrimaryButton" onClick={() => renewMember(member)}>
                        Yenile
                      </button>
                      <button type="button" className="adminGhostButton" onClick={() => editMember(member)}>
                        Düzenle
                      </button>
                    </div>
                  </article>
                ))}
                {filteredExpiredMembers.length === 0 ? (
                  <p className="emptyState">Filtreye uygun pasif üye bulunamadı.</p>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {activeView === adminViews.PRICING ? (
          <section className="adminPanelBlock">
            <div className="adminSectionTitle">
              <div>
                <p className="adminEyebrow">Paket fiyatları</p>
                <h2>1, 3, 6 ve 12 aylık ücretler</h2>
              </div>
            </div>
            <div className="pricingStrip">
              {plans.map((plan) => (
                <article key={plan.value}>
                  <label className="priceControl">
                    <span>{plan.label} fiyat</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={plan.price}
                      onBlur={() => savePlanPrices()}
                      onChange={(event) => updatePlanPrice(plan.value, event.target.value)}
                    />
                  </label>
                  <strong>{formatCurrency(plan.price)}</strong>
                  <p>{plan.durationMonths} aylık üyelik süresi formda otomatik bitiş tarihi üretir.</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
