"use strict";
/*
create namespace to prevent 
cluttering of the global namespace
*/ 
var app = app || {};
(function(){
    /*
     * Send the form
     */
    app.sendForm = {
        init: function(){    
            $("#entry").submit(function( event ) {
                var contestName = $("#contest1_name"),
                    userName = $("#first_name"),
                    userLastName = $("#last_name"),
                    userEmail = $("#email"),
                    date = $("#birth_day"),
                    month = $("#birth_month"),
                    year = $("#birth_year"),
                    countryName = $("#country"),
                    privacyCheck = $('#privacy_check');

                if (app.validation.dateOfBirth(date, month, year) || !app.validation.email(userEmail) 
                    || !privacyCheck.is(':checked') || ![contestName, date, month, year, countryName, userName, userLastName, userEmail]
                    .every(app.validation.empty)) {
                    event.preventDefault();

                    //set invalid class on form elements if errors
                    app.setInvalidClass.init(!app.validation.email(userEmail), userEmail);
                    [userName, userLastName, contestName, countryName, date, month, year].forEach(function(field) {
                        app.setInvalidClass.init(!app.validation.empty(field), field);
                    });
                    $('#error-overlay').fadeIn(200);
                    app.closeOverlay.init();
                } else {
                    alert("You have entered the competition.");
                }      
            });
        }
    };
     
    /*
     * Validation
     */
    app.validation = {
        //Validate email address.
        email: function(id) {
            var emailVal = id.val(),
                re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(emailVal);
        },
        //Check if input is empty.
        empty: function(id) {
            var elementVal = $.trim(id.val());
            if(elementVal.length > 0)
                return true;
        },
        //Check user's age.
        dateOfBirth: function(date, month, year) {
            var underAge = 14;
            var DOB = date.val() + " " + month.val() + " " + year.val();
            var today = new Date();
            var birthDate = new Date(DOB);
            var age = today.getFullYear() - birthDate.getFullYear();
            var monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }   
            if(age < underAge){
                $("#error-overlay-content-age").css("display", "block");
                $("#error-overlay-content-empty").css("display", "none");
                return true;
            }
            else{
                $("#error-overlay-content-age").css("display", "none");
                $("#error-overlay-content-empty").css("display", "block");
                return false;
            }
        }
    };

    app.closeOverlay = {
        init: function() {
            // Close overlay if user clicks outside the main wrapper
            $('#error-overlay').click(function(e){
                if($(e.target).attr('id') == $(this).attr('id')) {
                    app.closeOverlay.hide();
                }
            })
            // Close overlay on escape key
            $(document).keyup(function(e) {
                if (e.keyCode === 27) {
                    app.closeOverlay.hide();
                }
            });
            // Close overlay button
            $('#error-overlay-main a.close-btn').click(function(){
                app.closeOverlay.hide();
            });
        },
        hide: function() {
            $('#error-overlay').fadeOut(200);
        }
    };

    app.setInvalidClass = {
        init: function (invalidCondition, jQueryObject) {
            jQueryObject.toggleClass('invalid', invalidCondition)
        }
    };

    $(document).ready(app.sendForm.init);

})(jQuery);
