import React, { useState } from 'react';
import { generateThreatVisualization } from '../services/geminiService';
import { ImageSize, AspectRatio } from '../types';
import { Image as ImageIcon, Loader2, X, AlertTriangle, Monitor, Move } from 'lucide-react';

interface GeminiGeneratorProps {
  onClose: () => void;
  addLog: (msg: string, type: 'success' | 'error') => void;
}

const GeminiGenerator: React.FC<GeminiGeneratorProps> = ({ onClose, addLog }) => {
  const [prompt, setPrompt] = useState('Abstract digital cybersecurity threat visualization, neon purple and black lines, glassmorphism style, 4k render');
  const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [ratio, setRatio] = useState<AspectRatio>(AspectRatio.RATIO_1_1);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Check API Key
      if (window.aistudio) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            await window.aistudio.openSelectKey();
          }
      }

      const result = await generateThreatVisualization(prompt, size, ratio);
      setImageUrl(result);
      addLog(`Generated ${size} visualization with ratio ${ratio}`, 'success');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image');
      addLog('AI Generation Failed: ' + (err.message || 'Unknown error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-5xl p-6 rounded-2xl relative flex flex-col lg:flex-row gap-6 max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition text-white/70 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {/* Controls */}
        <div className="flex-1 space-y-6 lg:max-w-md">
          <div>
            <h2 className="text-2xl font-bold text-[#DDA0DD] flex items-center gap-2 mb-1">
              <ImageIcon /> Nano Banana Pro Visualizer
            </h2>
            <p className="text-white/60 text-sm">
              Generate high-fidelity threat visualizations using Gemini 3 Pro.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[#800080] focus:ring-1 focus:ring-[#800080] outline-none transition resize-none"
                placeholder="Describe the threat..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Monitor size={14} /> Resolution
                </label>
                <div className="relative">
                  <select 
                    value={size}
                    onChange={(e) => setSize(e.target.value as ImageSize)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[#800080] outline-none appearance-none cursor-pointer hover:bg-white/5 transition"
                  >
                    {Object.values(ImageSize).map((s) => (
                      <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-xs">▼</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Move size={14} /> Aspect Ratio
                </label>
                <div className="relative">
                  <select 
                    value={ratio}
                    onChange={(e) => setRatio(e.target.value as AspectRatio)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[#800080] outline-none appearance-none cursor-pointer hover:bg-white/5 transition"
                  >
                    {Object.values(AspectRatio).map((r) => (
                      <option key={r} value={r} className="bg-[#1a1a1a]">{r}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-xs">▼</div>
                </div>
              </div>
            </div>

            {error && (
               <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm flex items-center gap-2">
                 <AlertTriangle size={16} />
                 {error}
               </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg ${
                loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#800080] to-[#4b0082] hover:from-[#9932cc] hover:to-[#800080] text-white'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Generating...
                </>
              ) : (
                'Generate Visualization'
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-black/40 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
            {imageUrl ? (
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <img 
                  src={imageUrl} 
                  alt="Generated Visualization" 
                  className="max-w-full max-h-full object-contain animate-in fade-in zoom-in duration-500 shadow-2xl rounded-lg"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                  {size} • {ratio}
                </div>
              </div>
            ) : (
              <div className="text-center text-white/30 p-8">
                <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                <p>Preview will appear here</p>
                <p className="text-xs mt-2 opacity-50">Select size and ratio to begin</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GeminiGenerator;