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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 font-sans text-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Card */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            🔥 Ultra Heavy Data Component
          </h2>
          <p className="mt-3 text-base text-indigo-100">
            Large dataset, grouped stats, ranking panels, and deep analysis.
          </p>
        </div>

        {/* Summary Section */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">📊 Summary Dashboard</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <div className="absolute right-2 top-2 opacity-10 group-hover:opacity-20">
                <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-blue-600"> The Total Items</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{heavyData.length.toLocaleString()}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <p className="text-sm font-medium text-green-600">Filtered Items</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{filtered.length.toLocaleString()}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <p className="text-sm font-medium text-purple-600">Total Engagement</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{totalEngagement.toFixed(2)}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <p className="text-sm font-medium text-orange-600">Search Index Words</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{Object.keys(searchIndex).length.toLocaleString()}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-red-100 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <p className="text-sm font-medium text-red-600">Matrix Sum</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{matrixSum.toLocaleString()}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <p className="text-sm font-medium text-teal-600">Prime IDs (20k)</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                {deepAnalysis.filter(d => d.isPrime).length.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* Grouped Categories */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">📁 Grouped Categories</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(grouped).slice(0, 15).map(([key, items]) => (
              <div 
                key={key} 
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md"
              >
                <p className="font-semibold text-gray-900">{key}</p>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {items.length.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Top 10 by Score */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">🏆 Top 10 by Score</h3>
          <div className="space-y-4">
            {sortedByScore.slice(0, 10).map((item, idx) => (
              <div 
                key={item.id} 
                className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                    idx === 1 ? 'bg-gray-300 text-gray-800' :
                    idx === 2 ? 'bg-amber-600 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-base font-bold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Category:</span> {item.category} • 
                      <span className="font-medium text-gray-700 ml-1">Region:</span> {item.region}
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-bold text-white shadow-sm">
                  Score: {item.score.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Filtered Items */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">💰 Filtered Items (first 8)</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.slice(0, 8).map(item => (
              <div 
                key={item.id} 
                className="group overflow-hidden rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 transition-all duration-300 hover:scale-[1.02] hover:border-sky-300 hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    item.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    item.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Value: <span className="text-green-600">${item.value.toFixed(2)}</span></p>
                <p className="mb-3 text-xs text-gray-500">
                  Tags: {item.tags.slice(0, 3).join(', ')}...
                </p>
                <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                  <span className="text-xs text-gray-500">Rating</span>
                  <span className="text-sm font-bold text-indigo-600">
                    {(item.reviews.reduce((s, r) => s + r.rating, 0) / item.reviews.length).toFixed(2)} ⭐
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Analysis */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">🔬 Deep Analysis (first 15)</h3>
          <div className="space-y-3">
            {deepAnalysis.slice(0, 15).map(d => (
              <div 
                key={d.id} 
                className="flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md sm:flex-row"
              >
                <span className="text-sm font-semibold text-gray-700">ID: <span className="text-indigo-600">{d.id}</span></span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  d.isPrime ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {d.isPrime ? '✅ Prime' : '❌ Not Prime'}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  Risk: <span className="text-red-600">{d.riskScore}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Records */}
        <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">📋 Sample Records</h3>
          <div className="space-y-4">
            {heavyData.slice(0, 5).map(item => (
              <div 
                key={item.id} 
                className="group rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-md"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <p className="text-base font-bold text-gray-900">{item.name}</p>
                  <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
                    v{item.nested.meta.version}
                  </span>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    item.nested.meta.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.nested.meta.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-700">Category:</span> {item.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-700">Region:</span> {item.region}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-700">Priority:</span> 
                    <span className={
                      item.priority === 'Critical' ? 'text-red-600 font-bold' :
                      item.priority === 'High' ? 'text-orange-600 font-bold' :
                      'text-gray-600'
                    }>{item.priority}</span>
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