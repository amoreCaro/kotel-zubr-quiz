document.addEventListener('DOMContentLoaded', function() {
    console.log('SEO script loaded');
    document.querySelectorAll('.product__link__info').forEach(function(button) {
        button.addEventListener('click', function(e) {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productCategory = button.getAttribute('data-product-category');
            const productPrice = button.getAttribute('data-product-price');

            console.log('Product ID:', productId);
            console.log('Product Name:', productName);
            console.log('Product Category:', productCategory);
            console.log('Product Price:', productPrice);

            window.dataLayer = window.dataLayer || [];

            // Enhanced Ecommerce - view_item
            dataLayer.push({
                event: 'view_item',
                ecommerce: {
                    items: [{
                        item_id: productId,
                        item_name: productName,
                        item_category: productCategory,
                        price: parseFloat(productPrice)
                    }]
                }
            });

            // Google Ads Dynamic Remarketing
            dataLayer.push({
                event: 'productView',
                ecomm_prodid: productId,
                ecomm_pagetype: 'product',
                ecomm_totalvalue: parseFloat(productPrice)
            });
        });
    });
});

// SEO script to handle organic traffic and set UTM parameters

(function () {
    const SEARCH_ENGINES = [
        'google.',
        'bing.',
        'yahoo.',
        'duckduckgo.',
        'baidu.',
        'yandex.',
        'aol.',
        'ecosia.'
    ];

    const getDomainFromReferrer = (ref) => {
        try {
            const url = new URL(ref);
            return url.hostname.toLowerCase();
        } catch {
            return '';
        }
    };

    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}`;
    };

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : '';
    };

    const referrer = document.referrer;
    const refDomain = getDomainFromReferrer(referrer);
    const urlParams = new URLSearchParams(window.location.search);

    const hasUtm = ['utm_source', 'utm_medium', 'utm_campaign'].some(param => urlParams.has(param));
    const isOrganic = SEARCH_ENGINES.some(engine => refDomain.includes(engine));

    // Якщо є utm в URL — нічого не робимо
    if (!hasUtm) {
        if (isOrganic) {
            // Визначаємо точне джерело
            let source = SEARCH_ENGINES.find(engine => refDomain.includes(engine));
            if (source === 'google.') {
                source = 'www.google.com';
            } else {
                source = refDomain;
            }

            setCookie('utm_source', source, 30);
            setCookie('utm_medium', 'organic', 30);
            setCookie('utm_campaign', '(direct)', 30);
            setCookie('utm_content', '(not set)', 30);
            setCookie('utm_term', '(none)', 30);
        } else {
            // Прямий трафік
            setCookie('utm_source', '(direct)', 30);
            setCookie('utm_medium', '(none)', 30);
            setCookie('utm_campaign', '(direct)', 30);
            setCookie('utm_content', '(not set)', 30);
            setCookie('utm_term', '(none)', 30);
        }
    }

    // Автозаповнення форм
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(() => {
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (field) {
                const elements = document.querySelectorAll('.' + field);
                elements.forEach(function (el) {
                    el.value = getCookie(field);
                });
            });
        }, 100);
    });
})();

