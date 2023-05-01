/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map()
    for (let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord)
      } else {
        chains.set(word, [nextWord])
      }
    }
    this.chains = chains
  }

  // A static method is a method that is associated with the class and not with any particular instance of the class.
  static random(arr) {
    const randomInd = Math.floor(Math.random() *arr.length)
    return arr[randomInd]
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    const keys = Array.from(this.chains.keys())
    let word = MarkovMachine.random(keys)
    let resp = []
    while(resp.length < numWords && word != null) {
      resp.push(word)
      word = MarkovMachine.random(this.chains.get(word))
    }
    return resp.join(" ")
  }

}

module.exports = {MarkovMachine};

const mm = new MarkovMachine("the cat in the hat");
// console.log(mm.chains)
const text = mm.makeText(numWords=50)
// console.log(text)