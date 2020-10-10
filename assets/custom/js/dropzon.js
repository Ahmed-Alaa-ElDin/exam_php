"use strict";
// Class definition

var KTDropzoneDemo = function () {


    var demo3 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_4';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone5 = new Dropzone(id, {// Make the whole body a dropzone
            url: "YOUR URL or FILE NAME", // Set the url for your upload script location
            parallelUploads: 20,
            maxFilesize: 1, // Max filesize in MB
            previewTemplate: previewTemplate,
            autoQueue: true, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        myDropzone5.on("addedfile", function (file) {
            // Hookup the start button
            $(document).find(id + ' .dropzone-item').css('display', '');
        });

        // Update the total progress bar
        myDropzone5.on("totaluploadprogress", function (progress) {
            $(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone5.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', "1");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone5.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }
  

    return {
        // public functions
        init: function () {

            demo3();
            
        }
    };
}();

KTUtil.ready(function () {
    KTDropzoneDemo.init();

    $('#kt_forms_widget_3_input').keyup(function () {
       

        if ($('#kt_forms_widget_3_input').val() !== '')
        {
            $("#ReplyButton").css("display", "block");
        } else
        {
            $("#ReplyButton").css("display", "none");
        }


    });
});

