// Class definition
var KTFormControls = function () {
	// Private functions
	var _initDemo1 = function () {
		FormValidation.formValidation(
			document.getElementById('kt_form_SystemStatus'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email is required'
							},
							emailAddress: {
								message: 'The value is not a valid email address'
							}
						}
					},

					url: {
						validators: {
							notEmpty: {
								message: 'Website URL is required'
							},
							uri: {
								message: 'The website address is not valid'
							}
						}
					},

					digits: {
						validators: {
							notEmpty: {
								message: 'Digits is required'
							},
							digits: {
								message: 'The velue is not a valid digits'
							}
						}
					},

					creditcard: {
						validators: {
							notEmpty: {
								message: 'Credit card number is required'
							},
							creditCard: {
								message: 'The credit card number is not valid'
							}
						}
					},

					phone: {
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

					optionStatus: {
						validators: {
							notEmpty: {
								message: 'Please select an option'
							}
						}
					},

					options: {
						validators: {
							choice: {
								min:2,
								max:5,
								message: 'Please select at least 2 and maximum 5 options'
							}
						}
					},

					Reason: {
						validators: {
							notEmpty: {
								message: 'Please enter Reason'
							},
							stringLength: {
								min:20,
								max:100,
								message: 'Please enter a menu within text length range 20 and 100'
							}
						}
					},

					checkbox: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly check this'
							}
						}
					},

					checkboxes: {
						validators: {
							choice: {
								min:2,
								max:5,
								message: 'Please check at least 1 and maximum 2 options'
							}
						}
					},

					radios: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly check this'
							}
						}
					},
				},

				plugins: { //Learn more: https://formvalidation.io/guide/plugins
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


	var _initDemo2 = function () {
		FormValidation.formValidation(
			document.getElementById('kt_form_TimeZone'),
			{
				fields: {
					timeZone: {
						validators: {
							notEmpty: {
								message: 'Please select an option'
							}
						}
					},
					dateFormat: {
						validators: {
							notEmpty: {
								message: 'Please select a Date Format'
							}
						}
					},
					currency: {
						validators: {
							notEmpty: {
								message: 'Please select Currency First'
							}
						}
					},
					billing_card_exp_year: {
						validators: {
							notEmpty: {
								message: 'Expiry Year is required'
							}
						}
					},
					billing_card_cvv: {
						validators: {
							notEmpty: {
								message: 'CVV is required'
							},
							digits: {
								message: 'The CVV velue is not a valid digits'
							}
						}
					},

					billing_address_1: {
						validators: {
							notEmpty: {
								message: 'Address 1 is required'
							}
						}
					},
					billing_city: {
						validators: {
							notEmpty: {
								message: 'City 1 is required'
							}
						}
					},
					billing_state: {
						validators: {
							notEmpty: {
								message: 'State 1 is required'
							}
						}
					},
					billing_zip: {
						validators: {
							notEmpty: {
								message: 'Zip Code is required'
							},
							zipCode: {
								country: 'US',
								message: 'The Zip Code value is invalid'
							}
						}
					},

					billing_delivery: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly select delivery type'
							}
						}
					},
					package: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly select package type'
							}
						}
					}
				},

				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Validate fields when clicking the Submit button
					submitButton: new FormValidation.plugins.SubmitButton(),
            		// Submit the form when all fields are valid
            		defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap(),
				}
			}
		);
	}

	var _initDemo3 = function () {
		FormValidation.formValidation(
			document.getElementById('kt_form_SMTP'),
			{
				fields: {
					SenderName: {
						validators: {
							notEmpty: {
								message: 'Please Enter Sender Name'
							}
						}
					},

					senderEmail: {
						validators: {
							notEmpty: {
								message: 'Email is required'
							},
							emailAddress: {
								message: 'Please Enter a valid email address'
							}
						}
					},

					serverDetails: {
						validators: {
							notEmpty: {
								message: 'Please Enter Server Details'
							}
						}
					},

					
					serverPort: {
						validators: {
							notEmpty: {
								message: 'Please Enter Digits'
							},
							digits: {
								message: 'Invalid Input'
							}
						}
					},


					passwordSMTP: {
						validators: {
							notEmpty: {
								message: 'Please Enter your Password'
							}
						}
					},

					billing_card_exp_month: {
						validators: {
							notEmpty: {
								message: 'Expiry Month is required'
							}
						}
					},
					billing_card_exp_year: {
						validators: {
							notEmpty: {
								message: 'Expiry Year is required'
							}
						}
					},
					billing_card_cvv: {
						validators: {
							notEmpty: {
								message: 'CVV is required'
							},
							digits: {
								message: 'The CVV velue is not a valid digits'
							}
						}
					},

					billing_address_1: {
						validators: {
							notEmpty: {
								message: 'Address 1 is required'
							}
						}
					},
					billing_city: {
						validators: {
							notEmpty: {
								message: 'City 1 is required'
							}
						}
					},
					billing_state: {
						validators: {
							notEmpty: {
								message: 'State 1 is required'
							}
						}
					},
					billing_zip: {
						validators: {
							notEmpty: {
								message: 'Zip Code is required'
							},
							zipCode: {
								country: 'US',
								message: 'The Zip Code value is invalid'
							}
						}
					},

					billing_delivery: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly select delivery type'
							}
						}
					},
					package: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly select package type'
							}
						}
					}
				},

				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Validate fields when clicking the Submit button
					submitButton: new FormValidation.plugins.SubmitButton(),
            		// Submit the form when all fields are valid
            		defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap(),
				}
			}
		);
	}
	
	var _initDemo4 = function () {
		FormValidation.formValidation(
			document.getElementById('kt_form_VIDEO'),
			{
				fields: {
					serverAddress: {
						validators: {
							notEmpty: {
								message: 'Please Enter Server Address'
							}
						}
					}
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

	var _initDemo5 = function () {
		FormValidation.formValidation(_initDemo5,
			document.getElementById('kt_form_SettingRecord'),
			{
				fields: {
					record: {
						validators: {
							notEmpty: {
								message: 'Please select an option'
							}
						}
					},

					testName: {
						validators: {
							notEmpty: {
								message: 'Please Enter Server Details'
							}
						}
					},

					
					serverdPort: {
						validators: {
							notEmpty: {
								message: 'Please Enter Digits'
							},
							digits: {
								message: 'Invalid Input'
							}
						}
					},


					passworddSMTP: {
						validators: {
							notEmpty: {
								message: 'Please Enter your Password'
							}
						}
					},

					billing_acard_exp_month: {
						validators: {
							notEmpty: {
								message: 'Expiry Month is required'
							}
						}
					},
					billing_cdard_exp_year: {
						validators: {
							notEmpty: {
								message: 'Expiry Year is required'
							}
						}
					},
					billinga_card_cvv: {
						validators: {
							notEmpty: {
								message: 'CVV is required'
							},
							digits: {
								message: 'The CVV velue is not a valid digits'
							}
						}
					},

					billing_adddress_1: {
						validators: {
							notEmpty: {
								message: 'Address 1 is required'
							}
						}
					},
					billing_ccity: {
						validators: {
							notEmpty: {
								message: 'City 1 is required'
							}
						}
					},
					billing_sstate: {
						validators: {
							notEmpty: {
								message: 'State 1 is required'
							}
						}
					},
					billing_zzip: {
						validators: {
							notEmpty: {
								message: 'Zip Code is required'
							},
							zipCode: {
								country: 'US',
								message: 'The Zip Code value is invalid'
							}
						}
					},

					billing_ddelivery: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly select delivery type'
							}
						}
					},
					ppackage: {
						validators: {
							choice: {
								min:1,
								message: 'Please kindly select package type'
							}
						}
					}
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

	return {
		// public functions
		init: function() {
			_initDemo1();
			_initDemo2();
			_initDemo3();
			_initDemo4();
			_initDemo5();
		}
	};
}();

jQuery(document).ready(function() {
	KTFormControls.init();
});
