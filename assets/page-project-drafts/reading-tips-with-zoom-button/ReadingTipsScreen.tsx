import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ZoomIn, ZoomOut } from 'lucide-react';
import { APP_COLORS } from '../constants';
import { Screen } from '../types';

interface ReadingTipsScreenProps {
  onNavigate: (screen: Screen, params?: any) => void;
  updateHeaderTitle?: (title: React.ReactNode) => void;
}

const InlineLink = ({ label, onClick, isLargeText }: { label: string; onClick: () => void; isLargeText: boolean }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`text-[#0096C7] font-semibold underline decoration-[#0096C7]/30 hover:decoration-[#0096C7] transition-all inline px-0 py-0 align-baseline border-none bg-transparent cursor-pointer ${isLargeText ? 'text-[27px]' : 'text-[18px]'}`}
  >
    {label}
  </button>
);

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isLargeText: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle, isLargeText }) => {
  return (
    <div className="w-full border-2 border-gray-100 rounded-[2rem] bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full px-7 py-5 flex items-center justify-between text-left active:bg-gray-50 transition-colors"
      >
        <span className={`font-normal leading-tight ${APP_COLORS.textMain} ${isLargeText ? 'text-[33px]' : 'text-[22px]'}`}>
          {title}
        </span>
        <div className={`shrink-0 ml-4 ${APP_COLORS.textAccent}`}>
          {isOpen ? <ChevronUp size={isLargeText ? 36 : 24} /> : <ChevronDown size={isLargeText ? 36 : 24} />}
        </div>
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className={`px-7 pb-8 font-normal leading-relaxed text-gray-600 whitespace-pre-line ${isLargeText ? 'text-[27px]' : 'text-[18px]'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const ReadingTipsScreen: React.FC<ReadingTipsScreenProps> = ({ onNavigate, updateHeaderTitle }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    // Lock header title to 32px as requested, ignoring isLargeText
    const titleContent = (
      <h1 className="font-normal leading-tight text-[#002B5B] text-[32px] truncate">
        Reading tips
      </h1>
    );
    updateHeaderTitle?.(titleContent);
    return () => updateHeaderTitle?.("");
  }, [updateHeaderTitle]);

  const tips = [
    {
      title: "Accent marks matter",
      content: (
        <>
          In words with more than one syllable, Modern Greek uses one accent mark (΄) above a syllable to show that it's stressed.<br /><br />
          The accent mark (΄) shows which part of a word should be more emphasized, usually just louder and stronger (Like A in Apple).<br /><br />
          Moving the accent mark can change the meaning of a word:<br /><br />
          • Τζάμι = Glass<br />
          • Τζαμί = Mosque<br /><br />
          Note: In αυ and ευ the accent mark (΄) goes above υ (like so: ύ) — but the stress is on the vowel before ύ.<br /><br />
          Example: Εύγε.<br /><br />
          In this word, the accent mark is on ύ, but the stress is on the first vowel — ε ('EV-ye). <br /><br />
          Learn more about αυ and ευ in <InlineLink isLargeText={isLargeText} label="Bonus Level 4" onClick={() => onNavigate(Screen.Learning, { selectedLevelId: 'b4', currentLetterIndex: 0 })} />.
        </>
      )
    },
    {
      title: "Double letters are not longer",
      content: "In Modern Greek, a double consonant is always pronounced as one. For example:\n\n• Ελλάδα is pronounced with one L sound\n\n• Σάββατο is pronounced with one V sound\n\nDon't lengthen double letters when reading."
    },
    {
      title: "Punctuation differences",
      content: (
        <>
          Modern Greek punctuation looks similar to English, but there are two important differences:<br /><br />
          <strong>1. The semicolon “;”</strong> is used like a question mark (?).<br /><br />
          <strong>2. The middle dot “·”</strong> is used like a semicolon (;) or colon (:).<br /><br />
          Keep this in mind when reading sentences.
        </>
      )
    },
    {
      title: "Some vowels work in pairs",
      content: (
        <>
          As <InlineLink isLargeText={isLargeText} label="Bonus Level 2" onClick={() => onNavigate(Screen.Learning, { selectedLevelId: 'b2', currentLetterIndex: 0 })} /> explains:<br />
          • αι: sounds like ε (E in Pet)<br />
          • ει, οι, υι: sound like ι (EE in Meet)<br />
          • ου: sounds like OO in Food<br /><br />
          Even though they use two letters, they represent a single vowel sound.<br /><br />
          There is no rule that tells you which spelling to choose when writing — this depends on word history — but when reading, they are pronounced the same.
        </>
      )
    },
    {
      title: "Some consonant combinations represent single sounds",
      content: (
        <>
          As Bonus levels <InlineLink isLargeText={isLargeText} label="1 (τσ, τζ)" onClick={() => onNavigate(Screen.Learning, { selectedLevelId: 'b1', currentLetterIndex: 0 })} /> and <InlineLink isLargeText={isLargeText} label="3 (inc. μπ, ντ, Γκ)" onClick={() => onNavigate(Screen.Learning, { selectedLevelId: 'b3', currentLetterIndex: 0 })} /> explain:<br /><br />
          • τσ: sounds like TS<br />
          • τζ: sounds like DZ<br />
          • μπ: usually sounds like B<br />
          • ντ: usually sounds like D<br />
          • Γκ: sounds like hard G at the beginning of words<br /><br />
          These letter pairs represent single consonant sounds when reading.
        </>
      )
    },
    {
      title: "Some consonants change before certain vowels",
      content: (
        <>
          As <InlineLink isLargeText={isLargeText} label="Level 6" onClick={() => onNavigate(Screen.Learning, { selectedLevelId: 'l6', currentLetterIndex: 0 })} /> explains, γ and χ change sound depending on the vowel that follows them. They sound “hard” (like CH in Loch) or “soft” (like H in Huge).<br /><br />
          There are two more consonants like that, but changing much less:<br /><br />
          • κ becomes slightly softer before ε (E in Pet) or ι (EE in Meet)<br />
          • λ before ι sounds lighter and more forward in the mouth<br /><br />
          These shifts do not change meaning — they simply make speech smoother in Modern Greek.
        </>
      )
    },
    {
      title: "Two forms of sigma",
      content: (
        <>
          As <InlineLink isLargeText={isLargeText} label="Level 7" onClick={() => onNavigate(Screen.Learning, { selectedLevelId: 'l7', currentLetterIndex: 0 })} /> explains, the letter sigma (sounds like ’s’) has two written forms as small letters (in lowercase):<br /><br />
          <strong>1. σ</strong> is used at the beginning or middle of a word.<br /><br />
          <strong>2. ς</strong> is used only at the end of a word.<br /><br />
          They sound exactly the same.
        </>
      )
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pb-2 animate-in slide-in-from-bottom-4 duration-500 relative">
      {/* Target only the sticky layout header to prevent leaking into Menu Overlay when it's open */}
      <style>{`
        body:not(.menu-open) header.sticky {
          background-color: rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(24px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
          height: calc(112px + 2rem) !important;
          padding-bottom: 35px !important;
          mask-image: linear-gradient(to bottom, 
            black 0%, 
            black 65%, 
            rgba(0,0,0,0.5) 85%, 
            transparent 100%
          ) !important;
          -webkit-mask-image: linear-gradient(to bottom, 
            black 0%, 
            black 65%, 
            rgba(0,0,0,0.5) 85%, 
            transparent 100%
          ) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>

      <div className="mb-[50px] text-center pt-1">
        <p className={`font-normal text-[#002B5B]/80 text-left px-8 transition-all duration-300 ${isLargeText ? 'text-[30px] length-1.6]' : 'text-[20px] background-transparent leading-[1.45]'}`}>
          Greek spelling is consistent and predictable. Once you learn the key patterns, you will probably read most Modern Greek words with higher confidence.
        </p>
      </div>

      <div className="space-y-4 mb-20">
        {tips.map((tip, index) => (
          <AccordionItem
            key={index}
            title={tip.title}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            isLargeText={isLargeText}
          >
            {tip.content}
          </AccordionItem>
        ))}
      </div>

      {/* Floating Liquid Glass Text Toggle */}
      <button 
        onClick={() => setIsLargeText(!isLargeText)}
        className="fixed bottom-10 left-6 z-[60] w-14 h-14 flex items-center justify-center rounded-full liquid-glass-dark shadow-lg active:scale-90 transition-all border border-white/20"
        aria-label="Toggle text size"
      >
        <div className="flex flex-col items-center justify-center -space-y-1">
          {isLargeText ? (
            <ZoomOut size={18} className="text-[#0096C7]" style={{ paddingRight: '0.05rem' }} />
          ) : (
            <ZoomIn size={18} className="text-[#002B5B]" style={{ paddingRight: '0.05rem' }} />
          )}
          <span 
            className={`text-[12px] font-bold ${isLargeText ? 'text-[#0096C7]' : 'text-[#002B5B]'}`}
            style={{ paddingTop: '0.25rem' }}
          >
            {isLargeText ? '150%' : '100%'}
          </span>
        </div>
      </button>
    </div>
  );
};