// Input:
// computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

// Output:
// 143545000

const ComputeAmount = function() {
  this.total = 0;

  this.lacs = function (val) {
    this.total += val * 100000;
    return this;
  };

  this.crore = function (val)  {
    this.total += val * 10000000;
    return this;
  };

  this.thousand = function (val) {
    this.total += val * 1000;
    return this;
  };

  this.value = function (){
     return this.total;
  };
}

// Usage
const computeAmount1 = new ComputeAmount();
const computeAmount2 = new ComputeAmount();
const res2 = computeAmount2.lacs(15).crore(5).value();
const res1 = computeAmount1.lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();
console.log(res1); // Output: 143545000
console.log(res2); // Output: 1500000

