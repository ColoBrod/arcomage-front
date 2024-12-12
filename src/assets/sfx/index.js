
let samples;
const dmgPlay = document.querySelector("section#damage button[name='play']");
const dmgPause = document.querySelector("section#damage button[name='pause']");
const dmgStop = document.querySelector("section#damage button[name='stop']");

const brickPlay = document.querySelector("section#brick_up button[name='play']");
const brickPause = document.querySelector("section#brick_up button[name='pause']");
const brickStop = document.querySelector("section#brick_up button[name='stop']");

const audioContext = new AudioContext();
const volume = audioContext.createGain();
volume.gain.value = 0.2;

const samplePaths = ["./damage.mp3", "./brick_up.mp3"];
setupSamples(samplePaths).then(res => samples = res);





async function getFile(filePath) {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function setupSamples(paths) {
  const audioBuffers = [];
  for (const path of paths) {
    const sample = await getFile(path);
    audioBuffers.push(sample);
  }
  return audioBuffers;
}

function playSample(audioBuffer, time) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(volume);
  // sampleSource.connect(audioContext.destination);
  volume.connect(audioContext.destination);
  sampleSource.start(time);
  return sampleSource;
}



dmgPlay.addEventListener("click", () => {
  const playing = playSample(samples[0], 0);
});

dmgPause.addEventListener("click", () => {
});

dmgStop.addEventListener("click", () => {
});

brickPlay.addEventListener("click", () => {
  const playing = playSample(samples[1], 0);
});

brickPause.addEventListener("click", () => {
});

brickStop.addEventListener("click", () => {
});



