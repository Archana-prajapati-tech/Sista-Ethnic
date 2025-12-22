const productList = document.getElementById("productList");
const modal = document.getElementById("modal");

const modalCategory = document.getElementById("modalCategory");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalImages = document.getElementById("modalImages");

const modalSizeDiv = document.getElementById("modalSizeDiv");
const modalLengthDiv = document.getElementById("modalLengthDiv");
const modalColorDiv = document.getElementById("modalColorDiv");

const modalSize = document.getElementById("modalSize");
const modalLength = document.getElementById("modalLength");
const modalColor = document.getElementById("modalColor");

const modalSizeChart = document.getElementById("modalSizeChart");

products.forEach((p,i) => {
  productList.innerHTML += `
    <div class="card">
      <img src="${p.images[0]}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="openModal(${i})">View & Order</button>
    </div>
  `;
});

function openModal(i) {
  const p = products[i];
  modal.dataset.index = i;
  modal.style.display = "block";

  modalCategory.innerText = "Category: " + p.category;
  modalProductName.innerText = p.name;
  modalProductPrice.innerText = "₹" + p.price;

  modalImages.innerHTML = p.images.map(img => `<img src="${img}">`).join("");

  modalSizeDiv.style.display = p.sizes ? "block" : "none";
  modalLengthDiv.style.display = p.lengths ? "block" : "none";
  modalColorDiv.style.display = p.colors ? "block" : "none";

  if (p.sizes) modalSize.innerHTML = p.sizes.map(s => `<option>${s}</option>`).join("");
  if (p.lengths) modalLength.innerHTML = p.lengths.map(l => `<option>${l}</option>`).join("");
  if (p.colors) modalColor.innerHTML = p.colors.map(c => `<option>${c}</option>`).join("");

  modalSizeChart.innerHTML = p.sizes ? `
    <tr><th>Size</th><th>Bust</th><th>Waist</th></tr>
    <tr><td>S</td><td>34-36</td><td>28-30</td></tr>
    <tr><td>M</td><td>36-38</td><td>30-32</td></tr>
    <tr><td>L</td><td>38-40</td><td>32-34</td></tr>
  ` : "";
}

function closeModal() {
  modal.style.display = "none";
}

function orderNow() {
  const p = products[modal.dataset.index];

  const size = modalSizeDiv.style.display !== "none" ? modalSize.value : "N/A";
  const length = modalLengthDiv.style.display !== "none" ? modalLength.value : "N/A";
  const color = modalColorDiv.style.display !== "none" ? modalColor.value : "N/A";

  const msg = `
🛍️ *New Order*

📦 Product: ${p.name}
📂 Category: ${p.category}
💰 Price: ₹${p.price}
📏 Size: ${size}
📐 Length: ${length}
🎨 Color: ${color}

👤 *IMPORTANT*
Name:
Phone:
Full Address:

📦 Quantity:
💳 Payment Mode: COD / Online
`;

  window.open(
    `https://wa.me/918625852050?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}
