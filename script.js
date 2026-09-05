const questions = [
  { category: '亲密关系', text: '如果你的恋人一整天没有回复消息，你通常会：', options: ['等他回复', '主动询问', '做自己的事情', '有些不安'], scores: [[1, 0, 0], [2, 1, 0], [0, 0, 2], [3, 1, 0]] },
  { category: '亲密关系', text: '你认为恋爱关系中最重要的是什么？', options: ['信任', '陪伴', '沟通', '新鲜感'], scores: [[1, 0, 1], [3, 0, 0], [1, 0, 1], [0, 0, 2]] },
  { category: '相处方式', text: '如果周末有一天空闲时间，你更希望：', options: ['和恋人一起出去', '和朋友见面', '一个人休息', '临时决定'], scores: [[3, 0, 0], [0, 0, 2], [0, 0, 3], [1, 0, 1]] },
  { category: '生活习惯', text: '你平时最常使用哪个时间段上网？', options: ['早上', '下午', '晚上', '凌晨'], scores: [[0, 0, 0], [0, 0, 0], [1, 0, 0], [1, 1, 0]], interlude: '你平时也是这样回答别人的吗？' },
  { category: '沟通偏好', text: '如果有人想联系你，你通常会在哪里找到你？', options: ['手机', '社交软件', '邮箱', '其他'], scores: [[1, 0, 0], [1, 0, 0], [0, 0, 1], [0, 1, 2]] },
  { category: '个人空间', text: '你更习惯一个人待着，还是有人陪着？', options: ['有人陪着', '看当天心情', '大多数时候一个人', '我不喜欢被打扰'], scores: [[3, 0, 0], [1, 0, 1], [0, 0, 3], [0, 2, 4]], interlude: '原来你喜欢这样的。' },
  { category: '关系边界', text: '如果他问你现在在哪里，你会告诉他吗？', options: ['会', '看情况', '不会', '为什么要问？'], scores: [[4, 0, 0], [1, 0, 1], [0, 2, 3], [0, 3, 4]] },
  { category: '情绪处理', text: '如果他因为你没有及时回复而生气，你会怎么做？', options: ['解释', '道歉', '不理他', '这是他的情绪问题'], scores: [[2, 0, 0], [4, 0, 0], [0, 2, 3], [0, 3, 4]] },
  { category: '社交关系', text: '如果他不喜欢你的某个朋友，你会怎么处理？', options: ['保持自己的社交关系', '和他沟通', '减少与朋友联系', '完全听他的'], scores: [[0, 2, 4], [2, 0, 1], [3, 0, 0], [5, 0, 0]] },
  { category: '最后确认', text: '即使恋爱了，也应该保留自己的生活。', options: ['非常同意', '比较同意', '不太确定', '不太同意'], scores: [[0, 3, 5], [1, 1, 2], [2, 0, 1], [4, 0, 0]] },
];

const $ = (id) => document.getElementById(id);
const screens = ['intro-screen', 'quiz-screen', 'interlude-screen', 'confrontation-screen', 'result-screen'];
let state = JSON.parse(localStorage.getItem('morrow-game')) || { index: 0, answers: [], finished: false };
let pendingIndex = null;

