
import React, { useState, useCallback, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Sparkles, 
  PlusCircle, 
  Loader2, 
  Video, 
  LayoutDashboard, 
  BrainCircuit,
  Settings,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

import { MOCK_VIDEOS } from './data/mockVideos';
import { recallMemories } from './services/geminiService';
import { RecallResponse, MemoryVideo } from './types';
import { MemoryCard } from './components/MemoryCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recall' | 'vault'>('recall');
  const [prompt, setPrompt] = useState('');
  const [isRecalling, setIsRecalling] = useState(false);
  const [results, setResults] = useState<RecallResponse | null>(null);
  const [memoryLibrary, setMemoryLibrary] = useState<MemoryVideo[]>(MOCK_VIDEOS);

  // Simulation of adding a new memory
  const [newMemory, setNewMemory] = useState({ title: '', transcript: '', description: '' });

  const handleRecall = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsRecalling(true);
    try {
      const response = await recallMemories(prompt, memoryLibrary);
      response.matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
      setResults(response);
    } catch (error) {
      console.error("Recall failed", error);
    } finally {
      setIsRecalling(false);
    }
  }, [prompt, memoryLibrary]);

  const addToVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.title) return;
    const added: MemoryVideo = {
      id: `v-${Date.now()}`,
      title: newMemory.title,
      thumbnailUrl: `https://picsum.photos/seed/${newMemory.title}/400/225`,
      videoUrl: '',
      timestamp: new Date().toISOString().split('T')[0],
      description: newMemory.description,
      transcript: newMemory.transcript,
      inferredEmotions: ['uploaded'],
      keyActions: ['user-added']
    };
    setMemoryLibrary([added, ...memoryLibrary]);
    setNewMemory({ title: '', transcript: '', description: '' });
    setActiveTab('recall');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Streamlit Style */}
      <aside className="w-64 streamlit-sidebar flex-col hidden md:flex fixed inset-y-0 z-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">RecallAI</h1>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('recall')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'recall' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Search className="w-4 h-4" />
              Recall Memory
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'vault' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Database className="w-4 h-4" />
              Memory Vault
            </button>
          </nav>

          <div className="mt-12 space-y-6">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Vault Statistics</h3>
              <div className="space-y-2 px-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Indexed Videos</span>
                  <span className="text-slate-800">{memoryLibrary.length}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Semantic Nodes</span>
                  <span className="text-slate-800">12,482</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            SECURE RECALL
          </div>
          <button className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800">
            <Settings className="w-4 h-4" />
            Config Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          
          {activeTab === 'recall' ? (
            <div className="space-y-10 animate-in fade-in duration-500">
              <header className="space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm tracking-wide uppercase">
                  <Sparkles className="w-4 h-4" />
                  Gemini 3 Pro Reasoning
                </div>
                <h2 className="text-3xl font-bold text-slate-900">How would you describe the moment?</h2>
                <p className="text-slate-500 font-medium">Describe feelings, context, or partial memories—RecallAI does the rest.</p>
              </header>

              <form onSubmit={handleRecall} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. 'That time I was really nervous about a presentation but it ended up being fine...'"
                    className="w-full h-40 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg font-medium outline-none resize-none"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={isRecalling || !prompt.trim()}
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-blue-500/20"
                    >
                      {isRecalling ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Indexing Neurons...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          Recall Memory
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {results && (
                <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex gap-4">
                    <div className="p-2 bg-emerald-100 rounded-lg h-fit">
                      <BrainCircuit className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-widest">Semantic Interpretation</h4>
                      <p className="text-emerald-800 font-medium leading-relaxed">
                        {results.emotionalAnalysis}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.matches.map(match => {
                      const v = memoryLibrary.find(x => x.id === match.videoId);
                      if (!v) return null;
                      return <MemoryCard key={v.id} video={v} match={match} />;
                    })}
                  </div>
                </div>
              )}

              {!results && !isRecalling && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPrompt("When I felt like I was in over my head with work but finally got it done late at night.")}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                  >
                    <span className="text-sm font-medium text-slate-600 italic">"When I felt in over my head but finished..."</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                  </div>
                  <div 
                    onClick={() => setPrompt("That video where the lighting was really golden and peaceful on the water.")}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                  >
                    <span className="text-sm font-medium text-slate-600 italic">"Golden and peaceful lighting on water..."</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <header className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Memory Vault</h2>
                  <p className="text-slate-500">Manage and index your personal video history.</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                  <Info className="w-4 h-4" />
                  INDEXED: {memoryLibrary.length}
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {memoryLibrary.map(v => (
                    <div key={v.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all group">
                      <div className="w-32 aspect-video bg-slate-100 rounded-lg overflow-hidden shrink-0">
                        <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{v.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{v.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded uppercase">{v.timestamp}</span>
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Transcript Indexed</span>
                        </div>
                      </div>
                      <button className="p-2 text-slate-300 hover:text-red-400 transition-colors">
                        <PlusCircle className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-blue-600" />
                      Add New Memory
                    </h3>
                    <form onSubmit={addToVault} className="space-y-4">
                    
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Video Title</label>
                        <input 
                          value={newMemory.title}
                          onChange={e => setNewMemory({...newMemory, title: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none text-sm" 
                          placeholder="e.g. Birthday Party 2024"
                         />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transcript / Memory</label>
                        <textarea 
                          value={newMemory.transcript}
                          onChange={e => setNewMemory({...newMemory, transcript: e.target.value})}
                          className="w-full h-32 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none text-sm resize-none" 
                          placeholder="What happened in the video? Describe actions or dialogue..."
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Index Into Vault
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
