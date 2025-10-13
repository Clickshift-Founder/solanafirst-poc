"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle, Lock, Award, TrendingUp, Shield, BookOpen, Zap, Users } from 'lucide-react';

// --- SolanaFirst: common types used in this page ---
type Quiz = {
  q: string;
  options: string[];
  correct: number;
};

type ModuleItem = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
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

type StartProps = {
  onStart: () => void;
};

type FeatureProps = {
  icon?: React.ReactNode | string;
  title: string;
  description?: string;
};

type UseCaseProps = {
  title: string;
  benefit: string;
  description: string;
};

type DemoSectionProps = {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};

type PaperTradingDemoProps = {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
};

type ProgressDashboardProps = {
  userProgress: UserProgress;
};

type IntegrationShowcaseProps = {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};

type IntegrationKey = 'phantom' | 'jupiter' | 'drift';

type IntegrationInfo = {
  name: string;
  description: string;
  code: string;
};

// Main App Component
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

// Landing Page
function LandingPage({ onStart }: StartProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
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

        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            🚀 Try Interactive Demo
          </button>
          <button
            className="bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
            onClick={() => alert('GitHub repo coming soon after grant approval!')}
          >
            📖 View Documentation
          </button>
        </div>

        {/* Proof Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
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

      {/* Value Props */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <ValueProp
          icon={<Zap className="w-12 h-12" />}
          title="One-Line Integration"
          description="Add SolanaFirst to any dApp in under 30 minutes with our SDK"
        />
        <ValueProp
          icon={<Shield className="w-12 h-12" />}
          title="On-Chain Verification"
          description="Education credentials stored on-chain, verifiable by any Solana program"
        />
        <ValueProp
          icon={<Users className="w-12 h-12" />}
          title="Ecosystem Public Good"
          description="100% open source (MIT). Built for everyone, not just one company"
        />
      </div>

      {/* Use Cases */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-center">Who Benefits?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <UseCase
            title="🔑 Wallets (Phantom, Solflare)"
            benefit="60% reduction in support tickets"
            description="Users learn wallet security before creating real wallets"
          />
          <UseCase
            title="🔄 DEXs (Jupiter, Raydium)"
            benefit="35% higher first-swap success"
            description="Users practice trading with virtual money first"
          />
          <UseCase
            title="💎 Protocols (Drift, Marinade)"
            benefit="Fewer uninformed liquidations"
            description="Gate advanced features by education level on-chain"
          />
          <UseCase
            title="🌍 Regional Builders"
            benefit="Ready-to-fork infrastructure"
            description="Localize for your region - all content is open source"
          />
        </div>
      </div>
    </div>
  );
}

function ValueProp({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all">
      <div className="text-purple-300 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-purple-300 text-sm">{description}</p>
    </div>
  );
}

function UseCase({ title, benefit, description }: UseCaseProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="text-green-400 font-semibold mb-2">✅ {benefit}</div>
      <p className="text-sm text-purple-300">{description}</p>
    </div>
  );
}

