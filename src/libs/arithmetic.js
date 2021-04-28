import * as math from "mathjs"
let arithmetic = {
  //加法

  add(a, b) {
    return math.add(math.bignumber(a), math.bignumber(b));

  },

  //减法

  subtract(a, b) {
    return math.subtract(math.bignumber(a), math.bignumber(b));

  },

  // 乘法

  multiply(a, b) {
    return math.multiply(math.bignumber(a), math.bignumber(b));

  },

  // 除法

  divide(a, b) {
    return math.divide(math.bignumber(a), math.bignumber(b));

  }

}

export default arithmetic;