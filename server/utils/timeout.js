//websocket acknowledgement timeout
const timeout = (callback) => {
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
  }, 5000);

  return (...args) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    callback.apply(this, args);
  };
};

module.exports = timeout;
