export type CertaintyBadge = 'fact' | 'estimate' | 'debated' | 'inferred';

export interface StatCardItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  certainty?: CertaintyBadge;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  certainty?: CertaintyBadge;
}

export interface AnatomyHotspot {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  summary: string;
  details: string;
  certainty: CertaintyBadge;
  isDashedReconstruction?: boolean;
}

export interface SizeComparisonEntity {
  id: string;
  name: string;
  subtitle: string;
  lengthMeters: number;
  lengthLabel: string;
  massLabel: string;
  heightMeters: number;
  widthPercent: number;
  certainty: CertaintyBadge;
  isHighlighted?: boolean;
  isComparisonTarget?: boolean;
}

export interface TaxonomyStop {
  year: string;
  authors: string;
  headline: string;
  summary: string;
  cladePath: string[];
  sisterTaxa: string[];
  certainty: CertaintyBadge;
}

export interface MythCardItem {
  id: string;
  number: string;
  myth: string;
  verdict: string;
  reality: string;
  certainty: CertaintyBadge;
}

export interface GalleryPlateItem {
  id: string;
  src: string;
  plateNumber: string;
  title: string;
  caption: string;
  location: string;
  certainty: CertaintyBadge;
  svgTheme: 'quarry' | 'femur' | 'floodplain' | 'mount' | 'vertebra' | 'forest';
}

export interface SeasonGaugeState {
  phase: 'DRY' | 'TRANSITION' | 'WET';
  label: string;
  sublabel: string;
  dropletYPercent: number;
  shimmerOpacity: number;
  mistOpacity: number;
}

export interface FloodplainPhaseDetails {
  wetnessPercent: number;
  phaseTitle: string;
  phaseSubtitle: string;
  waterLevelY: number;
  sheetFloodOpacity: number;
  mudCrackOpacity: number;
  shimmerOpacity: number;
  mistOpacity: number;
  fernScale: number;
  description: string;
}

/**
 * Pure calculation of the Season Gauge and atmospheric crossfade from scroll progress [0..1]
 */
export function calculateSeasonState(scrollProgress: number): SeasonGaugeState {
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const dropletYPercent = Math.round(clamped * 1000) / 10;

  // Heat shimmer is strongest at top (0.85) and fades out by 35% scroll
  const shimmerOpacity = Math.max(0, Number(((1 - clamped / 0.35) * 0.85).toFixed(3)));
  // Mist fades in from 0.04 at top to 0.22 in the humid forest below
  const mistOpacity = Number((0.04 + clamped * 0.18).toFixed(3));

  if (clamped < 0.33) {
    return {
      phase: 'DRY',
      label: 'DRY',
      sublabel: 'SEMI-ARID',
      dropletYPercent,
      shimmerOpacity,
      mistOpacity,
    };
  }
  if (clamped < 0.68) {
    return {
      phase: 'TRANSITION',
      label: 'TRANSITION',
      sublabel: 'SHEET-FLOOD',
      dropletYPercent,
      shimmerOpacity,
      mistOpacity,
    };
  }
  return {
    phase: 'WET',
    label: 'WET',
    sublabel: 'HUMID',
    dropletYPercent,
    shimmerOpacity,
    mistOpacity,
  };
}

/**
 * Pure calculation for Section 05 Size Comparison entities
 */
