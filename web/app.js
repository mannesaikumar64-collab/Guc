const state = {
  apiUrl: '',
  apiSecret: '',
  token: '',
  user: null,
  featureMatrix: {}
};

function saveConfig() {
  state.apiUrl = document.getElementById('apiUrl').value.trim();
  state.apiSecret = document.getElementById('apiSecret').value.trim();
  alert('Config loaded in memory for this session.');
}

async function apiGet(action, params = {}) {
  const qs = new URLSearchParams({ action, token: state.token, ...params });
  const res = await fetch(`${state.apiUrl}?${qs.toString()}`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error);
  return json.data;
}

async function apiPost(action, body = {}) {
  const qs = new URLSearchParams({ action, token: state.token });
  const res = await fetch(`${state.apiUrl}?${qs.toString()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, secret: state.apiSecret })
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error);
  return json.data;
}

async function login() {
  try {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const pin = document.getElementById('pin').value.trim();
    const qs = new URLSearchParams({ action: 'login' });
    const res = await fetch(`${state.apiUrl}?${qs.toString()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, pin, secret: state.apiSecret })
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error);

    state.token = json.data.token;
    state.user = json.data.user;

    document.getElementById('loginMessage').innerText = `Welcome ${state.user.username} (${state.user.role?.name || ''})`;
    document.getElementById('dashboardSection').classList.remove('hidden');

    await loadDashboard();
    await loadPublicHome();
    await loadFeatureTracker();
  } catch (e) {
    document.getElementById('loginMessage').innerText = e.message;
  }
}

async function loadDashboard() {
  const d = await apiGet('dashboard');
  document.getElementById('kpiDonations').innerText = `₹${Number(d.total_donations || 0).toLocaleString()}`;
  document.getElementById('kpiExpenses').innerText = `₹${Number(d.total_expenses || 0).toLocaleString()}`;
  document.getElementById('kpiEvents').innerText = d.active_events || 0;
  document.getElementById('kpiApprovals').innerText = d.pending_approvals || 0;
}

async function loadPublicHome() {
  const data = await apiGet('publicHome');
  const lines = [];
  lines.push('=== Active Events ===');
  (data.events || []).forEach(e => lines.push(`• ${e.name} | ${e.date} ${e.time} @ ${e.location}`));
  lines.push('');
  lines.push('=== Active Announcements ===');
  (data.announcements || []).forEach(a => lines.push(`• [${a.priority}] ${a.title}: ${a.message}`));
  lines.push('');
  lines.push('=== Divine Banners ===');
  (data.banners || []).forEach(b => lines.push(`• ${b.title}: ${b.image_url}`));
  document.getElementById('homeFeed').innerText = lines.join('\n');
}

async function loadTable(table) {
  const data = await apiGet('list', { table });
  document.getElementById('grid').innerText = JSON.stringify({ table, rows: data }, null, 2);
}

async function loadFeatureTracker() {
  state.featureMatrix = await apiGet('featureMatrix');
  const implemented = [];
  Object.keys(state.featureMatrix).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))).forEach(k => {
    implemented.push(`${k} - ${state.featureMatrix[k]}`);
  });
  document.getElementById('featureTracker').innerText = implemented.join('\n');
}
