import AboutMedia from "./about-media/AboutMedia";
import "./about.scss";

const aboutImages: Record<
  "intro" | "principles" | "aesthetics" | "awards",
  string | null
> = {
  intro: null,
  principles: null,
  aesthetics: null,
  awards: null,
};

const stats = [
  { value: "14 лет", label: "опыта" },
  { value: "20 000+", label: "выполненных заказов" },
];

const principles = [
  "натуральные и премиальные составы",
  "высокое качество ингредиентов",
  "внимание к деталям",
  "искренняя любовь к своему делу",
];

const awards = [
  {
    name: "Expert RF",
    description:
      "Награда как лучшему предпринимателю в кондитерской сфере, а также благодарственное письмо от Государственной Думы (партия «Новые люди») за вклад в развитие кондитерского дела и высокие стандарты качества.",
  },
  {
    name: "I’m Famous Award",
    description:
      "Международная светская и деловая премия, объединяющая представителей бизнеса, творческих индустрий, артистов, блогеров и общественных деятелей. Мы стали обладателями нескольких наград в номинациях, связанных с предпринимательством и званием лучшей кондитерской Москвы, а также выступали партнёром премии, создавая торты для мероприятия.",
  },
];

function About() {
  return (
    <section className="about">
      <div className="about__row">
        <AboutMedia
          src={aboutImages.intro}
          alt="Ell Cakes"
          sizes="(max-width: 912px) 100vw, 50vw"
          className="about__media about__media--square"
        />
        <div className="about__text-wrapper">
          <h2 className="about__title">О нас</h2>
          <p className="about__text">
            Ell Cakes - кондитерская с 14-летней историей, более чем 20 000
            выполненных заказов и собственным взглядом на эстетику десертов.
            Среди наших клиентов - Ксения Собчак, Ксения Бородина, Влад
            Соколовский, Ольга Орлова и другие известные личности.
          </p>
          <p className="about__text">
            За эти годы мы прошли большой путь: накопили опыт, сформировали
            собственный стиль, заслужили доверие клиентов и выросли
            профессионально. Вместе с нами менялись запросы, масштабы проектов и
            представление о том, каким должен быть современный кондитерский
            бренд.
          </p>
          <ul className="about__stats">
            {stats.map((stat) => (
              <li key={stat.value} className="about__stat">
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="about__row about__row--reversed">
        <div className="about__panel">
          <div className="about__polaroid">
            <AboutMedia
              src={aboutImages.principles}
              alt="Ell Cakes"
              sizes="(max-width: 912px) 80vw, 35vw"
              className="about__polaroid-media"
            />
          </div>
        </div>
        <div className="about__text-wrapper">
          <p className="about__text">
            Поэтому мы постоянно работаем над качеством продукта, расширяем
            ассортимент, открываем новые вкусовые сочетания и совершенствуем
            сервис. Мы хотим, чтобы каждый этап взаимодействия с нами - от
            первого обращения до получения заказа - был продуманным, комфортным
            и приятным.
          </p>
          <p className="about__text">
            При этом наши главные принципы остаются неизменными:
          </p>
          <ul className="about__principles">
            {principles.map((principle) => (
              <li key={principle} className="about__principle">
                {principle}
              </li>
            ))}
          </ul>
          <p className="about__text">
            Именно из этих составляющих складывается каждый наш десерт.
          </p>
        </div>
      </div>

      <div className="about__aesthetics">
        <div className="about__centered">
          <p className="about__lead">
            Со временем у Ell Cakes сформировался собственный характер и
            узнаваемый визуальный язык.
          </p>
          <p className="about__text">
            Мы уделяем особое внимание не только вкусу, но и тому, как десерт
            выглядит, как он оформлен и какое впечатление производит. Для нас
            эстетика - это не отдельный элемент, а продолжение качества и
            отношения к своему делу. Она проявляется во всём: от дизайна
            десертов и упаковки до пространства, в котором мы создаём наши
            работы.
          </p>
        </div>
        <AboutMedia
          src={aboutImages.aesthetics}
          alt="Ell Cakes"
          sizes="100vw"
          className="about__media about__media--wide"
        />
      </div>

      <div className="about__row">
        <AboutMedia
          src={aboutImages.awards}
          alt="Ell Cakes"
          sizes="(max-width: 912px) 100vw, 50vw"
          className="about__media about__media--square"
        />
        <div className="about__text-wrapper">
          <p className="about__text">
            Наш профессиональный путь отмечен наградами и признанием на деловом
            и общественном уровне.
          </p>
          <ul className="about__awards">
            {awards.map((award) => (
              <li key={award.name} className="about__award">
                <h3 className="about__award-name">{award.name}</h3>
                <p className="about__award-text">{award.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="about__band">
        <p className="about__band-lead">
          Мы верим, что успех приобретает особую ценность, когда им можно
          делиться.
        </p>
        <p className="about__band-text">
          Поэтому для нас важно не оставаться в стороне и участвовать в добрых
          инициативах. В разные годы мы готовили сладкие угощения для детей и
          мам, оказавшихся в сложных жизненных обстоятельствах.
        </p>
      </div>

      <p className="about__closing">
        Ell Cakes - это 14 лет опыта, постоянное движение вперёд и любовь к
        своему делу. Это внимание к качеству, эстетике и деталям, за которыми
        всегда стоит нечто большее, чем просто десерт.
      </p>
    </section>
  );
}

export default About;
