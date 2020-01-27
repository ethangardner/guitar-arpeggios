const noteObj = {
  'a': 'A',
  'a-sharp': 'A#/Bb',
  'b': 'B',
  'c': 'C',
  'c-sharp': 'C#/Db',
  'd': 'D',
  'd-sharp': 'D#/Eb',
  'e': 'E',
  'f': 'F',
  'f-sharp': 'F#/Gb',
  'g': 'G',
  'g-sharp': 'G#/Ab'
};

const degrees = [
  '1',
  'b2',
  '2',
  'b3',
  '3',
  '4',
  'b5',
  '5',
  '#5',
  '6',
  'b7',
  '7'
];

const scaleDegrees = () => {
  const currentEl = document.querySelector('.key__current');
  let notes = Object.keys(noteObj);
  let currentIndex = 0;
  currentEl.innerHTML = noteObj[notes[currentIndex]];
  notes.forEach((item, index) => {
    document.querySelector('.control--' + item + ' .degree').innerHTML = degrees[index];
  });

  document.querySelector('.key').addEventListener('click', e => {
    e.preventDefault();

    if (e.target.matches('.key__nav--previous') && currentIndex > 0) {
      currentIndex--;
      currentEl.innerHTML = noteObj[notes[currentIndex]];
      let notesCopy = [...notes]
      let notesFromKey = [...notesCopy.splice(currentIndex, 12), ...notesCopy];
      notesFromKey.forEach((item, index) => {
        document.querySelector('.control--' + item + ' .degree').innerHTML = degrees[index];
      });
    } else if (e.target.matches('.key__nav--next') && currentIndex <= notes.length - 2) {
      currentIndex++;
      currentEl.innerHTML = noteObj[notes[currentIndex]];
      let notesCopy = [...notes]
      let notesFromKey = [...notesCopy.splice(currentIndex, 12), ...notesCopy];
      notesFromKey.forEach((item, index) => {
        document.querySelector('.control--' + item + ' .degree').innerHTML = degrees[index];
      });
    }
   
  });
};

scaleDegrees();
