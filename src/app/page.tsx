"use client";
import React, { useState } from 'react';
import { CheckCircle, BookOpen, Zap, Users, Shield, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

type Quiz = {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
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

type TokenAnalysis = {
  safetyScore: number;
  riskLevel: 'SAFE' | 'MODERATE' | 'HIGH' | 'EXTREME';
  flags: string[];
  technicals: {
    rsi: number;
    atr: number;
    fibonacci: string;
  };
  signals: {
    pumpProbability: number;
    entryPrice: number;
    exitPrice: number;
  };
  whaleActivity: {
    largestHolder: number;
    recentTrades: string[];
  };
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
    { id: 'token-analysis', title: 'Token Analysis with Alpha', icon: '📊', xp: 30, level: 2, completed: userProgress.completedModules.includes('token-analysis'), locked: userProgress.level < 2 },
    { id: 'defi-basics', title: 'DeFi Fundamentals', icon: '💰', xp: 25, level: 2, completed: userProgress.completedModules.includes('defi-basics'), locked: userProgress.level < 2 },
    { id: 'phishing-defense', title: 'Phishing Defense Training', icon: '🎣', xp: 35, level: 3, completed: userProgress.completedModules.includes('phishing-defense'), locked: userProgress.level < 3 }
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
        <div className="flex gap-4 flex-wrap">
          <button onClick={() => setActiveTab('tutorial')} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'tutorial' ? 'bg-purple-500' : 'bg-white/10'}`}>📚 Learning</button>
          <button onClick={() => setActiveTab('alpha')} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'alpha' ? 'bg-purple-500' : 'bg-white/10'}`}>🔍 Alpha Scanner</button>
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
            ) : currentModule.id === 'phishing-defense' ? (
              <PhishingQuiz onComplete={(score) => handleCompleteModule(currentModule.id, score)} />
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
                <div className="space-y-4 mb-6">
                  <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-4">
                    <p className="font-semibold mb-2">📖 Key Concepts:</p>
                    <ul className="text-sm space-y-2 text-purple-200">
                      {currentModule.id === 'wallet-security' && (
                        <>
                          <li>• Your private key = Your money. Never share it.</li>
                          <li>• Seed phrases are your backup - write them down!</li>
                          <li>• "Support" asking for keys = ALWAYS A SCAM</li>
                        </>
                      )}
                      {currentModule.id === 'token-analysis' && (
                        <>
                          <li>• Check holder distribution before buying</li>
                          <li>• Verify liquidity is locked</li>
                          <li>• Use Alpha to analyze technical indicators</li>
                          <li>• Watch for whale activity patterns</li>
                        </>
                      )}
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
      {activeTab === 'alpha' && <TokenSafetyDemo />}
      {activeTab === 'trading' && <PaperTradingDemo userProgress={userProgress} setUserProgress={setUserProgress} />}
      {activeTab === 'progress' && <ProgressDashboard userProgress={userProgress} />}
    </div>
  );
}

