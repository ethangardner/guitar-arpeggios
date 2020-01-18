console.log('from the worker file');

self.onmessage = ({ data: { text } }) => {
  self.postMessage({ text: text + text });
};