export function getSizeComparisonData(
  estimateMode: 'later' | '2017',
  includeArgentinosaurus: boolean
): SizeComparisonEntity[] {
  const maxReferenceMeters = 38;
  const patagotitanLength = estimateMode === '2017' ? 37 : 31;
  const patagotitanLengthLabel =
    estimateMode === '2017'
      ? '37 m (121 ft) — 2017 description'
      : 'About 31 m (102 ft) — later studies';
  const patagotitanMassLabel =
    estimateMode === '2017'
      ? '69 tonnes (or 44–78 t by limb scaling)'
      : 'About 50–60 tonnes (mean 57 t in 2020 study)';

  const baseEntities: SizeComparisonEntity[] = [
    {
      id: 'human',
      name: 'Human (Homo sapiens)',
      subtitle: 'Modern reference scale',
      lengthMeters: 1.7,
      lengthLabel: '1.7 m height',
      massLabel: '~0.07 tonnes',
      heightMeters: 1.7,
      widthPercent: Number(((1.7 / maxReferenceMeters) * 100).toFixed(2)),
      certainty: 'fact',
    },
    {
      id: 'elephant',
      name: 'African Bush Elephant',
      subtitle: 'Largest living land animal',
      lengthMeters: 6.5,
      lengthLabel: '3–4 m at shoulder (~6.5 m length)',
      massLabel: 'Up to ~6 tonnes',
      heightMeters: 3.6,
      widthPercent: Number(((6.5 / maxReferenceMeters) * 100).toFixed(2)),
      certainty: 'fact',
    },
    {
      id: 'bus',
      name: 'Standard City Bus',
      subtitle: 'Urban transit reference',
      lengthMeters: 12,
      lengthLabel: 'About 12 m (39 ft)',
      massLabel: '~12–15 tonnes (unladen)',
      heightMeters: 3.2,
      widthPercent: Number(((12 / maxReferenceMeters) * 100).toFixed(2)),
      certainty: 'fact',
    },
    {
      id: 'trex',
      name: 'Tyrannosaurus rex',
      subtitle: 'Giant Late Cretaceous theropod',
      lengthMeters: 12.3,
      lengthLabel: 'About 12 m (40 ft)',
      massLabel: 'About 8–9 tonnes',
      heightMeters: 3.9,
      widthPercent: Number(((12.3 / maxReferenceMeters) * 100).toFixed(2)),
      certainty: 'estimate',
    },
    {
      id: 'blue_whale',
      name: 'Blue Whale',
      subtitle: 'Heaviest known animal (marine)',
      lengthMeters: 29.5,
      lengthLabel: 'Up to about 30 m (98 ft)',
      massLabel: 'Can exceed 150 tonnes',
      heightMeters: 4.5,
      widthPercent: Number(((29.5 / maxReferenceMeters) * 100).toFixed(2)),
      certainty: 'fact',
    },
    {
      id: 'patagotitan',
      name: 'Patagotitan mayorum',
      subtitle:
        estimateMode === '2017'
          ? 'Carballido et al. (2017) initial description'
          : 'Paul (2019) / Otero et al. (2020) revised studies',
      lengthMeters: patagotitanLength,
      lengthLabel: patagotitanLengthLabel,
      massLabel: patagotitanMassLabel,
      heightMeters: 6.0,
      widthPercent: Number(((patagotitanLength / maxReferenceMeters) * 100).toFixed(2)),
      certainty: 'estimate',
      isHighlighted: true,
    },
  ];

  if (includeArgentinosaurus) {
    baseEntities.push({
      id: 'argentinosaurus',
      name: 'Argentinosaurus huinculensis',
      subtitle: 'Close lognkosaur relative (size comparison debated)',
      lengthMeters: 34,
      lengthLabel: 'About 30–35 m (98–115 ft)',
      massLabel: 'About 65–80 tonnes',
      heightMeters: 6.4,
      widthPercent: Number(((34 / maxReferenceMeters) * 100).toFixed(2)),
      certainty: 'debated',
      isComparisonTarget: true,
    });
  }

  return baseEntities;
}

/**
 * Pure calculation for Section 07 Floodplain Dry/Wet Phase Slider [0..100]
 */
