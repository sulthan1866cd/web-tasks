// -------- data ---------------
let tableData;
let filteredData;

const createTable = (tableData) => {
  const tableElement = document.getElementById("table");
  for (const rowData of tableData) {
    const rowElement = document.createElement("tr");
    for (const data in rowData) {
      const dataElement = document.createElement("td");
      dataElement.textContent = rowData[data];
      rowElement.appendChild(dataElement);
    }
    tableElement.appendChild(rowElement);
  }
};

const deleteTable = () => {
  const tableElement = document.getElementById("table");
  while (tableElement.childNodes.length > 2) {
    tableElement.removeChild(tableElement.lastChild);
  }
};

const createPagitionButtons = () => {
  const numPages = Math.ceil(filteredData.length / 10);
  const paginationElement = document.getElementById("pagination");
  for (let i = 0; i < numPages; i++) {
    const button = document.createElement("button");
    button.textContent = i + 1;
    button.classList.add("btn");
    button.setAttribute("onclick", `paginationData(${i})`);
    paginationElement.appendChild(button);
  }
};

const deletePagitionButtons = () => {
  const paginationElement = document.getElementById("pagination");
  paginationElement.replaceChildren();
};

const paginationData = (pageNo) => {
  const totalDataLength = filteredData.length;
  const start = pageNo * 10;
  let end = start + 10;
  if (end >= totalDataLength) {
    end = end - (end % totalDataLength);
  }

  deleteTable();
  createTable(filteredData.slice(start, end));
};

//promise, async, await
const loadData = async () => {
  tableData = await fetch("https://jsonplaceholder.typicode.com/todos")
  tableData = await tableData.json()
  filteredData = tableData;
  createTable(filteredData.slice(0, 10));
};

/* Event loop in browser can be seen here, if there is no await before 
loadData function the createPagitionButtons function will get into queue 
first and try to create pagition buttons for empty array of data 
resulting in no pagition created on the page */
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  createPagitionButtons();
});

const sort = (tableData) => {
  if (tableData[0].userId == 1) {
    tableData.sort((a, b) => b.userId - a.userId);
  } else {
    tableData.sort((a, b) => a.userId - b.userId);
  }
  // console.log(tableData)
  deleteTable();
  createTable(tableData.slice(0, 10));
};

const sortOnClick = (sortBtnElement) => {
  const preBtnText = sortBtnElement.textContent;
  sortBtnElement.textContent = preBtnText == "sort ↓" ? "sort ↑" : "sort ↓";
  sort(filteredData);
};

const filter = (event) => {
  if (event.key !== "Enter") return;
  const searchBarElement = document.getElementById("searchBar");
  const query = searchBarElement.value;
  deleteTable();

  if (query === "") {
    filteredData = tableData;
    createTable(filteredData.slice(0, 10));
  }

  filteredData = tableData.filter((data) => {
    for (const key in data) {
      if (String(data[key]).includes(query)) return true;
    }
  });
  createTable(filteredData.slice(0, 10));

  deletePagitionButtons();
  createPagitionButtons();
};
