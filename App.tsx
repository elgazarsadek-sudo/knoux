import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS } from './constants';
import { Section, Tool, LogEntry, TabId } from './types';
import { simulateSystemAction, createLog, downloadLogs } from './services/systemService';
import { generateToolActivity } from './services/geminiService';
import ToolCard from './components/ToolCard';
import GeminiGenerator from './components/GeminiGenerator';
import { Shield, Terminal, Download, Activity, Menu, X, Cpu, HardDrive } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>(TabId.SYSTEM_PROTECTION);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [runningTools, setRunningTools] = useState<Set<string>>(new Set());
  const [showAiGen, setShowAiGen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Initialization Log
  useEffect(() => {
    if (!loading) {
      addLog('Knoux CyberGuard initialized successfully.', 'success');
      addLog('All engines loaded. System ready.', 'info');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const addLog = (details: string, status: LogEntry['status']) => {
    const entry = createLog(activeTab.toUpperCase(), status, details);
    setLogs(prev => [entry, ...prev]);
  };

  const handleToolRun = async (tool: Tool) => {
    if (tool.actionType === 'ai-gen') {
      setShowAiGen(true);
      return;
    }

    setRunningTools(prev => new Set(prev).add(tool.id));
    addLog(`Starting ${tool.name}...`, 'info');

    try {
        // Check API Key for realism engine
        if (window.aistudio) {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            if (!hasKey) {
              await window.aistudio.openSelectKey();
            }
        }
        
        // Attempt to use AI for realistic tool output
        // We now pass tool.id to allow for specific context (Phase 1 tools)
        const result = await generateToolActivity(tool.id, tool.name, tool.description);
        addLog(result.details, result.status);

    } catch (e) {
      // Fallback to simple simulation if AI fails or key is missing
      try {
        const result = await simulateSystemAction(tool.name);
        addLog(result.details, result.status);
      } catch (err) {
        addLog(`Failed to execute ${tool.name}`, 'error');
      }
    } finally {
      setRunningTools(prev => {
        const next = new Set(prev);
        next.delete(tool.id);
        return next;
      });
    }
  };

  const activeSection = SECTIONS.find(s => s.id === activeTab);

  // Mock Data for Charts
  const chartData = Array.from({ length: 20 }, (_, i) => ({
    name: i,
    value: Math.floor(Math.random() * 40) + 10,
    value2: Math.floor(Math.random() * 30) + 20
  }));

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#1a1a1a] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#800080_0%,_transparent_70%)] opacity-20 animate-pulse" />
        <Shield size={80} className="text-[#800080] mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold tracking-widest mb-2">KNOUX</h1>
        <h2 className="text-xl text-[#DDA0DD] font-light tracking-[0.3em]">CYBERGUARD</h2>
        <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#800080] animate-[width_2s_ease-in-out_infinite]" style={{ width: '0%' }} />
        </div>
        <p className="mt-4 text-xs text-gray-500 font-mono">INITIALIZING ENGINES...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#1a1a1a] text-white overflow-hidden relative selection:bg-[#800080] selection:text-white">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#800080] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4b0082] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden absolute top-4 right-4 z-50 p-2 glass-panel rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-40 w-64 h-full glass-panel border-r border-white/5 flex flex-col transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <Shield className="text-[#800080]" size={32} />
          <div>
            <h1 className="font-bold text-lg leading-none">KNOUX</h1>
            <span className="text-[10px] text-[#DDA0DD] tracking-widest">CYBERGUARD</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveTab(section.id as TabId);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === section.id 
                  ? 'bg-[#800080]/20 text-[#DDA0DD] border border-[#800080]/30 shadow-[0_0_15px_rgba(128,0,128,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <section.icon size={18} />
              {section.title}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 text-xs text-center text-gray-500">
          v2.4.0-stable build 2931
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Header */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-[#1a1a1a]/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {activeSection?.icon && <activeSection.icon className="text-[#DDA0DD]" />}
            <h2 className="text-xl font-bold">{activeSection?.title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
              <Activity size={12} /> SYSTEM SECURE
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
              <Cpu size={12} /> CPU: 12%
            </div>
             <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
              <HardDrive size={12} /> MEM: 4.2GB
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          
          {/* Charts for specific sections (Simulated dashboard feeling) */}
          {(activeTab === TabId.MONITORING || activeTab === TabId.NETWORK) && (
             <div className="mb-8 h-64 w-full glass-panel rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-400 mb-4">Real-time Traffic Analysis</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#800080" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#800080" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} 
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#800080" fillOpacity={1} fill="url(#colorVal)" />
                    <Area type="monotone" dataKey="value2" stroke="#DDA0DD" fillOpacity={0.3} fill="#DDA0DD" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          )}

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {activeSection?.tools.map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onRun={handleToolRun} 
                isRunning={runningTools.has(tool.id)} 
              />
            ))}
          </div>

          {/* Empty state padding */}
          <div className="h-64"></div>
        </div>

        {/* Log Panel (Sticky Bottom) */}
        <div className="h-48 border-t border-white/10 bg-[#0f0f0f] flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#141414]">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
              <Terminal size={12} /> SYSTEM LOGS
            </div>
            <button 
              onClick={() => downloadLogs(logs)}
              className="text-xs flex items-center gap-1 text-[#DDA0DD] hover:text-white transition"
            >
              <Download size={12} /> EXPORT
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1">
            {logs.length === 0 && <div className="text-gray-600 italic px-2">No activity recorded...</div>}
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 hover:bg-white/5 p-1 rounded">
                <span className="text-gray-500 w-20 shrink-0">{log.timestamp}</span>
                <span className={`w-24 shrink-0 font-bold ${
                  log.status === 'success' ? 'text-green-500' :
                  log.status === 'warning' ? 'text-yellow-500' :
                  log.status === 'error' ? 'text-red-500' : 'text-blue-500'
                }`}>[{log.status.toUpperCase()}]</span>
                <span className="text-gray-300">{log.action}:</span>
                <span className="text-white/80">{log.details}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Overlays */}
      {showAiGen && <GeminiGenerator onClose={() => setShowAiGen(false)} addLog={addLog} />}

    </div>
  );
};

export default App;