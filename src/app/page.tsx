"use client";
import React, { useState } from 'react';
import { CheckCircle, BookOpen, Zap, Users, Shield } from 'lucide-react';

type Quiz = {
  q: string;
  options: string[];
  correct: number;
};

type ModuleItem = {
  id: string;
  title: string;
  icon: string;
  xp: number;
  level: number;
  completed?: boolean;
  quiz?: Quiz[];
  locked?: boolean;
};

type UserProgress = {
  level: number;
  xp: number;
  completedModules: string[];
  badges: string[];
  tradesExecuted: number;
};

export default function SolanaFirstPOC() {
  const [currentView, setCurrentView] = useState('landing');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    completedModules: [],
    badges: [],
    tradesExecuted: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      {currentView === 'landing' && <LandingPage onStart={() => setCurrentView('demo')} />}
      {currentView === 'demo' && <DemoSection userProgress={userProgress} setUserProgress={setUserProgress} setCurrentView={setCurrentView} />}
      {currentView === 'integration' && <IntegrationShowcase setCurrentView={setCurrentView} />}
    </div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-block bg-purple-500/20 rounded-full px-6 py-2 mb-6">
          <span className="text-purple-300 font-semibold">Developer Tooling for Solana</span>
        </div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
          SolanaFirst
        </h1>
        
        <p className="text-2xl text-purple-200 mb-4 max-w-3xl mx-auto">
          Universal Onboarding Infrastructure for the Solana Ecosystem
        </p>
        
        <p className="text-lg text-purple-300 mb-8 max-w-2xl mx-auto">
          Open-source SDK that enables any wallet, DEX, or protocol to safely onboard users before they lose money
        </p>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg mb-12"
        >
          🚀 Try Interactive Demo
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-purple-200">525+</div>
            <div className="text-sm text-purple-300">Daily Active Users</div>
            <div className="text-xs text-purple-400 mt-1">(Alpha Product)</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-purple-200">91</div>
            <div className="text-sm text-purple-300">Net Promoter Score</div>
            <div className="text-xs text-purple-400 mt-1">(World-class)</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-purple-200">76%</div>
            <div className="text-sm text-purple-300">Day-7 Retention</div>
            <div className="text-xs text-purple-400 mt-1">(3x Industry)</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <ValueProp icon={<Zap className="w-12 h-12" />} title="One-Line Integration" description="Add SolanaFirst to any dApp in under 30 minutes" />
        <ValueProp icon={<Shield className="w-12 h-12" />} title="On-Chain Verification" description="Education credentials stored on-chain" />
        <ValueProp icon={<Users className="w-12 h-12" />} title="Ecosystem Public Good" description="100% open source (MIT)" />
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-center">Who Benefits?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <UseCase title="🔑 Wallets" benefit="60% fewer support tickets" description="Users learn wallet security first" />
          <UseCase title="🔄 DEXs" benefit="35% higher first-swap success" description="Users practice trading safely" />
          <UseCase title="💎 Protocols" benefit="Fewer uninformed liquidations" description="Gate features by education level" />
          <UseCase title="🌍 Regional Builders" benefit="Ready-to-fork infrastructure" description="Localize for your region" />
        </div>
      </div>
    </div>
  );
}

function ValueProp({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all">
      <div className="text-purple-300 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-purple-300 text-sm">{description}</p>
    </div>
  );
}

function UseCase({ title, benefit, description }: { title: string; benefit: string; description: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="text-green-400 font-semibold mb-2">✅ {benefit}</div>
      <p className="text-sm text-purple-300">{description}</p>
    </div>
  );
}