export function getFloodplainPhaseDetails(wetnessPercent: number): FloodplainPhaseDetails {
  const w = Math.max(0, Math.min(100, wetnessPercent));
  const t = w / 100;

  const isDry = w < 35;
  const isTransition = w >= 35 && w <= 65;

  return {
    wetnessPercent: w,
    phaseTitle: isDry
      ? 'Dry Phase (Semi-Arid Plain)'
      : isTransition
      ? 'Episodic Sheet-Flood Pulse'
      : 'Wet Phase (Humid Floodplain Forest)',
    phaseSubtitle: isDry
      ? 'Low channel water, cracked overbank muds, sparse scrub & horizon heat shimmer'
      : isTransition
      ? 'Low-energy overbank waters spreading across the ash-bearing siltstone plain'
      : 'Shallow mirror-like sheet floods, drifting forest mist & lush conifer-fern understory',
    waterLevelY: Number((188 - t * 24).toFixed(1)),
    sheetFloodOpacity: Number((0.08 + t * 0.84).toFixed(2)),
    mudCrackOpacity: Number(Math.max(0, 1 - t * 1.4).toFixed(2)),
    shimmerOpacity: Number(Math.max(0, (1 - t) * 0.9).toFixed(2)),
    mistOpacity: Number((0.1 + t * 0.8).toFixed(2)),
    fernScale: Number((0.78 + t * 0.28).toFixed(2)),
    description: isDry
      ? 'During drier intervals on the Cerro Castaño floodplain, water retreated into the sinuous river channel. Exposed overbank muds dried beneath warm apricot haze while tall conifers remained anchored along channel margins.'
      : isTransition
      ? 'Periodic rains sent low-energy sheet floods spilling gently across the plain. These slow waters buried bones in place within fine sandstone and ash-bearing siltstone without enough force to scatter heavy elements.'
      : 'In wetter phases, shallow mirror-like pools and humid mist enveloped the cypress-like Austrocupressinoxylon forest, fern banks, and early angiosperm shrubs such as Carlquistoxylon.',
  };
}

