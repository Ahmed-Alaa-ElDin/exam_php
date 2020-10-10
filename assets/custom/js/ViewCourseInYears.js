"use strict";
var KTDatatablesExtensionsKeytable = function () {
    var initTable2 = function () {
        // begin first table
        var table = $('#acadmicYear').DataTable({
            responsive: true,
            searching: true,
            ordering: true,
        });


    };

    var Select2DropDowns = function () {
        // basic
        $('#ClassID, #kt_select2_1_validate').select2({
            placeholder: 'Select Class / Grade Name'
        });

        $('#SectionID, #kt_select2_1_validate').select2({
            placeholder: 'Select Section(s) Name'
        });

        $('#CourseID, #kt_select2_1_validate').select2({
            placeholder: 'Select Course Name'
        });
    }

    var ClassSectionInformation = function () {
        $('#ClassSectionInformation').repeater({
            initEmpty: true,

            defaultValues: {
                'text-input': 'foo'
            },

            show: function () {

                $(this).slideDown();
           

                $('.SectionName').select2();
                $('.GradingSystem').select2();
              
            },

            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            }
        });
    }


    return {

        //main function to initiate the module
        init: function () {
//			initTable1();
            initTable2();
            Select2DropDowns();
            ClassSectionInformation();

        },

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




jQuery(document).ready(function () {
    KTDatatablesExtensionsKeytable.init();
});
