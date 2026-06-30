import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Upload,
  BarChart2,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Upload Any Dataset',
    desc: 'CSV, Excel files supported. Upload in seconds and let AI do the rest.',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    icon: BarChart2,
    title: 'Auto-Generated Charts',
    desc: 'Beautiful bar, pie, line, scatter charts generated automatically from your data.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    desc: 'Ask questions about your data in plain English. Get instant insights.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    desc: 'One click to get a full AI-powered analysis of your entire dataset.',
    color: 'from-orange-500 to-amber-600',
  },
];

const steps = [
  { step: '01', title: 'Upload', desc: 'Upload your CSV or Excel file' },
  { step: '02', title: 'Analyze', desc: 'AI automatically analyzes your data' },
  { step: '03', title: 'Insights', desc: 'Get charts, insights and chat with AI' },
];

const stats = [
  { value: '50MB', label: 'Max file size' },
  { value: '5+', label: 'Chart types' },
  { value: '100%', label: 'AI powered' },
  { value: 'Free', label: 'To get started' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              DataMagic <span className="text-indigo-400">Lite</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6">
              <Zap size={12} />
              AI-Powered Data Analytics
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Turn Your Data Into{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Magic
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Upload any CSV or Excel file and instantly get AI-powered charts,
              insights, and a smart assistant that answers questions about your data.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/signup"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-lg transition-all shadow-2xl shadow-indigo-500/30 hover:scale-105"
              >
                <Sparkles size={20} />
                Start for Free
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg transition-all"
              >
                Login
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-indigo-400" />
                Secure & Private
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={14} className="text-purple-400" />
                Works on any device
              </div>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 relative"
          >
            <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/50">
              {/* Fake Dashboard Preview */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 h-6 bg-white/5 rounded-lg" />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {['98.7%', '10.4', '298.8', '0.07'].map((val, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3">
                    <div className="w-12 h-1.5 bg-white/10 rounded mb-2" />
                    <p className="text-white font-bold text-lg">{val}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 h-32 flex flex-col justify-end">
                    <div className="flex items-end gap-1 h-16">
                      {[...Array(6)].map((_, j) => (
                        <div
                          key={j}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-600 to-purple-500 opacity-70"
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                    <div className="w-24 h-1.5 bg-white/10 rounded mt-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-1/3 bg-gray-900 border border-white/10 rounded-2xl px-4 py-3 shadow-xl hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <BarChart2 size={16} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Charts Generated</p>
                  <p className="text-emerald-400 text-xs">5 charts ready ✓</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-1/4 bg-gray-900 border border-white/10 rounded-2xl px-4 py-3 shadow-xl hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">AI Insights</p>
                  <p className="text-indigo-400 text-xs">Analysis complete ✓</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                understand your data
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              No data science degree needed. Just upload and let AI do the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/8 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              How it{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                works
              </span>
            </h2>
            <p className="text-gray-400 text-lg">3 simple steps to data magic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-400">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
              <Sparkles size={28} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Ready to make your data{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                magical?
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              Join now and turn your boring spreadsheets into powerful insights.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-lg transition-all shadow-2xl shadow-indigo-500/30 hover:scale-105"
            >
              <Sparkles size={20} />
              Get Started Free
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-gray-400 text-sm font-medium">
              DataMagic Lite
            </span>
          </div>
          <p className="text-gray-600 text-xs">
            © 2026 DataMagic Lite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;