const fmtM = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n === 0) return '—'
  return `$${(n / 1000).toFixed(0)}K`
}

const zonaLabel = { Z1: 'Dorm 1', Z2: 'Área Común', Z3: 'Dorm 2' }
const zonaColor  = { Z1: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
                     Z2: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
                     Z3: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' }

function StatusBadge({ estado }) {
  if (estado === 'Completo')   return <span className="badge-completo">✓ Completo</span>
  if (estado === 'En proceso') return <span className="badge-proceso">⟳ En proceso</span>
  return <span className="badge-pendiente">· Pendiente</span>
}

function ProgressBar({ value, estado }) {
  const color =
    estado === 'Completo'   ? 'bg-emerald-500' :
    estado === 'En proceso' ? 'bg-sky-500'      : 'bg-slate-600'

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[11px] font-mono text-slate-400 w-9 text-right">{value}%</span>
    </div>
  )
}

export default function ProgressTable({ partidas }) {
  if (partidas.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm">
        No hay partidas para los filtros seleccionados.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Partida</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Zona</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-48">Avance</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
            <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Presupuesto</th>
            <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Ejecutado</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Responsable</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {partidas.map((p, i) => (
            <tr
              key={p.id}
              className={`group hover:bg-slate-800/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-900/40'}`}
            >
              <td className="px-4 py-3.5">
                <span className="text-slate-200 font-medium text-sm">{p.nombre}</span>
              </td>
              <td className="px-4 py-3.5">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${zonaColor[p.zona]}`}>
                  {p.zona} · {zonaLabel[p.zona]}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <ProgressBar value={p.avance} estado={p.estado} />
              </td>
              <td className="px-4 py-3.5">
                <StatusBadge estado={p.estado} />
              </td>
              <td className="px-4 py-3.5 text-right font-mono text-slate-300 text-xs">{fmtM(p.presupuesto)}</td>
              <td className="px-4 py-3.5 text-right font-mono text-xs">
                <span className={p.ejecutado > 0 ? 'text-emerald-400' : 'text-slate-600'}>
                  {fmtM(p.ejecutado)}
                </span>
              </td>
              <td className="px-4 py-3.5 text-slate-400 text-xs">{p.responsable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