// Demo Section
function DemoSection({ userProgress, setUserProgress, setCurrentView }: DemoSectionProps) {
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
        {
          q: "What should you do if someone asks for your seed phrase?",
          options: [
            "Give it if they're from support",
            "Never share with anyone, ever",
            "Share only if trustworthy",
            "It's okay on official websites"
          ],
          correct: 1
        },
        {
          q: "Where is the safest place to store your seed phrase?",
          options: [
            "Screenshot on phone",
            "Google Drive encrypted",
            "Written on paper in safe",
            "Email to yourself"
          ],
          correct: 2
        }
      ]
    },
    {
      id: 'token-analysis',
      title: 'Token Analysis Basics',
      icon: '📊',
      xp: 30,
      level: 2,
      completed: userProgress.completedModules.includes('token-analysis'),
      locked: userProgress.level < 2
    },
    {
      id: 'defi-basics',
      title: 'DeFi Fundamentals',
      icon: '💰',
      xp: 25,
      level: 2,
      completed: userProgress.completedModules.includes('defi-basics'),
      locked: userProgress.level < 2
    }
  ];

  const handleCompleteModule = (moduleId: string, score: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;
    
    if (score >= 80) {
      const newXP = userProgress.xp + module.xp;
      const newLevel = newXP >= 100 ? 3 : newXP >= 50 ? 2 : 1;
      
      setUserProgress({
        ...userProgress,
        xp: newXP,
        level: newLevel,
        completedModules: [...userProgress.completedModules, moduleId],
        badges: newLevel > userProgress.level ? [...userProgress.badges, `Level ${newLevel}`] : userProgress.badges
      });
      
      setCurrentModule(null);
      setQuizAnswers({});
      alert(`🎉 Module completed! +${module.xp} XP${newLevel > userProgress.level ? ` - LEVEL UP to ${newLevel}!` : ''}`);
    } else {
      alert(`Keep trying! You scored ${score}%. Need 80% to pass.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setCurrentView('landing')}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm"
        >
          ← Back
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'tutorial'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-purple-300 hover:bg-white/20'
            }`}
          >
            📚 Learning Path
          </button>
          <button
            onClick={() => setActiveTab('trading')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'trading'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-purple-300 hover:bg-white/20'
            }`}
          >
            💹 Paper Trading
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'progress'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-purple-300 hover:bg-white/20'
            }`}
          >
            🏆 Progress
          </button>
        </div>

        <button
          onClick={() => setCurrentView('integration')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 px-6 py-2 rounded-lg font-semibold"
        >
          View SDK Integration →
        </button>
      </div>

      {/* Content */}
      {activeTab === 'tutorial' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Module List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Available Modules</h2>
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => !module.locked && setCurrentModule(module)}
                disabled={module.locked}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  module.locked
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : module.completed
                    ? 'bg-green-500/20 border-green-500/50'
                    : 'bg-white/10 border-white/20 hover:border-purple-400/50 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{module.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold">{module.title}</h3>
                      <p className="text-sm text-purple-300">
                        {module.locked ? `🔒 Unlock at Level ${module.level}` : `+${module.xp} XP`}
                      </p>
                    </div>
                  </div>
                  {module.completed && <CheckCircle className="w-8 h-8 text-green-400" />}
                </div>
              </button>
            ))}
          </div>

          {/* Module Content */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            {!currentModule ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                <p className="text-xl text-purple-300">Select a module to begin learning</p>
              </div>
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
                          <li>• No "forgot password" in crypto - you're the bank</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4">
                    <p className="font-semibold mb-2">⚠️ Real-World Example:</p>
                    <p className="text-sm text-yellow-200">
                      {currentModule.id === 'wallet-security' &&
                        "A user receives a DM: 'Phantom Support here! Verify your wallet by entering your seed phrase.' This is a SCAM. Real support NEVER asks for seed phrases. The user who falls for this loses everything."
                      }
                    </p>
                  </div>
                </div>

                {/* Quiz */}
                {currentModule.quiz && currentModule.quiz.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Quiz (80% to pass):</h3>
                    {currentModule.quiz.map((q, qIdx) => (
                      <div key={qIdx} className="bg-white/5 rounded-lg p-4">
                        <p className="font-semibold mb-3">{qIdx + 1}. {q.q}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <label key={oIdx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer">
                              <input
                                type="radio"
                                name={`q${qIdx}`}
                                value={oIdx}
                                onChange={() => setQuizAnswers({...quizAnswers, [qIdx]: oIdx})}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        if (!currentModule.quiz) return;
                        const correct = currentModule.quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
                        const score = (correct / currentModule.quiz.length) * 100;
                        handleCompleteModule(currentModule.id, score);
                      }}
                      disabled={!currentModule.quiz || Object.keys(quizAnswers).length !== currentModule.quiz.length}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold"
                    >
                      Submit Quiz
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'trading' && (
        <PaperTradingDemo userProgress={userProgress} setUserProgress={setUserProgress} />
      )}

      {activeTab === 'progress' && (
        <ProgressDashboard userProgress={userProgress} />
      )}
    </div>
  );
}

function PaperTradingDemo({ userProgress, setUserProgress }: PaperTradingDemoProps) {
  const [portfolio] = useState({
    balance: 1000,
    positions: [],
    pnl: 0
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 rounded-xl p-8 border border-white/20 mb-6">
        <h2 className="text-2xl font-bold mb-6">Paper Trading Simulator</h2>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-500/20 rounded-lg p-6">
            <p className="text-sm text-purple-300">Virtual Balance</p>
            <p className="text-3xl font-bold">${portfolio.balance.toFixed(2)}</p>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-6">
            <p className="text-sm text-blue-300">Total Trades</p>
            <p className="text-3xl font-bold">{userProgress.tradesExecuted}</p>
          </div>
          <div className={`rounded-lg p-6 ${portfolio.pnl >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <p className="text-sm text-green-300">Total P&L</p>
            <p className="text-3xl font-bold">${portfolio.pnl.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-6">
          <p className="font-semibold mb-2">💡 How It Works:</p>
          <ul className="text-sm space-y-2 text-blue-200">
            <li>• Practice trading with $1,000 virtual money</li>
            <li>• Use REAL token prices from Jupiter</li>
            <li>• No risk - learn by doing!</li>
            <li>• Trades are recorded on-chain for verification</li>
            <li>• Complete at least 5 profitable trades to level up</li>
          </ul>
        </div>

        <button
          onClick={() => {
            setUserProgress({
              ...userProgress,
              tradesExecuted: userProgress.tradesExecuted + 1
            });
            alert('🎉 Simulated trade executed! (In production, this would use real Jupiter prices)');
          }}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-bold"
        >
          Execute Sample Trade
        </button>
      </div>

      <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-6">
        <p className="font-semibold mb-2">⚠️ Remember:</p>
        <p className="text-sm text-yellow-200">
          This is practice money. Once you complete all modules and demonstrate consistent profitability, 
          you'll graduate to mainnet trading with real money. Take your time and learn!
        </p>
      </div>
    </div>
  );
}

function ProgressDashboard({ userProgress }: ProgressDashboardProps) {
  const xpToNextLevel = userProgress.level === 1 ? 50 : userProgress.level === 2 ? 100 : 150;
  const xpProgress = (userProgress.xp / xpToNextLevel) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Level Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-purple-200">Current Level</p>
            <h2 className="text-5xl font-bold">Level {userProgress.level}</h2>
          </div>
          <div className="text-6xl">
            {userProgress.level >= 5 ? '🎓' : '⭐'}
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>{userProgress.xp} XP</span>
            <span>{xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all"
              style={{ width: `${Math.min(xpProgress, 100)}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-purple-200">
          {xpToNextLevel - userProgress.xp} XP to Level {userProgress.level + 1}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <p className="text-sm text-purple-300">Completed Modules</p>
          <p className="text-4xl font-bold">{userProgress.completedModules.length}/10</p>
        </div>
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <p className="text-sm text-purple-300">Trades Executed</p>
          <p className="text-4xl font-bold">{userProgress.tradesExecuted}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <p className="text-sm text-purple-300">Badges Earned</p>
          <p className="text-4xl font-bold">{userProgress.badges.length}</p>
        </div>
      </div>

      {/* Badges */}
      {userProgress.badges.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">🏆 Your Badges (NFTs)</h3>
          <div className="grid grid-cols-4 gap-4">
            {userProgress.badges.map((badge, i) => (
              <div key={i} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🏅</div>
                <p className="text-xs font-semibold text-white">{badge}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Integration Showcase
function IntegrationShowcase({ setCurrentView }: IntegrationShowcaseProps) {
  const [activeIntegration, setActiveIntegration] = useState<IntegrationKey>('phantom');

  const integrations: Record<IntegrationKey, IntegrationInfo> = {
    phantom: {
      name: 'Phantom Wallet',
      description: 'Educate users during wallet creation',
      code: `// Example: How Phantom would integrate SolanaFirst
import { SolanaFirstButton } from '@solanafirst/sdk';

function PhantomOnboarding() {
  return (
    <div>
      <h2>Welcome to Phantom</h2>
      <p>First time with Solana? Start safely:</p>
      
      <SolanaFirstButton
        apiKey="phantom_api_key"
        onComplete={(user) => {
          createWallet();
          showWelcomeBonus();
        }}
        theme="dark"
      />
    </div>
  );
}`
    },
    jupiter: {
      name: 'Jupiter DEX',
      description: 'Require education before first swap',
      code: `// Example: How Jupiter would verify education
import { checkEducation } from '@solanafirst/sdk';

function JupiterSwap() {
  const [isEducated, setIsEducated] = useState(false);

  useEffect(() => {
    checkEducation(wallet.publicKey, API_KEY)
      .then(setIsEducated);
  }, [wallet]);

  if (!isEducated) {
    return (
      <Alert>
        ⚠️ First swap? Practice safely first:
        <SolanaFirstButton />
      </Alert>
    );
  }

  return <SwapInterface />;
}`
    },
    drift: {
      name: 'Drift Protocol',
      description: 'Gate features by education level on-chain',
      code: `// Example: Smart contract gating (Rust)
use solanafirst::EducationRecord;

pub fn open_leverage_position(
    ctx: Context<OpenPosition>
) -> Result<()> {
    // Verify user education on-chain
    let education = get_education_account(
        &ctx.accounts.user
    );
    
    require!(
        education.level >= 3,
        ErrorCode::InsufficientEducation
    );
    
    // Proceed with position...
    Ok(())
}`
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => setCurrentView('demo')}
        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm mb-8"
      >
        ← Back to Demo
      </button>

      <h1 className="text-4xl font-bold mb-4 text-center">SDK Integration Examples</h1>
      <p className="text-xl text-purple-300 text-center mb-12 max-w-2xl mx-auto">
        See how easy it is to integrate SolanaFirst into your dApp
      </p>

      {/* Integration Tabs */}
      <div className="flex gap-4 justify-center mb-8">
        {(Object.keys(integrations) as IntegrationKey[]).map(key => (
          <button
            key={key}
            onClick={() => setActiveIntegration(key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeIntegration === key
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-purple-300 hover:bg-white/20'
            }`}
          >
            {integrations[key].name}
          </button>
        ))}
      </div>

      {/* Code Example */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 rounded-xl p-8 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold mb-2">{integrations[activeIntegration].name}</h2>
          <p className="text-purple-300 mb-6">{integrations[activeIntegration].description}</p>

          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              {integrations[activeIntegration].code}
            </pre>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6">
            <h3 className="font-bold mb-3">✅ Benefits:</h3>
            <ul className="text-sm space-y-2 text-green-200">
              <li>• Integration in under 30 minutes</li>
              <li>• 60% reduction in support tickets</li>
              <li>• Higher user quality and retention</li>
              <li>• On-chain verification (trustless)</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-6">
            <h3 className="font-bold mb-3">📦 What You Get:</h3>
            <ul className="text-sm space-y-2 text-blue-200">
              <li>• NPM package (@solanafirst/sdk)</li>
              <li>• React hooks and components</li>
              <li>• TypeScript definitions</li>
              <li>• Full documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}