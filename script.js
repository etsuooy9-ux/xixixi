const questions = [
  ['亲密关系', '如果恋人突然说“今天有点累”，你会：', ['让他早点休息', '问问发生了什么', '陪他聊一会儿', '等他主动告诉你'], [[2,0,0],[2,0,0],[4,0,0],[1,0,1]]],
  ['亲密关系', '你觉得恋爱中最舒服的相处方式是？', ['经常见面', '每天聊天', '各自忙自己的事情，有空再联系', '没有固定模式'], [[3,0,0],[3,0,0],[0,1,4],[1,0,2]]],
  ['相处方式', '如果恋人和朋友约出去玩，你会：', ['祝他玩得开心', '问问去哪里', '偶尔问一下情况', '希望他早点回来'], [[1,0,2],[2,0,0],[2,0,0],[4,0,0]]],
  ['偏好', '你更喜欢收到哪一种礼物？', ['精心准备的小礼物', '鲜花', '实用的东西', '手写信'], [[2,0,0],[1,0,0],[0,0,1],[2,0,0]]],
  ['联络习惯', '如果恋人一天没有主动联系你，你会：', ['主动问问他', '等他联系', '有点失落，但不会说', '完全不在意'], [[3,0,0],[1,0,1],[2,0,0],[0,1,3]]],
  ['个人空间', '你认为恋爱以后，还需要保留自己的私人空间吗？', ['当然需要', '看情况', '不太需要', '恋人之间应该没有秘密'], [[0,3,5],[1,1,2],[3,0,0],[5,0,0]]],
  ['关系边界', '如果恋人想知道你现在在哪里，你会：', ['直接告诉他', '问他为什么想知道', '看当时的情况', '不想告诉他'], [[4,0,0],[0,2,3],[1,0,1],[0,3,4]]],
  ['分享习惯', '你会把自己的日常生活告诉恋人吗？', ['基本都会', '有开心的事情才会', '偶尔分享', '不太喜欢分享'], [[4,0,0],[2,0,0],[1,0,1],[0,2,3]]],
  ['社交关系', '如果恋人不喜欢你的某个朋友，你会：', ['和恋人聊聊原因', '继续和朋友正常相处', '尽量减少他们见面的机会', '为了恋人不再联系那个朋友'], [[2,0,1],[0,2,4],[3,0,0],[5,0,0]]],
  ['生活习惯', '你通常几点睡觉？', ['22:00以前', '22:00～00:00', '00:00～02:00', '02:00以后'], [[0,0,0],[1,0,0],[1,0,0],[1,1,0]]],
  ['独处时间', '你平时一个人的时间多吗？', ['很多', '比较多', '比较少', '几乎没有'], [[0,1,4],[0,0,2],[2,0,0],[4,0,0]]],
  ['情绪习惯', '当你心情不好的时候，你通常会找谁？', ['恋人', '朋友', '家人', '谁都不找'], [[4,0,0],[0,0,2],[1,0,1],[0,1,3]]],
  ['分享习惯', '如果发生了一件很开心的事情，你第一时间会告诉谁？', ['恋人', '最好的朋友', '家人', '不会告诉别人'], [[4,0,0],[0,0,2],[1,0,1],[0,1,3]]],
  ['出行习惯', '你习惯一个人出门吗？', ['经常', '偶尔', '很少', '几乎不会'], [[0,1,4],[0,0,2],[2,0,0],[4,0,0]]],
  ['联络习惯', '如果一天没有任何人联系你，你会觉得：', ['很清静', '有点奇怪', '有点寂寞', '很不舒服'], [[0,1,3],[1,0,1],[2,0,0],[4,0,0]]],
  ['关系边界', '如果你的恋人要求你不要和某个人联系，你会：', ['拒绝', '问清楚原因', '暂时答应', '按他说的做'], [[0,3,5],[1,1,2],[3,0,0],[5,0,0]]],
  ['情绪处理', '如果恋人因为你没有及时回复而生气，你会：', ['和他解释', '道歉', '等他冷静', '认为这是他的情绪问题'], [[2,0,0],[4,0,0],[1,0,1],[0,3,4]]],
  ['行程', '如果恋人希望你每天告诉他自己的行程，你觉得：', ['可以接受', '偶尔可以', '有点过分', '不能接受'], [[4,0,0],[2,0,0],[0,2,3],[0,3,5]]],
  ['感受', '如果恋人说“我只是太在乎你了”，你会：', ['觉得很感动', '理解他的想法', '有一点压力', '觉得这不是理由'], [[4,0,0],[2,0,0],[0,2,3],[0,3,5]]],
  ['当前位置', '你现在在哪里？', ['在家', '在学校/工作地点', '在外面', '其他地方'], [[1,0,0],[1,0,0],[1,0,0],[1,1,0]]],
  ['确认', '你现在是一个人吗？', ['是', '不是', '不想回答'], [[1,0,0],[1,0,0],[0,4,3]]],
  ['确认', '你现在身边有谁？', ['家人', '朋友', '恋人', '没有人', '不想回答'], [[1,0,0],[0,0,1],[3,0,0],[1,0,0],[0,4,3]]],
  ['最后确认', '如果有一个人非常喜欢你，喜欢到不希望你离开他，你觉得这是：', ['很浪漫', '可以理解', '有一点压力', '很可怕'], [[5,0,0],[3,0,0],[0,2,3],[0,4,5]]],
].map(([category, text, options, scores]) => ({ category, text, options, scores }));

