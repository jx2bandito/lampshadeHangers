$(window).on("load", function() {
  
 
  //caching

  var lightSVG = $("#lightSVG");
  var lightPath = lightSVG.find("path");
  var ropeSVG = $("#ropeSVG");
  var shadeSVG = $("#shadeSVG");
  var hangWrapper = $("#hangWrapper");
  // var serviceSect = $("#serviceSect");
  // var contactSect = $("#contactSect");
  var toAbout;
  var toShop;
  var toContact;
  var endAnim;
  var introAnim = new TimelineMax();
  var initScroll;
  var scrollKey;
  var $selected = $("#selected");
  var initSelected;
  var $titleText = $("#titleText");
  var $animWrapper = $("#animWrapper");
  var $title = $(".title");
  var $lamptop = $("#lampTop");
  var $aboutText = $("#aboutText");
  var $shops = $("#openShop, #shopContainer");
  
  ///////////////Smooth scrolling
  var scrollKey = {
    introLink: function() {
      return 0;
    },
    aboutLink: function() {
      return $(window).height() * 2;
    },
    shopLink: function() {
      return this.aboutLink() * 2;
    },
    contactLink: function() {
      return this.aboutLink() * 3;
    }
  };

  function initSelected() {
    $selected.css("width", initSelected.clicked.width());
    $selected.offset(initSelected.clicked.offset());
  }

  initSelected.clicked = $("#introLink");
  initSelected.moving = false;
  initSelected();

  $(".links").on("click", function() {
    var speed = 3500;
    var xThis = this;
    initSelected.moving = true;
    $("body, html").stop().animate(
      {
        scrollTop: scrollKey[xThis.id]()
      },
      speed
    );

    var moveSelectedLeft = new TimelineMax({
      onStart: function() {
        initSelected.clicked = $(xThis);
      }
    })
      .to($selected, 0.25, {
        width: $selected.offset().left -
          $(xThis).offset().left +
          $(xThis).width(),
        left: $(xThis).offset().left,
        onUpdate: function() {
          $selected.css("opacity", 1);
        }
      })
      .to($selected, 0.25, {
        width: $(xThis).width()
      })
      .to($selected, 0.25, {
        opacity: 0,
        onComplete: function() {
          initSelected.moving = false;
        }
      })
      .pause();

    var moveSelectedRight = new TimelineMax({
      onStart: function() {
        initSelected.clicked = $(xThis);
      }
    })
      .to($selected, 0.25, {
        width: $(xThis).offset().left -
          $selected.offset().left +
          $(xThis).width(),
        onUpdate: function() {
          $selected.css("opacity", 1);
        }
      })
      .to($selected, 0.25, {
        left: $(xThis).offset().left,
        width: $(xThis).width()
      })
      .to($selected, 0.25, {
        opacity: 0,
        onComplete: function() {
          initSelected.moving = false;
        }
      })
      .pause();

    if ($(xThis).offset().left < $selected.offset().left) {
      moveSelectedLeft.play();
      return;
    } else if ($(xThis).offset().left > $selected.offset().left) {
      moveSelectedRight.play();
      return;
    }
  });

  
  ///////SVG Light on by default
  TweenMax.to(lightPath, 1, {
    attr: {
      d: lightState.lightOn
    }
  });

  //////////////Run after beginning animation ends

  function endAnim() {
    TweenMax.to($animWrapper, 1, {
      height: "100vh"
    });

    TweenMax.to("body", 2, {
      backgroundColor: $("#shine").css("borderBottomColor"),
      onComplete: function() {
        $(hangWrapper).hide();
        $("body, html").addClass("openHeight");
        $("#mainField").show();
        setTimeout(initScroll, 100);
        TweenMax.fromTo(
          ".navigators",
          1,
          {
            autoAlpha: 0
          },
          {
            autoAlpha: 1
          }
        );
      }
    });
  }

  ///////////////Beginning animation
  setTimeout(function() {
    introAnim
      .to(
        "body",
        1,
        {
          backgroundColor: $("#lampText").css("color")
        },
        "intro"
      )
      .to(
        lightPath,
        1,
        {
          attr: {
            d: lightState.lightOff
          }
        },
        "intro"
      )
      .to(lightPath, 1, {
        fill: "rgba(255, 255, 255, .7)"
      })
      .to(
        lightSVG,
        1,
        {
          rotation: 180
        },
        "intro"
      )
      .to(
        lightSVG,
        1,
        {
          width: "5vw",
          height: "5vw",
          y: "-=2vw",
          ease: Bounce.easeOut,
          delay: 1
        },
        "intro"
      )
      .fromTo(
        hangWrapper,
        0.5,
        {
          y: "-=100%",
          autoAlpha: 0
        },
        {
          y: "+=90%",
          autoAlpha: 1,
          ease: Power3.easeOut
        },
        "intro +2"
      )
      .to(
        "#header",
        0.5,
        {
          y: "+=75px",
          autoAlpha: 1,
          ease: Power3.easeOut
        },
        "intro +2"
      )
      .to(
        "#shine",
        0.5,
        {
          autoAlpha: 1,
          onStart: function() {
            lightSVG.hide();
            $("#lampText").show();
          }
        },
        "intro +3"
      )
      .to(hangWrapper, 1, {
        rotation: 55,
        y: "-=2vw",
        ease: Power2.easeInOut
      })
      .to(hangWrapper, 1, {
        rotation: -55,
        y: "-=7%",
        ease: Power2.easeInOut
      })
      .to(hangWrapper, 0.7, {
        rotation: 25,
        y: "-=7%",
        ease: Power2.easeInOut
      })
      .to(hangWrapper, 0.7, {
        rotation: -15,
        y: "-=7%",
        ease: Power2.easeInOut
      })
      .to(hangWrapper, 0.7, {
        rotation: 7,
        y: "-=7%",
        ease: Power2.easeInOut
      })
      .to(hangWrapper, 0.7, {
        rotation: 0,
        y: "-=7%",
        ease: Power2.easeInOut
      })
      .to(hangWrapper, 0.7, {
        rotation: 0,
        y: "-=7%",
        ease: Power2.easeInOut
      })
      .to(hangWrapper, 0.7, {
        rotation: 0,
        y: "-=7%",
        ease: Power2.easeInOut,
        onComplete: endAnim
      })
      .play()
      .timeScale(1.5);
  }, 1500);
  
  
   var changeTitle = {
    aboutTitle: function() {
      $titleText.html("About Us");
    },
    shopTitle: function() {
      $titleText.html("Shop");
    },
    contactTitle: function() {
      $titleText.html("Contact");
    }
  };

  var scrollAnimations = {
    aboutScroll: new TimelineMax({
      onStart: function() {}
    })
      .to(
        $animWrapper,
        75,
        {
          y: "-10%",
          onUpdate: changeTitle.aboutTitle
        },
        "a"
      )
      .from(
        $title,
        15,
        {
          autoAlpha: 0,
          delay: 30,
          borderBottomWidth: "2em",
          borderTopWidth: "2em",
          backgroundColor: "gray",
          ease: Back.easeOut
        },
        "a+=45"
      )
      .from($titleText, 1, {
        autoAlpha: 0,
        delay: 1,
        onStart: function() {
          if (!initSelected.moving) {
            initSelected.clicked = $("#aboutLink");
            initSelected();
          }
        }
      })
      .from(
        $lamptop,
        30,
        {
          y: "-100%",
          ease: Back.easeOut,
          delay: 6
        } /*, "a"*/
      )
      .from($lamptop, 7, {
        scale: 1.05,
        webkitFilter: "blur(.03vmax)"
      })
      .from(
        $aboutText,
        30,
        {
          x: "20%",
          autoAlpha: 0
        },
        "-=1"
      )
      .pause(),

    shopScroll: new TimelineMax()
      .to($aboutText, 8, {
        x: "-20%",
        autoAlpha: 0
      })
      .to($lamptop, 8, {
        rotation: 90,
        ease: Back.easeIn
      })
      .to(
        $title,
        15,
        {
          autoAlpha: 0,
          delay: 8,
          borderBottomWidth: "2em",
          borderTopWidth: "2em",
          backgroundColor: "gray",
          ease: Back.easeOut,
          onUpdate: changeTitle.aboutTitle,
          onComplete: changeTitle.shopTitle,
          onStart: function() {
            if (!initSelected.moving) {
              initSelected.clicked = $("#shopLink");
              initSelected();
            }
          }
        },
        "a+=4"
      )
      .to($title, 15, {
        autoAlpha: 1,
        borderBottomWidth: "0",
        borderTopWidth: "0",
        backgroundColor: "white",
        ease: Back.easeOut
      })
      .fromTo(
        $shops,
        7,
        {
          autoAlpha: 0
        },
        {
          autoAlpha: 1
        }
      )
      .staggerFrom(
        ".choice",
        7,
        {
          cycle: {
            x: [0, "-80%", 0, "80%"],
            y: ["-80%", 0, "80%", 0]
          },
          autoAlpha: 0,
          ease: Back.easeOut
        },
        5
      )
      .pause(),
    
    contactScroll:  new TimelineMax()
      .staggerTo(".choice", 30,{
        cycle: {
          rotation: ["80%", "-80%", "80%", "-80%"]
        },
		scale: 0,
        autoAlpha: 0,
        ease:Back.easeOut
      }, 5)
      .to($shops, 5, {
        scale: 0,
        autoAlpha: 0
      }, "+=10")
      .to(
        $title,
        15,
        {
          autoAlpha: 0,
          delay: 8,
          borderBottomWidth: "2em",
          borderTopWidth: "2em",
          backgroundColor: "gray",
          ease: Back.easeOut,
          onUpdate: changeTitle.shopTitle,
          onComplete: changeTitle.contactTitle,
          onStart: function() {
            if (!initSelected.moving) {
              initSelected.clicked = $("#contactLink");
              initSelected();
            }
          }
        },
        "a+=4"
      )
      .to($title, 15, {
        autoAlpha: 1,
        borderBottomWidth: "0",
        borderTopWidth: "0",
        backgroundColor: "white",
        ease: Back.easeOut
      })
      .from("#contactSection", 30, {
        autoAlpha: 0,
        rotationX: 180,
        y: "-10%",
        ease: Back.easeOut
      })
      .staggerFrom(".cInfo, textArea, input", 15, {
         y: "-10%",
         autoAlpha: 0,
        
      }, 5)
      .from(".cSubmit", 15, {
        x: "30%",
        autoAlpha: 0
      })
      .staggerFrom("i", 30, {
        y: "50%",
        autoAlpha: 0,
        ease: Back.easeOut
      }, 10, "-=25")
      .pause()
  };

  function initScroll() {
    var controller = new ScrollMagic.Controller();
    var aboutScene = new ScrollMagic.Scene({
      triggerHook: 0,
      duration: scrollKey.aboutLink()
    })
      // .addIndicators({
      //   name: "about",
      //   colorStart: "blue",
      //   colorTrigger: "black"
      // })
      .setTween(scrollAnimations.aboutScroll.play())
      .addTo(controller);

    var shopScene = new ScrollMagic.Scene({
      offset: scrollKey.aboutLink(),
      triggerHook: 0,
      duration: scrollKey.aboutLink()
    })
      //   .addIndicators({
      //     name: "shop",
      //     colorStart: "green",
      //     colorTrigger: "green"
      //   })
      .setTween(scrollAnimations.shopScroll.play())
      .addTo(controller);
    
    var contactScene = new ScrollMagic.Scene({
      offset: scrollKey.shopLink(),
      triggerHook: 0,
      duration: scrollKey.aboutLink()
    })
      .setTween(scrollAnimations.contactScroll.play())
      .addTo(controller);
    
    
    var pinMainField = new ScrollMagic.Scene({
      triggerElement: "#mainField",
      offset: -75,
      triggerHook: 0
    })
      //   .addIndicators({
      //     name: "pin",
      //     colorStart: "green",
      //     colorTrigger: "white",
      //     colorEnd: "green"
      //   })
      .setPin("#mainField")
      .addTo(controller);



    ///////////Messy, but there's no event delegation in GSAP
    $("#sortSelect").on("change", function(){
      scrollAnimations.contactScroll.kill();
      scrollAnimations.shopScroll.kill();
      scrollAnimations.contactScroll = new TimelineMax()
      .staggerTo(".choice", 30,{
        cycle: {
          rotation: ["80%", "-80%", "80%", "-80%"]
        },
        autoAlpha: 0,
        ease:Back.easeOut
      }, 5)
      .to($shops, 5, {
        scale: 0,
        autoAlpha: 0
      }, "+=10")
      .to(
        $title,
        15,
        {
          autoAlpha: 0,
          delay: 8,
          borderBottomWidth: "2em",
          borderTopWidth: "2em",
          backgroundColor: "gray",
          ease: Back.easeOut,
          onUpdate: changeTitle.shopTitle,
          onComplete: changeTitle.contactTitle,
          onStart: function() {
            if (!initSelected.moving) {
              initSelected.clicked = $("#contactLink");
              initSelected();
            }
          }
        },
        "a+=4"
      )
      .to($title, 15, {
        autoAlpha: 1,
        borderBottomWidth: "0",
        borderTopWidth: "0",
        backgroundColor: "white",
        ease: Back.easeOut
      })
      .fromTo("#contactSection", 30, {
        autoAlpha: 0,
        rotationX: 180,
        y: "-10%",
        ease: Back.easeOut
      },{
        autoAlpha: 1,
        rotationX: 0,
        y: "0%"
      })
      .staggerFromTo(".cInfo, textArea, input", 15, {
         y: "-10%",
         autoAlpha: 0,
        
      }, {
        y: "5%",
        autoAlpha: 1
      }, 5)
      .fromTo(".cSubmit", 15, {
        x: "30%",
        autoAlpha: 0
      },{
        x: "-15%",
        autoAlpha: 1
      })
      .staggerFromTo("i", 30, {
        y: "50%",
        autoAlpha: 0
      },{
        y: "-25%",
        autoAlpha: 1,
        ease: Back.easeOut
      }, 10, "-=25")
      .pause();
      
      var contactScene = new ScrollMagic.Scene({
      offset: scrollKey.shopLink(),
      triggerHook: 0,
      duration: scrollKey.aboutLink()
    })
      .setTween(scrollAnimations.contactScroll.play())
      .addTo(controller);
      
      
      
      scrollAnimations.shopScroll =  new TimelineMax()
      .fromTo($aboutText, 8, {
        x: "0%",
        autoAlpha: 1
      }, {
        x: "10%",
        autoAlpha: 0
      })
      .fromTo($lamptop, 8, {
        rotation: 0,
        ease: Back.easeIn
      }, {
        rotation: 90
      })
      .to(
        $title,
        15,
        {
          autoAlpha: 0,
          delay: 8,
          borderBottomWidth: "2em",
          borderTopWidth: "2em",
          backgroundColor: "gray",
          ease: Back.easeOut,
          onUpdate: changeTitle.aboutTitle,
          onComplete: changeTitle.shopTitle,
          onStart: function() {
            if (!initSelected.moving) {
              initSelected.clicked = $("#shopLink");
              initSelected();
            }
          }
        },
        "a+=4"
      )
      .to($title, 15, {
        autoAlpha: 1,
        borderBottomWidth: "0",
        borderTopWidth: "0",
        backgroundColor: "white",
        ease: Back.easeOut
      })
      .fromTo(
        $shops,
        7,
        {
          autoAlpha: 0
        },
        {
          autoAlpha: 1
        }
      )
      .staggerFrom(
        ".choice",
        7,
        {
          cycle: {
            x: [0, "-80%", 0, "80%"],
            y: ["-80%", 0, "80%", 0]
          },
          autoAlpha: 0,
          ease: Back.easeOut
        },
        5
      )
      .pause();
      
          var shopScene = new ScrollMagic.Scene({
      offset: scrollKey.aboutLink(),
      triggerHook: 0,
      duration: scrollKey.aboutLink()
    })
      .setTween(scrollAnimations.shopScroll.play())
      .addTo(controller);
      
    });
    
    $(window).on("resize", function() {
      aboutScene.duration(scrollKey.aboutLink());
      shopScene.offset(scrollKey.aboutLink());
      shopScene.duration(scrollKey.aboutLink());
      contactScene.offset(scrollKey.shopLink());
      contactScene.duration(scrollKey.aboutLink());
      initSelected();
    });
  }
  
});


