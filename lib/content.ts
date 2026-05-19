export const meta = {
  title: "La storicizzazione nei primi quattro libri dell'Eneide di Virgilio",
  subtitle: "Trasformazione del mito e ideologia augustea",
  author: "Publius Vergilius Maro · 29–19 a.C.",
};

export const tldr: string[] = [
  "Nei libri I–IV dell'Eneide Virgilio opera una sistematica «storicizzazione» del mito troiano: tramite profezie ex eventu, ekphrasis, eziologie e ridisegno dell'eredità ellenistica, egli salda il fatum mitico al tempo storico romano fino alla pax Augusta, conferendo al principato una legittimazione cosmica e genealogica.",
  "L'operazione non è univocamente celebrativa: dal Servius ad Aen. 2.557 fino alla Harvard School (Parry, Clausen, Putnam, Lyne, Johnson) e alla sintesi italiana di La Penna, Conte, Barchiesi, Casali, è ormai assodato che il poema fa convivere una «voce pubblica del trionfo» con una «voce privata del rimpianto».",
  "La storicizzazione virgiliana va letta come ingranaggio centrale del «programma» culturale augusteo (Ara Pacis, Forum Augustum, monetazione): la novità di Virgilio non sta nel materiale leggendario, ma nella sua configurazione teleologica.",
];

export interface KeyFinding {
  number: number;
  title: string;
  body: string;
  citation?: string;
}

export const keyFindings: KeyFinding[] = [
  {
    number: 1,
    title: "Profezia e compendio storico (Aen. I 257-296)",
    body: "Il discorso di Iuppiter a Venere è il dispositivo principale di storicizzazione: condensa in trenta versi oltre un millennio di storia romana (Enea → Ascanio → Alba Longa → Romolo → Cesare/Augusto), trasformando il mito in praeparatio del presente augusteo.",
    citation: "J. O'Hara, Death and the Optimistic Prophecy in Vergil's Aeneid, Princeton 1990",
  },
  {
    number: 2,
    title: "Ekphrasis e «monumentalizzazione» del mito (Aen. I 441-493)",
    body: "Le scene troiane affrescate nel tempio di Giunone a Cartagine producono il primo grande effetto di storicizzazione interno al poema: il dolore di Enea («sunt lacrimae rerum et mentem mortalia tangunt», I 462) trasforma l'evento omerico in tradizione iconografica già canonizzata.",
    citation: "R.O.A.M. Lyne, Further Voices in Vergil's Aeneid, Oxford 1987",
  },
  {
    number: 3,
    title: "Caduta di Troia e guerre civili (Aen. II)",
    body: "La distruzione dell'Ilio si configura come archetipo di ogni urbs capta romana. La testa decapitata di Priamo sulla spiaggia allude, già secondo Servio, all'assassinio di Pompeo Magno a Pelusio nel 48 a.C.",
    citation: "A.M. Bowie, «The Death of Priam: Allegory and History in the Aeneid», Classical Quarterly 40.2, 1990",
  },
  {
    number: 4,
    title: "Viaggio e Mediterraneo «romanizzato» (Aen. III)",
    body: "Il libro delle peregrinazioni è il laboratorio dell'eziologia romana: ogni tappa (Tracia, Delo, Creta, Strofadi, Butroto, Sicilia) ridisegna in chiave colonial-romana il nostos greco e l'Argonautica di Apollonio.",
    citation: "D. Nelis, Vergil's Aeneid and the Argonautica of Apollonius Rhodius, Leeds 2001",
  },
  {
    number: 5,
    title: "Didone, Cartagine e prolessi punica (Aen. IV)",
    body: "La maledizione di Didone «exoriare aliquis nostris ex ossibus ultor» (IV 625) è il caso più trasparente di profezia ex eventu: l'«ultore» è Annibale. Il libro intero funziona come fondazione mitica del conflitto romano-cartaginese.",
    citation: "A.S. Pease, Publi Vergili Maronis Aeneidos Liber Quartus, Cambridge MA 1935",
  },
  {
    number: 6,
    title: "Il dibattito Didone–Cleopatra",
    body: "Uno dei nodi interpretativi più controversi. Difensori dell'identificazione (Pease, Galinsky, Cairns) contrapposti agli scettici (La Penna, Lyne, Casali). La posizione oggi prevalente è quella di una sovrapposizione semantica: Didone è anzitutto la prefigurazione della Cartagine, con l'eco di Cleopatra come risonanza laterale.",
  },
  {
    number: 7,
    title: "«Doppia voce» e Harvard School",
    body: "Il dibattito si polarizza fra lettura celebrativa europea (Heinze, Klingner, Pöschl, Galinsky, Hardie) e lettura pessimistica della Harvard School (Parry, Clausen, Putnam, Johnson, Lyne). La sintesi italiana (La Penna, Conte, Barchiesi) legge Virgilio come poeta dell'«integrazione difficile».",
    citation: "A. Parry, «The Two Voices of Virgil's Aeneid», Arion 2, 1963",
  },
  {
    number: 8,
    title: "Hardie e l'«epica cosmica/imperiale»",
    body: "Virgil's Aeneid: Cosmos and Imperium (Oxford 1986) ha rifondato la lettura ideologica del poema mostrando come la corrispondenza orbis/urbs costituisca il dispositivo profondo per cui l'impero romano si storicizza cosmicamente.",
    citation: "P. Hardie, Virgil's Aeneid: Cosmos and Imperium, Oxford 1986",
  },
  {
    number: 9,
    title: "Programma culturale augusteo",
    body: "La storicizzazione virgiliana è isomorfa rispetto al lavoro plastico-architettonico di Augusto: il Forum Augustum, l'Ara Pacis, la monetazione (Venere Genitrice, sidus Iulium), il restauro di 82 templi nel 28 a.C. compongono lo stesso lessico mitico-storico.",
    citation: "K. Galinsky, Augustan Culture, Princeton 1996; P. Zanker, Augustus und die Macht der Bilder, München 1987",
  },
];

