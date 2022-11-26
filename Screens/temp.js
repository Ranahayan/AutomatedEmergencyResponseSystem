// function temp() {
//   setTemp("Hayan");
// }
// module.exports = temp
const init = function () {
  console.log("first", a);
};

const sec = function () {
  console.log("ali");
};

sec.prototype.init = init;
sec();
sec.init();
