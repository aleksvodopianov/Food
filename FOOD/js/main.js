import * as flsFunctions from './modules/functions.min.js';

flsFunctions.isWebp();

window.addEventListener('DOMContentLoaded', () => {
    //Timer
    function timer() {
        const deadLine = '2022-05-11';

        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);

            return {
                total: t,
                days,
                hours,
                minutes,
                seconds,
            };
        }

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

            updateClock();

            function updateClock() {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }
        setClock('.timer', deadLine);
    }
    timer();

    //Tabs
    function tabs() {
        const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach((item) => {
                item.classList.add('hide');
                item.classList.remove('animationFade', 'show');
            });
            tabs.forEach((tab) => {
                tab.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('animationFade', 'show');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }
        hideTabContent();
        showTabContent();
        tabsParent.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }
    tabs();

    //Modal
    function modal() {
        const modal = document.querySelector('.modal'),
            modalTrigger = document.querySelectorAll('[data-modal]'),
            modalCloseBtn = document.querySelector('[data-close]'),
            scroll = calcScroll();

        // btns.forEach(elem => {
        //     elem.addEventListener('click', () => {
        //         let text = event.target.textContent;
        //         if (text == 'Связаться с нами') {

        //         modal.classList.toggle('show');
        //         document.body.style.overflow = 'hidden';
        //     })
        // })

        //Modal On
        const openModalFunction = () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;

        };

        modalTrigger.forEach((btn) => {
            btn.addEventListener('click', () => {
                openModalFunction();
                clearInterval(modalTimer);
                window.removeEventListener('scroll', showModalByScroll);
            });
        });

        const modalTimer = setTimeout(openModalFunction, 5000);

        function showModalByScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >=
                document.documentElement.scrollHeight -1 
            ) {
                openModalFunction();
                window.removeEventListener('scroll', showModalByScroll);
                clearInterval(modalTimer);
            }
        }

        window.addEventListener('scroll', showModalByScroll);

        function calcScroll() {
            let div = document.createElement('div');

            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();

            return scrollWidth;
        }

        //Modal Off
        const closeModalFunction = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        };

        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target === modalCloseBtn) {
                closeModalFunction();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape' && modal.style.display === 'block') {
                closeModalFunction();
            }
        });
    }
    modal();
});
