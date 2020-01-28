import Worker from '../scale-degrees.worker';
import { noteObj, degrees } from './scale-degrees.constants';
const currentEl = document.querySelector('.key__current');
const navNext = document.querySelector('.key__nav--next');
const navPrev = document.querySelector('.key__nav--previous');
const notes = Object.keys(noteObj);
const disabledClass = 'is-disabled';
let worker;

if (window.Worker) {
  worker = new Worker();
}

const handleKeyChange = (currentIndex) => {
  currentEl.innerHTML = noteObj[notes[currentIndex]];

  if (currentIndex === 0) {
    navPrev.classList.add(disabledClass);
  } else if(currentIndex === 11) {
    navNext.classList.add(disabledClass);
  } else {
    navNext.classList.remove(disabledClass);
    navPrev.classList.remove(disabledClass);
  }

  if (window.Worker) {
    worker.postMessage({
      type: 'keyChange',
      value: currentIndex,
    });
  }

  if (typeof window.gtag !== 'undefined') {
    gtag('event', 'keyChange', {
      'event_category' : 'form',
      'event_label' : 'guitar arpeggio'
    });
  }
};

const scaleDegrees = () => {
  let currentIndex = 0;
  navPrev.classList.add(disabledClass);

  currentEl.innerHTML = noteObj[notes[currentIndex]];
  notes.forEach((item, index) => {
    document.querySelector('.degree--' + item).innerHTML = degrees[index];
  });

  if (window.Worker) {
    worker.addEventListener(
      'message',
      e => {
        e.data.forEach((item, index) => {
          document.querySelector('.degree--' + item).innerHTML = degrees[index];
        });
      },
      false
    );
  }

  document.querySelector('.key').addEventListener('click', e => {
    e.preventDefault();

    if (e.target.matches('.key__nav--previous') && currentIndex > 0) {
      currentIndex--;
      handleKeyChange(currentIndex);
    } else if (e.target.matches('.key__nav--next') && currentIndex <= notes.length - 2) {
      currentIndex++;
      handleKeyChange(currentIndex);
    }

  });
};

scaleDegrees();
