/**
 * 江小白的期末周 — 交互脚本
 */

// ========== 登录检查 ==========
if (sessionStorage.getItem('jxb_logged_in') !== 'true') {
  if (!window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
  }
}
function logout() {
  sessionStorage.removeItem('jxb_logged_in');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function () {

  // ========== 回到顶部按钮 ==========
  const backTopBtn = document.getElementById('backTop');
  if (backTopBtn) {
    window.addEventListener('scroll', function () {
      backTopBtn.classList.toggle('show', window.scrollY > 400);
    });
    backTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== 侧边栏高亮 ==========
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const headings = [...document.querySelectorAll('h2[id]')];
  if (sidebarLinks.length && headings.length) {
    window.addEventListener('scroll', function () {
      let current = headings[0]?.id || '';
      headings.forEach(h => {
        if (window.scrollY >= h.offsetTop - 120) current = h.id;
      });
      sidebarLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    });
  }

  // ========== 粒子装饰（首页 Hero） ==========
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 600) {
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('span');
      dot.style.cssText = `
        position: absolute; pointer-events: none; z-index: 0;
        width: ${4 + Math.random() * 6}px; height: ${4 + Math.random() * 6}px;
        background: rgba(255,255,255,${0.08 + Math.random() * 0.12});
        border-radius: 50%;
        top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
        animation: float ${4 + Math.random() * 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
      `;
      hero.appendChild(dot);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
        50% { transform: translateY(-20px) scale(1.5); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }

});
