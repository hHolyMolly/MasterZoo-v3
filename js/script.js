//< " ПОДКЛЮЧЕНИЕ JS КОМПОНЕНТОВ " >=============================================================================================================>//
function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive() // ДИНАМИЧЕСКИЙ АДАПТИВ

function scrollHeader() {
	const header = document.querySelector('.header-top');

	const catalogBtn = document.querySelector(".header-catalog__btn");
	const catalogBody = document.querySelector(".header-catalog__inner");
	const catalogWrapper = document.querySelector(".header-catalog__wrapper");

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else {
			header.classList.add('_scroll');

			catalogBtn.classList.remove("_active");
			catalogBody.classList.remove("_active");
			catalogWrapper.classList.remove("_active");
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);
}
scrollHeader() // ДОБАВЛЕНИЕ ХЕДЕРУ КЛАСС ПРИ СКРОЛЛЕ

/* new Swiper(".swiper", {
	slidesPerView: 1, // Количество слайдеров
	spaceBetween: 15, // Отступ между слайдерами
	grabCursor: true, // Курсор перетаскивания
	loop: true, // Бесконечная прокрутка
	speed: 800, // Скорость прокрутки

	autoplay: {
		delay: 3500, // Задержка перед автопрокруткой
	},

	navigation: {
		nextEl: ".swiper-button-next", // Кнопка прокрутки вперед
		prevEl: ".swiper-button-prev", // Кнопка прокрутки назад
	},

	breakpoints: {
		767.8: {},
	}
});

 // НАСТРОЙКИ СЛАЙДЕРА */

function quantity() {

	const counters = document.querySelectorAll('[data-quantity]');

	if (counters.length > 0) {
		counters.forEach(counter => {

			counter.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget.closest('.counter__btn')) {

					let value = parseInt(elementTarget.closest(".counter").querySelector('.counter__input').value);

					if (elementTarget.classList.contains("counter__btn_plus")) {
						value++;
					} else {
						--value;
					}

					if (value <= 1) {
						value = 1;
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.add("_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.remove("_disabled");
					}

					if (value >= 99) {
						value = 99;
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.add("_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.remove("_disabled");
					}

					elementTarget.closest(".counter").querySelector(".counter__input").value = value;
				}
			});
		});
	}

};
quantity() // СЧЁТЧИКИ

/* function spoiler() {
	const spoilers = document.querySelectorAll("[data-spoiler]");

	if (spoilers.length > 0) {
		spoilers.forEach(spoiler => {

			spoiler.addEventListener("click", function (e) {
				const elementTarget = e.target;
				e.preventDefault();

				if (elementTarget.closest(".spoiler__btn")) {
					elementTarget.closest(".spoiler").querySelector(".spoiler__btn").classList.toggle("_active");
					elementTarget.closest(".spoiler").querySelector(".spoiler__list").classList.toggle("_active");
				}
			});
		});
	}

}
spoiler() // СПОЙЛЕРЫ */

const myPopup = function () {
	const openBtns = document.querySelectorAll(".popup-open");
	const wrappers = document.querySelectorAll(".popup-item");
	let popupData;

	if (openBtns.length > 0) {
		openBtns.forEach(open => {
			open.addEventListener("click", function () {
				popupData = this.getAttribute("data-popup");

				function selectPopup(popupData) {
					wrappers.forEach(wrap => {
						if (wrap.classList.contains(popupData)) {
							wrap.classList.add("_active");
							document.body.classList.add("_lock-scroll");
						}
					});
				}
				selectPopup(popupData)

			});
		});

		function closePopup() {
			const closeBtns = document.querySelectorAll(".popup-item__close");
			const wrapper = document.querySelectorAll(".popup-item");

			closeBtns.forEach(closeBtn => {
				closeBtn.addEventListener("click", function () {
					wrapper.forEach(wrap => {
						wrap.classList.remove("_active");
						document.body.classList.remove("_lock-scroll");
					});
				});
			});

			wrapper.forEach(wrap => {
				wrap.addEventListener("click", function (e) {
					const elementTarget = e.target;

					if (!elementTarget.closest(".popup-item__body")) {
						wrap.classList.remove("_active");
						document.body.classList.remove("_lock-scroll");
					}
				});
			});
		}
		closePopup()
	}
}
myPopup() // ПОПАПЫ 

