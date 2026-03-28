const TABLES = {
  Users: ['id', 'username', 'password', 'pin', 'role_id', 'designation_id', 'status'],
  Roles: ['id', 'name', 'allowed_modules_json', 'status'],
  Designations: ['id', 'name', 'allowed_features_json', 'status'],
  FinancialYears: ['id', 'name', 'start_date', 'end_date', 'is_active', 'status'],
  Events: ['id', 'name', 'date', 'time', 'location', 'description', 'status', 'year_id'],
  Announcements: ['id', 'title', 'message', 'priority', 'status', 'year_id'],
  Banners: ['id', 'title', 'image_url', 'status', 'year_id'],
  Donations: ['id', 'donor_name', 'amount', 'date', 'payment_mode', 'year_id', 'status'],
  LadduAuctions: ['id', 'participant_name', 'bid_amount', 'round', 'year_id', 'status'],
  LadduWinners: ['id', 'winner_name', 'amount', 'date', 'certificate_id', 'year_id', 'status'],
  CertificateTemplates: ['id', 'name', 'layout_json', 'status'],
  Certificates: ['id', 'template_id', 'recipient_name', 'event_name', 'amount', 'verification_url', 'pdf_link', 'watermark', 'status', 'year_id', 'created_at'],
  CertificateApprovals: ['id', 'certificate_id', 'stage', 'approved_by', 'approver_role', 'timestamp', 'comments'],
  BudgetPlans: ['id', 'category', 'planned_amount', 'year_id', 'status'],
  Expenses: ['id', 'category', 'amount', 'date', 'year_id', 'status'],
  BudgetApprovals: ['id', 'budget_id', 'stage', 'approved_by', 'approver_role', 'timestamp', 'comments'],
  BudgetVersions: ['id', 'budget_id', 'revision_no', 'snapshot_json', 'timestamp'],
  Assets: ['id', 'name', 'cost', 'purchase_date', 'year_id', 'budget_id', 'lifecycle_status', 'status'],
  AssetAllocations: ['id', 'asset_id', 'allocated_to', 'department', 'from_date', 'to_date', 'status'],
  FinancialReports: ['id', 'name', 'year_id', 'report_json', 'pdf_link', 'verification_url', 'status', 'signature_name', 'signature_role', 'signed_at'],
  ReportApprovals: ['id', 'report_id', 'stage', 'approved_by', 'approver_role', 'timestamp', 'comments'],
  Committee: ['id', 'name', 'role', 'designation', 'responsibility', 'active', 'year_id'],
  Mandali: ['id', 'name', 'role', 'active', 'year_id'],
  Volunteers: ['id', 'name', 'phone', 'skills', 'status', 'year_id'],
  VolunteerTasks: ['id', 'volunteer_id', 'task', 'assigned_by', 'status', 'due_date'],
  PoojaBookings: ['id', 'name', 'date', 'pooja_type', 'status', 'year_id'],
  PoojaDateControl: ['id', 'date', 'is_open', 'note'],
  PoojaHistory: ['id', 'name', 'date', 'pooja_type', 'notes', 'year_id'],
  Documents: ['id', 'title', 'category', 'file_type', 'drive_link', 'access_roles_json', 'status', 'year_id'],
  CommunicationLogs: ['id', 'channel', 'recipient', 'message', 'group_name', 'timestamp', 'status', 'meta_json'],
  SupportTickets: ['id', 'subject', 'description', 'created_by', 'admin_response', 'status', 'created_at', 'updated_at'],
  AuditLogs: ['id', 'entity', 'entity_id', 'action', 'performed_by', 'timestamp', 'changes_json', 'version']
};

