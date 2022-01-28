const scoreTargetSelect = document.querySelector("#scoreTarget");
let scoreTarget = scoreTargetSelect.value;

const message = document.querySelector("#message");

const player1 = {
    name: "Player 1",
    button: document.querySelector("#p1Point"),
    score: document.querySelector("#scoreP1")
};

const player2 = {
    name: "Player 2",
    button: document.querySelector("#p2Point"),
    score: document.querySelector("#scoreP2")
};

const buttonReset = document.querySelector("#reset");

function addScore({ name, score }) {
    score.innerText = parseInt(score.innerText) + 1;
    if (score.innerText >= scoreTarget) {
        player1.button.disabled = true;
        player2.button.disabled = true;
        message.innerText = `${name} wins!`;
        message.hidden = false;
    }
}

function reset({ button, score }) {
    button.disabled = false;
    score.innerText = 0;
}

scoreTargetSelect.addEventListener("input", () => {
    return scoreTarget = scoreTargetSelect.value;
});

player1.button.addEventListener("click", (e) => {
    addScore(player1);
});

player2.button.addEventListener("click", () => {
    addScore(player2);
});

buttonReset.addEventListener("click", () => {
    reset(player1);
    reset(player2);
    message.hidden = true;
});