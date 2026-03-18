import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Screen, AppState } from './types';
import { LEVELS, GREEK_ALPHABET, APP_COLORS } from './constants';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LevelsScreen } from './screens/LevelsScreen';
import { LearningScreen } from './screens/LearningScreen';
import { LevelCompleteScreen } from './screens/LevelCompleteScreen';
import { TestScreen } from './screens/TestScreen';
import { ExerciseScreen } from './screens/ExerciseScreen';
import { ReadingTipsScreen } from './screens/ReadingTipsScreen';
import { FAQScreen } from './screens/FAQScreen';
import { ContactScreen } from './screens/ContactScreen';
import { CaseStudyScreen } from './screens/CaseStudyScreen';
import { MenuOverlay } from './screens/MenuOverlay';
import { ConsentModal } from './components/ConsentModal';
import { SplashScreen } from './components/SplashScreen';
import { audioManager } from './components/AudioManager';
import { InterstitialOverlay } from './components/AdPlaceholder';
import { CheckCircle, AlertCircle } from 'lucide-react';

const CONSENT_KEY = 'lettersgr_consent_given';
const PROGRESS_KEY = 'lettersgr_level_progress';
const TEST_SESSION_KEY = 'lettersgr_test_session_progress';
const TOP_SCORE_KEY = 'lettersgr_test_top_score';
const SPLASH_DURATION = 3000;
const FADE_DURATION = 1500;

// Logical groups for the visual grouping feature
const SOUND_GROUPS = [
  ['iota', 'eta', 'upsilon'],
  ['omicron', 'omega'],
  ['sigma', 'final_sigma'],
  ['ei_digraph', 'oi_digraph', 'yi_digraph'],
  ['gk_mid_digraph', 'gg_mid_digraph']
];

