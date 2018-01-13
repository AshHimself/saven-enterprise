/**
 * Created by zevisert on 2017-03-27.
 * This file merges mailgun validation functionality with jQueryValidationPlugin's surprisingly
 * poor async validation customizability. Much of this code has been borrowed from
 *   * jQuery Validation remote method
 *      - https://github.com/jquery-validation/jquery-validation/blob/master/src/core.js#L1477
 *   * Mailgun validator jquery plugin
 *      - https://github.com/mailgun/validator-demo/blob/master/mailgun_validator.js#L30
 *
 *
 * Mailgun Address Validation Plugin with jQuery Validation plugin support
 *
 * Attaching to a form:
 *
 *  | $('form_selector').mailgun_validator({
 *  |     api_key: 'api-key',
 *  |     in_progress: in_progress_callback, // called when request is made to validator
 *  |     success: success_callback,         // called when validator has returned
 *  |     error: validation_error,           // called when an error reaching the validator has occured
 *  | });
 *
 * Usage in jquery validation:
 *
 *  | $('form_selector').validate({
 *  |     rules: {
 *  |         email_address: {
 *  |             required: true,
 *  |             mailgun: '<public-api-key>'
 *  |         }
 *  |     },
 *  |     messages: {
 *  |         email_address: {
 *  |             required: "Please enter your email address.",
 *  |             mailgun: "Please enter a valid email address."
 *  |         }
 *  |     }
 *  | });
 *
 *  > then (in form_validation.js):
 *
 *  | jQuery.validator.addMethod('mailgun', function (value, element, api_key) {
 *  |     var preflight_result = jQuery.run_mailgun_validator(value, {
 *  |         api_key: api_key,
 *  |         success: success_callback,
 *  |         error: error_callback,
 *  |         in_progress: in_progress_callback,
 *  |         validator: this
 *  |     }, element);
 *  |
 *  |     return typeof preflight_result === "undefined" ? "pending" : preflight_result;
 *  | });
 *
 * Sample JSON in success callback:
 *
 *  | {
 *  |     "is_valid": true,
 *  |     "parts": {
 *  |         "local_part": "john.smith@example.com",
 *  |         "domain": "example.com",
 *  |         "display_name": ""
 *  |     },
 *  |     "address": "john.smith@example.com",
 *  |     "did_you_mean": null
 *  | }
 *
 * More API details: https://api.mailgun.net/v2/address
 * https://jqueryvalidation.org/documentation/
 **/