export interface QuoteEntry {
  latin: string;
  translation: string;
  source: string;
  book: "I" | "II" | "III" | "IV";
}

export const quotes: QuoteEntry[] = [
  {
    latin: "imperium sine fine dedi",
    translation: "«Ho dato un impero senza fine»",
    source: "Aen. I 279 — Discorso di Giove a Venere",
    book: "I",
  },
  {
    latin: "sunt lacrimae rerum et mentem mortalia tangunt",
    translation: "«Ci sono lacrime per le cose, e ciò che è mortale tocca la mente»",
    source: "Aen. I 462 — Ekphrasis del tempio di Giunone",
    book: "I",
  },
  {
    latin: "iacet ingens litore truncus\navulsumque umeris caput et sine nomine corpus",
    translation: "«Giace sulla riva un enorme tronco,\nla testa strappata dalle spalle e un corpo senza nome»",
    source: "Aen. II 557-558 — Morte di Priamo / allusione a Pompeo",
    book: "II",
  },
  {
    latin: "exoriare aliquis nostris ex ossibus ultor\nqui face Dardanios ferroque sequare colonos",
    translation: "«Sorgi, qualcuno, dalle mie ossa, vendicatore,\nche con fiaccola e ferro insegua i coloni dardani»",
    source: "Aen. IV 625-626 — Maledizione di Didone (profezia di Annibale)",
    book: "IV",
  },
  {
    latin: "litora litoribus contraria, fluctibus undas\nimprecor, arma armis: pugnent ipsique nepotesque",
    translation: "«Lidi contro lidi, onde contro flutti maledico,\narmi contro armi: combattano essi stessi e i nipoti»",
    source: "Aen. IV 628-629 — Maledizione di Didone (profezia delle Guerre Puniche)",
    book: "IV",
  },
];

export interface BookSection {
  variant: "I" | "II" | "III" | "IV";
  title: string;
  subtitle: string;
  intro: string;
  subsections: { title: string; body: string }[];
  accent: string;
  bg: string;
  textColor: string;
}

