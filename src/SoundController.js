// Music
import musicDion from '~/assets/music/Lineage 2 - Dion Theme.mp3'

// Effects
import brick_down from "~/assets/sfx/brick_down.mp3"
import brick_up from "~/assets/sfx/brick_up.mp3"
import damage from "~/assets/sfx/damage.mp3"
import deal from "~/assets/sfx/deal.mp3"
import defeat from "~/assets/sfx/defeat.mp3"
import gem_down from "~/assets/sfx/gem_down.mp3"
import gem_up from "~/assets/sfx/gem_up.mp3"
import recruit_down from "~/assets/sfx/recruit_down.mp3"
import recruit_up from "~/assets/sfx/recruit_up.mp3"
import shuffle from "~/assets/sfx/shuffle.mp3"
import start from "~/assets/sfx/start.mp3"
import tower_up from "~/assets/sfx/tower_up.mp3"
import typing from "~/assets/sfx/typing.mp3"
import victory from "~/assets/sfx/victory.mp3"
import wall_up from "~/assets/sfx/wall_up.mp3"

const audioContext = new AudioContext();
const volume = audioContext.createGain();
volume.gain.value = 0.2;


let sfx = { 
  musicDion,
  brick_down, brick_up, damage, deal, defeat, gem_down, gem_up, recruit_down, recruit_up, shuffle, start, tower_up, typing, victory, wall_up 
};

class SoundController {
  constructor(ws) {
    this.keys = Object.keys(sfx);
    this.files = Object.values(sfx);
    this.ws = ws;
    SoundController.setupSamples(this.files)
      .then(res => this.samples = res);
    // setTimeout(() => this.play("musicDion"), 5000);
    ws.on("sfx", (effect) => this.play(effect));
    // this.sfx = keys.map((key) => ({ name: key, sound: new Audio(sfx[key]) }));
  }

  play(name) {
    const { keys, samples } = this;
    const index = keys.indexOf(name);
    SoundController.playSample(samples[index]);
  }

  static async getFile(filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  static async setupSamples(paths) {
    const audioBuffers = [];
    for (const path of paths) {
      const sample = await SoundController.getFile(path);
      audioBuffers.push(sample);
    }
    return audioBuffers;
  }

  static playSample(audioBuffer, time = 0) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(volume);
    volume.connect(audioContext.destination);
    sampleSource.start(time);
    return sampleSource;
  }
}



export default SoundController;