(function( $ ) {
    $.fn.mailgun_validator = function(options) {
        return this.each(function() {
            var thisElement = $(this);
            thisElement.focusout(function(e) {
                //Trim string and autocorrect whitespace issues
                var elementValue = thisElement.val();
                elementValue = $.trim(elementValue);
                thisElement.val(elementValue);

                //Attach event to options
                options.e = e;

                $.run_mailgun_validator(elementValue, options, thisElement);
            });
        });
    };

    $.extend({run_mailgun_validator: function(address_text, options, element) {
        const method = 'mailgun';
        // require api key
        if (options && typeof options.api_key === 'undefined') {
            if (console) console.warn('Please pass in api_key to mailgun_validator.');
        }

        // don't run validator without input
        if (!address_text) {
            if (options.validator) {
                options.validator.stopRequest(element, false);
                return true;
            } else {
                return;
            }
        }

        // don't run duplicate calls
        var previous;
        if (options.validator){
            // Use jQuery Validator duplicate logic checks if available
            previous = options.validator.previousValue( element, method );

            if ( !options.validator.settings.messages[ element.name ] ) {
                options.validator.settings.messages[ element.name ] = {};
            }
            previous.originalMessage = previous.originalMessage || options.validator.settings.messages[ element.name ][ method ];
            options.validator.settings.messages[ element.name ][ method ] = previous.message;

            var optionDataString = $.param( { address: address_text, api_key: options.api_key } );
            if ( previous.old === optionDataString ) {
                return previous.valid;
            }
            previous.old = optionDataString;

            options.validator.startRequest( element );

            if (!options.validator.resetInternals){
                options.validator.resetInternals = function () {
                    options.validator.successList = [];
                    options.validator.errorList = [];
                    options.validator.errorMap = {};
                    options.validator.toShow = $( [] );
                    options.validator.toHide = $( [] );
                }
            }
        } else if (element.mailgunLastSuccessReturn) {
            // else use mailgun duplicate checks
            if (address_text == element.mailgunLastSuccessReturn.address) {
                if (options && options.success) {
                    options.success(element.mailgunLastSuccessReturn, options.e);
                }
                if (options.validator) {
                    options.validator.stopRequest(element, element.mailgunLastSuccessReturn.is_valid);
                    return element.mailgunLastSuccessReturn.is_valid;
                } else {
                    return;
                }
            }
        }

        //Abort existing AJAX Request to prevent flooding
        if (element.mailgunRequest) {
            if (options.validator){
                previous.old = null;
                options.validator.stopRequest(element, previous.valid);
            }
            element.mailgunRequest.abort();
            element.mailgunRequest = null;
            console.info("Aborted an inflight AJAX request - expect ReferenceErrors");
        }

        // validator is now in progress
        if (options && options.in_progress) {
            options.in_progress(options.e);
        }

        // length and @ syntax check
        var error_message = false;
        if (address_text.length > 512) {
            error_message = 'Email address exceeds maxiumum allowable length of 512.';
        } else if (1 !== address_text.split('@').length-1) {
            error_message = 'Email address must contain only one @.';
        }

        if (error_message) {
            if (options && options.error) {
                options.error(error_message, options.e);
            } else {
                if (console) console.log(error_message);
            }
            if (options.validator) {
                options.validator.stopRequest(element, false);
                return false;
            } else {
                return;
            }
        }

        // Set a timeout incase of some kind of internal server error
        var timeoutID = setTimeout(function() {
            error_message = 'Timeout occurred, unable to validate address.';
            if (!options.success) {
                //Abort existing AJAX Request for a true timeout
                if(element.mailgunRequest) {
                    element.mailgunRequest.abort();
                    element.mailgunRequest = null;
                    if (options.validator) {
                        options.validator.stopRequest(element, previous.valid);
                        return previous.valid;
                    }
                }

                if (options && options.error) {
                    options.error(error_message, options.e);
                } else {
                    if (console) console.log(error_message);
                }
            }
        }, 3000); // 3 seconds

        // make ajax call to get validation results
        element.mailgunRequest = $.ajax({
            type: "GET",
            url: 'https://api.mailgun.net/v2/address/validate?callback=?',
            data: { address: address_text, api_key: options.api_key },
            dataType: "jsonp",
            crossDomain: true,
            success: function(data, status_text, request) {
                clearTimeout(timeoutID);

                element.mailgunLastSuccessReturn = data;

                if (options.validator) {
                    var valid = data.is_valid === true || data.is_valid === "true";

                    options.validator.settings.messages[element.name][method] = previous.originalMessage;
                    var errors = {};
                    var message = null;
                    if (valid) {
                        var submitted = options.validator.formSubmitted;
                        options.validator.resetInternals();
                        options.validator.toHide = options.validator.errorsFor(element);
                        options.validator.formSubmitted = submitted;
                        options.validator.successList.push(element);
                        options.validator.invalid[element.name] = false;

                        message = options.success && options.success(data, options.e) || message;
                        if (message) {
                            errors[element.name] = previous.message = message;
                            options.validator.showErrors(errors);
                        } else {
                            options.validator.showErrors();
                        }
                    } else {
                        message = options.success && options.success(data, options.e)
                            || options.validator.defaultMessage( element, { method: method, parameters: address_text } );
                        errors[element.name] = previous.message = message;
                        options.validator.invalid[element.name] = true;
                        options.validator.showErrors(errors);
                    }

                    previous.valid = valid;
                    options.validator.stopRequest(element, valid);
                }
                else if (options && options.success) {
                    options.success(data, options.e);
                }

            },
            error: function(request, status_text, error) {
                clearTimeout(timeoutID);
                var error_message = 'Error occurred, unable to validate address.';
                var errors = {};

                if (options && options.error) {
                    error_message = options.error(error_message, error) || error_message;
                    errors[element.name] = error_message;
                    if (options.validator) {
                        previous.message = error_message;
                    }
                    options.validator.invalid[element.name] = true;
                    options.validator.showErrors(errors);
                }
                else {
                    if (console) console.log(error_message);
                }
            },
            complete: function(request, status_text){
                element.mailgunRequest = null;
            }
        });
    }
    });
})( jQuery );