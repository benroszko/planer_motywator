window.onload = () => {
  sortBy("STATUS");
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
      copyAllTasks.sort((a, b) => statusDict[a.childNodes[0].classList[0]] - statusDict[b.childNodes[0].classList[0]]);
      allTasks.forEach((t, i) => {
        t.replaceWith(copyAllTasks[i]);
      });
      break;
    default:
      console.log("Unknown sorting value");
      break;
  }
}
