import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const retentionData = [
  { day: 0, memory: 100, standard: 100 },
  { day: 1, memory: 80, standard: 50 },
  { day: 2, memory: 100, standard: 30 }, // Review 1
  { day: 4, memory: 90, standard: 15 },
  { day: 5, memory: 100, standard: 10 }, // Review 2
  { day: 10, memory: 95, standard: 5 },
  { day: 15, memory: 100, standard: 2 }, // Review 3
  { day: 30, memory: 98, standard: 0 },
];

const AnalyticsDemo: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950/50 relative">
       <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Science of <br/>
                <span className="text-cyan-400">Spaced Repetition</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Forgetting Curve</h4>
                    <p className="text-slate-400">Without intervention, 50% of knowledge is lost within 24 hours.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Strategic Intervention</h4>
                    <p className="text-slate-400">Our AI injects "Micro-Quizzes" at the precise moment of memory decay.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Permanent Encoding</h4>
                    <p className="text-slate-400">3-4 strategically spaced reviews lead to near-permanent retention.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative">
              <div className="absolute -top-4 -right-4 bg-cyan-500 text-black font-bold px-4 py-1 rounded-full text-sm animate-pulse">
                +400% Retention
              </div>
              <h3 className="text-slate-300 font-mono text-sm mb-4 uppercase">Memory Retention Over Time</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={retentionData}>
                    <defs>
                      <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#64748b" label={{ value: 'Days', position: 'insideBottomRight', offset: 0, fill: '#64748b' }} />
                    <YAxis stroke="#64748b" label={{ value: 'Retention %', angle: -90, position: 'insideLeft', fill: '#64748b' }}/>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="memory" 
                      stroke="#22d3ee" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorMemory)" 
                      name="With NeuroGraph"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="standard" 
                      stroke="#64748b" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1} 
                      fill="url(#colorStandard)" 
                      name="Standard Learning"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
       </div>
    </section>
  );
};

export default AnalyticsDemo;
