export default function Skills() {
  return (
    <section className="px-10 md:px-20 py-20">

      <h2 className="text-3xl font-bold mb-12 text-sky-400">
        Technical Skills
      </h2>

      <div className="grid md:grid-cols-3 gap-10">

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Backend
          </h3>

          <ul className="text-gray-400 space-y-2">
            <li>PHP</li>
            <li>MySQL</li>
            <li>REST API</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Machine Learning
          </h3>

          <ul className="text-gray-400 space-y-2">
            <li>Python</li>
            <li>Pandas</li>
            <li>Scikit-learn</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Frontend & Tools
          </h3>

          <ul className="text-gray-400 space-y-2">
            <li>Next.js</li>
            <li>Tailwind CSS</li>
            <li>Git & GitHub</li>
          </ul>
        </div>

      </div>
    </section>
  );
}