export const books: BookSection[] = [
  {
    variant: "I",
    title: "Libro I",
    subtitle: "Profezia, tempesta, ekphrasis",
    intro:
      "Il primo libro dell'Eneide istituisce i due dispositivi fondamentali della storicizzazione virgiliana: la profezia di Giove (vv. 257-296) e l'ekphrasis del tempio di Giunone a Cartagine (vv. 441-493).",
    subsections: [
      {
        title: "La profezia di Giove (I 257-296)",
        body: "La struttura del discorso è quella della Heilsgeschichte: tre anni di guerra in Lazio, trenta di regno di Ascanio, trecento di Alba Longa, fino al Romulus auctor (I 276) e al Caesar «nascetur pulchra Troianus origine» (I 286). La frase chiave «imperium sine fine dedi» (I 279) saldata al claudere dei Belli Portae è la matrice di tutta la storicizzazione augustea. J. Hejduk (2009) e J. O'Hara (1990) hanno mostrato che la profezia non è priva di ambiguità: Giove omette il fatto che le guerre civili termineranno solo con violenza.",
      },
      {
        title: "L'ekphrasis del tempio di Giunone (I 441-493)",
        body: "I 462 («sunt lacrimae rerum et mentem mortalia tangunt») è la formula più dibattuta del poema. La lettura ironica (Lyne 1987; Putnam, Virgil's Epic Designs, Yale 1998) sottolinea che il tempio è di Giunone, nemica di Troia: le immagini celebrano la sua vittoria. La scena è il primo esempio di «storicizzazione interna»: l'evento mitico è già immagine fissata in monumento.",
      },
    ],
    accent: "#C9A84C",
    bg: "#0E1B2E",
    textColor: "#D6CDB4",
  },
  {
    variant: "II",
    title: "Libro II",
    subtitle: "Storia della distruzione e specchio delle guerre civili",
    intro:
      "La caduta di Troia non è solo memoria epica: è l'archetipo di ogni urbs capta romana, dagli assedi delle guerre civili (Perugia 41-40 a.C.) alla morte di Pompeo a Pelusio.",
    subsections: [
      {
        title: "Priamo e Pompeo (II 506-558)",
        body: "«iacet ingens litore truncus / avulsumque umeris caput et sine nomine corpus»: Servio annota «Pompei tangit historiam, cum 'ingens' dicit, non 'magnus'… sine nomine: sine agnitione, aut sine dignitate». La dislocazione narrativa (Priamo muore presso l'altare in II 553-554 e poi il suo corpo iacet litore in II 557, come se fosse a chilometri di distanza) si spiega solo con la sovrapposizione del corpo di Pompeo decapitato sul litorale di Pelusio (settembre 48 a.C.). S. Hinds (Allusion and Intertext, Cambridge 1998) ne fa il caso esemplare di «annotazione riflessiva»: la scena virgiliana sembra già essa stessa un'allusione alla morte di Pompeo.",
      },
      {
        title: "Urbs capta: archetipo delle guerre civili",
        body: "L'intero libro funziona come etiopatogenesi della violenza romana. Le città distrutte storicamente (Perugia 41-40 a.C., Sagunto 219 a.C., Numanzia 133 a.C.) risuonano nello sfondo. Bowie (2008) afferma che la scena di Priamo è «the first place where the Aeneid explicitly encourages an allegorical reading of itself specifically in terms of recent Roman history».",
      },
    ],
    accent: "#A03030",
    bg: "#1A0808",
    textColor: "#E8D0C0",
  },
  {
    variant: "III",
    title: "Libro III",
    subtitle: "Geografia storicizzata e romanizzazione di Apollonio",
    intro:
      "Il libro delle peregrinazioni — a lungo definito «the dullest book of the Aeneid» (Allen 1951-52) — è in realtà il laboratorio dell'eziologia romana e della trasformazione di Enea da Troiano a proto-Romano.",
    subsections: [
      {
        title: "Le tappe fondative",
        body: "Tracia (tomba di Polidoro, monito sull'hospitium), Delo (oracolo di Apollo, anticipazione di Apollo Palatino), Creta (rifondazione abortita), Strofadi (profezia dei mensae), Butroto (la «piccola Troia» di Eleno e Andromaca, modello anti-romano della rifondazione mimetica), Sicilia (tomba di Anchise a Drepano). Ciascuna tappa è un atto fondativo prospettato, non una semplice stazione odisseica.",
      },
      {
        title: "Romanizzazione dell'Argonautica",
        body: "D. Nelis (Vergil's Aeneid and the Argonautica of Apollonius Rhodius, Leeds 2001) ha dimostrato che il libro III è una sistematica romanizzazione dell'Argonautica: l'eziologia ellenistica (Apollonio, Callimaco, Aitia) viene piegata a servizio del fatum romano. Il libro è la trasformazione di Enea da Troiano in proto-Romano: come notano Lloyd (AJP 78, 1957) e Di Cesare (The Altar and the City, NY 1974), la conversio avviene gradualmente attraverso le tappe del viaggio.",
      },
    ],
    accent: "#2A8A9A",
    bg: "#081520",
    textColor: "#C8D8D8",
  },
  {
    variant: "IV",
    title: "Libro IV",
    subtitle: "Didone, Cartagine, profezia ex eventu delle guerre puniche",
    intro:
      "Il libro IV è il cuore della storicizzazione virgiliana: la storia d'amore tra Enea e Didone è al contempo fondazione mitica dell'odio romano-cartaginese e, per il lettore augusteo del 19 a.C., inevitabile eco della sconfitta di Cleopatra ad Azio.",
    subsections: [
      {
        title: "La maledizione (IV 622-629)",
        body: "«exoriare aliquis nostris ex ossibus ultor / qui face Dardanios ferroque sequare colonos»: la profezia ex eventu più trasparente del poema. L'«ultor» è Annibale (così Servio, Forbiger, Ladewig, Pease 1935, Austin 1955). La frase «litora litoribus contraria, fluctibus undas / imprecor, arma armis: pugnent ipsique nepotesque» è il manifesto della guerra punica come fato cosmicizzato. La pira di Didone prefigura la distruzione di Cartagine del 146 a.C. da parte di Scipione Emiliano.",
      },
      {
        title: "Didone-Cleopatra: un nodo aperto",
        body: "La tradizione filo-allegorica (Pease 1935; Heinze 1903; Galinsky 2003) vede in Didone una prefigurazione di Cleopatra: regina straniera, antagonista di Roma, suicida per amore di un Romano sviato. La tradizione scettica (La Penna, Lyne 1987, Casali 2017) preferisce il modello tragico di Medea. La posizione oggi prevalente (Conte, Perutelli) è quella di una sovrapposizione semantica: Didone è anzitutto la Tyria regina, con l'eco di Cleopatra come risonanza laterale inevitabile ma non esclusiva.",
      },
    ],
    accent: "#9B5A1A",
    bg: "#150A20",
    textColor: "#DDC8D0",
  },
];

