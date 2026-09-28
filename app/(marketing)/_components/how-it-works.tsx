const steps = [
  {
    number: "1",
    title: "Pick a course",
    body: "Search by topic or browse by category. Every course shows its chapter count before you enroll.",
  },
  {
    number: "2",
    title: "Watch, at your pace",
    body: "Video lessons are chaptered, so you can jump back to the one part you didn't get, without rewatching the rest.",
  },
  {
    number: "3",
    title: "Track what you finish",
    body: "Mark chapters complete as you go. Your progress bar is exact, not a guess.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 bg-marketing-chalk text-marketing-ink"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-3xl md:text-4xl">How it works</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-sm border border-marketing-ink/10 bg-white p-6 shadow-[6px_6px_0_0_rgba(21,44,39,0.12)]"
            >
              <span className="font-display text-4xl text-marketing-mustardDeep">
                {step.number}
              </span>
              <p className="mt-4 font-display text-xl">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-marketing-ink/65">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};