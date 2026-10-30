// Speech Synthesis (Audio Playback) & Speech Recognition (Speaking Practice)

const SpeechService = {
  synth: window.speechSynthesis,
  finnishVoice: null,
  recognition: null,
  isListening: false,
  rate: 0.9, // Slightly relaxed tempo for language learners

  init() {
    this.updateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.updateVoices();
    }
    this.initRecognition();
  },

  updateVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize Finnish voices
    this.finnishVoice = voices.find(v => v.lang.startsWith('fi')) ||
                        voices.find(v => v.name.toLowerCase().includes('finnish')) ||
                        null;
  },

  speak(text, slow = false) {
    if (!this.synth) {
      alert("Selaimesi ei tue äänen toistoa (SpeechSynthesis).");
      return;
    }
    // Cancel any current utterance
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fi-FI';
    utterance.rate = slow ? 0.7 : this.rate;
    utterance.pitch = 1.0;

    if (this.finnishVoice) {
      utterance.voice = this.finnishVoice;
    }

    this.synth.speak(utterance);
  },

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'fi-FI';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
  },

  listen(onResult, onError, onStart, onEnd) {
    if (!this.recognition) {
      onError && onError("Speech recognition is not supported on this browser. Try Chrome on Android / Samsung or Safari on iPhone.");
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      return;
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      onStart && onStart();
    };

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      onResult && onResult(transcript, confidence);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      console.error("Speech recognition error:", event.error);
      onError && onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd && onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.error(e);
      this.isListening = false;
      onError && onError("Mic access error");
    }
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  },

  // Compute text similarity for speaking grading (0 to 100%)
  evaluateSpeaking(spokenText, targetPhrase) {
    if (!spokenText) return { score: 0, feedback: 'Ei puhetta tunnistettu (No speech detected).' };

    const clean = (s) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim();
    const spoken = clean(spokenText);
    const target = clean(targetPhrase);

    if (spoken === target) {
      return { score: 100, feedback: 'Täydellinen ääntäminen! (Perfect pronunciation!)' };
    }

    const spokenWords = spoken.split(/\s+/);
    const targetWords = target.split(/\s+/);

    let matchCount = 0;
    targetWords.forEach(w => {
      if (spokenWords.includes(w)) matchCount++;
    });

    const wordAccuracy = Math.round((matchCount / Math.max(targetWords.length, 1)) * 100);
    // Levenshtein distance check for overall phonetics
    const levScore = this.levenshteinSimilarity(spoken, target);
    const finalScore = Math.min(100, Math.round((wordAccuracy * 0.6) + (levScore * 0.4)));

    let feedback = 'Hyvää harjoitusta! Jatka puhumista.';
    if (finalScore >= 85) feedback = 'Loistava suoritus! Ymmärrettävä ja sujuva.';
    else if (finalScore >= 60) feedback = 'Hyvä yritys! Kuuntele vielä malli ja toista ääneen.';
    else feedback = 'Kuuntele esimerkkilause ja yritä lausua selkeästi uudestaan.';

    return {
      score: finalScore,
      feedback: feedback,
      spoken: spokenText
    };
  },

  levenshteinSimilarity(s1, s2) {
    const len1 = s1.length;
    const len2 = s2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[len1][len2];
    const maxLen = Math.max(len1, len2);
    if (maxLen === 0) return 100;
    return Math.round((1 - distance / maxLen) * 100);
  }
};

window.addEventListener('DOMContentLoaded', () => SpeechService.init());
