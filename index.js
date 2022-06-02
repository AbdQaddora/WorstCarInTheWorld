const perant = document.querySelector("#perant");
const inner = document.querySelector("#inner");
let POS_X = 0;
let POS_Y = 0;
const MOVE_SPEED = 5;

const DEST_TO_RIGHT = 0;
const DEST_TO_DOWN = 1;
const DEST_TO_LEFT = 2;
const DEST_TO_TOP = 3;

let stop = true;

if (!detectMob()) {
    perant.style.height = "100vh"
} else {
    perant.style.height = `calc(100vh - ${document.querySelector('.onMobile').getBoundingClientRect().height}px - 50px)`;
}


const moveTo = (DEST) => {
    if (!stop) {
        switch (DEST) {
            case DEST_TO_RIGHT:
                if (POS_X < perant.getBoundingClientRect().width - inner.getBoundingClientRect().width) {
                    POS_X += MOVE_SPEED;
                }
                break;
            case DEST_TO_DOWN:
                if (POS_Y < perant.getBoundingClientRect().height - inner.getBoundingClientRect().height) {
                    POS_Y += MOVE_SPEED;
                }
                break;
            case DEST_TO_LEFT:
                if (POS_X > 0) {
                    POS_X -= MOVE_SPEED;
                }
                break;
            case DEST_TO_TOP:
                if (POS_Y > 0) {
                    POS_Y -= MOVE_SPEED;
                }
                break;
            default:
                break;
        }
        render(DEST);
        window.requestAnimationFrame(() => moveTo(DEST));
    }
}

const render = (DEST) => {
    switch (DEST) {
        case DEST_TO_RIGHT:
            inner.style = 'transform: rotateY(0deg);';
            break;
        case DEST_TO_DOWN:
            inner.style = 'transform: rotateZ(90deg);';
            break;
        case DEST_TO_LEFT:
            inner.style = 'transform: rotateY(180deg);';
            break;
        case DEST_TO_TOP:
            inner.style = 'transform: rotateZ(-90deg);';
            break;
        default:
            break;
    }
    inner.style.left = `${POS_X}px`;
    inner.style.top = `${POS_Y}px`;
}

window.addEventListener("keydown", (e) => {
    stop = false;
    switch (e.key) {
        case "ArrowUp":
            moveTo(DEST_TO_TOP);
            break;
        case "ArrowRight":
            moveTo(DEST_TO_RIGHT);
            break;
        case "ArrowDown":
            moveTo(DEST_TO_DOWN);
            break;
        case "ArrowLeft":
            moveTo(DEST_TO_LEFT);
            break;
        default:
            break;
    }
})


window.addEventListener("keyup", (e) => {
    stop = false;
    setTimeout(() => { stop = true; }, 300)
})

document.querySelector('.top').onclick = () => {
    stop = false;
    moveTo(DEST_TO_TOP);
}

document.querySelector('.bottom').onclick = () => {
    stop = false;
    moveTo(DEST_TO_DOWN);
}

document.querySelector('.left').onclick = () => {
    stop = false;
    moveTo(DEST_TO_LEFT);
}

document.querySelector('.right').onclick = () => {
    stop = false;
    moveTo(DEST_TO_RIGHT);
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

