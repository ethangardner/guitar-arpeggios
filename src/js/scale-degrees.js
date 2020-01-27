import Worker from '../scale-degrees.worker';
import { noteObj, degrees } from './scale-degrees.constants';
let worker;
const currentEl = document.querySelector('.key__current');
const notes = Object.keys(noteObj);

if (window.Worker) {
  worker = new Worker();
}

const handleNoteSelect = e => {
  e.preventDefault();
  if (e.target.matches('a')) {
    worker.postMessage({
      type: 'change',
      value: e.target.getAttribute('data-note'),
    }); // Send data to our worker.

    if (e.target.classList.contains(activeClassName)) {
      e.target.classList.remove(activeClassName);
    } else {
      e.target.classList.add(activeClassName);
    }
  }
};

const handleKeyChange = (currentIndex) => {
  console.log(currentIndex);
  currentEl.innerHTML = noteObj[notes[currentIndex]];
  let notesCopy = [...notes];
  let notesFromKey = [...notesCopy.splice(currentIndex, 12), ...notesCopy];
  notesFromKey.forEach((item, index) => {
    document.querySelector('.degree--' + item).innerHTML = degrees[index];
  });

  if (window.Worker) {
    worker.postMessage({
      type: 'keyChange',
      value: noteObj[notes[currentIndex]],
    }); // Send data to our worker.
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
        selectedNotes = e.data;
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
