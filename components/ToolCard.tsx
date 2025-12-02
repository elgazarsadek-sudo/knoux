import React from 'react';
import { Tool } from '../types';
import { Play } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onRun: (tool: Tool) => void;
  isRunning: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onRun, isRunning }) => {
  return (
    <div 
      className="glass-panel p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden flex flex-col gap-3"
    >
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-[#800080] text-[10px] px-2 py-0.5 rounded text-white font-bold">READY</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-3 bg-white/5 rounded-lg text-[#DDA0DD] group-hover:text-white group-hover:bg-[#800080] transition-colors">
          <tool.icon size={24} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm group-hover:text-[#DDA0DD] transition-colors">{tool.name}</h3>
        </div>
      </div>
      
      <p className="text-xs text-white/50 line-clamp-2 h-8">{tool.description}</p>
      
      <button 
        onClick={() => onRun(tool)}
        disabled={isRunning}
        className={`mt-auto w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
          isRunning 
            ? 'bg-yellow-600/50 text-yellow-200 cursor-wait'
            : 'bg-white/5 hover:bg-[#800080] text-white/70 hover:text-white'
        }`}
      >
        {isRunning ? 'Running...' : <><Play size={12} /> Execute</>}
      </button>
    </div>
  );
};

export default ToolCard;
