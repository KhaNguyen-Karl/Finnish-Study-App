// LocalStorage State Manager with Multi-Profile Support (You + Girlfriend)

const StorageService = {
  STORAGE_KEY: 'suomipolku_app_state_v1',

  getDefaultState() {
    return {
      activeProfileId: 'profile_1',
      profiles: {
        'profile_1': {
          id: 'profile_1',
          name: 'Käyttäjä 1',
          level: 'A1.1',
          exp: 50,
          streak: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          skillScores: {
            reading: 75,
            writing: 70,
            listening: 65,
            speaking: 60
          },
          completedDays: [],
          badges: ['first_step'],
          diagnosticTaken: false,
          puhekieliLearnedCount: 0
        },
        'profile_2': {
          id: 'profile_2',
          name: 'Käyttäjä 2 (Girlfriend)',
          level: 'A0',
          exp: 0,
          streak: 0,
          lastActiveDate: null,
          skillScores: {
            reading: 50,
            writing: 50,
            listening: 50,
            speaking: 50
          },
          completedDays: [],
          badges: [],
          diagnosticTaken: false,
          puhekieliLearnedCount: 0
        }
      }
    };
  },

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...this.getDefaultState(), ...parsed };
      }
    } catch (e) {
      console.error('Failed to load local state:', e);
    }
    const defaultState = this.getDefaultState();
    this.saveState(defaultState);
    return defaultState;
  },

  saveState(state) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },

  getActiveProfile() {
    const state = this.loadState();
    return state.profiles[state.activeProfileId] || state.profiles['profile_1'];
  },

  updateActiveProfile(updates) {
    const state = this.loadState();
    const pid = state.activeProfileId;
    if (state.profiles[pid]) {
      state.profiles[pid] = { ...state.profiles[pid], ...updates };
      this.saveState(state);
    }
    return state.profiles[pid];
  },

  switchProfile(profileId) {
    const state = this.loadState();
    if (state.profiles[profileId]) {
      state.activeProfileId = profileId;
      this.saveState(state);
    }
    return this.getActiveProfile();
  },

  renameProfile(profileId, newName) {
    const state = this.loadState();
    if (state.profiles[profileId] && newName.trim()) {
      state.profiles[profileId].name = newName.trim();
      this.saveState(state);
    }
    return state;
  },

  // Record daily activity and calculate streak
  recordActivity() {
    const profile = this.getActiveProfile();
    const today = new Date().toISOString().split('T')[0];
    const last = profile.lastActiveDate;

    let newStreak = profile.streak;

    if (!last) {
      newStreak = 1;
    } else if (last === today) {
      // Already active today, maintain streak
    } else {
      const lastDate = new Date(last);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1;
      } else {
        newStreak = 1; // missed more than a day, reset streak
      }
    }

    const completedDays = Array.isArray(profile.completedDays) ? [...profile.completedDays] : [];
    if (!completedDays.includes(today)) {
      completedDays.push(today);
    }

    this.updateActiveProfile({
      streak: newStreak,
      lastActiveDate: today,
      completedDays: completedDays
    });

    this.checkBadges();
    return newStreak;
  },

  checkBadges() {
    const profile = this.getActiveProfile();
    const badges = new Set(profile.badges || []);

    if (profile.completedDays && profile.completedDays.length >= 1) {
      badges.add('first_step');
    }
    if (profile.streak >= 3) {
      badges.add('streak_3');
    }
    if (profile.streak >= 7) {
      badges.add('streak_7');
    }
    if (profile.puhekieliLearnedCount >= 5) {
      badges.add('puhekieli_pro');
    }
    if (profile.level === 'B1.1') {
      badges.add('b1_ready');
    }
    if (profile.level === 'C1' || profile.level === 'B2.1') {
      badges.add('c_level_pioneer');
    }

    this.updateActiveProfile({ badges: Array.from(badges) });
  }
};
