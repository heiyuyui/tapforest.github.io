function preload(){
	sound = loadSound('natural-ambiences---binaural-forest-mountain-ridge-wind-distant-birds by sonic-bat Artlist.wav');
  }
  
  function setup(){
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.mouseClicked(togglePlay);
	fft = new p5.FFT();
	sound.amp(0.8);
  }
  
  function draw(){
	background("#a6b2de");
  
	let spectrum = fft.analyze();
	noStroke();
	
	fill(247, 204, 252);
	for (let i = 0; i< spectrum.length; i++){
	  let x = map(i, 0, spectrum.length, 0, width);
	  let h = -height + map(spectrum[i], 0, 255, height, 0);
	  rect(x, height, width / spectrum.length, h )
	}
  
	let waveform = fft.waveform();
	noFill();
	beginShape();

	stroke(30);
	for (let i = 0; i < waveform.length; i++){
	  let x = map(i, 0, waveform.length, -width, width);
	  let y = height/2-map( waveform[i], -1, 1, -height*2, height*2);
	  vertex(x,y);
	}
	endShape();

	text('tap into forest', 50, 80);
	textStyle(BOLD);
	textSize(50);

  }
  
  function togglePlay() {
	if (sound.isPlaying()) {
	  sound.pause();
	} else {
	  sound.loop();
	}
  }