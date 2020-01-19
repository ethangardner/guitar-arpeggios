let data = [];

self.addEventListener('message', function(e) {
  data.push(e.data);
  self.postMessage(e.data);
  console.log(data);
}, false);
