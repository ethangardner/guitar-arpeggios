require('./js/polyfill.includes.js');
var data = [];

var handleChange = function(e) {
  if (data.includes(e.data.value)) {
    data = data.filter(function(item) {
      return item !== e.data.value;
    });
  } else {
    data.push(e.data.value);
  }

  return data;
};

const handleReset = function(e) {
  data = e.data.value;
  return data;
};

self.addEventListener(
  'message',
  function(e) {
    switch (e.data.type) {
      case 'change':
        handleChange(e);
        break;
      case 'reset':
        handleReset(e);
        break;
    }

    self.postMessage(data);
  },
  false
);