export interface Scholar {
  name: string;
  work: string;
  year: string;
  position: "celebrative" | "pessimistic" | "synthesis";
  quote?: string;
}

export const harvardSchool: Scholar[] = [
  {
    name: "A. Parry",
    work: "«The Two Voices of Virgil's Aeneid»",
    year: "Arion 2, 1963",
    position: "pessimistic",
    quote: "«a public voice of triumph, and a private voice of regret»",
  },
  {
    name: "W. Clausen",
    work: "«An Interpretation of the Aeneid»",
    year: "HSCP 68, 1964",
    position: "pessimistic",
  },
  {
    name: "M. Putnam",
    work: "The Poetry of the Aeneid",
    year: "Harvard, 1965",
    position: "pessimistic",
  },
  {
    name: "W.R. Johnson",
    work: "Darkness Visible",
    year: "Berkeley, 1976",
    position: "pessimistic",
  },
  {
    name: "R.O.A.M. Lyne",
    work: "Further Voices in Vergil's Aeneid",
    year: "Oxford, 1987",
    position: "pessimistic",
  },
];

export const europeanSchool: Scholar[] = [
  {
    name: "R. Heinze",
    work: "Virgils epische Technik",
    year: "Leipzig, 1903",
    position: "celebrative",
  },
  {
    name: "V. Pöschl",
    work: "Die Dichtkunst Virgils",
    year: "1950",
    position: "celebrative",
  },
  {
    name: "P. Hardie",
    work: "Virgil's Aeneid: Cosmos and Imperium",
    year: "Oxford, 1986",
    position: "celebrative",
    quote:
      "«any easy conclusion that the poet was at heart anti-Augustan is precluded by the depth and detail with which he develops the imperialist themes»",
  },
  {
    name: "K. Galinsky",
    work: "Augustan Culture",
    year: "Princeton, 1996",
    position: "celebrative",
  },
];

