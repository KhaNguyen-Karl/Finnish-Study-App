// SuomiPolku - Finnish Language Curriculum & Educational Data (A0 -> B1.1 -> C)
const SUOMI_DATA = {
  levels: [
    { id: 'A0', name: 'A0: Täysin alkeet', description: 'Zero Finnish knowledge. Learning alphabet, basic greetings, and numbers.', targetExp: 100 },
    { id: 'A1.1', name: 'A1.1: Alkeiden alku', description: 'Basic introductions, simple survival phrases, ordering coffee, days and numbers.', targetExp: 300 },
    { id: 'A1.2', name: 'A1.2: Toimiva peruskielitaito', description: 'Shopping, grocery store, asking for directions, simple present tense.', targetExp: 600 },
    { id: 'A1.3', name: 'A1.3: Vahvistuva perustaso', description: 'Daily routine, weather, home and living, basic consonant gradation (k-p-t).', targetExp: 900 },
    { id: 'A2.1', name: 'A2.1: Selviytymiskieli', description: 'Doctor visits, hobbies, simple past tense (imperfekti), housing announcements.', targetExp: 1300 },
    { id: 'A2.2', name: 'A2.2: Sujuva arjen viestintä', description: 'Explaining problems, work and study, object cases, understanding basic puhekieli.', targetExp: 1800 },
    { id: 'B1.1', name: 'B1.1: YKI-Kansalaisuustaso (Target)', description: 'Official YKI test level! Independent communication at work, public services, handling opinions and spontaneous speech.', targetExp: 2500 },
    { id: 'B1.2', name: 'B1.2: Vahva itsenäinen taito', description: 'Nuanced opinions, idiomatic expressions, fast puhekieli understanding.', targetExp: 3400, preview: true },
    { id: 'B2.1', name: 'B2.1: Itsenäinen ammattikieli', description: 'Professional Finnish, writing formal reports, effortless conversation.', targetExp: 4500, preview: true },
    { id: 'C1', name: 'C1: Taitava kielenkäyttäjä', description: 'Near-native fluency, Finnish literature, academic and complex registers.', targetExp: 6000, preview: true }
  ],

  // Diagnostic Placement Test (Tasokoe) across all 4 skills
  placementTest: [
    // 1. Reading (A1.1)
    {
      id: 'pt_r1',
      skill: 'reading',
      level: 'A1.1',
      questionType: 'choice',
      prompt: 'Lue viesti ja vastaa kysymykseen:',
      contextText: '”Hei Mikko! Tervetuloa meille lauantaina kello 18.00. Me syömme pizzaa ja saunomme. Terveisin, Ville.”',
      question: 'Mihin aikaan Mikko on tervetullut Villen luo?',
      options: ['Kello 8.00', 'Kello 16.00', 'Kello 18.00', 'Sunnuntaina'],
      correctIndex: 2,
      explanation: 'Tekstissä lukee suoraan: ”lauantaina kello 18.00”.',
      levelAward: 'A1.1'
    },
    // 2. Listening (A1.2)
    {
      id: 'pt_l1',
      skill: 'listening',
      level: 'A1.2',
      questionType: 'choice',
      audioText: 'Anteeksi, paljonko tämä kahvi ja korvapuusti maksaa yhteensä?',
      prompt: 'Kuuntele lause ja valitse, mistä henkilö kysyy:',
      options: ['Missä kahvila sijaitsee', 'Mitä kahvi ja pulla maksavat', 'Mihin aikaan kahvila aukeaa', 'Onko pulla tuoretta'],
      correctIndex: 1,
      explanation: '”Paljonko maksaa” = How much does it cost. Kyse on hinnasta.',
      levelAward: 'A1.2'
    },
    // 3. Spoken Finnish / Puhekieli (A2.1)
    {
      id: 'pt_pk1',
      skill: 'listening',
      level: 'A2.1',
      questionType: 'choice',
      isPuhekieli: true,
      audioText: 'Mä meen huomenna dösällä stadiin, tuutsä mukaan?',
      prompt: 'Kuuntele puhekielinen lause ja valitse sen kirjakielinen vastine:',
      options: [
        'Minä menen huomenna bussilla kaupunkiin, tuletko sinä mukaan?',
        'Minä tulen huomenna junalla kotiin, oletko sinä siellä?',
        'Me menemme tänään autolla töihin, lähdetkö mukaan?',
        'Miksi sinä menet huomenna asemalle?'
      ],
      correctIndex: 0,
      explanation: 'Puhekieli: mä = minä, meen = menen, dösä = bussi, stadi = Helsinki/kaupunki, tuutsä = tuletko sinä.',
      levelAward: 'A2.1'
    },
    // 4. Writing (A2.2)
    {
      id: 'pt_w1',
      skill: 'writing',
      level: 'A2.2',
      questionType: 'text',
      prompt: 'Kirjoita lyhyt sähköpostiviesti suomeksi: Kerro opettajallesi (Marja), että olet sairas etkä voi tulla tänään suomen kurssille.',
      placeholder: 'Hei Marja! Olen tänään sairas...',
      keywords: ['sairas', 'kurssi', 'tulla', 'anteeksi', 'terveisin'],
      minWords: 8,
      modelAnswerKirjakieli: 'Hei Marja! Valitettavasti olen tänään sairas flunssan vuoksi, enkä pääse suomen kurssille. Teen kotitehtävät kotona. Terveisin, Alex.',
      modelAnswerPuhekieli: 'Moi Marja! Oon kipee tänään enkä pääse tunnille. Koitan tehä läksyt himassa. T. Alex',
      levelAward: 'A2.2'
    },
    // 5. Reading (B1.1 - YKI style)
    {
      id: 'pt_r2',
      skill: 'reading',
      level: 'B1.1',
      questionType: 'choice',
      prompt: 'Lue taloyhtiön tiedote ja valitse oikea väite:',
      contextText: '”Taloyhtiön putkiremontti alkaa A-portaassa maanantaina 3. marraskuuta. Vedenjakelu on poikki päivittäin klo 08.00–16.00. Asukkaita pyydetään siirtämään tavarat pois kylpyhuoneista edellisenä viikonloppuna. Häiriöistä pahoitellaan.”',
      question: 'Mikä seuraavista väitteistä pitää paikkansa?',
      options: [
        'Vettä voi käyttää normaalisti koko päivän',
        'Kylpyhuoneet täytyy tyhjentää ennen maanantaita',
        'Remontti tehdään vain viikonloppuisin',
        'Vedenjakelu toimii vain aamulla klo 8 asti'
      ],
      correctIndex: 1,
      explanation: 'Tiedotteessa sanotaan: ”Asukkaita pyydetään siirtämään tavarat pois kylpyhuoneista edellisenä viikonloppuna”.',
      levelAward: 'B1.1'
    },
    // 6. Speaking (A2.2 / B1.1)
    {
      id: 'pt_s1',
      skill: 'speaking',
      level: 'B1.1',
      questionType: 'speech',
      prompt: 'Kuuntele ja lausu ääneen suomeksi:',
      targetPhrase: 'Haluaisin varata ajan lääkärille mahdollisimman pian.',
      puhekieliVersion: 'Mä haluisin varata lääkäriajan mahollisimman nopsaan.',
      translation: 'I would like to book a doctor appointment as soon as possible.',
      levelAward: 'B1.1'
    }
  ],

  // Daily Workouts catalog by skill and level
  dailyWorkouts: {
    'A1.1': {
      reading: {
        title: 'Kaupassa käynti (At the Grocery Store)',
        text: 'Moi! Minä olen Anna. Minä asun Helsingissä. Tänään minä menen kauppaan. Ostan maitoa, leipää, omenia ja juustoa. Kaupassa maito maksaa 1 euron ja 20 senttiä. Kassalla sanon myyjälle: ”Kiitos ja hyvää päivää!”',
        questions: [
          {
            q: 'Mitä Anna ostaa kaupasta?',
            options: ['Vain maitoa', 'Maitoa, leipää, omenia ja juustoa', 'Kahvia ja pullaa', 'Banaanin ja mehua'],
            correct: 1
          },
          {
            q: 'Mitä Anna sanoo myyjälle kassalla?',
            options: ['Näkemiin huomenna', 'Anteeksi, missä maito on?', 'Kiitos ja hyvää päivää!', 'En ymmärrä'],
            correct: 2
          }
        ]
      },
      writing: {
        title: 'Esittele itsesi (Introduce Yourself)',
        instructions: 'Kirjoita 3–4 lausetta suomeksi. Kerro: nimesi, mistä maasta olet kotoisin, missä kaupungissa asut Suomessa ja mitä kieltä puhut.',
        placeholder: 'Hei! Minun nimeni on... Olen kotoisin... Asun...',
        keywords: ['nimeni', 'kotoisin', 'asun', 'puhun'],
        minWords: 10,
        modelKirjakieli: 'Hei! Minun nimeni on David. Olen kotoisin Espanjasta. Asun nyt Espoossa. Puhun espanjaa, englantia ja vähän suomea.',
        modelPuhekieli: 'Moi! Mun nimi on David. Mä oon kotosin Espanjasta ja asun nyt Espoossa. Puhun espanjaa, enkkua ja vähän suomee.'
      },
      listening: {
        title: 'Kahvilan tilaus (Ordering Coffee)',
        audioText: 'Hei! Ottaisin yhden kahvin kauramaidolla ja yhden korvapuustin, kiitos.',
        puhekieliAudio: 'Moi! Yks kauramaitokahvi ja korvapuusti, kiitti.',
        questions: [
          {
            q: 'Millaista maitoa asiakas haluaa kahviinsa?',
            options: ['Tavallista maitoa', 'Rasvatonta maitoa', 'Kauramaitoa', 'Ei maitoa ollenkaan'],
            correct: 2
          }
        ]
      },
      speaking: {
        title: 'Tervehdykset & Kohteliaisuus',
        phrase: 'Mitä sinulle kuuluu tänään? Minulle kuuluu hyvää, kiitos!',
        puhekieli: 'Mitä sulle kuuluu tänään? Mulle kuuluu hyvää, kiitti!',
        phoneticTip: 'Remember: stress is always on the first syllable in Finnish (MI-tä, KUUL-uu).'
      }
    },

    'A1.2': {
      reading: {
        title: 'Kutsukortti syntymäpäiville (Birthday Invitation)',
        text: 'Moi ystävät! Täytän ensi viikolla 30 vuotta. Juhlat ovat lauantaina meidän kotona Tampereella osoitteessa Hämeenkatu 12. Aloitamme kello 17. Tarjolla on lohikeittoa, salaattia ja kakkua. Ilmoita minulle perjantaihin mennessä, pääsetkö tulemaan! Terveisin, Laura.',
        questions: [
          {
            q: 'Mitä ruokaa juhlissa tarjotaan?',
            options: ['Pizzaa ja hampurilaisia', 'Lohikeittoa, salaattia ja kakkua', 'Vain kahvia ja keksejä', 'Kasviskeittoa'],
            correct: 1
          },
          {
            q: 'Mihin mennessä Lauralle pitää ilmoittaa tulosta?',
            options: ['Lauantaina klo 17', 'Ensi kuussa', 'Perjantaihin mennessä', 'Ei tarvitse ilmoittaa'],
            correct: 2
          }
        ]
      },
      writing: {
        title: 'Vastaus syntymäpäiväkutsuun',
        instructions: 'Kirjoita lyhyt vastaus Lauralle. Kiitä kutsusta, kerro että pääset tulemaan ja kysy voitko tuoda jotain mukanasi.',
        placeholder: 'Hei Laura! Kiitos kutsusta...',
        keywords: ['kiitos', 'kutsu', 'tulen', 'pääsen', 'tuoda'],
        minWords: 10,
        modelKirjakieli: 'Moi Laura! Kiitos paljon kutsusta ja onnea jo etukäteen! Pääsen totta kai tulemaan lauantaina. Voinko tuoda jotain mukanani, esimerkiksi juotavaa? Nähdään pian!',
        modelPuhekieli: 'Moi Laura! Kiitti kutsusta! Tuun tosi mielelläni. Tuonks mä jotain tullessani, vaik viiniä tai sipsii? Nähdään lauantaina!'
      },
      listening: {
        title: 'Bussipysäkillä (At the Bus Stop)',
        audioText: 'Anteeksi, meneekö tämä bussi suoraan rautatieasemalle, vai pitääkö minun vaihtaa metroon?',
        puhekieliAudio: 'Anteeks, meneeks tää dösä suoraan steissille vai pitääks mun vaihtaa metroon?',
        questions: [
          {
            q: 'Mihin matkustaja on menossa?',
            options: ['Lentokentälle', 'Rautatieasemalle', 'Kauppakeskukseen', 'Sairaalaan'],
            correct: 1
          }
        ]
      },
      speaking: {
        title: 'Tien kysyminen (Asking directions)',
        phrase: 'Anteeksi, osaatteko sanoa, missä lähin apteekki sijaitsee?',
        puhekieli: 'Anteeks, tiiäkkö missä on lähin apteekki?',
        phoneticTip: 'Double letters (tt, kk, pp) must be pronounced with a clear pause/hold!'
      }
    },

    'A2.1': {
      reading: {
        title: 'Työpäivän jälkeen (After the Workday)',
        text: 'Työskentelen IT-yrityksessä Espoossa. Tavallisesti työpäiväni päättyy kello neljältä. Eilen olin kuitenkin toimistolla kello kuuteen asti, koska meillä oli tärkeä projektipalaveri. Palaverin jälkeen menin suoraan kuntosalille ja sieltä ruokakauppaan. Olin kotona vasta kello kahdeksan ja olin hyvin väsynyt, mutta tyytyväinen.',
        questions: [
          {
            q: 'Miksi kirjoittaja oli toimistolla eilen kello kuuteen asti?',
            options: ['Hän myöhästyi aamulla', 'Hänellä oli tärkeä projektipalaveri', 'Bussi oli myöhässä', 'Hän siivosi toimistoa'],
            correct: 1
          },
          {
            q: 'Minne kirjoittaja meni heti palaverin jälkeen?',
            options: ['Kotiin nukkumaan', 'Ravintolaan syömään', 'Kuntosalille', 'Elokuviin'],
            correct: 2
          }
        ]
      },
      writing: {
        title: 'Sähköposti vuokranantajalle (Email to Landlord)',
        instructions: 'Kirjoita asiallinen viesti vuokranantajallesi. Kerro, että asuntosi kylpyhuoneen hana vuotaa vettä. Pyydä häntä lähettämään huoltomies korjaamaan vika mahdollisimman pian.',
        placeholder: 'Hei Matti! Kirjoitan, koska asunnossani...',
        keywords: ['kylpyhuone', 'hana', 'vuotaa', 'huoltomies', 'korjata', 'pian'],
        minWords: 15,
        modelKirjakieli: 'Hei Matti! Kirjoitan sinulle, koska kylpyhuoneeni pesualtaan hana on alkanut vuotaa vettä lattialle. Vika on melko paha. Voisitko tilata huoltomiehen tarkistamaan ja korjaamaan hanan mahdollisimman pian? Ystävällisin terveisin, Alex.',
        modelPuhekieli: 'Moi Matti! Kylppärin hana on ruvennu vuotaa vettä lattialle. Voisitko laittaa huoltoyhtiölle viestiä, et joku tulis korjaan sen pian? Kiitti, Alex.'
      },
      listening: {
        title: 'Sääennuste ja viikonloppusuunnitelmat',
        audioText: 'Viikonlopuksi on luvattu aurinkoista ja lämmintä säätä koko maahan. Lämpötila nousee yli kahdenkymmenen asteen.',
        puhekieliAudio: 'Viikonlopuks on luvattu tosi hyvää ja lämmintä ilmaa koko maahan. Lämmöt nousee reilusti yli kahenkympin.',
        questions: [
          {
            q: 'Millaista säätä viikonlopuksi ennustetaan?',
            options: ['Sadetta ja kovaa tuulta', 'Aurinkoista ja yli 20 astetta', 'Kylmää ja lumisadetta', 'Pilvistä ja sumuista'],
            correct: 1
          }
        ]
      },
      speaking: {
        title: 'Oireiden kuvaileminen lääkärissä',
        phrase: 'Minulla on ollut kovaa kurkkukipua ja kuumetta kolme päivää.',
        puhekieli: 'Mul on ollu kurkku tosi kipee ja kuumetta jo kolme päivää.',
        phoneticTip: 'In Finnish, pronounce the \'r\' with a quick tip-of-the-tongue trill!'
      }
    },

    'A2.2': {
      reading: {
        title: 'Kierrätys taloyhtiössä (Recycling in the Building)',
        text: 'Hyvät asukkaat. Jätekatoksemme on ollut usein epäsiistissä kunnossa. Muistutamme, että pahvilaatikot tulee aina litistää ennen kuin ne laitetaan pahvinkeräykseen. Huonekaluja, maaleja tai vanhoja kodinkoneita ei saa jättää jätekatokseen, vaan ne täytyy viedä itse Sortti-asemalle. Pidetään yhdessä pihapiiri viihtyisänä!',
        questions: [
          {
            q: 'Mitä pahvilaatikoille täytyy tehdä ennen keräykseen laittamista?',
            options: ['Leikata saksilla pieniksi paloiksi', 'Kastaa veteen', 'Litistää litteiksi', 'Polttaa roskiksessa'],
            correct: 2
          },
          {
            q: 'Mihin vanhat huonekalut ja kodinkoneet pitää viedä?',
            options: ['Jätekatokseen oven viereen', 'Sortti-asemalle', 'Pihalle roskakorin viereen', 'Uff-keräyslaatikkoon'],
            correct: 1
          }
        ]
      },
      writing: {
        title: 'Myöhästyminen töistä (Apologizing for being late)',
        instructions: 'Kirjoita viesti työtiimisi ryhmächattiin. Kerro, että junaliikenne seisoo teknisen vian takia ja tulet myöhästymään noin 30 minuuttia. Kerro, että liityt aamupalaveriin etänä puhelimella.',
        placeholder: 'Moi kaikille! Olen pahoillani, mutta...',
        keywords: ['juna', 'myöhässä', 'vika', 'palaveri', 'etänä', 'puhelin'],
        minWords: 15,
        modelKirjakieli: 'Moi kaikille! Valitettavasti juna on pysähtynyt radalle sähkövian takia, joten myöhästyn toimistolta noin puoli tuntia. Liityn klo 9 aamupalaveriin puhelimellani matkan varrelta. Pahoittelut häiriöstä!',
        modelPuhekieli: 'Moi jengi! Juna seisoo radalla sähkövian takia, eli myöhästyn toimistolta puolisen tuntia. Tuun aamupalaveriin etänä luurilla. Sori säädöstä!'
      },
      listening: {
        title: 'Puhekielinen kahvipöytäkeskustelu',
        audioText: 'Ootko sä kuullu, et Pekka meinaa vaihtaa työpaikkaa ens kuussa? Se sai paikan jostain uudesta startupista.',
        puhekieliAudio: 'Ootsä kuullu, et Pekka meinaa vaihtaa duunii ens kuussa? Se sai paikan jostain uudesta startupista.',
        questions: [
          {
            q: 'Mitä Pekka aikoo tehdä?',
            options: ['Jäädä eläkkeelle', 'Vaihtaa työpaikkaa startupiin', 'Muuttaa ulkomaille opiskelemaan', 'Pitää pitkän sairasloman'],
            correct: 1
          }
        ]
      },
      speaking: {
        title: 'Mielipiteen ilmaiseminen (Expressing Opinion)',
        phrase: 'Minun mielestäni tämä ehdotus on erittäin hyvä ja kannattava.',
        puhekieli: 'Mun mielest tää ehdotus on tosi hyvä ja järkevä.',
        phoneticTip: 'Practice the transition from \'ö\' to \'y\' in \'mielestäni\' and \'erittäin\'.'
      }
    },

    'B1.1': {
      reading: {
        title: 'YKI-tason artikkeli: Etätyön tulevaisuus Suomessa',
        text: 'Etätyön yleistyminen Suomessa on muuttanut pysyvästi työkulttuuria. Tutkimusten mukaan suurin osa toimihenkilöistä haluaa jatkaa hybridityötä, jossa osa viikosta tehdään kotona ja osa työpaikalla. Työnantajat ovat huomanneet etätyön parantavan työntekijöiden jaksamista ja vähentävän työmatkoihin kuluvaa stressiä. Toisaalta haasteeksi koetaan yhteisöllisyyden heikentyminen ja uusien työntekijöiden perehdyttäminen etänä.',
        questions: [
          {
            q: 'Mitä suurin osa toimihenkilöistä tutkimusten mukaan toivoo?',
            options: [
              'Paluuta täysiaikaiseen toimistotyöhön',
              'Pelkkää etätyötä ilman käyntejä toimistolla',
              'Hybridityötä, jossa yhdistyvät koti- ja toimistopäivät',
              'Työajan lyhentämistä neljään päivään'
            ],
            correct: 2
          },
          {
            q: 'Mikä mainitaan etätyön merkittävänä haasteena?',
            options: [
              'Tietokoneiden korkea hinta',
              'Yhteisöllisyyden heikentyminen ja uuden työntekijän perehdytys',
              'Palkkojen laskeminen etätöissä',
              'Sähkönkulutuksen kasvu kotona'
            ],
            correct: 1
          }
        ]
      },
      writing: {
        title: 'YKI-kirjoitustehtävä: Mielipidekirjoitus lehteen',
        instructions: 'Kirjoita mielipidekirjoitus paikallislehteen (noin 40–60 sanaa). Aihe: ”Pitäisikö joukkoliikenteen olla ilmaista kaikille kaupunkilaisille?” Esitä oma kantasi, perustele se vähintään kahdella syyllä ja pohdi asiaa myös kaupungin talouden kannalta.',
        placeholder: 'Mielestäni julkisen liikenteen tulisi olla...',
        keywords: ['mielestäni', 'koska', 'liikenne', 'kaupunki', 'ilmasto', 'kustannus', 'kannattaa'],
        minWords: 35,
        modelKirjakieli: 'Mielestäni joukkoliikenteen tulisi olla maksutonta kaikille asukkaille. Ensinnäkin se kannustaisi ihmisiä jättämään henkilöautot kotiin, mikä vähentäisi päästöjä ja liikenneruuhkia. Toiseksi se auttaisi vähävaraisia perheitä ja opiskelijoita säästämään arjen kuluissa. Vaikka tämä vaatisi verovarojen uudelleenjärjestelyä, hyödyt ympäristölle ja kansanterveydelle olisivat huomattavat.',
        modelPuhekieli: 'Mun mielestä julkisen ois hyvä olla ilmasta kaikille. Se sais jengin jättää autot himaan ja putsis ilmaa. Lisäks opiskelijat ja perheet säästäis rahaa. Totta kai se maksaa kaupungille, mut hyödyt ois kyl tosi isot pitkällä tähtäimellä.'
      },
      listening: {
        title: 'YKI-tason uutiskatsaus ja haastattelu',
        audioText: 'Kaupunginvaltuusto päätti eilen äänin 45 vastaan 22 rakentaa uuden pikaraitiotielinjan läntisiin esikaupunkeihin. Hankkeen arvioidaan valmistuvan vuoteen 2028 mennessä ja sen budjetti on 180 miljoonaa euroa.',
        puhekieliAudio: 'Valtuusto löi eilen lukkoon uuden ratikkalinjan länsipuolelle. Äänestys meni aika selvästi läpi. Jos kaikki menee putkeen, linja rullaa vuonna kakskytkahdeksan.',
        questions: [
          {
            q: 'Mitä kaupunginvaltuusto päätti äänestyksessä?',
            options: [
              'Lopettaa vanhan raitiovaunuliikenteen',
              'Rakentaa uuden pikaraitiotielinjan',
              'Alentaa bussilippujen hintoja',
              'Siirtää hankkeen käsittelyä tulevaisuuteen'
            ],
            correct: 1
          }
        ]
      },
      speaking: {
        title: 'YKI-suullinen koe: Oman kannan perustelu',
        phrase: 'Ymmärrän toisen näkökannan, mutta omasta mielestäni meidän tulisi panostaa enemmän uusiutuvaan energiaan tulevaisuuden turvaamiseksi.',
        puhekieli: 'Mä tajuan ton pointin kyl, mut mun mielestä meijän pitäs satsaa enemmän vihreeseen energiaan tulevaisuuden takia.',
        phoneticTip: 'Maintain steady Finnish rhythm without stressing conjunctions like \'mutta\' or \'että\'.'
      }
    }
  },

  // Puhekieli Laboratory: Rules, Contractions, Dictionary, and Drills
  puhekieliLab: {
    categories: [
      {
        id: 'pronouns',
        title: 'Persoonapronominit (Pronouns)',
        description: 'In spoken Finnish, almost no one says "minä" or "sinä" in normal conversations.',
        items: [
          { kirjakieli: 'minä', puhekieli: 'mä (mää)', meaning: 'I', example: 'Mä tuun huomenna. (Minä tulen huomenna.)' },
          { kirjakieli: 'sinä', puhekieli: 'sä (sää)', meaning: 'you', example: 'Ootsä valmis? (Oletko sinä valmis?)' },
          { kirjakieli: 'hän', puhekieli: 'se', meaning: 'he/she (Finns use "it" for people in speech!)', example: 'Se soitti mulle. (Hän soitti minulle.)' },
          { kirjakieli: 'me', puhekieli: 'me (me ollaan)', meaning: 'we', example: 'Me mennään leffaan. (Me menemme elokuviin.)' },
          { kirjakieli: 'te', puhekieli: 'te (te ootte)', meaning: 'you (plural)', example: 'Mitä te teette? (Mitä te teette?)' },
          { kirjakieli: 'he', puhekieli: 'ne', meaning: 'they', example: 'Ne asuu naapurissa. (He asuvat naapurissa.)' }
        ]
      },
      {
        id: 'verbs',
        title: 'Verbit ja passiivin käyttö (Verbs)',
        description: 'We-form in speech is always the passive! Contractions drop syllables.',
        items: [
          { kirjakieli: 'minä olen', puhekieli: 'mä oon', meaning: 'I am', example: 'Mä oon töissä.' },
          { kirjakieli: 'sinä olet', puhekieli: 'sä oot', meaning: 'you are', example: 'Sä oot paras!' },
          { kirjakieli: 'me menemme', puhekieli: 'me mennään', meaning: 'we go (passive used as "we")', example: 'Mennäänkö kahville?' },
          { kirjakieli: 'minä tulen', puhekieli: 'mä tuun', meaning: 'I come', example: 'Tuun heti kun ehin.' },
          { kirjakieli: 'minä menen', puhekieli: 'mä meen', meaning: 'I go', example: 'Meen nukkumaan.' },
          { kirjakieli: 'he ovat', puhekieli: 'ne on', meaning: 'they are', example: 'Ne on tosi mukavia.' },
          { kirjakieli: 'minä tiedän', puhekieli: 'mä tiiän', meaning: 'I know (d disappears)', example: 'En mä tiiä.' },
          { kirjakieli: 'minä lähden', puhekieli: 'mä lähen', meaning: 'I leave', example: 'Lähetäänks me?' }
        ]
      },
      {
        id: 'slang_words',
        title: 'Tärkeät arjen puhesanat (Everyday Words)',
        description: 'Crucial everyday vocabulary you hear constantly in Helsinki and Finnish cities.',
        items: [
          { kirjakieli: 'bussi', puhekieli: 'dösä (tai bussi)', meaning: 'bus', example: 'Dösä tulee kohta.' },
          { kirjakieli: 'rautatieasema', puhekieli: 'steissi', meaning: 'central railway station', example: 'Tavataan steissillä klo 18.' },
          { kirjakieli: 'koti', puhekieli: 'hima / kämppä', meaning: 'home / apartment', example: 'Mä lähen himaan.' },
          { kirjakieli: 'työ', puhekieli: 'duuni', meaning: 'work / job', example: 'Paljon duunia tänään.' },
          { kirjakieli: 'raha', puhekieli: 'fyrkka / massi', meaning: 'money', example: 'Ei oo yhtään fyrkkaa.' },
          { kirjakieli: 'matkapuhelin', puhekieli: 'luuri / kännykkä', meaning: 'mobile phone', example: 'Mun luuri soi.' }
        ]
      },
      {
        id: 'numbers',
        title: 'Numerot puhekielessä (Numbers in Speech)',
        description: 'Numbers are heavily shortened when paying at stores or saying prices.',
        items: [
          { kirjakieli: 'yksi, kaksi, viisi', puhekieli: 'yks, kaks, viis', meaning: '1, 2, 5', example: 'Otan kaks kahvia.' },
          { kirjakieli: 'yksitoista', puhekieli: 'ykskyt', meaning: '11', example: 'Kello on ykskyt.' },
          { kirjakieli: 'kaksikymmentä', puhekieli: 'kakskyt', meaning: '20', example: 'Tää maksaa kakskyt euroo.' },
          { kirjakieli: 'viisikymmentä', puhekieli: 'viiskyt', meaning: '50', example: 'Puol viiskyt.' },
          { kirjakieli: 'sata', puhekieli: 'sata', meaning: '100', example: 'Satasen seteli.' }
        ]
      }
    ],

    // Quick quiz / interactive drill
    drills: [
      {
        id: 'drill_1',
        puhekieli: 'Tuutsä huomenna meijän kaa steissille?',
        question: 'Mitä tämä tarkoittaa kirjakielellä?',
        options: [
          'Tuletko sinä huomenna meidän kanssamme rautatieasemalle?',
          'Menetkö sinä huomenna heidän luokseen kaupunkiin?',
          'Tiedätkö sinä missä rautatieasema on?',
          'Oletko sinä tänään vapaana?'
        ],
        correct: 0,
        explanation: 'Tuutsä = Tuletko sinä, meijän kaa = meidän kanssamme, steissille = rautatieasemalle.'
      },
      {
        id: 'drill_2',
        puhekieli: 'Mä en tiiä missä mun luuri on.',
        question: 'Mikä on lauseen kirjakielinen muoto?',
        options: [
          'Minä en muista missä autoni on.',
          'Minä en tiedä missä minun puhelimeni on.',
          'Sinä et kertonut missä työpaikka on.',
          'Minä etsin uutta asuntoa.'
        ],
        correct: 1,
        explanation: 'Mä = minä, en tiiä = en tiedä, mun = minun, luuri = puhelin.'
      },
      {
        id: 'drill_3',
        puhekieli: 'Paljo tää takki maksaa? – Se on viiskytviis euroo.',
        question: 'Paljonko takki maksaa numeroina?',
        options: ['15 €', '25 €', '50 €', '55 €'],
        correct: 3,
        explanation: 'Viiskytviis = viisikymmentäviisi = 55 euroa.'
      }
    ]
  },

  // Milestone Progression Exams (Tasokokeet uuteen tasoon nousua varten)
  milestoneExams: {
    'A1.1_to_A1.2': {
      title: 'A1.1 -> A1.2 Tasokoe: Perusviestintä',
      targetScore: 80,
      tasks: [
        {
          type: 'choice',
          skill: 'reading',
          prompt: 'Mitä kaupan kyltissä tarkoitetaan: ”Suljettu sunnuntaisin”?',
          options: ['Kauppa on auki joka päivä', 'Kauppa ei ole auki sunnuntaina', 'Kauppa aukeaa vain viikonloppuna', 'Kauppa myy alennustuotteita'],
          correct: 1
        },
        {
          type: 'choice',
          skill: 'listening',
          audioText: 'Yksi lippu Tampereelle opiskelija-alennuksella, kiitos.',
          prompt: 'Minne matkustaja on ostamassa lippua?',
          options: ['Helsinkiin', 'Tampereelle', 'Turkuun', 'Ouluun'],
          correct: 1
        },
        {
          type: 'choice',
          skill: 'puhekieli',
          prompt: 'Miten sanot puhekielellä: ”Minä olen kotona”?',
          options: ['Mä oon himassa', 'Minä istun autossa', 'Me ollaan kaupassa', 'Sä oot töissä'],
          correct: 0
        }
      ]
    },
    'A2.2_to_B1.1': {
      title: 'A2.2 -> B1.1 Kansalaisuustason (YKI) Pääsykoe',
      targetScore: 80,
      tasks: [
        {
          type: 'choice',
          skill: 'reading',
          prompt: 'Uutinen: ”Hallitus aikoo lisätä kielikoulutuksen määrää maahanmuuttajille työllistymisen edistämiseksi.” Mikä on koulutuksen päätavoite?',
          options: ['Lisätä valtion tuloja', 'Auttaa maahanmuuttajia saamaan töitä', 'Vähentää opiskelijamääriä', 'Korvata yliopisto-opinnot'],
          correct: 1
        },
        {
          type: 'choice',
          skill: 'listening',
          audioText: 'Jos sinulla tulee äkillisiä kysymyksiä hakuprosessista, voit ottaa yhteyttä asiakaspalveluumme sähköpostitse tai soittamalla numeroon arkisin klo 9–15.',
          prompt: 'Milloin asiakaspalveluun voi soittaa?',
          options: ['Viikonloppuisin mihin aikaan vain', 'Arkipäivisin klo 9–15', 'Vain sähköpostilla maanantaisin', 'Ympäri vuorokauden'],
          correct: 1
        },
        {
          type: 'choice',
          skill: 'puhekieli',
          prompt: 'Mitä tarkoittaa työpaikalla lause: ”Tuutko sä jeesaan mua tän raportin kaa?”',
          options: ['Teetkö sinä tämän raportin kokonaan yksin?', 'Tuletko auttamaan minua tämän raportin kanssa?', 'Missä sinun valmis raporttisi on?', 'Voimmeko peruuttaa raporttipalaverin?'],
          correct: 1
        }
      ]
    }
  },

  // Gamification Prizes & Badges
  badges: [
    { id: 'first_step', icon: '🌱', name: 'Ensiaskeleet (First Step)', desc: 'Suoritit ensimmäisen päivittäisen treenin.', unlocked: false },
    { id: 'streak_3', icon: '🔥', name: 'Kolmen päivän putki', desc: 'Opiskelit 3 päivää peräkkäin!', unlocked: false },
    { id: 'streak_7', icon: '⚡', name: 'Viikon soturi (7 Days)', desc: 'Kokonaan täysi 7 päivän harjoitusputki.', unlocked: false },
    { id: 'puhekieli_pro', icon: '🗣️', name: 'Stadin Puhetaitaja', desc: 'Opit ja testasit 5 puhekielistä ilmaisua.', unlocked: false },
    { id: 'pronunciation_star', icon: '🎙️', name: 'Ääntämismestari', desc: 'Puhuit suomea mikrofonilla arvosanalla 90%+.', unlocked: false },
    { id: 'b1_ready', icon: '🇫🇮', name: 'YKI & Kansalaisuus B1.1', desc: 'Saavutit virallisen B1.1-tason SuomiPolulla!', unlocked: false },
    { id: 'c_level_pioneer', icon: '👑', name: 'Kielimestari (C-taso)', desc: 'Etenit kohti korkeinta kielellistä mestaruutta.', unlocked: false }
  ]
};
