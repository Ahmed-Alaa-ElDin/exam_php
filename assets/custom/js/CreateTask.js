"use strict";
// Class definition

var CreateTask = function () {

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
    var CreateTaskFiltersDesign1 = function () {
        // basic
        $('#Class, #kt_select2_1_validate').select2({
            placeholder: 'Class / Grade'
        });

        $('#Section, #kt_select2_1_validate').select2({
            placeholder: 'Section(s)'
        });

        $('#Subject, #kt_select2_1_validate').select2({
            placeholder: 'Subject'
        });

        $('.QuestionTags').select2({
            placeholder: "Question Tags",
            tags: true,
        });
        $('#QuestionTypeSearch').select2({
            placeholder: 'Select Question Type'
        });


    };



    $(".QuestionAddedSuccess").click(function (e) {
        Swal.fire({
            position: "top-right",
            icon: "success",
            title: "Question Successfully Added",
            showConfirmButton: false,
            timer: 1500
        });
    });




    var CreateTaskFiltersDesign2 = function () {
        // basic
        $('#StudentClass, #kt_select2_1_validate').select2({
            placeholder: 'Class / Grade'
        });

        $('#StudentSection, #kt_select2_1_validate').select2({
            placeholder: 'Section(s)',

        });

        $('#SubjectName, #kt_select2_1_validate').select2({
            placeholder: 'Subject'
        });

        $('.QuestionTags').select2({
            placeholder: "Search tag(s) with Question",
            tags: true,
        });

        $('#QuestionType, #kt_select2_1_validate').select2({
            placeholder: 'Question Type'
        });


        $('#TaskType, #kt_select2_1_validate').select2({
            placeholder: 'Task Type'
        });


        $('#CalcuateMarks, #kt_select2_1_validate').select2({
            placeholder: 'Calcuae Marks'
        });



        $('#PublishDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        $('#PublishTime').timepicker();


        $('#EndDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        $('#EndTime').timepicker();

        $('[data-switch=true]').bootstrapSwitch();




    };

    return {
        // public functions
        init: function () {

            CreateTaskFiltersDesign2();
            CreateTaskFiltersDesign1();


        },
    };
}();



function delRow(id) {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function (result) {
        if (result.value) {
            $("#rowFile_" + id).remove();



            Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                    )
        }
    });
}

jQuery(document).ready(function () {
    CreateTask.init();

});
