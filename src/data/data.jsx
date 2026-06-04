import React from 'react'

const categories = ['A', 'B', 'C', 'D', 'E', 'F']
const regions = ['North', 'South', 'East', 'West', 'Central']
const priorities = ['Low', 'Medium', 'High', 'Critical']

const heavyData = Array.from({ length: 120000 }, (_, i) => {
  const reviews = Array.from({ length: 6 }, (_, j) => ({
    reviewer: `User_${i}_${j}`,
    rating: (j % 5) + 1,
    helpful: (i * j) % 97,
    comment: `Review ${j + 1} for item ${i + 1}. `.repeat(4),
  }))

  return {
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.random() * 1000,
    weight: Math.random() * 500,
    score: Math.random() * 100,
    createdAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    category: categories[i % categories.length],
    region: regions[i % regions.length],
    priority: priorities[i % priorities.length],
    tags: Array.from({ length: 5 }, (_, t) => `tag-${(i + t) % 200}`),
    description: `This is item number ${i + 1}. `.repeat(12),
    stats: {
      views: Math.floor(Math.random() * 100000),
      clicks: Math.floor(Math.random() * 50000),
      purchases: Math.floor(Math.random() * 10000),
      returns: Math.floor(Math.random() * 1000),
      bounceRate: parseFloat((Math.random() * 100).toFixed(2)),
    },
    nested: {
      meta: {
        version: Math.floor(Math.random() * 20),
        active: i % 2 === 0,
        archived: i % 7 === 0,
        verified: i % 11 === 0,
      },
      details: {
        min: Math.floor(Math.random() * 100),
        max: Math.floor(Math.random() * 1000),
        avg: Math.floor(Math.random() * 500),
      },
    },
    reviews,
  }
})

const grouped = heavyData.reduce((acc, item) => {
  const key = `${item.category}-${item.region}`
  if (!acc[key]) acc[key] = []
  acc[key].push(item)
  return acc
}, {})

const sortedByScore = [...heavyData].sort((a, b) => b.score - a.score)

const filtered = heavyData.filter(
  item => item.value > 700 && item.stats.purchases > 2000 && item.nested.meta.active
)

const mapStats = heavyData.map(item => ({
  id: item.id,
  engagement: (
    item.stats.views * 0.15 +
    item.stats.clicks * 0.25 +
    item.stats.purchases * 0.45 +
    item.score * 0.15
  ).toFixed(2),
  reviewAvg: (
    item.reviews.reduce((s, r) => s + r.rating, 0) / item.reviews.length
  ).toFixed(2),
  helpfulSum: item.reviews.reduce((s, r) => s + r.helpful, 0),
  tagCount: item.tags.length,
}))

