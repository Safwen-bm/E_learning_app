const points = [
  {
    title: "Structured courses",
    body: "Follow clear chapters instead of random videos.",
  },
  {
    title: "Real progress",
    body: "Pick up where you left off and see exactly what you've completed.",
  },
  {
    title: "Learn from instructors",
    body: "Practical courses built by people who know their subject.",
  },
];

export const WhyAcademyx = () => {
  return (
    <section className="chalk-texture bg-marketing-bgDeep">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="font-display text-3xl text-marketing-chalk md:text-4xl">
            Learn without the noise
          </h2>
          <p className="mt-4 max-w-md text-marketing-chalkDim">
            No endless feed deciding what you watch next. A course, its
            chapters, and a progress bar that tells you where you stand.
          </p>
        </div>

        <div className="divide-y divide-marketing-line border-y border-marketing-line">
          {points.map((point) => (
            <div key={point.title} className="py-6">
              <p className="font-display text-xl text-marketing-chalk">
                {point.title}
              </p>
              <p className="mt-2 text-marketing-chalkDim">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};