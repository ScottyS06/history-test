$(document).ready(function() {

    // set height of the main top page the same as height of browser window
    $(".top").height($(window).height());

    // set equal height for all jumbotrons
    function heightJumbotrons() {
        for (var i = 0; i < $(".jumbotron").length; i++) {
            if ($(".jumbotron").eq(i).height() < $(window).height()) {
                $(".jumbotron").eq(i).height($(window).height());
            }
        }
    }

    // smooth scroll
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            return false;
            }
        }
    });

    // fluid response when browser size changes
    $(window).resize(function () {
        // for a single paged top part
        $(".top").height($(window).height());
        // heightJumbotrons();
    });

    // Twitter button
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

    // Facebook button
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=209240735781035&version=v2.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});
