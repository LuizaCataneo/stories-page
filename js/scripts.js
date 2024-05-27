const imgArr = ["img1.jpg", "img2.jpg", "img3.jpeg", "img4.jpg", "img5.jpeg"];
const jsonFiles = [
  "data/data1.json",
  "data/data2.json",
  "data/data3.json",
  "data/data4.json",
  "data/data5.json",
];
const dataArr = [];
const rightBtn = document.querySelector("#next-button");
const leftBtn = document.querySelector("#previous-button");
const containerImg = document.querySelector("#main-container");
const liArr = document.querySelectorAll(".story-item");
const currentTitle = document.querySelector("#text-container h1");
const currentText = document.querySelector("#text-container p");
const linkBtn = document.querySelector("#swap-link");

let a = 0;

// carregando os arquivos JSON
async function loadJsonFiles() {
  const promises = jsonFiles.map((file) =>
    fetch(file).then((response) => response.json())
  ); // array de promises do carregamento e conversão JSON
  const jsonData = await Promise.all(promises); // array de dados JSON carregados
  jsonData.forEach((data) => dataArr.push(data)); //
}

// Atualizando a exibição
function updateDisplay(index) {
  liArr[a].style.opacity = 0.5;
  a = index;
  //containerImg.style.backgroundColor = imgArr[a];
  liArr[a].style.opacity = 1;
  currentTitle.innerText = `${dataArr[a].title}`;
  currentText.innerText = `${dataArr[a].text}`;
  containerImg.style.backgroundImage = `url(img/${imgArr[a]})`;
  linkBtn.href = `${dataArr[a].link}`;

  console.log(`${a}º story: ${imgArr[a]}`);
}

// eventos
rightBtn.addEventListener("click", () => {
  updateDisplay((a + 1) % imgArr.length);
});

leftBtn.addEventListener("click", () => {
  updateDisplay((a - 1 + imgArr.length) % imgArr.length);
});

loadJsonFiles().then(() => {
  updateDisplay(a);
});
