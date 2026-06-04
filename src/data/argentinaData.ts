export interface Player {
  no: number;
  pos: 'GK' | 'DF' | 'MF' | 'FW';
  player: string;
  birthDate: string;
  age: number;
  caps: number;
  goals: number;
  club: string;
}

export interface RecentCallup {
  pos: string;
  player: string;
  birthDate: string;
  age: number;
  caps: number;
  goals: number;
  club: string;
  latestCallUp: string;
}

export interface MatchFixture {
  date: string;
  competition: string;
  opponent: string;
  scoreOrTime: string;
  isHome: boolean;
  isFuture: boolean;
  venue: string;
  result?: 'W' | 'D' | 'L'; // only if played
}

export interface Coach {
  position: string;
  name: string;
}

export interface RecordEntry {
  rank: number;
  player: string;
  caps: number;
  goals: number;
  career: string;
  ratio?: number;
}

export interface Rivalry {
  name: string;
  head: string;
  desc: string;
  notableDetails: string;
  notablePlayers?: string[];
}

export interface Honour {
  category: 'Global' | 'Intercontinental' | 'Continental' | 'Friendly';
  title: string;
  count: number;
  years: string;
}

export interface KitStory {
  year: string;
  title: string;
  desc: string;
  colorHex?: string; // sky blue, purple, yellow, black etc.
}

export interface KitSupplier {
  supplier: string;
  period: string;
}

export const SQUAD: Player[] = [
  { no: 23, pos: 'GK', player: 'Emiliano Martínez', birthDate: '2 September 1992', age: 33, caps: 59, goals: 0, club: 'Aston Villa' },
  { no: 12, pos: 'GK', player: 'Gerónimo Rulli', birthDate: '20 May 1992', age: 34, caps: 7, goals: 0, club: 'Marseille' },
  { no: 1, pos: 'GK', player: 'Juan Musso', birthDate: '6 May 1994', age: 32, caps: 3, goals: 0, club: 'Atlético Madrid' },
  { no: 19, pos: 'DF', player: 'Nicolás Otamendi', birthDate: '12 February 1988', age: 38, caps: 130, goals: 8, club: 'Benfica' },
  { no: 3, pos: 'DF', player: 'Nicolás Tagliafico', birthDate: '31 August 1992', age: 33, caps: 75, goals: 1, club: 'Lyon' },
  { no: 26, pos: 'DF', player: 'Nahuel Molina', birthDate: '6 April 1998', age: 28, caps: 58, goals: 1, club: 'Atlético Madrid' },
  { no: 13, pos: 'DF', player: 'Cristian Romero', birthDate: '27 April 1998', age: 28, caps: 49, goals: 3, club: 'Tottenham Hotspur' },
  { no: 4, pos: 'DF', player: 'Gonzalo Montiel', birthDate: '1 January 1997', age: 29, caps: 38, goals: 2, club: 'River Plate' },
  { no: 6, pos: 'DF', player: 'Lisandro Martínez', birthDate: '1 January 1998', age: 28, caps: 26, goals: 1, club: 'Manchester United' },
  { no: 2, pos: 'DF', player: 'Leonardo Balerdi', birthDate: '26 January 1999', age: 27, caps: 11, goals: 0, club: 'Marseille' },
  { no: 25, pos: 'DF', player: 'Facundo Medina', birthDate: '28 May 1999', age: 27, caps: 7, goals: 0, club: 'Marseille' },
  { no: 24, pos: 'DF', player: 'Valentín Barco', birthDate: '23 July 2004', age: 21, caps: 2, goals: 1, club: 'Strasbourg' },
  { no: 7, pos: 'MF', player: 'Rodrigo De Paul', birthDate: '24 May 1994', age: 32, caps: 85, goals: 2, club: 'Inter Miami' },
  { no: 5, pos: 'MF', player: 'Leandro Paredes', birthDate: '29 June 1994', age: 31, caps: 77, goals: 5, club: 'Boca Juniors' },
  { no: 11, pos: 'MF', player: 'Giovani Lo Celso', birthDate: '9 April 1996', age: 30, caps: 65, goals: 4, club: 'Betis' },
  { no: 20, pos: 'MF', player: 'Alexis Mac Allister', birthDate: '24 December 1998', age: 27, caps: 44, goals: 6, club: 'Liverpool' },
  { no: 8, pos: 'MF', player: 'Enzo Fernández', birthDate: '17 January 2001', age: 25, caps: 40, goals: 6, club: 'Chelsea' },
  { no: 14, pos: 'MF', player: 'Exequiel Palacios', birthDate: '5 October 1998', age: 27, caps: 38, goals: 0, club: 'Bayer Leverkusen' },
  { no: 16, pos: 'MF', player: 'Thiago Almada', birthDate: '26 April 2001', age: 25, caps: 14, goals: 4, club: 'Atlético Madrid' },
  { no: 18, pos: 'MF', player: 'Nico Paz', birthDate: '8 September 2004', age: 21, caps: 8, goals: 1, club: 'Como' },
  { no: 10, pos: 'FW', player: 'Lionel Messi', birthDate: '24 June 1987', age: 38, caps: 198, goals: 116, club: 'Inter Miami' },
  { no: 22, pos: 'FW', player: 'Lautaro Martínez', birthDate: '22 August 1997', age: 28, caps: 75, goals: 36, club: 'Internazionale' },
  { no: 9, pos: 'FW', player: 'Julián Alvarez', birthDate: '31 January 2000', age: 26, caps: 51, goals: 14, club: 'Atlético Madrid' },
  { no: 15, pos: 'FW', player: 'Nicolás González', birthDate: '6 April 1998', age: 28, caps: 50, goals: 6, club: 'Atlético Madrid' },
  { no: 17, pos: 'FW', player: 'Giuliano Simeone', birthDate: '18 December 2002', age: 23, caps: 11, goals: 1, club: 'Atlético Madrid' },
  { no: 21, pos: 'FW', player: 'José Manuel López', birthDate: '6 December 2000', age: 25, caps: 3, goals: 0, club: 'Palmeiras' }
];