//< " СКРИПТЫ " >=============================================================================================================>//
function actionsHeader() {

	function menuBurger() {
		const menuOpen = document.querySelector(".header-menu__burger");

		if (menuOpen) {
			const menuWrapper = document.querySelector(".header-menu__wrapper");
			const menuClose = document.querySelector(".header-menu__close");

			menuOpen.addEventListener("click", function () {
				menuWrapper.classList.add("_active");
				document.body.classList.add("_lock-scroll");
			});

			menuClose.addEventListener("click", function () {
				menuWrapper.classList.remove("_active");
				document.body.classList.remove("_lock-scroll");
			});

			menuWrapper.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (menuWrapper.classList.contains("_active") && !elementTarget.closest(".header-menu__inner")) {
					menuWrapper.classList.remove("_active");
					document.body.classList.remove("_lock-scroll");
				}
			});

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget.closest(".popup-open")) {
					menuWrapper.classList.remove("_active");
				}
			});
		}
	}
	menuBurger()

	function phoneShow() {
		const phoneArrow = document.querySelector(".header-phone-dropdown__arrow");
		const phoneLists = document.querySelectorAll(".header-phone-dropdown__list");

		if (phoneArrow) {
			phoneLists.forEach(phoneList => {
				phoneArrow.addEventListener("click", function () {
					phoneArrow.classList.toggle("_active");
					phoneList.classList.toggle("_active");
				});

				document.addEventListener("click", function (e) {
					const elementTarget = e.target;

					if (!elementTarget.closest(".header-phone-dropdown") && window.innerWidth > 992.2) {
						phoneArrow.classList.remove("_active");
						phoneList.classList.remove("_active");
					}
				});
			});
		}
	}
	phoneShow()

	function customSelect() {
		let selectItem = document.querySelectorAll('.popup-location-select__item');

		selectItem.forEach(item => {
			item.addEventListener("click", function () {
				let text = this.innerText;
				let currentText = document.querySelector('.header-location__selected');
				currentText.innerText = text;

				selectItem.forEach(item => {
					item.classList.remove("_active");
				});

				this.classList.add("_active");
			});
		});

		document.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (elementTarget.closest(".popup-location-select__item")) {
				document.querySelector(".popup-item").classList.remove("_active");
			}
		})
	};
	customSelect()

	function myCatalog() {
		const catalogBtn = document.querySelector(".header-catalog__btn");
		const catalogBody = document.querySelector(".header-catalog__inner");
		const catalogWrapper = document.querySelector(".header-catalog__wrapper");

		const catalogContent = document.querySelectorAll(".header-catalog-sub__item");
		const catalogNav = document.querySelectorAll(".header-catalog-main__link");

		const widthCatalog = 768.2;

		if (catalogBtn) {
			function openCatalog() {
				catalogBtn.addEventListener("click", function () {
					catalogBtn.classList.toggle("_active");
					catalogBody.classList.toggle("_active");
					catalogWrapper.classList.toggle("_active");

					if (window.innerWidth < widthCatalog) {
						catalogContent.forEach(catalogItem => {
							catalogItem.classList.remove("_active");
						});
						catalogNav.forEach(itemNav => {
							itemNav.classList.remove("_active");
						});

						document.body.classList.add("_lock-scroll");
					}
				});
			}
			openCatalog()
		}

		function closeCatalog() {
			catalogWrapper.addEventListener("click", function () {
				catalogBtn.classList.remove("_active");
				catalogBody.classList.remove("_active");
				catalogWrapper.classList.remove("_active");

				if (window.innerWidth < widthCatalog) {
					catalogContent.forEach(contentItem => {
						contentItem.classList.remove("_active");
					});
				}
			});
		}
		closeCatalog()

		let catalogData;

		catalogNav.forEach(itemNav => {
			itemNav.addEventListener("mouseover", function () {
				if (window.innerWidth > widthCatalog) {
					catalogData = this.getAttribute("data-catalog")

					catalogNav.forEach(itemNav => {
						itemNav.classList.remove("_active");
					});
					this.classList.add("_active");

					function selectSubCatalog(catalogData) {
						catalogContent.forEach(contentItem => {
							if (contentItem.classList.contains(catalogData)) {
								contentItem.classList.add("_active");
							} else {
								contentItem.classList.remove("_active");
							}
						});
					}
					selectSubCatalog(catalogData)
				}
			});
			itemNav.addEventListener("click", function (e) {
				if (window.innerWidth < widthCatalog) {
					catalogData = this.getAttribute("data-catalog");
					e.preventDefault();

					function selectSubCatalog(catalogData) {
						catalogContent.forEach(contentItem => {
							if (contentItem.classList.contains(catalogData)) {
								contentItem.classList.add("_active");
							} else {
								contentItem.classList.remove("_active");
							}
						});
					}
					selectSubCatalog(catalogData)
				}
			});

			function selectTitle() {
				let catalogTitle = document.querySelectorAll('.header-catalog-main__link');

				if (catalogTitle) {
					catalogTitle.forEach(item => {
						item.addEventListener("click", function () {
							let text = this.querySelector(".header-catalog-main__text-link").innerHTML;
							let currentText = document.querySelector('.header-catalog__title');
							currentText.innerHTML = text;
						});
					});

					const backBtns = document.querySelectorAll(".header-catalog-sub__back");

					backBtns.forEach(btn => {
						btn.addEventListener("click", function () {
							let text = 'КАТАЛОГ ТОВАРОВ';
							let currentText = document.querySelector('.header-catalog__title');
							currentText.innerHTML = text;
						});
					});
				}
			}
			selectTitle()

			catalogBody.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget.closest(".header-catalog__close")) {
					catalogBtn.classList.remove("_active");
					catalogBody.classList.remove("_active");
					catalogWrapper.classList.remove("_active");
					document.body.classList.remove("_lock-scroll");

					catalogContent.forEach(contentItem => {
						contentItem.classList.remove("_active");
					});
				}
			});

			catalogContent.forEach(contentItem => {
				contentItem.addEventListener("click", function (e) {

					if (window.innerWidth < widthCatalog) {
						const elementTarget = e.target;

						if (elementTarget.closest(".header-catalog-sub__back")) {
							catalogContent.forEach(contentItem => {
								contentItem.classList.remove("_active");
							});
						}
					}
				});
			});

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (!elementTarget.closest(".header-catalog")) {
					catalogBtn.classList.remove("_active");
					catalogBody.classList.remove("_active");
					catalogWrapper.classList.remove("_active");
				}
			})
		});

	}
	myCatalog()
}
actionsHeader()