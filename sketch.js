let riversData;
let data;
let datasetLength;
let columnWidth;
let highestLength;

function preload() {
  data = loadTable("data/rivers-data.csv", "csv", "header");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  columnWidth = (windowWidth - 20 - (5 * datasetLength)) / datasetLength;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  riversData = data.getObject();
  datasetLength = Object.keys(riversData).length;
  columnWidth = (windowWidth - 20 - (5 * datasetLength)) / datasetLength;

  highestLength = windowHeight - 300;
}

function draw() {
  background(220);
  noStroke();

  let hoveredRiverIndex = floor((mouseX - 10) / (columnWidth + 5));
  let hoveredRiver = riversData[hoveredRiverIndex] ?? riversData[0];

  // Title
  textSize(15);
  fill("black");
  textStyle(BOLD);
  text("RIVERS", 20, 30);

  // River name
  textSize(50);
  textStyle(BOLD);
  fill("#FC6900");
  text(hoveredRiver.name, 20, 80);

  // River length
  textSize(15);
  textStyle(NORMAL);
  fill("black");
  text("Length: " + hoveredRiver.length + " km", 20, 110);
  textSize(15);

  // River countries
  text("Continent: " + hoveredRiver.continent, 20, 130);

  // River countries
  text("Countries: " + hoveredRiver.countries, 20, 150);

  // River temperatures
  text("Temperature: " + hoveredRiver.min_temp + "°C - " + hoveredRiver.max_temp + "°C", 20, 170);

  for(let i = 0; i < datasetLength; i++) {
    let row = riversData[i];
    let x = i * columnWidth;

    drawColumn(10+ x + 5 * i, row);
  }

  fillHoveredColumn(hoveredRiver);
}

function drawColumn(x, data) {
  let length = data.length;
  let mappedLength = map(length, 60, 6700, 10, highestLength);

  fill("grey");
  rect(x, windowHeight, columnWidth, -mappedLength);
  fill("black");
}

function fillHoveredColumn(hoveredRiver) {
  mappedLength = map(hoveredRiver.length, 60, 6700, 10, highestLength);
  let hoveredIndex = floor((mouseX - 10) / (columnWidth + 5));
  fill("#FC6900");
  if(hoveredIndex >= 0 && hoveredIndex < datasetLength) {
    rect(10 + (hoveredIndex * columnWidth) + 5 * hoveredIndex, windowHeight, columnWidth, -mappedLength);
  }
  else {
    rect(10, windowHeight, columnWidth, -mappedLength);
  }
}