const FEATURE_MATRIX = {
  F1: 'Admin Login', F2: 'User Login', F3: 'Role-Based Access', F4: 'Designation-Based Access', F5: 'Dashboard', F6: 'Financial Year System',
  F7: 'Homepage', F8: 'Event CRUD', F9: 'Event Status', F10: 'Announcement CRUD', F11: 'Divine Banners',
  F12: 'Donation Entry', F13: 'Donation Summary', F14: 'Laddu Auction', F15: 'Laddu Winners', F16: 'Laddu History',
  F17: 'Certificate Template', F18: 'Certificate Generation', F19: 'QR Code', F20: 'Verification Page', F21: 'Approval Workflow', F22: 'Approval Preview', F23: 'Digital Signature', F24: 'Security Features',
  F25: 'Budget Planning', F26: 'Budget vs Actual', F27: 'Category Budget', F28: 'Budget Approval', F29: 'Versioning',
  F30: 'Asset Register', F31: 'Link Assets to Budget', F32: 'Lifecycle', F33: 'Allocation',
  F34: 'Financial Report', F35: 'Data Linking', F36: 'Export PDF', F37: 'QR Verification', F38: 'Approval Workflow', F39: 'Digital Signature',
  F40: 'Committee Table', F41: 'Roles & Responsibilities', F42: 'Active Status', F43: 'Public Display',
  F44: 'Mandali Table', F45: 'Year-wise Records', F46: 'Active Year', F47: 'Public Display',
  F48: 'Volunteer CRUD', F49: 'Task Assignment',
  F50: 'Booking Form', F51: 'Date Control', F52: 'History',
  F53: 'Upload', F54: 'File Types', F55: 'Access Control', F56: 'Categories',
  F57: 'Email', F58: 'WhatsApp', F59: 'Group Messaging', F60: 'Logs',
  F61: 'Ticket Creation', F62: 'Admin Response', F63: 'Status Tracking',
  F64: 'Audit Logs', F65: 'Versioning', F66: 'Access Restriction',
  F67: 'Divine Theme', F68: 'Email Styling', F69: 'Banner System'
};

const SESSION_CACHE = CacheService.getScriptCache();

function doGet(e) {
  const q = e.parameter || {};
  try {
    if (q.action === 'initSchema') return json(ok(initSchema()));
    if (q.action === 'list') return json(ok(listRecords(q.table, q, getUserFromRequest(e))));
    if (q.action === 'get') return json(ok(getRecord(q.table, q.id, getUserFromRequest(e))));
    if (q.action === 'dashboard') return json(ok(getDashboard(getUserFromRequest(e))));
    if (q.action === 'publicHome') return json(ok(getPublicHome()));
    if (q.action === 'verifyCertificate') return json(ok(verifyCertificate(q.certificate_id)));
    if (q.action === 'featureMatrix') return json(ok(FEATURE_MATRIX));
    return json(fail('Unsupported GET action'));
  } catch (err) {
    return json(fail(err.message));
  }
}

function doPost(e) {
  try {
    const q = e.parameter || {};
    const payload = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    if (q.action === 'login') return json(ok(login(payload)));

    const user = getUserFromRequest(e);

    if (q.action === 'create') return json(ok(createRecord(q.table, payload, user)));
    if (q.action === 'update') return json(ok(updateRecord(q.table, payload.id, payload, user)));
    if (q.action === 'delete') return json(ok(deleteRecord(q.table, payload.id, user)));
    if (q.action === 'transition') return json(ok(runTransition(payload, user)));
    if (q.action === 'custom') return json(ok(runCustom(payload, user)));

    return json(fail('Unsupported POST action'));
  } catch (err) {
    return json(fail(err.message));
  }
}

function initSchema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(TABLES).forEach(name => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) sh.appendRow(TABLES[name]);
  });
  return { created: Object.keys(TABLES).length };
}

function login(payload) {
  const users = readAll('Users');
  const row = users.find(u => u.username === payload.username && (u.password === payload.password || u.pin === payload.pin) && u.status !== 'inactive');
  if (!row) throw new Error('Invalid credentials');

  const role = row.role_id ? getById('Roles', row.role_id) : {};
  const designation = row.designation_id ? getById('Designations', row.designation_id) : {};
  const token = Utilities.getUuid();
  SESSION_CACHE.put(token, JSON.stringify({
    id: row.id,
    username: row.username,
    role_id: row.role_id,
    designation_id: row.designation_id,
    role_name: role.name || '',
    allowed_modules: parseJson(role.allowed_modules_json),
    allowed_features: parseJson(designation.allowed_features_json)
  }), 21600);

  logAudit('Users', row.id, 'LOGIN', row.username, { token_issued: true });
  return { token, user: { ...row, role, designation } };
}

function getUserFromRequest(e) {
  const token = (e.parameter && e.parameter.token) || (e.headers && (e.headers.Authorization || e.headers.authorization || '').replace('Bearer ', ''));
  if (!token) throw new Error('Missing session token');
  const cached = SESSION_CACHE.get(token);
  if (!cached) throw new Error('Invalid/expired session');
  return JSON.parse(cached);
}

function enforceAccess(user, moduleName, featureCode) {
  const modules = user.allowed_modules || [];
  const features = user.allowed_features || [];
  if (modules.length && !modules.includes(moduleName)) throw new Error('Role restriction for module ' + moduleName);
  if (features.length && !features.includes(featureCode)) throw new Error('Designation restriction for feature ' + featureCode);
}