export const RECENT_CALLUPS: RecentCallup[] = [
  { pos: 'GK', player: 'Walter Benítez', birthDate: '19 January 1993', age: 33, caps: 1, goals: 0, club: 'Crystal Palace', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'GK', player: 'Facundo Cambeses', birthDate: '9 April 1997', age: 29, caps: 1, goals: 0, club: 'Racing', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'GK', player: 'Santiago Beltrán', birthDate: '4 October 2004', age: 21, caps: 0, goals: 0, club: 'River Plate', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'DF', player: 'Marcos Acuña', birthDate: '28 October 1991', age: 34, caps: 62, goals: 0, club: 'River Plate', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'DF', player: 'Germán Pezzella', birthDate: '27 June 1991', age: 34, caps: 42, goals: 3, club: 'River Plate', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'DF', player: 'Lucas Martínez Quarta', birthDate: '10 May 1996', age: 30, caps: 16, goals: 0, club: 'River Plate', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'DF', player: 'Marcos Senesi', birthDate: '10 May 1997', age: 29, caps: 3, goals: 0, club: 'Bournemouth', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'DF', player: 'Agustín Giay', birthDate: '16 January 2004', age: 22, caps: 1, goals: 0, club: 'Palmeiras', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'MF', player: 'Guido Rodríguez', birthDate: '12 April 1994', age: 32, caps: 30, goals: 1, club: 'Valencia', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'MF', player: 'Nicolás Domínguez', birthDate: '28 June 1998', age: 27, caps: 11, goals: 1, club: 'Nottingham Forest', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'MF', player: 'Máximo Perrone', birthDate: '7 January 2003', age: 23, caps: 2, goals: 0, club: 'Como', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'FW', player: 'Alejandro Garnacho', birthDate: '1 July 2004', age: 21, caps: 8, goals: 0, club: 'Chelsea', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'FW', player: 'Franco Mastantuono', birthDate: '14 August 2007', age: 18, caps: 4, goals: 0, club: 'Real Madrid', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'FW', player: 'Gianluca Prestianni', birthDate: '31 January 2006', age: 20, caps: 1, goals: 0, club: 'Benfica', latestCallUp: '2026 FIFA World Cup PRE' },
  { pos: 'FW', player: 'Claudio Echeverri', birthDate: '2 January 2006', age: 20, caps: 0, goals: 0, club: 'Girona', latestCallUp: '2026 FIFA World Cup PRE' }
];

