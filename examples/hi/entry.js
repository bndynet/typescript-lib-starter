const render = () => {
  const lib = window['typescript-lib-starter'];
  if (lib && document.getElementById('sum')) {
    document.getElementById('sum').innerHTML = lib.plus(1, 1);
  }
  return Promise.resolve();
};

((global) => {
  global['examples-hi'] = {
    bootstrap: () => {
      return Promise.resolve();
    },
    mount: () => {
      return render();
    },
    unmount: () => {
      return Promise.resolve();
    },
  };
})(window);