function listRecords(table, q, user) {
  enforceTableAccess(user, table, 'read');
  let rows = readAll(table);
  if (q.year_id) rows = rows.filter(r => String(r.year_id) === String(q.year_id));
  if (q.status) rows = rows.filter(r => String(r.status) === String(q.status));
  if (q.active === 'true') rows = rows.filter(r => ['active', 'true', true].includes(r.active) || r.status === 'active');
  return rows;
}

function getRecord(table, id, user) {
  enforceTableAccess(user, table, 'read');
  return getById(table, id);
}

function createRecord(table, payload, user) {
  enforceTableAccess(user, table, 'write');
  const data = stampWithYear(table, payload);
  if (!data.id) data.id = Utilities.getUuid();
  appendRow(table, data);
  logAudit(table, data.id, 'CREATE', user.username, data);
  return data;
}

function updateRecord(table, id, payload, user) {
  enforceTableAccess(user, table, 'write');
  const updated = updateById(table, id, payload);
  logAudit(table, id, 'UPDATE', user.username, payload);
  if (table === 'BudgetPlans') saveBudgetVersion(id);
  return updated;
}

function deleteRecord(table, id, user) {
  enforceTableAccess(user, table, 'write');
  const out = softDelete(table, id);
  logAudit(table, id, 'DELETE', user.username, { soft_delete: true });
  return out;
}

function runTransition(payload, user) {
  const { workflow, id, stage, comments } = payload;
  if (workflow === 'certificate') {
    const data = { id: Utilities.getUuid(), certificate_id: id, stage, approved_by: user.username, approver_role: user.role_name, timestamp: new Date().toISOString(), comments: comments || '' };
    appendRow('CertificateApprovals', data);
    updateById('Certificates', id, { status: stage === 'Approved' ? 'approved' : stage.toLowerCase() });
    logAudit('Certificates', id, 'TRANSITION', user.username, data);
    return data;
  }
  if (workflow === 'budget') {
    const data = { id: Utilities.getUuid(), budget_id: id, stage, approved_by: user.username, approver_role: user.role_name, timestamp: new Date().toISOString(), comments: comments || '' };
    appendRow('BudgetApprovals', data);
    logAudit('BudgetPlans', id, 'TRANSITION', user.username, data);
    return data;
  }
  if (workflow === 'report') {
    const data = { id: Utilities.getUuid(), report_id: id, stage, approved_by: user.username, approver_role: user.role_name, timestamp: new Date().toISOString(), comments: comments || '' };
    appendRow('ReportApprovals', data);
    logAudit('FinancialReports', id, 'TRANSITION', user.username, data);
    return data;
  }
  throw new Error('Unsupported workflow');
}

