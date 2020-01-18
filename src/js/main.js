const main = () => {
  if (window.Worker) {
    console.log('has worker');
    const worker = new Worker('./js/worker.bundle.js');
  }
};

main();

export default main;
