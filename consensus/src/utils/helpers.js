export function monogram(name) {
  const words = name.split(" ");
  if (words.length === 1) return name.slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function pairNote(a, b, algorithms) {
  if (a.id === b.id) return `${a.name} — same chain.`;
  if (a.algo === b.algo) {
    const algo = algorithms.find((x) => x.id === a.algo);
    return `${a.name} and ${b.name} both run ${algo.name} — similar validator economics and finality assumptions make bridges and shared tooling easier to reason about.`;
  }
  const algoA = algorithms.find((x) => x.id === a.algo);
  const algoB = algorithms.find((x) => x.id === b.algo);
  return `${a.name} (${algoA.short}) and ${b.name} (${algoB.short}) use different consensus mechanisms — different finality guarantees mean direct interoperability needs a trust-minimized bridge or oracle.`;
}