export const italianSynthesis: Scholar[] = [
  {
    name: "A. La Penna",
    work: "L'impossibile giustificazione della storia",
    year: "Laterza, 2005",
    position: "synthesis",
    quote: "«pia rassegnazione» dinanzi all'impossibilità di giustificare moralmente la storia",
  },
  {
    name: "G.B. Conte",
    work: "Memoria dei poeti e sistema letterario",
    year: "Einaudi, 1974",
    position: "synthesis",
  },
  {
    name: "A. Barchiesi",
    work: "La traccia del modello",
    year: "Pisa, 1984",
    position: "synthesis",
  },
  {
    name: "S. Casali",
    work: "Virgilio: guida all'Eneide",
    year: "Carocci, 2023",
    position: "synthesis",
  },
];

export interface AugustanMonument {
  name: string;
  date: string;
  description: string;
  connection: string;
}

export const augustanProgram: AugustanMonument[] = [
  {
    name: "Forum Augustum",
    date: "Inaugurato il 1° agosto 2 a.C.",
    description:
      "108 statue di summi viri da Enea a Cesare lungo il lato giulio-claudio dei portici; i triumphatores repubblicani sull'altro lato (Suetonius, Aug. 31.1).",
    connection: "Incarnazione plastica della genealogia mitica dell'Eneide",
  },
  {
    name: "Ara Pacis",
    date: "Commissionata 4 luglio 13 a.C. · Dedicata 30 gennaio 9 a.C.",
    description:
      "Pannello di Enea sacrificante (Res Gestae 12.2). Il fregio istituzionalizza la connessione tra il viaggio di Enea e la pax Augusta.",
    connection: "Corrisponde al pannello ekphrastico del tempio di Giunone (Aen. I)",
  },
  {
    name: "Monetazione",
    date: "Dal 29 a.C.",
    description:
      "Venere Genitrice, sidus Iulium: il programma numismatico fa circolare la genealogia giulio-troiana in ogni angolo dell'impero.",
    connection: "Genealogia di Aen. I 286: «nascetur pulchra Troianus origine Caesar»",
  },
  {
    name: "82 templi restaurati",
    date: "28 a.C. — VI consolato di Augusto",
    description:
      "Incluso il Tempio di Apollo Palatino (9 ottobre 28 a.C.). Res Gestae 20.4. L'oracolo di Apollo a Delo (Aen. III) anticipa questa consacrazione apollinea.",
    connection: "Apollo di Aen. III si compie in Apollo Palatino, patrono della vittoria di Azio",
  },
];

export interface BibEntry {
  author: string;
  title: string;
  publisher: string;
  year: string;
  note?: string;
  book?: "I" | "II" | "III" | "IV" | "generale";
}

