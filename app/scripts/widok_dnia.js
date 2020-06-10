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

      if (evt.target.childNodes.length === 1 || evt.target.childNodes.length === 0) {
        element = evt.target.parentNode;
        if (evt.target.tagName === "SPAN") {
          element = evt.target.parentNode.parentNode;
        }
      } else element = evt.target;

      if (element.childNodes[0].hidden) {
        element.childNodes[5].hidden = false;
        element.style.paddingRight = "0";
      } else {
        element.childNodes[0].hidden = true;
        element.style.paddingLeft = "10px";
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
      
      if (element.childNodes[5].hidden && element.childNodes[1].classList[0] !== "green-square") {
        element.childNodes[0].hidden = false;
        element.style.paddingLeft = "0";
      } else {
        element.childNodes[5].hidden = true;
        element.style.paddingRight = "10px";
      }
      /* right swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

window.onload = () => {
  sortBy("STATUS");
  addSwipes();
}

function openFilter() {
  const dayViewHeader = document.getElementsByClassName("day-view-header")[0];
  dayViewHeader.hidden = true;
  const filterBar = document.getElementsByClassName("filter-bar")[0];
  filterBar.hidden = false;
}

function applyFilter() {
  const sortBySelect = document.getElementsByClassName("sort-by")[0];
  const value = sortBySelect.options[sortBySelect.selectedIndex].value.toUpperCase();
  sortBy(value);

  const dayViewHeader = document.getElementsByClassName("day-view-header")[0];
  const filterBar = document.getElementsByClassName("filter-bar")[0];

  dayViewHeader.hidden = false;
  filterBar.hidden = true;
}

function sortBy(sortingValue) {
  const allTasks = [... document.getElementsByClassName("list-elem")];

  let sortedTasks;
  let dict;
  switch (sortingValue) {
    case "NAME":
      dict = new Map();
      allTasks.forEach(t => dict.set(t.textContent.substr(5), t.cloneNode(true)));
      sortedTasks = allTasks.map(t => t.textContent.substr(5)).sort();
      allTasks.forEach((t, i) => {
        t.replaceWith(dict.get(sortedTasks[i]));
      });
      break;
    case "HOUR":
      dict = new Map();
      allTasks.forEach(t => dict.set(t.textContent.substr(0, 5), t.cloneNode(true)));
      sortedTasks = allTasks.map(t => t.textContent.substr(0, 5)).sort();
      allTasks.forEach((t, i) => {
        t.replaceWith(dict.get(sortedTasks[i]));
      });
      break;
    case "PRIORITY":
      dict = new Map();
      allTasks.forEach(t => dict.set(t.textContent.substr(t.textContent.length - 1) + t.textContent.substr(0, 5), t.cloneNode(true)));
      sortedTasks = allTasks.map(t => t.textContent.substr(t.textContent.length - 1) + t.textContent.substr(0, 5)).sort().reverse();
      allTasks.forEach((t, i) => {
        t.replaceWith(dict.get(sortedTasks[i]));
      });
      break;
    case "STATUS":
      const statusDict = {
        "yellow-square": 0,
        "green-square": 1,
        "red-square": 2
      };

      let copyAllTasks = [];
      allTasks.forEach(t => copyAllTasks.push(t.cloneNode(true)));
      copyAllTasks.sort((a, b) => statusDict[a.childNodes[1].classList[0]] - statusDict[b.childNodes[1].classList[0]]);
      allTasks.forEach((t, i) => {
        t.replaceWith(copyAllTasks[i]);
      });
      break;
    default:
      console.log("Unknown sorting value");
      break;
  }
}

function addSwipes() {
  const allTasks = [... document.getElementsByClassName("list-elem")];
  allTasks.forEach(t => {
    t.addEventListener('touchstart', handleTouchStart, false);
    t.addEventListener('touchmove', handleTouchMove, false);

    t.childNodes.forEach((node, index) => {
      if (index !== 0 && index !== 5) {
        node.addEventListener('touchstart', handleTouchStart, false);
        node.addEventListener('touchmove', handleTouchMove, false);
      } else if (index === 0) {
        node.addEventListener('click', completeTask);
      } else if (index === 5) {
        node.addEventListener('click', removeTask);
      }
    })
  });
}

function removeTask(event) {
  const taskListEl = event.target.parentNode.parentNode;
  taskListEl.removeChild(event.target.parentNode);

  const dayId = document.getElementsByClassName("day-view-header")[0].textContent;
  const taskId = event.target.parentNode.childNodes[3].childNodes[0].textContent;

  console.log(dayId);
  console.log(taskId);

  const url = "http://localhost:3000/widok_dnia/";
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", url+dayId+'/'+taskId, true);
  xhr.send(null);
}

function completeTask(event) {
  const taskEl = event.target.parentNode;
  taskEl.childNodes[1].classList.remove("yellow-square");
  taskEl.childNodes[1].classList.remove("red-square");
  taskEl.childNodes[1].classList.add("green-square");
  taskEl.childNodes[0].hidden = true;
  taskEl.style.paddingLeft = "10px";

  const dayId = document.getElementsByClassName("day-view-header")[0].textContent;
  const taskId = event.target.parentNode.childNodes[3].childNodes[0].textContent;

  console.log(dayId);
  console.log(taskId);

  const url = "http://localhost:3000/widok_dnia/";
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", url+dayId+'/'+taskId, true);
  xhr.send(null);
}
