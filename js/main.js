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

// Form

const form = document.getElementById("feedback-form");

if (form) {
	const submitBtn = form.querySelector("#submit");

	// КОНФИГУРАЦИЯ TELEGRAM (Вставьте свои данные)
	const TOKEN = "8419481090:AAGFenXs0Z1f74HCLPrpxCR_Y20xTY4xLsE";
	const CHAT_ID = "2040780713";
	const URL_API = `https://telegram.org{TOKEN}/sendMessage`;

	form.addEventListener("submit", async (e) => {
		e.preventDefault(); // Отменяем перезагрузку страницы

		submitBtn.disabled = true;
		const originalBtnText = submitBtn.textContent;
		submitBtn.textContent = "ОТПРАВКА...";

		// Собираем данные из полей
		const name = form.elements["name"].value;
		const email = form.elements["email"].value;
		const msg = form.elements["msg"].value;

		// Формируем красивый текст для Telegram (поддерживает HTML-теги)
		let message = `<b>Новая заявка с сайта!</b>\n`;
		message += `👤 <b>Имя:</b> ${name}\n`;
		message += `📧 <b>Email:</b> ${email}\n`;
		message += `💬 <b>Сообщение:</b> ${msg}`;

		try {
			// Отправляем запрос напрямую в API Telegram
			const response = await fetch(URL_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					chat_id: CHAT_ID,
					parse_mode: "html",
					text: message,
				}),
			});

			if (response.ok) {
				alert("Спасибо! Ваше сообщение успешно отправлено.");
				form.reset(); // Очищаем форму
			} else {
				alert("Произошла ошибка при отправке. Попробуйте еще раз.");
			}
		} catch (error) {
			console.error("Ошибка сети:", error);
			alert("Не удалось связаться с сервером.");
		} finally {
			submitBtn.disabled = false;
			submitBtn.textContent = originalBtnText;
		}
	});
}