export const bibliography: BibEntry[] = [
  {
    author: "G.B. Conte",
    title: "P. Vergilius Maro, Aeneis",
    publisher: "Bibliotheca Teubneriana, Berlin",
    year: "2009",
    note: "Testo critico di riferimento",
    book: "generale",
  },
  {
    author: "R.G. Austin",
    title: "Aeneidos Liber Primus",
    publisher: "Oxford",
    year: "1971",
    book: "I",
  },
  {
    author: "S. Casali",
    title: "Virgilio, Eneide 2",
    publisher: "Edizioni della Normale, Pisa",
    year: "2017",
    note: "Il commento più aggiornato al libro II",
    book: "II",
  },
  {
    author: "R.G. Austin",
    title: "Aeneidos Liber Secundus",
    publisher: "Oxford",
    year: "1964",
    book: "II",
  },
  {
    author: "N. Horsfall",
    title: "Virgil, Aeneid 2: A Commentary",
    publisher: "Brill, Leiden",
    year: "2008",
    book: "II",
  },
  {
    author: "N. Horsfall",
    title: "Virgil, Aeneid 3",
    publisher: "Brill",
    year: "2006",
    note: "Insuperato per Realien e fonti",
    book: "III",
  },
  {
    author: "D. Nelis",
    title: "Vergil's Aeneid and the Argonautica of Apollonius Rhodius",
    publisher: "Leeds",
    year: "2001",
    book: "III",
  },
  {
    author: "A.S. Pease",
    title: "Publi Vergili Maronis Aeneidos Liber Quartus",
    publisher: "Cambridge MA",
    year: "1935",
    note: "Il commento più ricco al libro IV; ristampa Darmstadt 1967",
    book: "IV",
  },
  {
    author: "R.G. Austin",
    title: "Aeneidos Liber Quartus",
    publisher: "Oxford",
    year: "1955",
    book: "IV",
  },
  {
    author: "P. Hardie",
    title: "Virgil's Aeneid: Cosmos and Imperium",
    publisher: "Oxford",
    year: "1986",
    note: "Per la lettura ideologica",
    book: "generale",
  },
  {
    author: "A. Parry",
    title: "«The Two Voices of Virgil's Aeneid»",
    publisher: "Arion 2",
    year: "1963",
    note: "Manifesto della Harvard School",
    book: "generale",
  },
  {
    author: "M. Putnam",
    title: "The Poetry of the Aeneid",
    publisher: "Harvard",
    year: "1965",
    book: "generale",
  },
  {
    author: "A. La Penna",
    title: "L'impossibile giustificazione della storia. Un'interpretazione di Virgilio",
    publisher: "Laterza",
    year: "2005",
    note: "Sintesi italiana fondamentale",
    book: "generale",
  },
  {
    author: "G.B. Conte",
    title: "Virgilio. L'epica del sentimento",
    publisher: "Einaudi",
    year: "2002",
    book: "generale",
  },
  {
    author: "A. Barchiesi",
    title: "La traccia del modello",
    publisher: "Pisa",
    year: "1984",
    book: "generale",
  },
  {
    author: "K. Galinsky",
    title: "Augustan Culture",
    publisher: "Princeton",
    year: "1996",
    note: "Per il contesto culturale augusteo",
    book: "generale",
  },
  {
    author: "P. Zanker",
    title: "Augustus und die Macht der Bilder",
    publisher: "München",
    year: "1987",
    book: "generale",
  },
  {
    author: "S. Hinds",
    title: "Allusion and Intertext",
    publisher: "Cambridge",
    year: "1998",
    note: "Cap. 1: manifesto dell'«annotazione riflessiva»",
    book: "II",
  },
  {
    author: "S. Casali",
    title: "Virgilio: guida all'Eneide",
    publisher: "Carocci",
    year: "2023",
    note: "Introduzione aggiornata in italiano",
    book: "generale",
  },
  {
    author: "A.M. Bowie",
    title: "«The Death of Priam: Allegory and History in the Aeneid»",
    publisher: "Classical Quarterly 40.2",
    year: "1990",
    book: "II",
  },
];

export const navLinks = [
  { id: "contesto", label: "Contesto" },
  { id: "libro-i", label: "Libro I" },
  { id: "libro-ii", label: "Libro II" },
  { id: "libro-iii", label: "Libro III" },
  { id: "libro-iv", label: "Libro IV" },
  { id: "dibattito", label: "Dibattito" },
  { id: "augusto", label: "Augusto" },
  { id: "ricezione", label: "Ricezione" },
  { id: "bibliografia", label: "Biblio" },
];
