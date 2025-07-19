import { NavCategory, Content, PageType } from './types';

export const NAV_STRUCTURE: NavCategory[] = [
  {
    label: 'MYS.OS',
    items: [{ label: 'Home', pageId: 'home', type: PageType.HOME }],
  },
  {
    label: 'Substances',
    items: [
      { label: 'Alcohol', pageId: 'alcohol', type: PageType.CONTENT },
      { label: 'Cocaine', pageId: 'cocaine', type: PageType.CONTENT },
      { label: 'Methamphetamine', pageId: 'meth', type: PageType.CONTENT },
      { label: 'Benzodiazepines', pageId: 'benzos', type: PageType.CONTENT },
      { label: 'Opioids', pageId: 'opioids', type: PageType.CONTENT },
      { label: 'MDMA', pageId: 'mdma', type: PageType.CONTENT },
      { label: 'Ketamine', pageId: 'ketamine', type: PageType.CONTENT },
      { label: 'LSD', pageId: 'lsd', type: PageType.CONTENT },
    ],
  },
  {
    label: 'Protocols',
    items: [
      { label: 'Test Kits', pageId: 'test-kits', type: PageType.CONTENT },
      { label: 'Emergency Response', pageId: 'emergency', type: PageType.CONTENT },
      { label: 'Tapering', pageId: 'tapering', type: PageType.CONTENT },
      { label: 'Stacking Strategies', pageId: 'stacking', type: PageType.CONTENT },
    ],
  },
  {
    label: 'Intel',
    items: [
      { label: 'Glossary', pageId: 'glossary', type: PageType.CONTENT },
      { label: 'Red Flags', pageId: 'redflags', type: PageType.CONTENT },
    ],
  },
  {
    label: 'AI Interface',
    items: [{ label: 'HOLLOWPOINT', pageId: 'ai', type: PageType.AI }],
  },
];

