(function ($) {
  ("use strict");

  var nav = $("nav");
  var navHeight = nav.outerHeight();

  $(".navbar-toggler").on("click", function () {
    if (!$("#mainNav").hasClass("navbar-reduce")) {
      $("#mainNav").addClass("navbar-reduce");
    }
  });

  // START PRELOADED
  $(window).on("load", function () {
    $(".loader-wrapper").fadeOut();
    $(".loader-wrapper").delay(350).fadeOut("slow");
  });

  //  Porfolio isotope and filter
  $(window).on("load", function () {
    var projectIsotope = $(".project-container").isotope({
      itemSelector: ".project-grid-item",
    });

    $("#project-flters li").on("click", function () {
      $("#project-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      projectIsotope.isotope({
        filter: $(this).data("filter"),
      });
    });
  });

  // Navbar Menu Reduce
  $(window).trigger("scroll");
  $(window).on("scroll", function () {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $(".navbar-expand-md").addClass("navbar-reduce");
      $(".navbar-expand-md").removeClass("navbar-trans");
      $(".mylogo").attr("src", "../assets/image/logowhite.png");
    } else {
      $(".navbar-expand-md").addClass("navbar-trans");
      $(".navbar-expand-md").removeClass("navbar-reduce");
      $(".mylogo").attr("src", "../assets/image/logoblack.png");
    }
    if ($(window).scrollTop() > top) {
      $(".scrolltop-mf").fadeIn(1000, "easeInOutExpo");
    } else {
      $(".scrolltop-mf").fadeOut(1000, "easeInOutExpo");
    }
  });

  // Back to top button
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  //  Star ScrollTop
  $(".scrolltop-mf").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  //=====  WOW active
  new WOW().init();

  //  Star Scrolling nav
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - navHeight + 30,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: navHeight,
  });

  // HOME TYPED JS
  if ($(".element").length) {
    $(".element").each(function () {
      $(this).typed({
        strings: [
          $(this).data("text1"),
          $(this).data("text2"),
          $(this).data("text3"),
        ],
        loop: $(this).data("loop") ? $(this).data("loop") : false,
        backDelay: $(this).data("backdelay") ? $(this).data("backdelay") : 2000,
        typeSpeed: 10,
      });
    });
  }

  // Odometer JS
  $(".odometer").appear(function () {
    var odo = $(".odometer");
    odo.each(function () {
      var countNumber = $(this).attr("data-count");
      $(this).html(countNumber);
    });
  });
  window.odometerOptions = {
    duration: 30000,
    //,animation: 'count'
  };

  //  magnificPopup
  var magnifPopup = function () {
    $(".popup-img").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  };

  // Call the functions
  magnifPopup();
  /************************************************
   * Progressbar
   ***********************************************/
  if ($(".progress-line").length) {
    $(".progress-line").appear(
      function () {
        var el = $(this);
        var percent = el.data("width");
        $(el).css("width", percent + "%");
      },
      { accY: 0 }
    );
  }

  // owl-carousel
  $(".blogs .owl-carousel").owlCarousel({
    loop: !0,
    margin: 30,
    autoplay: !0,
    smartSpeed: 500,
    responsiveClass: !0,
    dots: !1,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1e3: {
        items: 3,
      },
    },
  }),
    $(".testimonials .owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      navText: [
        '<i class="fa fa-arrow-left"></i>',
        '<i class="fa fa-arrow-right"></i>',
      ],
      smartSpeed: 700,
      reponsiveClass: true,
      dots: true,
    });

  // tooltip
})(jQuery);
var learnMoreBtn = document.querySelectorAll(".learnMoreBtn");
console.log(learnMoreBtn);

var navbar = document.querySelector("#mainNav");
if(navbar.classList.contains(''))
console.log(navbar);

learnMoreBtn.forEach((learnMore) => {
  console.log(learnMore);
  learnMore.addEventListener("click", function () {
    if (learnMore.classList.contains("learnMoreMed")) {
      location.href = "https://goodnessmed.com";
    } else if (learnMore.classList.contains("learnMoreCorn")) {
      location.href = "https://mycornerstonemed.com";
    } else if (learnMore.classList.contains("learnMoreStg")) {
      location.href = "https://mystgei.com";
    } else if (learnMore.classList.contains("learnMoreTos")) {
      location.href = "https://tosvvischools.com/";
    } else if (learnMore.classList.contains("learnMorePow")) {
      location.href = "https://operations.powerecng.com/";
    } else if (learnMore.classList.contains("learnMoreMin")) {
      location.href = "https://min-bank-app.netlify.app/";
    }
  });
});
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};
