// TODO 理解同事总结的infer

// 函数类型, 函数代有特定属性（cancel)
interface ScrollDebounceFunction {
    (event: Event): void;
    cancel: () => void;
}

// 函数类型, 函数接受一个Event,无返回值
type ScrollDebounceFunction = (event: Event) => void;

// 这里可以先对这个表达式进行拆分
// 我们先定义一个函数类型, 用来比较两个的数的大小，如果第一个参数大于第二个参数就返回true
type AMoreThanB = (a: number, b: number) => boolean;
// 我们再定义一个比较简单的ReturnType
type ReturnType<T extends AMoreThanB> =  T extends AMoreThanB ? boolean : any;
// T extends AMoreThanB ? boolean : any;
// 这个表达式肯定会返回一个类型，
// 这里的? : 有点类似三元运算符，
// T 能赋值给 (a: number, b: number) => boolean
// 不防这样理解，当满足 T extends AMoreThanB时返回boolean，否则返回any


// 再使用这个ReturnType, 因为对T的限定只能是AMoreThanB，我们就传入一个AMoreThanB，然后就得到了Rt
type Rt = ReturnType<AMoreThanB>;
// 这里肯定满足 T extends AMoreThanB，因为我们传入的T就是AMoreThanB，所以得到的Rt一定就是boolean,

// 如果我们传入一个其他的类型
type Rt2 = ReturnType<boolean>;
// 这个时候就报错了，因为我们对T的限制他只能是AMoreThanB类型，或者这么说限制传入的这个函数必须要两个number类型的参数，并且返回一个boolean类型值
// 现在我们放宽点
type ReturnType<T extends (...arg: any) => any > =  T extends AMoreThanB ? boolean : any;
// 现在T可能是任何一个函数

// 我们再定义一个新的函数类型
type TimeoutFuc = (callback: AMoreThanB, delay: number) => number;

// 这个时候我们再次使用这个ReturnType
type Rt3 = ReturnType<TimeoutFuc>;
// 由于TimeoutFuc 不满足 T extends AMoreThanB ，所有返回any,这里的Rt3就是any;

// 还没讲到infer，不着急
// 我们再把ReturnType改进一下
type ReturnType<T extends (...arg: any) => any > = T extends (...arg: any) => any ? boolean : any;
// 这个时候不管传入什么样的函数返回都是boolean, 因为T extends (...arg: any) => any也一定满足。

// 我们想返回一些动态的类型怎么办，或者我们想返回一些和T相关的类型
// 这个时候 infer就出来了
type ReturnType<T extends (...arg: any) => any > = T extends (...arg: any) => infer R ? R : any;
// 这里我们将any 换成了infer R, 并当满足这个条件时把R返回

type Rt4 = ReturnType<TimeoutFuc>;
// 当我们再次使用时，这里的TimeoutFuc，满足 T extends (...arg: any) => infer R 。
// 并且我们还拿到了TimeoutFuc这个函数的返回类型并赋给了R,然后返回R，所以，这里的Rt4就是TimeoutFuc这个函数的返回类型：number

type ReturnType<T extends (...arg: any) => any > = T extends (arg1: infer T, ...arg: any) => infer R ? T | R : any;

// 我们加大难度，这个时候的ReturnType返回的是传入函数类型的第一个参数类型和函数的返回类型的 并
// 这里就等同于
type Rt5 = ReturnType<TimeoutFuc>;
// type Rt5 = number | AMoreThanB;

// infer 的作用就是推断相应的类型.