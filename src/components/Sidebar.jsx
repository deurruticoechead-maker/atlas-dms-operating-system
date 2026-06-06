import { Building2, ChevronRight, LayoutDashboard, TrendingUp } from 'lucide-react'

const statusColor = {
  'En Ejecución': 'bg-sky-400',
  'En Licitación': 'bg-amber-400',
  'Anteproyecto': 'bg-slate-500',
}

export default function Sidebar({ projects, activeProject, onSelectProject }) {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
            <Building2 size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight">Atlas DMS</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Construcción</p>
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <nav className="px-3 py-4 border-b border-slate-800">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-2 mb-2">Panel</p>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-medium">
          <LayoutDashboard size={15} />
          Dashboard
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium mt-1 transition-colors">
          <TrendingUp size={15} />
          Resumen Ejecutivo
        </button>
      </nav>

      {/* Proyectos */}
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-2 mb-2">Proyectos</p>
        <div className="space-y-1">
          {projects.map(project => {
            const isActive = activeProject?.id === project.id
            return (
              <button
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`w-full text-left px-3 py-3 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-slate-800 border border-slate-700'
                    : 'hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{project.icono}</span>
                    <div>
                      <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {project.nombre}
                      </p>
                      <p className="text-[11px] text-slate-500">{project.ubicacion}</p>
                    </div>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`transition-all ${isActive ? 'text-sky-400 rotate-90' : 'text-slate-600 group-hover:text-slate-400'}`}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor[project.estado] || 'bg-slate-500'}`} />
                    <span className="text-[10px] text-slate-500">{project.estado}</span>
                  </div>
                  {project.avance > 0 && (
                    <span className="text-[11px] font-mono text-sky-400">{project.avance}%</span>
                  )}
                </div>
                {isActive && project.avance > 0 && (
                  <div className="mt-2 h-0.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all"
                      style={{ width: `${project.avance}%` }}
                    />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-800">
        <p className="text-[10px] text-slate-600 text-center">Atlas DMS v1.0 · 2025</p>
      </div>
    </aside>
  )
}
