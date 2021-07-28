// 父类
class Super {
    constructor(){
        this.x = 1;
        this.y = 2;
        this.z = 100;
        this.xxx = function () {
            console.log('父类实例方法');
        };
        this.arr = [1,2,3];
    }

    fff() {
        console.log(this); //  原型方法中的this 为 子类实例
        console.log('父类共享方法');
    };

    static hhh() {
        console.log(this); // 静态方法中的this 为 子类
        console.log('父类静态方法');
    };
}


/**
    Sub.prototype = {
        constructor: Sub
        toString() {},
    };
 */
// 子类
class Sub extends Super{
    // 类似ES5 的构造函数Sub
    // 类似ES5 constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
    constructor(x, y) {
      super(); // 继承 父类的 实例属性和方法 ; 即 Super.prototype.constructor.call(this)。
      // 实例属性
      this.x = x;
      this.y = y;
    }

    // 实例属性 新写法
    // 那么constructor方法还有什么用？1.调用super() 2.传入参数x,y ;新写法则无法接受
    bar = 'hello';

    // ES5 原型上的方法
    sss() {
        console.log(this); // 原型方法中的this 为 实例
        super.fff(); // 在子类普通方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例。
        console.log('子类共享方法');
    }

    // 静态方法
    static staticFun() {
        console.log(this === Sub); // 静态方法中的this 为 类
        super.hhh(); //
        return 'hello';
    }

    // 静态属性
    static myStaticProp = 42;

    // 私有属性
    #count = 0;

    // 私有方法
    #sum() {
        return this.#count;
    }
}

const sub1 = new Sub(3,4);
console.log(sub1); //{x: 3, y: 4, z: 100, #sum: ƒ, #count: 0,arr: (3) [1, 2, 3],bar: "hello"}

console.log(sub1.z);
sub1.xxx();

sub1.fff();
sub1.sss();

console.log(Sub.staticFun());
console.log(Sub.myStaticProp);
Sub.hhh(); // 父类的静态方法，可以被子类继承。

const sub2 = new Sub(33,44);
sub2.arr.push(55);
console.log(sub1.arr); // [1,2,3]

// 综上, 子类 继承了 父类的实例属性和方法 ，继承了 父类的共享属性和方法 ，还继承了 静态属性和方法
// 先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`