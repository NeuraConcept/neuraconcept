import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useT } from 'talkr';

const timeSavingsData = [
  { students: 10, manual: 2, gradeowl: 0.5 },
  { students: 20, manual: 4, gradeowl: 0.8 },
  { students: 30, manual: 6, gradeowl: 1.0 },
  { students: 40, manual: 8, gradeowl: 1.2 },
  { students: 50, manual: 10, gradeowl: 1.5 },
  { students: 60, manual: 12, gradeowl: 1.8 },
];

const AnalyticsDemo: React.FC = () => {
  const { T } = useT();

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {T("analytics.heading_1")}<span className="text-apple-blue">{T("analytics.heading_2")}</span>{T("analytics.heading_3")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Steps */}
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shrink-0 text-lg">
                1
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold text-lg mb-1">{T("analytics.step1_title")}</h4>
                <p className="text-gray-400 leading-relaxed">
                  {T("analytics.step1_desc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shrink-0 text-lg">
                2
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold text-lg mb-1">{T("analytics.step2_title")}</h4>
                <p className="text-gray-400 leading-relaxed">
                  {T("analytics.step2_desc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shrink-0 text-lg">
                3
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold text-lg mb-1">{T("analytics.step3_title")}</h4>
                <p className="text-gray-400 leading-relaxed">
                  {T("analytics.step3_desc")}
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-gray-900 font-semibold text-sm mb-4 uppercase tracking-wide">
              {T("analytics.chart_title")}
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSavingsData}>
                  <defs>
                    <linearGradient id="colorGradeOwl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#86868B" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#86868B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D2D2D7" />
                  <XAxis
                    dataKey="students"
                    stroke="#86868B"
                    tick={{ fill: '#86868B', fontSize: 12 }}
                    label={{ value: T("analytics.chart_xlabel"), position: 'insideBottomRight', offset: -5, fill: '#86868B', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#86868B"
                    tick={{ fill: '#86868B', fontSize: 12 }}
                    label={{ value: T("analytics.chart_ylabel"), angle: -90, position: 'insideLeft', fill: '#86868B', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#D2D2D7',
                      borderRadius: '8px',
                      color: '#1D1D1F',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    itemStyle={{ color: '#1D1D1F' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="manual"
                    stroke="#86868B"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1}
                    fill="url(#colorManual)"
                    name={T("analytics.chart_manual")}
                  />
                  <Area
                    type="monotone"
                    dataKey="gradeowl"
                    stroke="#007AFF"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorGradeOwl)"
                    name={T("analytics.chart_gradeowl")}
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
