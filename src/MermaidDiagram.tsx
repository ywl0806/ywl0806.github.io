import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  themeVariables: {
    primaryColor: '#f5f5f4',
    primaryTextColor: '#44403c',
    primaryBorderColor: '#d6d3d1',
    lineColor: '#a8a29e',
    secondaryColor: '#fafaf9',
    tertiaryColor: '#f5f5f4',
    background: '#fafaf9',
    mainBkg: '#ffffff',
    nodeBorder: '#d6d3d1',
    clusterBkg: '#f5f5f4',
    titleColor: '#1c1917',
    edgeLabelBackground: '#fafaf9',
    fontFamily: "'DM Mono', 'Hiragino Kaku Gothic ProN', monospace",
    fontSize: '14px',
  },
  flowchart: { curve: 'basis', padding: 24 },
  sequence: { actorMargin: 80, messageAlign: 'center', mirrorActors: false, boxMargin: 10 },
})

let idCounter = 0

export default function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const id = `mermaid-${++idCounter}`
    mermaid.render(id, chart)
      .then(({ svg }) => {
        // SVG가 width/height 100% 채우도록 강제
        const patched = svg
          .replace(/width="[\d.]+px"/, 'width="100%"')
          .replace(/height="[\d.]+px"/, 'height="auto"')
        setSvg(patched)
      })
      .catch(e => setError(String(e)))
  }, [chart])

  if (error) return <p className="text-xs text-red-400 font-mono">{error}</p>
  if (!svg) return (
    <div className="flex justify-center py-10">
      <div className="w-5 h-5 border-2 border-stone-200 border-t-stone-400 rounded-full animate-spin" />
    </div>
  )

  return (
    <>
      {/* 인라인 다이어그램 */}
      <div className="relative group">
        <div
          className="w-full overflow-x-auto [&_svg]:min-w-[600px] [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        {/* 확대 버튼 */}
        <button
          onClick={() => setExpanded(true)}
          className="absolute top-2 right-2 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-500 hover:text-stone-800 hover:border-stone-400 flex items-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          拡大
        </button>
      </div>

      {expanded && createPortal(
        <div
          className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setExpanded(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full h-[95vh] overflow-auto p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className='overflow-auto p-4'>
              <div
                className="min-w-200 w-full [&_svg]:w-full [&_svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
