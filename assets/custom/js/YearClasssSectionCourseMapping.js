"use strict";
var KTDatatablesExtensionsKeytable = function () {



    var initTable2 = function () {
        // begin first table
        var table = $('#acadmicYear').DataTable({
            responsive: true,
            searching: true,
            ordering: true,

            select: {
                style: 'multi',
                selector: 'td:first-child .checkable',
            },
            headerCallback: function (thead, data, start, end, display) {
//				thead.getElementsByTagName('th')[0].innerHTML = `
//                    <label class="checkbox checkbox-single checkbox-solid checkbox-primary mb-0">
//                        <input type="checkbox" value="" class="group-checkable"/>
//                        <span></span>
//                    </label>`;
            },
            columnDefs: [
                {
                    targets: 0,
                    orderable: false,
//					render: function(data, type, full, meta) {
//						return `
//                        <label class="checkbox checkbox-single checkbox-primary mb-0">
//                            <input type="checkbox" value="" class="checkable"/>
//                            <span></span>
//                        </label>`;
//					},
                },

                {
                    width: '75px',
                    targets: 4,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: {'title': 'Enabled', 'class': ' label-light-success'},
                            2: {'title': 'Disabled', 'class': ' label-light-danger'},

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="label label-lg font-weight-bold' + status[data].class + ' label-inline">' + status[data].title + '</span>';
                    },
                },
            ],
        });

        table.on('change', '.group-checkable', function () {
            var set = $(this).closest('table').find('td:first-child .checkable');
            var checked = $(this).is(':checked');

            $(set).each(function () {
                if (checked) {
                    $(this).prop('checked', true);
                    table.rows($(this).closest('tr')).select();
                } else {
                    $(this).prop('checked', false);
                    table.rows($(this).closest('tr')).deselect();
                }
            });
        });
    };
    
    var Select2DropDowns = function() {
        // basic
        $('#AcademicYear, #kt_select2_1_validate').select2({
            placeholder: 'Select Academic Year'
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




jQuery(document).ready(function () {
    KTDatatablesExtensionsKeytable.init();
});
