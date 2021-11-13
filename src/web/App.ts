import { getRandomInt } from "./Util";


const main = document.getElementById("main") as HTMLDivElement;


const minRes = 0;
const maxRes = 20;


type Sign = "+" | "-";


interface Exercise {
    first: number;
    sign: Sign;
    second: number;
}


function generateExercise(): Exercise {

    const first = getRandomInt(minRes, maxRes);
    const sign = getRandomInt(0, 1) ? "+" : "-";

    let second: number;
    if (sign === "+") {
        second = getRandomInt(0, maxRes - first);
    } else {
        second = getRandomInt(0, first);
    }

    return { first, sign, second };
}


function showExercise(e: Exercise): void {

    const box = document.createElement("div");

    const first = document.createElement("div");
    first.textContent = "" + e.first;

    const sign = document.createElement("div");
    sign.textContent = e.sign;

    const second = document.createElement("div");
    second.textContent = "" + e.second;

    const eq = document.createElement("div");
    eq.textContent = "=";

    const res = document.createElement("div");
    res.contentEditable = "true";
    res.onkeyup = (ev) => validateExercise(ev, e);
    res.textContent = "";

    box.append(first, sign, second, eq, res);
    main.append(box);

    res.focus();

    window.scrollTo(0, document.body.scrollHeight);
}


function calculateResult(e: Exercise): number {
    if (e.sign === "+")
        return e.first + e.second;
    else
        return e.first - e.second;
}


function validateExercise(ev: KeyboardEvent, e: Exercise): void {
    const t = ev.target as HTMLDivElement;
    if (ev.key === "Enter") {
        ev.preventDefault();
        const expected = calculateResult(e);
        if (expected === +t.textContent!.trim()) {
            t.classList.remove("wrong");
            t.classList.add("correct");
            t.removeAttribute("contenteditable");
            nextExercise();
        } else {
            t.classList.remove("correct");
            t.classList.add("wrong");
        }
    }
}


function nextExercise(): void {
    const e = generateExercise();
    showExercise(e);
}


nextExercise();
