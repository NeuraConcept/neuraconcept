import React from 'react';
import { School, Users, BarChart, CheckCircle } from 'lucide-react';

const Schools: React.FC = () => {
  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empower Your <span className="text-cyan-400">Institution</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Give your teachers superpowers. NeuraConcept categorizes student performance not just by scores, but by underlying conceptual gaps, allowing for targeted intervention at scale.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800">
          <School className="text-violet-400 mb-6" size={40} />
          <h3 className="text-xl font-bold mb-4">Curriculum Mapping</h3>
          <p className="text-slate-400">
            Automatically align our Knowledge Graph with your existing curriculum and textbooks. No need to change your teaching materials.
          </p>
        </div>
        <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800">
          <Users className="text-cyan-400 mb-6" size={40} />
          <h3 className="text-xl font-bold mb-4">Classroom Insights</h3>
          <p className="text-slate-400">
            Real-time dashboards show teachers which concepts the majority of the class is struggling with, enabling on-the-fly lesson adjustments.
          </p>
        </div>
        <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800">
          <BarChart className="text-emerald-400 mb-6" size={40} />
          <h3 className="text-xl font-bold mb-4">Predictive Outcomes</h3>
          <p className="text-slate-400">
            Identify at-risk students weeks before exams. Our AI predicts performance trends based on conceptual mastery.
          </p>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Top Schools Choose NeuraConcept</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            "Significant reduction in teacher grading time",
            "Measurable improvement in student performance",
            "Seamless integration with Google Classroom and Canvas",
            "Customizable capability frameworks",
            "Parent-teacher conference reports generated automatically",
            "Weekly progress digests for department heads"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <CheckCircle className="text-cyan-500 shrink-0 mt-1" size={20} />
              <p className="text-slate-300 text-lg">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="mailto:dip@turkar.co?subject=NeuraConcept%20Demo%20Request&body=Hi%20Dip%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20NeuraConcept%20and%20would%20like%20to%20schedule%20a%20demo%20for%20my%20institution.%0A%0APlease%20let%20me%20know%20availability.%0A%0ABest%2C%0A" 
            className="bg-white text-black font-bold px-8 py-4 rounded-lg hover:bg-slate-200 transition-colors inline-block"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Schools;
