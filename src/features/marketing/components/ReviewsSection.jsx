import { reviews } from "@/src/features/marketing/content";

export function ReviewsSection() {
  return (
    <section className="reviewsSection" id="reviews">
      <div className="sectionIntro">
        <p className="sectionLabel">Üye yorumları</p>
        <h2>Adana'da spor salonu arayanların dikkat ettiği şeyler burada: ilgi, ekipman, temizlik ve güven.</h2>
      </div>
      <div className="reviewGrid">
        {reviews.map((review) => (
          <article key={review.name} className="reviewCard">
            <p>{review.text}</p>
            <div>
              <strong>{review.name}</strong>
              <span>{review.result}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
