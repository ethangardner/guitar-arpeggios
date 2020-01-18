import Worker from '../worker';
// import Worker from "worker-loader!../worker";

const main = () => {
  if (window.Worker) {
    console.log('has worker');
    const worker = new Worker();
  }
};

main();

export default main;
