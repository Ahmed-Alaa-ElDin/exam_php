"use strict";
var KTDatatablesExtensionsKeytable = function () {



    var initTable2 = function () {
        // begin first table
        var table = $('#CourseSubjectTable').DataTable({
            responsive: true,
            searching: true,
            ordering: true,

           
        });
    };
    
    var Select2DropDowns = function() {
        // basic
        $('#AcademicYear, #kt_select2_1_validate').select2({
            placeholder: 'Select Academic Year'
        });
        
         $('#CourseSubjectName, #kt_select2_1_validate').select2({
            placeholder: 'Select Subject'
        });
         $('#NumberOfLecturesPerWeek, #kt_select2_1_validate').select2({
            placeholder: 'Select Number Of Days'
        });
        
         $('#ElectiveSubject, #kt_select2_1_validate').select2({
            placeholder: 'Elective ?'
        });
        
         $('#CourseSelectedSubjects, #kt_select2_1_validate').select2({
            placeholder: 'Select Subject'
        });
        
        
        
        
    }

  

    return {

        //main function to initiate the module
        init: function () {
//			initTable1();
            initTable2();
            Select2DropDowns();
           
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

function AddNewBook()
{
    $('#CurrentBooks').addClass(('d-none'));
     $(".DisplayAddNewBook").addClass("d-block");
}

function DisplayAddBook()
{
    $("#ISBAN").addClass("d-none");
    $('#AddNewBook').addClass('d-block');
}




jQuery(document).ready(function () {
    KTDatatablesExtensionsKeytable.init();
});
