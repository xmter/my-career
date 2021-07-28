1. 具体看看TS语法和设计原理

* JavaScript only truly provides dynamic typing - running the code to see what happens.
<!-- JavaScript只真正提供动态类型——运行代码后看看会发生什么。 -->

* The alternative is to use a static type system to make predictions about what code is expected before it runs.
<!-- 另一种方法是使用静态类型系统在代码运行之前对代码进行预测。 -->

* JavaScript gives us different behavior and returns the value undefined.
<!-- JavaScript给了我们不同的行为，并返回undefined值 -->

* How quickly can you spot the typos?
<!-- 你能多快发现拼写错误? -->

* we’ll see a hello.js file next to hello.ts. That’s the output from our hello.ts file after tsc compiles or transforms it into a plain JavaScript file.

* "dev": "./node_modules/.bin/tsc --noEmitOnError ./greeter.ts"
<!-- You’ll notice that hello.js never gets updated. -->

* Keep in mind, we don’t always have to write explicit type annotations. In many cases, TypeScript can even just infer (or “figure out”) the types for us even if we omit them.
<!-- 请记住，我们不必总是编写显式类型注释。在很多情况下，TypeScript甚至可以为我们推断(或“找出”)类型，即使我们忽略了它们。 -->

* Type annotations aren’t part of JavaScript (or ECMAScript to be pedantic), so there really aren’t any browsers or other runtimes that can just run TypeScript unmodified. That’s why TypeScript needs a compiler in the first place - it needs some way to strip out or transform any TypeScript-specific code so that you can run it. Most TypeScript-specific code gets erased away, and likewise, here our type annotations were completely erased.

<!-- 类型注释不是JavaScript的一部分(或者说是ECMAScript的一部分)，所以没有任何浏览器或其他运行时可以不加修改地运行TypeScript。这就是为什么TypeScript首先需要一个编译器——它需要一些方法来剥离或转换任何特定于TypeScript的代码，这样你才能运行它。大多数特定于typescript的代码都被删除了，同样，这里我们的类型注释也被完全删除了。 -->

* This can require a little extra work, but generally speaking it pays for itself in the long run, and enables more thorough checks and more accurate tooling. When possible, a new codebase should always turn these strictness checks on.

<!-- 这可能需要一些额外的工作，但一般来说，从长远来看，这是有利可图的，并且可以进行更彻底的检查和更精确的工具。如果可能的话，一个新的代码库应该始终启用这些严格检查。 -->

* Optional Properties last?: string

* TypeScript will only allow you to do things with the union if that thing is valid for every member of the union.

<!-- TypeScript只允许你使用union做事情，前提是它对union的每个成员都有效。 -->

* Because type assertions are removed at compile-time, there is no runtime checking associated with a type assertion. There won’t be an exception or null generated if the type assertion is wrong.
<!-- 因为类型断言是在编译时删除的，所以不存在与类型断言相关联的运行时检查。如果类型断言是错误的，则不会生成异常或空值。 -->
