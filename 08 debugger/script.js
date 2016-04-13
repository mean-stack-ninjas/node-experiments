var x = 5;
setTimeout(() => {
  debugger;
  var message = 'world';
  console.log(message);
}, 1000 * x);
console.log('hello');