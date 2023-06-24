((global) => {
  global['{{app}}'] = {
    bootstrap: () => {
      console.log('{{app}} bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('{{app}}  mount');
      return Promise.resolve();
    },
    unmount: () => {
      console.log('{{app}}  unmount');
      return Promise.resolve();
    },
  };
})(window);