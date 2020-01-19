let data = [];

const handleChange = (e) => {
  if (data.includes(e.data.value)) {
    data = data.filter(item => {
      return item !== e.data.value;
    });
  } else {
    data.push(e.data.value);
  }

  return data;
};

const handleReset = (e) => {
  data = e.data.value;
  return data;
}

self.addEventListener('message', function(e) {
  switch (e.data.type) {
    case 'change':
      handleChange(e);
      break;
    case 'reset':
      handleReset(e);
      break;
  }

  self.postMessage(data);
}, false);
