"use strict";

// Class definition
var KTWizard4 = function () {
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
            clickableSteps: false  // allow step clicking
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
                                    message: 'Student name is required'
                                }
                            }
                        },
                        LastName: {
                            validators: {
                                notEmpty: {
                                    message: 'Father / Gaurdian Name is required'
                                }
                            }
                        },
                        phone: {
                            validators: {
                                notEmpty: {
                                    message: 'Phone is required'
                                }
                            }
                        },
                        StudentEmail: {
                            validators: {
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


    var RepeaterContactNumber = function () {
        $('#RepeaterContactNumber').repeater({
            initEmpty: true,

            defaultValues: {
                'text-input': 'foo'
            },

            show: function () {

                $(this).slideDown();
                //initializeSelect2('#RelationWithStudent');

                $('.RelationWithStudent').select2();
                $('.ContactNumberType').select2();


            },

            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            }
        });
    }

    var RepeaterVisaInformation = function () {
        $('#RepeaterVisaInformation').repeater({
            initEmpty: true,

            defaultValues: {
                'text-input': 'foo'
            },

            show: function () {

                $(this).slideDown();
                //initializeSelect2('#RelationWithStudent');

                $('#kt_datepicker_1, #kt_datepicker_1_validate').datepicker({
                    rtl: KTUtil.isRTL(),
                    autoclose: true,
                    todayHighlight: true,
                    orientation: "bottom left",
                    templates: arrows
                });

                $('.RelationWithStudent').select2();
                $('.DocumentType').select2();
                $('.IssuanceAuthority').select2();
                DropZoneImage();

                //new KTImageInput('kt_image_1');

            },

            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            }
        });
    }







    var demos = function () {
        // basic
        $('#AcademicYear, #kt_select2_1_validate').select2({
            placeholder: 'Select Academic Year'
        });

        $('#StudentGender, #kt_select2_1_validate').select2({
            placeholder: 'Select Gender'
        });
        $('#StudentNationality, #kt_select2_1_validate').select2({
            placeholder: 'Select Nationality'
        });
        $('#StudentReligion, #kt_select2_1_validate').select2({
            placeholder: 'Select Religion'
        });

        $('#PlaceOfBirth, #kt_select2_1_validate').select2({
            placeholder: 'Select Place of Birth'
        });

        $('#AdmissionInClass, #kt_select2_1_validate').select2({
            placeholder: 'Select Place of Class / Grade'
        });

        $('#AdmissionInSection, #kt_select2_1_validate').select2({
            placeholder: 'Select Place of Section'
        });

        $('#ElectiveSubjects, #kt_select2_3_validate').select2({
            placeholder: 'Select Elective Subject(s)',
        });

        $('#HSSCCategory, #kt_select2_3_validate').select2({
            placeholder: 'Select HSSC Category',
        });

        $('#AdmissionCategory, #kt_select2_3_validate').select2({
            placeholder: 'Select Admission Category',
        });

//          $('.RelationWithStudent, #kt_select2_3_validate').select2({
//            placeholder: 'Select Relation with student',
//        });

        $('#ContactType, #kt_select2_3_validate').select2({
            placeholder: 'Select Contact Type',
        });













        $('#DateOfBirth, #kt_datepicker_2_validate').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            autoclose: true,
            orientation: "bottom left",
            templates: arrows
        });





    }
    return {
        // public functions
        init: function () {
            _wizardEl = KTUtil.getById('kt_wizard');
            _formEl = KTUtil.getById('kt_form');

            _initWizard();
            _initValidation();
            demos();


            RepeaterContactNumber();
            RepeaterVisaInformation();
        }
    };
}();




function DeleteRow(RowID)
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then(function (result) {

        if (result.value) {
            Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
        }
    });
}

function DropZoneImage()
{
    var id = '#kt_dropzone_4';

    // set the preview element template
    var previewNode = $(id + " .dropzone-item");
    previewNode.id = "";
    var previewTemplate = previewNode.parent('.dropzone-items').html();
    previewNode.remove();

    var myDropzone4 = new Dropzone(id, {// Make the whole body a dropzone
        url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        maxFilesize: 1, // Max filesize in MB
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: id + " .dropzone-items", // Define the container to display the previews
        
        clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        
    });

    myDropzone4.on("addedfile", function (file) {
        // Hookup the start button
        file.previewElement.querySelector(id + " .dropzone-start").onclick = function () {
            myDropzone4.enqueueFile(file);
        };
        $(document).find(id + ' .dropzone-item').css('display', '');
        $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
    });

    // Update the total progress bar
    myDropzone4.on("totaluploadprogress", function (progress) {
        $(this).find(id + " .progress-bar").css('width', progress + "%");
    });

    myDropzone4.on("sending", function (file) {
        // Show the total progress bar when upload starts
        $(id + " .progress-bar").css('opacity', '1');
        // And disable the start button
        file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone4.on("complete", function (progress) {
        var thisProgressBar = id + " .dz-complete";
        setTimeout(function () {
            $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
        }, 300)

    });

    // Setup the buttons for all transfers
    document.querySelector(id + " .dropzone-upload").onclick = function () {
        myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
    };

    // Setup the button for remove all files
    document.querySelector(id + " .dropzone-remove-all").onclick = function () {
        $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
        myDropzone4.removeAllFiles(true);
    };

    // On all files completed upload
    myDropzone4.on("queuecomplete", function (progress) {
        $(id + " .dropzone-upload").css('display', 'none');
    });

    // On all files removed
    myDropzone4.on("removedfile", function (file) {
        if (myDropzone4.files.length < 1) {
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
        }
    });
}

jQuery(document).ready(function () {
    KTWizard4.init();

});


