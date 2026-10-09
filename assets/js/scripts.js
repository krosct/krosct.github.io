// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});
// When the browser restores a page from the bfcache (back/forward button), clear
// the fadeOut state left by the zoombtn click so the content becomes visible
// immediately, without replaying the fadeIn animation (which caused a flicker).
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    $(".container, .wrapper").removeClass("fadeOut fadeIn").css("opacity", "");
  }
});

// Clear the fadeOut state before the page is frozen in the bfcache, so going
// back shows the restored page instantly (no blank frame and no animation).
window.addEventListener("pagehide", function () {
  $(".container, .wrapper").removeClass("fadeOut fadeIn").css("opacity", "");
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// FitVids options
$(function() {
  $(".content").fitVids();
});

// All others
$(document).ready(function() {
    // zoom in/zoom out animations
    if ($(".container").hasClass('fadeOut')) {
        $(".container").removeClass("fadeOut").addClass("fadeIn");
    }
    if ($(".wrapper").hasClass('fadeOut')) {
        $(".wrapper").removeClass("fadeOut").addClass("fadeIn");
    }
    // Fade the current page out, then navigate, so the fadeOut is actually seen.
    $(".zoombtn").click(function (event) {
        // Let modifier/new-tab clicks behave normally.
        if (event.which === 2 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        var href = $(this).attr("href");
        if (!href || href.charAt(0) === "#") {
            return;
        }
        event.preventDefault();
        $(".container, .wrapper").removeClass("fadeIn").addClass("fadeOut");
        // Wait for the 1s fadeOut to finish before switching pages.
        window.setTimeout(function () {
            window.location.href = href;
        }, 1000);
    });
    // go up button
    $.goup({
        trigger: 500,
        bottomOffset: 10,
        locationOffset: 20,
        containerRadius: 0,
        containerColor: '#fff',
        arrowColor: '#000',
        goupSpeed: 'normal'
    });
	$('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open. 
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});