function DemoSection({ userProgress, setUserProgress, setCurrentView }: any) {
  const [activeTab, setActiveTab] = useState('tutorial');
  const [currentModule, setCurrentModule] = useState<ModuleItem | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const modules: ModuleItem[] = [
    {
      id: 'wallet-security',
      title: 'Wallet Security 101',
      icon: '🔐',
      xp: 20,
      level: 1,
      completed: userProgress.completedModules.includes('wallet-security'),
      quiz: [
        { q: "What should you do if someone asks for your seed phrase?", options: ["Give it if they're from support", "Never share with anyone, ever", "Share only if trustworthy", "It's okay on official websites"], correct: 1 },
        { q: "Where is the safest place to store your seed phrase?", options: ["Screenshot on phone", "Google Drive encrypted", "Written on paper in safe", "Email to yourself"], correct: 2 }
      ]
    },
    { id: 'token-analysis', title: 'Token Analysis Basics', icon: '📊', xp: 30, level: 2, completed: userProgress.completedModules.includes('token-analysis'), locked: userProgress.level < 2 },
    { id: 'defi-basics', title: 'DeFi Fundamentals', icon: '💰', xp: 25, level: 2, completed: userProgress.completedModules.includes('defi-basics'), locked: userProgress.level < 2 }
  ];

  const handleCompleteModule = (moduleId: string, score: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;
    
    if (score >= 80) {
      const newXP = userProgress.xp + module.xp;
      const newLevel = newXP >= 100 ? 3 : newXP >= 50 ? 2 : 1;
      setUserProgress({ ...userProgress, xp: newXP, level: newLevel, completedModules: [...userProgress.completedModules, moduleId], badges: newLevel > userProgress.level ? [...userProgress.badges, `Level ${newLevel}`] : userProgress.badges });
      setCurrentModule(null);
      setQuizAnswers({});
      alert(`🎉 Module completed! +${module.xp} XP${newLevel > userProgress.level ? ` - LEVEL UP to ${newLevel}!` : ''}`);
    } else {
      alert(`Keep trying! You scored ${score}%. Need 80% to pass.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <button onClick={() => setCurrentView('landing')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm">← Back</button>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('tutorial')} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'tutorial' ? 'bg-purple-500' : 'bg-white/10'}`}>📚 Learning</button>
          <button onClick={() => setActiveTab('trading')} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'trading' ? 'bg-purple-500' : 'bg-white/10'}`}>💹 Trading</button>
          <button onClick={() => setActiveTab('progress')} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'progress' ? 'bg-purple-500' : 'bg-white/10'}`}>🏆 Progress</button>
        </div>
        <button onClick={() => setCurrentView('integration')} className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-lg font-semibold">View SDK →</button>
      </div>

      {activeTab === 'tutorial' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Available Modules</h2>
            {modules.map(module => (
              <button key={module.id} onClick={() => !module.locked && setCurrentModule(module)} disabled={module.locked} className={`w-full text-left p-6 rounded-xl border-2 ${module.locked ? 'bg-white/5 opacity-50' : module.completed ? 'bg-green-500/20 border-green-500/50' : 'bg-white/10 hover:border-purple-400/50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{module.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold">{module.title}</h3>
                      <p className="text-sm text-purple-300">{module.locked ? `🔒 Level ${module.level}` : `+${module.xp} XP`}</p>
                    </div>
                  </div>
                  {module.completed && <CheckCircle className="w-8 h-8 text-green-400" />}
                </div>
              </button>
            ))}
          </div>
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            {!currentModule ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                <p className="text-xl text-purple-300">Select a module to begin</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
                <div className="space-y-4 mb-6">
                  <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-4">
                    <p className="font-semibold mb-2">📖 Key Concepts:</p>
                    <ul className="text-sm space-y-2 text-purple-200">
                      <li>• Your private key = Your money. Never share it.</li>
                      <li>• Seed phrases are your backup - write them down!</li>
                      <li>• "Support" asking for keys = ALWAYS A SCAM</li>
                    </ul>
                  </div>
                </div>
                {currentModule.quiz && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Quiz (80% to pass):</h3>
                    {currentModule.quiz.map((q, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4">
                        <p className="font-semibold mb-3">{i + 1}. {q.q}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, j) => (
                            <label key={j} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer">
                              <input type="radio" name={`q${i}`} value={j} onChange={() => setQuizAnswers({...quizAnswers, [i]: j})} className="w-4 h-4" />
                              <span className="text-sm">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button onClick={() => { const correct = currentModule.quiz!.filter((q, i) => quizAnswers[i] === q.correct).length; handleCompleteModule(currentModule.id, (correct / currentModule.quiz!.length) * 100); }} disabled={Object.keys(quizAnswers).length !== currentModule.quiz.length} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 text-white py-3 rounded-lg font-bold">Submit Quiz</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 'trading' && <PaperTradingDemo userProgress={userProgress} setUserProgress={setUserProgress} />}
      {activeTab === 'progress' && <ProgressDashboard userProgress={userProgress} />}
    </div>
  );
}

function PaperTradingDemo({ userProgress, setUserProgress }: any) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 rounded-xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold mb-6">Paper Trading Simulator</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-500/20 rounded-lg p-6"><p className="text-sm text-purple-300">Balance</p><p className="text-3xl font-bold">$1000.00</p></div>
          <div className="bg-blue-500/20 rounded-lg p-6"><p className="text-sm text-blue-300">Trades</p><p className="text-3xl font-bold">{userProgress.tradesExecuted}</p></div>
          <div className="bg-green-500/20 rounded-lg p-6"><p className="text-sm text-green-300">P&L</p><p className="text-3xl font-bold">$0.00</p></div>
        </div>
        <button onClick={() => { setUserProgress({...userProgress, tradesExecuted: userProgress.tradesExecuted + 1}); alert('🎉 Trade executed!'); }} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-bold">Execute Sample Trade</button>
      </div>
    </div>
  );
}

function ProgressDashboard({ userProgress }: any) {
  const xpToNextLevel = userProgress.level === 1 ? 50 : 100;
  const xpProgress = (userProgress.xp / xpToNextLevel) * 100;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8">
        <div className="flex items-center justify-between mb-4">
          <div><p className="text-sm text-purple-200">Current Level</p><h2 className="text-5xl font-bold">Level {userProgress.level}</h2></div>
          <div className="text-6xl">⭐</div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3"><div className="bg-white h-3 rounded-full" style={{ width: `${xpProgress}%` }} /></div>
        <p className="text-sm text-purple-200 mt-2">{xpToNextLevel - userProgress.xp} XP to Level {userProgress.level + 1}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20"><p className="text-sm text-purple-300">Modules</p><p className="text-4xl font-bold">{userProgress.completedModules.length}/10</p></div>
        <div className="bg-white/10 rounded-xl p-6 border border-white/20"><p className="text-sm text-purple-300">Trades</p><p className="text-4xl font-bold">{userProgress.tradesExecuted}</p></div>
        <div className="bg-white/10 rounded-xl p-6 border border-white/20"><p className="text-sm text-purple-300">Badges</p><p className="text-4xl font-bold">{userProgress.badges.length}</p></div>
      </div>
    </div>
  );
}

function IntegrationShowcase({ setCurrentView }: any) {
  const [tab, setTab] = useState(0);
  const examples = [
    { name: 'Phantom Wallet', desc: 'Educate during wallet creation', code: `function PhantomOnboarding() {\n  return (\n    <OnboardingButton \n      onComplete={createWallet}\n    />\n  );\n}` },
    { name: 'Jupiter DEX', desc: 'Verify education before swap', code: `function JupiterSwap() {\n  const isEducated = checkUserEducation();\n  if (!isEducated) return <EducationRequired />;\n  return <SwapInterface />;\n}` },
    { name: 'Drift Protocol', desc: 'Gate features by level', code: `pub fn open_position(ctx: Context<Trade>) -> Result<()> {\n  let edu = get_education(user);\n  require!(edu.level >= 3);\n  Ok(())\n}` }
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => setCurrentView('demo')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm mb-8">← Back</button>
      <h1 className="text-4xl font-bold mb-4 text-center">SDK Integration Examples</h1>
      <p className="text-xl text-purple-300 text-center mb-12">Easy integration for any Solana dApp</p>
      <div className="flex gap-4 justify-center mb-8">{examples.map((ex, i) => (<button key={i} onClick={() => setTab(i)} className={`px-6 py-3 rounded-lg font-semibold ${tab === i ? 'bg-purple-500' : 'bg-white/10'}`}>{ex.name}</button>))}</div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 rounded-xl p-8 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold mb-2">{examples[tab].name}</h2>
          <p className="text-purple-300 mb-6">{examples[tab].desc}</p>
          <div className="bg-gray-900 rounded-lg p-6"><pre className="text-sm text-green-400 font-mono">{examples[tab].code}</pre></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6"><h3 className="font-bold mb-3">✅ Benefits:</h3><ul className="text-sm space-y-2 text-green-200"><li>• 30 min integration</li><li>• 60% fewer tickets</li><li>• On-chain verification</li></ul></div>
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-6"><h3 className="font-bold mb-3">📦 What You Get:</h3><ul className="text-sm space-y-2 text-blue-200"><li>• NPM package</li><li>• React hooks</li><li>• TypeScript support</li></ul></div>
        </div>
      </div>
    </div>
  );
}