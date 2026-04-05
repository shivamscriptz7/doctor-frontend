// app/lib/toast.ts

type ToastType = 'success' | 'error' | 'warning';

export function showToast(type: ToastType, title: string, message: string) {
  const containerId = 'toast-root';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.cssText =
      'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(container);
  }

  const colors = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a', bar: '#22c55e' },
    error:   { bg: '#fef2f2', border: '#fecaca', icon: '#dc2626', bar: '#ef4444' },
    warning: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706', bar: '#f59e0b' },
  };
  const c = colors[type];

  const el = document.createElement('div');
  el.style.cssText = `
    pointer-events:all;
    display:flex;align-items:flex-start;gap:12px;
    padding:14px 16px;border-radius:14px;
    background:${c.bg};border:1px solid ${c.border};
    min-width:290px;max-width:350px;
    position:relative;overflow:hidden;
    opacity:0;transform:translateX(70px);
    transition:opacity .3s ease,transform .3s ease;
    box-shadow:0 4px 20px rgba(0,0,0,0.08);
  `;

  const iconMap = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  };

  el.innerHTML = `
    <div style="margin-top:1px;flex-shrink:0">${iconMap[type]}</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:600;color:#111827;margin-bottom:2px;font-family:'Plus Jakarta Sans',sans-serif">${title}</div>
      <div style="font-size:12px;color:#6b7280;line-height:1.5;font-family:'Plus Jakarta Sans',sans-serif">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;font-size:18px;color:#9ca3af;padding:0;line-height:1;flex-shrink:0">&times;</button>
    <div style="position:absolute;bottom:0;left:0;height:3px;width:100%;background:${c.bar};transform-origin:left;animation:toastBar 3.5s linear forwards;border-radius:0 0 14px 14px"></div>
  `;

  if (!document.getElementById('toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = `@keyframes toastBar{from{transform:scaleX(1)}to{transform:scaleX(0)}}`;
    document.head.appendChild(s);
  }

  container.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(0)';
  }));
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(70px)';
    setTimeout(() => el.remove(), 350);
  }, 3500);
}