export const OVERVIEW_STATS: StatCardItem[] = [
  {
    id: 'name-meaning',
    label: 'Name Meaning & Pronunciation',
    value: 'Patagonia + Greek "Titan"',
    detail:
      'Named for its strength and large size; the species name mayorum honours the Mayo family, owners of the La Flecha ranch where it was found. Pronounced pat-ah-go-TIE-tan.',
    certainty: 'fact',
  },
  {
    id: 'lived',
    label: 'Geological Age & Horizon',
    value: 'About 101.6 Million Years Ago',
    detail:
      'Early Cretaceous, latest Albian (Cerro Castaño Member of the Cerro Barcino Formation, Chubut Province, dated from volcanic ash).',
    certainty: 'fact',
  },
  {
    id: 'length',
    label: 'Body Length',
    value: 'About 31–37 m (102–121 ft)',
    detail:
      'Estimated at 37 m in the 2017 description; revised to about 31 m in later studies.',
    certainty: 'estimate',
  },
  {
    id: 'mass',
    label: 'Body Mass',
    value: 'About 50–60 Tonnes (Later Studies)',
    detail:
      'The 2017 description gave 69 tonnes by one method and 44–78 tonnes by another; a 2020 study gave a mean of 57 tonnes (range 42–71).',
    certainty: 'estimate',
  },
  {
    id: 'ontogeny',
    label: 'Age of the Known Animals',
    value: 'Young Adults (Still Growing)',
    detail:
      'Bone histology shows their growth had slowed but not stopped, so fully grown animals may have been larger.',
    certainty: 'inferred',
  },
  {
    id: 'material',
    label: 'Fossil Material',
    value: 'At Least 6 Partial Skeletons',
    detail:
      'More than 200 fossils from one site, including about 130 sauropod bones and 57 theropod teeth; no skull, only a single tooth.',
    certainty: 'fact',
  },
  {
    id: 'femur',
    label: 'Thigh Bone (Femur)',
    value: 'About 2.38 m (7 ft 10 in) Long',
    detail:
      'Robust hind-limb element providing a key metric for quadrupedal mass scaling.',
    certainty: 'fact',
  },
  {
    id: 'diet-locomotion',
    label: 'Diet & Locomotion',
    value: 'Quadrupedal Plant-Eater',
    detail:
      'Four-legged locomotion; plant-eating diet inferred from its sauropod relatives.',
    certainty: 'inferred',
  },
  {
    id: 'classification',
    label: 'Clade & Status',
    value: 'Titanosauria · Lognkosauria',
    detail:
      'Dinosauria > Sauropoda > Titanosauria > Lognkosauria (Colossosauria). Status: Extinct.',
    certainty: 'fact',
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2010',
    title: 'First Femur Spotted at La Flecha',
    description:
      'Farm labourer Aurelio Hernández finds part of a large femur in the desert near La Flecha, about 250 km west of Trelew, Chubut, and reports it to the Museo Paleontológico Egidio Feruglio (MPEF).',
    certainty: 'fact',
  },
  {
    year: 'Late 2012',
    title: 'First MPEF Expedition',
    description:
      'The Museo Paleontológico Egidio Feruglio (MPEF) mounts its first scientific expedition to the La Flecha ranch quarry.',
    certainty: 'fact',
  },
  {
    year: '2013–2015',
    title: 'Seven Major Excavations',
    description:
      'Seven more expeditions led by José Luis Carballido and Diego Pol recover more than 200 fossils and reveal at least six partial skeletons across closely spaced layers.',
    certainty: 'fact',
  },
  {
    year: '2014',
    title: 'Global Press Announcement',
    description:
      'The find is announced to the press with preliminary estimates of about 40 m and 77 tonnes, billed at the time as the largest animal known to have walked the Earth.',
    certainty: 'estimate',
  },
  {
    year: 'January 2016',
    title: 'AMNH New York Debut & BBC Documentary',
    description:
      'A skeletal cast goes on display at the American Museum of Natural History in New York, replacing a juvenile Barosaurus mount; the BBC film "Attenborough and the Giant Dinosaur" follows the dig.',
    certainty: 'fact',
  },
  {
    year: '2017',
    title: 'Formal Naming & Early Size Debate',
    description:
      'Carballido et al. formally name Patagotitan mayorum, estimating 37 m and 69 tonnes (or 44–78 tonnes by another method). Soon after, Matt Wedel and Riley Black caution that almost every comparable measurement is larger in Argentinosaurus.',
    certainty: 'debated',
  },
  {
    year: '1 June 2018',
    title: '"Máximo" Unveiled in Chicago',
    description:
      'A cast nicknamed Máximo is unveiled in Stanley Field Hall at the Field Museum in Chicago on 1 June, replacing Sue the Tyrannosaurus.',
    certainty: 'fact',
  },
  {
    year: '2019',
    title: 'Downward Revision & Fossil Conifer Named',
    description:
      'Gregory Paul revises Patagotitan to about 31 m and 50–55 tonnes. In the same year, a cypress-like fossil wood from the area is named Austrocupressinoxylon.',
    certainty: 'estimate',
  },
  {
    year: '2020',
    title: 'Appendicular Monograph & Mass Recalibration',
    description:
      'Otero, Carballido and Pérez Moreno describe the limb skeleton in detail and give a mean mass of 57 tonnes; Campione and Evans independently estimate about 55.7 tonnes.',
    certainty: 'estimate',
  },
  {
    year: '2022',
    title: 'Redefining Colossosauria',
    description:
      'Carballido et al. find Patagotitan to be among the most phylogenetically stable titanosaurs and use it as an anchor to redefine the clade Colossosauria.',
    certainty: 'fact',
  },
  {
    year: 'Mar 2023 – Jan 2024',
    title: 'Natural History Museum, London Exhibition',
    description:
      'A full-scale skeletal cast is displayed in London at the Natural History Museum, bringing the Patagonian quarry discoveries to European visitors.',
    certainty: 'fact',
  },
  {
    year: '2025',
    title: 'Volumetric Re-Assessment',
    description:
      'Dempsey et al. publish updated volumetric estimates placing Patagotitan at more than 60 tonnes.',
    certainty: 'estimate',
  },
  {
    year: 'Today',
    title: 'Benchmark Giant Titanosaur',
    description:
      'Still among the largest and best-known titanosaurs ever discovered because of its multiple individuals, though its exact size rank remains debated.',
    certainty: 'debated',
  },
];

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'skull',
    label: '01 · Skull and Teeth',
    xPercent: 28,
    yPercent: 7,
    summary: 'Not preserved: reconstructed from relatives (only a single tooth known).',
    details:
      'No skull bones of Patagotitan have been recovered; only one tooth was found at the quarry. In every anatomical reconstruction, the head is drawn as a dashed outline inferred from related titanosaurs.',
    certainty: 'inferred',
    isDashedReconstruction: true,
  },
  {
    id: 'neck',
    label: '02 · Front & Middle Neck',
    xPercent: 14,
    yPercent: 25,
    summary: 'Elongated cervical vertebrae at least five times as long as wide.',
    details:
      'The front and middle neck vertebrae were very long—at least five times as long as wide—with flattened neural spines that allowed a wide horizontal feeding sweep.',
    certainty: 'fact',
  },
  {
    id: 'rear-neck',
    label: '03 · Rear Neck Pleurocoels',
    xPercent: 20,
    yPercent: 46,
    summary: 'Deep lateral openings leading into air-filled internal spaces.',
    details:
      'Deep side openings (pleurocoels) in the rear neck vertebrae led into internal chambers inside the bone, a strong osteological sign of pneumatic, air-filled spaces that lightened the neck.',
    certainty: 'inferred',
  },
  {
    id: 'spine-joints',
    label: '04 · Unique Spine Joints',
    xPercent: 34,
    yPercent: 48,
    summary: 'Extra hyposphene-hypantrum articulation retained between only one pair of vertebrae.',
    details:
      'Extra articulations between vertebrae (hyposphene-hypantrum) are kept between only one pair of back vertebrae, right at the level of the shoulder blade. This configuration is not seen in any other sauropod and was probably a weight-bearing adaptation.',
    certainty: 'inferred',
  },
  {
    id: 'back',
    label: '05 · Dorsal Column (Back)',
    xPercent: 48,
    yPercent: 49,
    summary: 'Probably 10 back vertebrae; articulated series about 3.67 m long.',
    details:
      'Patagotitan probably had 10 back vertebrae with tall, vertical neural spines and thin, strongly developed bony ridges (laminae), unlike Argentinosaurus. The articulated back vertebrae measured about 3.67 m long (estimate).',
    certainty: 'estimate',
  },
  {
    id: 'shoulder',
    label: '06 · Shoulder & Breastbone',
    xPercent: 31,
    yPercent: 60,
    summary: 'Robust expanded scapula and crescent-shaped sternal plates.',
    details:
      'The pectoral girdle features a robust, expanded shoulder blade (scapula) paired with crescent-shaped breastbone plates (sternal plates) that supported massive chest musculature.',
    certainty: 'fact',
  },
  {
    id: 'forelimb',
    label: '07 · Forelimb & Humerus',
    xPercent: 38,
    yPercent: 77,
    summary: 'Humerus about 70% of femur length with unique muscle attachment scars.',
    details:
      'Thick, pillar-like arm bones supported the front torso. The humerus was about 70% as long as the femur, and several unique muscle scars mark powerful shoulder and elbow muscles.',
    certainty: 'fact',
  },
  {
    id: 'hips-hindlimb',
    label: '08 · Hips & 2.38 m Femur',
    xPercent: 63,
    yPercent: 72,
    summary: 'Robust femur about 2.38 m long and an ischium with a unique ridge.',
    details:
      'The pelvic region and hind limb include a massive thigh bone (femur) about 2.38 m long and a hip bone (ischium) bearing a diagnostic bony ridge unique to Patagotitan.',
    certainty: 'fact',
  },
  {
    id: 'tail',
    label: '09 · Muscular Anterior Tail',
    xPercent: 86,
    yPercent: 66,
    summary: 'Broad, tall neural spines and expanded side processes.',
    details:
      'The front tail (anterior caudal) vertebrae had broad, tall spines and expanded transverse processes, suggesting a heavily muscled tail base for balance and locomotion.',
    certainty: 'inferred',
  },
  {
    id: 'skin',
    label: '10 · Skin and Colour',
    xPercent: 54,
    yPercent: 62,
    summary: 'Skin texture and colouration are unknown.',
    details:
      'No fossilized skin impressions or melanosomes have been recovered for Patagotitan. All earthy apricot, sage, and conifer tones on this page are artistic interpretations inspired by its floodplain environment.',
    certainty: 'fact',
  },
];

