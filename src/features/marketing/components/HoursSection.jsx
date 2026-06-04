import { hours } from "@/src/features/marketing/content";

export function HoursSection() {
  return (
    <section className="hoursSection" id="hours">
      <div className="sectionIntro">
        <p className="sectionLabel">Saatler</p>
        <h2>Haftanı planlamadan önce açık saatleri kontrol et.</h2>
        <p>
          Rehber kaynaklarda görünen çalışma saatleri aşağıda. Resmi tatil ve özel günlerde telefonla teyit etmek en
          sağlıklısı.
        </p>
      </div>

      <div className="hoursGrid">
        {hours.map(([day, time]) => (
          <article key={day} className={time === "Kapalı" ? "hourItem closed" : "hourItem"}>
            <strong>{day}</strong>
            <span>{time}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
