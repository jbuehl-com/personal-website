export function cPropertyVH() {
  // usage:
  // import in js (ha!) and use the function cPropertyVH()
  // declare in css with height: calc(var(--vh, 1vh) * 100)
  function getVH() {
    // custom vh-unit for correct vh-size on mobile
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log("1vh as px is " + vh);
  }
  window.addEventListener('resize', () => {
    getVH();
  });
  getVH();
}