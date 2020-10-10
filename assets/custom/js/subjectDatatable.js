function show(cID){
	$('#kt_sweetalert_addSubject_'+cID).click(function (e) {
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
	});	
}
function searching() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchData");
	filter = input.value.toUpperCase();
	table = document.getElementById("kt_datatable_2_addSubject");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
	  td = tr[i].getElementsByTagName("td")[1];
	  if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  tr[i].style.display = "";
		} else {
		  tr[i].style.display = "none";
		}
	  }       
	}
  }

var KTDatatablesBasicBasic = function() {

	
	var initTable1 = function() {
		var table = $('#kt_datatable_2_addSubject');
		var countID=0;
		// begin first table
		table.DataTable({
			responsive: true,

			// DOM Layout settings
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

			lengthMenu: [5, 10, 25, 50],

			pageLength: 10,

			language: {
				'lengthMenu': 'Display _MENU_',
			},

			// Order settings
			order: [[1, 'desc']],

			headerCallback: function(thead, data, start, end, display) {
				thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="">
                        <span></span>
                    </label>`;
			},

			columnDefs: [
               
                {
					targets: 3,
					width: '75px',
					render: function(data, type, full, meta) {
						var status = {
							
							
							5: {'title': 'Info', 'class': ' label-light-info'},
							6: {'title': 'Danger', 'class': ' label-light-danger'},
							7: {'title': 'Warning', 'class': ' label-light-warning'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="label label-lg font-weight-bold' + status[data].class + ' label-inline">' + status[data].title + '</span>';
					},
				},
				{
					targets: 4,
					width: '50px',
					className: 'dt-left',
					orderable: false,
					render: function(data, type, full, meta) {
						countID++;

						return `
						<div class="row"><a  class="btn btn-icon btn-light btn-sm mx-3" ngbtooltip="Edit" ngbtooltipclass="kt-tooltip" placement="top" ng-reflect-placement="top" ng-reflect-ngb-tooltip="Edit"><i data-target="#AddSubject" data-toggle="modal" class="fa fa-edit text-primary"></i></a><a class="btn btn-icon btn-light btn-sm mx-3" ngbtooltip="Delete" ngbtooltipclass="kt-tooltip" placement="top" ng-reflect-placement="top" ng-reflect-ngb-tooltip="Delete"><i id="kt_sweetalert_addSubject_`+countID+`" onclick="show(`+countID+`)" data-toggle="modal" class="fa fa-trash text-primary"></i></a></div>
					
                        `;
					},
				},
				
			
				
			],
		});

	/*	table.on('change', '.group-checkable', function() {
			var set = $(this).closest('table').find('td:first-child .checkable');
			var checked = $(this).is(':checked');

			$(set).each(function() {
				if (checked) {
					$(this).prop('checked', true);
					$(this).closest('tr').addClass('active');
				}
				else {
					$(this).prop('checked', false);
					$(this).closest('tr').removeClass('active');
				}
			});
		}); */

		table.on('change', 'tbody tr .checkbox', function() {
			$(this).parents('tr').toggleClass('active');
		});
	};

	

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
			
		}
	};
}();

jQuery(document).ready(function() {
	KTDatatablesBasicBasic.init();

});