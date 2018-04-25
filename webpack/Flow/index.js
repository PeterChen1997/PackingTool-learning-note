// @flow

// 静态类型检查
function square1(n: number): number {
  return n * n
}

square1('2') // Error

// 类型推断检查
function square2(n) {
  return n * n // Error: string不能进行乘法操作
}
square2('2')

// @flow 标示本文件需要被检查