export const RESULTS_AND_FIXTURES: MatchFixture[] = [
  // 2025
  { date: '5 June 2025', competition: '2026 World Cup Qualifier', opponent: 'Chile', scoreOrTime: '0–1', isHome: false, isFuture: false, venue: 'Santiago, Chile', result: 'W' },
  { date: '10 June 2025', competition: '2026 World Cup Qualifier', opponent: 'Colombia', scoreOrTime: '1–1', isHome: true, isFuture: false, venue: 'Buenos Aires, Argentina', result: 'D' },
  { date: '4 September 2025', competition: '2026 World Cup Qualifier', opponent: 'Venezuela', scoreOrTime: '3–0', isHome: true, isFuture: false, venue: 'Buenos Aires, Argentina', result: 'W' },
  { date: '9 September 2025', competition: '2026 World Cup Qualifier', opponent: 'Ecuador', scoreOrTime: '1–0', isHome: false, isFuture: false, venue: 'Guayaquil, Ecuador', result: 'L' },
  { date: '10 October 2025', competition: 'Friendly', opponent: 'Venezuela', scoreOrTime: '1–0', isHome: true, isFuture: false, venue: 'Miami Gardens, USA', result: 'W' },
  { date: '14 October 2025', competition: 'Friendly', opponent: 'Puerto Rico', scoreOrTime: '0–6', isHome: false, isFuture: false, venue: 'Fort Lauderdale, USA', result: 'W' },
  { date: '14 November 2025', competition: 'Friendly', opponent: 'Angola', scoreOrTime: '0–2', isHome: false, isFuture: false, venue: 'Luanda, Angola', result: 'W' },
  // 2026
  { date: '27 March 2026', competition: 'Friendly', opponent: 'Mauritania', scoreOrTime: '2–1', isHome: true, isFuture: false, venue: 'Buenos Aires, Argentina', result: 'W' },
  { date: '31 March 2026', competition: 'Friendly', opponent: 'Zambia', scoreOrTime: '5–0', isHome: true, isFuture: false, venue: 'Buenos Aires, Argentina', result: 'W' },
  { date: '6 June 2026', competition: 'Friendly', opponent: 'Honduras', scoreOrTime: '19:00', isHome: true, isFuture: true, venue: 'College Station, Texas, USA' },
  { date: '9 June 2026', competition: 'Friendly', opponent: 'Iceland', scoreOrTime: '20:30', isHome: true, isFuture: true, venue: 'Auburn, Alabama, USA' },
  { date: '16 June 2026', competition: '2026 World Cup Group J', opponent: 'Algeria', scoreOrTime: '15:00', isHome: true, isFuture: true, venue: 'Kansas City, Missouri, USA' },
  { date: '22 June 2026', competition: '2026 World Cup Group J', opponent: 'Austria', scoreOrTime: '18:30', isHome: true, isFuture: true, venue: 'Arlington, Texas, USA' },
  { date: '27 June 2026', competition: '2026 World Cup Group J', opponent: 'Jordan', scoreOrTime: '20:00', isHome: false, isFuture: true, venue: 'Arlington, Texas, USA' }
];

export const COACHING_STAFF: Coach[] = [
  { position: 'Head coach', name: 'Lionel Scaloni' },
  { position: 'Assistant coach', name: 'Pablo Aimar' },
  { position: 'Assistant coach', name: 'Roberto Ayala' },
  { position: 'Assistant coach', name: 'Walter Samuel' },
  { position: 'Goalkeeping coach', name: 'Martín Tocalli' },
  { position: 'Fitness coach', name: 'Luis Martín' },
  { position: 'Video analyst', name: 'Matías Manna' },
  { position: 'Team coordinator', name: 'Nicolás Russo' },
  { position: 'Academy manager', name: 'Bernardo Romeo' },
  { position: 'Base camp coordinator', name: 'Oscar Dertycia' },
  { position: 'Goalkeeping coordinator', name: 'Mauro Dobler' }
];

export const MOST_APPEARANCES: RecordEntry[] = [
  { rank: 1, player: 'Lionel Messi', caps: 198, goals: 116, career: '2005–present' },
  { rank: 2, player: 'Javier Mascherano', caps: 147, goals: 3, career: '2003–2018' },
  { rank: 3, player: 'Ángel Di María', caps: 145, goals: 31, career: '2008–2024' },
  { rank: 4, player: 'Javier Zanetti', caps: 145, goals: 5, career: '1994–2011' },
  { rank: 5, player: 'Nicolás Otamendi', caps: 130, goals: 7, career: '2009–present' },
  { rank: 6, player: 'Roberto Ayala', caps: 115, goals: 7, career: '1994–2007' },
  { rank: 7, player: 'Diego Simeone', caps: 104, goals: 11, career: '1988–2002' },
  { rank: 8, player: 'Sergio Agüero', caps: 101, goals: 41, career: '2006–2021' },
  { rank: 9, player: 'Oscar Ruggeri', caps: 97, goals: 7, career: '1983–1994' },
  { rank: 10, player: 'Sergio Romero', caps: 96, goals: 0, career: '2009–2018' }
];