///mCustomScrollbar settings
var customScroll = function($) {
  $(window).on("load", function() {
    $("#aboutText, #shopContainer").mCustomScrollbar({
      theme: "light",
      alwaysShowScrollbar: 0,
      scrollbarPosition: "outside",
      scrollInertia: 500,
      mouseWheel: { preventDefault: true }
    });
  });
};
customScroll(jQuery);

$(document).ready(function() {
  /////Shop Page
  
  
  var lamps = [];
  var shopArray = [];
  var defineCart;
  var updateStock;
  var $sortSelect = $("#sortSelect");
  var $choiceArea = $("#choiceArea");
  var $openShop = $("#openShop");
  var $shopSheet = $("#shopSheet");
  var $back = $(".emptyBack, .checkoutBack");
  var $checkoutPage = $(".checkoutPage");
  var $displayShop = $(".displayShop");
  var $priceTotal = $(".priceTotal");
  var $checkout = $(".checkout");
  var $emptyMsg = $(".emptyMsg");
  
  
  
  function lamp(lName, price, imgC, objectName, maxStock = 20) {
    this.lName = lName;
    this.price = price;
    this.imgC = imgC;
    this.objectName = objectName;
    this.maxStock = maxStock;
    this.inCart = 0;

    this.stock = function() {
      return this.maxStock - this.inCart;
    };

    lamps.push(this);
    return;
  }

  var purpleLamp = new lamp("Purple", 24.99, "purple", "purpleLamp", 15);
  var redLamp = new lamp("Tomato", 19.99, "#ea2a2a", "redLamp", 50);
  var blueLamp = new lamp("Blue", 19.99, "#2a2aea", "blueLamp", 26);
  var plainLamp = new lamp("Plain", 15.99, "#795548", "plainLamp", 1000);
  // var pcLamp = new lamp("Perfect Cylinder", 24.99);
  var deluxeLamp = new lamp("Deluxe", 99.99, "#dede7e", "deluxeLamp", 10);
  var divineLamp = new lamp("Divine", 999.99, "White", "divineLamp", 1);
  var dragonLamp = new lamp("Black Dragon", 49.99, "#1f1f1f", "dragonLamp", 5);
  var tinyLamp = new lamp("Tiny", 5.99, "pink", "tinyLamp", 100);

  ////////////HTML template to add lamps
  function addLamps() {
    $(".choice").remove();
    $.each(lamps, function(index, elemObj) {
      $choiceArea.append(
        "<div class=choice><div class=image style='background-color: " +
          elemObj.imgC +
          " '></div><span class=description>" +
          elemObj.lName +
          " Lampshade</span><button class=addCart object-name=" +
          elemObj.objectName +
          '><span class="fa fa-shopping-cart" aria-hidden="true"></span> Add to Cart</button><span class=price>$' +
          elemObj.price +
          "</span><span class=stock>In Stock: <span class=stockNum>" +
          elemObj.stock() +
          "</span></span></div>"
      );
    });
  }

  var sortType = {
    sortCheap: function(a, b) {
      return a.price > b.price;
    },
    sortExp: function(a, b) {
      return a.price < b.price;
    },
    sortAZ: function(a, b) {
      return a.lName > b.lName;
    },
    sortZA: function(a, b) {
      return a.lName < b.lName;
    }
  };

  lamps.sort(sortType.sortCheap);
  addLamps();

  $sortSelect.on("change", function() {
    var sortVal = $sortSelect.val();
    lamps.sort(sortType[sortVal]);
    addLamps();
  });

  function animateCart() {
    TweenMax.fromTo(
      $openShop,
      0.5,
      {
        backgroundColor: "#1afa1a",
        paddingRight: 0
      },
      {
        backgroundColor: "white",
        paddingRight: 6
      }
    );
  }

  var isOpen = false;

  $openShop.on("click", function() {
    defineCart();

    $checkoutPage.hide();
    if (!isOpen) {
      $choiceArea.hide("fold", 1, function() {
        $shopSheet.show("fade", 1);
      });
      isOpen = true;
      return;
    } else if (isOpen) {
      $shopSheet.hide("fade", 1, function() {
        $choiceArea.show("fold", 1);
      });
      isOpen = false;
      return;
    }
  });

  $shopSheet.on("keypress", "form", function(event) {
    ////////////Make sure keyboard-inputed value does not go past min max limit

    var input = $(this).find("input");
    var max = Number(input.attr("max"));
    var min = Number(input.attr("min"));
    var val;

    setTimeout(function() {
      val = Number($("input").val());

      if (val > max) {
        input.val(max);
        input.submit();
        return;
      }
      if (val < min || val == "") {
        input.val(min);
        input.submit();
        return;
      }
      input.submit();
      return;
    }, 10);
  });

  $shopSheet.on("change", "form", function() {
    $(this).find("input").submit();
  });

  function defineTotal() {
    var total = 0;
    $.each(shopArray, function(index, l) {
      total = total + l.price * l.inCart;
    });
    $priceTotal.html("$" + (Math.round(total * 100) / 100).toFixed(2));
  }

  $(document).on("click", ".addCart", function() {
    let $this = $(this);
	let elemString = $this.attr("object-name");
	let elemObj = null;
	
	for(var i = 0; i < lamps.length; i++){
		if(lamps[i].objectName == elemString ){
			elemObj = lamps[i];
			break;
		}
	}
	
    if (elemObj.stock() === 0) {
      return;
    }

    animateCart();

    if (shopArray.indexOf(elemObj) == -1) {
      shopArray.push(elemObj);
    }

    elemObj.inCart++;
    $this.siblings().find(".stockNum").html(elemObj.stock());
  });

  $shopSheet.on("submit", ".shopPrice", function(event) {
    event.preventDefault();
    let $thisItem = $(this).parent().parent();
	let elemString = $thisItem.attr("object-name");
	let elemObj = null;
	
	for(var i = 0; i < lamps.length; i++){
		if(lamps[i].objectName == elemString ){
			elemObj = lamps[i];
			break;
		}
	}
	
    elemObj.inCart = Number($thisItem.find("input").val());

    $("button[object-name=" + $thisItem.attr("object-name") + "]")
      .parent()
      .find(".stockNum")
      .html(elemObj.stock());

    defineTotal();
  });

  $back.on("click", function() {
    $openShop.click();
  });

  $checkout.on("click", function() {
    $displayShop.hide();
    $checkoutPage.show();
  });

  $shopSheet.on("click", ".removeItem", function() {
    var $thisSheet = $(this).parent().parent();
	let elemString = $thisSheet.attr("object-name");
	let elemObj = null;
	
	for(var i = 0; i < lamps.length; i++){
		if(lamps[i].objectName == elemString ){
			elemObj = lamps[i];
			break;
		}
	}
	
    elemObj.inCart = 0;

    $("button[object-name=" + elemObj.objectName + "]")
      .parent()
      .find(".stockNum")
      .html(elemObj.stock());
    if (shopArray.indexOf(elemObj) > -1) {
      shopArray.splice(shopArray.indexOf(elemObj), 1);
    }
    $thisSheet.hide("fade", function() {
      defineCart();
    });
  });

  function defineCart() {
    if (shopArray.length == 0) {
      $displayShop.hide();
      $emptyMsg.show();
    } else {
      $displayShop.show();
      $emptyMsg.hide();
    }
    defineTotal();

    $(".shopItem").remove();
    shopArray.forEach(function(elemObj) {
      $displayShop.prepend(
        "<div class=shopItem object-name=" +
          elemObj.objectName +
          '><hr><div style="background-color:' +
          elemObj.imgC +
          '"class="shopImage"></div><div class=sWrapper><div class=shopDescription>' +
          elemObj.lName +
          ' Lampshade</div><span class="fa fa-trash removeItem"></span><form class=shopPrice>$' +
          elemObj.price +
          ' x <input type="number" name="quantity" min="1" max=' +
          elemObj.maxStock +
          ' value="' +
          elemObj.inCart +
          '"></form></div></div>'
      );
    });
  }
});



