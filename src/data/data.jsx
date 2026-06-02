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
    <div className="min-h-screen bg-gray-50 px-6 py-8 font-sans text-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            🔥 Ultra Heavy Data Component
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Large dataset, grouped stats, ranking panels, and deep analysis.
          </p>
        </div>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">📊 Summary</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{heavyData.length.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Filtered Items</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{filtered.length.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Total Engagement</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totalEngagement.toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Search Index Words</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{Object.keys(searchIndex).length.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Matrix Sum</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{matrixSum.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Prime IDs in first 20k</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {deepAnalysis.filter(d => d.isPrime).length.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">📁 Grouped Categories</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(grouped).slice(0, 15).map(([key, items]) => (
              <div key={key} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="font-medium text-gray-900">{key}</p>
                <p className="text-sm text-gray-500">{items.length.toLocaleString()} items</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">🏆 Top 10 by Score</h3>
          <div className="space-y-3">
            {sortedByScore.slice(0, 10).map(item => (
              <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Category: {item.category} • Region: {item.region}
                    </p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    Score: {item.score.toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Views: {item.stats.views.toLocaleString()} • Clicks: {item.stats.clicks.toLocaleString()} • Purchases: {item.stats.purchases.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">💰 Filtered Items (first 8)</h3>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {filtered.slice(0, 8).map(item => (
              <div key={item.id} className="rounded-xl border border-sky-200 bg-sky-50 p-4">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="mt-1 text-sm text-gray-600">Value: ${item.value.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Priority: {item.priority}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Tags: {item.tags.join(', ')}
                </p>
                <p className="text-xs text-gray-500">
                  Rating Avg: {(item.reviews.reduce((s, r) => s + r.rating, 0) / item.reviews.length).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">🔬 Deep Analysis (first 15)</h3>
          <div className="space-y-2">
            {deepAnalysis.slice(0, 15).map(d => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                <span className="text-sm text-gray-700">ID: {d.id}</span>
                <span className="text-sm text-gray-700">Prime: {d.isPrime ? '✅' : '❌'}</span>
                <span className="text-sm text-gray-700">Risk Score: {d.riskScore}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">📋 Sample Records</h3>
          <div className="space-y-3">
            {heavyData.slice(0, 5).map(item => (
              <div key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">
                  {item.name} | Version: {item.nested.meta.version} | Created: {item.createdAt}
                </p>
                <p className="mt-2">{item.description.slice(0, 120)}...</p>
                <p className="mt-2 text-gray-500">
                  Category: {item.category} | Region: {item.region} | Priority: {item.priority}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Data