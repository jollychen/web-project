
$(document).ready(function() {
    var flag1 = false;

    //validate email
    // regular expression refers from http://www.jb51.net/article/19493.htmv
    $('.form input[name="email"]').blur(function () {
        console.log("this is email");
        // the validate condition to test is the input is follow a normal email address format.
        if ($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)==-1) {
            // the form tag has a empty input validation already, so we don't need to consider the empty situaton.
            if ($(this).val() == "") {
                $(".feedback").children().removeClass("appear"); // if the input is empty, clear the feedback icon.
                flag1 = false; // reset the flag value
            }
            else {
                if ($(this).val() != "") {
                    $(".feedback").children().removeClass("appear"); // clear the former displayed icon
                    $(".feedback").children('img[alt="error"]').addClass("appear"); // show the error icon
                    flag1 = false; // reset the flag value
                }

            }
        }
        else {
            $(".feedback").children().removeClass("appear"); //clear the former displayed icon
            $(".feedback").children('img[alt="right"]').addClass("appear"); // show the right icon
            flag1 = true; // give flag1 a value to help pass the validation of submit
        }
    });

    // click submit: if all fields are done, the form can be submited.
    $('.form input[name="submit"]').click(function () {
        if(flag1) {
            $("form").submit();
        }
        else {
            return false;
        };
    });
});