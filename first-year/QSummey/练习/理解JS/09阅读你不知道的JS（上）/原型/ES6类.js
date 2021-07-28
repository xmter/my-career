// 没有定义constructor方法，这个方法会被默认添加

// constructor()方法默认返回实例对象（即this）

// 类的方法都定义在prototype对象上面

// get / set 在 ClassName.prototype即原型上


// 再谈谈this
class Logger {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
console.log(logger);
const {printName} = logger; // 厉害
console.log(printName);
printName();  // this指向又问题了


// 解决办法1

class Logger {
    constructor() {
        // 办法: constructor绑定this
        this.printName = this.printName.bind(this);
    }

    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
console.log(logger);
const {printName} = logger; // 可以获取
console.log(printName);
printName();

// 解决办法2
class Logger {
    // 办法： 剪头函数
    printName = (name = 'there') => {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
console.log(logger);
const {printName} = logger; // 可以获取
console.log(printName);
printName();


// 解决办法3

class Logger {

    // 办法： 剪头函数
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}


function selfish(target) {
    const cache = new WeakMap();
    const handler = {
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                // 主要的一步
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy;
}

// proxy
const logger = selfish(new Logger());

console.log(logger);
const { printName } = logger; // 厉害
console.log(printName);
printName();

// 继承
// super(x, y); // 调用父类的constructor(x, y)

// constructor 中：super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。,super指向父类的原型对象,所以定义在父类实例上的方法或属性，是无法通过super调用的。

// 普通方法中：super.print() 其实 A.prototype.print.call(this) // this为子类实例

// 静态方法中，这时super将指向父类，而不是父类的原型对象。方法内部的this指向 子类 而不是父类


// 对

// （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。