export const TAXONOMY_STOPS: TaxonomyStop[] = [
  {
    year: '2017',
    authors: 'Carballido et al. (2017)',
    headline: 'Sister Taxon to Argentinosaurus within Lognkosauria',
    summary:
      'The original description recovered Patagotitan as the sister taxon to Argentinosaurus inside an expanded Lognkosauria, positioned outside Lithostrotia.',
    cladePath: ['Titanosauria', 'Lognkosauria', 'Patagotitan + Argentinosaurus'],
    sisterTaxa: ['Argentinosaurus huinculensis', 'Futalognkosaurus dukei', 'Mendozasaurus neguyelap'],
    certainty: 'debated',
  },
  {
    year: '2018',
    authors: 'González Riga et al. (2018)',
    headline: 'Three-Way Grouping with Puertasaurus & Notocolossus',
    summary:
      'Placed Patagotitan in a three-way grouping alongside the giant titanosaurs Puertasaurus and Notocolossus, while nesting Lognkosauria inside Lithostrotia.',
    cladePath: ['Titanosauria', 'Lithostrotia', 'Lognkosauria', 'Patagotitan + Puertasaurus + Notocolossus'],
    sisterTaxa: ['Puertasaurus reuili', 'Notocolossus gonzalezparejosi', 'Argentinosaurus huinculensis'],
    certainty: 'debated',
  },
  {
    year: '2019',
    authors: 'González Riga et al. (2019) & Mannion et al. (2019)',
    headline: 'Origin of Colossosauria & Unresolved Giant Trio',
    summary:
      'González Riga et al. defined Colossosauria joining Lognkosauria and Rinconsauria; Mannion et al. recovered an unresolved grouping of Patagotitan, Puertasaurus, and Notocolossus.',
    cladePath: ['Titanosauria', 'Colossosauria', 'Lognkosauria', 'Unresolved Giant Polytomy'],
    sisterTaxa: ['Puertasaurus reuili', 'Notocolossus gonzalezparejosi', 'Rinconsauria'],
    certainty: 'debated',
  },
  {
    year: '2021',
    authors: 'Gallina et al. (2021)',
    headline: 'Possible Affinity with Early Titanosaur Ninjatitan',
    summary:
      'Suggested that the older Early Cretaceous titanosaur Ninjatitan might sit close to Patagotitan in some trees, highlighting ongoing debate over early titanosaur branching.',
    cladePath: ['Titanosauria', 'Lognkosauria / Basal Lineages', 'Patagotitan mayorum'],
    sisterTaxa: ['Ninjatitan zapatai (debated)', 'Argentinosaurus huinculensis'],
    certainty: 'debated',
  },
  {
    year: '2022',
    authors: 'Carballido et al. (2022)',
    headline: 'Phylogenetic Anchor Redefining Colossosauria',
    summary:
      'Because Patagotitan is known from multiple individuals and is among the most stable titanosaurs in phylogenetic analyses, Carballido et al. used it as a primary specifier to redefine Colossosauria.',
    cladePath: ['Titanosauria', 'Colossosauria (redefined 2022)', 'Lognkosauria', 'Patagotitan mayorum'],
    sisterTaxa: ['Argentinosaurus huinculensis', 'Puertasaurus reuili', 'Futalognkosaurus dukei'],
    certainty: 'fact',
  },
];

