$('.menu').on('click', function() {
    $(this).toggleClass('active');
    $('.overlay').toggleClass('menu-open');
});



$('.nav a').on('click', function() {
    $('.menu').removeClass('active');
    $('.overlay').removeClass('menu-open');
})

var scroll = new SmoothScroll('.data-scroll');




jQuery.scrollSpeed = function(step, speed) {

    var $document = $(document),
        $body = $('html, body'),
        option = 'default',
        root = top,
        scroll = false,
        scrollY,
        view;

    if (window.navigator.msPointerEnabled) {
        return false;
    }


    jQuery.event.special.mousewheel = {
        setup: function(_, ns, handle) {
            if (ns.includes("PreventDefault")) {
                this.addEventListener("mousewheel", handle, { passive: false });
            } else {
                return false;
            }
        }
    }

    allWindow.on('mousewheel.PreventDefault DOMMouseScroll', function(e) {

        var deltaY = e.originalEvent.wheelDeltaY,
            detail = e.originalEvent.detail;
        scrollY = $document.height() > allWindow.height();
        scroll = true;

        if (scrollY) {

            view = allWindow.height();

            if (deltaY < 0 || detail > 0) {
                root = (root + view) >= $document.height() ? root : root += step;
            }

            if (deltaY > 0 || detail < 0) {
                root = root <= 0 ? 0 : root -= step;
            }

            $body.stop().animate({
                scrollTop: root
            }, speed, option, function() {
                scroll = false;
            });
        }

        return false;

    }).on('scroll', function() {

        if (scrollY && !scroll) root = top;
        if (!scroll) root = allWindow.scrollTop();

    }).on('resize', function() {

        if (scrollY && !scroll) view = allWindow.height();

    });
};

jQuery.easing.default = function(x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

// initialize Smooth Scrolling Only in Modern browsers
if (animation) {
    jQuery.scrollSpeed(100, 700);
}




(function() {

    const target = document.querySelector(".target");
    const links = document.querySelectorAll(".underline a");
    const colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];

    function mouseenterFunc() {
        if (!this.parentNode.classList.contains("active")) {
            for (let i = 0; i < links.length; i++) {
                if (links[i].parentNode.classList.contains("active")) {
                    links[i].parentNode.classList.remove("active");
                }
                links[i].style.opacity = "0.25";
            }

            this.parentNode.classList.add("active");
            this.style.opacity = "1";

            const width = this.getBoundingClientRect().width;
            const height = this.getBoundingClientRect().height;
            const left = this.getBoundingClientRect().left;
            const top = this.getBoundingClientRect().top;
            const color = colors[Math.floor(Math.random() * colors.length)];

            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            target.style.borderColor = color;
            target.style.transform = "none";
        }
    }

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", (e) => e.preventDefault());
        links[i].addEventListener("mouseenter", mouseenterFunc);
    }

})();