const App: React.FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);
  const [state, setState] = useState<AppState>({
    currentScreen: Screen.Welcome
  });
  const [screenHistory, setScreenHistory] = useState<AppState[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuInitialView, setMenuInitialView] = useState<'main' | 'cookies'>('main');
  const [showConsent, setShowConsent] = useState(false);
  const [showExitTestConfirmation, setShowExitTestConfirmation] = useState(false);
  const [toast, setToast] = useState<{ message: React.ReactNode; type: 'success' | 'info' } | null>(null);
  const [dynamicHeaderTitle, setDynamicHeaderTitle] = useState<React.ReactNode>(null);
  
  // Intro Transition state
  const [introTransition, setIntroTransition] = useState<{ text: string } | null>(null);
  const [showIntroOverlay, setShowIntroOverlay] = useState(false);

  // Interstitial Ad state
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingInterstitialAction, setPendingInterstitialAction] = useState<(() => void) | null>(null);

  // Initial load effect (Splash Screen with Crossfade)
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsSplashFading(true);
      const hasConsent = localStorage.getItem(CONSENT_KEY);
      if (!hasConsent) {
        setShowConsent(true);
      }
    }, SPLASH_DURATION);

    const removeTimer = setTimeout(() => {
      setShowSplashScreen(false);
    }, SPLASH_DURATION + FADE_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Persist Progress & Session
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'all') {
      // Save level progress
      if (state.currentScreen === Screen.Learning && state.selectedLevelId) {
        const savedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        savedProgress[state.selectedLevelId] = state.currentLetterIndex || 0;
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(savedProgress));
      }
      // Save full app state for session resumption
      localStorage.setItem('lettersgr_last_state', JSON.stringify({
        currentScreen: state.currentScreen,
        selectedLevelId: state.selectedLevelId,
        currentLetterIndex: state.currentLetterIndex,
        activeTestLetterIds: state.activeTestLetterIds,
        testPhase: state.testPhase
      }));
    }
  }, [state]);

  // Toast timeout effect
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleConsent = (accepted: boolean, showToast: boolean = false) => {
    audioManager.unlock();
    localStorage.setItem(CONSENT_KEY, accepted ? 'all' : 'essential');
    setShowConsent(false);
    
    if (!showToast) return;

    if (accepted) {
      setToast({
        message: (
          <>
            All functions are available. Change cookie settings anytime via the{' '}
            <button 
              onClick={() => { setMenuInitialView('cookies'); setShowMenu(true); setToast(null); }}
              className="underline decoration-[#8EFFDF] hover:opacity-80 transition-opacity"
            >
              menu
            </button>.
          </>
        ),
        type: 'success'
      });
    } else {
      setToast({
        message: (
          <>
            Progress saving is disabled. Change cookie settings anytime via the{' '}
            <button 
              onClick={() => { setMenuInitialView('cookies'); setShowMenu(true); setToast(null); }}
              className="underline decoration-[#0096C7] hover:opacity-80 transition-opacity"
            >
              menu
            </button>.
          </>
        ),
        type: 'info'
      });
    }
  };

  const navigateTo = useCallback((screen: Screen, params?: Partial<AppState>, pushHistory = true) => {
    audioManager.unlock();

    let finalParams = { ...params };

    // Restore level progress if navigating to learning and no index is specified
    if (screen === Screen.Learning && finalParams.currentLetterIndex === undefined) {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (consent === 'all') {
        const savedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        const levelId = finalParams.selectedLevelId || state.selectedLevelId || 'l1';
        if (savedProgress[levelId] !== undefined) {
          finalParams.currentLetterIndex = savedProgress[levelId];
        }
      }
    }

    // Trigger transitions for initial level starts OR full scored test
    const isLevelStart = screen === Screen.Learning && (finalParams.currentLetterIndex === 0 || finalParams.currentLetterIndex === undefined);
    const isFullTestStart = screen === Screen.Test && finalParams.selectedLevelId === 'all';

    if (isLevelStart || isFullTestStart) {
      let text = "";
      if (isLevelStart) {
        const level = LEVELS.find(l => l.id === (finalParams.selectedLevelId || 'l1'));
        text = level?.isBonus ? level.title : `Level ${LEVELS.findIndex(l => l.id === (finalParams.selectedLevelId || 'l1')) + 1}`;
      } else {
        text = "Scored Test";
      }
      
      setIntroTransition({ text });
      setShowIntroOverlay(true);

      // Transition Content Swap
      setTimeout(() => {
        if (pushHistory) {
          setScreenHistory(prev => [...prev, { ...state }]);
        }
        setState(prev => ({ ...prev, currentScreen: screen, ...finalParams }));
        window.scrollTo(0, 0);
      }, 1200);

      // Cleanup
      setTimeout(() => {
        setShowIntroOverlay(false);
        setIntroTransition(null);
      }, 2700);

      return;
    }

    // Direct navigation for all other cases
    if (pushHistory) {
      setScreenHistory(prev => [...prev, { ...state }]);
    }
    setState(prev => ({ ...prev, currentScreen: screen, ...finalParams }));
    window.scrollTo(0, 0);
  }, [state]);

  const goBack = () => {
    if (state.currentScreen === Screen.Test && state.selectedLevelId === 'all') {
      setShowExitTestConfirmation(true);
      return;
    }

    if (screenHistory.length > 0) {
      const previous = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1));
      setState(previous);
      window.scrollTo(0, 0);
    } else {
      navigateTo(Screen.Welcome, {}, false);
    }
  };

  const confirmExitTest = () => {
    setShowExitTestConfirmation(false);
    localStorage.removeItem(TEST_SESSION_KEY);
    if (state.selectedLevelId === 'all') navigateTo(Screen.Welcome, {}, false);
    else navigateTo(Screen.Learning, {}, false);
  };

  const testLetterIds = useMemo(() => {
    if (state.currentScreen !== Screen.Test) return [];
    if (state.activeTestLetterIds) return state.activeTestLetterIds;
    return state.selectedLevelId === 'all' 
      ? GREEK_ALPHABET.filter(l => !l.isBonus).map(l => l.id) 
      : (LEVELS.find(l => l.id === state.selectedLevelId)?.letters || LEVELS[0].letters);
  }, [state.currentScreen, state.selectedLevelId, state.activeTestLetterIds]);

  const renderScreen = () => {
    switch (state.currentScreen) {
      case Screen.Welcome:
        return (
          <WelcomeScreen 
            onStart={() => navigateTo(Screen.Test, { selectedLevelId: 'all' })} 
            onSkipToLevel={(id) => navigateTo(Screen.Learning, { selectedLevelId: id, currentLetterIndex: 0 })}
          />
        );
      
      case Screen.Levels:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-4 p-1.5 bg-gray-100 rounded-[2rem]">
              <button 
                onClick={() => navigateTo(Screen.Levels)}
                className={`flex-1 py-4 text-base font-bold rounded-[1.5rem] transition-all ${state.currentScreen === Screen.Levels ? 'bg-white shadow-md text-[#0096C7]' : 'text-gray-500'}`}
              >
                Letters
              </button>
              <button 
                onClick={() => navigateTo(Screen.Exercises)}
                className="flex-1 py-4 text-base font-bold text-gray-500 rounded-[1.5rem] hover:bg-white/50"
              >
                Exercises
              </button>
            </div>
            <LevelsScreen onSelectLevel={(id) => navigateTo(Screen.Learning, { selectedLevelId: id, currentLetterIndex: 0 })} />
          </div>
        );

      case Screen.Exercises:
        return (
          <div className="space-y-8">
             <div className="flex gap-4 p-1.5 bg-gray-100 rounded-[2rem]">
              <button 
                onClick={() => navigateTo(Screen.Levels)}
                className="flex-1 py-4 text-base font-bold text-gray-500 rounded-[1.5rem] hover:bg-white/50"
              >
                Letters
              </button>
              <button 
                className="flex-1 py-4 text-base font-bold bg-white shadow-md text-[#0096C7] rounded-[1.5rem]"
              >
                Exercises
              </button>
            </div>
            <ExerciseScreen />
          </div>
        );

      case Screen.Learning: {
        const levelId = state.selectedLevelId || 'l1';
        const level = LEVELS.find(l => l.id === levelId)!;
        const currentIndex = state.currentLetterIndex || 0;

        return (
          <LearningScreen 
            letterIds={level.letters} 
            initialIndex={currentIndex}
            updateHeaderTitle={setDynamicHeaderTitle}
            onTest={() => {
              const currentId = level.letters[currentIndex];
              const group = SOUND_GROUPS.find(g => g.includes(currentId));
              let step = 1;
              let groupIds = [currentId];
              
              if (group) {
                let count = 0;
                let foundIds: string[] = [];
                for (let i = currentIndex; i < level.letters.length; i++) {
                  if (group.includes(level.letters[i])) {
                    count++;
                    foundIds.push(level.letters[i]);
                  }
                  else break;
                }
                step = count;
                groupIds = foundIds;
              }

              if (levelId !== 'l1') {
                navigateTo(Screen.Test, { 
                  selectedLevelId: level.id, 
                  activeTestLetterIds: groupIds,
                  testPhase: 'single',
                  currentLetterIndex: currentIndex
                }, true);
              } else {
                if (currentIndex + step < level.letters.length) {
                  navigateTo(Screen.Learning, { 
                    selectedLevelId: level.id, 
                    currentLetterIndex: currentIndex + step 
                  }, true);
                } else {
                  const consent = localStorage.getItem(CONSENT_KEY);
                  if (consent === 'all') {
                    const savedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
                    delete savedProgress[level.id];
                    localStorage.setItem(PROGRESS_KEY, JSON.stringify(savedProgress));
                  }
                  navigateTo(Screen.LevelComplete, { selectedLevelId: level.id });
                }
              }
            }}
          />
        );
      }

      case Screen.LevelComplete: {
        const currentId = state.selectedLevelId || 'l1';
        const currentIndex = LEVELS.findIndex(l => l.id === currentId);
        const isFinal = currentId === 'l7';
        const isFinalBonus = currentId === 'b4';
        
        // Show interstitial ads for all levels and bonus levels except for the very final ones
        const shouldShowAd = !isFinal && !isFinalBonus;

        const handleAction = (next: () => void) => {
          if (shouldShowAd) {
            setPendingInterstitialAction(() => next);
            setShowInterstitial(true);
          } else {
            next();
          }
        };

        return (
          <LevelCompleteScreen 
            levelId={currentId} 
            onContinue={() => handleAction(() => {
              if (isFinalBonus) {
                navigateTo(Screen.ReadingTips);
              } else if (isFinal) {
                navigateTo(Screen.Learning, { selectedLevelId: 'b1', currentLetterIndex: 0 });
              } else {
                const nextId = LEVELS[currentIndex + 1].id;
                navigateTo(Screen.Learning, { selectedLevelId: nextId, currentLetterIndex: 0 });
              }
            })} 
            onRestart={() => handleAction(() => navigateTo(Screen.Learning, { selectedLevelId: currentId, currentLetterIndex: 0 }))}
            onBonus={() => handleAction(() => navigateTo(Screen.Learning, { selectedLevelId: 'b1', currentLetterIndex: 0 }))}
          />
        );
      }

      case Screen.Test: {
        return (
          <TestScreen 
            letterIds={testLetterIds} 
            hideResults={state.selectedLevelId !== 'all'}
            onFinish={() => {
              const levelId = state.selectedLevelId || 'l1';
              const level = LEVELS.find(l => l.id === levelId)!;
              const currentIndex = state.currentLetterIndex || 0;

              if (state.testPhase === 'single') {
                const currentId = level.letters[currentIndex];
                const group = SOUND_GROUPS.find(g => g.includes(currentId));
                let step = 1;
                if (group) {
                  let count = 0;
                  for (let i = currentIndex; i < level.letters.length; i++) {
                    if (group.includes(level.letters[i])) count++;
                    else break;
                  }
                  step = count;
                }

                if (currentIndex + step < level.letters.length) {
                  navigateTo(Screen.Learning, { 
                    selectedLevelId: level.id, 
                    currentLetterIndex: currentIndex + step 
                  }, false);
                } else {
                  const consent = localStorage.getItem(CONSENT_KEY);
                  if (consent === 'all') {
                    const savedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
                    delete savedProgress[levelId];
                    localStorage.setItem(PROGRESS_KEY, JSON.stringify(savedProgress));
                  }
                  navigateTo(Screen.LevelComplete, { selectedLevelId: level.id });
                }
              } else if (state.testPhase === 'level') {
                const consent = localStorage.getItem(CONSENT_KEY);
                if (consent === 'all') {
                  const savedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
                  delete savedProgress[levelId];
                  localStorage.setItem(PROGRESS_KEY, JSON.stringify(savedProgress));
                }
                navigateTo(Screen.LevelComplete, { selectedLevelId: level.id });
              } else {
                navigateTo(Screen.Levels);
              }
            }} 
            onStartBonusLevels={() => navigateTo(Screen.Learning, { selectedLevelId: 'b1', currentLetterIndex: 0 })}
            onOpenMenu={() => { setMenuInitialView('main'); setShowMenu(true); }}
            onStartLevel1={() => navigateTo(Screen.Learning, { selectedLevelId: 'l1', currentLetterIndex: 0 })}
            updateHeaderTitle={setDynamicHeaderTitle}
            selectedLevelId={state.selectedLevelId}
          />
        );
      }

      case Screen.ReadingTips:
        return <ReadingTipsScreen onNavigate={navigateTo} updateHeaderTitle={setDynamicHeaderTitle} />;
      
      case Screen.FAQ:
        return <FAQScreen updateHeaderTitle={setDynamicHeaderTitle} />;

      case Screen.CONTACT:
        return <ContactScreen updateHeaderTitle={setDynamicHeaderTitle} onOpenMenu={() => { setMenuInitialView('main'); setShowMenu(true); }} />;

      case Screen.CaseStudy:
        return <CaseStudyScreen updateHeaderTitle={setDynamicHeaderTitle} />;

      default:
        return <WelcomeScreen onStart={() => navigateTo(Screen.Test, { selectedLevelId: 'all' })} onSkipToLevel={(id) => navigateTo(Screen.Learning, { selectedLevelId: id, currentLetterIndex: 0 })} />;
    }
  };

  const getTitle = () => {
    if (state.currentScreen === Screen.Welcome) return undefined;
    if (state.currentScreen === Screen.Levels) return "Groups";
    if (state.currentScreen === Screen.Exercises) return "Practice";
    if (state.currentScreen === Screen.Learning || state.currentScreen === Screen.Test || state.currentScreen === Screen.ReadingTips || state.currentScreen === Screen.FAQ || state.currentScreen === Screen.CONTACT || state.currentScreen === Screen.CaseStudy) {
        return dynamicHeaderTitle || "";
    }
    if (state.currentScreen === Screen.LevelComplete) return undefined;
    return "LettersGR";
  };

  const closeInterstitial = () => {
    setShowInterstitial(false);
    if (pendingInterstitialAction) {
      pendingInterstitialAction();
      setPendingInterstitialAction(null);
    }
  };

  return (
    <>
      <Layout 
        title={getTitle() as any} 
        onBack={state.currentScreen !== Screen.Welcome ? goBack : undefined}
        onMenuToggle={() => { setMenuInitialView('main'); setShowMenu(true); }}
        showMenu={showMenu}
      >
        {renderScreen()}
      </Layout>

      {toast && (
        <div className="fixed top-[calc(1.5rem+env(safe-area-inset-top,0px)+10px)] left-1/2 -translate-x-1/2 z-[500] w-[90%] max-w-sm">
          <div className={`flex items-start space-x-3 p-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-500 ${toast.type === 'success' ? 'bg-[#002B5B] text-white' : 'bg-white border-2 border-gray-100 text-[#002B5B]'}`}>
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' ? <CheckCircle size={20} className="text-[#8EFFDF]" /> : <AlertCircle size={20} className="text-[#0096C7]" />}
            </div>
            <div className="text-[18px] font-medium leading-snug">
              {toast.message}
            </div>
          </div>
        </div>
      )}
      
      {showMenu && (
        <MenuOverlay 
          onClose={() => setShowMenu(false)} 
          onNavigate={navigateTo} 
          onUpdateConsent={(accepted) => handleConsent(accepted, false)} 
          initialView={menuInitialView}
        />
      )}
      {showConsent && <ConsentModal onAccept={() => handleConsent(true, true)} onDecline={() => handleConsent(false, true)} />}
      
      {showExitTestConfirmation && (
        <div className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300">
            <h2 className={`text-2xl font-bold mb-8 ${APP_COLORS.textMain} text-center`}>
              Close the test?
            </h2>
            <div className="w-full space-y-3">
              <button
                onClick={confirmExitTest}
                className="w-full py-4 rounded-full bg-red-500 text-white font-bold text-xl active:scale-95 transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => setShowExitTestConfirmation(false)}
                className="w-full py-4 rounded-full bg-gray-100 text-[#002B5B] font-bold text-xl active:scale-95 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showInterstitial && (
        <InterstitialOverlay onClose={closeInterstitial} />
      )}

      {/* Temporary Intro Transition Overlay */}
      {showIntroOverlay && introTransition && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gradient-to-b from-[#B2FEFF] to-[#8EFFDF] animate-intro-crossfade pointer-events-none">
          <span className="text-[36px] font-light text-[#002B5B] pb-[0.1rem] animate-intro-text">
            {introTransition.text}
          </span>
        </div>
      )}

      {showSplashScreen && (
        <SplashScreen isFading={isSplashFading} />
      )}
    </>
  );
};

export default App;