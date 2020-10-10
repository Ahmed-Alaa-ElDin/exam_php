"use strict";

// Class definition
var KTWizard2 = function () {
    // Base elements
    var _wizardEl;
    var _formEl;
    var _wizardObj;
    var _validations = [];

    // Private functions
    var _initWizard = function () {
        // Initialize form wizard
        _wizardObj = new KTWizard(_wizardEl, {
            startStep: 1, // initial active step number
            clickableSteps: false // to make steps clickable this set value true and add data-wizard-clickable="true" in HTML for class="wizard" element
        });

        // Validation before going to next page
        _wizardObj.on('change', function (wizard) {
            if (wizard.getStep() > wizard.getNewStep()) {
                return; // Skip if stepped back
            }

            // Validate form before change wizard step
            var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

            if (validator) {
                validator.validate().then(function (status) {
                    if (status == 'Valid') {
                        wizard.goTo(wizard.getNewStep());

                        KTUtil.scrollTop();
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light"
                            }
                        }).then(function () {
                            KTUtil.scrollTop();
                        });
                    }
                });
            }

            return false;  // Do not change wizard step, further action will be handled by he validator
        });

        // Change event
        _wizardObj.on('changed', function (wizard) {
            KTUtil.scrollTop();
        });

        // Submit event
        _wizardObj.on('submit', function (wizard) {
            Swal.fire({
                text: "All is good! Please confirm the form submission.",
                icon: "success",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, submit!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-primary",
                    cancelButton: "btn font-weight-bold btn-default"
                }
            }).then(function (result) {
                if (result.value) {
                    _formEl.submit(); // Submit form
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been submitted!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-primary",
                        }
                    });
                }
            });
        });
    }

    var _initValidation = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        // Step 1
        _validations.push(FormValidation.formValidation(
                _formEl,
                {
                    fields: {
                        FirstName: {
                            validators: {
                                notEmpty: {
                                    message: 'First name is required'
                                }
                            }
                        },
                        LastName: {
                            validators: {
                                notEmpty: {
                                    message: 'Last Name is required'
                                }
                            }
                        },

                        CountryName: {
                            validators: {
                                notEmpty: {
                                    message: 'Select Nationality'
                                }
                            }
                        },
                        TeacherReligion: {
                            validators: {
                                notEmpty: {
                                    message: 'Select Religion'
                                }
                            }
                        },
                        Gender: {
                            validators: {
                                notEmpty: {
                                    message: 'Select Gender'
                                }
                            }
                        },
                        Designation: {
                            validators: {
                                notEmpty: {
                                    message: 'Select Designation'
                                }
                            }
                        },

                        email: {
                            validators: {
                                notEmpty: {
                                    message: 'Email is required'
                                },
                                emailAddress: {
                                    message: 'The value is not a valid email address'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //eleInvalidClass: '',
                            eleValidClass: '',
                        })
                    }
                }
        ));

        // Step 2
        _validations.push(FormValidation.formValidation(
                _formEl,
                {
                    fields: {
                        address1: {
                            validators: {
                                notEmpty: {
                                    message: 'Address is required'
                                }
                            }
                        },
                        postcode: {
                            validators: {
                                notEmpty: {
                                    message: 'Postcode is required'
                                }
                            }
                        },
                        city: {
                            validators: {
                                notEmpty: {
                                    message: 'City is required'
                                }
                            }
                        },
                        state: {
                            validators: {
                                notEmpty: {
                                    message: 'State is required'
                                }
                            }
                        },
                        country: {
                            validators: {
                                notEmpty: {
                                    message: 'Country is required'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //eleInvalidClass: '',
                            eleValidClass: '',
                        })
                    }
                }
        ));

        // Step 3
        _validations.push(FormValidation.formValidation(
                _formEl,
                {
                    fields: {
                        delivery: {
                            validators: {
                                notEmpty: {
                                    message: 'Delivery type is required'
                                }
                            }
                        },
                        packaging: {
                            validators: {
                                notEmpty: {
                                    message: 'Packaging type is required'
                                }
                            }
                        },
                        preferreddelivery: {
                            validators: {
                                notEmpty: {
                                    message: 'Preferred delivery window is required'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //eleInvalidClass: '',
                            eleValidClass: '',
                        })
                    }
                }
        ));

        // Step 4
        _validations.push(FormValidation.formValidation(
                _formEl,
                {
                    fields: {
                        locaddress1: {
                            validators: {
                                notEmpty: {
                                    message: 'Address is required'
                                }
                            }
                        },
                        locpostcode: {
                            validators: {
                                notEmpty: {
                                    message: 'Postcode is required'
                                }
                            }
                        },
                        loccity: {
                            validators: {
                                notEmpty: {
                                    message: 'City is required'
                                }
                            }
                        },
                        locstate: {
                            validators: {
                                notEmpty: {
                                    message: 'State is required'
                                }
                            }
                        },
                        loccountry: {
                            validators: {
                                notEmpty: {
                                    message: 'Country is required'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //eleInvalidClass: '',
                            eleValidClass: '',
                        })
                    }
                }
        ));

        // Step 5
        _validations.push(FormValidation.formValidation(
                _formEl,
                {
                    fields: {
                        ccname: {
                            validators: {
                                notEmpty: {
                                    message: 'Credit card name is required'
                                }
                            }
                        },
                        ccnumber: {
                            validators: {
                                notEmpty: {
                                    message: 'Credit card number is required'
                                },
                                creditCard: {
                                    message: 'The credit card number is not valid'
                                }
                            }
                        },
                        ccmonth: {
                            validators: {
                                notEmpty: {
                                    message: 'Credit card month is required'
                                }
                            }
                        },
                        ccyear: {
                            validators: {
                                notEmpty: {
                                    message: 'Credit card year is required'
                                }
                            }
                        },
                        cccvv: {
                            validators: {
                                notEmpty: {
                                    message: 'Credit card CVV is required'
                                },
                                digits: {
                                    message: 'The CVV value is not valid. Only numbers is allowed'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //eleInvalidClass: '',
                            eleValidClass: '',
                        })
                    }
                }
        ));
    }

    var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }

    var TeacherRegisterSelect2 = function () {
        // basic

        $('#CountryName').select2({
            placeholder: "Select Nationality",
        });


        $('#TeacherReligion').select2({
            placeholder: "Select Religion",
        });


        $('#Designation').select2({
            placeholder: "Select Designation",
        });


        $('#Gender').select2({
            placeholder: "Select Gender",
        });

        $('#DateOfBirth').datepicker({
            rtl: KTUtil.isRTL(),

            autoclose: true,
            orientation: "bottom left",
            templates: arrows,
            startView: 2,
            startDate: "01-Jan-1930",
            endDate: "06-Oct-2020",
        });



    };



    var SubjectsAssignment = function () {
        // Dual Listbox
        var listBoxes = $(".dual-listbox");

        listBoxes.each(function () {
            var $this = $(this);
            // get titles
            var availableTitle = ($this.attr("data-available-title") != null) ? $this.attr("data-available-title") : "Available Subjects";
            var selectedTitle = ($this.attr("data-selected-title") != null) ? $this.attr("data-selected-title") : "Selected Subjects";

            // get button labels
            var addLabel = ($this.attr("data-add") != null) ? $this.attr("data-add") : "Add";
            var removeLabel = ($this.attr("data-remove") != null) ? $this.attr("data-remove") : "Remove";
            var addAllLabel = ($this.attr("data-add-all") != null) ? $this.attr("data-add-all") : "Add All";
            var removeAllLabel = ($this.attr("data-remove-all") != null) ? $this.attr("data-remove-all") : "Remove All";

            // get options
            var options = [];
            $this.children("option").each(function () {
                var value = $(this).val();
                var label = $(this).text();
                options.push({
                    text: label,
                    value: value
                });
            });

            // get search option
            var search = ($this.attr("data-search") != null) ? $this.attr("data-search") : "";

            // init dual listbox
            var dualListBox = new DualListbox($this.get(0), {
                addEvent: function (value) {
                    console.log(value);
                },
                removeEvent: function (value) {
                    console.log(value);
                },
                availableTitle: availableTitle,
                selectedTitle: selectedTitle,
                addButtonText: addLabel,
                removeButtonText: removeLabel,
                addAllButtonText: addAllLabel,
                removeAllButtonText: removeAllLabel,

            });

            if (search == "false") {
                dualListBox.search.classList.add("dual-listbox__search--hidden");
            }
        });
    };

    return {
        // public functions
        init: function () {
            _wizardEl = KTUtil.getById('kt_wizard');
            _formEl = KTUtil.getById('kt_form');

            _initWizard();
            _initValidation();

            TeacherRegisterSelect2();
            SubjectsAssignment();
        }
    };
}();

jQuery(document).ready(function () {
    KTWizard2.init();
});
