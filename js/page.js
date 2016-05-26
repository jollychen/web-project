
// get last reading page from cookie or reset
function getPage(){
    // if cookie contains a useful page number return it
    try{
        if (readCookiePage() > 0) {
            return readCookiePage();
        }else {
            // if not reset it.
            createCookie();
            return 0;
        }
    }
    catch(err){
        createCookie();
        return 0;
    }
        
}

var curPage = getPage(); // set the current page

var flipTime = 500; //  animation time

// change page function is start from here
$(document).ready(function () {

    $(".page").eq(curPage).addClass("active"); // show the last reading page


    // bind a click event to next button which can turn to next page
    $("#next").click(function() {
        console.log("click next");
        getNextPage();
    });


    // bind a click event to next button which can turn to previous page
    $("#previous").click(function() {
        console.log("click previous");
        getPrevPage()
    });

    //get the next page number and flip it automatically
    function getNextPage() {
        // the page number can't beyond over the last page
        if ((curPage + 1) < $(".page").size()) {
            flipOver(curPage + 1);
        }
    }

    // get the previous page number and flip it automatically
    function getPrevPage() {
        // the page can't go to -1 page
        if ((curPage - 1) > -1) {
            flipOver(curPage - 1);
        }
    }


    // display function
    function flipOver(nextPage) {
        $(".page").eq(curPage).stop(false, true).fadeOut(flipTime);// fadeout current page
        $(".page").eq(nextPage).stop(false, true).fadeIn(flipTime);// fadein the next page

        // update global curPage variable and cookie
        curPage = nextPage;
        updateCookie();
    }
});


// cookie function start *********************************s

// create a new Cookie to record the page user last read.
function createCookie() {
    document.cookie = "currentPage=0";  // add cookie
}

// get last reading page user read from cookie
function readCookiePage() {
    var cookie = document.cookie; // get cookie

    // first, split cookie at "currentPage=" and we get an array ["xxxxx", "{{page number}};xxxxxx"]
    // then, we need the second element
    // before ";" is what we want, so split at ";"
    // transfer the string into int
    var page = parseInt(cookie.split('currentPage=')[1].split(';')[0]);

    // verify we do get a int, a page number
    if (typeof(page) === typeof (1)) {
        //console.log(page);
        return page;
    }else{
        //console.log("you don't have valid cookie:\n");
        //console.log(cookie);
        return -1; // return a negative number to represent false
    }
}

// update new page number into Cookie
function updateCookie() {
    document.cookie = "currentPage=" + curPage;
}