// ALPHA INTEGRATION: Token Safety Scanner
function TokenSafetyDemo() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [analysis, setAnalysis] = useState<TokenAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  
  const analyzeToken = async () => {
    if (!tokenAddress.trim()) return;
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock Alpha's comprehensive analysis
    setAnalysis({
      safetyScore: 65,
      riskLevel: 'MODERATE',
      flags: [
        '⚠️ Top holder owns 35% of supply',
        '✅ Liquidity locked for 6 months',
        '⚠️ Mint authority not revoked',
        '✅ No recent whale dumps',
        '⚠️ Low trading volume (24h: $45K)'
      ],
      technicals: {
        rsi: 58.3,
        atr: 0.024,
        fibonacci: '0.618 retracement level'
      },
      signals: {
        pumpProbability: 42,
        entryPrice: 0.00234,
        exitPrice: 0.00289
      },
      whaleActivity: {
        largestHolder: 35.2,
        recentTrades: [
          '🐋 Whale bought 2.3M tokens (2 hours ago)',
          '🐟 Retail sold 450K tokens (5 hours ago)',
          '🐋 Whale sold 1.1M tokens (1 day ago)'
        ]
      }
    });
    
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-2">🔍 ClickShift Alpha Token Scanner</h2>
        <p className="text-purple-100">Advanced token analysis powered by Alpha's intelligence engine</p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-bold mb-4">Paste Token Contract Address</h3>
        <div className="flex gap-4">
          <input
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="e.g., DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 (BONK)"
            className="flex-1 p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-purple-300"
          />
          <button 
            onClick={analyzeToken}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 px-8 py-3 rounded-lg font-bold transition-all"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="space-y-6">
          {/* Safety Score Overview */}
          <div className={`rounded-xl p-6 border-2 ${
            analysis.riskLevel === 'SAFE' ? 'bg-green-500/20 border-green-500' :
            analysis.riskLevel === 'MODERATE' ? 'bg-yellow-500/20 border-yellow-500' :
            analysis.riskLevel === 'HIGH' ? 'bg-orange-500/20 border-orange-500' :
            'bg-red-500/20 border-red-500'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Safety Score</h3>
                <p className="text-sm opacity-80">Comprehensive risk analysis</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">{analysis.safetyScore}/100</div>
                <div className="text-xl font-semibold mt-1">{analysis.riskLevel} RISK</div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all ${
                  analysis.riskLevel === 'SAFE' ? 'bg-green-500' :
                  analysis.riskLevel === 'MODERATE' ? 'bg-yellow-500' :
                  analysis.riskLevel === 'HIGH' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${analysis.safetyScore}%` }}
              />
            </div>
          </div>

          {/* Risk Flags */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Risk Analysis
            </h3>
            <ul className="space-y-3">
              {analysis.flags.map((flag, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="text-lg">{flag.startsWith('✅') ? '✅' : '⚠️'}</span>
                  <span className="text-sm flex-1">{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Indicators */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Technical Indicators (Alpha Exclusive)
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-500/20 rounded-lg p-4">
                <p className="text-sm text-purple-300">RSI (14)</p>
                <p className="text-3xl font-bold">{analysis.technicals.rsi}</p>
                <p className="text-xs text-purple-300 mt-1">
                  {analysis.technicals.rsi > 70 ? 'Overbought' : analysis.technicals.rsi < 30 ? 'Oversold' : 'Neutral'}
                </p>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-300">ATR</p>
                <p className="text-3xl font-bold">{analysis.technicals.atr}</p>
                <p className="text-xs text-blue-300 mt-1">Average True Range</p>
              </div>
              <div className="bg-pink-500/20 rounded-lg p-4">
                <p className="text-sm text-pink-300">Fibonacci</p>
                <p className="text-lg font-bold">{analysis.technicals.fibonacci}</p>
                <p className="text-xs text-pink-300 mt-1">Key support level</p>
              </div>
            </div>
          </div>

          {/* Trading Signals */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Trading Signals (Alpha Predictive AI)
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                <p className="text-sm text-green-300">Pump Probability</p>
                <p className="text-4xl font-bold text-green-400">{analysis.signals.pumpProbability}%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
                <p className="text-sm text-blue-300">Entry Price</p>
                <p className="text-2xl font-bold text-blue-400">${analysis.signals.entryPrice}</p>
                <p className="text-xs text-blue-300 mt-1">Optimal buy zone</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                <p className="text-sm text-purple-300">Exit Price</p>
                <p className="text-2xl font-bold text-purple-400">${analysis.signals.exitPrice}</p>
                <p className="text-xs text-purple-300 mt-1">Take profit target</p>
              </div>
            </div>
          </div>

          {/* Whale Activity */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">🐋 Whale Activity Tracker</h3>
            <div className="mb-4 p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
              <p className="text-sm text-orange-300">Largest Holder</p>
              <p className="text-3xl font-bold text-orange-400">{analysis.whaleActivity.largestHolder}%</p>
              <p className="text-xs text-orange-300 mt-1">of total supply</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold mb-2">Recent Whale Activity:</p>
              {analysis.whaleActivity.recentTrades.map((trade, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg text-sm">
                  {trade}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className={`rounded-xl p-6 border-2 ${
            analysis.safetyScore >= 70 ? 'bg-green-500/20 border-green-500' :
            analysis.safetyScore >= 50 ? 'bg-yellow-500/20 border-yellow-500' :
            'bg-red-500/20 border-red-500'
          }`}>
            <h3 className="text-xl font-bold mb-2">💡 Alpha Recommendation</h3>
            <p className="text-sm">
              {analysis.safetyScore >= 70 ? 
                '✅ This token shows reasonable safety metrics. Consider small position sizing and monitor whale activity.' :
              analysis.safetyScore >= 50 ?
                '⚠️ MODERATE RISK: Proceed with caution. High holder concentration and other risk factors detected. Only invest what you can afford to lose.' :
                '🚫 HIGH RISK: Multiple red flags detected. Not recommended for beginners. Extreme caution advised.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Phishing Defense Training
function PhishingQuiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const scenarios = [
    {
      type: 'URL',
      content: 'https://phaпtom.app/wallet',
      question: 'Is this URL safe?',
      isSafe: false,
      explanation: 'The "n" is actually a Cyrillic character, not Latin. This is a common phishing technique called homograph attack.'
    },
    {
      type: 'DM',
      content: '"Hi! This is Solana Support. We noticed suspicious activity. Please verify your wallet by entering your seed phrase here: [link]"',
      question: 'Is this message legitimate?',
      isSafe: false,
      explanation: 'SCAM! Real support NEVER asks for seed phrases. This is a phishing attempt.'
    },
    {
      type: 'Website',
      content: 'A website asking you to "approve" a transaction to claim an airdrop',
      question: 'Is this safe to approve?',
      isSafe: false,
      explanation: 'Likely a scam. Many fake airdrops are drainer contracts that steal your tokens when you approve.'
    }
  ];

  const handleAnswer = (isSafe: boolean) => {
    const correct = isSafe === scenarios[currentScenario].isSafe;
    setAnswers([...answers, correct]);
    
    if (currentScenario < scenarios.length - 1) {
      setTimeout(() => setCurrentScenario(currentScenario + 1), 1000);
    } else {
      const score = ((answers.filter(a => a).length + (correct ? 1 : 0)) / scenarios.length) * 100;
      setTimeout(() => onComplete(score), 1000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎣 Phishing Defense Training</h2>
      <div className="bg-white/5 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <span className="text-sm text-purple-300">Scenario {currentScenario + 1} of {scenarios.length}</span>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 mb-6 border-2 border-orange-500/50">
          <p className="text-xs text-orange-300 mb-2">Type: {scenarios[currentScenario].type}</p>
          <p className="font-mono text-sm">{scenarios[currentScenario].content}</p>
        </div>

        <p className="text-lg font-semibold mb-4">{scenarios[currentScenario].question}</p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500 p-4 rounded-lg font-bold"
          >
            ✅ SAFE
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500 p-4 rounded-lg font-bold"
          >
            🚫 SCAM
          </button>
        </div>
      </div>
    </div>
  );
}

// Paper Trading with Transaction Preview
function PaperTradingDemo({ userProgress, setUserProgress }: any) {
  const [showTxPreview, setShowTxPreview] = useState(false);

  const txDetails = {
    type: 'Swap',
    from: 'SOL',
    to: 'BONK',
    amount: 0.5,
    slippage: 1.0,
    priorityFee: 0.00001,
    estimatedOutput: 125000
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/10 rounded-xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold mb-6">Paper Trading Simulator</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-500/20 rounded-lg p-6">
            <p className="text-sm text-purple-300">Balance</p>
            <p className="text-3xl font-bold">$1000.00</p>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-6">
            <p className="text-sm text-blue-300">Trades</p>
            <p className="text-3xl font-bold">{userProgress.tradesExecuted}</p>
          </div>
          <div className="bg-green-500/20 rounded-lg p-6">
            <p className="text-sm text-green-300">P&L</p>
            <p className="text-3xl font-bold">$0.00</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowTxPreview(true)} 
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-bold mb-4"
        >
          Execute Sample Trade
        </button>
      </div>

      {/* Transaction Preview Tutor */}
      {showTxPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-6 max-w-lg w-full border-2 border-purple-500">
            <h3 className="text-2xl font-bold mb-4">📋 Transaction Preview</h3>
            <p className="text-sm text-purple-300 mb-6">Learn what each field means before confirming</p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-purple-300">Type</span>
                  <span className="font-bold">{txDetails.type}</span>
                </div>
                <p className="text-xs text-purple-400">✏️ This transaction will swap one token for another</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-purple-300">Slippage Tolerance</span>
                  <span className="font-bold">{txDetails.slippage}%</span>
                </div>
                <p className="text-xs text-purple-400">✏️ Maximum price difference you'll accept (1% is safe)</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-purple-300">Priority Fee</span>
                  <span className="font-bold">{txDetails.priorityFee} SOL</span>
                </div>
                <p className="text-xs text-purple-400">✏️ Extra fee to process your transaction faster</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-purple-300">Estimated Output</span>
                  <span className="font-bold">{txDetails.estimatedOutput.toLocaleString()} BONK</span>
                </div>
                <p className="text-xs text-purple-400">✏️ Approximate tokens you'll receive</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setShowTxPreview(false);
                  setUserProgress({...userProgress, tradesExecuted: userProgress.tradesExecuted + 1});
                  alert('🎉 Trade executed! You learned how to read transactions!');
                }}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold"
              >
                ✅ Confirm
              </button>
              <button
                onClick={() => setShowTxPreview(false)}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-bold"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Replay Mode */}
      <PortfolioReplay />
    </div>
  );
}

// Portfolio Replay Mode
function PortfolioReplay() {
  const [showReplay, setShowReplay] = useState(false);
  
  const historicalTrades = [
    { time: '2 days ago', action: 'Bought SOL', price: 98, outcome: 'Lost -5%' },
    { time: '1 day ago', action: 'Sold SOL', price: 93, outcome: 'Profit +15%' },
    { time: '6 hours ago', action: 'Bought BONK', price: 0.000023, outcome: 'Profit +25%' }
  ];

  return (
    <div className="bg-white/10 rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold mb-4">📊 Portfolio Replay Mode</h3>
      <p className="text-sm text-purple-300 mb-4">See what would have happened if you traded differently</p>
      
      <button
        onClick={() => setShowReplay(!showReplay)}
        className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg font-bold mb-4"
      >
        {showReplay ? 'Hide' : 'Show'} Replay
      </button>

      {showReplay && (
        <div className="space-y-3">
          {historicalTrades.map((trade, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-purple-300">{trade.time}</span>
                <span className={`font-bold ${trade.outcome.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.outcome}
                </span>
              </div>
              <p className="font-semibold">{trade.action} @ ${trade.price}</p>
              <p className="text-xs text-purple-400 mt-2">
                💡 What if you held longer? Click to see alternative outcomes
              </p>
            </div>
          ))}
        </div>
      )}
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
    { name: 'Jupiter DEX + Alpha', desc: 'Verify education + analyze token safety', code: `function JupiterSwap() {\n  const isEducated = checkUserEducation();\n  const tokenSafety = analyzeWithAlpha(token);\n  \n  if (!isEducated) return <EducationRequired />;\n  if (tokenSafety.risk === 'EXTREME') return <Warning />;\n  \n  return <SwapInterface />;\n}` },
    { name: 'Drift Protocol', desc: 'Gate features by level', code: `pub fn open_position(ctx: Context<Trade>) -> Result<()> {\n  let edu = get_education(user);\n  require!(edu.level >= 3);\n  Ok(())\n}` }
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => setCurrentView('demo')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm mb-8">← Back</button>
      <h1 className="text-4xl font-bold mb-4 text-center">SDK Integration Examples</h1>
      <p className="text-xl text-purple-300 text-center mb-12">SolanaFirst + Alpha = Complete Safety Solution</p>
      <div className="flex gap-4 justify-center mb-8 flex-wrap">{examples.map((ex, i) => (<button key={i} onClick={() => setTab(i)} className={`px-6 py-3 rounded-lg font-semibold ${tab === i ? 'bg-purple-500' : 'bg-white/10'}`}>{ex.name}</button>))}</div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 rounded-xl p-8 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold mb-2">{examples[tab].name}</h2>
          <p className="text-purple-300 mb-6">{examples[tab].desc}</p>
          <div className="bg-gray-900 rounded-lg p-6"><pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{examples[tab].code}</pre></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6"><h3 className="font-bold mb-3">✅ Benefits:</h3><ul className="text-sm space-y-2 text-green-200"><li>• 30 min integration</li><li>• 60% fewer tickets</li><li>• Alpha token analysis</li><li>• On-chain verification</li></ul></div>
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-6"><h3 className="font-bold mb-3">📦 What You Get:</h3><ul className="text-sm space-y-2 text-blue-200"><li>• NPM package</li><li>• React hooks</li><li>• Alpha API access</li><li>• TypeScript support</li></ul></div>
        </div>
      </div>
    </div>
  );
}