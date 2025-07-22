let id = 0;

const loadData = async () => {
  const contentElement = document.getElementById("content");
  const ul = document.getElementById("list");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${(id++ % 10) + 1}`
  );
  const data = await response.json();
  //   for(const obj of data){
  const li = document.createElement("li");
  li.textContent = data.name ?? "Error in Fetch";
  ul.appendChild(li);
  //   }
  contentElement.appendChild(ul);
};
