window.onload = () => {
    'use strict';

    console.log("register service worker");
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/Bowling/sw.js');
    }
}