const $ = (id) => document.getElementById(id);
const screens = ['intro-screen', 'quiz-screen', 'interlude-screen', 'confrontation-screen', 'result-screen'];
const STORAGE_KEY = 'morrow-game';
const initialState = () => ({ index: 0, answers: [], finished: false });
// A refresh always begins at the title screen. Clear any legacy/test state so a
// completed run can never bypass the player's explicit "开始测试" action.
localStorage.removeItem(STORAGE_KEY);
let state = initialState();
let pendingIndex = null;
let questionTimer = null;
let permissionTimer = null;
let permissionShown = false;
const floatingLines = ['宝宝你真可爱。', '宝宝你在看我，对不对？', '别想太久。', '我知道你在哪。', '继续回答。'];

function showScreen(id) { screens.forEach((screen) => $(screen).classList.toggle('hidden', screen !== id)); }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function scores() { return state.answers.reduce((total, answer) => { const value = questions[answer.question]?.scores[answer.option] || [0, 0, 0]; return total.map((score, index) => score + value[index]); }, [0, 0, 0]); }
function renderQuestion() {
  document.body.classList.remove('glitch', 'denied', 'time-warning'); showScreen('quiz-screen'); clearTimeout(questionTimer);
  const question = questions[state.index]; const [warmth, suspicion] = scores(); const progress = ((state.index + 1) / questions.length) * 100;
  $('question-count').textContent = `${String(state.index + 1).padStart(2, '0')} / ${questions.length}`; $('progress-label').textContent = `${Math.round(progress)}%`; $('progress-bar').style.width = `${progress}%`;
  $('question-category').textContent = question.category; $('question-number').textContent = `问题 ${String(state.index + 1).padStart(2, '0')}`; $('question-text').textContent = question.text;
  $('signal').textContent = state.index >= 19 ? '● 定位已同步' : state.index > 13 ? '● 正在重新连接' : '● 信号稳定';
  document.body.classList.toggle('uneasy', state.index >= 9); document.body.classList.toggle('dark', state.index >= 15 || suspicion >= 11); $('back-button').classList.toggle('hidden', state.index === 0);
  const answers = $('answers'); answers.innerHTML = '';
  question.options.forEach((option, index) => { const button = document.createElement('button'); button.className = 'answer'; button.type = 'button'; button.innerHTML = `<span class="key">${String.fromCharCode(65 + index)}</span>${option}`; button.addEventListener('click', () => choose(index)); answers.append(button); });
  $('whisper').textContent = state.index >= 19 && warmth < 10 ? '请如实回答。' : '';
  if (state.index >= 8) scheduleFloatingMessage();
  if (state.index >= 11 && !permissionShown) { clearTimeout(permissionTimer); permissionTimer = setTimeout(showPermissionSimulation, 5200); }
  const questionAtStart = state.index;
  questionTimer = setTimeout(() => { if (state.index === questionAtStart && !$('quiz-screen').classList.contains('hidden')) timeWarning(); }, 30000);
}
function scheduleFloatingMessage() { const delay = 1800 + Math.random() * 3600; setTimeout(() => { if (!$('quiz-screen').classList.contains('hidden')) { showFloatingMessage(floatingLines[Math.floor(Math.random() * floatingLines.length)]); } }, delay); }
function showFloatingMessage(text) { const message = document.createElement('p'); message.className = 'floating-message'; message.textContent = text; message.style.left = `${8 + Math.random() * 63}%`; message.style.top = `${16 + Math.random() * 60}%`; $('floating-messages').append(message); setTimeout(() => message.remove(), 5400); }
function timeWarning() { document.body.classList.add('time-warning', 'glitch'); showFloatingMessage('这个问题很难回答吗？'); $('whisper').textContent = '系统仍在等待你的回答。'; setTimeout(() => document.body.classList.remove('glitch', 'time-warning'), 2200); }
function showPermissionSimulation() { if (permissionShown || $('quiz-screen').classList.contains('hidden')) return; permissionShown = true; $('permission-overlay').classList.remove('hidden'); }
function resolvePermissionSimulation(forced) { const overlay = $('permission-overlay'); const copy = $('permission-copy'); copy.textContent = forced ? '模拟预览已连接。你可以继续测试。' : '已完成模拟授权。你可以继续测试。'; $('permission-title').textContent = forced ? '模拟摄像头已开启' : '模拟权限已确认'; $('header-status').textContent = '关系档案 · 正在观察'; document.body.classList.add('glitch'); setTimeout(() => { overlay.classList.add('hidden'); document.body.classList.remove('glitch'); }, 1500); }
function choose(option) {
  clearTimeout(questionTimer); const q = state.index; const value = questions[q].scores[option]; state.answers[q] = { question: q, option }; save(); pendingIndex = q + 1;
  if ((q === 20 || q === 21) && option === questions[q].options.length - 1) return rejection(q === 20 ? 'ERROR: RESPONSE REJECTED · 为什么不告诉我？' : '你刚才不是还愿意回答吗？');
  if (q === 14) return interlude('正在记录……', '抱歉，系统出现了一点小问题。');
  if (q === 18 && (option === 2 || option === 3)) return interlude('正在分析……', '……\n这个答案不太好。');
  if (q === 19) return interlude('正在分析……', '嗯。');
  if (q === 22) return finalInterlude();
  if (q >= 15 && (value[1] >= 2 || value[2] >= 4)) return rejection('ERROR 403 · 答案无法识别。');
  advance();
}
function rejection(message) { document.body.classList.add('denied', 'glitch'); $('whisper').textContent = message; setTimeout(() => { document.body.classList.remove('glitch'); if (state.index === 17) confrontation(); else advance(); }, 1150); }
function interlude(first, second) { showScreen('interlude-screen'); $('system-text').textContent = first; $('glitch-message').textContent = ''; $('interlude-button').classList.add('hidden'); setTimeout(() => { $('glitch-message').textContent = second; $('glitch-message').style.whiteSpace = 'pre-line'; $('glitch-message').style.opacity = '1'; document.body.classList.add('glitch'); }, 1200); setTimeout(() => { document.body.classList.remove('glitch'); $('interlude-button').classList.remove('hidden'); }, 2400); }
function finalInterlude() { showScreen('interlude-screen'); $('system-text').textContent = '感谢你的回答。'; $('glitch-message').textContent = ''; $('interlude-button').classList.add('hidden'); setTimeout(() => { $('system-text').textContent = '答案已记录。\n正在生成测试结果……'; }, 1300); setTimeout(() => { $('glitch-message').textContent = '……\n可是，你为什么会觉得害怕？'; $('glitch-message').style.whiteSpace = 'pre-line'; $('glitch-message').style.opacity = '1'; document.body.classList.add('glitch'); }, 2800); setTimeout(() => { document.body.classList.remove('glitch'); results(); }, 4400); }
function advance() { state.index = pendingIndex; save(); state.index >= questions.length ? results() : renderQuestion(); }
function confrontation() { showScreen('confrontation-screen'); $('confrontation-text').textContent = '你刚才为什么选择那个？'; $('confrontation-subtext').textContent = '正在重新评估。'; }
function results() { state.finished = true; save(); showScreen('result-screen'); $('result-title').textContent = '正在生成你的结果……'; $('report').classList.add('hidden'); $('ending').classList.add('hidden'); $('restart-button').classList.add('hidden'); setTimeout(() => { $('result-title').textContent = '匹配完成。'; $('report').classList.remove('hidden'); const [warmth, suspicion, independence] = scores(); const values = [Math.min(97, 35 + warmth * 4), Math.min(96, 46 + warmth * 3), Math.min(95, 8 + independence * 4)]; ['dependency', 'closeness', 'independence'].forEach((name, index) => { $(`${name}-score`).textContent = `${values[index]}%`; $(`${name}-bar`).style.width = `${values[index]}%`; }); setTimeout(() => finish(warmth, suspicion, independence), 1600); }, 1200); }
function finish(warmth, suspicion, independence) { const ending = $('ending'); $('control-score').textContent = '无法计算。'; let content; if (independence >= 29 && suspicion >= 14) content = ['Ending 04 · 他正在看', '你已经回答了这么多问题。<br>现在换我问你一个。', true]; else if (independence >= 24) content = ['Ending 02 · 不合格', '因为你没有按照预期回答。<br>系统无法为你生成合适的关系。', false]; else if (suspicion >= 11) content = ['Ending 03 · 你发现了', '这从来都不是恋爱测试。<br>你是在测试他能从你的回答里得到多少。', false]; else content = ['Ending 01 · 理想的回答', '报告显示：你很适合被好好照顾。<br><br>别担心，<em>他会一直陪着你。</em>', false]; ending.innerHTML = `<h3>${content[0]}</h3><p>${content[1]}</p>`; ending.classList.remove('hidden'); if (content[2]) { ending.innerHTML += '<div class="terminal">INPUT REQUIRED_</div><input id="final-input" aria-label="回答他的问题" autocomplete="off" placeholder="输入你的回答" /><button class="quiet-button" id="final-button" type="button">回答</button>'; $('final-button').addEventListener('click', blackout); } else $('restart-button').classList.remove('hidden'); }
function blackout() { const input = $('final-input'); if (!input.value.trim()) return input.focus(); $('ending').innerHTML = '<h3>我知道。</h3><p class="terminal">CONNECTION CLOSED</p>'; setTimeout(() => document.body.classList.add('blackout'), 1400); }
function reset() { clearTimeout(questionTimer); clearTimeout(permissionTimer); permissionShown = false; $('permission-overlay').classList.add('hidden'); $('floating-messages').innerHTML = ''; state = initialState(); localStorage.removeItem(STORAGE_KEY); document.body.className = ''; $('header-status').textContent = '关系档案 · 私密'; renderQuestion(); }
$('start-button').addEventListener('click', reset); $('interlude-button').addEventListener('click', advance); $('confrontation-button').addEventListener('click', () => { const text = $('confrontation-text'); if (text.textContent.includes('为什么')) { text.textContent = '我不喜欢这个答案。'; $('confrontation-subtext').textContent = '重新选择。'; } else advance(); }); $('back-button').addEventListener('click', () => { if (state.index) { state.index -= 1; state.answers.length = state.index; save(); renderQuestion(); } }); $('restart-button').addEventListener('click', reset); $('restart-game-button').addEventListener('click', reset); $('home-button').addEventListener('click', () => { if (confirm('要离开本次测试吗？')) { clearTimeout(questionTimer); clearTimeout(permissionTimer); localStorage.removeItem(STORAGE_KEY); state = initialState(); showScreen('intro-screen'); document.body.className = ''; } });
$('permission-allow').addEventListener('click', () => resolvePermissionSimulation(false));
$('permission-deny').addEventListener('click', () => { $('permission-copy').textContent = '正在重新评估你的选择……'; $('permission-deny').disabled = true; setTimeout(() => resolvePermissionSimulation(true), 1500); });
