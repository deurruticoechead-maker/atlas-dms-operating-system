const fmt = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

const fmtDate = (d) => {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`
}

function PayBadge({ estado }) {
  if (estado === 'Pagado')      return <span className="badge-pagado">● Pagado</span>
  if (estado === 'En revisión') return <span className="badge-revision">◐ En revisión</span>
  return <span className="badge-pendiente-pago">○ Pendiente</span>
}

export default function PaymentTable({ estadosPago }) {
  const total = estadosPago.reduce((s, ep) => s + ep.monto, 0)
  const pagado = estadosPago.filter(e => e.estado === 'Pagado').reduce((s, ep) => s + ep.monto, 0)

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">EP</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Descripción</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Emisión</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pago</th>
              <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Monto</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Observación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {estadosPago.map((ep, i) => (
              <tr key={ep.ep} className={`hover:bg-slate-800/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-900/40'}`}>
                <td className="px-4 py-3.5">
                  <span className="font-mono font-semibold text-sky-400 text-xs">{ep.ep}</span>
                </td>
                <td className="px-4 py-3.5 text-slate-200 text-sm">{ep.descripcion}</td>
                <td className="px-4 py-3.5 text-slate-400 text-xs">{fmtDate(ep.fechaEmision)}</td>
                <td className="px-4 py-3.5 text-slate-400 text-xs">{fmtDate(ep.fechaPago)}</td>
                <td className="px-4 py-3.5 text-right font-mono text-slate-200 text-xs">{fmt(ep.monto)}</td>
                <td className="px-4 py-3.5"><PayBadge estado={ep.estado} /></td>
                <td className="px-4 py-3.5 text-xs text-slate-500 italic">
                  {ep.observacion || '—'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-slate-700">
            <tr>
              <td colSpan={4} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total facturado
              </td>
              <td className="px-4 py-3 text-right font-mono font-bold text-white text-sm">{fmt(total)}</td>
              <td colSpan={2} className="px-4 py-3 text-xs text-emerald-400">
                Pagado: {fmt(pagado)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
