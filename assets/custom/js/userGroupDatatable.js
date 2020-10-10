"use strict";
var KTDatatablesExtensionsKeytable = function() {

	

	var initUserGroupTable = function() {
		// begin first table
		var table = $('#kt_datatable_2_User').DataTable({
			responsive: true,
            searching: true,
            ordering:  true,
                
    

	
		
		});

		table.on('change', '.group-checkable', function() {
			var set = $(this).closest('table').find('td:first-child .checkable');
			var checked = $(this).is(':checked');

			$(set).each(function() {
				if (checked) {
					$(this).prop('checked', true);
					table.rows($(this).closest('tr')).select();
				}
				else {
					$(this).prop('checked', false);
					table.rows($(this).closest('tr')).deselect();
				}
			});
		});
	};

	return {

		//main function to initiate the module
		init: function() {
//			initTable1();
			initUserGroupTable();
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


jQuery(document).ready(function() {
	KTDatatablesExtensionsKeytable.init();
});
