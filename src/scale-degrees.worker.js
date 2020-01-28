var notes = [
  'a',
  'a-sharp',
  'b',
  'c',
  'c-sharp',
  'd',
  'd-sharp',
  'e',
  'f',
  'f-sharp',
  'g',
  'g-sharp'
];

var handleKeyChange = function(e) {
  e.preventDefault();
  var position = parseInt(e.data.value, 10);
  var notesCopy = notes.slice(0, 12);

  var notesFromKey = notesCopy.splice(position, 12).concat(notesCopy);
  return notesFromKey;
};

self.addEventListener(
  'message',
  function(e) {
    switch (e.data.type) {
      case 'keyChange':
        self.postMessage(handleKeyChange(e));
        break;
      default:
        self.postMessage(e.data);
        break;
    }
  },
  false
);
