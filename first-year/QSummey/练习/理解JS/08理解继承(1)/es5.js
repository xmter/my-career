// 继承

// 父类
function Super() {
    this.x = 1;
    this.y = 2;
    this.z = 100;
    this.xxx = function () {
        console.log('父类实例享方法');
    }
    this.arr = [1,2,3];
}
Super.prototype.x = 8;
Super.prototype.fff = function () {
    console.log('父类共享方法');
};
Super.hhh = function () {
    console.log('父类静态方法');
};
// 子类
function Sub() {
    Super.call(this); // 子类只具有父类实例的属性和方法  ，这样导致 Sub实例为Sub { x: 3, y: 4, z: 100, xxx: [Function] }
    this.x = 3;
    this.y = 4;
}

Sub.prototype = Object.create(Super.prototype);  // 子类只具有父类原型的属性和方法
// Sub.prototype = new Super(); // 子类会具有父类原型的属性和方法 也会具有父类实例的属性和方法,但是 Sub实例依旧为Sub { x: 3, y: 4 }

// Sub.prototype.__proto__ = Super.prototype; 等价于 Sub.prototype = Object.create(Super.prototype);  和  Sub.prototype.constructor = Sub;

Sub.prototype.constructor = Sub;
Sub.prototype.sss = function () {
    console.log('子类共享方法');
}
// 静态属性方法继承
Sub.__proto__ = Super;

// Object.create(Super.prototype) 返回一个实例，实例的原型是Super.prototype，也就是说实例继承自Super.prototype。
//Sub.prototype是子类的原型，要将它赋值为Object.create(Super.prototype)，而不是直接等于Super.prototype。否则后面两行对Sub.prototype的操作，会连父类的原型Super.prototype一起修改掉。



const sub1 = new Sub();
console.log(sub1); //Sub { x: 3, y: 4 }

sub1.fff();
console.log(sub1.x); // 3

console.log(sub1.z); // undefined   |  100
// sub1.xxx(); //sub1.xxx is not a function |  父类实例享方法

const sub2 = new Sub();
sub2.arr.push(4);
console.log(sub1.arr); // [ 1, 2, 3 ]  |  [ 1, 2, 3, 4 ]

Sub.hhh();

console.log(Sub.prototype.constructor);


/**
 * 问题1：继承父类是要部分继承（只原型）还是整体继承？ 觉得Super.call(this);和 Sub.prototype = Object.create(Super.prototype); 搭配的最好
 * 问题2：先创造子类实例的this，再将父类的属性方法添加到this上(Super.call(this))
 * 问题3：模拟了静态属性和方法的继承
 */