export const RELATIVE_TAXA = [
  {
    name: 'Argentinosaurus',
    note: 'Closest relative in several studies; comparable or slightly larger in dorsal column length (debated).',
  },
  {
    name: 'Puertasaurus',
    note: 'Giant Patagonian lognkosaur often grouped in a trio with Patagotitan and Notocolossus.',
  },
  {
    name: 'Notocolossus',
    note: 'Heavy-bodied Late Cretaceous lognkosaur preserving a complete articulated foot.',
  },
  {
    name: 'Futalognkosaurus',
    note: 'Well-preserved lognkosaur from Neuquén that gave its name to the clade Lognkosauria.',
  },
  {
    name: 'Mendozasaurus',
    note: 'Earlier, basal member of Lognkosauria (~20 tonnes) showing the ancestral state before extreme gigantism.',
  },
  {
    name: 'Dreadnoughtus',
    note: 'Large South American titanosaur that evolved giant body size independently to a lesser extent.',
  },
  {
    name: 'Saltasaurus',
    note: 'Smaller, armored titanosaur situated outside Colossosauria inside Saltasauridae.',
  },
];

export const MYTH_CARDS: MythCardItem[] = [
  {
    id: 'myth-1',
    number: '01',
    myth: '"Patagotitan is proven to be the biggest dinosaur ever."',
    verdict: 'NO — DEBATED ESTIMATE',
    reality:
      'No. It was billed that way in 2014 and 2017, but later estimates are about 31 m and 50–60 tonnes, and Argentinosaurus is estimated as comparable or larger. Rankings rest on incomplete bones.',
    certainty: 'debated',
  },
  {
    id: 'myth-2',
    number: '02',
    myth: '"Six Patagotitan died together at once as a herd."',
    verdict: 'NO — THREE BURIAL HORIZONS',
    reality:
      'The bones come from three closely spaced burial layers in a 3.43 m thick deposit, so the animals probably did not die at the same time.',
    certainty: 'inferred',
  },
  {
    id: 'myth-3',
    number: '03',
    myth: '"We have its skull and a single complete skeleton."',
    verdict: 'NO — COMPOSITE MOUNTS, NO SKULL',
    reality:
      'No. The skull is unknown (only one single tooth was found), and museum mounts combine bones cast and sculpted from several individuals.',
    certainty: 'fact',
  },
  {
    id: 'myth-4',
    number: '04',
    myth: '"It lived in a permanent swamp or a barren desert."',
    verdict: 'NO — SEASONAL CONIFER FLOODPLAIN',
    reality:
      'The rocks show a vegetated, conifer-dominated floodplain with wetter and drier phases (inferred), not a permanent swamp or a dry dune desert.',
    certainty: 'inferred',
  },
  {
    id: 'myth-5',
    number: '05',
    myth: '"The discovered Patagotitan individuals were fully grown."',
    verdict: 'NO — YOUNG ADULTS STILL GROWING',
    reality:
      'Bone histology of five femora and one humerus shows the known individuals were young adults whose growth had slowed but not stopped, so older animals may have been bigger.',
    certainty: 'inferred',
  },
  {
    id: 'myth-6',
    number: '06',
    myth: '"It lived alongside Argentinosaurus in the same ecosystem."',
    verdict: 'PROBABLY NOT — DIFFERENT BASINS & AGES',
    reality:
      'Probably not. On current dating they lived about 5 million years apart in different basins of Patagonia (newly revised in 2026 to ~107 Ma for Argentinosaurus vs ~101.6 Ma for Patagotitan, debated).',
    certainty: 'debated',
  },
];

