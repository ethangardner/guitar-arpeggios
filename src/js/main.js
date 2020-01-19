import Worker from '../worker';
// import Worker from "worker-loader!../worker";

const main = () => {
  if (window.Worker) {
    console.log('has worker');
    const worker = new Worker();
    worker.addEventListener('message', function(e) {
      console.log('Worker said: ', e.data);
    }, false);

    document.querySelector('.control__list').addEventListener('click', (el) => {
      if (el.target.matches('a')) {
        worker.postMessage(el.target.getAttribute('data-note')); // Send data to our worker.
      }
    })
  }
};

main();

export default main;
