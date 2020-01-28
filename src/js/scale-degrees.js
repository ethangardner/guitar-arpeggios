import Worker from '../scale-degrees.worker';
import { noteObj, degrees } from './scale-degrees.constants';
let worker;
const currentEl = document.querySelector('.key__current');
const notes = Object.keys(noteObj);

if (window.Worker) {
  worker = new Worker();
}

const handleKeyChange = (currentIndex) => {
  currentEl.innerHTML = noteObj[notes[currentIndex]];

  if (window.Worker) {
    worker.postMessage({
      type: 'keyChange',
      value: currentIndex,
    });
  }
};

const scaleDegrees = () => {
  let currentIndex = 0;

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