export const GALLERY_PLATES: GalleryPlateItem[] = [
  {
    id: 'plate-01',
    src: '/assets/gallery-01.jpg',
    plateNumber: 'PLATE I',
    title: 'La Flecha Quarry Stratigraphy',
    caption:
      'Three closely spaced bonebeds within a 3.43 m flood-deposited siltstone and fine sandstone interval at La Flecha ranch, Chubut.',
    location: 'Chubut Province, Patagonia (250 km W of Trelew)',
    certainty: 'fact',
    svgTheme: 'quarry',
  },
  {
    id: 'plate-02',
    src: '/assets/gallery-02.jpg',
    plateNumber: 'PLATE II',
    title: 'The 2.38 m Femur Benchmark',
    caption:
      'Field scale comparison of the massive 2.38 m thigh bone first spotted in 2010 by Aurelio Hernández and excavated by the MPEF team.',
    location: 'Museo Paleontológico Egidio Feruglio (MPEF)',
    certainty: 'fact',
    svgTheme: 'femur',
  },
  {
    id: 'plate-03',
    src: '/assets/gallery-03.jpg',
    plateNumber: 'PLATE III',
    title: 'Floodplain of Austrocupressinoxylon',
    caption:
      'Artistic reconstruction of Patagotitan wading through shallow sheet-flood pools framed by 15 m cypress-like conifers. Colours are artistic; real skin colour is unknown.',
    location: 'Cerro Castaño Member Reconstruction (~101.6 Ma)',
    certainty: 'inferred',
    svgTheme: 'floodplain',
  },
  {
    id: 'plate-04',
    src: '/assets/gallery-04.jpg',
    plateNumber: 'PLATE IV',
    title: 'Composite Skeletal Mount ("Máximo")',
    caption:
      'Full-scale composite skeletal cast combining elements from the six partial skeletons; skull reconstructed in outline from relatives.',
    location: 'Trelew · New York · Chicago · London',
    certainty: 'estimate',
    svgTheme: 'mount',
  },
  {
    id: 'plate-05',
    src: '/assets/gallery-05.jpg',
    plateNumber: 'PLATE V',
    title: 'Dorsal Laminae & Hyposphene Joint',
    caption:
      'Osteological plate showing the tall vertical neural spines, thin bony laminae, and the unique single-pair hyposphene-hypantrum articulation at the shoulder.',
    location: 'Holotype MPEF-PV 3400 Osteology',
    certainty: 'fact',
    svgTheme: 'vertebra',
  },
  {
    id: 'plate-06',
    src: '/assets/gallery-06.jpg',
    plateNumber: 'PLATE VI',
    title: 'Palaeobotany: Conifers, Ferns & Early Angiosperms',
    caption:
      'Fossil flora recovered ~200 m from the quarry: cypress-like Austrocupressinoxylon, fern fronds, and Carlquistoxylon—the oldest known angiosperm wood in South America.',
    location: 'Cerro Barcino Formation Floral Locality',
    certainty: 'fact',
    svgTheme: 'forest',
  },
];