function runCustom(payload, user) {
  if (payload.operation === 'donationSummary') {
    const rows = readAll('Donations').filter(r => (!payload.year_id || String(r.year_id) === String(payload.year_id)) && (!payload.from || r.date >= payload.from) && (!payload.to || r.date <= payload.to));
    const total = rows.reduce((a, b) => a + Number(b.amount || 0), 0);
    return { total, count: rows.length };
  }

  if (payload.operation === 'ladduHistory') {
    return readAll('LadduWinners').filter(r => !payload.year_id || String(r.year_id) === String(payload.year_id));
  }

  if (payload.operation === 'generateCertificate') {
    const cert = getById('Certificates', payload.certificate_id);
    cert.verification_url = ScriptApp.getService().getUrl() + '?action=verifyCertificate&certificate_id=' + encodeURIComponent(cert.id);
    cert.watermark = 'GANESH-UTSAVA-' + cert.id;
    cert.pdf_link = generateCertificatePdf(cert, payload.template_html || '');
    cert.status = 'draft';
    updateById('Certificates', cert.id, cert);
    logAudit('Certificates', cert.id, 'GENERATE_PDF', user.username, cert);
    return cert;
  }

  if (payload.operation === 'previewCertificate') {
    return getById('Certificates', payload.certificate_id);
  }

  if (payload.operation === 'budgetVsActual') {
    const budgets = readAll('BudgetPlans').filter(r => String(r.year_id) === String(payload.year_id));
    const expenses = readAll('Expenses').filter(r => String(r.year_id) === String(payload.year_id));
    const byCat = {};
    budgets.forEach(b => byCat[b.category] = { planned: Number(b.planned_amount || 0), actual: 0, variance: 0 });
    expenses.forEach(x => {
      if (!byCat[x.category]) byCat[x.category] = { planned: 0, actual: 0, variance: 0 };
      byCat[x.category].actual += Number(x.amount || 0);
    });
    Object.keys(byCat).forEach(k => byCat[k].variance = byCat[k].planned - byCat[k].actual);
    return byCat;
  }

  if (payload.operation === 'generateFinancialReport') {
    const data = composeFinancialReport(payload.year_id);
    const id = Utilities.getUuid();
    const report = {
      id,
      name: payload.name || ('Financial Report ' + payload.year_id),
      year_id: payload.year_id,
      report_json: JSON.stringify(data),
      pdf_link: generateReportPdf(data, payload.name || 'Financial Report'),
      verification_url: ScriptApp.getService().getUrl() + '?action=get&table=FinancialReports&id=' + id,
      status: 'draft',
      signature_name: '',
      signature_role: '',
      signed_at: ''
    };
    appendRow('FinancialReports', report);
    logAudit('FinancialReports', id, 'GENERATE_REPORT', user.username, report);
    return report;
  }

  if (payload.operation === 'signRecord') {
    const table = payload.table;
    const updated = updateById(table, payload.id, {
      signature_name: user.username,
      signature_role: user.role_name,
      signed_at: new Date().toISOString()
    });
    logAudit(table, payload.id, 'SIGN', user.username, updated);
    return updated;
  }

  if (payload.operation === 'sendEmail') {
    MailApp.sendEmail({
      to: payload.to,
      subject: payload.subject,
      htmlBody: payload.htmlBody || `<div style="font-family:serif;color:#8b0000"><h2>🙏 Ganesh Utsava Update</h2><p>${payload.message}</p></div>`
    });
    const log = { id: Utilities.getUuid(), channel: 'email', recipient: payload.to, message: payload.message || '', group_name: payload.group_name || '', timestamp: new Date().toISOString(), status: 'sent', meta_json: JSON.stringify({ subject: payload.subject }) };
    appendRow('CommunicationLogs', log);
    return log;
  }

  if (payload.operation === 'whatsAppLink') {
    const message = encodeURIComponent(payload.message || 'Ganesh Utsava notification');
    const phone = String(payload.phone || '').replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${message}`;
    const log = { id: Utilities.getUuid(), channel: 'whatsapp', recipient: phone, message: payload.message || '', group_name: payload.group_name || '', timestamp: new Date().toISOString(), status: 'generated', meta_json: JSON.stringify({ url }) };
    appendRow('CommunicationLogs', log);
    return { url, log };
  }

  throw new Error('Unsupported custom operation');
}

function getDashboard(user) {
  enforceAccess(user, 'dashboard', 'F5');
  const donations = readAll('Donations').reduce((a, b) => a + Number(b.amount || 0), 0);
  const expenses = readAll('Expenses').reduce((a, b) => a + Number(b.amount || 0), 0);
  const activeEvents = readAll('Events').filter(e => e.status === 'active').length;
  const pendingApprovals = readAll('CertificateApprovals').filter(a => String(a.stage).toLowerCase() !== 'approved').length
    + readAll('BudgetApprovals').filter(a => String(a.stage).toLowerCase() !== 'approved').length
    + readAll('ReportApprovals').filter(a => String(a.stage).toLowerCase() !== 'approved').length;
  return { total_donations: donations, total_expenses: expenses, active_events: activeEvents, pending_approvals: pendingApprovals };
}

function getPublicHome() {
  return {
    events: readAll('Events').filter(x => x.status === 'active'),
    announcements: readAll('Announcements').filter(x => x.status === 'active'),
    banners: readAll('Banners').filter(x => x.status === 'active'),
    committee: readAll('Committee').filter(x => String(x.active) === 'true' || x.active === true),
    mandali: readAll('Mandali').filter(x => String(x.active) === 'true' || x.active === true)
  };
}

function verifyCertificate(certificateId) {
  const cert = getById('Certificates', certificateId);
  if (!cert) return { status: 'invalid', message: 'Certificate not found' };
  const approvals = readAll('CertificateApprovals').filter(r => r.certificate_id === certificateId);
  return { status: cert.status || 'draft', certificate: cert, approvals };
}

function enforceTableAccess(user, table, mode) {
  const featureMap = {
    Events: 'F8', Announcements: 'F10', Banners: 'F11', Donations: 'F12', LadduAuctions: 'F14', LadduWinners: 'F15',
    CertificateTemplates: 'F17', Certificates: 'F18', BudgetPlans: 'F25', Assets: 'F30', FinancialReports: 'F34',
    Committee: 'F40', Mandali: 'F44', Volunteers: 'F48', VolunteerTasks: 'F49', PoojaBookings: 'F50',
    Documents: 'F53', CommunicationLogs: 'F60', SupportTickets: 'F61', AuditLogs: 'F64', FinancialYears: 'F6'
  };
  const feature = featureMap[table] || 'F66';
  enforceAccess(user, table, feature);
  if (mode === 'write' && user.role_name.toLowerCase() === 'viewer') throw new Error('Read-only user');
}

function composeFinancialReport(yearId) {
  return {
    donations: readAll('Donations').filter(r => String(r.year_id) === String(yearId)),
    expenses: readAll('Expenses').filter(r => String(r.year_id) === String(yearId)),
    budget: readAll('BudgetPlans').filter(r => String(r.year_id) === String(yearId)),
    assets: readAll('Assets').filter(r => String(r.year_id) === String(yearId)),
    generated_at: new Date().toISOString()
  };
}

function generateCertificatePdf(cert, templateHtml) {
  const html = templateHtml || `<div style="font-family:serif;text-align:center;"><h1>Shri Ganesh Certificate</h1><h2>${cert.recipient_name || ''}</h2><p>${cert.event_name || ''}</p><p>Amount: ₹${cert.amount || ''}</p><p>${cert.verification_url || ''}</p><p>${cert.watermark || ''}</p></div>`;
  const blob = Utilities.newBlob(html, 'text/html', 'certificate.html').getAs('application/pdf').setName('certificate-' + cert.id + '.pdf');
  return DriveApp.createFile(blob).getUrl();
}

function generateReportPdf(data, title) {
  const html = `<div style="font-family:serif"><h1>${title}</h1><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
  const blob = Utilities.newBlob(html, 'text/html', 'report.html').getAs('application/pdf').setName((title || 'report') + '.pdf');
  return DriveApp.createFile(blob).getUrl();
}

function saveBudgetVersion(budgetId) {
  const b = getById('BudgetPlans', budgetId);
  const existing = readAll('BudgetVersions').filter(v => v.budget_id === budgetId).length;
  appendRow('BudgetVersions', {
    id: Utilities.getUuid(),
    budget_id: budgetId,
    revision_no: existing + 1,
    snapshot_json: JSON.stringify(b),
    timestamp: new Date().toISOString()
  });
}

function logAudit(entity, entityId, action, by, changes) {
  const count = readAll('AuditLogs').length;
  appendRow('AuditLogs', {
    id: Utilities.getUuid(),
    entity,
    entity_id: entityId,
    action,
    performed_by: by,
    timestamp: new Date().toISOString(),
    changes_json: JSON.stringify(changes || {}),
    version: count + 1
  });
}

function getSheet(table) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(table);
  if (!sh) throw new Error('Sheet missing: ' + table);
  return sh;
}

