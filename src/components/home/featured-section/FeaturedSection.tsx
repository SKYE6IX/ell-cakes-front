import { OrderDirection } from "@/types/__generated__/graphql";
import { PreloadQuery } from "@/ApolloClient";
import { GET_FEATURED_PRODUCTS_QUERY } from "../operation";
import FeaturedProducts from "./FeaturedProducts";
import "./feature-section.scss";

const TAKE_FILLINGS_NUM = 1;
const TAKE_VARIANTS_NUM = 1;
const TAKE_FEATURED_PRODUCTS = 8;
function FeaturedSection() {
  return (
    <section className="featured-section">
      <h3 className="featured__title">
        ВСЕ, ЧТО НУЖНО ДЛЯ УДОВЛЕТВОРЕНИЯ САМОГО ИЗЫСКАННОГО ВКУСА
      </h3>
      <h5 className="featured__sub-title">
        МЫ ПРЕДЛАГАЕМ ТОЛЬКО СВЕЖИЕ ИНГРЕДИЕНТЫ И САМЫЕ ЛУЧШИЕ РЕЦЕПТЫ!
      </h5>
      <div className="featured__products-wrapper">
        <PreloadQuery
          query={GET_FEATURED_PRODUCTS_QUERY}
          variables={{
            takeFeaturedProducts: TAKE_FEATURED_PRODUCTS,
            takeFillings: TAKE_FILLINGS_NUM,
            takeVariants: TAKE_VARIANTS_NUM,
            variantsOrderBy: [{ price: OrderDirection.Asc }],
            imagesOrderBy: [{ id: OrderDirection.Asc }],
          }}
        >
          <FeaturedProducts />
        </PreloadQuery>
      </div>
    </section>
  );
}

export default FeaturedSection;
