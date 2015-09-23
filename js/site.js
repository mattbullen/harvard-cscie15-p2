// Main page loading sequence.
$(document).ready(function() {
    setZurb($(this));
    setMenu();
    setAccordion();
    setPasswordRequest();  
});

// Start the Zurb Foundation 5 accordion and slider plugins.
function setZurb(page) {
    $(page).foundation({
        accordion: {
            multi_expand: true,
            toggleable: true
        },
        slider: {
            on_change: function() {
                $("#range-button-words").text($("#quantity-words").val());
                $("#range-button-numbers").text($("#quantity-numbers").val());
                $("#range-button-special").text($("#quantity-special").val());
            }
        }
    });
    console.log("\nZurb Foundation 5 has started.");
}

// Set the sidebar menu click/change events.
function setMenu() {
    
    // Set the numbers selection part of the menu.
    $("#include-numbers").on("click", function includeNumbers() {
        if (this.checked) {
            this.value = true;
            $("#range-slider-numbers").removeClass("disabled");
            $("#range-button-numbers").text($("#quantity-numbers").val());
        } else {
            this.value = false;
            $("#range-slider-numbers").addClass("disabled").val(1);
        }
    });
    
    // Set the special characters selection part of the menu.
    $("#include-special").on("click", function includeSpecial() {
        if (this.checked) {
            this.value = true;
            $("#range-slider-special").removeClass("disabled");
            $("#range-button-special").text($("#quantity-special").val());
        } else {
            this.value = false;
            $("#range-slider-special").addClass("disabled").val(1);
        }
    });
    
    // Set the spacers choice selection part of the menu.
    $(".checkbox-box-spacers").on("change", function spacersChange() {
        $(this).prop("checked", true).val(true);
        $(".checkbox-box-spacers").not(this).prop("checked", false).val(false);
    });
    
    // Set the case selection part of the menu.
    $(".checkbox-box-case").on("change", function caseChange() {
        $(this).prop("checked", true).val(true);
        $(".checkbox-box-case").not(this).prop("checked", false).val(false);
    });
}

// Set the accordion presentation on page load and header tab click event.
function setAccordion() {
    
    // Display the first accordion tab content.
    $(".accordion-navigation-first").find(".content").slideToggle("fast");
    
    // Set the navigation behavior for the accordion.
    $(".accordion-navigation").on("click", function accordionClick() {
        $(this).find(".content").slideToggle("fast");
    })   
}

// Get the form values for the POST request to the server.
function getFormValues() {
    var values = {};
    $("input").each(function() {
        values[this.name] = this.value;
    });
    if (values["include-numbers"] === "false") { values["quantity-numbers"] = "0"; }
    if (values["include-special"] === "false") { values["quantity-special"] = "0"; }
    console.log("\nPOST:", values);
    return values;
}

// Set the modal success message.
function showSuccessMessage(password) {
    $("#modalLeadTop").html("Your new password is:");
    $("#modalMessage").html(password);
    $("#modalLeadBottom").html("Save it to a safe place! Once you close this pop-up message, it will be gone, and you'll need to make a new one.");
    $("#modal").foundation("reveal", "open");
}

// Set the modal error message.
function showErrorMessage() {
    $("#modalLeadTop").html("");
    $("#modalMessage").html("Server error! Try again in a few minutes.");
    $("#modalLeadBottom").html("");
    $("#modal").foundation("reveal", "open");
}

// Show a loading GIF after requesting a new password.
function showLoadingGIF() {
    $("#generate-button").html("").css({
        "background": "url(data:image/gif;base64,R0lGODlhKwALAPEAAP///1x4qa681Fx4qSH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo=) no-repeat",
        "background-size": "50px 12px",
        "background-position": "50% 50%"
    }).prop("disabled", true);
}

// Hide the loading GIF after receiving a response to a request for a new password.
function hideLoadingGIF() {
    window.setTimeout(function() { $("#generate-button").css({"background": ""}).html("Get a new password!").prop("disabled", false); }, 100);
}

// Set the password request and modal display functionality.
function setPasswordRequest() {
    
    // AJAX request for a new password.
    $("#generate-button").on("click", function generatePasswordRequest() {
        showLoadingGIF();
        $.ajax({
            type: "POST",
            url: "./php/password.php",
            data: getFormValues(),
            success: function(response) {
                console.log("\nResponse:", response);
                var password = atob(response.password);
                console.log("\nDecoded:", password);
                if (response.password && password) {
                    showSuccessMessage(password);
                } else {
                    showErrorMessage();
                }
                hideLoadingGIF();
            },
            error: function(error) {
                console.log("\nError:", error);
                showErrorMessage();
                hideLoadingGIF();
            }
        });
    });

    // Remove the password from the page HTML when the modal is closed.
    $("a.close-reveal-modal").on("click", function closeModal() {
        window.setTimeout(function() { $(".password").html(""); }, 500);
    });
}