export function setAni(el, time, classname, action) {
  setTimeout(function(){
    switch(action) {
      case 'remove':
        document.querySelector(el).classList.remove(classname);
        break;
      case 'clear':
        document.querySelector(el).className='';
        break;
      default:
        document.querySelector(el).classList.add(classname);
    }
  },time);
}

export function formatTime(time) {
  const minValue = Math.floor((time/60) % 60);
  const secValue = Math.floor(time % 60);
  const min = minValue < 10 ? `0${minValue}` : minValue;
  const sec = secValue < 10 ? `0${secValue}` : secValue;
  return `${min}:${sec}`;
}