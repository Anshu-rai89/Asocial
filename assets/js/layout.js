(function(){
    function setSize(){
        const main = document.getElementById('layout-main');
        const header = document.getElementById('layout-header');
        const header_height = header.getBoundingClientRect().height;
        const window_height = window.innerHeight;
        main.style.minHeight = window_height - header_height + 'px';
    }

    window.addEventListener('resize', setSize);
    setSize();
})()