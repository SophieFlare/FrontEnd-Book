import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("%c[RENDER] App", "color: #2563eb", {
    count,
  });

  useEffect(() => {
    console.log("%c[MOUNT] App", "color: #16a34a");

    return () => {
      console.log("%c[CLEANUP] App", "color: #dc2626");
    };
  }, []);

  function increment() {
    console.log("[EVENT] Increment clicked");
    setCount((prev) => prev + 1);
  }

  return (
    <main className="min-h-screen p-8 md:p-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="border-b border-neutral-300 pb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            ThreeCheck / React Lab
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            React Concepts
          </h1>

          <p className="mt-2 text-neutral-500">
            Learn React by changing state and observing renders.
          </p>
        </header>

        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <p className="font-mono text-xs text-neutral-500">
            01 / useState
          </p>

          <h2 className="mt-3 text-xl font-medium">
            State & Rendering
          </h2>

          <p className="mt-5 font-mono text-5xl">
            {count}
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={increment}
              className="rounded-md bg-black px-5 py-2 text-white hover:bg-neutral-800"
            >
              Increment
            </button>

            <button
              onClick={() => setCount(0)}
              className="rounded-md border border-neutral-300 px-5 py-2 hover:bg-neutral-100"
            >
              Reset
            </button>
          </div>
        </section>

        <footer className="border-t border-neutral-200 pt-4 font-mono text-xs text-neutral-500">
          Open F12 → Console → Click Increment
        </footer>
      </div>
    </main>
  );
}