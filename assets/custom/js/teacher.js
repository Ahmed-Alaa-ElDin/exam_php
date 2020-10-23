"use strict";
var teacherDetect="Teacher";
var contactID=1;
var KTDropzoneDemo = function () {
    
      var demo2 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_4';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
            parallelUploads: 20,
            previewTemplate: previewTemplate,
            maxFilesize: 1, // Max filesize in MB
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        myDropzone4.on("addedfile", function(file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function() { myDropzone4.enqueueFile(file); };
            $(document).find( id + ' .dropzone-item').css('display', '');
            $( id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function(progress) {
            $(this).find( id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function(file) {
            // Show the total progress bar when upload starts
            $( id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function(progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function(){
                $( thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector( id + " .dropzone-upload").onclick = function() {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function() {
            $( id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function(progress){
            $( id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function(file){
            if(myDropzone4.files.length < 1){
                $( id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }
    
    return {
        // public functions
        init: function() {
           
            demo2();
        }
    };
}();
// Class definition
var KTWizard2 = function () {
	// Base elements
	var _wizardEl;
	var _formEl;
	var _wizard;
	var _validations = [];
        
	
	var contactInformationRowHandler = function() {



        $('#contactInformationForm').repeater({
            initEmpty: true,
           
            defaultValues: {
                'text-input': 'foo'
            },
             
            show: function () {
          
				$('.mul').select2({
					placeholder: 'Select a Contact Type',
			tags:true
				});
					//$('.mul').select2();			
					$(this).slideDown();
					
            },

            hide: function (deleteElement) {                
                $(this).slideUp(deleteElement);                 
            }   
        });
    }
   
	var documentInformationRowHandler = function() {


        $('#rowDocument_repeatForm').repeater({
            initEmpty: true,
           
            defaultValues: {
                'text-input': 'foo'
            },
             
            show: function () {
                
				$('.mulDocument').select2({
					placeholder: 'Select a Document Type',
			tags:true
				});
                      KTDropzoneDemo.init();
				$('.expiry').datepicker({
					rtl: KTUtil.isRTL(),
					todayHighlight: true,
					orientation: "bottom left",
				});
					$(this).slideDown();
					
            },

            hide: function (deleteElement) {                
                $(this).slideUp(deleteElement);                 
            }   
        });
        
       
    }
    
    var educationInformationRowHandler = function() {


        $('#educationDocument_repeatForm').repeater({
            initEmpty: true,
           
            defaultValues: {
                'text-input': 'foo'
            },
             
            show: function () {
				$('.eduMul').select2({
					placeholder: 'Select a Document Type',
			tags:true
				});
                                $('.eduMulCountry').select2({
					placeholder: 'Select Country',
			tags:true
				});
				$('.expiry').datepicker({
					rtl: KTUtil.isRTL(),
					todayHighlight: true,
					orientation: "bottom left",
				});
					$(this).slideDown();
					
            },

            hide: function (deleteElement) {                
                $(this).slideUp(deleteElement);                 
            }   
        });
        
       
    }

	// Private functions
	var initWizard = function () {
		// Initialize form wizard
		_wizard = new KTWizard(_wizardEl, {
            
			startStep: 1, // initial active step number
			clickableSteps: false // to make steps clickable this set value true and add data-wizard-clickable="true" in HTML for class="wizard" element
        });
        
        _wizard.on('beforePrev', function (wizard) {
            _wizard.goFIrst();
            if (teacherDetect == 'Teacher') {
        
   
                _wizard.goTo(2);
                KTUtil.scrollTop();
            }else {
              
                _wizard.goTo(1);
                
               
            }
           
        });

		// Validation before going to next page
		_wizard.on('beforeNext', function (wizard) {
			// Don't go to the next step yet
			_wizard.stop();

			// Validate form
			var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step
			validator.validate().then(function (status) {
                 if ((status == 'Valid') && (teacherDetect == 'Teacher')) {
                    
                    _wizard.goNext();
                    
					KTUtil.scrollTop();
				}else if((status == 'Valid') && (teacherDetect != 'Teacher')){
                                    teacherDetect='Teacher';
                    _wizard.goTo(3);
                    
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
        });
        
       

		// Change event
		_wizard.on('change', function (wizard) {
			KTUtil.scrollTop();
		});
	}

	var initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					fname: {
						validators: {
							notEmpty: {
								message: 'First name is required'
							}
						}
					},
					lname: {
						validators: {
							notEmpty: {
								message: 'Last Name is required'
							}
						}
					},
					country: {
						validators: {
							notEmpty: {
								message: 'Country is required'
							}
						}
                    },
                    religion: {
						validators: {
							notEmpty: {
								message: 'Religion is required'
							}
						}
					},
					
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		));

		// Step 2
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
                fields: {
                subjects: {
                    validators: {
                        notEmpty: {
                            message: 'Country is required'
                        }
                    }
                },
            },
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		));

		// Step 3
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					contactType: {
						validators: {
                            notEmpty: {
                                message: 'Plese Select Your Contact type'
                            },
                          
						}
					},
					contactNum: {
						validators: {
							notEmpty: {
                                message: 'Contact Number is required'
                            },
                           
						}
					},
                                        desp:{
                                            validators:{
                                                notEmpty:{
                                                    message: 'Descripation is Required'
                                                }
                                            },
                                        },
				
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
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
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		));

	
		
	}

	return {
		// public functions
		init: function () {
			_wizardEl = KTUtil.getById('kt_wizard_v2');
			_formEl = KTUtil.getById('kt_form');
			documentInformationRowHandler();
			contactInformationRowHandler();
                        educationInformationRowHandler();
			initWizard();
			initValidation();
		}
	};
}();


// Class definition
var KTDualListbox = function() {
    // Private functions
    var initDualListbox = function() {
        // Dual Listbox
        var listBoxes = $(".dual-listbox");

        listBoxes.each(function() {
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
            $this.children("option").each(function() {
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
                addEvent: function(value) {
                    console.log(value);
                },
                removeEvent: function(value) {
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
        init: function() {
            initDualListbox();
        },
    };
}();

jQuery(document).ready(function() {
  //  $("#staffDesignation").change(function(){
        
    //         staffDesignation = $("#staffDesignation").val();  
        // if (staffDesignation === 1)
         //{   
      //     alert(staffDesignation);
         //}
        // }); 
         
        KTWizard2.init();
    KTDualListbox.init();
  
});

  function my(){

        var staffCheck= document.getElementById("staffDesignation").value;
        
         if(staffCheck!=1){
             
            teacherDetect="Sweeper";
            // alert(teacherDetect);
         }else{
            teacherDetect="Teacher";
         }
 }