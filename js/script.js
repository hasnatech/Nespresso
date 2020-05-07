
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
  $scope.activity = {
    "drag": [{ "image": "image/icon_1.jpg" },
    { "image": "image/icon_2.jpg" },
    { "image": "image/icon_3.jpg" },
    { "image": "image/icon_4.jpg" },
    { "image": "image/icon_5.jpg" },
    { "image": "image/icon_6.jpg" },
    { "image": "image/icon_7.jpg" },
    { "image": "image/icon_8.jpg" },
    { "image": "image/icon_9.jpg" },
    { "image": "image/icon_10.jpg" },
    { "image": "image/icon_11.jpg" },
    { "image": "image/icon_12.jpg" },
    { "image": "image/icon_13.jpg" },
    { "image": "image/icon_14.jpg" },
    { "image": "image/icon_15.jpg" },
    { "image": "image/icon_16.jpg" },
    { "image": "image/icon_17.jpg" },
    { "image": "image/icon_18.jpg" },
    { "image": "image/icon_19.jpg" }]
  }
});
app.filter('safeHtml', function ($sce) {
  return function (val) {
    return $sce.trustAsHtml(val);
  };
});

(function ($) {

  $(document).ready(function () {

    setTimeout(function () {
      $(".load-wrapp").hide();
      $(".body").show();

      var tl = gsap.timeline();
      tl
        //Logo appearance
        .to(".logo", 0, { css: { display: "block" } })
        .from(".logo", {duration: 3, opacity: 0, scale:0.8, ease: "power4.out"})
        .to(".logo", {delay:5, duration: 1, opacity: 0, scale:0.8, ease: "power4.out"})
        .to(".logo", 0, { css: { display: "none" } })

        .to(".screen", { delay: .5, css: { display: "block" } })
        .from(".header", { duration: 1, y: -100 })
        .from(".video", {duration: 1, opacity: 0})  

      //$(".btn.next").click();
    }, 500);

    $(".btn.next").click(function () {
      var tl = gsap.timeline();
      tl.to(".video", { duration: 1, x: "-100%" })
        .to(".video", 0, { css: { display: "none" } })

        .to(".activity", 0, { css: { display: "block" } })
        .from(".activity", 1.8, {
          opacity:0,
        })
        
        .from(".drop", 1.8, {
          opacity:0,
          y: 100,
          ease: "power4.out",
          
          stagger: {
            amount: 1
          }
        })
        .to(".business_canvas", 0.2, { 
          css:{"border":"1px solid #000000"}
        })
        .from(".drag_panel", 1.8, {
          opacity:0,
          //y:50,
          ease: "power4.out"
        })
        .from(".icon", 1.8, {
          opacity:0,
          y:50,
          ease: "power4.out",
          stagger: {
            amount: 1
          }
        })

        
      //.from(".activity", {duration: 1, x: "100%"})
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
            $(".drag_panel").hide();
            $(".feedback").show();
          }
          return $(ui.draggable).addClass('drag-revert');
        }
      }
    });
    function isMatched(dr, dp){
      var dpArr = dp.split("|");
      for (let i = 0; i < dpArr.length; i++) {
        if(dpArr[i] == dr){
          return true;
        }
      }
      console.log(dpArr);
      return false;
    }
  });
})(jQuery);
