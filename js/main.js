// Json file을 받아 옴

function loadItems() {
  return fetch('data/data.json')
    .then((res) => res.json())
    .then((json) => json.items);
}
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// 데이터 아이템을 받아와 HTML로 만들기
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
    
    `;
}

function onButtonClick(e, items) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  // key가 null, value가 null이면 즉 필터링 할 데이터가 null이면
  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  console.log(filtered);
  displayItems(filtered);

  // console.log(e.target.dataset.key);
  //console.log(e.target.dataset.value);
}

// function onButtonClick(e, items) {
//   const dataset = e.target.dataset;
//   const key = dataset.key;
//   const value = dataset.value;

//   // key가 null, value가 null이면 즉 필터링 할 데이터가 null이면
//   if (key == null || value == null) {
//     return;
//   }

//   updateItems(items, key, value);

//   //   console.log(e.target.dataset);
//   // console.log(dataset.key);
//   //console.log(dataset.value);
// }

// function updateItems(items, key, value) {
//   items.forEach((item) => {
//     console.log([key]);
//   });
// }

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (e) => onButtonClick(e, items));
}

//  메인함수
loadItems()
  .then((items) => {
    // console.log(items);
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