function showScreen(id) { screens.forEach((screen) => $(screen).classList.toggle('hidden', screen !== id)); }
function resetEffects() { document.body.classList.remove('glitch', 'denied'); }
function scores() { return state.answers.reduce((total, answer) => { const value = questions[answer.question].scores[answer.option]; return total.map((score, index) => score + value[index]); }, [0, 0, 0]); }
function renderQuestion() {
  resetEffects(); showScreen('quiz-screen');
  const question = questions[state.index]; const [warmth, suspicion, independence] = scores();
  const progress = ((state.index + 1) / questions.length) * 100;
  $('question-count').textContent = `${String(state.index + 1).padStart(2, '0')} / ${questions.length}`;
  $('progress-label').textContent = `${Math.round(progress)}%`;
  $('progress-bar').style.width = `${progress}%`;
  $('question-category').textContent = question.category;
  $('question-number').textContent = `问题 ${String(state.index + 1).padStart(2, '0')}`;
  $('question-text').textContent = question.text;
  $('signal').textContent = state.index > 5 ? '● 正在重新连接' : '● 信号稳定';
  document.body.classList.toggle('uneasy', state.index >= 4);
  document.body.classList.toggle('dark', state.index >= 7 || suspicion >= 8);
  $('back-button').classList.toggle('hidden', state.index === 0);
  const answers = $('answers'); answers.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button'); button.className = 'answer'; button.type = 'button';
    button.innerHTML = `<span class="key">${String.fromCharCode(65 + index)}</span>${option}`;
    button.addEventListener('click', () => choose(index)); answers.append(button);
  });
  if (state.index >= 6 && independence > warmth) $('whisper').textContent = '答案将被记录。'; else $('whisper').textContent = '';
}
function choose(option) {
  const value = questions[state.index].scores[option];
  state.answers[state.index] = { question: state.index, option };
  localStorage.setItem('morrow-game', JSON.stringify(state));
  const independent = value[2] >= 3 || value[1] >= 2;
  if (state.index >= 6 && independent) return deniedResponse();
  pendingIndex = state.index + 1;
  if (questions[state.index].interlude) return interlude(questions[state.index].interlude);
  advance();
}
function deniedResponse() {
  document.body.classList.add('denied', 'glitch'); $('whisper').textContent = 'ERROR 403 · 答案无法识别。';
  setTimeout(() => { document.body.classList.remove('glitch'); pendingIndex = state.index + 1; state.index === 7 ? confrontation() : advance(); }, 1050);
}
function interlude(message) {
  showScreen('interlude-screen'); $('system-text').textContent = '正在计算匹配程度……'; $('glitch-message').textContent = '';
  $('interlude-button').classList.add('hidden');
  setTimeout(() => { $('glitch-message').textContent = message; $('glitch-message').style.opacity = '1'; document.body.classList.add('glitch'); }, 1300);
  setTimeout(() => { document.body.classList.remove('glitch'); $('glitch-message').style.opacity = '0'; $('interlude-button').classList.remove('hidden'); }, 2200);
}
function advance() { state.index = pendingIndex; localStorage.setItem('morrow-game', JSON.stringify(state)); state.index >= questions.length ? results() : renderQuestion(); }
function confrontation() { showScreen('confrontation-screen'); $('confrontation-text').textContent = '你刚才为什么选择那个？'; $('confrontation-subtext').textContent = '正在重新评估。'; }
function results() {
  state.finished = true; localStorage.setItem('morrow-game', JSON.stringify(state)); showScreen('result-screen');
  $('result-title').textContent = '正在生成你的结果……'; $('report').classList.add('hidden'); $('ending').classList.add('hidden'); $('restart-button').classList.add('hidden');
  setTimeout(() => { $('result-title').textContent = '匹配完成。'; $('report').classList.remove('hidden'); const [warmth, suspicion, independence] = scores();
    $('dependency-score').textContent = `${Math.min(97, 46 + warmth * 4)}%`; $('closeness-score').textContent = `${Math.min(96, 51 + warmth * 3)}%`; $('independence-score').textContent = `${Math.min(95, 10 + independence * 5)}%`;
    $('dependency-bar').style.width = `${Math.min(97, 46 + warmth * 4)}%`; $('closeness-bar').style.width = `${Math.min(96, 51 + warmth * 3)}%`; $('independence-bar').style.width = `${Math.min(95, 10 + independence * 5)}%`;
    setTimeout(() => finish(warmth, suspicion, independence), 1900);
  }, 1600);
}
function finish(warmth, suspicion, independence) {
  const ending = $('ending'); $('control-score').textContent = '无法计算。';
  let content;
  if (independence >= 18 && suspicion >= 8) content = ['Ending 04 · 他正在看', '你已经回答了这么多问题。<br>现在换我问你一个。', true];
  else if (independence >= 16) content = ['Ending 02 · 不合格', '因为你没有按照预期回答。<br>系统无法为你生成合适的关系。', false];
  else if (suspicion >= 6) content = ['Ending 03 · 你发现了', '这从来都不是恋爱测试。<br>你是在测试他能从你的回答里得到多少。', false];
  else content = ['Ending 01 · 理想的回答', '报告显示：你很适合被好好照顾。<br><br>别担心，<em>他会一直陪着你。</em>', false];
  ending.innerHTML = `<h3>${content[0]}</h3><p>${content[1]}</p>`; ending.classList.remove('hidden');
  if (content[2]) { ending.innerHTML += '<div class="terminal">INPUT REQUIRED_</div><input id="final-input" aria-label="回答他的问题" autocomplete="off" placeholder="输入你的回答" /> <button class="quiet-button" id="final-button" type="button">回答</button>'; $('final-button')?.addEventListener('click', blackout); }
  else $('restart-button').classList.remove('hidden');
}
function blackout() { const input = $('final-input'); if (!input?.value.trim()) { input?.focus(); return; } $('ending').innerHTML = '<h3>我知道。</h3><p class="terminal">CONNECTION CLOSED</p>'; setTimeout(() => document.body.classList.add('blackout'), 1400); }
$('start-button').addEventListener('click', () => { if (state.finished) state = { index: 0, answers: [], finished: false }; renderQuestion(); });
$('interlude-button').addEventListener('click', advance);
$('confrontation-button').addEventListener('click', () => { const text = $('confrontation-text'); if (text.textContent === '你刚才为什么选择那个？') { text.textContent = '我不喜欢这个答案。'; $('confrontation-subtext').textContent = '重新选择。'; $('confrontation-button').innerHTML = '继续 <span>→</span>'; } else advance(); });
$('back-button').addEventListener('click', () => { if (state.index > 0) { state.index -= 1; state.answers.length = state.index; localStorage.setItem('morrow-game', JSON.stringify(state)); renderQuestion(); } });
$('restart-button').addEventListener('click', () => { state = { index: 0, answers: [], finished: false }; localStorage.removeItem('morrow-game'); document.body.className = ''; renderQuestion(); });
$('home-button').addEventListener('click', () => { if (confirm('要离开本次测试吗？')) { showScreen('intro-screen'); document.body.className = ''; } });
if (state.finished) results();
