(function(){

    function setSidebars(){
        const sidebar = document.getElementById('sidebar');
        const friends_sidebar = document.getElementById('friends-sidebar');

        if(sidebar == undefined || friends_sidebar == undefined)
            return;

        const main = document.getElementById('layout-main');
        const main_width = main.getBoundingClientRect().width;
        const post = document.getElementById('feed-posts');
        const post_width = post.getBoundingClientRect().width;

        const bars_width = (main_width - post_width) / 2;

        sidebar.style.width = bars_width + 'px';
        friends_sidebar.style.width = bars_width + 'px';
    }

    function setSize(){
        const main = document.getElementById('layout-main');
        const header = document.getElementById('layout-header');
        const header_height = header.getBoundingClientRect().height;
        const window_height = window.innerHeight;
        main.style.height = window_height - header_height + 'px';
    }

    window.addEventListener('resize', setSize);
    window.addEventListener('resize', setSidebars);
    setSize();
    setSidebars();
})()