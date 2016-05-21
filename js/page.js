var cookie = {
    createCookie: function() {
        document.cookie = "currentPage=0";
    },

    readCookiePage: function() {
        var cookie = document.cookie;
        var page = parseInt(cookie.split(';')[0].split('=')[1]);
        if (typeof(page) === typeof (1)) {
            //console.log(page);
            return page;
        }else{
            //console.log("you don't have valid cookie:\n");
            //console.log(cookie);
            return -1
        }
    },

    updateCookie: function(curPage) {
        document.cookie = "currentPage=" + curPage;
    },

    getPage: function() {
        if (cookie.readCookiePage() > 0) {
            return cookie.readCookiePage();
        }else {
            cookie.createCookie();
            return 0;
        }
    }

};



$(document).ready(function () {

    var curPage = cookie.getPage();
    var flipTime = 500;
    var pages = $(".page");
    var pageNum = pages.size();

    var getPage = {
        next: function() {
            if ((curPage + 1) < pageNum) {
                flipOver(curPage + 1);
            } // justify whether this slide is the last one and give the right index.
        },

        previous: function() {
            if ((curPage + 1) < pageNum) {
                flipOver(curPage + 1);
            } // justify whether this slide is the last one and give the right index.
        }
    };

    pages.eq(curPage).addClass("active");

    $("#next").click(function() {
        //console.log("click next");
        getPage.next();
    });

    $("#previous").click(function() {
        //console.log("click previous");
        getPage.previous();
    });


    // display function
    function flipOver(nextPage) {
        pages.eq(curPage).stop(false, true).fadeOut(flipTime);// make the former slide point change into inactive status.
        pages.eq(nextPage).stop(false, true).fadeIn(flipTime);// make the new relative slide point turn to active status.

        curPage = nextPage;
        cookie.updateCookie(curPage);
    }
});



