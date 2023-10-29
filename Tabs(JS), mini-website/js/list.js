// Находим элементы на странице
const newItemInput = document.getElementById("newItemInput");
const addItemButton = document.getElementById("addItemButton");
const list = document.getElementById("list");
const counter = document.getElementById("counter");

// Обработчик нажатия на кнопку "Добавить"
addItemButton.addEventListener("click", () => {
  const newItemName = newItemInput.value.trim(); // Удаляем лишние пробелы
  if (newItemName) { // Если введенное значение не пустое
    const newItem = document.createElement("li"); // Создаем новый элемент списка
    newItem.innerText = newItemName; // Добавляем текст в элемент списка
    const deleteButton = document.createElement("button"); // Создаем кнопку удаления
    deleteButton.innerText = "Удалить"; // Добавляем текст на кнопку
    deleteButton.addEventListener("click", () => {
      list.removeChild(newItem); // Удаляем элемент списка
      updateCounter(); // Обновляем счетчик элементов
    });
    newItem.appendChild(deleteButton); // Добавляем кнопку удаления к элементу списка
    list.appendChild(newItem); // Добавляем элемент списка на страницу
    newItemInput.value = ""; // Очищаем поле ввода
    updateCounter(); // Обновляем счетчик элементов
  }
});

// Функция для обновления счетчика элементов
function updateCounter() {
  const count = list.children.length; // Получаем количество элементов в списке
  counter.innerText = count; // Обновляем текст счетчика на странице
}
