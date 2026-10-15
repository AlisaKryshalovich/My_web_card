new Swiper(".about-slider", {
	direction: "horizontal",
	slidesPerView: "auto",
	spaceBetween: 10,
	pagination: {
		el: ".about__pagination",
		clickable: true,
		// renderBullet: function (index, className) {
		// 	return `<span class="${className}" data-index="${index + 1}"></span>`;
		// },
	},
	// on: {
	// 	init: function () {
	// 		updatePagination(this.realIndex);
	// 	},
	// 	slideChange: function () {
	// 		updatePagination(this.realIndex);
	// 	},
	// },
});

// function updatePagination(activeIndex) {
// 	const bullets = document.querySelectorAll(
// 		".about__pagination .swiper-pagination-bullet",
// 	);
// 	bullets.forEach((bullet, index) => {
// 		bullet.textContent = index === activeIndex ? index + 1 : "";
// 	});
// }

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const images = document.querySelectorAll(".gallery-img");

// 1. Открытие картинки
images.forEach((img) => {
	img.addEventListener("click", () => {
		modal.style.display = "flex";
		modalImg.src = img.src;
	});
});

// Функция для закрытия модального окна
function closeModal() {
	modal.style.display = "none";
}

// 2. Закрытие по крестику
closeBtn.addEventListener("click", closeModal);

// 3. Закрытие при клике на темный фон
modal.addEventListener("click", (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

// 4. НОВОЕ: Закрытие по нажатию клавиши Escape
document.addEventListener("keydown", (e) => {
	// Проверяем, что нажата именно клавиша Escape и модальное окно сейчас открыто
	if (e.key === "Escape" && modal.style.display === "flex") {
		closeModal();
	}
});

