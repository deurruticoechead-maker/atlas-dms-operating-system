const fmtDate = (d) => {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${parseInt(day)} ${months[parseInt(m)-1]}`
}

function FaseBadge({ estado }) {
  if (estado === 'Completo')   return <span className="badge-completo text-[10px]">✓</span>
  if (estado === 'En proceso') return <span className="badge-proceso text-[10px]">⟳</span>
  return <span className="badge-pendiente text-[10px]">·</span>
}

function ZonaCard({ zona }) {
  const pctBar = zona.progreso

  const colorMap = {
    '#0ea5e9': { bar: 'bg-sky-500', text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
    '#8b5cf6': { bar: 'bg-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    '#10b981': { bar: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  }
  const c = colorMap[zona.color] || colorMap['#0ea5e9']

  return (
    <div className="card overflow-hidden">
      {/* Header zona */}
      <div className={`px-5 py-4 border-b border-slate-800 ${c.bg}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.text}`}>
              {zona.zona}
            </span>
            <h3 className="text-sm font-bold text-white mt-0.5">{zona.nombre}</h3>
          </div>
          <span className={`text-xl font-bold ${c.text}`}>{zona.progreso}%</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${c.bar}`}
            style={{ width: `${pctBar}%` }}
          />
        </div>
      </div>

      {/* Fases */}
      <div className="px-5 py-4">
        <div className="space-y-3">
          {zona.fases.map((fase, i) => (
            <div key={i} className="flex items-center gap-3">
              <FaseBadge estado={fase.estado} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-xs font-medium truncate ${
                    fase.estado === 'Completo' ? 'text-slate-400 line-through' :
                    fase.estado === 'En proceso' ? 'text-white' : 'text-slate-500'
                  }`}>
                    {fase.nombre}
                  </p>
                  <span className="text-[10px] text-slate-600 flex-shrink-0 font-mono">
                    {fmtDate(fase.inicio)} → {fmtDate(fase.fin)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function RoadmapZone({ hojaRuta }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {hojaRuta.map(zona => (
        <ZonaCard key={zona.zona} zona={zona} />
      ))}
    </div>
  )
}
