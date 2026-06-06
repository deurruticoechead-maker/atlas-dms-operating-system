import { DollarSign, TrendingUp, CheckCircle, Clock } from 'lucide-react'

const fmt = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

const fmtM = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return fmt(n)
}

function KPICard({ icon: Icon, label, value, sub, color, ring }) {
  return (
    <div className={`card p-5 flex flex-col gap-3 relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-full h-0.5 ${ring}`} />
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={16} className="text-white" />
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{label}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white text-money tracking-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default function KPICards({ kpis }) {
  const pct = kpis.avanceEconomico
  const ratio = kpis.pagado / kpis.contratoNeto * 100

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        icon={DollarSign}
        label="Contrato Neto"
        value={fmtM(kpis.contratoNeto)}
        sub="CLP · Vigente"
        color="bg-sky-500"
        ring="bg-sky-500"
      />
      <KPICard
        icon={TrendingUp}
        label="Avance Económico"
        value={`${pct}%`}
        sub={`Avance físico: ${kpis.avanceFisico}%`}
        color="bg-violet-500"
        ring="bg-violet-500"
      />
      <KPICard
        icon={CheckCircle}
        label="Pagado"
        value={fmtM(kpis.pagado)}
        sub={`${ratio.toFixed(1)}% del contrato`}
        color="bg-emerald-500"
        ring="bg-emerald-500"
      />
      <KPICard
        icon={Clock}
        label="Saldo por Pagar"
        value={fmtM(kpis.saldo)}
        sub={`${kpis.diasRestantes} días restantes`}
        color="bg-amber-500"
        ring="bg-amber-500"
      />
    </div>
  )
}