var lightState = {
  lightOn: "m319.51459,524.91112c-18.78022,-5.71483 -29.66014,-29.20976 -28.37679,-50.52359c-0.48078,-27.83984 1.75843,-57.13445 -9.84719,-82.73287c-6.61506,-19.1128 -17.88387,-35.98772 -22.58652,-55.90533c-5.85196,-30.90083 1.37646,-65.92379 23.15604,-86.66871c24.56224,-24.1426 63.78627,-27.28931 90.82442,-6.76957c19.07021,15.06807 32.82979,39.9205 32.31862,67.04034c2.23767,20.26454 -4.73455,39.32508 -12.9366,56.74576c-5.87643,14.02662 -12.73924,27.75235 -18.07301,41.93537c-1.40611,29.08044 -0.59968,58.42761 -4.41361,87.25791c-6.3533,22.34018 -30.29648,37.52929 -50.06536,29.62068l0,0.00001zm49.60137,-51.99631c-11.14554,-6.8915 -27.16161,-2.41098 -40.11666,-3.89461c-10.58257,2.42803 -29.38666,-4.98009 -35.01257,6.1324c12.86609,5.77334 27.98645,1.44555 41.68363,2.40073c10.9598,-1.20745 23.5693,1.14503 33.4456,-4.63853l0,0.00001zm-0.83472,-12.9678c1.64025,-17.50847 -22.4963,-8.57421 -32.30147,-11.1806c-12.97779,3.01321 -33.63075,-6.44986 -41.79275,7.00248c4.83655,13.51858 26.40628,4.01112 37.73294,7.01054c12.07874,-0.49098 24.60983,0.4966 36.36127,-2.83242l0.00001,0zm0.15027,-30.67637c3.18633,-34.10695 21.36606,-62.50531 31.89294,-93.70451c8.6551,-37.3544 -8.48607,-80.03007 -39.51997,-95.70986c-30.88948,-17.56107 -72.04426,-4.29474 -89.50093,30.11579c-16.81962,28.42399 -13.60972,67.04426 2.82936,94.68636c11.72969,24.15775 21.08818,51.30598 19.56371,79.42006c24.34809,0 48.6962,0 73.04431,0c0.56355,-4.93588 1.12691,-9.87209 1.69057,-14.80785l0.00001,0.00001zm-53.90262,-48.32031c-9.64682,-19.2408 -19.54999,-38.62986 -26.26755,-59.48217c6.03952,-8.96786 7.79645,-18.95711 9.67261,-29.4939c16.95113,-3.81939 -2.15768,22.15873 13.84659,22.74415c14.20623,7.09022 7.97417,-34.40398 19.77698,-19.44728c-8.47247,16.41487 16.64218,32.74455 17.5639,9.26233c-1.21751,-17.73019 15.17996,-14.40828 8.78692,1.67665c0.52766,8.27438 12.27195,10.64653 12.47303,17.30151c-8.45472,21.03661 -15.80369,42.75527 -25.81504,62.89423c-2.25344,-7.79726 8.86299,-27.33977 12.41513,-38.81425c6.85432,-9.91871 12.74432,-36.64881 -5.12448,-33.00522c-10.36548,18.54565 -24.30925,-11.6902 -34.4585,6.08303c-8.61565,2.94801 -22.16619,-17.11588 -24.6655,2.17592c6.48895,22.91373 19.991,42.44204 27.0555,65.11924c-2.39717,-1.62125 -3.76218,-4.46559 -5.25959,-7.01425l0,0.00001zm-13.54036,-83.97601c-4.691,-2.62623 1.97721,13.96154 -0.0001,0l0.0001,0zm28.03801,1.95925c-6.08941,-11.82155 -2.82355,14.34324 0,0zm27.1768,0c-6.08941,-11.82155 -2.8236,14.34324 0,0zm-126.52068,-87.35107c-10.7629,-12.53011 -22.65996,-24.28756 -32.02015,-38.09919c23.38379,22.20383 44.7866,47.2101 65.85989,72.27899c5.59589,8.82064 -9.7624,-8.23704 -12.62081,-11.09629c-7.15207,-7.59806 -14.21047,-15.31162 -21.21893,-23.08352l0.00001,0l-0.00001,0.00001zm166.20083,35.8249c18.19193,-26.00135 35.16542,-53.26009 54.779,-77.87639c-3.28426,10.59854 -13.85654,23.28047 -20.50399,34.19601c-11.1012,15.84265 -21.47791,32.59333 -34.17242,46.79782c-1.58441,1.92106 -3.95032,-2.62912 -0.10242,-3.11744l-0.00016,0l-0.00001,0zm-39.40415,-24.66712c6.28547,-20.62279 15.40265,-40.25325 25.57415,-58.71017c-0.2364,10.23898 -11.02403,29.64525 -16.20923,42.34119c-2.93324,5.10896 -5.40734,13.25669 -9.36492,16.36899l0,-0.00001zm-80.49147,-26.44796c-4.37841,-7.32595 -17.55859,-24.38421 -15.09765,-26.7105c12.70739,16.16193 25.6318,32.84355 34.76018,51.95643c-7.77373,-6.83911 -13.36725,-16.71705 -19.66254,-25.24593l0.00001,0zm50.32089,-5.7656c-0.88613,-6.88006 1.86468,-39.72397 -1.09967,-16.68921c-1.2792,-24.99909 0,0 0,0l1.09967,16.68921z",

  lightOff: "m319.51459,554.91112c-18.78022,-5.71483 -29.66014,-29.20976 -28.37679,-50.52359c-0.48078,-27.83984 1.75843,-57.13445 -9.84719,-82.73287c-6.61506,-19.1128 -17.88387,-35.98772 -22.58652,-55.90533c-5.85196,-30.90083 1.37646,-65.92379 23.15604,-86.66871c24.56224,-24.1426 63.78627,-27.28931 90.82442,-6.76957c19.07021,15.06807 32.82979,39.9205 32.31862,67.04034c2.23767,20.26454 -4.73455,39.32508 -12.9366,56.74576c-5.87643,14.02662 -12.73924,27.75235 -18.07301,41.93537c-1.40611,29.08044 -0.59968,58.42761 -4.41361,87.25791c-6.3533,22.34018 -30.29648,37.52929 -50.06536,29.62068l0,0.00001zm49.60137,-51.99631c-11.14554,-6.8915 -27.16161,-2.41098 -40.11666,-3.89461c-10.58257,2.42803 -29.38666,-4.98009 -35.01257,6.1324c12.86609,5.77334 27.98645,1.44555 41.68363,2.40073c10.9598,-1.20745 23.5693,1.14503 33.4456,-4.63853l0,0.00001zm-0.83472,-12.9678c1.64025,-17.50847 -22.4963,-8.57421 -32.30147,-11.1806c-12.97779,3.01321 -33.63075,-6.44986 -41.79275,7.00248c4.83655,13.51858 26.40628,4.01112 37.73294,7.01054c12.07874,-0.49098 24.60983,0.4966 36.36127,-2.83242l0.00001,0zm0.15027,-30.67637c3.18633,-34.10695 21.36606,-62.50531 31.89294,-93.70451c8.6551,-37.3544 -8.48607,-80.03007 -39.51997,-95.70986c-30.88948,-17.56107 -72.04426,-4.29474 -89.50093,30.11579c-16.81962,28.42399 -13.60972,67.04426 2.82936,94.68636c11.72969,24.15775 21.08818,51.30598 19.56371,79.42006c24.34809,0 48.6962,0 73.04431,0c0.56355,-4.93588 1.12691,-9.87209 1.69057,-14.80785l0.00001,0.00001zm-53.90262,-48.32031c-9.64682,-19.2408 -19.54999,-38.62986 -26.26755,-59.48217c6.03952,-8.96786 7.79645,-18.95711 9.67261,-29.4939c16.95113,-3.81939 -2.15768,22.15873 13.84659,22.74415c14.20623,7.09022 7.97417,-34.40398 19.77698,-19.44728c-8.47247,16.41487 16.64218,32.74455 17.5639,9.26233c-1.21751,-17.73019 15.17996,-14.40828 8.78692,1.67665c0.52766,8.27438 12.27195,10.64653 12.47303,17.30151c-8.45472,21.03661 -15.80369,42.75527 -25.81504,62.89423c-2.25344,-7.79726 8.86299,-27.33977 12.41513,-38.81425c6.85432,-9.91871 12.74432,-36.64881 -5.12448,-33.00522c-10.36548,18.54565 -24.30925,-11.6902 -34.4585,6.08303c-8.61565,2.94801 -22.16619,-17.11588 -24.6655,2.17592c6.48895,22.91373 19.991,42.44204 27.0555,65.11924c-2.39717,-1.62125 -3.76218,-4.46559 -5.25959,-7.01425l0,0.00001zm-13.54036,-83.97601c-4.691,-2.62623 1.97721,13.96154 -0.0001,0l0.0001,0zm28.03801,1.95925c-6.08941,-11.82155 -2.82355,14.34324 0,0zm27.1768,0c-6.08941,-11.82155 -2.8236,14.34324 0,0"
};