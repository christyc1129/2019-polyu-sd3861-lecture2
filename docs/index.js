// May cointain traces of bugs
​
const path = document.getElementById("mountain");
const svg = document.getElementById("svg");
​
window.onload = () => generateMountain();
​
const themes = {
  rocky: ["#7e949c", "#cad7db"],
  desert: ["#ab9457", "#ccb372"],
  jungle: ["#405438", "#587d48"],
  icy: ["#4c7b8c", "#91c7db"]
};
​
function generateMountain() {
  svg.classList.add("pop");
  path.classList = "";
  setTimeout(function() {
    let peaksCount = getRandomInt(6) + 2;
    console.log(peaksCount);
    let peaks = [];
    let seperations = generateRandomSeperation(100, peaksCount * 2, 10);
​
    for (var i = 0; i < peaksCount; i++) {
      peaks.push([]);
    }
    svg.classList = "";
​
    setTimeout(function() {
      svg.classList.remove("pop");
    }, 300);
    document.querySelectorAll(".highlight").forEach(e => e.remove());
    document.querySelectorAll(".wrapper").forEach(e => e.remove());
    document.querySelectorAll(".cloud").forEach(e => e.remove());
​
    peaks = peaks.map((val, i) => {
      let peakHeight = getRandomInt(40 - 35) + 35;
      let peakDrop = getRandomInt(peakHeight);
      let midPoint = Math.floor(peaksCount / 2);
      let amp = peaksCount < 6 ? 0.15 : 0.05;
      let f = Math.random() <= 5 ? 1.75 : 2.5;
      f = Math.random() <= 5 ? f : 2;
      // Amplify middle
      if (i < peaksCount / 3) {
        peakHeight = peakHeight / f;
        peakDrop = peakDrop * 0.04; // peakDrop / 5;
      }
​
      if (i > peaksCount / 3) {
        peakHeight = peakHeight * amp; // peakHeight / 2;
        peakDrop = peakDrop; // peakDrop / 5;
      }
​
      if (i == midPoint) {
        peakHeight = getRandomInt(15 - 8) + 8;
        peakDrop = peakDrop ;
      }
      let chunkedSeps = chunk(seperations, 2);
​
      val = [
        chunkedSeps[i][0] + " " + String(peakHeight * -1),
        chunkedSeps[i][1] + " " + String(peakDrop)
      ];
      val.push(peakHeight);
​
      return val;
    });
​
    draw(peaks, 10);
    drawClouds();
    theme();
  }, 200);
}
​
function chunk(arr, size) {
  let out = Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
  return out;
}
function draw(peaks, distance) {
  let d = "M 0 100 v " + distance * -1;
​
  for ([i, peak] of peaks.entries()) {
    let up = addNoise(peak[0]);
    let down = addNoise(peak[1]);
    let highlightMove = "";
    let leftPosition = null;
​
    let movement = " l " + up + " l " + down;
​
    if (i > 0) {
      for (var index = 0; index < i; index++) {
        let prevUp = peaks[index][0];
        let prevDown = peaks[index][1];
        highlightMove = highlightMove.concat(" m " + prevUp + " m " + prevDown);
        leftPosition +=
          parseFloat(prevUp.split(" ")[0]) + parseFloat(prevDown.split(" ")[0]);
      }
      highlightMove = highlightMove.concat(" m " + up + " l " + down);
      leftPosition +=
        parseFloat(up.split(" ")[0]) + parseFloat(down.split(" ")[0]);
    } else {
      highlightMove = highlightMove.concat("m " + up + " l " + down);
      leftPosition +=
        parseFloat(up.split(" ")[0]) + parseFloat(down.split(" ")[0]);
    }
​
    d = d.concat(movement);
    drawHighlight(highlightMove, leftPosition, peak[2]);
  }
​
  d = d.concat(" V 100 z");
​
  path.setAttribute("d", d);
}
​
function drawHighlight(highlightMove = "", leftPosition = null, peakHeight) {
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let d = "M 0 100 v -10 ";
  let noise = "l -10 0 l -8 -10 l -0.5 -5";
  noise = Math.random() <= 0.33 ? noise : "";
  leftPosition =
    Math.random() <= 0.5
      ? leftPosition - getRandomInt(40 - 30) + 30
      : leftPosition + getRandomInt(20 - 10) + 10;
​
  d = d.concat(highlightMove);
​
  d = d.concat(" L " + String(leftPosition) + " 100 " + noise + " z");
​
  path.setAttribute("d", d);
  path.setAttribute("fill", "#ccb372");
  path.setAttribute("fill-rule", "evenodd");
  path.classList.add("highlight");
  svg.appendChild(path);
}
​
function addNoise(path) {
  // TODO maybe one day but I'm scared.
​
  return path;
}
​
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
​
function generateRandomSeperation(number, parts, min) {
  var randombit = number - min * parts;
  var out = [];
​
  for (var i = 0; i < parts; i++) {
    out.push(Math.random());
  }
​
  var mult =
    randombit /
    out.reduce(function(a, b) {
      return a + b;
    });
​
  return out.map(function(el) {
    return el * mult + min;
  });
}
​
function theme() {
  var keys = Object.keys(themes);
  let theTheme = themes[keys[(keys.length * Math.random()) << 0]];
  let timeOfDay = getRandomInt(8);
​
  timeOfDay = Math.random() <= 0.5 ? 3 : timeOfDay;
​
  let dynamicShifting = [
    ["#684f71"],
    ["#b292bd"],
    ["#cfd9f3"],
    ["#fbfff2"],
    ["#313b65"],
    ["#415261"],
    ["#3c4956"],
    ["#423d33"]
  ]; // [mountain, cloud]
​
  let highlights = document.getElementsByClassName("highlight");
  let clouds = document.getElementsByClassName("cloud");
  mountain.style.fill = theTheme[0];
​
  for (highlight of highlights) {
    highlight.style.fill = theTheme[1];
    highlight.classList.add("slidein");
  }
​
  path.classList.add("slidein");
​
  for (cloud of clouds) {
    cloud.style.fill = dynamicShifting[timeOfDay];
  }
​
  svg.classList.add("sky-gradient-" + timeOfDay);
}
​
// WARNING: Massive amount of path coordinates below
​
function drawClouds() {
  const cloudPaths = [
    "M97.8 53.64a3 3 0 0 0-1-.3l-.39-.21a.14.14 0 0 0-.17 0 .86.86 0 0 0-.67-.12 3.39 3.39 0 0 0-.53-.28l-.07-.06a1.43 1.43 0 0 0-1.28-.14 4.19 4.19 0 0 0-1.16.18 2.85 2.85 0 0 0-1.18-.59 1.66 1.66 0 0 0-.38-.65 2.45 2.45 0 0 0-3.17-.43c-.4-1.11-1.15-1.44-1.88-.84a3.5 3.5 0 0 0-3.92-2 4 4 0 0 0-.72-2.48 3.94 3.94 0 0 0-4.91-1.38 2.72 2.72 0 0 0-1.92-3 3.64 3.64 0 0 0-.45-.11l-.35-.1a2.78 2.78 0 0 0-2.75.87 2 2 0 0 0-2.25-.64 2.15 2.15 0 0 0-1 .79A3.59 3.59 0 0 0 63.09 41a2.53 2.53 0 0 0-1.42 1.6 4.53 4.53 0 0 0-3.12-1.71 5.26 5.26 0 0 0-3.82.88l-.28-.23a7.41 7.41 0 0 0-5.12-1.57 8.92 8.92 0 0 0-5.69-5.12 6.24 6.24 0 0 0-6.46 2.39 5 5 0 0 0-.76 1.7 3.66 3.66 0 0 0 0 1c-.23.11-.46.24-.69.37h-.19a3.47 3.47 0 0 0-5.12-.31 3.61 3.61 0 0 0-1 .39 3.56 3.56 0 0 0-1.78 2.79 2.58 2.58 0 0 0-1.47-.3 2.29 2.29 0 0 0-1.8 3.12 5.73 5.73 0 0 0-2 .67 3.35 3.35 0 0 0-3.92 1 3.37 3.37 0 0 0-2 1.37 2.71 2.71 0 0 0-3.19.21 3.17 3.17 0 0 0-1.13 1.87v.14l-.24.06a1.9 1.9 0 0 0-.54.34 2.42 2.42 0 0 0-2.66.34 1.92 1.92 0 0 0-.35.44l-.39.1a5.51 5.51 0 0 1-1.25.24 2.86 2.86 0 0 0-.7-.19 3.12 3.12 0 0 0-1.5.09l-.19.08-1-.06a1.1 1.1 0 0 0-1.05 1.46 1.31 1.31 0 0 0 0 .67.66.66 0 0 0 .48.53.83.83 0 0 0 .29.28 1 1 0 0 0 1.27-.33 1 1 0 0 0 .7.44c.66.11 1.37.22 2.08.29a1.73 1.73 0 0 0 1.27.71 1.41 1.41 0 0 0 1-.5 1.18 1.18 0 0 0 .07-.25l.35-.09a3.24 3.24 0 0 0 2.31.87 3.36 3.36 0 0 0 1.68-.78 4.46 4.46 0 0 0 2.69.88 1.93 1.93 0 0 0 1.41-.43A2.81 2.81 0 0 0 19 57.48a1.56 1.56 0 0 0 1.6-.22 3.34 3.34 0 0 0 1.51 1.11A3.46 3.46 0 0 0 25.69 57h.07l.92.37c1.48 1.66 4.83 2.2 6.69 1.68a6.61 6.61 0 0 0 1.87-.86 6.45 6.45 0 0 0 1.56-.73 4.28 4.28 0 0 0 .9-.8 4.39 4.39 0 0 0 1.84.28 2.34 2.34 0 0 0 1.25-.51c2.08 1.42 4.59 2.82 7 2.42A7.29 7.29 0 0 0 50.2 58a8 8 0 0 0 5.2.87 2.34 2.34 0 0 0 1.51-.95l.41-.07a6.3 6.3 0 0 0 4 .3 4.06 4.06 0 0 0 2.75.25 3.52 3.52 0 0 0 1.72-1.21 2.53 2.53 0 0 0 1.15-.45l.2-.15a.91.91 0 0 0 .58.23h.21a2.24 2.24 0 0 0 1.29-.09 4 4 0 0 0 2.11 1.29 2 2 0 0 0 2.42-1.1l.12-.26a1 1 0 0 0 .23.05 6.11 6.11 0 0 0 3 1.3c1.23.15 3.12-.29 3.83-1.38a1.68 1.68 0 0 0 .6-.31l.23.1a.91.91 0 0 0 .83.76c.78 0 1.38.77 2.14 1a2.91 2.91 0 0 0 1.86-.21 2.41 2.41 0 0 0 1.29-1.36 2.29 2.29 0 0 0 .93-.28 2.1 2.1 0 0 0 .79-.8c.87 0 1.74-.1 2.61-.17a2.31 2.31 0 0 0 1.66.73 2.08 2.08 0 0 0 1.67-.78v-.06c.15-.1 1.62-.12 1.75-.24a.93.93 0 0 0 .1-.12.2.2 0 0 0 .12-.11.87.87 0 0 0 .06-.32.74.74 0 0 0 0-.16.15.15 0 0 0 0-.09l.18-.14a.19.19 0 0 0 .05-.43zm-67-6a3.66 3.66 0 0 1-.22.44 3.68 3.68 0 0 0 .22-.44zm2-.58a3.35 3.35 0 0 0 .47-.12 3.24 3.24 0 0 1-.47.12zm1.76-.85a3.67 3.67 0 0 1-.38.3 3.56 3.56 0 0 0 .39-.26zm-.45.34l-.37.21a3.61 3.61 0 0 0 .38-.17zm-.4.23a3.49 3.49 0 0 1-.43.17 3.54 3.54 0 0 0 .43-.14zm20.62 6.82l-.17.08zm17.73-4a2.36 2.36 0 0 0 .42.54 2.37 2.37 0 0 1-.41-.55zm4.82 2.61a1.88 1.88 0 0 1-.33-.11 1.88 1.88 0 0 0 .34.11zm-47.37-3a1.94 1.94 0 0 1-.41.16 1.94 1.94 0 0 0 .42-.13zm-12 5l-.22.06zm-.31.08h-.21zm.63-.21l-.23.09zm-2.33-.48a2 2 0 0 0 .23.3 2 2 0 0 1-.23-.3zm.86.7l.18.05zm-.55-.3a1.6 1.6 0 0 0 .17.15 1.61 1.61 0 0 1-.17-.15zm.27.2l.17.09zm.57.18zM18 54a4.58 4.58 0 0 0 .74-.51A4.58 4.58 0 0 1 18 54zm9.58-4.9a2.3 2.3 0 0 0 .48.23 2.3 2.3 0 0 1-.5-.2zm.55.25a1.83 1.83 0 0 0 .44.08 1.83 1.83 0 0 1-.46-.05zm.52.08a1.74 1.74 0 0 0 .42 0 1.75 1.75 0 0 1-.44.03zm.89-.22a2.34 2.34 0 0 0 .37-.26 2.33 2.33 0 0 1-.39.28zm.42-.29a2.86 2.86 0 0 0 .31-.32 2.85 2.85 0 0 1-.33.34zm.63-.76a3.36 3.36 0 0 1-.26.38 3.36 3.36 0 0 0 .23-.36zm28.31 4a2.12 2.12 0 0 0 1.53 1.1 2.1 2.1 0 0 1-1.55-1.11zm-.24-.7c0 .08 0 .16.07.24-.05-.08-.08-.16-.1-.24zm.1.36a2.5 2.5 0 0 0 .13.3 2.52 2.52 0 0 1-.16-.3zm8.2-.16a2.65 2.65 0 0 0 1-.46 2.64 2.64 0 0 1-1.02.46zm1.11-.54a3.18 3.18 0 0 0 .31-.29 3.16 3.16 0 0 1-.33.28zm.42-.4a3.85 3.85 0 0 0 .34-.45 3.87 3.87 0 0 1-.36.44zm7.31.72a2 2 0 0 0 .3.35 2 2 0 0 1-.32-.36zm.66.61a1.8 1.8 0 0 1-.33-.23 1.81 1.81 0 0 0 .31.18zm.59.2a2.27 2.27 0 0 0 .53 0 2.28 2.28 0 0 1-.58-.01z",
​
    "M98.56 40a1.77 1.77 0 0 0-1.48-.61 10.36 10.36 0 0 0-1.84.28.86.86 0 0 1-.28 0 .18.18 0 0 0 0-.07c-.45-.46-1.38-.82-1.91-.38a1.81 1.81 0 0 1-.51 0 15.22 15.22 0 0 0-1.61-.36 1.86 1.86 0 0 0-1.51.57 2.1 2.1 0 0 0-.14-.53 2 2 0 0 0-1.35-1.18l-.17-.1a4.23 4.23 0 0 0-4.09.08 2.25 2.25 0 0 0-1.51.3 3.22 3.22 0 0 0-2.88-.27 5.4 5.4 0 0 0-8-1.78 3.2 3.2 0 0 0-2-1 3.63 3.63 0 0 0-1.11 0 8.86 8.86 0 0 0-10.57-6.64 8.36 8.36 0 0 0-2.84 1.28l-.16-.17a4.54 4.54 0 0 0-2.3-6.59A4.78 4.78 0 0 0 49 23a8 8 0 0 0-2.87-.6 7.7 7.7 0 0 0-.94 0 6.4 6.4 0 0 0-2.61-.78 4.78 4.78 0 0 0-4.06 1.77 5.62 5.62 0 0 0-3.88-1.28 4.93 4.93 0 0 0-4.46 6 3.34 3.34 0 0 0-.37 1.1 2.91 2.91 0 0 0-1.46 1.44 4.87 4.87 0 0 0-.94 2.55 2.77 2.77 0 0 0 3.91 2.77 3.29 3.29 0 0 0 1.82-.17l1.47-.55a2.59 2.59 0 0 0 .46-.17l1.09-.38a4.69 4.69 0 0 0 3.9 2 11.59 11.59 0 0 0-1.77 2.07c-.88-1.82-3.65-2.27-4.94-2A7.77 7.77 0 0 0 30 38.44c-.31.28-.24.12-.66.28a1.37 1.37 0 0 1-.54.07 3.77 3.77 0 0 0-.47-.07c-.52-.12-1.05-.37-1.49-.48a8.78 8.78 0 0 0-3.3-.32c-1.3-2.33-4.87-.62-4.47 2a1.41 1.41 0 0 0-.39 0 7 7 0 0 1-1.06 0 4.4 4.4 0 0 0-3.36-1.12 3.88 3.88 0 0 0-2.73 2 2.15 2.15 0 0 0-1.41.15c-.33.15-.57.47-.88.61-.71.32-1.28 0-1.95-.12a14.74 14.74 0 0 0-2.56.34 5.79 5.79 0 0 0-1.2.14h-.4a.91.91 0 0 0-.26.06H2.21a2.18 2.18 0 0 0-.93.35 3.36 3.36 0 0 0-.66.49c-.13.13 0 .33.19.29.13 1 4.65 1.69 4.21 1.14.72.87 1.79.26 1.92.23.55-.1.22-.12.81 0a5.73 5.73 0 0 0 1.43.35 1.56 1.56 0 0 0 .42-.11 6.2 6.2 0 0 0 .78-.36h.11l.36.06c2 .32 3.95.69 5.92.85a2.66 2.66 0 0 0 2.51-.79 2.71 2.71 0 0 1 .65-.06c.44 0 1 .42 1.45.47a3.59 3.59 0 0 0 2.12-.44 3.17 3.17 0 0 0 2.5 1.1 2.23 2.23 0 0 0 1.59-.55 5.19 5.19 0 0 0 .56.31c-.23.35-.71.51-1.08.75s-.09.3-.78.25c-.28 0-.31-.11-.59-.06a1 1 0 0 0-.55.32c-.42-.25-1-.05-1.49-.16a1.73 1.73 0 0 0-1.47.19 4 4 0 0 1-1.47.11 9.31 9.31 0 0 1-1 .16c-.45 0-.68 0-.93.41 0 .07 0 .14.09.15a.93.93 0 0 0-.12.46.84.84 0 0 0 .74.81.54.54 0 0 0 .32 0 1.22 1.22 0 0 0 1.83.39s.59.42.91-.07a3.84 3.84 0 0 0 2.65.18 3.11 3.11 0 0 0 1.68.27.62.62 0 0 0 .38-.18 2.51 2.51 0 0 0 3.2-.13c.79.58 1.65-.23 2-.84a7.5 7.5 0 0 0 1.69.38 2.44 2.44 0 0 0 1.49.12 2.23 2.23 0 0 0 3.28-1 4.86 4.86 0 0 0 .82.54 4.6 4.6 0 0 0 3.65.19 5 5 0 0 0 3.07-.49 4.67 4.67 0 0 0 4.11 2.38c1.59 0 3.55-.83 4.18-2.29h.07a7.62 7.62 0 0 0 1.64.36 5.63 5.63 0 0 0 3.16 3.47 11.92 11.92 0 0 0 6.39.45 4.33 4.33 0 0 0 3-1.2 8.35 8.35 0 0 0 1-.71 4.44 4....