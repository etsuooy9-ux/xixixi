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
const screens = ['home-screen', 'intro-screen', 'quiz-screen', 'interlude-screen', 'confrontation-screen', 'result-screen', 'archive-screen'];
const STORAGE_KEY = 'morrow-game';
const SAVE_VERSION = 3;
const initialState = () => ({ saveVersion: SAVE_VERSION, phase: 'home', index: 0, answers: [], finished: false, names: { me: '', ta: '' }, clues: { archive: false, chat: false, search: false }, ending: null, startedAt: null });
let savedState = null;
try { savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { savedState = null; }
if (!savedState || savedState.saveVersion !== SAVE_VERSION) localStorage.removeItem(STORAGE_KEY);
let state = savedState?.saveVersion === SAVE_VERSION ? savedState : initialState();
let pendingIndex = null;
let questionTimer = null;
let permissionTimer = null;
let permissionShown = false;
const floatingLines = ['宝宝你真可爱。', '宝宝你在看我，对不对？', '别想太久。', '我知道你在哪。', '继续回答。'];

function showScreen(id) { screens.forEach((screen) => $(screen).classList.toggle('hidden', screen !== id)); }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function scores() { return state.answers.reduce((total, answer) => { const value = questions[answer.question]?.scores[answer.option] || [0, 0, 0]; return total.map((score, index) => score + value[index]); }, [0, 0, 0]); }
function renderQuestion() {
  state.phase = 'quiz'; save(); document.body.classList.remove('glitch', 'denied', 'time-warning'); showScreen('quiz-screen'); clearTimeout(questionTimer);
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
  if (q === 4) return interlude('正在读取 TA 的回答……', 'TA 已完成回答。');
  if (q === 9) return interlude('你确定 TA 不知道吗？', '');
  if ((q === 20 || q === 21) && option === questions[q].options.length - 1) return rejection(q === 20 ? 'ERROR: RESPONSE REJECTED · 为什么不告诉我？' : '你刚才不是还愿意回答吗？');
  if (q === 14) return interlude('检测到双方回答存在异常重合。', '无法查看。');
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
function results() { state.finished = true; state.phase = 'result'; save(); showScreen('result-screen'); $('result-title').textContent = '分析完成。正在生成你的关系报告……'; $('report').classList.add('hidden'); $('ending').classList.add('hidden'); $('anomaly-log').classList.add('hidden'); $('detail-link').classList.add('hidden'); $('restart-button').classList.add('hidden'); setTimeout(() => { $('result-title').textContent = `${state.names.me || '我'} × ${state.names.ta || 'TA'}`; $('result-kicker').textContent = '恋爱匹配度：97%'; $('report').classList.remove('hidden'); const [warmth, suspicion, independence] = scores(); const values = [Math.min(97, 35 + warmth * 4), Math.min(96, 46 + warmth * 3), Math.min(95, 8 + independence * 4), Math.min(95, 58 + warmth * 2), Math.min(98, 64 + warmth * 2)]; ['dependency', 'closeness', 'independence', 'communication', 'heartbeat'].forEach((name, index) => { $(`${name}-score`).textContent = `${values[index]}%`; $(`${name}-bar`).style.width = `${values[index]}%`; }); setTimeout(() => finish(warmth, suspicion, independence), 1800); }, 2100); }
function finish(warmth, suspicion, independence) { const ending = $('ending'); $('control-score').textContent = '无法计算。'; let content; if (state.clues?.archive && state.clues?.chat && state.clues?.search) content = ['Ending 03 · 找到真相', '系统并不知道你们。<br>它只是提前写好了 TA 的回答。', false]; else if (independence >= 29 && suspicion >= 14) content = ['Ending 04 · TA 正在看', `${state.names.ta || 'TA'} 没有回答过。<br>可系统一直显示：TA 已完成。`, true]; else if (suspicion >= 11 || independence >= 24) content = ['Ending 02 · 发现异常', '你知道这份双人报告有问题。<br>但你还没有看见完整记录。', false]; else content = ['Ending 01 · 正常退出', `${state.names.me || '我'} 与 ${state.names.ta || 'TA'} 的报告已经生成。<br><br>感谢使用 Morrow。`, false]; state.ending = content[0]; save(); ending.innerHTML = `<h3>${content[0]}</h3><p>${content[1]}</p>`; ending.classList.remove('hidden'); setTimeout(() => { $('anomaly-log').classList.remove('hidden'); $('detail-link').classList.remove('hidden'); }, 1000); if (content[2]) { ending.innerHTML += '<div class="terminal">INPUT REQUIRED_</div><input id="final-input" aria-label="回答 TA 的问题" autocomplete="off" placeholder="输入你的回答" /><button class="quiet-button" id="final-button" type="button">回答</button>'; $('final-button').addEventListener('click', blackout); } $('restart-button').classList.remove('hidden'); }
function blackout() { const input = $('final-input'); if (!input.value.trim()) return input.focus(); $('ending').innerHTML = '<h3>我知道。</h3><p class="terminal">CONNECTION CLOSED</p>'; setTimeout(() => document.body.classList.add('blackout'), 1400); }
function reset() { clearTimeout(questionTimer); clearTimeout(permissionTimer); permissionShown = false; const me = $('my-name').value.trim() || '我'; const ta = $('ta-name').value.trim() || 'TA'; $('permission-overlay').classList.add('hidden'); $('floating-messages').innerHTML = ''; state = initialState(); state.names = { me, ta }; state.startedAt = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }); state.phase = 'quiz'; localStorage.removeItem(STORAGE_KEY); document.body.className = ''; $('header-status').textContent = '关系档案 · 私密'; renderQuestion(); }
function renderHome() { showScreen('home-screen'); $('history-status').textContent = state.finished ? `已保存：${state.ending || '关系报告'}` : state.phase === 'quiz' && state.index ? `进行中：第 ${state.index + 1} 题` : '暂无报告'; $('resume-button').classList.toggle('hidden', !(state.phase === 'quiz' && state.index)); }
function openArchive() { state.clues.archive = true; save(); $('archive-meta').innerHTML = `<span>测试开始：${state.startedAt || '--:--'}</span><span>参与者：${state.names.me || '我'} / ${state.names.ta || 'TA'}</span><span>回答数量：23 / 23</span><span>异常回答者：1</span><span>系统状态：正常</span>`; setTimeout(() => { $('archive-meta').lastElementChild.textContent = '系统状态：……'; }, 1100); showScreen('archive-screen'); }
function showSearchResults() { const key = $('archive-search').value.trim().toLowerCase(); const results = { 关系: '关系同步：两份回答的提交时间相同。', 回答: '回答记录：TA 的答案在测试开始前已存在。', 同步: '同步失败：检测到非预期的第二份回答。', ta: 'TA 状态：未登录 / 已完成回答。' }; const value = Object.entries(results).find(([term]) => key.includes(term)); if (value) { state.clues.search = true; save(); $('search-results').innerHTML = `<p><b>检索结果 / 1</b></p><p>${value[1]}</p>`; } else $('search-results').innerHTML = '<p>未找到本次关系记录。</p>'; }
$('start-button').addEventListener('click', reset); $('resume-button').addEventListener('click', renderQuestion); $('interlude-button').addEventListener('click', advance); $('confrontation-button').addEventListener('click', () => { const text = $('confrontation-text'); if (text.textContent.includes('为什么')) { text.textContent = '我不喜欢这个答案。'; $('confrontation-subtext').textContent = '重新选择。'; } else advance(); }); $('back-button').addEventListener('click', () => { if (state.index) { state.index -= 1; state.answers.length = state.index; save(); renderQuestion(); } }); $('restart-button').addEventListener('click', reset); $('restart-game-button').addEventListener('click', reset); $('home-button').addEventListener('click', renderHome);
$('permission-allow').addEventListener('click', () => resolvePermissionSimulation(false));
$('permission-deny').addEventListener('click', () => { $('permission-copy').textContent = '正在重新评估你的选择……'; $('permission-deny').disabled = true; setTimeout(() => resolvePermissionSimulation(true), 1500); });
$('detail-link').addEventListener('click', openArchive); $('archive-back').addEventListener('click', results); $('archive-search').addEventListener('input', showSearchResults); $('load-chat').addEventListener('click', () => { state.clues.chat = true; save(); $('chat-messages').innerHTML += '<p class="chat-a">我：可是 TA 根本没有打开过测试。</p><p class="chat-b">TA：为什么系统说我已经回答完了？</p><p class="chat-a">我：它好像比我们更早知道答案。</p>'; $('load-chat').disabled = true; $('load-chat').textContent = '记录已加载'; });
$('nav-test').addEventListener('click', () => state.phase === 'quiz' && state.index ? renderQuestion() : reset()); $('nav-history').addEventListener('click', () => state.finished ? results() : renderHome()); $('nav-help').addEventListener('click', () => showFloatingMessage('帮助中心：请根据第一直觉作答。'));
if (state.phase === 'quiz' && state.index < questions.length) renderQuestion(); else renderHome();
