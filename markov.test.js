const MarkovMachine = require("./markov")

describe("markov machine", function () {
    let mm;
    beforeEach(function(){
        mm = new MarkovMachine.MarkovMachine("the cat in the hat");
    })
    test("test markov machine making chains", function () {
        expect(mm).toBeInstanceOf(MarkovMachine.MarkovMachine)
        expect(mm.chains).toEqual(new Map(Object.entries({
            "the": ["cat", "hat"],
            "cat": ["in"],
            "in": ["the"],
            "hat": [null]
          })));
    })

    test("test markov machine making random text", function () {
        const text = mm.makeText(numWords=10);
        expect(typeof text).toBe("string");
        expect(text.split(" ").length).toBeLessThanOrEqual(10);
        expect(mm.words.includes(text.split(" ")[0])).toBeTruthy();
    })
})