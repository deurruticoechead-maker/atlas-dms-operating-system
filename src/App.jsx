import { useState, useMemo } from 'react'
import Sidebar from './components/Sidebar.jsx'
import KPICards from './components/KPICards.jsx'
import FilterBar from './components/FilterBar.jsx'
import ProgressTable from './components/ProgressTable.jsx'
import PaymentTable from './components/PaymentTable.jsx'
import AlertsPanel from './components/AlertsPanel.jsx'
import RoadmapZone from './components/RoadmapZone.jsx'
import ExportPDF from './components/ExportPDF.jsx'

import projectList from './data/projects.json'
import casaMarData from './data/casaMAR.json'
import { MapPin, Calendar, User, RefreshCw } from 'lucide-react'

const DATA_MAP = {
  'casaMAR': casaMarData,
}

function Section({ title, children, action }) {
  return (
    <section className="card overflow-hidden">
      <div className="card-header flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}

function EmptyProject({ project }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-sm">
        <span className="text-6xl">{project.icono}</span>
        <h2 className="mt-4 text-xl font-bold text-white">{project.nombre}</h2>
        <p className="mt-2 text-slate-400">{project.ubicacion}</p>
        <div className="mt-3 inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
          {project.estado}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Este proyecto aún no tiene datos cargados.<br />
          Agrega un archivo JSON en <code className="text-sky-400">src/data/</code> para activarlo.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [activeProject, setActiveProject] = useState(projectList[0])
  const [filtroZona, setFiltroZona] = useState('Todas')
  const [filtroEstado, setFiltroEstado] = useState('Todos')

  const data = activeProject.dataFile ? DATA_MAP[activeProject.dataFile] : null

  const partidasFiltradas = useMemo(() => {
    if (!data) return []
    return data.partidas.filter(p => {
      const zonaOk = filtroZona === 'Todas' || p.zona === filtroZona
      const estadoOk = filtroEstado === 'Todos' || p.estado === filtroEstado
      return zonaOk && estadoOk
    })
  }, [data, filtroZona, filtroEstado])

  const today = new Date().toLocaleDateString('es-CL', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar
        projects={projectList}
        activeProject={activeProject}
        onSelectProject={(p) => {
          setActiveProject(p)
          setFiltroZona('Todas')
          setFiltroEstado('Todos')
        }}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-lg">{activeProject.icono}</span>
              <h1 className="text-lg font-bold text-white">{activeProject.nombre}</h1>
              {data && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  {data.estado}
                </span>
              )}
            </div>
            {data && (
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={10} /> {data.ubicacion}</span>
                <span className="flex items-center gap-1"><User size={10} /> {data.cliente}</span>
                <span className="flex items-center gap-1"><Calendar size={10} />
                  {data.fechaInicio} → {data.fechaTermino}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 capitalize hidden lg:block">{today}</span>
            {data && <ExportPDF proyecto={activeProject} />}
          </div>
        </header>

        {/* Content */}
        {!data ? (
          <EmptyProject project={activeProject} />
        ) : (
          <div id="dashboard-content" className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* KPIs */}
            <KPICards kpis={data.kpis} />

            {/* Alertas */}
            <Section title={`🚨 Alertas Críticas (${data.alertas.length})`}>
              <AlertsPanel alertas={data.alertas} />
            </Section>

            {/* Partidas */}
            <Section
              title="Avance Físico por Partida"
              action={
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {partidasFiltradas.length} de {data.partidas.length} partidas
                  </span>
                  <FilterBar
                    filtroZona={filtroZona}
                    setFiltroZona={setFiltroZona}
                    filtroEstado={filtroEstado}
                    setFiltroEstado={setFiltroEstado}
                  />
                </div>
              }
            >
              <ProgressTable partidas={partidasFiltradas} />
            </Section>

            {/* Hoja de Ruta */}
            <section>
              <h2 className="text-sm font-semibold text-white mb-4">Hoja de Ruta por Zona</h2>
              <RoadmapZone hojaRuta={data.hojaRuta} />
            </section>

            {/* Estados de Pago */}
            <Section title="Estados de Pago – Mano de Obra (EP)">
              <PaymentTable estadosPago={data.estadosPago} />
            </Section>

            {/* Footer */}
            <div className="pb-4 text-center text-xs text-slate-700">
              Atlas DMS · Informe generado: {new Date().toLocaleString('es-CL')} · {data.nombre} – {data.ubicacion}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
