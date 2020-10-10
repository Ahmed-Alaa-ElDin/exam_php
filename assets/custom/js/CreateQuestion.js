"use strict";
// Class definition

var CreateQuestions = function () {
    var validator;
    var ViewAllStudentFilters = function () {
        // basic

        $('#StudentClass').select2({
            closeOnSelect: true,
            placeholder: "Select Grade/Class",
        });


        $('#StudentSection').select2({
            placeholder: "Select Section",
        });

        $('#AcademicYear').select2({
            placeholder: "Select Academic Year",
        });


        $('#QuestionType').select2({
            placeholder: "Select Question Type",
        });


        $('#FilterTags').select2({
            placeholder: "Add tag(s) with Question",
            tags: true
        });
    };


    var QuestionEditor = function () {
        $('.summernote').summernote({
            height: 350,
            tabsize: 2
        });
    }

    var Swatches = function () {
        // minimum setup
        $('[data-switch=true]').bootstrapSwitch();
    };

    var FilterSlider = function () {
        $('#StudentAgeSlider').ionRangeSlider({
            type: "double",
            grid: true,
            min: 0,
            max: 25,

        });
    }




    var _initValidation = function () {
        // Validation Rules
        validator = FormValidation.formValidation(
                document.getElementById('kt_form'),
                {
                    fields: {
                        date: {
                            validators: {
                                notEmpty: {
                                    message: 'Date is required'
                                }
                            }
                        },
                        daterangepicker: {
                            validators: {
                                notEmpty: {
                                    message: 'Daterange is required'
                                }
                            }
                        },
                        datetime: {
                            validators: {
                                notEmpty: {
                                    message: 'Datetime is required'
                                }
                            }
                        },
                        time: {
                            validators: {
                                notEmpty: {
                                    message: 'Time is required'
                                }
                            }
                        },
                        select: {
                            validators: {
                                notEmpty: {
                                    message: 'Select is required'
                                }
                            }
                        },
                        ClassGradeName: {
                            validators: {
                                notEmpty: {
                                    message: 'Please Select Class / Grade Name'
                                }
                            }
                        },
                        typeahead: {
                            validators: {
                                notEmpty: {
                                    message: 'Typeahead is required'
                                }
                            }
                        },
                        switch : {
                            validators: {
                                notEmpty: {
                                    message: 'Typeahead is required'
                                }
                            }
                        },
                        markdown: {
                            validators: {
                                notEmpty: {
                                    message: 'Typeahead is required'
                                }
                            }
                        },
                    },

                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        // Validate fields when clicking the Submit button
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // Submit the form when all fields are valid
                        defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            eleInvalidClass: '',
                            eleValidClass: '',
                        })
                    }
                }
        );
    }

    var MultiChoiceQuestions = function () {
        $('#MultiChoice').repeater({
            initEmpty: true,

            defaultValues: {
                'text-input': 'foo'
            },

            show: function () {

                $(this).slideDown();

            },

            hide: function (deleteElement) {
                if (confirm('Are you sure you want to delete this element?')) {
                    $(this).slideUp(deleteElement);
                }
            }
        });


    }

    return {
        // public functions
        init: function () {

            ViewAllStudentFilters();
            FilterSlider();
            QuestionEditor();
            Swatches();

            _initValidation();
            MultiChoiceQuestions();

        },
    };
}();

$("#QuestionType").change(function () {

    if ($("#QuestionType").val() == 1)
    {
        $('#ShortQuestion').show();

    }

    if ($("#QuestionType").val() == 2)
    {
        $('#MultiChoice').show();

    }

});

function AddImage()
{


    $('.kt_dropzone_1').dropzone({
        url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
        paramName: "file", // The name that will be used to transfer the file
        maxFiles: 1,
        maxFilesize: 5, // MB
        addRemoveLinks: true,
        accept: function (file, done) {
            if (file.name == "justinbieber.jpg") {
                done("Naha, you don't.");
            } else {
                done();
            }
        }
    });



}

jQuery(document).ready(function () {
    CreateQuestions.init();
});
