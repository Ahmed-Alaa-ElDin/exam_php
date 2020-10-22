"use strict";
// Class definition

var CreateTask = function () {

    var CountDownTimmer = function () {
        var timer2 = "5:01";
        var interval = setInterval(function () {


            var timer = timer2.split(':');
            //by parsing integer, I avoid all extra string processing
            var minutes = parseInt(timer[0], 10);
            var seconds = parseInt(timer[1], 10);
            --seconds;
            minutes = (seconds < 0) ? --minutes : minutes;
            if (minutes < 0)
                clearInterval(interval);
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            //minutes = (minutes < 10) ?  minutes : minutes;
            $('.countdown').html('Time Left: ' + minutes + ':' + seconds);
            timer2 = minutes + ':' + seconds;

        }, 1000);
    }

    var QuestionEditor = function () {
        $('.summernote').summernote({
            height: 400,
            tabsize: 2
        });
    }

    var StudentAnswerAttachment = function () {
        // set the dropzone container id
        var id = '#StudentAnswerAttachment';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, {// Make the whole body a dropzone
            url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
            parallelUploads: 20,
            previewTemplate: previewTemplate,
            maxFilesize: 1, // Max filesize in MB
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () {
                myDropzone4.enqueueFile(file);
            };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }


    return {
        // public functions
        init: function () {
            CountDownTimmer();
            QuestionEditor();
            StudentAnswerAttachment();


        },
    };
}();




jQuery(document).ready(function () {
    CreateTask.init();

});
