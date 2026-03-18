import { GreekLetter, LevelGroup } from './types';

/**
 * App-wide color palette for consistent branding.
 */
export const APP_COLORS = {
  bg: 'bg-white',
  textMain: 'text-[#002B5B]',
  textAccent: 'text-[#0096C7]',
  button: 'bg-[#007ACC]',
};

/**
 * Level themes and content for celebration screens.
 */
export const LEVEL_THEMES: Record<string, { desc: string; image: string; location: string; link: string }> = {
  'l1': { 
    desc: 'Letters Α, Ε, Κ, Τ are the foundation. They look and sound very similar to their English counterparts!',
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/6753aa826c5c5c811074ad7b95b581d4b3a73b65/media/photos/end-level/1-Kea1080x716.jpg',
    location: 'Κέα',
    link: 'https://goutoslines.gr/en/kea-tzia/'
  },
  'l2': { 
    desc: '',
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/6753aa826c5c5c811074ad7b95b581d4b3a73b65/media/photos/end-level/2-Matala-joachim-ansorg-9tXcHDXpi2E-unsplash-comp.jpg',
    location: 'Μάταλα',
    link: 'https://unsplash.com/photos/silhouette-photo-of-island-near-shoreline-during-daytime-9tXcHDXpi2E'
  },
  'l3': { 
    desc: 'Beware of the "false friends" like B and Ρ. They look familiar but sound entirely different in Greek!',
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/6753aa826c5c5c811074ad7b95b581d4b3a73b65/media/photos/end-level/3-kavala-mehmet-talha-onuk-dOdGLQxrp2w-unsplash.jpg',
    location: 'Καβάλα',
    link: 'https://unsplash.com/photos/a-small-island-in-the-middle-of-a-body-of-water-dOdGLQxrp2w'
  },
  'l4': { 
    desc: 'The vowel cluster! Greek has several ways to write the "ee" and "o" sounds. Context is everything.',
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/6753aa826c5c5c811074ad7b95b581d4b3a73b65/media/photos/end-level/4-ikaria-vasiliki-theodoridou-5hwgNSho-gA-unsplash.jpg',
    location: 'Ικαρία',
    link: 'https://unsplash.com/photos/a-group-of-people-swimming-in-the-ocean-5hwgNSho-gA'
  },
  'l5': { 
    desc: '',
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/6753aa826c5c5c811074ad7b95b581d4b3a73b65/media/photos/end-level/5-alt-athens-florian-wehde-SBgByAsE-40-unsplash.jpg',
    location: 'Αθήνα',
    link: 'https://unsplash.com/photos/city-skyline-during-night-time-SBgByAsE-40'
  },
  'l6': { 
    desc: '',
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/6753aa826c5c5c811074ad7b95b581d4b3a73b65/media/photos/end-level/6-Chalkida-elias-tsapaliaris-k8d6xVy6vUk-unsplash.jpg',
    location: 'Χαλκίδα',
    link: 'https://unsplash.com/photos/an-aerial-view-of-a-bridge-over-a-body-of-water-k8d6xVy6vUk'
  },
  'l7': { 
    desc: "All the Modern Greek letters, kudos! If you feel like more, there's a test or the bonus levels to learn how letters mix to make different sounds.",
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/6753aa826c5c5c811074ad7b95b581d4b3a73b65/media/photos/end-level/7-naxos-cosmos-drone-pilot-aKItgAv8NVY-unsplash.jpg',
    location: 'Νάξος',
    link: 'https://unsplash.com/photos/aerial-view-of-ocean-aKItgAv8NVY'
  },
  'b1': {
    desc: "'Τσ' and 'τζ' are common in everyday Greek. Two new sounds unlocked!",
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/564b3800714c5fa0227d276d8c5d085f7d280ae1/media/photos/end-level/b1-gregmontani-zakynthos-1583127-c-1920h.jpg',
    location: 'Τζάντε',
    link: 'https://pixabay.com/photos/zakynthos-greece-shipwreck-beach-1583127/'
  },
  'b2': {
    desc: 'You’ve discovered vowel pairs! A major boost for reading Greek.',
    image: 'https://images.unsplash.com/photo-1663617834540-6cbe78e3b96d?q=40&w=1632&auto=format&fit=crop',
    location: 'Πειραιάς',
    link: 'https://unsplash.com/photos/a-city-next-to-a-body-of-water-ZnwqRX6DIMM'
  },
  'b3': {
    desc: "Yes, Greek has B, D, and G! But they're formed by letter pairs. Start to spot them, and practice is key. \nYou've got this!",
    image: 'https://images.unsplash.com/photo-1589482531549-d22ebae58d73?q=40&w=1515&auto=format&fit=crop',
    location: 'Μπάλος',
    link: 'https://unsplash.com/photos/brown-and-green-island-on-blue-sea-under-blue-sky-during-daytime-P0dukVtZ_F4'
  },
  'b4': {
    desc: 'These are all the unintuitive letter combinations, very well done!\n\nAdd alphabet and reading patterns (tips below), and you are ready to start reading Modern Greek.',
    image: 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/77e3212ba7f5ee0dca2300693f5abf7fdc36b4a9/media/photos/end-level/8-lefkada-anton-drachuk-hor-xtra-comp.jpg',
    location: 'Λευκάδα',
    link: 'https://linkedin.com/in/drachuk/'
  },
  'all': {
    desc: 'That’s the whole Greek alphabet! From Alpha to Omega, you have mastered all 24 letters.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200',
    location: 'Oia',
    link: '#'
  }
};