export const CONTENT_PAGES: Content[] = [
  {
    id: 'alcohol',
    title: 'Alcohol',
    codename: 'GUTROT',
    class: 'CNS Depressant',
    profile: [
      'Ethanol (CH₃CH₂OH): Volatile, water- and lipid-soluble CNS depressant.',
      'Metabolized via: Alcohol dehydrogenase → Acetaldehyde → Acetic acid.',
      'Toxic intermediate: Acetaldehyde (linked to hangovers, cellular damage).',
    ],
    riskMatrix: [
      {
        threat: 'Blackout amnesia',
        trigger: 'High-volume dosing or stacking with benzos',
        countermeasure: 'Slow sips, interlock consumption with hydration timers.',
      },
      {
        threat: 'Aspiration death',
        trigger: 'Unconscious vomiting + supine posture',
        countermeasure: 'Lay individual in recovery position; keep airway clear.',
      },
      {
        threat: 'Liver degradation',
        trigger: 'Chronic exposure to acetaldehyde',
        countermeasure: 'NAC, milk thistle (limited data), cessation windows.',
      },
      {
        threat: 'Withdrawal seizure',
        trigger: 'Rapid discontinuation after dependency',
        countermeasure: 'Med-assisted taper; diazepam protocol under medical supervision.',
      },
    ],
    enhancementVector: {
        title: 'Social Lubrication Tactics',
        points: [
            'Titrate dose for disinhibition without significant cognitive impairment.',
            'Maintain a 1:1 ratio of alcoholic to non-alcoholic drinks to manage intoxication levels and hydration.',
            'Consume with a meal containing fats and proteins to slow absorption and create a smoother onset.',
        ]
    },
    fieldStrategies: {
      title: 'Operational Tactics',
      points: [
        'Preload: 500ml electrolyte water + B-complex.',
        'Stack Cautions: ⛔ Benzos – high fatal synergy. ⛔ Opioids – massive respiratory suppression risk. ⚠️ Stimulants – masks intoxication, worsens dehydration.',
        'Hydration Protocol: 1:1 ratio with low-sugar isotonic fluid.',
        'Sleep Support: Melatonin, magnesium glycinate.',
      ],
    },
    reintegrationProtocol: {
      title: 'Reintegration Protocol',
      points: [
        '48–72h reset = no ethanol, hydrate, light carb load.',
        'Restore REM cycles → avoid compounding dopamine crashes.',
        'Use adaptogens (ashwagandha, rhodiola) if anxiety rebound hits.',
        'Monitor tremors; escalate if seizure risk present.',
      ],
    },
  },
  {
    id: 'cocaine',
    title: 'Cocaine',
    codename: 'SNOWJACK',
    class: 'Stimulant / Local Anesthetic',
    profile: [
      'Cocaine Hydrochloride: Salt form; water-soluble.',
      'Freebase: Volatile base form (crack) – vaporized or smoked.',
      'MOA: Blocks dopamine, norepinephrine, serotonin reuptake = surge of monoamines.',
    ],
    riskMatrix: [
      {
        threat: 'Cardiotoxicity',
        trigger: 'Dose stacking, pre-existing conditions, mixing with alcohol.',
        countermeasure: 'AVOID dose stacking. Benzodiazepines for emergency hypertensive crisis, NOT beta-blockers. Monitor heart rate.',
      },
      {
        threat: 'Nasal septum damage',
        trigger: 'Chronic insufflation, vasoconstriction.',
        countermeasure: 'Finely chop powder. Alternate nostrils. Post-use saline rinse. Hot plate to remove moisture/volatiles.',
      },
      {
        threat: 'Severe psychological crash',
        trigger: 'Dopamine depletion after binge.',
        countermeasure: 'L-Tyrosine, 5-HTP (use cautiously), proper sleep, nutrition, and hydration.',
      },
      {
        threat: 'Cocaethylene formation',
        trigger: 'Concurrent use with alcohol.',
        countermeasure: 'Avoid combination. Cocaethylene is significantly more cardiotoxic than cocaine alone.',
      },
    ],
    fieldIdentification: {
      title: 'Visual Intel & Texture Analysis',
      points: [
        'High Purity ("Fish Scale"): Characterized by pearlescent, shiny, and slightly oily flakes. Should clump together under pressure, not crush into a fine powder immediately.',
        'Hot Plating: Gently heating a ceramic plate and crushing the cocaine on it evaporates excess moisture and volatile solvents. Properly dried cocaine becomes a fine, fluffy powder, ideal for insufflation and reducing nasal harm. This also reveals non-volatile cuts.',
        'Cut - Sugars (Inositol/Mannitol): Adds bulk, makes the product fluffier and less dense. May have a slightly sweet taste (tasting is not a recommended ID method).',
        'Cut - Boric Acid/Lidocaine: Often added to mimic the shimmer of pure cocaine or the numbing effect. Boric acid has a different, more granular crystal structure. Lidocaine has a very strong, rapid numbing effect, much faster than cocaine itself.',
        'Bleach Test (Highly Unreliable): Dropping a small amount in bleach. Purportedly, pure cocaine dissolves while cuts may react differently or sink. This is folklore and not a reliable identification method.'
      ],
    },
    enhancementVector: {
        title: 'Performance Tuning',
        points: [
            'For focus: Small, titrated doses (15-25mg insufflated) spaced 45-60 mins apart. Avoids euphoria peak and distracting side effects.',
            'For social settings: Larger initial dose (40-60mg) followed by smaller maintenance doses. Be aware of compulsive redosing.',
            'Note on ROA: Insufflation provides a balance of duration and intensity. Oral is less efficient and harder to titrate. IV/smoked are high-risk, short-duration, high-addiction liability routes.',
        ]
    },
    fieldStrategies: {
      title: 'Operational Tactics',
      points: [
        'Preload: Magnesium (natural calcium channel blocker), CoQ10 for cardiovascular support.',
        'Test for levamisole and fentanyl. Levamisole is a common and dangerous bulking agent.',
        'Crash Mitigation Stack: L-Tyrosine, B-complex, low-dose ashwagandha, Melatonin for sleep.',
      ],
    },
    reintegrationProtocol: {
      title: 'Reintegration Protocol',
      points: [
        'Implement a strict stop time to prevent sleep deprivation and severe dopamine depletion.',
        'Post-session: 2-3 day brain reset. Focus on nutrition (protein, omega-3s), hydration, and sleep.',
        'Monitor for paranoia and anxiety, which signal significant dopamine/norepinephrine dysregulation.',
      ],
    },
  },
  {
    id: 'meth',
    title: 'Methamphetamine',
    codename: 'STARDUST-X',
    class: 'CNS Stimulant',
    profile: [
      'A potent central nervous system (CNS) stimulant that is mainly used as a recreational drug.',
      'Increases wakefulness, motivation, and euphoria by dramatically increasing dopamine, norepinephrine, and serotonin levels.',
      'High potential for abuse and addiction.',
    ],
    riskMatrix: [
      {
        threat: 'Neurotoxicity',
        trigger: 'High doses, chronic use, hyperthermia',
        countermeasure: 'Antioxidants (ALA, ALCAR), stay cool, hydration.',
      },
      {
        threat: 'Psychosis',
        trigger: 'Sleep deprivation, high doses',
        countermeasure: 'Prioritize sleep, antipsychotics in emergency, benzodiazepines for anxiety.',
      },
      {
        threat: 'Cardiovascular failure',
        trigger: 'Overdose, pre-existing conditions',
        countermeasure: 'Immediate medical attention. Avoid mixing with other stimulants.',
      },
    ],
    fieldIdentification: {
      title: 'Crystal & "Crack Back" Analysis',
      points: [
          'High Purity (Ice/Glass): Large, clear, well-defined shards. Should be hard to crush. Lack of smell is a good sign.',
          'Low Purity/Racemic ("Peanut Butter"): May appear as a yellowish, waxy, or pasty substance. Often has a strong chemical smell.',
          'The "Crack Back" Test: Vaporizing a small amount on a clean glass surface and observing the recrystallization pattern. This is a common but not foolproof field test.',
          'Pattern - d-Meth: After melting, recrystallizes into a uniform pattern of long, straight lines, resembling a spiderweb or starburst. Solidifies relatively quickly.',
          'Pattern - MSM (cut): Recrystallizes into distinct, separate, geometric shard patterns, often looking like snowflakes or arrowheads. Can take longer to cool.',
          'Pattern - N-ISO (cut): A very dangerous and common cut. The crack back is often described as messy, taking a very long time to solidify, and forming a web-like or shattered glass pattern that lacks the clear linear structure of d-meth.',
      ],
    },
    fieldStrategies: {
      title: 'Operational Tactics',
      points: [
        'Hydration is non-negotiable. Use electrolyte solutions.',
        'Forced eating schedule is necessary to avoid malnutrition.',
        'Vitamins: B-complex, C, Magnesium, Zinc.',
        'Oral hygiene is critical to prevent "meth mouth".',
      ]
    },
    reintegrationProtocol: {
      title: 'Reintegration Protocol',
      points: [
        'Long recovery period needed. Expect anhedonia.',
        'Nutrient-dense diet with high protein.',
        'Exercise to help restore dopamine function.',
        'Seek therapy or support groups for long-term success.',
      ],
    },
  },
  {
    id: 'benzos',
    title: 'Benzodiazepines',
    codename: 'RAZORSLEEP',
    class: 'CNS Depressant',
    profile: [
      'Enhances the effect of the neurotransmitter GABA at the GABA-A receptor, resulting in sedative, hypnotic, anxiolytic, anticonvulsant, and muscle relaxant properties.',
      'Examples: Diazepam (Valium), Alprazolam (Xanax), Lorazepam (Ativan).',
      'High risk of physical dependence and severe withdrawal syndrome.',
    ],
    riskMatrix: [
      {
        threat: 'Fatal Overdose',
        trigger: 'Combination with other depressants (opioids, alcohol)',
        countermeasure: 'NEVER mix with other CNS depressants. Flumazenil is an antidote but only used in hospitals.',
      },
      {
        threat: 'Severe Withdrawal',
        trigger: 'Abrupt cessation after long-term use',
        countermeasure: 'Slow, medically supervised taper (e.g., Ashton Manual). Never quit cold turkey.',
      },
      {
        threat: 'Anterograde Amnesia',
        trigger: 'High doses, potent short-acting benzos',
        countermeasure: 'Use lowest effective dose. Avoid activities requiring memory/coordination.',
      },
    ],
    fieldStrategies: {
      title: 'Operational Tactics',
      points: [
        'Use for short-term situations only (e.g., panic attack, stimulant comedown, psychedelic trip abort).',
        'Avoid daily use to prevent dependence. Less than 2 times a week is a common guideline.',
        'Be aware of "delusions of sobriety". You are more impaired than you feel.',
        'RC Benzos (e.g., Clonazolam, Flubromazolam) are extremely potent and carry higher risk.',
      ],
    },
    reintegrationProtocol: {
      title: 'Reintegration Protocol',
      points: [
        'If dependent, a slow taper over weeks or months is essential.',
        'Cognitive Behavioral Therapy (CBT) can help manage rebound anxiety.',
        'Support groups can be invaluable.',
      ]
    }
  },
  {
    id: 'opioids',
    title: 'Opioids',
    codename: 'BLOODWIRE',
    class: 'Narcotic Analgesic / CNS Depressant',
    profile: [
        'Bind to opioid receptors in the brain, spinal cord, and other areas.',
        'Used for pain relief but have a high potential for producing euphoria and subsequent addiction.',
        'Includes heroin, fentanyl, oxycodone, and morphine.'
    ],
    riskMatrix: [
        {
            threat: 'Respiratory Depression & OD',
            trigger: 'High dose, mixing with other depressants (benzos, alcohol), unknown purity (fentanyl).',
            countermeasure: 'Naloxone (Narcan) is essential. Start with small test doses. Never use alone.'
        },
        {
            threat: 'Rapid Dependence & Severe Withdrawal',
            trigger: 'Regular use, especially with short-acting opioids.',
            countermeasure: 'Medication-Assisted Treatment (MAT) like methadone or buprenorphine. Tapering is extremely difficult alone.'
        },
        {
            threat: 'Infection (IV use)',
            trigger: 'Sharing or reusing needles.',
            countermeasure: 'Always use sterile needles and equipment. Needle exchange programs.'
        }
    ],
    fieldStrategies: {
        title: 'Operational Tactics',
        points: [
            'Always have Naloxone on hand and know how to use it.',
            'Fentanyl test strips are a critical harm reduction tool for all non-pharma supplies.',
            'If using IV, rotate injection sites and practice sterile technique.',
            'Never use alone. Have someone check on you or use a hotline like Never Use Alone.'
        ]
    },
    reintegrationProtocol: {
        title: 'Reintegration Protocol',
        points: [
            'Withdrawal management is the first step, often requiring medical help.',
            'Long-term support through MAT, therapy, and support groups is key.',
            'Address underlying issues that led to use (pain, trauma, mental health).'
        ]
    }
  },
  {
    id: 'mdma',
    title: 'MDMA',
    codename: 'CRYSTALBRACE',
    class: 'Entactogen / Stimulant',
    profile: [
        '3,4-Methylenedioxymethamphetamine is a potent releaser of serotonin, dopamine, and norepinephrine.',
        'Induces states of euphoria, empathy, and enhanced sensation.',
        'Neurotoxic potential, especially at high doses or frequent use.',
    ],
    riskMatrix: [
        {
            threat: 'Hyperthermia / Heatstroke',
            trigger: 'Dancing in hot environments, dehydration.',
            countermeasure: 'Take regular breaks from dancing. Sip water or electrolytes. Wear light clothing.',
        },
        {
            threat: 'Hyponatremia',
            trigger: 'Drinking excessive water without replacing electrolytes.',
            countermeasure: 'Sip isotonic drinks (e.g., sports drinks) instead of plain water. Don\'t overhydrate.',
        },
        {
            threat: 'Serotonin Syndrome',
            trigger: 'Mixing with other serotonergic drugs (SSRIs, MAOIs).',
            countermeasure: 'DO NOT mix with MAOIs (fatal risk). Avoid mixing with SSRIs (can dull or block effects, risk still present).',
        },
        {
            threat: 'Neurotoxic Comedown',
            trigger: 'Serotonin depletion after use.',
            countermeasure: 'Supplementation (see tactics). Adhere to the "3-month rule" to allow serotonin system to recover.',
        }
    ],
    fieldIdentification: {
      title: 'Crystal & Press Analysis',
      points: [
        'Crystal MDMA: Pure MDMA HCl should be white or off-white/tan/brownish crystals. A purple hue can indicate impurities from synthesis. Often has a faint, distinct smell similar to anise or sassafras.',
        'Pressed Pills: EXTREMELY unreliable for visual ID. Red flags include: crumbly texture, inconsistent color/speckles, poorly stamped logos. A clean press does NOT guarantee purity.',
        'ALWAYS test pressed pills. They are notoriously adulterated with everything from caffeine and methamphetamine to PMA/PMMA (highly toxic) and novel cathinones.',
      ],
    },
    enhancementVector: {
        title: 'Empathogenic Optimization',
        points: [
            'Dosage: 1.5mg/kg of body weight is a common guideline for a full experience. Avoid redosing or keep it to a single, small (half of initial) dose at 90 mins.',
            'Set & Setting: A safe, comfortable environment with trusted individuals is paramount for a positive experience.',
            'Music and sensory inputs can profoundly enhance the effects.',
        ]
    },
    fieldStrategies: {
        title: 'Operational Tactics',
        points: [
            'Pre-load (1-3 days before): NAC (N-Acetylcysteine) may reduce neurotoxicity.',
            'Pre-load (day of, T-2hr): 500mg ALCAR (Acetyl-L-Carnitine), 200mg CoQ10.',
            'During: Chew magnesium gum to reduce bruxism (jaw clenching).',
            'Post-load (24h after): 5-HTP (with Green Tea Extract) for 3-7 days to replenish serotonin. DO NOT take with MDMA.',
        ]
    },
    reintegrationProtocol: {
        title: 'Reintegration Protocol',
        points: [
            'Expect a "Blue Monday" or mid-week crash due to serotonin depletion.',
            'Focus on nutrition, sleep, and light exercise.',
            'Journaling or talking about the experience can help with integration.',
        ]
    }
  },
  {
      id: 'ketamine',
      title: 'Ketamine',
      codename: 'GHOSTTANK',
      class: 'Dissociative Anesthetic',
      profile: [
          'NMDA receptor antagonist. Produces a dose-dependent range of effects from mild intoxication to profound dissociation and psychedelic experiences.',
          'S-isomer (esketamine) is more potent and considered more "psychedelic". R-isomer is less potent, longer-lasting.',
      ],
      riskMatrix: [
          {
              threat: 'Bladder Damage (Cystitis)',
              trigger: 'Chronic, heavy use.',
              countermeasure: 'Limit frequency and dose. Stay hydrated. Green Tea Extract (EGCG) may offer some protection. Cease use if urinary symptoms appear.',
          },
          {
              threat: 'Physical Incapacitation',
              trigger: 'High doses ("K-hole").',
              countermeasure: 'Use in a safe, comfortable, seated or lying position. Have a sober sitter. Do not operate machinery.',
          },
          {
              threat: 'Aspiration',
              trigger: 'Vomiting while heavily dissociated.',
              countermeasure: 'Avoid eating for 3-4 hours before use. Recovery position if nausea occurs.',
          }
      ],
      enhancementVector: {
          title: 'Navigating Dissociative States',
          points: [
              'Low Dose (20-40mg insufflated): "Wonky" state, enhanced music appreciation, mild dissociation.',
              'Medium Dose (50-100mg insufflated): Strong dissociation, impaired motor control, significant psychedelic effects.',
              'High Dose / "K-Hole" (100mg+ insufflated): Complete dissociation from external reality. Intense internal experience. Can be therapeutic or terrifying. Not for beginners.',
              'Set & Setting: A dark, quiet room with headphones is ideal for deep, internal exploration.',
          ]
      },
      fieldStrategies: {
          title: 'Operational Tactics',
          points: [
              'ROA: Insufflation is common. Oral is less bioavailable. Intramuscular (IM) is highly efficient but carries infection risk and is difficult to titrate.',
              'Crush crystals into a very fine powder to increase surface area and reduce nasal damage.',
              'Use a saline nasal spray after session to clear nasal passages.',
          ]
      },
      reintegrationProtocol: {
          title: 'Reintegration Protocol',
          points: [
              'Give at least 1-2 weeks between sessions to minimize bladder risk and tolerance buildup.',
              'The anti-depressant effects may last for days or weeks after the acute experience.',
              'Integrate insights through journaling or therapy.',
          ]
      }
  },
  {
      id: 'lsd',
      title: 'LSD',
      codename: 'FRACTALCORE',
      class: 'Classic Psychedelic / Serotonin Agonist',
      profile: [
          'Lysergic acid diethylamide. Potent agonist for serotonin 5-HT2A receptors.',
          'Produces profound alterations in perception, mood, and thought.',
          'Physically very safe, but psychologically can be extremely challenging.',
      ],
      riskMatrix: [
          {
              threat: 'Challenging Experience ("Bad Trip")',
              trigger: 'Unsafe setting, negative mindset, excessive dose.',
              countermeasure: 'Meticulous preparation of set & setting. Start with a low dose. Have a trip-sitter. Change of scenery/music can help. Benzodiazepine as an emergency "trip abort".',
          },
          {
              threat: 'HPPD (Hallucinogen Persisting Perception Disorder)',
              trigger: 'Unknown. Potentially linked to pre-existing conditions and frequent use.',
              countermeasure: 'Rare, but a known risk. Reduce frequency of use.',
          },
          {
              threat: 'Psychological Destabilization',
              trigger: 'Pre-existing or latent psychological conditions (e.g., schizophrenia).',
              countermeasure: 'Individuals with a personal or family history of psychosis should AVOID psychedelics.',
          }
      ],
      enhancementVector: {
          title: 'Psychedelic Navigation',
          points: [
              'Microdose (5-15µg): Sub-perceptual. Used for creativity, focus. (No visuals)',
              'Threshold Dose (25-75µg): Mild euphoria, enhanced senses, creative thought. (Minimal visuals)',
              'Standard Dose (100-200µg): Full psychedelic experience. Strong visuals, altered thought patterns, potential for mystical experiences.',
              'High Dose (250µg+): Potential for ego dissolution. For experienced users only.',
              'Set & Setting is EVERYTHING. Intent, environment, and company dictate the nature of the experience.',
          ]
      },
      fieldStrategies: {
          title: 'Operational Tactics',
          points: [
              'Test your tabs with Ehrlich and Hofmann reagents to confirm presence of an indole (like LSD) and rule out dangerous substitutes like NBOMes.',
              'Volumetric dosing: Dissolve a tab in a known quantity of distilled water or alcohol to make accurate microdoses.',
              'Duration: Effects last 8-12 hours. Clear your schedule completely.',
          ]
      },
      reintegrationProtocol: {
          title: 'Reintegration Protocol',
          points: [
              'Allow a full day for rest and recovery after the experience ("afterglow").',
              'The experience can offer profound insights. Journal, meditate, or discuss with others to integrate them.',
              'Wait at least 2 weeks between trips for tolerance to reset.',
          ]
      }
  },
  {
    id: 'test-kits',
    title: 'Protocol: Test Kits',
    description: 'Reagent testing is a critical harm reduction practice to identify the likely substance and rule out dangerous adulterants. A negative or unexpected result is a definitive "do not consume" signal.',
    contentBlocks: [
      {
        title: 'Core Reagents',
        points: [
          'Marquis: Primary test for MDMA, amphetamines, opiates.',
          'Mecke: Differentiates MDMA from MDA, DXM.',
          'Mandelin: Good for ketamine and cocaine.',
          'Froehde: Useful for identifying a range of substances.',
          'Liebermann: Often used for cocaine and levamisole.',
          'Ehrlich: Detects indoles like LSD, DMT, Psilocybin.',
        ],
      },
      {
        title: 'Specialized Tests',
        points: [
          'Fentanyl Test Strips: ESSENTIAL for all powders, pills, and injectables. Detects fentanyl and many of its analogs.',
          'Benzodiazepine Test Strips: Detects various benzos in samples.',
        ],
      },
      {
        title: 'Usage Protocol',
        points: [
          'Use a tiny, scraped amount of the substance (a few grains).',
          'Perform tests on a white ceramic surface (e.g., bottom of a mug).',
          'Use only one drop of reagent per test. Avoid cross-contamination.',
          'Cross-reference results with multiple reagents for higher accuracy.',
          'Record the reaction on video for later reference and comparison.',
        ],
      },
    ],
  },
  {
    id: 'emergency',
    title: 'Protocol: Emergency Response',
    description: 'Rapid action plans for overdose and adverse psychological events.',
    contentBlocks: [
      {
        title: 'Opioid Overdose',
        points: [
          'Signs: Unresponsive, slow/stopped breathing, blue lips/nails, pinpoint pupils, gurgling sounds.',
          '1. Call for emergency medical help immediately. Give the location.',
          '2. Administer Naloxone (Narcan). It cannot harm someone who is not on opioids.',
          '3. Perform rescue breathing if trained.',
          '4. Place person in recovery position to prevent choking.',
          '5. Stay with them until help arrives. Administer more Naloxone every 2-3 minutes if they don\'t respond.',
        ],
      },
      {
        title: 'Stimulant Overdose / Psychosis',
        points: [
          'Signs: Rapid heart rate, high temperature, chest pain, paranoia, hallucinations, severe agitation, seizures.',
          '1. Call for emergency help, especially if chest pain or seizures are present.',
          '2. Move to a calm, cool, and quiet environment. Reduce stimulation.',
          '3. Do not leave the person alone. Speak calmly and reassuringly. Do not validate delusions but do not argue.',
          '4. Encourage sips of water. Apply cool cloths to neck, armpits, groin.',
          '5. Medical professionals may administer benzodiazepines to manage agitation and reduce cardiovascular strain.',
        ],
      },
    ],
  },
   {
    id: 'tapering',
    title: 'Protocol: Tapering',
    description: 'Strategic reduction of a substance to avoid severe withdrawal. This is not medical advice and should ideally be done under medical supervision.',
    contentBlocks: [
      {
        title: 'General Principles',
        points: [
          'Go slow. The slower the taper, the more manageable the symptoms.',
          'A common strategy is to reduce the dose by 5-10% of the current dose every 1-4 weeks.',
          'Listen to your body. Hold the dose steady if withdrawal is too severe before making another cut.',
          'Switching to a longer-acting substance in the same class (e.g., from alprazolam to diazepam) can create a smoother taper.',
        ],
      },
      {
        title: 'Benzodiazepine Tapering (Example)',
        points: [
          'The Ashton Manual is the gold-standard guide.',
          'Involves converting the current benzo dose to a diazepam (Valium) equivalent.',
          'Diazepam\'s long half-life provides a more stable blood level, reducing inter-dose withdrawal.',
          'The diazepam dose is then slowly and methodically reduced over a period of weeks or months.',
        ],
      },
    ],
  },
  {
      id: 'stacking',
      title: 'Protocol: Stacking Strategies',
      description: 'The practice of combining psychoactive substances to produce synergistic effects. This significantly increases complexity and risk. Approach with extreme caution and thorough research.',
      contentBlocks: [
        {
          title: 'Risk Paradigm',
          points: [
              'The primary risk is multiplicative, not additive. Combining two substances can create unpredictable and dangerous outcomes.',
              'Pharmacological interactions (e.g., two serotonergic drugs causing serotonin syndrome) are a major concern.',
              'Behavioral interactions (e.g., a stimulant masking the effects of a depressant, leading to overdose) are also critical risks.',
              'Start with threshold doses of each substance. Never combine two new substances at once.',
          ]
        },
        {
          title: 'Common Stacks (Examples)',
          points: [
              'Candy-flipping (LSD + MDMA): Timing is key. MDMA is typically taken 3-4 hours into the LSD experience to align the peaks. The synergy is reported to be euphoric and visually intense.',
              'Hippy-flipping (Psilocybin + MDMA): Similar to a candy-flip but often described as more organic and emotional. MDMA can smooth out the mushroom come-up.',
              'Kitty-flipping (Ketamine + MDMA): Taking ketamine at the tail-end of an MDMA experience. Can produce profound, introspective, and highly psychedelic states.',
              'Neurotoxic/Cardiotoxic Risk: All these combinations put additional strain on the brain and body. Hydration, temperature control, and extended recovery periods are non-negotiable.',
          ]
        }
      ]
  },
  {
    id: 'glossary',
    title: 'Intel: Glossary',
    description: 'Common terms in operational harm reduction.',
    contentBlocks: [
      {
        title: 'Operational Terms',
        points: [
          'ROA: Route of Administration (e.g., oral, insufflated, intravenous).',
          'Half-Life: Time it takes for a substance\'s concentration in the body to reduce by half.',
          'Agonist: A substance that binds to a receptor and activates it.',
          'Antagonist: A substance that binds to a receptor and blocks it (e.g., Naloxone).',
          'CNS: Central Nervous System.',
          'Set & Setting: Mindset and physical/social environment, critical factors in a psychedelic experience.',
        ],
      },
    ],
  },
  {
    id: 'redflags',
    title: 'Intel: Red Flags',
    description: 'Indicators of high-risk substances or supply chains.',
    contentBlocks: [
      {
        title: 'Supplier & Product Red Flags',
        points: [
          'Unusual price drops (may indicate a cheaper, dangerous cut).',
          'Inconsistent appearance, texture, or smell from batch to batch.',
          'Pressed pills that crumble easily or have inconsistent logos/no score lines.',
          'Supplier being unusually pushy or offering "too good to be true" deals.',
          'Reports of unexpected adverse reactions in the community.',
          'Refusal to discuss harm reduction practices.',
        ]
      },
    ],
  },
];