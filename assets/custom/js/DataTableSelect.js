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

    var initTable3 = function () {
        // begin first table
        var table = $('#systemSecure').DataTable({
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
                    targets: 5,
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

    var initTable4 = function () {
        // begin first table
        var table = $('#classManagment').DataTable({
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
                    width: '135px',
                    targets: 3,
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

    var initTable5 = function () {
        // begin first table
        var table = $('#SectionManagement').DataTable({
            responsive: true,
            searching: true,
            ordering: true,
        });
    };

    var initTable6 = function () {
        // begin first table
        var table = $('#subjectManagment').DataTable({
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
                    width: '50px',
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
                    width: '265px',
                    targets: 2,
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

    var initTable7 = function () {
        // begin first table
        var table = $('#courseManagment').DataTable({
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
                    targets: 3,
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

    var initTable8 = function () {
        // begin first table
        var table = $('#staff').DataTable({
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
                    width: '550px',
                    targets: 1,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: {'title': 'Enabled', 'class': ' label-light-success'},
                            2: {'title': 'Disabled', 'class': ' label-light-danger'},

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '';
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

    var initTable9 = function () {
        // begin first table
        var table = $('#admission').DataTable({
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
                    width: '550px',
                    targets: 1,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: {'title': 'Enabled', 'class': ' label-light-success'},
                            2: {'title': 'Disabled', 'class': ' label-light-danger'},

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '';
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

    var initTable10 = function () {
        // begin first table
        var table = $('#Education').DataTable({
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
                    width: '550px',
                    targets: 1,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: {'title': 'Enabled', 'class': ' label-light-success'},
                            2: {'title': 'Disabled', 'class': ' label-light-danger'},

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '';
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

    var initTable11 = function () {
        // begin first table
        var table = $('#holidays').DataTable({
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
                    width: '100px',
                    targets: 4,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: {'title': 'Enabled', 'class': ' label-light-success'},
                            2: {'title': 'Disabled', 'class': ' label-light-danger'},

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '';
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

    var initTable12 = function () {
        // begin first table
        var table = $('#role').DataTable({
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
                    width: '500px',
                    targets: 1,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: {'title': 'Enabled', 'class': ' label-light-success'},
                            2: {'title': 'Disabled', 'class': ' label-light-danger'},

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '';
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

    var initTable13 = function () {
        // begin first table
        var table = $('#ageBracket').DataTable({
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
                    width: '500px',
                    targets: 1,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: {'title': 'Enabled', 'class': ' label-light-success'},
                            2: {'title': 'Disabled', 'class': ' label-light-danger'},

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '';
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

    return {

        //main function to initiate the module
        init: function () {
//			initTable1();
            initTable2();
            initTable3();
            initTable4();
            initTable5();
            initTable6();
            initTable7();
            initTable8();
            initTable9();
            initTable10();
            initTable11();
            initTable12();
            initTable13();
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
