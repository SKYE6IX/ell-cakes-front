"use client";
import { useQuery } from "@apollo/client/react";
import CustomImage from "@/components/custom-image/CustomImage";
import { GET_REVEIW_QUERY } from "../operation";
import "./review.scss";

function Reviews() {
  const { data } = useQuery(GET_REVEIW_QUERY);

  const reviews = data?.reviews ?? [];
  const canScroll = reviews.length > 4;

  if (reviews.length < 1) return null;

  return (
    <section className="review-section">
      <div className="review-section__header">
        <h3 className="review-section__header-title">Отзывы</h3>
      </div>

      <div className="review-section__body">
        <div
          className={["review-section__testimonial", canScroll ? "scroll" : ""].join(" ")}
          aria-label="Testmonial list, scroll sideway"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="review-section__testimonial-item"
              data-testid="review-item"
            >
              <h4 className="review-section__testimonial-title">{review.user}</h4>
              <div className="review-section__testimonial-media">
                <CustomImage src={review.image?.url ?? ""} fill alt={review.user ?? ""} preload />
              </div>
              <p className="review-section__testimonial-description">{review.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
