const inp = document.getElementById('memoInput'),
      btn = document.getElementById('clearBtn');

const modal = (el, msg, yes) => {
  const o = document.getElementById(el),
        m = o.querySelector('.modal'),
        p = o.getElementById ? o.getElementById(el + 'Message') : o.querySelector('p');
  p.textContent = msg;
  o.classList.add('active');
  m.classList.remove('closing');
  const close = r => {
    o.classList.add('closing');
    m.classList.add('closing');
    setTimeout(() => {
      o.classList.remove('active', 'closing');
      m.classList.remove('closing');
      yes?.(r);
    }, 300);
  };
  return close;
};

const alert = m => new Promise(r => {
  const close = modal('modalOverlay', m, () => r());
  document.getElementById('modalBtn').addEventListener('click', () => close());
});

const confirm = m => new Promise(r => {
  const close = modal('confirmOverlay', m);
  const y = () => {
    document.getElementById('confirmYes').removeEventListener('click', y);
    document.getElementById('confirmNo').removeEventListener('click', n);
    close(true);
    r(true);
  };
  const n = () => {
    document.getElementById('confirmYes').removeEventListener('click', y);
    document.getElementById('confirmNo').removeEventListener('click', n);
    close(false);
    r(false);
  };
  document.getElementById('confirmYes').addEventListener('click', y);
  document.getElementById('confirmNo').addEventListener('click', n);
});

window.addEventListener('load', () => {
  const s = localStorage.getItem('memo');
  if (s) inp.value = s;
});

inp.addEventListener('input', () => localStorage.setItem('memo', inp.value));

btn.addEventListener('click', async () => {
  if (await confirm('정말로 모든 메모를 삭제하시겠습니까?')) {
    inp.value = '';
    localStorage.removeItem('memo');
    alert('메모가 초기화되었습니다.');
  }
});