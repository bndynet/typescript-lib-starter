((global) => {
  global['examples-hello'] = {
    bootstrap: () => {
      console.log('examples-hello bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('examples-hello  mount');
      return Promise.resolve();
    },
    unmount: () => {
      console.log('examples-hello  unmount');
      return Promise.resolve();
    },
  };
})(window);