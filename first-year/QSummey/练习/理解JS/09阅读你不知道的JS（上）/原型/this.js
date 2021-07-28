function bar () {
    console.log(this);
    function far() {
        console.log(this);
    }
    far()
}
var obj = {
    age: 1
}
bar.call(obj);


function bar () {
    console.log(this);

    var _this = this;
    function far() {
        console.log(_this);
    }
    far()
}
var obj = {
    age: 1
}
bar.call(obj);


function bar () {
    console.log(this);

    var far = () => {
        console.log(this);
    }
    far()
}
var obj = {
    age: 1
}
bar.call(obj);

