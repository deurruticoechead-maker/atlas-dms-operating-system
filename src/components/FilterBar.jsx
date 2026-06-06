import { Filter, X } from 'lucide-react'

const zonas = ['Todas', 'Z1', 'Z2', 'Z3']
const estados = ['Todos', 'Completo', 'En proceso', 'Pendiente']

export default function FilterBar({ filtroZona, setFiltroZona, filtroEstado, setFiltroEstado }) {
  const hasFilters = filtroZona !== 'Todas' || filtroEstado !== 'Todos'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Filter size={13} />
        <span className="text-xs font-medium uppercase tracking-wider">Filtros</span>
      </div>

      {/* Zona */}
      <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5">
        {zonas.map(z => (
          <button
            key={z}
            onClick={() => setFiltroZona(z)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filtroZona === z
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Estado */}
      <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5">
        {estados.map(e => (
          <button
            key={e}
            onClick={() => setFiltroEstado(e)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filtroEstado === e
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Reset */}
      {hasFilters && (
        <button
          onClick={() => { setFiltroZona('Todas'); setFiltroEstado('Todos') }}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X size={12} />
          Limpiar
        </button>
      )}
    </div>
  )
}
