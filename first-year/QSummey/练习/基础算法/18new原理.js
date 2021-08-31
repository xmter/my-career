function myNew (){
  const args = [].slice.call(arguments);
  const constructor = args.shift();
  const _this = Object.create(constructor.prototype);
  const result = constructor.apply(_this, args);
  return (typeof result === 'object' && result !==null) ? result: _this;
}


function A () {

}
console.log(myNew(A, 'name', 'xmt'));
