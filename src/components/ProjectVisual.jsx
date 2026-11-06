import { Activity, Bot, Braces, ChartNoAxesCombined, CircleDot, Code2, Cpu, Fingerprint, Gauge, Layers3, QrCode, Radio, Scan, Smartphone, Workflow } from 'lucide-react'

function HandVisual() {
  return <div className="visual-hand"><div className="hand-orbit orbit-one"/><div className="hand-orbit orbit-two"/><div className="hand-core"><Fingerprint size={72} strokeWidth={1.1}/></div><span className="hand-label label-a">VISION INPUT</span><span className="hand-label label-b">5-DOF CONTROL</span><span className="hand-label label-c">DIGITAL TWIN</span><div className="hand-dot dot-a"/><div className="hand-dot dot-b"/><div className="hand-dot dot-c"/></div>
}
function RacingVisual() {
  return <div className="visual-racing"><div className="race-top"><span>RACE TELEMETRY / 2026</span><Gauge size={17}/></div><div className="race-track"><svg viewBox="0 0 360 170" role="img" aria-label="Abstract racing circuit"><path d="M40 118 C12 90 42 28 102 38 L153 48 C186 55 185 98 222 96 L281 92 C335 89 342 35 300 23 C261 12 226 34 231 60" fill="none" stroke="currentColor" strokeWidth="17" strokeLinecap="round"/><path d="M40 118 C12 90 42 28 102 38 L153 48 C186 55 185 98 222 96 L281 92 C335 89 342 35 300 23 C261 12 226 34 231 60" fill="none" stroke="#f7f6f2" strokeWidth="1.5" strokeDasharray="5 7"/></svg><span className="race-marker"/></div><div className="race-stats"><span><b>01:24.8</b><small>BEST LAP</small></span><span><b>+0.214</b><small>GAP</small></span><span><b>312</b><small>KM/H</small></span></div></div>
}
function TasksVisual() {
  return <div className="visual-tasks"><div className="task-window"><div className="task-window-head"><span/><span/><span/><small>MY WORKSPACE</small></div><div className="task-welcome">Your week,<br/><em>in focus.</em></div><div className="task-progress"><div><span>Project progress</span><b>72%</b></div><i><span/></i></div><div className="task-lines"><div><b/><span>Design system</span><small>Done</small></div><div><b/><span>API integration</span><small>In progress</small></div><div><b/><span>Final review</span><small>Next</small></div></div></div></div>
}
function QRVisual() {
  return <div className="visual-qr"><div className="phone-frame"><div className="phone-camera"/><div className="qr-wrap"><QrCode size={112} strokeWidth={1.25}/><span className="scan-line"/></div><div className="phone-caption">SCAN. CONNECT. GO.</div><div className="phone-bottom"><span/><span/><span/></div></div><div className="qr-spark spark-one"/><div className="qr-spark spark-two"/></div>
}
function ChartVisual() {
  return <div className="visual-chart"><div className="chart-heading"><span>MODEL OUTPUT</span><Activity size={18}/></div><div className="chart-number">AAPL <b>↗</b></div><div className="chart-sub">SEQUENCE FORECAST / EXPERIMENT</div><svg viewBox="0 0 360 145" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".24"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs><path d="M0 112 C25 106 32 80 55 90 S86 120 112 80 S150 87 170 62 S205 83 226 51 S264 66 286 35 S327 50 360 15 L360 145 L0 145Z" fill="url(#chartFill)"/><path d="M0 112 C25 106 32 80 55 90 S86 120 112 80 S150 87 170 62 S205 83 226 51 S264 66 286 35 S327 50 360 15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg><div className="chart-legend"><span>TRAINING SERIES</span><span>MODEL PREDICTION</span></div></div>
}
function StageVisual() {
  return <div className="visual-stage"><div className="stage-curtain left"/><div className="stage-curtain right"/><div className="stage-light"/><div className="stage-content"><span>CASTING / OPEN CALL</span><strong>YOUR<br/><i>SCENE.</i></strong><small>APPLICATIONS OPEN</small></div><div className="stage-floor"/></div>
}

export default function ProjectVisual({ type }) {
  const visuals = { hand: <HandVisual/>, racing: <RacingVisual/>, tasks: <TasksVisual/>, qr: <QRVisual/>, chart: <ChartVisual/>, stage: <StageVisual/> }
  return <div className={`project-visual visual-${type}`}>{visuals[type] || <div className="visual-fallback"><Layers3 size={54}/><Code2 size={20}/></div>}</div>
}