function readAll(table) {
  const sh = getSheet(table);
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).map(r => rowToObj(headers, r));
}

function appendRow(table, data) {
  const sh = getSheet(table);
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const row = headers.map(h => data[h] !== undefined ? data[h] : '');
  sh.appendRow(row);
}

function updateById(table, id, patch) {
  const sh = getSheet(table);
  const values = sh.getDataRange().getValues();
  const headers = values[0];
  const idx = headers.indexOf('id');
  const rowIndex = values.findIndex((r, i) => i > 0 && String(r[idx]) === String(id));
  if (rowIndex < 1) throw new Error(table + ' id not found ' + id);
  const obj = rowToObj(headers, values[rowIndex]);
  const next = { ...obj, ...patch };
  const row = headers.map(h => next[h] !== undefined ? next[h] : '');
  sh.getRange(rowIndex + 1, 1, 1, headers.length).setValues([row]);
  return next;
}

function softDelete(table, id) {
  return updateById(table, id, { status: 'deleted' });
}

function getById(table, id) {
  return readAll(table).find(r => String(r.id) === String(id));
}

function stampWithYear(table, data) {
  if (TABLES[table] && TABLES[table].includes('year_id') && !data.year_id) {
    const fy = readAll('FinancialYears').find(y => String(y.is_active) === 'true' || y.is_active === true);
    if (fy) data.year_id = fy.id;
  }
  if (!data.created_at) data.created_at = new Date().toISOString();
  return data;
}

function parseJson(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try { return JSON.parse(value); } catch (_) { return []; }
}

function rowToObj(headers, row) {
  const out = {};
  headers.forEach((h, i) => out[h] = row[i]);
  return out;
}

function ok(data) { return { ok: true, data }; }
function fail(error) { return { ok: false, error }; }
function json(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
