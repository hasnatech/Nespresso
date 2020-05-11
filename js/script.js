
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
  $scope.activity = {
    "drag": [
      { id: 0, "image": "image/icon_1.jpg" },
      { id: 1, "image": "image/icon_2.jpg" },
      { id: 2, "image": "image/icon_3.jpg" },
      { id: 3, "image": "image/icon_4.jpg" },
      { id: 4, "image": "image/icon_5.jpg" },
      { id: 5, "image": "image/icon_6.jpg" },
      { id: 6, "image": "image/icon_7.jpg" },
      { id: 7, "image": "image/icon_8.jpg" },
      { id: 8, "image": "image/icon_9.jpg" },
      { id: 9, "image": "image/icon_10.jpg" },
      { id: 10, "image": "image/icon_11.jpg" },
      { id: 11, "image": "image/icon_12.jpg" },
      { id: 12, "image": "image/icon_13.jpg" },
      { id: 13, "image": "image/icon_14.jpg" },
      { id: 14, "image": "image/icon_15.jpg" },
      { id: 15, "image": "image/icon_16.jpg" },
      { id: 16, "image": "image/icon_17.jpg" },
      { id: 17, "image": "image/icon_18.jpg" },
      { id: 18, "image": "image/icon_19.jpg" },
      { id: 19, "image": "image/icon_20.jpg" }]
  }
  $scope.modelClass = "hide";
  randomArrayShuffle($scope.activity.drag);
});
app.filter('safeHtml', function ($sce) {
  return function (val) {
    return $sce.trustAsHtml(val);
  };
});
function randomArrayShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
(function ($) {

  $(document).ready(function () {

    setTimeout(function () {
      $(".load-wrapp").hide();
      $(".body").show();

      var tl = gsap.timeline();
      tl
        //Logo appearance
        .to(".logo", 0, { css: { display: "block" } })
        .from(".logo", { duration: 3, opacity: 0, scale: 0.8, ease: "power4.out" })
        .to(".logo", { delay: 5, duration: 1, opacity: 0, scale: 0.8, ease: "power4.out" })
        .to(".logo", 0, { css: { display: "none" } })

        .to(".screen", { delay: .5, css: { display: "block" } })
        .from(".header", { duration: 1, y: -100 })
        .from(".video", { duration: 1, opacity: 0, onComplete: playVideo })

      //$(".btn.next").click();
    }, 500);


    function playVideo() {
      $(".player").get(0).play();
    }

    $(".back_btn").click(function () {
      var tl = gsap.timeline();
      tl.to(".back_btn", 1, {
        opacity: 0,
        x: -100,
        ease: "power4.out",
      })
        .to(".back_btn", 0, { css: { display: "none" } })
        .to(".activity", 1, {
          opacity: 0
        })
        .to(".video", 0, { css: { display: "block" } })
        .to(".video", { duration: 1, x: "0%" })
    });
    var next_first_time = true;
    $(".btn.next").click(function () {
      if (next_first_time) {
        next_first_time = false;
        var tl = gsap.timeline();
        tl.to(".activity", 0, {
          opacity: 1
        }).to(".video", { duration: 1, x: "-100%" })
          .to(".video", 0, { css: { display: "none" } })

          .to(".activity", 0, { css: { display: "block" } })
          .from(".activity", 1.8, {
            opacity: 0,
          })
          .to(".back_btn", 0, { css: { display: "block" } })
          .to(".back_btn", 1, {
            opacity: 1,
            x: 0,
            ease: "power4.out",
          })
          .from(".drop", 1.8, {
            opacity: 0,
            y: 100,
            ease: "power4.out",

            stagger: {
              amount: 1
            }
          })
          .to(".business_canvas", 0.2, {
            css: { "border": "1px solid #000000" }
          })
          .from(".drag_panel", 1.8, {
            opacity: 0,
            //y:50,
            ease: "power4.out"
          })
          .from(".icon", 1.8, {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            stagger: {
              amount: 1
            }
          })
      } else {
        var tl = gsap.timeline();
        tl
          .to(".video", { duration: 1, x: "-100%" })
          .to(".video", 0, { css: { display: "none" } })
          .to(".back_btn", 0, { css: { display: "block" } })
          .to(".back_btn", 1, {
            opacity: 1,
            x: 0,
            ease: "power4.out",
          })

          .to(".activity", 1, {
            opacity: 1
          })


      }

      //.from(".activity", {duration: 1, x: "100%"})
    })
    var is_play = true;

    $(".player").get(0).onended = function () {
      //alert("The audio has ended");
      $("#play").attr("src", "image/play.png");
      //$(".player").get(0).pause();
    }

    $("#play").click(function () {
      if (is_play) {
        $(this).attr("src", "image/play.png");
        $(".player").get(0).pause();
      } else {
        $(this).attr("src", "image/pause.png");
        $(".player").get(0).play();
      }
      is_play = !is_play;
      console.log(is_play);
    })


    $(".drag_item .icon").draggable({
      start: function () {
        $(this).removeClass('drag-revert');
      },
      revert: function () {
        if (!$(this).hasClass('drag-revert')) {
          $(this).data("uiDraggable").originalPosition = {
            top: 0,
            left: 0
          };
          $(this).removeClass('drag-revert');
          return true;
        }
      }
    });

    var cnt = 0;
    $(".drop").droppable({
      drop: function (e, ui) {
        console.log($(ui.draggable).attr("data-id") + " == " + $(this).attr("data-id"));
        //console.log($(ui.draggable).find("img").attr("src"));
        if (isMatched($(ui.draggable).attr("data-id"), $(this).attr("data-id"))) {
          $(ui.draggable).draggable({
            disabled: true
          })
          $(ui.draggable).hide();
          $(this).find(".dropped_item").append("<div class='placed'><img src='" + $(ui.draggable).find("img").attr("src") + "' /></div>")

          cnt++;
          if (cnt == $(".icon").length) {
            //$(".drag_panel").hide();
            //$(".feedback").show();
            $(".modal").fadeIn(500);
          }
          //$(".modal").fadeIn(500);
          return $(ui.draggable).addClass('drag-revert');
        }
      }
    });
    $("button.close").click(function () {
      $(".modal").hide();
    })
    $("button.exit").click(function () {
      $(".modal").hide();
      var tl = gsap.timeline();
      tl.to(".activity", 0.5, { opacity: 0 })
        .to(".header", 0.5, { opacity: 0, y: -100 })
        .to(".logo", 0, { css: { display: "block" } })
        .to(".logo", { duration: 2.8, opacity: 1, scale: 1, ease: "power4.out" })

    });
    function isMatched(dr, dp) {
      var dpArr = dp.split("|");
      for (let i = 0; i < dpArr.length; i++) {
        if (dpArr[i] == dr) {
          return true;
        }
      }
      console.log(dpArr);
      return false;
    }
  });
})(jQuery);
