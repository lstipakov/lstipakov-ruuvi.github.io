var ruuvitrackerState = 0;

function animateRuuviTracker() {
  var ruuvitracker = $('#ruuvitracker1');
  var button = $('#button1');
  console.log(ruuvitrackerState);
  switch(ruuvitrackerState) {
    case 0:
      ruuvitracker.html('<div class="ruuvitracker-butt"></div><div class="rgb blue"><div class="pattern flashing"></div></div>')
      button.text('Listening for Wi-Fi credentials');
      break;
    case 1:
      ruuvitracker.html('<div class="ruuvitracker-butt"></div><div class="rgb green"><div class="pattern flashing"></div></div>')
      button.text('Connecting to the Wi-Fi network');
      break;
    case 2:
      ruuvitracker.html('<div class="ruuvitracker-butt"></div><div class="rgb cyan"><div class="pattern flashing"></div></div>')
      button.text('Connecting to the Spark Cloud');
      break;
    case 3:
      ruuvitracker.html('<div class="ruuvitracker-butt"></div><div class="rgb magenta"><div class="pattern fast flashing"></div></div>')
      button.text('Updating to newest firmware');
      break;
    case 4:
      ruuvitracker.html('<div class="ruuvitracker-butt"></div><div class="rgb cyan"><div class="pattern breathing"></div></div>')
      button.text('Connected!');
      break;
    case 5:
      ruuvitracker.html('<div class="ruuvitracker-butt"></div><div class="rgb"><div class="pattern"></div></div>')
      button.text('Start over');
      break;
  }
  ruuvitrackerState++;
  if (ruuvitrackerState > 5) {
    ruuvitrackerState = 0;
  }
}
