import Worker from '../worker';
const activeClassName = 'is-active';
const visibleClassName = 'is-visible';

const clearVisible = () => {
  document.querySelectorAll('.is-visible').forEach(item => {
    item.classList.remove(visibleClassName);
  })
};

const handleClear = () => {
  document.querySelectorAll('.is-visible, .is-active').forEach(item => {
    item.classList.remove(activeClassName);
    item.classList.remove(visibleClassName);
  })
};

const main = () => {
  if (window.Worker) {
    const worker = new Worker();
    const form = document.querySelector('.controls__form');
    let data = [];

    worker.addEventListener('message', function(e) {
      data = e.data;
    }, false);

    document.querySelector('.control__list').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.matches('a')) {
        worker.postMessage({
          type: 'change',
          value: e.target.getAttribute('data-note')
        }); // Send data to our worker.

        if(e.target.classList.contains(activeClassName)) {
          e.target.classList.remove(activeClassName);
        } else {
          e.target.classList.add(activeClassName);
        }
      }
    });


    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearVisible();
      let notes = data.map(item => {
        return '.' + item;
      })
      document.querySelectorAll(notes.join(', ')).forEach(item => {
        item.classList.add(visibleClassName);
      })
      console.log(data);

    }, false);
  }
};

main();

export default main;