export const FAST_FACTS: string[] = [
  'A farm labourer, Aurelio Hernández, first spotted its massive femur in the Patagonian desert in 2010.',
  'At least six individuals were found at a single site—a rare chance to compare several giants of one species.',
  'It was first billed at about 40 m and 77 tonnes in 2014, but later estimates are about 31 m and 50–60 tonnes.',
  'No skull has ever been found for Patagotitan—only a single isolated tooth.',
  'Full-size casts are displayed in Trelew, New York, Chicago, and London; the Chicago cast, "Máximo", replaced Sue the T. rex in Stanley Field Hall.',
  'One pair of its back vertebrae kept an extra weight-bearing joint (hyposphene-hypantrum) seen in no other known sauropod.',
  'Its floodplain forest included a cypress relative (Austrocupressinoxylon) estimated at up to about 15 m tall.',
  'Its bones were buried right where the animals died by gentle sheet floods too weak to move heavy skeletal elements.',
];

export const SCIENTIFIC_SOURCES: string[] = [
  'Carballido, J. L. et al. (2017) — Patagotitan mayorum formal description, Proceedings of the Royal Society B.',
  'Nunes, C. I. et al. (2018) — Palaeobotanical records of the Cerro Barcino Formation.',
  'Nunes, C. I. et al. (2019) — Austrocupressinoxylon and conifer forest structure near the La Flecha quarry.',
  'Paul, G. S. (2019) — Determining the largest known land animal: volumetric & skeletal revisions.',
  'Campione, N. E. & Evans, D. C. (2020) — Quadrupedal limb scaling and body mass estimation (~55.7 tonnes).',
  'Krause, J. M. et al. (2020) — High-precision U–Pb volcanic ash dating of the Cerro Castaño Member.',
  'Otero, A., Carballido, J. L. & Pérez Moreno, A. (2020) — Appendicular osteology and mean mass of 57 tonnes.',
  'Carballido, J. L. et al. (2022) — Redefinition of the titanosaur clade Colossosauria using Patagotitan.',
  'Sander, P. M. et al. (2011) — Biology of the sauropod dinosaurs: the evolution of gigantism.',
  'Dempsey, M. et al. (2025) — Volumetric re-evaluation of Patagotitan body mass (>60 tonnes).',
  'Maniel, I. et al. (2026) — Stratigraphic and chronostratigraphic re-dating of Patagonian Cretaceous units.',
  'Wedel, M. (2017) — Comparative vertebral dimensions of Patagotitan and Argentinosaurus.',
  'Black, R. (2017) — Smithsonian Science analysis on titanosaur size rankings and skeletal completeness.',
  'Carmona, R. et al. (2016) — Sedimentology and sheet-flood facies of the Cerro Castaño Member.',
  'Ameghiniana Report — Megaloolithid sauropod eggshell from the Cerro Castaño Member at Huanimán, Chubut.',
  'Museo Paleontológico Egidio Feruglio (MPEF), Trelew, Chubut, Argentina.',
  'American Museum of Natural History (AMNH), New York.',
  'Field Museum of Natural History, Chicago & Natural History Museum, London.',
];
