let addBtn = document.querySelector('.add-btn');
let saveBtn = document.querySelector('.save-btn');
let titleInp = document.querySelector('#add-title');
let colorInp = document.querySelector('#add-color');
let priceInp = document.querySelector('#add-price');
// console.log(addBtn, saveBtn, titleInp, colorInp, priceInp);

let db = [];
addBtn.addEventListener('click', e => {
	e.preventDefault();

	if (!titleInp.value.trim() || !colorInp.value.trim() || !priceInp.value.trim()) {
		alert('Some inputs are empty!');
		return;
	}
	let newObj = {
		id: Date.now(),
		title: titleInp.value,
		color: colorInp.value,
		price: priceInp.value,
	};
	db.push(newObj);

	console.log(db);
	titleInp.value = '';
	colorInp.value = '';
	priceInp.value = '';
	render();
});

function render() {
	let list = document.querySelector('.product-list');
	list.innerHTML = '';
	db.forEach(item => {
		list.innerHTML += `<li id="${item.id}">Product: ${item.title};color:${item.color};price:${item.price}
		<button class='del-btn'>Delete</button>
		<button class='upd-btn'>Update</button>
		</li>`;
	});

	addDeleteEvent();

	addUpdateEvent();
}

render();
function deleteProduct(e) {
	let productId = e.target.parentNode.id;
	// console.log(e.target.parentNode.id);
	db = db.filter(item => {
		return item.id != productId;
	});
	render();
}

function addDeleteEvent() {
	let delBtns = document.querySelectorAll('.del-btn');
	// console.log(.del);
	delBtns.forEach(item => item.addEventListener('click', deleteProduct));
}

function updateProduct(e) {
	let productId = e.target.parentNode.id;
	// console.log(productId);
	let product = db.find(item => item.id == productId);
	// console.log(product);
	titleInp.value = product.title;
	colorInp.value = product.color;
	priceInp.value = product.price;

	let form = document.querySelector('form');
	form.setAttribute('id', product.id);
}

function addUpdateEvent() {
	let updBtns = document.querySelectorAll('.upd-btn');
	updBtns.forEach(item => item.addEventListener('click', updateProduct));
}

function saveChanges(e) {
	e.preventDefault();
	let form = document.querySelector('form');
	if (!form.id) return;
	let product = db.find(item => item.id == form.id);
	product.title = titleInp.value;
	product.color = colorInp.value;
	product.price = priceInp.value;

	form.removeAttribute('id');
	titleInp.value = '';
	colorInp.value = '';
	priceInp.value = '';

	render();
}

saveBtn.addEventListener('click', saveChanges);
