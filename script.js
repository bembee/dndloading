(() => {
  let tipps = [];
  let last5tippsNumbers = [];
  const intervallumTime = 15; // seconds
  const lastxNumber = 5;
  let tippsNumber = 0;
  const elem = document.documentElement;

  $(document).ready(function () {
    $.getJSON("hints.json", function (data) {
      $.each(data, function (key, value) {
        tipps[key] = value.label;
      });
      setTips(generateRandomTipp());
    });
    setInterval(function () {
      setTips(generateRandomTipp());
    }, intervallumTime * 1000);
  });

  function setTips(tippNumber) {
    $(tipp).text(tipps[tippNumber]);
  }

  function generateRandomTipp() {
    do {
      tippsNumber = generateRandomNumber();
    } while (last5tippsNumbers.includes(tippsNumber));

    last5tippsNumbers.push(tippsNumber);
    if (last5tippsNumbers.length > lastxNumber) last5tippsNumbers.shift();

    return tippsNumber;
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * tipps.length);
  }

  window.toggleFullScreen = function () {
    if (document.fullscreenElement) {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    } else {
      elem.requestFullscreen?.() ||
        elem.webkitRequestFullscreen?.() ||
        elem.msRequestFullscreen?.();
    }
  };
})();
