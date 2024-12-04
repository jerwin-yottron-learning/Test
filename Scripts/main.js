async function fetchHeaderAndFooter() {
    try {
        const headerResponse = await fetch("../header.html");
        if (!headerResponse.ok) {
            throw new Error('Network response was not ok for header');
        }
        const headerData = await headerResponse.text();
        
        const headerElement = document.getElementById('header')
        if (headerElement) {
            headerElement.innerHTML = headerData;
        }
        
        initHeader(); 
    } catch (error) {
        console.error('There was a problem with the fetch operation 1:', error);
    }
}

async function initHeader() {
    try {
        const footerResponse = await fetch("../footer.html");
        if (!footerResponse.ok) {
            throw new Error('Network response was not ok for footer');
        }
        const footerData = await footerResponse.text();
        
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = footerData;
        }
        
        initContent(); 
    } catch (error) {
        console.error('There was a problem with the fetch operation 2:', error);
    }
}

function initContent() {
   
    $(document).ready(function() {  
        const $contents = $('.drop');
        $(window).on('scroll', function() {
            const windowBottom = $(this).scrollTop() + $(this).height(); 
            $contents.each(function() {
                const elementTop = $(this).offset().top;
                if (windowBottom > elementTop + 50) { 
                    $(this).css({
                        'opacity': 1,
                        'transform': 'translateY(0)'
                    });
                } else {
                    $(this).css({
                        'opacity': 0,
                        'transform': 'translateY(-50px)'
                    });
                }
            });
        });
    });


    $('#top').click(function() {
        var $myDiv = $('#top-bar');
        var $content = $('#top-content');
        if ($content.is(':visible')) {
            $content.fadeOut(400);
            $myDiv.height($myDiv.height() - 165);
        } else {
            $myDiv.height($myDiv.height() + 165);
            $content.fadeIn(400);
            $content.css('display', 'block');
        }
    });


    const open_btn = document.querySelector('.open-btn');
    const close_btn = document.querySelector('.close-btn');
    const nav = document.querySelectorAll('.nav');
    
    if (open_btn && close_btn) { 
        open_btn.addEventListener('click', () => {
            nav.forEach(nav_el => nav_el.classList.add('visible'));
        });

        close_btn.addEventListener('click', () => {
            nav.forEach(nav_el => nav_el.classList.remove('visible'));
        });
    }

 
    const nav3 = document.getElementById('nav');
    const fadeInThreshold = 100;
    if (nav3) {  
        window.addEventListener('scroll', function() {
            if (window.scrollY > fadeInThreshold) {
                nav3.classList.add('show');
            } else {
                nav3.classList.remove('show');
            }
        });
    }
    const topbar = document.getElementById('top-bar-mobile');
    const topscroll = 100;
    if (topbar) {  
        window.addEventListener('scroll', function() {
            if (window.scrollY > topscroll) {
                topbar.classList.add('show-top');
            } else {
                topbar.classList.remove('show-top');
            }
        });
    }

    function setActiveNavItem() {
        const activeItem = localStorage.getItem('activeNavItem');
        const defaultItem = 'Home'; 
    
        if (activeItem) {
            document.querySelectorAll('.hover-border').forEach(item => {
                if (item.textContent === activeItem) {
                    item.classList.add('active');
                }
            });
        } else {
           
            document.querySelectorAll('.hover-border').forEach(item => {
                if (item.textContent === defaultItem) {
                    item.classList.add('active');
                    localStorage.setItem('activeNavItem', defaultItem); 
                }
            });
        }
    }
    
    document.querySelectorAll('.hover-border').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.hover-border').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            localStorage.setItem('activeNavItem', this.textContent);
        });
    });
    
  
    setActiveNavItem();
    



    
    
}


fetchHeaderAndFooter();








      