const primeCheck = n => {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

const deepAnalysis = heavyData.slice(0, 20000).map(item => ({
  id: item.id,
  isPrime: primeCheck(item.id),
  riskScore: (
    item.stats.returns * 0.3 +
    item.nested.details.max * 0.2 +
    item.nested.details.avg * 0.1 +
    item.score * 0.4
  ).toFixed(4),
}))

const searchIndex = heavyData.slice(0, 30000).reduce((acc, item) => {
  const words = `${item.name} ${item.description}`.split(' ')
  words.forEach(word => {
    if (!acc[word]) acc[word] = []
    acc[word].push(item.id)
  })
  return acc
}, {})

const matrix = Array.from({ length: 120 }, (_, row) =>
  Array.from({ length: 120 }, (_, col) => (row * col) % 97)
)

const matrixSum = matrix.flat().reduce((s, n) => s + n, 0)

const Data = () => {
  const totalEngagement = mapStats.reduce((s, x) => s + parseFloat(x.engagement), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 font-sans text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl shadow-black/30">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            🔥 Ultra Heavy Data Component
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Large dataset, grouped stats, ranking panels, and deep analysis.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
          <h3 className="mb-6 text-2xl font-bold text-slate-100">📊 Summary Dashboard</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="absolute right-2 top-2 opacity-10 group-hover:opacity-20 text-blue-400">
                <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-blue-300">The Total Items</p>
              <p className="mt-2 text-3xl font-extrabold text-white">{heavyData.length.toLocaleString()}</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10">
              <p className="text-sm font-medium text-emerald-300">Filtered Items</p>
              <p className="mt-2 text-3xl font-extrabold text-white">{filtered.length.toLocaleString()}</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/10">
              <p className="text-sm font-medium text-violet-300">Total Engagement</p>
              <p className="mt-2 text-3xl font-extrabold text-white">{totalEngagement.toFixed(2)}</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10">
              <p className="text-sm font-medium text-amber-300">Search Index Words</p>
              <p className="mt-2 text-3xl font-extrabold text-white">{Object.keys(searchIndex).length.toLocaleString()}</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-rose-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-rose-400/40 hover:shadow-lg hover:shadow-rose-500/10">
              <p className="text-sm font-medium text-rose-300">Matrix Sum</p>
              <p className="mt-2 text-3xl font-extrabold text-white">{matrixSum.toLocaleString()}</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10">
              <p className="text-sm font-medium text-cyan-300">Prime IDs (20k)</p>
              <p className="mt-2 text-3xl font-extrabold text-white">
                {deepAnalysis.filter(d => d.isPrime).length.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
          <h3 className="mb-6 text-2xl font-bold text-slate-100">📁 Grouped Categories</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(grouped).slice(0, 15).map(([key, items]) => (
              <div
                key={key}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/70 px-4 py-4 transition-all duration-200 hover:border-indigo-400/40 hover:bg-slate-800 hover:shadow-md hover:shadow-indigo-500/10"
              >
                <p className="font-semibold text-slate-100">{key}</p>
                <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-400/20">
                  {items.length.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
          <h3 className="mb-6 text-2xl font-bold text-slate-100">🏆 Top 10 by Score</h3>
          <div className="space-y-4">
            {sortedByScore.slice(0, 10).map((item, idx) => (
              <div
                key={item.id}
                className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/70 p-5 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-black/20 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      idx === 0 ? 'bg-yellow-400 text-yellow-950' :
                      idx === 1 ? 'bg-slate-300 text-slate-900' :
                      idx === 2 ? 'bg-amber-700 text-white' :
                      'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-base font-bold text-slate-100">{item.name}</p>
                    <p className="text-sm text-slate-400">
                      <span className="font-medium text-slate-300">Category:</span> {item.category} •
                      <span className="font-medium text-slate-300 ml-1">Region:</span> {item.region}
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-violet-500/20">
                  Score: {item.score.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
          <h3 className="mb-6 text-2xl font-bold text-slate-100">💰 Filtered Items (first 8)</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.slice(0, 8).map(item => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-xl border border-sky-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/10"
              >
                <div className="mb-3 flex items-start justify-between">
                  <p className="font-bold text-slate-100">{item.name}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      item.priority === 'Critical' ? 'bg-red-500/15 text-red-300 ring-1 ring-red-400/20' :
                      item.priority === 'High' ? 'bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/20' :
                      item.priority === 'Medium' ? 'bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-400/20' :
                      'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className="mb-2 text-sm font-semibold text-slate-300">
                  Value: <span className="text-emerald-300">${item.value.toFixed(2)}</span>
                </p>
                <p className="mb-3 text-xs text-slate-400">
                  Tags: {item.tags.slice(0, 3).join(', ')}...
                </p>
                <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 shadow-sm">
                  <span className="text-xs text-slate-400">Rating</span>
                  <span className="text-sm font-bold text-cyan-300">
                    {(item.reviews.reduce((s, r) => s + r.rating, 0) / item.reviews.length).toFixed(2)} ⭐
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
          <h3 className="mb-6 text-2xl font-bold text-slate-100">🔬 Deep Analysis (first 15)</h3>
          <div className="space-y-3">
            {deepAnalysis.slice(0, 15).map(d => (
              <div
                key={d.id}
                className="flex flex-col items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-800/60 px-5 py-4 transition-all duration-200 hover:border-indigo-400/30 hover:bg-slate-800 hover:shadow-md hover:shadow-black/20 sm:flex-row"
              >
                <span className="text-sm font-semibold text-slate-300">
                  ID: <span className="text-indigo-300">{d.id}</span>
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${d.isPrime ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20' : 'bg-slate-700 text-slate-300'}`}>
                  {d.isPrime ? '✅ Prime' : '❌ Not Prime'}
                </span>
                <span className="text-sm font-semibold text-slate-300">
                  Risk: <span className="text-rose-300">{d.riskScore}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
          <h3 className="mb-6 text-2xl font-bold text-slate-100">📋 Sample Records</h3>
          <div className="space-y-4">
            {heavyData.slice(0, 5).map(item => (
              <div
                key={item.id}
                className="group rounded-xl border border-white/10 bg-gradient-to-r from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-md hover:shadow-black/20"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <p className="text-base font-bold text-slate-100">{item.name}</p>
                  <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-400/20">
                    v{item.nested.meta.version}
                  </span>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.nested.meta.active ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/20' : 'bg-slate-700 text-slate-300'}`}>
                    {item.nested.meta.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mb-3 text-sm text-slate-300 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-slate-300">Category:</span> {item.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-slate-300">Region:</span> {item.region}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-slate-300">Priority:</span>
                    <span className={item.priority === 'Critical' ? 'text-red-300 font-bold' : item.priority === 'High' ? 'text-orange-300 font-bold' : 'text-slate-300'}>
                      {item.priority}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Data