const counter = document.getElementById('count');
let count = 0;

document.getElementById('increase').addEventListener('click', () => {
    count++;
    console.log("increase");
});

document.getElementById('decrease').addEventListener('click', () => {
    count--;
    console.log("decrease");
})