export const TOP_GOALSCORERS: RecordEntry[] = [
  { rank: 1, player: 'Lionel Messi', goals: 116, caps: 198, ratio: 0.59, career: '2005–present' },
  { rank: 2, player: 'Gabriel Batistuta', goals: 56, caps: 78, ratio: 0.72, career: '1991–2002' },
  { rank: 3, player: 'Sergio Agüero', goals: 41, caps: 101, ratio: 0.41, career: '2006–2021' },
  { rank: 4, player: 'Lautaro Martínez', goals: 36, caps: 75, ratio: 0.48, career: '2018–present' },
  { rank: 5, player: 'Hernán Crespo', goals: 35, caps: 64, ratio: 0.55, career: '1995–2007' },
  { rank: 6, player: 'Diego Maradona', goals: 34, caps: 91, ratio: 0.37, career: '1977–1994' },
  { rank: 7, player: 'Gonzalo Higuaín', goals: 31, caps: 75, ratio: 0.41, career: '2009–2018' },
  { rank: 8, player: 'Ángel Di María', goals: 31, caps: 145, ratio: 0.21, career: '2008–2024' },
  { rank: 9, player: 'Luis Artime', goals: 24, caps: 25, ratio: 0.96, career: '1961–1967' },
  { rank: 10, player: 'Leopoldo Luque', goals: 22, caps: 45, ratio: 0.49, career: '1975–1981' }
];

export const RIVALRIES: Rivalry[] = [
  {
    name: 'Brazil',
    head: 'Superclásico of the Americas',
    desc: 'Fierce and legendary South American clash, described by FIFA as the "essence of football rivalry". Packed with dramatic matches and supreme players.',
    notableDetails: 'Extended comparison between Pelé vs Maradona, Neymar vs Messi. Marked by historic battles at the World Cup and Copa América.',
    notablePlayers: ['Diego Maradona', 'Pelé', 'Lionel Messi', 'Neymar']
  },
  {
    name: 'England',
    head: 'Intercontinental Derby',
    desc: 'Stemming from a tense match in the 1966 World Cup and fueled by the Falklands War of 1982.',
    notableDetails: 'Quarterfinals in 1986 saw Maradona score both the infamous "Hand of God" and the "Goal of the Century" (running past 5 players) to claim victory. Met again in 1998 (Argentina won on PKs) and 2002 (David Beckham penalty winner).',
    notablePlayers: ['Diego Maradona', 'Peter Shilton', 'David Beckham', 'Michael Owen']
  },
  {
    name: 'Germany',
    head: 'World Cup Finals Rivalry',
    desc: 'Met in 7 FIFA World Cup matches, including an unprecedented three finals.',
    notableDetails: '1986: Argentina won 3–2. 1990: West Germany won 1-0. 2006: Germany won on penalties followed by an on-pitch brawl. 2010: Germany won 4-0. 2014: Germany defeated Argentina in extra time (1-0).',
    notablePlayers: ['Diego Maradona', 'Karl-Heinz Rummenigge', 'Lionel Messi', 'Mario Götze']
  },
  {
    name: 'Uruguay',
    head: 'Clásico del Río de la Plata',
    desc: 'The oldest official international football fixture outside of the UK, having played 197 times since 1902.',
    notableDetails: 'Met in the inaugural 1930 World Cup final (Uruguay won 4–2), 1928 Olympics final (Uruguay gold), and dozens of Copa América battles. Cesáreo Onzari scored the first ever "Olimpico" goal directly from a corner kick against Uruguay in 1924.',
    notablePlayers: ['Cesáreo Onzari', 'Lionel Messi', 'Luis Suárez', 'Enzo Francescoli']
  },
  {
    name: 'Netherlands',
    head: 'Tactical Showdown',
    desc: 'The Albiceleste and Oranje are historically rich sides that developed a highly charged tactical rivalry at World Cups.',
    notableDetails: '1978: Argentina defeated Netherlands 3-1 in ET to win their first World Cup. 1998: Dennis Bergkamp scored a sensational late winner. 2014 & 2022: Argentina progressed both times on penalties; 2022 became the legendary "Battle of Lusail" (18 yellow cards).',
    notablePlayers: ['Lionel Messi', 'Louis van Gaal', 'Wout Weghorst', 'Dennis Bergkamp']
  },
  {
    name: 'Mexico',
    head: 'Tense Regional Feud',
    desc: 'A secondary rivalry developed heavily since the 1990s, especially in the 1993 Copa América Final and World Cup knockouts.',
    notableDetails: 'Argentina beat Mexico in the 1993 final (2-1), 2006 (Maxi Rodríguez extra-time volley), 2010 R16, and Qatar 2022 (2-0 victory, which saved Argentina\'s campaign and led to Mexico\'s elimination). More intensely felt by Mexican fans and media than Argentines.',
    notablePlayers: ['Lionel Messi', 'Maxi Rodríguez', 'Gabriel Batistuta', 'Andrés Guardado']
  }
];

