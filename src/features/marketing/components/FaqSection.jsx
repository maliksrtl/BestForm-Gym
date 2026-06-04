import { faqs } from "@/src/features/marketing/content";

export function FaqSection({ openFaq, onFaqToggle }) {
  return (
    <section className="faqSection">
      <div className="sectionIntro">
        <p className="sectionLabel">SSS</p>
        <h2>Başlamadan önce.</h2>
      </div>
      <div className="faqList">
        {faqs.map(([question, answer], index) => (
          <button
            key={question}
            type="button"
            className="faqItem"
            aria-expanded={openFaq === index}
            onClick={() => onFaqToggle(index)}
          >
            <span>{question}</span>
            <strong>{openFaq === index ? "-" : "+"}</strong>
            {openFaq === index && <p>{answer}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}
