interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export default function Hero({ title, subtitle, buttonText }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16">
      <div className="mb-4 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-300">
        Personal Finance Dashboard
      </div>

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        {subtitle}
      </p>
    </section>
  );
}
