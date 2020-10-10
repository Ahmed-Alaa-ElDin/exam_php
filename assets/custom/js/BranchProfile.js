// Class definition
var KTFormControls = function () {
    // Private functions
    var _initDemo1 = function () {
        FormValidation.formValidation(
                document.getElementById('kt_form_1'),
                {
                    fields: {
                        EmailAddress: {
                            validators: {
                                notEmpty: {
                                    message: 'Email is required'
                                },
                                emailAddress: {
                                    message: 'The value is not a valid email address'
                                }
                            }
                        },
                        InstitutionName: {
                            validators: {
                                notEmpty: {
                                    message: 'Institution Name is required'
                                }
                            }
                        },
                        ClassName: {
                            validators: {
                                notEmpty: {
                                    message: 'Class Name is required'
                                }
                            }
                        },
                        sectionName: {
                            validators: {
                                notEmpty: {
                                    message: 'Class Name is required'
                                }
                            }
                        },
                        sectionName: {
                            validators: {
                                notEmpty: {
                                    message: 'Section Name is required'
                                }
                            }
                        },
                        subjectName: {
                            validators: {
                                notEmpty: {
                                    message: 'Subject Name is required'
                                }
                            }
                        },
                        courseName: {
                            validators: {
                                notEmpty: {
                                    message: 'Course Name is required'
                                }
                            }
                        },
                        courseCode: {
                            validators: {
                                notEmpty: {
                                    message: 'Course Code is required'
                                }
                            }
                        },
                        WensiteURL: {
                            validators: {
                                notEmpty: {
                                    message: 'Website URL is required'
                                },
                                uri: {
                                    message: 'The website address is not valid'
                                }
                            }
                        },
                        EducationCatName: {
                            validators: {
                                notEmpty: {
                                    message: 'Education Category is required'
                                }
                            }
                        },
                        role: {
                            validators: {
                                notEmpty: {
                                    message: 'Role name is required'
                                }
                            }
                        },
                        holidayName: {
                            validators: {
                                notEmpty: {
                                    message: 'Holiday Name is required'
                                }
                            }
                        },
                        designationName: {
                            validators: {
                                notEmpty: {
                                    message: 'Designation is required'
                                }
                            }
                        },
                        admissionCatName: {
                            validators: {
                                notEmpty: {
                                    message: 'Admission Category is required'
                                }
                            }
                        },
                        PhoneNumber: {
                            validators: {
                                notEmpty: {
                                    message: 'US phone number is required'
                                },
                                phone: {
                                    country: 'US',
                                    message: 'The value is not a valid US phone number'
                                }
                            }
                        },
                        
                        
                         InstitutionAddress: {
                            validators: {
                                notEmpty: {
                                    message: 'Please enter Institution Address'
                                },
                                stringLength: {
                                    min: 5,
                                    max: 500,
                                    message: 'Please enter address within text length range 5 and 500'
                                }
                            }
                        },
                        RegistrationNumber: {
                            validators: {
                                notEmpty: {
                                    message: 'Please enter Institution Address'
                                },
                                stringLength: {
                                    min: 5,
                                    max: 500,
                                    message: 'Please enter address within text length range 5 and 500'
                                }
                            }
                        },
                        
                         GroupName: {
                            validators: {
                                notEmpty: {
                                    message: 'Group Name is required'
                                }
                            }
                        },
                        AcademicYear: {
                            validators: {
                                notEmpty: {
                                    message: 'Please Give Acadmic Year Name'
                                }
                            }
                        },
                        IPAdress: {
                            validators: {
                                notEmpty: {
                                    message: 'Enter Your System IP Address'
                                }
                            }
                        },
                        option: {
                            validators: {
                                notEmpty: {
                                    message: 'Please select an option'
                                }
                            }
                        },

                        options: {
                            validators: {
                                choice: {
                                    min: 2,
                                    max: 5,
                                    message: 'Please select at least 2 and maximum 5 options'
                                }
                            }
                        },

                        Descriptions: {
                            validators: {
                                notEmpty: {
                                    message: 'Please enter Descriptions'
                                },
                                stringLength: {
                                    min: 20,
                                    max: 100,
                                    message: 'Please enter a menu within text length range 20 and 100'
                                }
                            }
                        },
              
                        checkbox: {
                            validators: {
                                choice: {
                                    min: 1,
                                    message: 'Please kindly check this'
                                }
                            }
                        },

                        checkboxes: {
                            validators: {
                                choice: {
                                    min: 2,
                                    max: 5,
                                    message: 'Please check at least 1 and maximum 2 options'
                                }
                            }
                        },

                        radios: {
                            validators: {
                                choice: {
                                    min: 1,
                                    message: 'Please kindly check this'
                                }
                            }
                        },
                    },

                    plugins: {//Learn more: https://formvalidation.io/guide/plugins
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap(),
                        // Validate fields when clicking the Submit button
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // Submit the form when all fields are valid
                        defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                    }
                }
        );
    }
    
  
    
 

   

    return {
        // public functions
        init: function () {
            _initDemo1();
          // _initDemo2();
            
        }
    };
}();






jQuery(document).ready(function () {
    KTFormControls.init();
});