export const HONOURS: Honour[] = [
  // Global
  { category: 'Global', title: 'FIFA World Cup', count: 3, years: '1978, 1986, 2022' },
  { category: 'Global', title: 'FIFA Confederations Cup', count: 1, years: '1992' },
  { category: 'Global', title: 'Olympic Games (Senior)', count: 1, years: '1928 (Silver medal - senior era)' },
  // Intercontinental
  { category: 'Intercontinental', title: 'CONMEBOL–UEFA Cup of Champions (Finalissima)', count: 2, years: '1993, 2022' },
  // Continental
  { category: 'Continental', title: 'Copa América', count: 16, years: '1921, 1925, 1927, 1929, 1937, 1941, 1945, 1946, 1947, 1955, 1957, 1959-I, 1991, 1993, 2021, 2024 (Record)' },
  { category: 'Continental', title: 'Panamerican Championship', count: 1, years: '1960' },
  // Friendly / Other
  { category: 'Friendly', title: 'Newton Cup', count: 17, years: 'Record title holders against Uruguay' },
  { category: 'Friendly', title: 'Lipton Cup', count: 18, years: 'Record title holders against Uruguay' },
  { category: 'Friendly', title: 'Copa Premier Honor Argentino', count: 7, years: 'Record holders' },
  { category: 'Friendly', title: 'Copa Centenario Revolución de Mayo', count: 1, years: '1910 (First continental event)' },
  { category: 'Friendly', title: 'Copa Premier Honor Uruguayo', count: 5, years: '1915, 1916, 1917, 1923, 1924' },
  { category: 'Friendly', title: 'Roca Cup', count: 4, years: 'Against Brazil' },
  { category: 'Friendly', title: 'Superclásico de las Américas', count: 2, years: '2017, 2019' },
  { category: 'Friendly', title: 'Nations\' Cup', count: 1, years: '1964' }
];

export const KIT_STORIES: KitStory[] = [
  { year: '1902', title: 'First Match Uniform', desc: 'Debuted against Uruguay in Montevideo with a plain light blue shirt, starting a historic rivalry.', colorHex: '#7dd3fc' },
  { year: '1908', title: 'The Iconic Albiceleste', desc: 'Introduced vertical light blue and white stripes against Campeonato Paulista players. Adopted officially on September 13, 1908 against Uruguay, staying as the symbol forever.', colorHex: '#0284c7' },
  { year: '1958', title: 'IFK Malmö Yellow Jersey', desc: 'Arrived at the World Cup in Sweden without their away kit. Had to wear the yellow jerseys of local club IFK Malmö in their defeat against West Germany.', colorHex: '#eab308' },
  { year: '1986', title: 'The Improvised Aztec Blue', desc: 'Coaching staff had to search Mexico City shops for 38 blue polyester shirts before the game against England. Emblems were embroidered and silver US football numbers ironed on. Maradona scored the "Goal of the Century" in it.', colorHex: '#1d4ed8' },
  { year: '2018', title: 'Dynamic Dark Secondary', desc: 'Argentina introduced a black secondary kit for the first time in Russia, styled with retro national colored side stripes.', colorHex: '#18181b' },
  { year: '2022', title: 'The Royal Purple Starburst', desc: 'Worn against Poland in Qatar, representing gender equality and burning solar flares. They ended the tournament by placing a 3rd Golden Star on their chest.', colorHex: '#6b21a8' }
];

export const KIT_SUPPLIERS: KitSupplier[] = [
  { supplier: 'St. Margaret (UK)', period: '1901–1924' },
  { supplier: 'Gath & Chaves', period: '1925–1934' },
  { supplier: 'Industria Lanús', period: '1958–1963' },
  { supplier: 'Noceto Sports', period: '1964–1965' },
  { supplier: 'Sportlandia', period: '1966' },
  { supplier: 'Industria Lanús', period: '1967–1973' },
  { supplier: 'Adidas (Germany)', period: '1974–1979' },
  { supplier: 'Le Coq Sportif (France)', period: '1980–1989' },
  { supplier: 'Adidas (Germany)', period: '1990–1998' },
  { supplier: 'Reebok (US)', period: '1999–2001' },
  { supplier: 'Adidas (Germany)', period: '2002–Present' }
];
