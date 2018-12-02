function init() {
  console.log("logging service initilized");
}

function log(err) {
  console.log(err);
}

export default {
  init,
  log
};
