function setTime(el) {
  localStorage.setItem('mode', localStorage.getItem('mode') || 'day');
  localStorage.getItem('mode') === 'night' ? el.classList.add('night') : el.classList.add('day');
}