/**
 * Clean base URL for raw GitHub content.
 */
const AUDIO_BASE = 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/main/audio/';

/**
 * Verified IPA Phoneme Audio Sources for Modern Greek.
 */
export const GREEK_ALPHABET: GreekLetter[] = [
  { 
    id: 'alpha', name: 'Alpha', upper: 'Α', lower: 'α', 
    sounds: [{
      ipa: '[a]', description: 'Like A \nin Car', example: 'Father',
      audioUrl: `${AUDIO_BASE}Open_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'beta', name: 'Beta', upper: 'Β', lower: 'β', 
    sounds: [{
      ipa: '[v]', description: 'Like V \nin Vine', example: 'Vet',
      audioUrl: `${AUDIO_BASE}Voiced_labiodental_fricative.mp3`
    }],
    pronunciationNote: 'In Modern Greek, this is always a "v" sound.' 
  },
  { 
    id: 'gamma', name: 'Gamma', upper: 'Γ', lower: 'γ', 
    sounds: [
      {
        ipa: '[ɣ]', 
        description: 'Soft G', 
        example: 'Spanish g',
        label: "Before consonants and back vowels:\nα (a), ο/ω (o), and ου (oo).",
        audioUrl: `${AUDIO_BASE}Voiced_velar_fricative.mp3`
      },
      {
        ipa: '[ʝ]', 
        description: 'Like Y in Yes', 
        example: 'Yes',
        label: "Before front vowels:\nε/αι (e), η/ι/υ/ει/οι/υι (ee).",
        audioUrl: `${AUDIO_BASE}Voiced_palatal_fricative.mp3`
      }
    ],
    pronunciationNote: 'Sound varies based on the following vowel.' 
  },
  { 
    id: 'delta', name: 'Delta', upper: 'Δ', lower: 'δ', 
    sounds: [{
      ipa: '[ð]', description: 'Like TH \nin This', example: 'The',
      audioUrl: `${AUDIO_BASE}Voiced_dental_fricative.mp3`
    }]
  },
  { 
    id: 'epsilon', name: 'Epsilon', upper: 'Ε', lower: 'ε', 
    sounds: [{
      ipa: '[e]', description: 'Like E \nin Pet', example: 'Bet',
      audioUrl: `${AUDIO_BASE}Close-mid_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'zeta', name: 'Zeta', upper: 'Ζ', lower: 'ζ', 
    sounds: [{
      ipa: '[z]', description: 'Like Z \nin Zoo', example: 'Zoo',
      audioUrl: `${AUDIO_BASE}Voiced_alveolar_sibilant.mp3`
    }]
  },
  { 
    id: 'eta', name: 'Eta', upper: 'Η', lower: 'η', 
    sounds: [{
      ipa: '[i]', description: 'Like EE \nin Meet', example: 'Police',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }],
    pronunciationNote: 'Modern Greek "Eta" is identical to "Iota" and "Upsilon".'
  },
  { 
    id: 'theta', name: 'Theta', upper: 'Θ', lower: 'θ', 
    sounds: [{
      ipa: '[θ]', description: 'Like TH \nin Think', example: 'Thought',
      audioUrl: `${AUDIO_BASE}Voiceless_dental_fricative.mp3`
    }]
  },
  { 
    id: 'iota', name: 'Iota', upper: 'Ι', lower: 'ι', 
    sounds: [{
      ipa: '[i]', description: 'Like EE \nin Meet', example: 'Igloo',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'kappa', name: 'Kappa', upper: 'Κ', lower: 'κ', 
    sounds: [{
      ipa: '[k]', description: 'Like K \nin Skill', example: 'Scar',
      audioUrl: `${AUDIO_BASE}Voiceless_velar_plosive.mp3`
    }],
    pronunciationNote: 'Unaspirated "k", like \nin <i>skill</i> (unlike in <i>kill</i>).'
  },
  { 
    id: 'lambda', name: 'Lambda', upper: 'Λ', lower: 'λ', 
    sounds: [{
      ipa: '[l]', description: 'Like L \nin Look', example: 'Lamp',
      audioUrl: `${AUDIO_BASE}Alveolar_lateral_approximant.mp3`
    }]
  },
  { 
    id: 'mu', name: 'Mu', upper: 'Μ', lower: 'μ', 
    sounds: [{
      ipa: '[m]', description: 'Like M \nin Moon', example: 'Moon',
      audioUrl: `${AUDIO_BASE}Bilabial_nasal.mp3`
    }]
  },
  { 
    id: 'nu', name: 'Nu', upper: 'Ν', lower: 'ν', 
    sounds: [{
      ipa: '[n]', description: 'Like N \nin Net', example: 'Net',
      audioUrl: `${AUDIO_BASE}Alveolar_nasal.mp3`
    }]
  },
  { 
    id: 'xi', name: 'Xi', upper: 'Ξ', lower: 'ξ', 
    sounds: [{
      ipa: '[ks]', description: 'Like X \nin Taxi', example: 'Taxi',
      audioUrl: `${AUDIO_BASE}Ksi.mp3`
    }]
  },
  { 
    id: 'omicron', name: 'Omicron', upper: 'Ο', lower: 'ο', 
    sounds: [{
      ipa: '[o]', description: 'Like O \nin Port', example: 'Force',
      audioUrl: `${AUDIO_BASE}Close-mid_back_rounded_vowel.mp3`
    }]
  },
  { 
    id: 'pi', name: 'Pi', upper: 'Π', lower: 'π', 
    sounds: [{
      ipa: '[p]', description: 'Like P \nin Spy', example: 'Spy',
      audioUrl: `${AUDIO_BASE}Voiceless_bilabial_plosive.mp3`
    }],
    pronunciationNote: 'Unaspirated "p", like in <i>spy</i> (unlike in <i>pie</i>).'
  },
  { 
    id: 'rho', name: 'Rho', upper: 'Ρ', lower: 'ρ', 
    sounds: [{
      ipa: '[ɾ]', description: 'Like R in Spanish "pero"', example: 'Better',
      audioUrl: `${AUDIO_BASE}Alveolar_tap.mp3`
    }],
    pronunciationNote: 'Tongue tap up, \nlike in saying “d“.'
  },
  { 
    id: 'sigma', name: 'Sigma', upper: 'Σ', lower: 'σ', 
    sounds: [{
      ipa: '[s]', description: 'Like S \nin Sip', example: 'Sun',
      audioUrl: `${AUDIO_BASE}Voiceless_alveolar_sibilant.mp3`
    }]
  },
  { 
    id: 'final_sigma', name: 'Final Sigma', upper: 'Σ', lower: 'ς', 
    sounds: [{
      ipa: '[s]', description: 'Like S \nin Bus', example: 'Lips',
      audioUrl: `${AUDIO_BASE}Voiceless_alveolar_sibilant.mp3`
    }],
    pronunciationNote: 'Special form of Sigma used only at the end of words.'
  },
  { 
    id: 'tau', name: 'Tau', upper: 'Τ', lower: 'τ', 
    sounds: [{
      ipa: '[t]', description: 'Like T \nin Stay', example: 'Stay',
      audioUrl: `${AUDIO_BASE}Voiceless_alveolar_plosive.mp3`
    }],
    pronunciationNote: 'Unaspirated "t", like \nin <i>stay</i> (unlike in <i>tea</i>).'
  },
  { 
    id: 'upsilon', name: 'Upsilon', upper: 'Υ', lower: 'υ', 
    sounds: [{
      ipa: '[i]', description: 'Like EE \nin Meet', example: 'System',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'phi', name: 'Phi', upper: 'Φ', lower: 'φ', 
    sounds: [{
      ipa: '[f]', description: 'Like F \nin Four', example: 'Phone',
      audioUrl: `${AUDIO_BASE}Voiceless_labiodental_fricative.mp3`
    }]
  },
  { 
    id: 'chi', name: 'Chi', upper: 'Х', lower: 'χ', 
    sounds: [
      {
        ipa: '[x]', 
        description: 'Like CH\nin Loch', 
        example: 'Loch',
        label: "Before consonants and back vowels:\nα (a), ο/ω (o), and ου (oo).",
        audioUrl: `${AUDIO_BASE}Voiceless_velar_fricative.mp3`
      },
      {
        ipa: '[ç]', 
        description: 'Like H in Huge', 
        example: 'Huge',
        label: "Before front vowels:\nε/αι (e), η/ι/υ/ει/οι/υι (ee).",
        audioUrl: `${AUDIO_BASE}Voiceless_palatal_fricative.mp3`
      }
    ],
    pronunciationNote: 'Sound varies based on the following vowel.' 
  },
  { 
    id: 'psi', name: 'Psi', upper: 'Ψ', lower: 'ψ', 
    sounds: [{
      ipa: '[ps]', description: 'Like PS \nin Lips', example: 'Popsicle',
      audioUrl: `${AUDIO_BASE}Psi.mp3`
    }]
  },
  { 
    id: 'omega', name: 'Omega', upper: 'Ω', lower: 'ω', 
    sounds: [{
      ipa: '[o]', description: 'Like O \nin Port', example: 'Force',
      audioUrl: `${AUDIO_BASE}Close-mid_back_rounded_vowel.mp3`
    }],
    pronunciationNote: 'In Modern Greek, "Omega" is identical to "Omicron".'
  },
  // Bonus Digraphs
  {
    id: 'ts_digraph', name: 'ts', upper: 'τσ', lower: 'τσ', isBonus: true,
    sounds: [{
      ipa: '[ts]', description: 'Like TS in Cats', example: 'Cats',
      audioUrl: `${AUDIO_BASE}ts-Voiceless_alveolar_sibilant_affricate.mp3`
    }]
  },
  {
    id: 'dz_digraph', name: 'dz', upper: 'τζ', lower: 'τζ', isBonus: true,
    sounds: [{
      ipa: '[dz]', description: 'Like DZ in Godzilla', example: 'Godzilla',
      label: 'Similar to DS in Heads up.',
      audioUrl: `${AUDIO_BASE}dz-Voiced_alveolar_sibilant_affricate.mp3`
    }]
  },
  {
    id: 'ai_digraph', name: 'ai', upper: 'αι', lower: 'αι', isBonus: true,
    sounds: [{
      ipa: '[e]', description: 'Like E in Pet', example: 'Pet',
      audioUrl: `${AUDIO_BASE}Close-mid_front_unrounded_vowel.mp3`
    }]
  },
  {
    id: 'ei_digraph', name: 'ei', upper: 'ει', lower: 'ει', isBonus: true,
    sounds: [{
      ipa: '[i]', description: 'Like EE in Meet', example: 'Meet',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }]
  },
  {
    id: 'oi_digraph', name: 'oi', upper: 'οι', lower: 'οι', isBonus: true,
    sounds: [{
      ipa: '[i]', description: 'Like EE in Meet', example: 'Meet',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }]
  },
  {
    id: 'yi_digraph', name: 'yi', upper: 'υι', lower: 'υι', isBonus: true,
    sounds: [{
      ipa: '[i]', description: 'Like EE in Meet', example: 'Meet',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }]
  },
  {
    id: 'ou_digraph', name: 'ou', upper: 'ου', lower: 'ου', isBonus: true,
    sounds: [{
      ipa: '[u]', description: 'Like OO in Food', example: 'Food',
      audioUrl: `${AUDIO_BASE}ou.mp3`
    }]
  },
  {
    id: 'mp_digraph', name: 'mp', upper: 'μπ', lower: 'μπ', isBonus: true,
    sounds: [
      {
        ipa: '[b]', description: 'Like B in Big', example: 'Big',
        label: 'More common, at the start and in the middle of words, like in Όλυμπος.',
        audioUrl: `${AUDIO_BASE}b-Voiced_bilabial_plosive.mp3`
      },
      {
        ipa: '[mb]', description: 'Like MB in Humble', example: 'Humble',
        label: 'Less common, usually in the middle of words.',
        audioUrl: `${AUDIO_BASE}mb.mp3`
      }
    ]
  },
  {
    id: 'nt_digraph', name: 'nt', upper: 'ντ', lower: 'ντ', isBonus: true,
    sounds: [
      {
        ipa: '[d]', description: 'Like D in Do', example: 'Do',
        label: 'More common, especially at the start of words.',
        audioUrl: `${AUDIO_BASE}d-Voiced_alveolar_plosive.mp3`
      },
      {
        ipa: '[nd]', description: 'Like ND in And', example: 'And',
        label: 'Less common, usually in the middle of words.',
        audioUrl: `${AUDIO_BASE}nd.mp3`
      }
    ]
  },
  {
    id: 'gk_start_digraph', name: 'Γκ', upper: 'Γκ', lower: 'Γκ', isBonus: true,
    sounds: [{
      ipa: '[g]', description: 'Like G in Go', example: 'Go',
      label: 'At the start of words, “Γκ” sounds like a hard G.',
      audioUrl: `${AUDIO_BASE}g-Voiced_velar_plosive.mp3`
    }]
  },
  {
    id: 'gk_mid_digraph', name: 'Mid gk', upper: 'γκ', lower: 'γκ', isBonus: true,
    sounds: [{
      ipa: '[ŋg]', description: 'Like NG in Mango', example: 'Mango',
      label: 'In the middle of words, γκ and γγ sound the same.',
      audioUrl: `${AUDIO_BASE}ng-Prenasalized_voiced_velar_plosive.mp3`
    }]
  },
  {
    id: 'gg_mid_digraph', name: 'Mid gg', upper: 'γγ', lower: 'γγ', isBonus: true,
    sounds: [{
      ipa: '[ŋg]', description: 'Like NG in Mango', example: 'Mango',
      label: 'In the middle of words, γκ and γγ sound the same.',
      audioUrl: `${AUDIO_BASE}ng-Prenasalized_voiced_velar_plosive.mp3`
    }]
  },
  {
    id: 'au_digraph', name: 'au', upper: 'αυ', lower: 'αυ', isBonus: true,
    sounds: [
      {
        ipa: '[av]', description: 'Like AV in Bravo', example: 'Bravo',
        label: 'Before vowels or voiced \nconsonants (β, γ, δ, ζ, λ, μ, ν, ρ)',
        audioUrl: `${AUDIO_BASE}av.mp3`
      },
      {
        ipa: '[af]', description: 'Like AF in Craft', example: 'After',
        label: 'Before voiceless consonants \n(κ, π, τ, χ, φ, θ, σ, ξ, ψ)',
        audioUrl: `${AUDIO_BASE}af.mp3`
      }
    ]
  },
  {
    id: 'eu_digraph', name: 'eu', upper: 'ευ', lower: 'ευ', isBonus: true,
    sounds: [
      {
        ipa: '[ev]', description: 'Like EV in Every', example: 'Every',
        label: 'Before vowels or voiced \nconsonants (β, γ, δ, ζ, λ, μ, ν, ρ)',
        audioUrl: `${AUDIO_BASE}ev.mp3`
      },
      {
        ipa: '[ef]', description: 'Like EF in Left', example: 'Left',
        label: 'Before voiceless consonants \n(κ, π, τ, χ, φ, θ, σ, ξ, ψ)',
        audioUrl: `${AUDIO_BASE}ef.mp3`
      }
    ]
  },
  {
    id: 'ni_digraph', name: 'ni', upper: 'νι', lower: 'νι', isBonus: true,
    sounds: [{
      ipa: '[ɲ]', description: 'Like Ñ in Spanish “niño”', example: 'niño',
      label: 'Similar to Ñ, but without the “Y like in Yes” sound',
      audioUrl: `${AUDIO_BASE}ni.mp3`
    }]
  }
];

export const LEVELS: LevelGroup[] = [
  { id: 'l1', title: 'Level 1', description: 'The Foundation', letters: ['alpha', 'epsilon', 'kappa', 'tau'] },
  { id: 'l2', title: 'Level 2', description: 'Liquids & Sibilants', letters: ['mu', 'lambda', 'zeta'] },
  { id: 'l3', title: 'Level 3', description: 'Plosives & Taps', letters: ['beta', 'nu', 'pi', 'rho'] },
  { id: 'l4', title: 'Level 4', description: 'The Vowel Cluster', letters: ['omicron', 'omega', 'iota', 'eta', 'upsilon'] },
  { id: 'l5', title: 'Level 5', description: 'Fricatives', letters: ['delta', 'theta', 'phi'] },
  { id: 'l6', title: 'Level 6', description: 'Velar & Palatal sounds', letters: ['gamma', 'chi'] },
  { id: 'l7', title: 'Level 7', description: 'Final Forms & Clusters', letters: ['sigma', 'final_sigma', 'xi', 'psi'] },
  // Bonus Levels
  { id: 'b1', title: 'Bonus 1', description: 'Sibilant Affricates', letters: ['ts_digraph', 'dz_digraph'], isBonus: true },
  { id: 'b2', title: 'Bonus 2', description: 'Common Digraphs', letters: ['ai_digraph', 'ei_digraph', 'oi_digraph', 'yi_digraph', 'ou_digraph'], isBonus: true },
  { id: 'b3', title: 'Bonus 3', description: 'Consonant Pairs', letters: ['mp_digraph', 'nt_digraph', 'gk_start_digraph', 'gk_mid_digraph', 'gg_mid_digraph'], isBonus: true },
  { id: 'b4', title: 'Bonus 4', description: 'Special Combinations', letters: ['au_digraph', 'eu_digraph', 'ni_digraph'], isBonus: true }
];