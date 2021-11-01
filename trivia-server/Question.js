class Question {
    constructor(prompt, options, answer) {
        this.prompt = prompt
        this.options = options
        this.answer = answer
    }
}

export default [
    new Question(
        "According to midrash, how did the people of Noah's time plan to prepare for the great flood?",
        [
            "Reinforce the land with steel poles",
            "Build large retaining walls around the rivers and coastlines",
            "Move their cities to higher ground",
            "Create an elaborate network of interconnected rafts"
        ],
        0
    )
]