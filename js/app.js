// SuomiPolku - Core Application Controller

const App = {
  activeSkill: 'reading',
  currentTestIndex: 0,
  testAnswers: [],
  activePuheCategory: 'pronouns',

  init() {
    this.bindEvents();
    this.refreshUI();
    this.renderDailyWorkout();
    this.renderPuhekieliLab();
    this.renderBadges();
    this.renderLevelSelectorModal();
    this.renderProfileModal();
  },

  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetViewId = btn.getAttribute('data-target');
        this.switchView(targetViewId, btn);
      });
    });

    // Header buttons
    document.getElementById('headerLevelPill').addEventListener('click', () => {
      this.openModal('modalLevelSelect');
    });

    document.getElementById('btnOpenLevelModal').addEventListener('click', () => {
      this.openModal('modalLevelSelect');
    });

    document.getElementById('btnSwitchProfile').addEventListener('click', () => {
      this.openModal('modalProfileSwitch');
    });

    // Close Modals
    document.getElementById('btnCloseLevelModal').addEventListener('click', () => {
      this.closeModal('modalLevelSelect');
    });

    document.getElementById('btnCloseProfileModal').addEventListener('click', () => {
      this.closeModal('modalProfileSwitch');
    });

    // Daily Workout Tabs
    document.querySelectorAll('#viewWorkout .tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#viewWorkout .tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeSkill = tab.getAttribute('data-skill');
        this.renderDailyWorkout();
      });
    });

    // Puhekieli Category Tabs
    document.querySelectorAll('#puheCategoryTabs .tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#puheCategoryTabs .tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activePuheCategory = tab.getAttribute('data-cat');
        this.renderPuhekieliLab();
      });
    });

    // Diagnostic Placement Test Buttons
    document.getElementById('btnStartPlacementTest').addEventListener('click', () => {
      this.startPlacementTest();
    });

    document.getElementById('btnSkipPlacementTest').addEventListener('click', () => {
      this.openModal('modalLevelSelect');
    });

    // Milestone Exam Buttons
    document.getElementById('btnExamA1ToA2').addEventListener('click', () => {
      this.startMilestoneExam('A1.1_to_A1.2');
    });

    document.getElementById('btnExamA2ToB1').addEventListener('click', () => {
      this.startMilestoneExam('A2.2_to_B1.1');
    });

    // Settings Profile Name Save
    document.getElementById('btnSaveProfileName').addEventListener('click', () => {
      const name = document.getElementById('inputProfileName').value;
      if (name) {
        const state = StorageService.loadState();
        StorageService.renameProfile(state.activeProfileId, name);
        this.refreshUI();
        this.renderProfileModal();
        alert('Profiilin nimi päivitetty!');
      }
    });

    // Audio Tempo Settings
    document.getElementById('btnSpeechNormal').addEventListener('click', (e) => {
      SpeechService.rate = 0.95;
      document.getElementById('btnSpeechNormal').classList.add('active');
      document.getElementById('btnSpeechSlow').classList.remove('active');
    });

    document.getElementById('btnSpeechSlow').addEventListener('click', (e) => {
      SpeechService.rate = 0.72;
      document.getElementById('btnSpeechSlow').classList.add('active');
      document.getElementById('btnSpeechNormal').classList.remove('active');
    });

    // Test Voice Output
    document.getElementById('btnTestVoiceOutput').addEventListener('click', () => {
      SpeechService.speak('Tervetuloa oppimaan suomea! Puhutaan yhdessä.');
    });

    // Reset Data
    document.getElementById('btnResetCurrentData').addEventListener('click', () => {
      if (confirm('Haluatko varmasti nollata tämän profiilin tiedot?')) {
        StorageService.updateActiveProfile({
          streak: 1,
          exp: 0,
          skillScores: { reading: 50, writing: 50, listening: 50, speaking: 50 },
          completedDays: [],
          badges: ['first_step'],
          diagnosticTaken: false
        });
        this.refreshUI();
        this.renderDailyWorkout();
        this.renderBadges();
        alert('Tiedot nollattu.');
      }
    });
  },

  switchView(viewId, activeNavBtn) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.add('hidden'));
    const target = document.getElementById(viewId);
    if (target) target.classList.remove('hidden');

    if (activeNavBtn) {
      document.querySelectorAll('.bottom-nav .nav-item').forEach(b => b.classList.remove('active'));
      activeNavBtn.classList.add('active');
    }
  },

  refreshUI() {
    const profile = StorageService.getActiveProfile();
    
    // Header
    document.getElementById('streakCountText').textContent = profile.streak || 0;
    document.getElementById('prizesStreakCount').textContent = profile.streak || 0;
    document.getElementById('levelBadgeText').textContent = profile.level || 'A1.1';
    document.getElementById('workoutLevelTag').textContent = profile.level || 'A1.1';
    document.getElementById('activeProfileName').textContent = profile.name || 'Minä';
    document.getElementById('settingsLevelText').textContent = profile.level || 'A1.1';
    document.getElementById('inputProfileName').value = profile.name || '';

    // Skills Radar Bars
    const scores = profile.skillScores || { reading: 70, writing: 65, listening: 60, speaking: 55 };
    document.getElementById('scoreReading').textContent = `${scores.reading}%`;
    document.getElementById('barReading').style.width = `${scores.reading}%`;

    document.getElementById('scoreWriting').textContent = `${scores.writing}%`;
    document.getElementById('barWriting').style.width = `${scores.writing}%`;

    document.getElementById('scoreListening').textContent = `${scores.listening}%`;
    document.getElementById('barListening').style.width = `${scores.listening}%`;

    document.getElementById('scoreSpeaking').textContent = `${scores.speaking}%`;
    document.getElementById('barSpeaking').style.width = `${scores.speaking}%`;

    // Progress bar towards B1.1
    const levelMap = { 'A0': 10, 'A1.1': 25, 'A1.2': 40, 'A1.3': 55, 'A2.1': 70, 'A2.2': 85, 'B1.1': 100, 'B1.2': 100, 'B2.1': 100, 'C1': 100 };
    const pct = levelMap[profile.level] || 30;
    const b1Bar = document.getElementById('b1ProgressBar');
    if (b1Bar) b1Bar.style.width = `${pct}%`;
  },

  // -------------------------------------------------------------
  // VIEW 1: DAILY WORKOUT RENDERING
  // -------------------------------------------------------------
  renderDailyWorkout() {
    const profile = StorageService.getActiveProfile();
    const currentLvl = profile.level || 'A1.1';
    // Fallback to A1.1 or closest available workout
    const workoutData = SUOMI_DATA.dailyWorkouts[currentLvl] || SUOMI_DATA.dailyWorkouts['A1.1'];
    const container = document.getElementById('exerciseContainer');
    container.innerHTML = '';

    const skill = this.activeSkill;

    if (skill === 'reading') {
      const data = workoutData.reading;
      container.innerHTML = `
        <span class="tag-badge tag-reading">📖 Lukeminen (${currentLvl})</span>
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">${data.title}</h3>
        <div class="reading-passage">${data.text}</div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 8px;">${data.questions[0].q}</p>
        <div class="options-list" id="readingOptions">
          ${data.questions[0].options.map((opt, idx) => `
            <button class="option-btn" data-index="${idx}">
              <span>${opt}</span>
              <span class="opt-indicator">○</span>
            </button>
          `).join('')}
        </div>
        <div id="readingFeedback" class="feedback-box hidden"></div>
      `;

      container.querySelectorAll('#readingOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'));
          const isCorrect = idx === data.questions[0].correct;
          this.handleChoiceAnswer(btn, isCorrect, 'reading', 5, 'Loistavaa! Ymmärsit tekstin oikein.');
        });
      });

    } else if (skill === 'writing') {
      const data = workoutData.writing;
      container.innerHTML = `
        <span class="tag-badge tag-writing">✍️ Kirjoittaminen (${currentLvl})</span>
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">${data.title}</h3>
        <p class="instruction-text">${data.instructions}</p>
        
        <textarea id="writingInput" class="writing-textarea" placeholder="${data.placeholder}"></textarea>
        
        <div style="display: flex; gap: 8px;">
          <button class="btn-primary" id="btnSubmitWriting">
            <span>✨</span> Tarkista & Arvioi teksti
          </button>
        </div>
        <div id="writingFeedback" class="feedback-box hidden"></div>
      `;

      document.getElementById('btnSubmitWriting').addEventListener('click', () => {
        const text = document.getElementById('writingInput').value.trim();
        this.evaluateWriting(text, data);
      });

    } else if (skill === 'listening') {
      const data = workoutData.listening;
      container.innerHTML = `
        <span class="tag-badge tag-listening">🎧 Kuuntelu (${currentLvl})</span>
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">${data.title}</h3>
        <p class="instruction-text">Paina toistopainiketta kuunnellaksesi suomenkielisen puheen:</p>

        <div class="audio-action-row">
          <button class="btn-audio" id="btnPlayKirjakieli">
            <span>🔊</span> Kuuntele (Kirjakieli)
          </button>
          <button class="btn-audio btn-audio-slow" id="btnPlayKirjakieliSlow">
            <span>🐢</span> Kuuntele hitaasti
          </button>
          ${data.puhekieliAudio ? `
            <button class="btn-audio" id="btnPlayPuhekieli" style="background: #ede9fe; color: #5b21b6; border-color: #ddd6fe;">
              <span>🗣️</span> Kuuntele arjen puhekieli
            </button>
          ` : ''}
        </div>

        <p style="font-weight: 600; font-size: 0.95rem; margin-top: 14px; margin-bottom: 8px;">
          ${data.questions[0].q}
        </p>
        <div class="options-list" id="listeningOptions">
          ${data.questions[0].options.map((opt, idx) => `
            <button class="option-btn" data-index="${idx}">
              <span>${opt}</span>
              <span class="opt-indicator">○</span>
            </button>
          `).join('')}
        </div>
        <div id="listeningFeedback" class="feedback-box hidden"></div>
      `;

      document.getElementById('btnPlayKirjakieli').addEventListener('click', () => {
        SpeechService.speak(data.audioText, false);
      });
      document.getElementById('btnPlayKirjakieliSlow').addEventListener('click', () => {
        SpeechService.speak(data.audioText, true);
      });
      if (data.puhekieliAudio) {
        document.getElementById('btnPlayPuhekieli').addEventListener('click', () => {
          SpeechService.speak(data.puhekieliAudio, false);
        });
      }

      container.querySelectorAll('#listeningOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'));
          const isCorrect = idx === data.questions[0].correct;
          this.handleChoiceAnswer(btn, isCorrect, 'listening', 5, 'Oikein kuunneltu!');
        });
      });

    } else if (skill === 'speaking') {
      const data = workoutData.speaking;
      container.innerHTML = `
        <span class="tag-badge tag-speaking">🗣️ Puhuminen (${currentLvl})</span>
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">${data.title}</h3>
        
        <div class="reading-passage" style="border-left-color: #ec4899; background: #fff5f8;">
          <div style="font-size: 0.8rem; font-weight: 700; color: #9d174d; text-transform: uppercase;">Standardi Kirjakieli</div>
          <div style="font-size: 1.05rem; font-weight: 700; margin: 4px 0;" id="targetSpeakingPhrase">${data.phrase}</div>
          <div style="font-size: 0.85rem; color: #64748b; margin-top: 6px;">
            <strong>Puhekielellä:</strong> ”${data.puhekieli}”
          </div>
          <div style="font-size: 0.8rem; color: #0284c7; margin-top: 4px;">
            💡 <em>${data.phoneticTip}</em>
          </div>
        </div>

        <div class="audio-action-row" style="justify-content: center;">
          <button class="btn-audio" id="btnListenModelSpeech">
            <span>🔊</span> Kuuntele malliääni
          </button>
          <button class="btn-audio btn-audio-slow" id="btnListenModelSpeechSlow">
            <span>🐢</span> Malli hitaasti
          </button>
        </div>

        <div class="mic-box">
          <button class="mic-btn" id="btnStartRecording" title="Paina ja puhu suomeksi">
            🎙️
          </button>
          <div class="mic-status" id="micStatusText">Paina mikrofonia ja sano lause ääneen</div>
          <div id="speechResultTranscript" class="speech-transcript-box hidden"></div>
        </div>

        <div id="speakingFeedback" class="feedback-box hidden"></div>
      `;

      document.getElementById('btnListenModelSpeech').addEventListener('click', () => {
        SpeechService.speak(data.phrase, false);
      });
      document.getElementById('btnListenModelSpeechSlow').addEventListener('click', () => {
        SpeechService.speak(data.phrase, true);
      });

      const micBtn = document.getElementById('btnStartRecording');
      const micStatus = document.getElementById('micStatusText');
      const transcriptBox = document.getElementById('speechResultTranscript');
      const feedbackBox = document.getElementById('speakingFeedback');

      micBtn.addEventListener('click', () => {
        SpeechService.listen(
          (transcript) => {
            micBtn.classList.remove('recording');
            micStatus.textContent = 'Puhuttu!';
            transcriptBox.classList.remove('hidden');
            transcriptBox.innerHTML = `<strong>Sinä sanoit:</strong> ”${transcript}”`;

            const evalResult = SpeechService.evaluateSpeaking(transcript, data.phrase);
            this.updateSkillScore('speaking', evalResult.score >= 70 ? 5 : 2);
            StorageService.recordActivity();
            this.refreshUI();

            feedbackBox.className = `feedback-box ${evalResult.score >= 70 ? 'feedback-success' : 'feedback-warning'}`;
            feedbackBox.classList.remove('hidden');
            feedbackBox.innerHTML = `
              <div class="feedback-title">
                <span>${evalResult.score >= 70 ? '🎉' : '💡'}</span> 
                Ääntämisarvosana: ${evalResult.score} / 100%
              </div>
              <div>${evalResult.feedback}</div>
            `;
          },
          (err) => {
            micBtn.classList.remove('recording');
            micStatus.textContent = 'Mikrofoni keskeytyi. Kokeile uudelleen tai salli mikrofonin käyttö.';
          },
          () => {
            micBtn.classList.add('recording');
            micStatus.textContent = '🔴 Kuunnellaan... Puhu nyt suomeksi!';
            feedbackBox.classList.add('hidden');
          },
          () => {
            micBtn.classList.remove('recording');
          }
        );
      });
    }
  },

  handleChoiceAnswer(btn, isCorrect, skill, scoreDelta, successMsg) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.option-btn').forEach(b => {
      b.style.pointerEvents = 'none';
      b.classList.remove('selected');
    });

    const indicator = btn.querySelector('.opt-indicator');
    const feedbackBox = document.getElementById(`${skill}Feedback`);

    if (isCorrect) {
      btn.classList.add('correct');
      if (indicator) indicator.textContent = '✓';
      feedbackBox.className = 'feedback-box feedback-success';
      feedbackBox.classList.remove('hidden');
      feedbackBox.innerHTML = `
        <div class="feedback-title"><span>🎉</span> Oikein! (+XP)</div>
        <div>${successMsg}</div>
      `;
      this.updateSkillScore(skill, scoreDelta);
      StorageService.recordActivity();
      this.refreshUI();
    } else {
      btn.classList.add('incorrect');
      if (indicator) indicator.textContent = '✕';
      feedbackBox.className = 'feedback-box feedback-warning';
      feedbackBox.classList.remove('hidden');
      feedbackBox.innerHTML = `
        <div class="feedback-title"><span>💡</span> Ei aivan oikein</div>
        <div>Kokeile huomenna uudelleen ja kertaa sanastoa!</div>
      `;
      this.updateSkillScore(skill, -1);
      this.refreshUI();
    }
  },

  evaluateWriting(text, data) {
    const feedback = document.getElementById('writingFeedback');
    feedback.classList.remove('hidden');

    if (!text || text.length < 5) {
      feedback.className = 'feedback-box feedback-warning';
      feedback.innerHTML = '<div class="feedback-title">⚠️ Kirjoita vähintään muutama sana.</div>';
      return;
    }

    const words = text.toLowerCase().split(/\s+/);
    let matchedKeywords = 0;
    data.keywords.forEach(kw => {
      if (text.toLowerCase().includes(kw)) matchedKeywords++;
    });

    const isGood = words.length >= data.minWords && matchedKeywords >= 2;
    this.updateSkillScore('writing', isGood ? 5 : 2);
    StorageService.recordActivity();
    this.refreshUI();

    feedback.className = `feedback-box ${isGood ? 'feedback-success' : 'feedback-warning'}`;
    feedback.innerHTML = `
      <div class="feedback-title">
        <span>${isGood ? '🎉' : '💡'}</span> 
        ${isGood ? 'Hienosti kirjoitettu! Viesti on selkeä ja luonteva.' : 'Hyvä aloitus! Katso mallivastaukset parantaaksesi ilmaisua:'}
      </div>
      <div class="model-answers-comparison">
        <div style="font-weight: 700; margin-bottom: 4px; color: var(--primary);">Kirjakielinen mallivastaus:</div>
        <p style="margin-bottom: 8px;">”${data.modelKirjakieli}”</p>
        <div style="font-weight: 700; margin-bottom: 4px; color: #6366f1;">Puhekielinen vastine:</div>
        <p>”${data.modelPuhekieli}”</p>
      </div>
    `;
  },

  updateSkillScore(skill, delta) {
    const profile = StorageService.getActiveProfile();
    const scores = profile.skillScores || { reading: 70, writing: 65, listening: 60, speaking: 55 };
    scores[skill] = Math.max(20, Math.min(100, (scores[skill] || 60) + delta));
    StorageService.updateActiveProfile({ skillScores: scores });
  },

  // -------------------------------------------------------------
  // VIEW 2: PUHEKIELI LABORATORY
  // -------------------------------------------------------------
  renderPuhekieliLab() {
    const catData = SUOMI_DATA.puhekieliLab.categories.find(c => c.id === this.activePuheCategory);
    const list = document.getElementById('puhekieliList');
    if (!catData || !list) return;

    list.innerHTML = catData.items.map(item => `
      <div class="puhe-item-card">
        <div class="puhe-left">
          <div class="puhe-pk">${item.puhekieli}</div>
          <div class="puhe-kk">Kirjakieli: <strong>${item.kirjakieli}</strong> (${item.meaning})</div>
          <div style="font-size: 0.8rem; color: #475569; margin-top: 3px;"><em>”${item.example}”</em></div>
        </div>
        <div>
          <button class="btn-audio" onclick="SpeechService.speak('${item.puhekieli}')" title="Kuuntele ääntämys">
            🔊
          </button>
        </div>
      </div>
    `).join('');

    // Puhekieli Drill Question
    this.renderPuheDrill();
  },

  renderPuheDrill() {
    const drill = SUOMI_DATA.puhekieliLab.drills[0];
    const box = document.getElementById('puheDrillBox');
    if (!box || !drill) return;

    box.innerHTML = `
      <div style="background: #f1f5f9; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
        <span style="font-size: 0.8rem; font-weight: 700; color: #6366f1;">PUHELAUSE:</span>
        <div style="font-size: 1.1rem; font-weight: 700; margin: 4px 0;">”${drill.puhekieli}”</div>
        <button class="btn-audio" onclick="SpeechService.speak('${drill.puhekieli}')" style="margin-top: 4px;">
          🔊 Kuuntele lause
        </button>
      </div>

      <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 8px;">${drill.question}</p>
      <div class="options-list" id="puheDrillOptions">
        ${drill.options.map((opt, idx) => `
          <button class="option-btn" data-index="${idx}">
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div id="puheDrillFeedback" class="feedback-box hidden"></div>
    `;

    box.querySelectorAll('#puheDrillOptions .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        const isCorrect = idx === drill.correct;
        const feedback = document.getElementById('puheDrillFeedback');
        feedback.classList.remove('hidden');

        if (isCorrect) {
          btn.classList.add('correct');
          feedback.className = 'feedback-box feedback-success';
          feedback.innerHTML = `<div class="feedback-title"><span>🎉</span> Oikein!</div><div>${drill.explanation}</div>`;
          const profile = StorageService.getActiveProfile();
          StorageService.updateActiveProfile({ puhekieliLearnedCount: (profile.puhekieliLearnedCount || 0) + 1 });
          StorageService.checkBadges();
          this.refreshUI();
          this.renderBadges();
        } else {
          btn.classList.add('incorrect');
          feedback.className = 'feedback-box feedback-warning';
          feedback.innerHTML = `<div class="feedback-title"><span>💡</span> Väärin</div><div>${drill.explanation}</div>`;
        }
      });
    });
  },

  // -------------------------------------------------------------
  // VIEW 3: TASOKOE (DIAGNOSTIC TEST) RUNNER
  // -------------------------------------------------------------
  startPlacementTest() {
    this.currentTestIndex = 0;
    this.testAnswers = [];
    document.getElementById('placementTestRunner').classList.add('hidden');
    document.getElementById('diagnosticActiveArea').classList.remove('hidden');
    this.renderPlacementQuestion();
  },

  renderPlacementQuestion() {
    const area = document.getElementById('diagnosticActiveArea');
    const questions = SUOMI_DATA.placementTest;

    if (this.currentTestIndex >= questions.length) {
      this.finishPlacementTest();
      return;
    }

    const q = questions[this.currentTestIndex];
    area.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="tag-badge tag-${q.skill}">Kysymys ${this.currentTestIndex + 1} / ${questions.length}</span>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Tavoitetaso: ${q.level}</span>
      </div>

      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 8px;">${q.prompt}</h4>

      ${q.contextText ? `<div class="reading-passage">${q.contextText}</div>` : ''}

      ${q.audioText ? `
        <div class="audio-action-row">
          <button class="btn-audio" onclick="SpeechService.speak('${q.audioText}')">
            <span>🔊</span> Kuuntele ääni
          </button>
          <button class="btn-audio btn-audio-slow" onclick="SpeechService.speak('${q.audioText}', true)">
            <span>🐢</span> Hitaasti
          </button>
        </div>
      ` : ''}

      ${q.targetPhrase ? `
        <div class="reading-passage" style="border-left-color: #ec4899;">
          <strong>Lausu ääneen:</strong> ”${q.targetPhrase}”
          <button class="btn-audio" onclick="SpeechService.speak('${q.targetPhrase}')" style="margin-top: 8px;">
            <span>🔊</span> Kuuntele malli
          </button>
        </div>
      ` : ''}

      ${q.question ? `<p style="font-weight: 600; margin: 10px 0;">${q.question}</p>` : ''}

      ${q.options ? `
        <div class="options-list" id="testOptions">
          ${q.options.map((opt, idx) => `
            <button class="option-btn" data-index="${idx}">${opt}</button>
          `).join('')}
        </div>
      ` : ''}

      ${q.questionType === 'text' ? `
        <textarea id="diagWritingInput" class="writing-textarea" placeholder="${q.placeholder}"></textarea>
        <button class="btn-primary" id="btnDiagSubmitText" style="margin-bottom: 8px;">Lähetä vastaus</button>
      ` : ''}

      ${q.questionType === 'speech' ? `
        <div class="mic-box" style="margin: 12px 0;">
          <button class="mic-btn" id="btnDiagMic">🎙️</button>
          <div class="mic-status" id="diagMicStatus">Paina ja sano lause ääneen</div>
          <div id="diagTranscript" class="speech-transcript-box hidden"></div>
        </div>
        <button class="btn-primary" id="btnDiagSubmitSpeech" style="margin-bottom: 8px;">Jatka eteenpäin</button>
      ` : ''}

      <!-- Crucial User Feature: EN TIEDÄ (I DON'T KNOW) BUTTON -->
      <button class="btn-entieda" id="btnEnTieda">
        <span>❓</span> En tiedä vastausta (I don't know)
      </button>
    `;

    // Bind Option clicks
    area.querySelectorAll('#testOptions .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        const isCorrect = idx === q.correctIndex;
        this.recordTestAnswer(isCorrect, q.levelAward);
      });
    });

    // Bind Writing
    const btnText = document.getElementById('btnDiagSubmitText');
    if (btnText) {
      btnText.addEventListener('click', () => {
        const val = document.getElementById('diagWritingInput').value.trim();
        const isCorrect = val.length >= 10;
        this.recordTestAnswer(isCorrect, q.levelAward);
      });
    }

    // Bind Speech
    const btnDiagMic = document.getElementById('btnDiagMic');
    if (btnDiagMic) {
      btnDiagMic.addEventListener('click', () => {
        SpeechService.listen((transcript) => {
          document.getElementById('diagTranscript').classList.remove('hidden');
          document.getElementById('diagTranscript').textContent = transcript;
          const res = SpeechService.evaluateSpeaking(transcript, q.targetPhrase);
          this.recordTestAnswer(res.score >= 60, q.levelAward);
        });
      });
      document.getElementById('btnDiagSubmitSpeech').addEventListener('click', () => {
        this.recordTestAnswer(false, q.levelAward);
      });
    }

    // Bind "En tiedä"
    document.getElementById('btnEnTieda').addEventListener('click', () => {
      this.recordTestAnswer(false, null, true);
    });
  },

  recordTestAnswer(isCorrect, levelAward, skippedAsUnknown = false) {
    this.testAnswers.push({ isCorrect, levelAward, skippedAsUnknown });
    this.currentTestIndex++;
    this.renderPlacementQuestion();
  },

  finishPlacementTest() {
    const area = document.getElementById('diagnosticActiveArea');
    const correctCount = this.testAnswers.filter(a => a.isCorrect).length;
    
    // Determine assigned CEFR level
    let assignedLevel = 'A0';
    if (correctCount >= 5) assignedLevel = 'B1.1';
    else if (correctCount >= 4) assignedLevel = 'A2.2';
    else if (correctCount >= 3) assignedLevel = 'A2.1';
    else if (correctCount >= 2) assignedLevel = 'A1.2';
    else if (correctCount >= 1) assignedLevel = 'A1.1';

    StorageService.updateActiveProfile({
      level: assignedLevel,
      diagnosticTaken: true
    });
    this.refreshUI();
    this.renderDailyWorkout();

    area.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 3rem; margin-bottom: 8px;">🇫🇮</div>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary);">
          Tasokoe suoritettu!
        </h3>
        <p style="margin: 10px 0; color: var(--text-muted);">
          Oikeita vastauksia: <strong>${correctCount} / ${this.testAnswers.length}</strong>
        </p>

        <div style="background: #e0f2fe; padding: 16px; border-radius: 12px; margin: 16px 0;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #0369a1; text-transform: uppercase;">Määritetty aloitustasosi:</div>
          <div style="font-size: 2rem; font-weight: 900; color: var(--primary);">${assignedLevel}</div>
          <p style="font-size: 0.85rem; color: #0c4a6e; margin-top: 4px;">
            Päivittäiset harjoituksesi on nyt mukautettu tälle tasolle. Voit muuttaa tasoa milloin tahansa asetuksista!
          </p>
        </div>

        <button class="btn-primary" onclick="App.switchView('viewWorkout', document.querySelector('.bottom-nav .nav-item[data-target=viewWorkout]'))">
          🚀 Aloita Päivän Treeni
        </button>
      </div>
    `;
  },

  startMilestoneExam(examKey) {
    const exam = SUOMI_DATA.milestoneExams[examKey];
    if (!exam) return;
    alert(`Aloitetaan tasokoe: ${exam.title}. Vastaa kysymyksiin ja kerää vähintään ${exam.targetScore}% pisteistä noustaksesi tasolle!`);
  },

  // -------------------------------------------------------------
  // VIEW 4: BADGES & PRIZES
  // -------------------------------------------------------------
  renderBadges() {
    const profile = StorageService.getActiveProfile();
    const userBadges = new Set(profile.badges || []);
    const container = document.getElementById('badgesContainer');
    if (!container) return;

    container.innerHTML = SUOMI_DATA.badges.map(b => {
      const isUnlocked = userBadges.has(b.id);
      return `
        <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${b.desc}</div>
          ${isUnlocked ? '<span style="font-size: 0.7rem; font-weight: 700; color: #f59e0b;">✓ ANSAITTU</span>' : '<span style="font-size: 0.7rem; color: #94a3b8;">Lukittu</span>'}
        </div>
      `;
    }).join('');
  },

  // -------------------------------------------------------------
  // MODALS: LEVEL SELECTOR & PROFILE SWITCHER
  // -------------------------------------------------------------
  renderLevelSelectorModal() {
    const profile = StorageService.getActiveProfile();
    const container = document.getElementById('levelsListContainer');
    if (!container) return;

    container.innerHTML = SUOMI_DATA.levels.map(lvl => `
      <div class="level-select-item ${profile.level === lvl.id ? 'active' : ''}" data-level="${lvl.id}">
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">
            ${lvl.name} ${lvl.preview ? '<span style="font-size: 0.7rem; color: #8b5cf6;">(Tuleva)</span>' : ''}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${lvl.description}</div>
        </div>
        <span class="level-badge-tag">${lvl.id}</span>
      </div>
    `).join('');

    container.querySelectorAll('.level-select-item').forEach(item => {
      item.addEventListener('click', () => {
        const chosen = item.getAttribute('data-level');
        StorageService.updateActiveProfile({ level: chosen });
        this.closeModal('modalLevelSelect');
        this.refreshUI();
        this.renderDailyWorkout();
        this.renderLevelSelectorModal();
      });
    });
  },

  renderProfileModal() {
    const state = StorageService.loadState();
    const container = document.getElementById('profilesListContainer');
    if (!container) return;

    container.innerHTML = Object.values(state.profiles).map(p => `
      <div class="level-select-item ${state.activeProfileId === p.id ? 'active' : ''}" data-profile="${p.id}">
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">👤 ${p.name}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            Taso: <strong>${p.level}</strong> | Putki: 🔥 <strong>${p.streak || 0} pv</strong>
          </div>
        </div>
        ${state.activeProfileId === p.id ? '<span style="color: var(--primary); font-weight: 700;">Aktiivinen ✓</span>' : '<button class="profile-chip-btn" style="background: var(--primary);">Valitse</button>'}
      </div>
    `).join('');

    container.querySelectorAll('.level-select-item').forEach(item => {
      item.addEventListener('click', () => {
        const pid = item.getAttribute('data-profile');
        StorageService.switchProfile(pid);
        this.closeModal('modalProfileSwitch');
        this.refreshUI();
        this.renderDailyWorkout();
        this.renderBadges();
        this.renderProfileModal();
      });
    });
  },

  openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  },

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  }
};

window.addEventListener('DOMContentLoaded', () => App.init());
