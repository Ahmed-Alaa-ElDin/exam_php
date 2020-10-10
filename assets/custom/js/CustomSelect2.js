 // Class definition
var KTSelect2 = function() {
    // Private functions
    var demos = function() {
        // basic
        
        $('#kt_select2_1, #kt_select2_Grading_validate').select2({
            placeholder: 'Select a state'
        });
        
        
        //System Setup
         $('#kt_select2_1, #SystemStatus').select2({
            placeholder: 'Select a System Status'
        });
         $('#kt_select2_1, #SystemSetupTimeZone').select2({
            placeholder: 'Select a Time Zone'
        });
         $('#kt_select2_1, #SystemSetupDateFormat').select2({
            placeholder: 'Select a System Date Format'
        });
         $('#kt_select2_1, #SystemSetupBaseCurrencyFormat').select2({
            placeholder: 'Select a System Base Currency'
        });
        $('#kt_select2_1, #SystemSetupVideoCallingStatus').select2({
            placeholder: 'Select a Video Calling Feature'
        });
        $('#kt_select2_1, #SystemSetupVideoCallTool').select2({
            placeholder: 'Select a Video Calling Company'
        });
        
      
        
        
        
        
        
        
        
         $('#kt_select2_1, #religion').select2({
            placeholder: 'Select a Religion'
        });
        
         $('#kt_select2_1, #Gender').select2({
            placeholder: 'Select a Gender'
        });
        
         $('#kt_select2_1, #Nationality').select2({
            placeholder: 'Select a Country'
        });
        
          $('#kt_select2_1, #AdmissionInClass').select2({
            placeholder: 'Select a Country'
        });
        
           $('#kt_select2_1, #Category').select2({
            placeholder: 'Select a Category'
        });
        
           $('#kt_select2_1, #PickUpPoint').select2({
            placeholder: 'Select a Pick Up Point'
        });
        
          $('#kt_select2_1, #Transport').select2({
            placeholder: 'Select a Transport Type'
        });
        
         $('#kt_select2_1, #CurrencyDetails').select2({
            placeholder: 'Select a state'
        });
        
        
        
        
        
         $('#kt_select2_1, #PlaceOfBirth').select2({
            placeholder: 'Select a Country'
        });

        // nested
        $('#kt_select2_2, #kt_select2_2_validate').select2({
            placeholder: 'Select a state'
        });

        // loading data from array
        var data = [{
            id: 0,
            text: 'Enhancement'
        }, {
            id: 1,
            text: 'Bug'
        }, {
            id: 2,
            text: 'Duplicate'
        }, {
            id: 3,
            text: 'Invalid'
        }, {
            id: 4,
            text: 'Wontfix'
        }];

        $('#kt_select2_5').select2({
            placeholder: "Select a value",
            data: data
        });

        // loading remote data

        function formatRepo(repo) {
            if (repo.loading) return repo.text;
            var markup = "<div class='select2-result-repository clearfix'>" +
                "<div class='select2-result-repository__meta'>" +
                "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";
            if (repo.description) {
                markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
            }
            markup += "<div class='select2-result-repository__statistics'>" +
                "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
                "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
                "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
                "</div>" +
                "</div></div>";
            return markup;
        }

        function formatRepoSelection(repo) {
            return repo.full_name || repo.text;
        }

        $("#kt_select2_6").select2({
            placeholder: "Search for git repositories",
            allowClear: true,
            ajax: {
                url: "https://api.github.com/search/repositories",
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function(data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.items,
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function(markup) {
                return markup;
            }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: formatRepo, // omitted for brevity, see the source of this page
            templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
        });

        // custom styles

        // tagging support
    
    }

    

    // Public functions
    return {
        init: function() {
            demos();
            modalDemos();
        }
    };
}();

// Initialization
jQuery(document).ready(function() {
    KTSelect2.init();
});
