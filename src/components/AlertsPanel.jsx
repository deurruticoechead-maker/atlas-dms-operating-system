import { AlertCircle, AlertTriangle, Info, MapPin, User, Calendar } from 'lucide-react'

const fmtDate = (d) => {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`
}

function AlertCard({ alerta }) {
  const config = {
    alta:  { icon: AlertCircle,   dot: 'bg-red-500',    ring: 'border-red-500/20',    bg: 'bg-red-500/5',    label: 'Crítica',   labelColor: 'text-red-400',    emoji: '🔴' },
    media: { icon: AlertTriangle, dot: 'bg-amber-400',  ring: 'border-amber-400/20',  bg: 'bg-amber-400/5',  label: 'Advertencia', labelColor: 'text-amber-400', emoji: '🟡' },
    baja:  { icon: Info,          dot: 'bg-slate-400',  ring: 'border-slate-600/40',  bg: 'bg-slate-800/40', label: 'Info',      labelColor: 'text-slate-400',  emoji: '🟢' },
  }

  const c = config[alerta.prioridad] || config.baja
  const Icon = c.icon

  return (
    <div className={`rounded-xl border px-4 py-3.5 ${c.bg} ${c.ring}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <span className="text-base">{c.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${c.labelColor}`}>
              {c.label}
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
              {alerta.tipo}
            </span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{alerta.mensaje}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin size={10} /> {alerta.zona}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <User size={10} /> {alerta.responsable}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <Calendar size={10} /> {fmtDate(alerta.fecha)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AlertsPanel({ alertas }) {
  const sorted = [...alertas].sort((a, b) => {
    const order = { alta: 0, media: 1, baja: 2 }
    return order[a.prioridad] - order[b.prioridad]
  })

  const counts = {
    alta:  alertas.filter(a => a.prioridad === 'alta').length,
    media: alertas.filter(a => a.prioridad === 'media').length,
    baja:  alertas.filter(a => a.prioridad === 'baja').length,
  }

  return (
    <div>
      {/* Resumen */}
      <div className="flex items-center gap-3 mb-4">
        {counts.alta > 0 && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
            🔴 {counts.alta} crítica{counts.alta > 1 ? 's' : ''}
          </span>
        )}
        {counts.media > 0 && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            🟡 {counts.media} advertencia{counts.media > 1 ? 's' : ''}
          </span>
        )}
        {counts.baja > 0 && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-700/40 border border-slate-700 px-2.5 py-1 rounded-full">
            🟢 {counts.baja} info
          </span>
        )}
      </div>

      <div className="space-y-3">
        {sorted.map(a => <AlertCard key={a.id} alerta={a} />)}
      </div>
    </div>
  )
}
