const BUDGET = 300;

document.querySelectorAll(".item").forEach((element) => {
  element.addEventListener("dragstart", (event) => {
    event.currentTarget.style.border = "dashed";
    event.dataTransfer.setData("text", event.target.id);
  });

  element.addEventListener("dragend", (event) => {
    event.target.style.border = "solid black";
    event.dataTransfer.clearData();
  });
});

document.querySelector("#cart").addEventListener("dragover", (event) => {
  event.currentTarget.style.background = "gold";
  event.preventDefault();
});

const getTotalPrice = () => {
  let sum = 0;
  document.querySelector("#cart").childNodes.forEach((element) => {
    sum = sum + Number(element.dataset.price);
  });
  return sum;
};

const updateTotalPrice = (num) => {
  document.getElementById("total-price").innerHTML = num;
}

const clearCart = () => {
  document.getElementById("cart").innerHTML = "";
  updateTotalPrice(getTotalPrice());
}

document.getElementById("clear-button").addEventListener("click", () => clearCart());

document.querySelector("#cart").addEventListener("drop", (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const transferElement = document.getElementById(id).cloneNode(true);
  const transferPrice = Number(transferElement.dataset.price);

  if (getTotalPrice() + transferPrice <= BUDGET) {
    document.querySelector("#cart").appendChild(transferElement);
    updateTotalPrice(getTotalPrice());
  } else {
    alert("Сумма превышает бюджет!");
  }

  event.currentTarget.style.background = "lightblue";
});
