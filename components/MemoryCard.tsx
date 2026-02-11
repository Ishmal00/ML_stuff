
import React from 'react';
import { MemoryVideo, MatchResult } from '../types';
import { Play, Tag, Info } from 'lucide-react';

interface MemoryCardProps {
  video: MemoryVideo;
  match: MatchResult;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ video, match }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all card-shadow group">
      <div className="relative aspect-video bg-slate-100">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 w-12 h-12 transition-all scale-75 group-hover:scale-100" />
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded text-[10px] font-bold text-slate-700 border border-slate-200">
          {Math.round(match.relevanceScore * 100)}% Semantic Match
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-bold text-slate-900 leading-tight">{video.title}</h3>
          <span className="shrink-0 text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
            {video.timestamp}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            {match.memoryVibe}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Info className="w-3 h-3 text-slate-400" />
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">System Reasoning</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "{match.reasoning}"
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {video.inferredEmotions.slice(0, 3).map(emotion => (
            <span key={emotion} className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
              {emotion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
