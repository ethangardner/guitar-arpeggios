import Worker from '../main.worker';
const activeClassName = 'is-active';
const visibleClassName = 'is-visible';
let worker;
let selectedNotes = [];

if (window.Worker) {
  worker = new Worker();
}

const clearVisible = () => {
  document.querySelectorAll('.is-visible').forEach(item => {
    item.classList.remove(visibleClassName);
  });
};

const handleClear = e => {
  selectedNotes = [];
  document.querySelectorAll('.is-visible, .is-active').forEach(item => {
    item.classList.remove(activeClassName);
    item.classList.remove(visibleClassName);
  });


  if (typeof window.gtag !== 'undefined') {
    gtag('event', 'clear', {
      'event_category' : 'form',
      'event_label' : 'guitar arpeggio'
    });
  }

  if (window.Worker) {
    worker.postMessage({
      type: 'reset',
      value: selectedNotes,
    });
  }
};

const handleNoteSelect = e => {
  e.preventDefault();
  if (e.target.matches('a') && window.Worker) {
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

const handleSubmit = e => {
  e.preventDefault();
  clearVisible();

  if (typeof window.gtag !== 'undefined') {
    gtag('event', 'submit', {
      'event_category' : 'form',
      'event_label' : 'guitar arpeggio'
    });
  }


  let notes = selectedNotes.map(item => {
    return '.' + item;
  });

  if (notes.length > 0) {
    document.querySelectorAll(notes.join(', ')).forEach(item => {
      item.classList.add(visibleClassName);
    });
  }
};

const main = () => {
  if (window.Worker) {
    const form = document.querySelector('.controls__form');

    worker.addEventListener(
      'message',
      e => {
        selectedNotes = e.data;
      },
      false
    );

    document.querySelector('.control__list').addEventListener('click', e => {
      return handleNoteSelect(e);
    });

    form.addEventListener(
      'submit',
      e => {
        return handleSubmit(e);
      },
      false
    );

    form.addEventListener(
      'reset',
      e => {
        return handleClear(e);
      },
      false
    );
  }
};

main();

export default main;
