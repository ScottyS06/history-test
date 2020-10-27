// Init selectors. This is done so jquery doesn't have to keep
// selecting the same tags repeatedly
var $navbar_container = $("#navbar_container");
var $before_link = $("#navbar_container > .in_page_links > a:before");
var $links = $("#navbar_container > .in_page_links > a");
var $color_band = $("#color_band");
var $logo = $("#navbar_dubhacks_logo");
var $header_container = $("#header_container");

var $social = $("li i");
var mobileScrollBack = false;
var isHoveringOver = false;
var isPastFrontPage = false;
var isMobile = $(window).width() < 768;
var $mlh_logo = $("#nav-mlh-trust-badge");

// Makes navbar background appear and changes color of links.
$navbar_container.hover(function(){
	isHoveringOver = true;
	whiteBackground();
}, function(){
	isHoveringOver = false;
	if (!isPastFrontPage) transparentBackground();
});

// Changes color of social media links after it scrolls past
// header seaction.
$(document).scroll(function() {
	isMobile = $(window).width() < 768;
	if (isMobile) {
		if (!$(document).scrollTop() > $header_container.offset().top) {
			$navbar_container.css("display", "flex");
		} else {
			$navbar_container.css("display", "none");
		}
	} else {
		if ($(document).scrollTop() > $(window).height()) {
			isPastFrontPage = true;
			whiteBackground();
			$mlh_logo.css({'visibility': 'visible', 'opacity': '1'});
		} else {
			isPastFrontPage = false;
			transparentBackground();
			$mlh_logo.css({'opacity': '0', 'visibility': 'hidden'});
		}
	}
});

// Changes color of social media links to pink.
function whiteBackground () {
	$links.css("color", "#2F2F2F");
	$before_link.css("background-color", "#2F2F2F");
	// $color_band.css("opacity", "1");
	$navbar_container.css("background-color", "rgba(255, 255, 255, 1)");
	$logo.attr("src", "/images/final_logo.png");
	$social.css("color", "#ea1875");
	$logo.attr("src", "/images/final_logo.png");
}

// Changes color of social media links to white.
function transparentBackground () {
	$links.css("color", "white");
	$before_link.css("background-color", "white");
	$logo.attr("src", "/images/dubhacks_logo_white.svg");
	// $color_band.css("opacity", "0");
	$navbar_container.css("background-color", "rgba(255, 255, 255, 0)");
	$social.css("color", "white");
	$logo.attr("src", "/images/dubhacks_logo_white.svg");
}
