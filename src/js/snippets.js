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