$(document).ready(function() {

    let loader = $('.loader'), // Store loader element
        loading = $('.loading').wrapInner('<div></div>'),
        min = 20,
        max = 70,
        minMove = 10,
        maxMove = 20;

    startAnimation(loading);

    loading.on('animationend webkitAnimationEnd oAnimationEnd', 'span:last-child', e => {
        startAnimation(loading);
    });

    // Set CSS vars & generate spans if needed
    function setCSSVars(elem, min, max, minMove, maxMove) {
        let width = Math.ceil(elem.width()),
            text = elem.text();
        for(let i = 1; i < width; i++) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min,
                numMove = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
                dir = (i % 2 == 0) ? 1 : -1,
                spanCurrent = elem.find('span:eq(' + i + ')'),
                span = spanCurrent.length ? spanCurrent : $('<span />');
            span.css({
                '--x': i - 1 + 'px',
                '--move-y': num * dir + 'px',
                '--move-y-s': ((i % 2 == 0) ? num * dir - numMove : num * dir + numMove) + 'px',
                '--delay': i * 10 + 'ms'
            });
            if(!spanCurrent.length) {
                elem.append(span.text(text));
            }
        }
    }

    // Start animation
    function startAnimation(elem) {
        elem.removeClass('start');
        setCSSVars(elem, min, max, minMove, maxMove);
        void elem[0].offsetWidth;
        elem.addClass('start');

        // Hide loader and show site content after 3 seconds
        setTimeout(function() {
            loader.fadeOut(); // Fade out loader
            // Show site content or execute any other actions
            // Example: $('.site-content').fadeIn();
        }, 3550);
    }  
});


/* custom cursor */
document.addEventListener('mousemove', function(e) {
    document.querySelectorAll('.cursor')[0].style.left = e.clientX + 'px';
    document.querySelectorAll('.cursor')[0].style.top = e.clientY + 'px';
  
    setTimeout(function() {
      document.querySelectorAll('.cursor')[1].style.left = e.clientX + 'px';
      document.querySelectorAll('.cursor')[1].style.top = e.clientY + 'px';
    }, 120);
  });
  
  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('mouseenter', function() {
      document.querySelectorAll('.cursor').forEach(function(cursor) {
        cursor.classList.add('big');
      });
    });
  
    link.addEventListener('mouseleave', function() {
      document.querySelectorAll('.cursor').forEach(function(cursor) {
        cursor.classList.remove('big');
      });
    });
  });
  

/* Content Reveal on scroll */
window.addEventListener('scroll', reveal);

    function reveal()
    {
        var reveals = document.querySelectorAll('.reveal');

        for (var i = 0; i < reveals.length; i++)
        {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 150;

            if (revealtop < windowheight - revealpoint)
            {
                reveals[i].classList.add('active');
            }
            else
            {
                reveals[i].classList.remove('active');
            }
        }
    }
