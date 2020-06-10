let xDown = null;
let yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }


    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        let element;

        if ( xDiff > 0 ) {
            console.log("swiped left")
            console.log(evt.target.tagName === "SPAN")
            console.log(evt.target.childNodes)

            if (evt.target.childNodes.length === 1 || evt.target.childNodes.length === 0) {
                element = evt.target.parentNode;
                if (evt.target.tagName === "SPAN") {
                    element = evt.target.parentNode.parentNode;
                }
            } else element = evt.target;

            if (element.childNodes[1].classList[2] === "green-square") return;

            if (element.childNodes[2].hidden) {
                element.childNodes[0].hidden = true;
                element.childNodes[2].hidden = false;
            }
        } else {
            console.log("swiped right")
            console.log(evt.target.childNodes)

            if (evt.target.childNodes.length === 1 || evt.target.childNodes.length === 0) {
                element = evt.target.parentNode;
                if (evt.target.tagName === "SPAN") {
                    element = evt.target.parentNode.parentNode;
                }
            } else element = evt.target;

            if (element.childNodes[1].classList[2] === "green-square") return;

            if (!element.childNodes[2].hidden) {
                element.childNodes[0].hidden = false;
                element.childNodes[2].hidden = true;
            }
        }
    }
    xDown = null;
    yDown = null;
}

window.onload = () => {
    addSwipes();
}


function addSwipes() {
    const allTasks = [... document.getElementsByClassName("task")];
    allTasks.forEach(t => {
        t.addEventListener('touchstart', handleTouchStart, false);
        t.addEventListener('touchmove', handleTouchMove, false);

        t.childNodes.forEach((node, index) => {
            if (index !== 2) {
                node.addEventListener('touchstart', handleTouchStart, false);
                node.addEventListener('touchmove', handleTouchMove, false);
            } else if (index === 2) {
                node.addEventListener('click', completeTask);
            }
        })
    });
}

function completeTask(event) {

    const taskEl = event.target.parentNode;
    taskEl.childNodes[1].classList.add("green-square");
    taskEl.childNodes[2].hidden = false;

    const dayId = event.target.parentNode.childNodes[3].childNodes[0].textContent;
    const taskId = event.target.parentNode.childNodes[4].childNodes[0].textContent;

    console.log(dayId);
    console.log(taskId);

    const url = "http://localhost:3000/widok_dnia/";
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url+dayId+'/'+taskId, true);
    xhr.send(null);
}
