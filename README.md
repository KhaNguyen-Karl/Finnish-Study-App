# SuomiPolku - Finnish B1.1 Mastery App (PWA) 🇫🇮

A complete, cross-platform Finnish language learning progressive web app designed for foreigners living in Finland aiming for **CEFR level B1.1** (the official Finnish citizenship / YKI *keskitaso* requirement) and expanding towards C-level fluency.

Optimized to run directly on your **Samsung phone** (Android) and your girlfriend's **iPhone 15** (iOS) as well as desktop browsers.

---

## 🌟 Key Features

### 1. 4-Skill Diagnostic Level Test (*Alkutason Tasokoe*)
- Tests **Reading (*Lukeminen*)**, **Writing (*Kirjoittaminen*)**, **Listening (*Kuuntelu*)**, and **Speaking (*Puhuminen*)**.
- **"En tiedä" (I don't know)** button on every question to avoid lucky guesses skewing your baseline level.
- **Skip Test**: Option to skip the test and manually pick your starting level (from A0 up to B1.1+).
- **Changeable Level**: You can adjust your level at any time in the settings or top header.

### 2. Dual Language Mastery: *Kirjakieli* & *Puhekieli*
- Foreigners in Finland often learn formal Finnish (*kirjakieli*) in courses but struggle with everyday spoken language (*puhekieli*) on the street and at work.
- **Dedicated Puhekieli Laboratory**:
  - Pronoun contractions (*minä/mä*, *hän/se*, *he/ne*).
  - Spoken verbs (*me mennään*, *tuun*, *meen*, *oon*).
  - Everyday vocabulary (*dösä*, *steissi*, *hima*, *duuni*, *luuri*).
  - Shortened numbers (*ykskyt*, *kakskytviis*).
  - Interactive listen-and-repeat drills with native Finnish pronunciation.

### 3. Daily 4-Skill Workouts (*Päivän Treeni*)
- **Lukeminen (Reading)**: Practical texts (housing company announcements, work emails, news) with comprehension quizzes.
- **Kirjoittaminen (Writing)**: Prompt-based writing tasks with instant automated grading, keyword analysis, and model answers provided in **both Kirjakieli and Puhekieli**.
- **Kuuntelu (Listening)**: Audio synthesis with normal and slow speeds, comparing standard and spoken dialects.
- **Puhuminen (Speaking)**: Interactive microphone recording powered by the Web Speech API with pronunciation grading (0–100%) and phonetics tips.

### 4. Streak Counter & Badges (*Palkinnot & Putki*)
- **🔥 Streak Counter**: Tracks your daily consecutive practice streak.
- **Palkinnot**: Unlockable achievement badges (e.g., *Ensiaskeleet*, *3 päivän putki*, *Puhekielen Mestari*, *YKI & Kansalaisuus B1.1*).
- **Progress Bar**: Visual tracker showing your distance to the B1.1 Finnish citizenship threshold.

### 5. Multi-User Profiles (You + Girlfriend)
- Tap **"Vaihda profiilia"** in the top bar to switch between your profile and your girlfriend's profile.
- Each profile keeps its own separate streak, assigned level, badges, and skill scores.

---

## 📱 How to Run on Your Samsung Phone & iPhone 15

### Method A: Instant Local Wi-Fi (No Hosting Needed)

1. Make sure your Mac, Samsung phone, and iPhone 15 are connected to the **same Wi-Fi network**.
2. Open Terminal on your Mac in this folder and run:
   ```bash
   python3 server.py
   ```
3. The terminal will print your local Wi-Fi IP address (for example: `http://192.168.100.188:8000`).
4. **On your Samsung Phone**:
   - Open **Chrome** or **Samsung Internet**.
   - Navigate to `http://192.168.100.188:8000`.
   - Tap **⋮ (Menu)** $\rightarrow$ tap **"Install app"** or **"Add to Home screen"**.
   - The app icon will appear on your home screen and open in full-screen mode like a native app!
5. **On your Girlfriend's iPhone 15**:
   - Open **Safari**.
   - Navigate to `http://192.168.100.188:8000`.
   - Tap the **Share button** (square with an arrow pointing up).
   - Scroll down and tap **"Add to Home Screen"** (*Lisää Koti-valikkoon*).
   - An icon will appear on her home screen that launches full-screen!

---

### Method B: Free Cloud Hosting (Access Anywhere on 4G/5G)

Since this app is built with pure modern web technologies (HTML5, CSS3, ES6 JavaScript, Web Speech API), it requires **zero backend build steps**. You can host it for free forever on:

#### 1. GitHub Pages (1-Click, Free)
1. Push this folder to a GitHub repository.
2. In the repository settings, go to **Settings** $\rightarrow$ **Pages**.
3. Under **Branch**, select `main` (root) and click **Save**.
4. GitHub provides a public HTTPS URL (e.g., `https://yourusername.github.io/finnish-app/`) which both of you can use anywhere without keeping your Mac turned on!

#### 2. Vercel or Netlify (Drag & Drop, Free)
- Simply drag and drop this project folder into [Vercel](https://vercel.com) or [Netlify Drop](https://app.netlify.com/drop) to get an instant public web link.

---

## 🛠️ Project Structure

```
Finnish Study App/
├── index.html            # Main mobile & desktop responsive app
├── manifest.json         # PWA configuration for Android & iOS
├── sw.js                 # Service worker for offline caching
├── server.py             # Python server with auto-IP detection
├── css/
│   └── styles.css        # Nordic mobile-first design & UI styling
├── js/
│   ├── data.js           # CEFR curriculum (A0-B1.1-C), tests & puhekieli rules
│   ├── speech.js         # Finnish speech synthesis & microphone recognition
│   ├── storage.js        # Multi-profile & daily streak manager
│   └── app.js            # Interactive app logic & view controller
└── icons/
    ├── icon-192.png      # App icon (192x192)
    ├── icon-512.png      # App icon (512x512)
    └── icon.svg          # High-resolution vector icon
```

*Onnea suomen kielen opiskeluun! (Good luck with your Finnish studies!)* 🇫🇮
