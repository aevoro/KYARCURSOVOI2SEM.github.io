document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
    
            document.querySelectorAll('.service-card').forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-card')) {
            document.querySelectorAll('.service-card').forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("../XML/price-block.xml")
        .then(response => {
            if (!response.ok) {
                throw new Error("XML файл не найден или ошибка загрузки");
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            const insurances = xmlDoc.getElementsByTagName("insurance");

            Array.from(insurances).forEach(insurance => {
                const type = insurance.getAttribute("type");
                const title = insurance.getElementsByTagName("title")[0].textContent;
                const first = insurance.getElementsByTagName("first")[0].textContent;
                const second = insurance.getElementsByTagName("second")[0].textContent;
                const legal = insurance.getElementsByTagName("legal")[0].textContent;

                const block = document.querySelector(`.price-block[data-type="${type}"]`);
                if (block) {
                    block.innerHTML = `
                        <h3>${title}</h3>
                        <div class="price-list">
                            <div class="price-item">При первой страховке:</div>
                            <div class="price-item">${first}</div>
                            <div class="price-item">При повторной страховке:</div>
                            <div class="price-item">${second}</div>
                            <div class="price-item">Для Юридических лиц:</div>
                            <div class="price-item">${legal}</div>
                        </div>
                        <div class="cta-block">
                            <a href="second.html" class="cta-button">Оформить страховку онлайн</a>
                        </div>
                    `;
                }
            });
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });
});
