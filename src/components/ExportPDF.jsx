import { useState } from 'react'
import { FileDown, Loader2 } from 'lucide-react'

export default function ExportPDF({ proyecto }) {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const element = document.getElementById('dashboard-content')
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 1.5,
        backgroundColor: '#020617',
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const ratio = canvas.width / canvas.height
      const imgWidth = pdfWidth
      const imgHeight = imgWidth / ratio

      let y = 0
      let remaining = imgHeight

      while (remaining > 0) {
        if (y > 0) pdf.addPage()
        const pageHeight = Math.min(pdfHeight, remaining)
        const srcY = ((imgHeight - remaining) / imgHeight) * canvas.height
        const srcH = (pageHeight / imgHeight) * canvas.height

        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvas.width
        pageCanvas.height = srcH
        const ctx = pageCanvas.getContext('2d')
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH)

        pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pageHeight)
        remaining -= pageHeight
        y += pageHeight
      }

      const date = new Date().toLocaleDateString('es-CL').replace(/\//g, '-')
      pdf.save(`Informe_${proyecto.nombre.replace(/\s+/g, '_')}_${date}.pdf`)
    } catch (err) {
      console.error('Error generando PDF:', err)
      alert('Error al generar el PDF. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors shadow-lg shadow-sky-500/20"
    >
      {loading ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <FileDown size={14} />
          Exportar PDF
        </>
      )}
    </button>
  )
}
