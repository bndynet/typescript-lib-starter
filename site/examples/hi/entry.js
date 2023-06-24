const render = ($) => {
  const lib = window['typescript-lib-starter'];
  if (lib) {
    $('#sum').html(lib.plus(1, 1));
  }
  return Promise.resolve();
};

((global) => {
  global['examples-hi'] = {
    bootstrap: () => {
      return Promise.resolve();
    },
    mount: () => {
      return render($);
    },
    unmount: () => {
      return Promise.resolve();
    },
  };
})(window);