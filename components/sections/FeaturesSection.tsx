interface Feature {
  title: string
  description: string
}

interface FeaturesSectionProps {
  data: {
    title: string
    subtitle: string
    features: Feature[]
  }
}

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  const steps = [
    {
      num: "01",
      title: "Crawler IA scane Google",
      body: "Chak 3 è, yon algoritm rechèch imaj negatif Ayiti sou Google ak lòt platfòm. Yo klasifye yo ak yon modèl HuggingFace.",
      accent: "#003F87",
    },
    {
      num: "02",
      title: "Kominote a signale",
      body: "Manm yo vote pou retire imaj ki bay move pèsepsyon. 10 signalman = imaj rapòte dirèkteman sou Google Images.",
      accent: "#D21034",
    },
    {
      num: "03",
      title: "Bèl foto monte sou Google",
      body: "Chak foto ou upload gen pwòp paj SEO ak JSON-LD. Google endekse yo — yo ranplase tigèl imaj negatif yo.",
      accent: "#003F87",
    },
  ]

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Titre éditorial */}
        <div className="mb-20">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-3">
            Kijan sa travay
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight max-w-2xl">
            Twa etap.<br />
            <span style={{ color: '#D21034' }}>Yon seul objektif.</span>
          </h2>
        </div>

        {/* Steps en ligne */}
        <div className="grid md:grid-cols-3 gap-0 md:gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-950 p-10 group hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div
                className="text-7xl font-black leading-none mb-8 select-none"
                style={{ color: step.accent, opacity: 0.15 }}
              >
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {step.body}
              </p>
              {/* Barre colorée en bas au hover */}
              <div
                className="mt-8 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: step.accent }}
              />
            </div>
          ))}
        </div>

        {/* Manifeste ligne */}
        <div className="mt-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          <p className="text-sm text-gray-400 dark:text-gray-500 italic text-center max-w-lg">
            &ldquo;Nou pap efase reyalite — men n ap mete limyè sou bèlte nou yo.&rdquo;
          </p>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>

      </div>
    </section>
  )
}
