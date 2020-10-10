// Class definition

var KTBootstrapTimepicker = function () {

    // Private functions
    var demos = function () {
        // minimum setup
        $('#kt_timepicker_1, #kt_timepicker_1_modal').timepicker();

        // minimum setup
        $('#FromTime').timepicker({
            minuteStep: 5,
            defaultTime: '',
            showSeconds: false,
            showMeridian: true,
            snapToStep: true
        });
        $('#ToTime').timepicker({
            minuteStep: 5,
            defaultTime: '',
            showSeconds: false,
            showMeridian: true,
            snapToStep: true
        });
    }

    return {
        // public functions
        init: function () {
            demos();
        }
    };
}();

jQuery(document).ready(function () {
    KTBootstrapTimepicker.init();
});