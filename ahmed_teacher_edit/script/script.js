$(function() {
    var inputNumber = 0
    var inputList = [document.getElementById("questionInput")]


    $("#StudentSection").on("change", function() {
        if ($(this).val() == 0) {
            $.getScript("ahmed/script/urdutextbox.js", function() {
                inputList.forEach(element => {
                    MakeTextBoxArabicDisabled(element)
                    MakeTextBoxUrduEnabled(element)
                    element.style.textAlign = "right"
                    element.style.direction = "rtl"
                    $(".keyboardDiv").fadeIn()
                    $("img.keyboardArabic").hide()
                    $("img.keyboardUrdu").show()
                });
            })
        } else if ($(this).val() == 2) {
            $.getScript("ahmed/script/arabictextbox.js", function() {
                inputList.forEach(element => {
                    MakeTextBoxUrduDisabled(element)
                    MakeTextBoxArabicEnabled(element)
                    element.style.textAlign = "right"
                    element.style.direction = "rtl"
                    $(".keyboardDiv").fadeIn()
                    $("img.keyboardArabic").show()
                    $("img.keyboardUrdu").hide()
                });
            })
        } else {
            inputList.forEach(element => {
                MakeTextBoxUrduDisabled(element)
                MakeTextBoxArabicDisabled(element)
                element.style.textAlign = "left"
                element.style.direction = "ltr"
                $(".keyboardDiv").fadeOut()
                $("img.keyboardArabic").hide()
                $("img.keyboardUrdu").hide()
            });
        }
    })

    // keyboardInOut
    $(".keyboardDiv").on("click", function() {
        if ($(this).css("right") != "-3px") {
            $(this).animate({
                right: '-3px'
            })
        } else {
            $(this).animate({
                right: "-50vw"
            })
        }
    })

    $("#StudentClass").change(function() {
        // Edit Preview class According to Question Type 
        setTimeout(() => {
            `${$("#previewBox").find(".grade").text($("#StudentClass").siblings(".select2-container").find("#select2-StudentClass-container").text())}`
        }, 10);
    })

    $("#StudentSection").change(function() {
        setTimeout(() => {
            `${$("#previewBox").find(".subject").text($("#StudentSection").siblings(".select2-container").find("#select2-StudentSection-container").text())}`
        }, 10);
    })


    // Set the Dropzones for All Questions
    Dropzone.autoDiscover = false;

    // Activate Dropzone
    // for Question Attachment
    var allImages = {}

    $("#essayAttachFilesWithQuestion, #mcqAttachFilesWithQuestion, #trueFalseAttachFilesWithQuestion, #dragDropAttachFilesWithQuestion, #assortmentAttachFilesWithQuestion, #fillSpaceAttachFilesWithQuestion, #imageLabelingAttachFilesWithQuestion").dropzone({
        url: window.location.href,
        acceptedFiles: "image/*,application/pdf,.doc,.docx",
        addRemoveLinks: true,

        // create base64 image link
        init: function() {
            this.on("addedfile", function(file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var base64String = event.target.result;
                    var fileName = file.name
                    allImages[fileName] = base64String
                };
                reader.readAsDataURL(file);
            });
        }
    });

    // Set Extra Dropzone for Image Labeling
    let imageLabelingAllImages = {}

    $("#imageLabelingQuestionUpload").dropzone({
        url: window.location.href,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        maxFiles: 1,

        // create base64 image link
        init: function() {
            this.on("addedfile", function(file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var base64String = event.target.result;
                    var fileName = file.name
                    imageLabelingAllImages[fileName] = base64String
                };
                reader.readAsDataURL(file);
            });
        },

        complete: function() {
            let workingImageName = $("#imageLabelingQuestionUpload .dz-success .dz-filename").text()
            let workingImageBase64 = imageLabelingAllImages[workingImageName]
            $("#imageLabelingQuestionUpload").parent().fadeOut()
            $(".clearMark").fadeIn()
            $(".deleteImg").fadeIn()
            $("#ImageLabeling .mark, #ImageLabeling .input_div").remove()
            $(".question_img_div img").attr("src", workingImageBase64).attr("alt", workingImageName)
            answer_no = 0
        }
    });


    // Set Dropzone for Audio Video
    let audioVideoAllUploads = {}

    $("#audioVideoQuestionUpload").dropzone({
        url: window.location.href,
        addRemoveLinks: true,

        // create base64 image link
        init: function() {
            this.on("addedfile", function(file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var base64String = event.target.result;
                    var fileName = file.name
                    audioVideoAllUploads[fileName] = base64String
                };
                reader.readAsDataURL(file);
            });
        }
    });


    // Set functionality upon Question Type Change
    $("#QuestionType").on("change", function() {

        // Edit Preview Tilte According to Question Type 
        setTimeout(() => {
            `${$("#previewBox").find(".previewQuestionType").text($("#QuestionType").siblings(".select2-container").find("#select2-QuestionType-container").text())}`
        }, 10);

        // Check Details Button Label
        if ($(this).val() == 7) {
            $("#AdvanceSearchElements").addClass("show")
            $("#questionTextInput label").text("Type Hint for this Question")
        } else {
            $("#questionTextInput label").text("Type Your Question")
            $("#AdvanceSearchElements").removeClass("show")
        }

        // Disable the Save Form Button
        $("#saveForm").off("click");
        $("#previewButton").off("click");
        $('.note-editing-area').off("keyup , change")
        $(".question_type").css("display", "none");

        $("#questionTextInput input").val("")
        $("#QuestionEditor").siblings(".note-editor").find(".note-editable.card-block span").remove()
        $(".fillSpaceInputs").children().remove()
        $('#QuestionEditor').summernote("reset");


        // begin:: check if the question is Short Answer/Essay
        if ($(this).val() == 1) {

            // config Question Types Fade in & out
            $("#ShortQuestion").fadeIn()
                // Add Function to Save Form Button

            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })
                var questionHTML = $("#questionTextInput input").val()
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var allowRichText = $("#essayAllowRichText").prop("checked")
                var allowAttachment = $("#essayAllowAttach").prop("checked")
                var maximumMarks = $("#essayMaximumMarks").val();
                var wordsCountLimit = $("#essayWordCount").val();
                var maximumTime = $("#essayMaximumTime").val();
                var questionImages = {}
                $("#essayAttachFilesWithQuestion").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionImages[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                    }
                })
                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "allow_rich_text": allowRichText,
                    "allow_attachment": allowAttachment,
                    "maximum_marks": maximumMarks,
                    "words_count_limit": wordsCountLimit,
                    "maximum_time": maximumTime,
                    "question_images": questionImages
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);
            })

            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // Allow Rich Text
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Rich Text</span><span class="col-lg-4" id="allowRichText">${$("#essayAllowRichText").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="allowAttachment">${$("#essayAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="maximumMarks">${$("#essayMaximumMarks").val() != 0 ? $("#essayMaximumMarks").val() : "N/A"}</span></div>`)

                // Words Count Limit
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Words Count Limit</span><span class="col-lg-4" id="wordsCountLimit">${$("#essayWordCount").val() != 0 ? $("#essayWordCount").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="essayMaximumTime">${$("#essayMaximumTime").val() != 0 ? $("#essayMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)


                // set question text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)

                // set question Uploads
                var questionUploads = {}
                $("#essayAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                })
                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName, fileBase64) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }

            })
        }
        // end:: check if the question is Short Answer/Essay

        // begin:: check if the question is MultiChoice
        else if ($(this).val() == 2) {

            $("#MultiChoice").fadeIn()

            var mcqAllImages = {}

            // config Question Types Fade in & out

            $("#MultiChoice").find("button[data-repeater-create]").on("click", function() {

                $(".icon").last().on("click", function() {
                        $(this).siblings('input').getkeyboard().reveal()
                    })
                    // Enable Attachment box
                $("#MultiChoice tr[data-repeater-item]").last().find(".MCQAttachments").dropzone({
                    url: window.location.href,
                    acceptedFiles: "image/*",
                    addRemoveLinks: true,
                    maxFiles: 1,

                    // create base64 image link
                    init: function() {
                        this.on("addedfile", function(file) {
                            var reader = new FileReader();
                            reader.onload = function(event) {
                                var base64String = event.target.result;
                                var fileName = file.name
                                mcqAllImages[fileName] = base64String
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                });

                // add id to input file 
                $("input.choiceInput").last().attr("id", "input" + inputNumber)
                let thisInput = document.getElementById("input" + inputNumber)
                inputList.push(thisInput)
                inputNumber += 1;
                if ($("#StudentSection").val() === "0") {
                    inputList.forEach(element => {
                        MakeTextBoxArabicDisabled(element)
                        MakeTextBoxUrduEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "2") {
                    inputList.forEach(element => {
                        MakeTextBoxUrduDisabled(element)
                        MakeTextBoxArabicEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "1") {
                    inputList.forEach(element => {
                        element.style.textAlign = "left"
                    });
                }

            })

            // handle save form clicking
            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })

                var questionHTML = $("#questionTextInput input").val();
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var randomizeOptions = $("#mcqRandomizeOptions").prop("checked")
                var allowAttachment = $("#mcqAllowAttach").prop("checked")
                var allowPartialCredit = $("#mcqAllowPartialCredit").prop("checked")
                var maximumMarks = $("#mcqMaximumMarks").val();
                var maximumTime = $("#mcqMaximumTime").val();

                var questionImages = {}
                $("#mcqAttachFilesWithQuestion").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionImages[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                    }
                })

                var choices = []

                $("#MultiChoice table .choice").each(function() {

                    let choice = {}

                    choice["image_name"] = $(this).find(".dz-success").find("img").attr("alt")
                    choice["image"] = mcqAllImages[$(this).find(".dz-success").find("img").attr("alt")]
                    choice["text"] = $(this).find(".choice-text").val()
                    choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

                    choices.push(choice)
                })

                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "rondomize_options": randomizeOptions,
                    "allow_attachment": allowAttachment,
                    "allow_partial_credit": allowPartialCredit,
                    "maximum_marks": maximumMarks,
                    "maximum_time": maximumTime,
                    "question_images": questionImages,
                    "choices": choices
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);
            })

            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // randomize Options
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Randomize Options</span><span class="col-lg-4" id="mcqRandomizeOptions">${$("#mcqRandomizeOptions").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="mcqAllowAttach">${$("#mcqAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Partial Credit
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Partial Credit</span><span class="col-lg-4" id="mcqAllowPartialCredit">${$("#mcqAllowPartialCredit").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="mcqMaximumMarks">${$("#mcqMaximumMarks").val() != 0 ? $("#mcqMaximumMarks").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="mcqMaximumTime">${$("#mcqMaximumTime").val() != 0 ? $("#mcqMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)


                var choices = []

                // Set Question Text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)
                    // ----------------------------------------------------------

                // set question Uploads
                var questionUploads = {}
                $("#mcqAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                })
                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName, fileBase64) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }
                // ----------------------------------------------------------

                // Set Choices
                $("#MultiChoice table .choice").each(function() {

                    let choice = {}

                    choice["image_name"] = $(this).find(".dz-success").find("img").attr("alt")
                    choice["image"] = mcqAllImages[$(this).find(".dz-success").find("img").attr("alt")]
                    choice["text"] = $(this).find(".choice-text").val()
                    choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

                    choices.push(choice)
                })


                var totalChoices = "<div class='totalChoices'></div>"
                $(".preview_body").append(totalChoices)


                for (var i = 0; i < choices.length; i++) {
                    let choiceBox = "<div class='choiceBox row' data-val='" + choices[i]["text"] + "'></div>"
                        // Image & Text
                    if (choices[i]["image"] != undefined && choices[i]["text"] != "") {
                        $(".preview_body .totalChoices").append(choiceBox)
                        let choiceImg = "<div class='col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
                        let choiceText = "<div class='col-8 choiceText'><span>" + choices[i]["text"] + "</span></div>"
                        $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
                    } else if (choices[i]["image"] != undefined) {
                        $(".preview_body .totalChoices").append(choiceBox)
                        let choiceImg = "<div class=' col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
                        $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
                    } else if (choices[i]["text"] != "") {
                        $(".preview_body .totalChoices").append(choiceBox)
                        let choiceText = "<div class='col-12 choiceText'><span>" + choices[i]["text"] + "</span></div>"
                        $(".preview_body .totalChoices .choiceBox").last().append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 35%;'></i>")
                    }
                }



                $(".preview_body .totalChoices .choiceBox").on("click", function() {
                    $(this).toggleClass("selected")
                })

                // ----------------------------------------------------------


            })
        }
        // end:: check if the question is MultiChoice

        // begin:: check if the question is TrueFalse
        else if ($(this).val() == 3) {

            var trueFalseAllImages = {}
                // config Question Types Fade in & out
            $("#TrueFalse").fadeIn()

            // add new choice
            $('#TrueFalse').find("button[data-repeater-create]").on("click", function() {

                // create new node
                let newChoice = '<tr data-repeater-item="" class="choice">\
        <td class="multi-choice-td">\
        <div class="dropzone dropzone-default kt_dropzone_1 TFAttachments">\
        <div class="dropzone-msg dz-message needsclick">\
        <h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3>\
        </div>\
        </div>\
        </td>\
        <td class="multi-choice-td">\
        <input type="text" class="form-control choice-text" placeholder="Enter Possible Choice">\
        </td>\
        <td class="multi-choice-td pl-10  text-center" align="center">\
        <label class="radio radio-lg">\
        <input type="radio" class="choice-right-false" name="TFRadio" />\
        <span></span></label>\
        </td>\
        <td class="multi-choice-td  text-center">\
        <a href="javascript:;" data-repeater-delete="" class="btn font-weight-bold btn-danger btn-icon">\
        <i class="la la-remove"></i>\
        </a>\
        </td>\
        </tr>'

                $('#TrueFalse table').append(newChoice)

                // activate Dropzone
                $("#TrueFalse table .dropzone").last().dropzone({
                    url: window.location.href,
                    acceptedFiles: "image/*",
                    addRemoveLinks: true,
                    maxFiles: 1,

                    // create base64 image link
                    init: function() {
                        this.on("addedfile", function(file) {
                            var reader = new FileReader();
                            reader.onload = function(event) {
                                var base64String = event.target.result;
                                var fileName = file.name
                                trueFalseAllImages[fileName] = base64String
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                });

                // add action to delete button
                $("#TrueFalse table a[data-repeater-delete]").last().on("click", function() {
                    let check = confirm("Are you sure you want to delete this element?")
                    if (check) {
                        $(this).parents("tr").remove()
                    }
                })

                // add id to input file 
                $("input.choice-text").last().attr("id", "input" + inputNumber)
                let thisInput = document.getElementById("input" + inputNumber)
                inputList.push(thisInput)
                inputNumber += 1;
                if ($("#StudentSection").val() === "0") {
                    inputList.forEach(element => {
                        MakeTextBoxArabicDisabled(element)
                        MakeTextBoxUrduEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "2") {
                    inputList.forEach(element => {
                        MakeTextBoxUrduDisabled(element)
                        MakeTextBoxArabicEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "1") {
                    inputList.forEach(element => {
                        element.style.textAlign = "left"
                    });
                }

            })


            // handle save form clicking
            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })

                var questionHTML = $("#questionTextInput input").val();
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var randomizeOptions = $("#trueFalseRandomizeOptions").prop("checked")
                var allowAttachment = $("#trueFalseAllowAttach").prop("checked")
                var allowPartialCredit = $("#trueFalseAllowPartialCredit").prop("checked")
                var maximumMarks = $("#trueFalseMaximumMarks").val();
                var maximumTime = $("#trueFalseMaximumTime").val();

                var questionImages = {}
                $("#trueFalseAttachFilesWithQuestion").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionImages[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                    }
                })

                var choices = []

                $("#TrueFalse table .choice").each(function() {

                    let choice = {}

                    choice["image_name"] = $(this).find(".dz-success img").attr("alt")
                    choice["image"] = trueFalseAllImages[$(this).find(".dz-success img").attr("alt")]
                    choice["text"] = $(this).find(".choice-text").val()
                    choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

                    choices.push(choice)
                })


                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "rondomize_options": randomizeOptions,
                    "allow_attachment": allowAttachment,
                    "allow_partial_credit": allowPartialCredit,
                    "maximum_marks": maximumMarks,
                    "maximum_time": maximumTime,
                    "question_images": questionImages,
                    "choices": choices
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);
            })

            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // randomize Options
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Randomize Options</span><span class="col-lg-4" id="trueFalseRandomizeOptions">${$("#trueFalseRandomizeOptions").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="trueFalseAllowAttach">${$("#trueFalseAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Partial Credit
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Partial Credit</span><span class="col-lg-4" id="trueFalseAllowPartialCredit">${$("#trueFalseAllowPartialCredit").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="trueFalseMaximumMarks">${$("#trueFalseMaximumMarks").val() != 0 ? $("#trueFalseMaximumMarks").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="trueFalseMaximumTime">${$("#trueFalseMaximumTime").val() != 0 ? $("#trueFalseMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)

                var choices = []

                // Set Question Text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)
                    // ----------------------------------------------------------

                // set question Uploads
                var questionUploads = {}
                $("#trueFalseAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                })
                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName, fileBase64) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }
                // ----------------------------------------------------------

                // Set Choices
                $("#TrueFalse table .choice").each(function() {

                    let choice = {}

                    choice["image_name"] = $(this).find(".dz-success img").attr("alt")
                    choice["image"] = trueFalseAllImages[$(this).find(".dz-success img").attr("alt")]
                    choice["text"] = $(this).find(".choice-text").val()
                    choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

                    choices.push(choice)
                })


                var totalChoices = "<div class='totalChoices'></div>"
                $(".preview_body").append(totalChoices)


                for (var i = 0; i < choices.length; i++) {
                    let choiceBox = "<div class='choiceBox row' data-val='" + choices[i]["text"] + "'></div>"
                        // Image & Text
                    if (choices[i]["image"] != undefined && choices[i]["text"] != "") {
                        $(".preview_body .totalChoices").append(choiceBox)
                        let choiceImg = "<div class='col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
                        let choiceText = "<div class='col-8 choiceText'><span>" + choices[i]["text"] + "</span></div>"
                        $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
                    } else if (choices[i]["image"] != undefined) {
                        $(".preview_body .totalChoices").append(choiceBox)
                        let choiceImg = "<div class=' col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
                        $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
                    } else if (choices[i]["text"] != "") {
                        $(".preview_body .totalChoices").append(choiceBox)
                        let choiceText = "<div class='col-12 choiceText'><span>" + choices[i]["text"] + "</span></div>"
                        $(".preview_body .totalChoices .choiceBox").last().append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 35%;'></i>")
                    }
                }

                $(".preview_body .totalChoices .choiceBox").on("click", function() {
                    $(this).addClass("selected").siblings().removeClass("selected")
                })

                // ----------------------------------------------------------

            })
        }
        // end:: check if the question is TrueFalse

        // begin:: check if the question is Assortment
        else if ($(this).val() == 4) {

            var assortmentAllImages = {}
                // config Question Types Fade in & out
            $("#Assortment").fadeIn()

            // add new choice
            $('#Assortment').find("button[data-repeater-create]").on("click", function() {

                // create new node
                let newElement = '<tr data-repeater-item="" class="element"><td class="multi-choice-td"><div class="dropzone dropzone-default kt_dropzone_1 assortmentAttachments"><div class="dropzone-msg dz-message needsclick"><h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3></div></div></td><td class="multi-choice-td"><input type="text" class="form-control element-text" placeholder="Enter Element Text"></td><td class="multi-choice-td" align="center"><input type="number" class="form-control element-order" id="' + Math.random() * 10 + '" placeholder="Enter the Order of This Element"></td><td class="multi-choice-td  text-center"><a href="javascript:;" data-repeater-delete="" class="btn font-weight-bold btn-danger btn-icon"><i class="la la-remove"></i></a></td></tr>'

                $('#Assortment table').append(newElement)

                // activate Dropzone
                $("#Assortment table .dropzone").last().dropzone({
                    url: window.location.href,
                    acceptedFiles: "image/*",
                    addRemoveLinks: true,
                    maxFiles: 1,

                    // create base64 image link
                    init: function() {
                        this.on("addedfile", function(file) {
                            var reader = new FileReader();
                            reader.onload = function(event) {
                                var base64String = event.target.result;
                                var fileName = file.name
                                assortmentAllImages[fileName] = base64String
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                });

                // Check Duplications
                $("#Assortment table .element-order").on("keyup , change", function() {
                    $(this).css({ "background-color": "#fff", "color": "#000" })
                    let element = $(this)
                    let elementId = $(this).attr("id")
                    let elementOrder = $(this).val()
                    $("#Assortment table .element-order").each(function() {
                        if ($(this).val() == elementOrder && $(this).attr("id") != elementId) {
                            element.css({ "background-color": "rgba(246, 78, 96, 0.1)", "color": "#F64E60" })
                        }
                    })
                })

                // add action to delete button
                $("#Assortment table a[data-repeater-delete]").last().on("click", function() {
                    let check = confirm("Are you sure you want to delete this element?")
                    if (check) {
                        $(this).parents("tr").remove()
                    }
                })

                // add id to input file 
                $("input.element-text").last().attr("id", "input" + inputNumber)
                let thisInput = document.getElementById("input" + inputNumber)
                inputList.push(thisInput)
                inputNumber += 1;
                if ($("#StudentSection").val() === "0") {
                    inputList.forEach(element => {
                        MakeTextBoxArabicDisabled(element)
                        MakeTextBoxUrduEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "2") {
                    inputList.forEach(element => {
                        MakeTextBoxUrduDisabled(element)
                        MakeTextBoxArabicEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "1") {
                    inputList.forEach(element => {
                        element.style.textAlign = "left"
                    });
                }

            })

            // Sorting According Orders
            function compareElements(a, b) {
                if (a.order < b.order) {
                    return -1;
                }
                if (a.order > b.order) {
                    return 1;
                }
                return 0;
            }

            // Sorting Rondom
            function shuffleElements(array) {
                var currentIndex = array.length,
                    temporaryValue, randomIndex;

                while (0 !== currentIndex) {

                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }

            // Adding Landing Zero
            function landingZero(str, max) {
                str = str.toString();
                return str.length < max ? landingZero("0" + str, max) : str;
            }

            // handle save form clicking
            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })

                var questionHTML = $("#questionTextInput input").val();
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var randomizeOptions = $("#assortmentRandomizeOptions").prop("checked")
                var allowAttachment = $("#assortmentAllowAttach").prop("checked")
                var allowPartialCredit = $("#assortmentAllowPartialCredit").prop("checked")
                var maximumMarks = $("#assortmentMaximumMarks").val();
                var maximumTime = $("#assortmentMaximumTime").val();

                var questionImages = {}
                $("#assortmentAttachFilesWithQuestion").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionImages[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                    }
                })


                var elements = []

                $("#Assortment table .element").each(function() {

                    let element = {}

                    element["image_name"] = $(this).find(".dz-success img").attr("alt")
                    element["image"] = assortmentAllImages[$(this).find(".dz-success img").attr("alt")]
                    element["text"] = $(this).find(".element-text").val()
                    element["order"] = landingZero($(this).find(".element-order").val(), 5)

                    elements.push(element)
                })


                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "rondomize_options": randomizeOptions,
                    "allow_attachment": allowAttachment,
                    "allow_partial_credit": allowPartialCredit,
                    "maximum_marks": maximumMarks,
                    "maximum_time": maximumTime,
                    "question_images": questionImages,
                    "elements": elements.sort(compareElements)
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);
            })

            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // randomize Options
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Randomize Options</span><span class="col-lg-4" id="assortmentRandomizeOptions">${$("#assortmentRandomizeOptions").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="assortmentAllowAttach">${$("#assortmentAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Partial Credit
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Partial Credit</span><span class="col-lg-4" id="assortmentAllowPartialCredit">${$("#assortmentAllowPartialCredit").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="assortmentMaximumMarks">${$("#assortmentMaximumMarks").val() != 0 ? $("#assortmentMaximumMarks").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="assortmentMaximumTime">${$("#assortmentMaximumTime").val() != 0 ? $("#assortmentMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)


                // Set Question Text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)
                    // ----------------------------------------------------------


                var elements = []

                // Set Elements
                $("#Assortment table .element").each(function() {

                    let element = {}

                    element["image_name"] = $(this).find(".dz-success img").attr("alt")
                    element["image"] = assortmentAllImages[$(this).find(".dz-success img").attr("alt")]
                    element["text"] = $(this).find(".element-text").val()
                    element["order"] = landingZero($(this).find(".element-order").val(), 5)

                    elements.push(element)
                })

                // set question Uploads
                var questionUploads = {}
                $("#assortmentAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                })
                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }




                var totalElements = "<div class='totalElements row'><div id='random' class='col-6'></div><div id='sorted' class='col-6'></div></div>"
                $(".preview_body").append(totalElements)

                sortedElements = elements.sort(compareElements)

                var kanbanFixed = new jKanban({
                    element: '#sorted',
                    gutter: '10px',
                    dragBoards: false,
                    dragItems: false,
                    boards: [{
                        'id': 'fixed',
                        'title': 'Sorted',
                        'class': 'success',
                    }]
                })

                for (var i = 0; i < sortedElements.length; i++) {
                    // Image & Text
                    if (sortedElements[i]["image"] != undefined && sortedElements[i]["text"] != "") {
                        let elementImg = "<div class='col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
                        let elementText = "<div class='col-8 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
                        kanbanFixed.addElement("fixed", { 'title': '<div class="row">' + elementImg + elementText + '</div>' })
                    } else if (sortedElements[i]["image"] != undefined) {
                        let elementImg = "<div class=' col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
                        kanbanFixed.addElement("fixed", { 'title': '<div class="row">' + elementImg + '</div>' })
                    } else if (sortedElements[i]["text"] != "") {
                        let elementText = "<div class='col-12 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
                        kanbanFixed.addElement("fixed", { 'title': '<div class="row">' + elementText + '</div>' })
                    }
                }

                randomizedElements = shuffleElements(elements)

                var kanbanDynamic = new jKanban({
                    element: '#random',
                    gutter: '10px',
                    dragBoards: false,
                    dragItems: true,
                    boards: [{
                        'id': 'dynamic',
                        'title': 'Unsorted',
                        'class': 'danger',
                    }]
                })

                for (var i = 0; i < randomizedElements.length; i++) {
                    // Image & Text
                    if (randomizedElements[i]["image"] != undefined && randomizedElements[i]["text"] != "") {
                        let elementImg = "<div class='col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
                        let elementText = "<div class='col-8 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
                        kanbanDynamic.addElement("dynamic", { 'title': '<div class="row">' + elementImg + elementText + '</div>' })
                    } else if (randomizedElements[i]["image"] != undefined) {
                        let elementImg = "<div class=' col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
                        kanbanDynamic.addElement("dynamic", { 'title': '<div class="row">' + elementImg + '</div>' })
                    } else if (randomizedElements[i]["text"] != "") {
                        let elementText = "<div class='col-12 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
                        kanbanDynamic.addElement("dynamic", { 'title': '<div class="row">' + elementText + '</div>' })
                    }
                }


            })

        }
        // begin:: check if the question is Assortment

        // begin:: check if the question is Drag & Drop
        else if ($(this).val() == 5) {

            var dragDropAllImages = {}
                // config Question Types Fade in & out
            $("#DragDrop").fadeIn()

            // Set select2
            $('#dragDropDisplayType').select2();

            // add new choice
            $('#DragDrop').find("button[data-repeater-create]").on("click", function() {

                // create new node
                let newPair =
                    '<tr data-repeater-item="" class="pair">\
        <td class="multi-choice-td">\
        <div class="dropzone dropzone-default kt_dropzone_1 DDQuestionAttachments">\
        <div class="dropzone-msg dz-message needsclick">\
        <h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3>\
        </div>\
        </div>\
        </td>\
        <td class="multi-choice-td">\
        <input type="text" class="form-control question-text" placeholder="Enter Question Text" style="min-width:200px">\
        </td>\
        <td class="multi-choice-td">\
        <div class="dropzone dropzone-default kt_dropzone_1 DDAnswerAttachments">\
        <div class="dropzone-msg dz-message needsclick">\
        <h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3>\
        </div>\
        </div>\
        </td>\
        <td class="multi-choice-td">\
        <input type="text" class="form-control answer-text" placeholder="Enter Answer Text"  style="min-width:200px">\
        </td>\
        <td class="multi-choice-td  text-center">\
        <a href="javascript:;" data-repeater-delete="" class="btn font-weight-bold btn-danger btn-icon">\
        <i class="la la-remove"></i>\
        </a>\
        </td>\
        </tr>'

                $('#DragDrop table').append(newPair)


                // activate Dropzone Question
                $("#DragDrop table .DDQuestionAttachments").last().dropzone({
                    url: window.location.href,
                    acceptedFiles: "image/*",
                    addRemoveLinks: true,
                    maxFiles: 1,

                    // create base64 image link
                    init: function() {
                        this.on("addedfile", function(file) {
                            var reader = new FileReader();
                            reader.onload = function(event) {
                                var base64String = event.target.result;
                                var fileName = file.name
                                dragDropAllImages[fileName] = base64String
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                });

                // activate Dropzone Answer
                $("#DragDrop table .DDAnswerAttachments").last().dropzone({
                    url: window.location.href,
                    acceptedFiles: "image/*",
                    addRemoveLinks: true,
                    maxFiles: 1,

                    // create base64 image link
                    init: function() {
                        this.on("addedfile", function(file) {
                            var reader = new FileReader();
                            reader.onload = function(event) {
                                var base64String = event.target.result;
                                var fileName = file.name
                                dragDropAllImages[fileName] = base64String
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                });

                // add action to delete button
                $("#DragDrop table a[data-repeater-delete]").last().on("click", function() {
                    let check = confirm("Are you sure you want to delete this element?")
                    if (check) {
                        $(this).parents("tr").remove()
                    }
                })

                // add id to input file 
                $("input.question-text").last().attr("id", "input" + inputNumber)
                let thisInput;
                thisInput = document.getElementById("input" + inputNumber)
                inputList.push(thisInput)
                inputNumber += 1;

                $("input.answer-text").last().attr("id", "input" + inputNumber)
                thisInput = document.getElementById("input" + inputNumber)
                inputList.push(thisInput)
                inputNumber += 1;

                if ($("#StudentSection").val() === "0") {
                    inputList.forEach(element => {
                        MakeTextBoxArabicDisabled(element)
                        MakeTextBoxUrduEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "2") {
                    inputList.forEach(element => {
                        MakeTextBoxUrduDisabled(element)
                        MakeTextBoxArabicEnabled(element)
                        element.style.textAlign = "right"
                        element.style.direction = "rtl"
                    });
                } else if ($("#StudentSection").val() === "1") {
                    inputList.forEach(element => {
                        element.style.textAlign = "left"
                    });
                }

            })


            // handle save form clicking
            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })

                var questionHTML = $("#questionTextInput input").val();
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var randomizeOptions = $("#dragDropRandomizeOptions").prop("checked")
                var allowAttachment = $("#dragDropAllowAttach").prop("checked")
                var allowPartialCredit = $("#dragDropAllowPartialCredit").prop("checked")
                var displayType = $("#dragDropDisplayType").val();
                var maximumMarks = $("#dragDropMaximumMarks").val();
                var maximumTime = $("#dragDropMaximumTime").val();

                var questionImages = {}
                $("#dragDropAttachFilesWithQuestion").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionImages[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                    }
                })

                var pairs = []

                $("#DragDrop table .pair").each(function() {

                    let pair = {}

                    pair["question_image_name"] = $(this).find(".DDQuestionAttachments .dz-success img").attr("alt")
                    pair["question_image"] = dragDropAllImages[$(this).find(".DDQuestionAttachments .dz-success img").attr("alt")]
                    pair["question_text"] = $(this).find(".question-text").val()
                    pair["answer_image_name"] = $(this).find(".DDAnswerAttachments .dz-success img").attr("alt")
                    pair["answer_image"] = dragDropAllImages[$(this).find(".DDAnswerAttachments .dz-success img").attr("alt")]
                    pair["answer_text"] = $(this).find(".answer-text").val()

                    pairs.push(pair)
                })


                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "rondomize_options": randomizeOptions,
                    "allow_attachment": allowAttachment,
                    "allow_partial_credit": allowPartialCredit,
                    "maximum_marks": maximumMarks,
                    "maximum_time": maximumTime,
                    "display_type": displayType,
                    "question_images": questionImages,
                    "pairs": pairs
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);
            })

            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // randomize Options
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Randomize Options</span><span class="col-lg-4" id="dragDropRandomizeOptions">${$("#dragDropRandomizeOptions").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="dragDropAllowAttach">${$("#dragDropAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Partial Credit
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Partial Credit</span><span class="col-lg-4" id="dragDropAllowPartialCredit">${$("#dragDropAllowPartialCredit").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Display Type
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">display Type</span><span class="col-lg-4" id="dragDropDisplayType">${$("#dragDropDisplayType").val() == "image" ? "Image Matching" : "Line Matching"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="dragDropMaximumMarks">${$("#dragDropMaximumMarks").val() != 0 ? $("#dragDropMaximumMarks").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="dragDropMaximumTime">${$("#dragDropMaximumTime").val() != 0 ? $("#dragDropMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)


                var pairs = []

                var displayType = $("#dragDropDisplayType").val();

                // Set Question Text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)
                    // ----------------------------------------------------------

                // set question Uploads
                var questionUploads = {}
                $("#dragDropAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                })
                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }

                // Set Choices
                $("#DragDrop table .pair").each(function() {

                    let pair = {}

                    pair["question_image_name"] = $(this).find(".DDQuestionAttachments .dz-success img").attr("alt")
                    pair["question_image"] = dragDropAllImages[$(this).find(".DDQuestionAttachments .dz-success img").attr("alt")]
                    pair["question_text"] = $(this).find(".question-text").val()
                    pair["answer_image_name"] = $(this).find(".DDAnswerAttachments .dz-success img").attr("alt")
                    pair["answer_image"] = dragDropAllImages[$(this).find(".DDAnswerAttachments .dz-success img").attr("alt")]
                    pair["answer_text"] = $(this).find(".answer-text").val()

                    pairs.push(pair)
                })


                var totalPairs = "<div class='totalPairs'></div>"
                $(".preview_body").append(totalPairs)

                if (displayType == "image") {
                    let allQuestions = '<div class="all_questions row"></div>'
                    let allAnswers = '<div class="all_answers row"></div>'
                    $(".preview_body .totalPairs").append(allQuestions).append(allAnswers)

                    for (var i = 0; i < pairs.length; i++) {
                        if (pairs[i]["question_image"] != undefined && pairs[i]["question_text"] != "") {
                            $(".preview_body .totalPairs .all_questions").prepend('<div class="col-4"><div class="question"><img src="' + pairs[i]["question_image"] + '" class="question_img" alt="' + pairs[i]["question_image_name"] + '"><span class="question_text">' + pairs[i]["question_text"] + '</span><div class="question_answer empty"></div></div>')
                        } else if (pairs[i]["question_image"] != undefined) {
                            $(".preview_body .totalPairs .all_questions").prepend('<div class="col-4"><div class="question"><img src="' + pairs[i]["question_image"] + '" class="question_img" alt="' + pairs[i]["question_image_name"] + '"><div class="question_answer empty"></div></div>')
                        } else if (pairs[i]["question_text"] != "") {
                            $(".preview_body .totalPairs .all_questions").prepend('<div class="col-4"><div class="question"><span class="question_text">' + pairs[i]["question_text"] + '</span><div class="question_answer empty"></div></div>')
                        }
                        if (pairs[i]["answer_image"] != undefined && pairs[i]["answer_text"] != "") {
                            $(".preview_body .totalPairs .all_answers").prepend('<div class="col-4 answer_block not_empty"><div class="answer"><img src="' + pairs[i]["answer_image"] + '" class="answer_img" alt="' + pairs[i]["answer_image_name"] + '"><span class="answer_text">' + pairs[i]["answer_text"] + '</div>')
                        } else if (pairs[i]["answer_image"] != undefined) {
                            $(".preview_body .totalPairs .all_answers").prepend('<div class="col-4 answer_block not_empty"><div class="answer"><img src="' + pairs[i]["answer_image"] + '" class="answer_img" alt="' + pairs[i]["answer_image_name"] + '"></div>')
                        } else if (pairs[i]["answer_text"] != "") {
                            $(".preview_body .totalPairs .all_answers").prepend('<div class="col-4 answer_block not_empty"><div class="answer"><span class="answer_text">' + pairs[i]["answer_text"] + '</div>')
                        }
                    }
                } else if (displayType == "line") {
                    let allRows = '<div class="row lineMatchingDiv"><div class="col-4"><ul class="questions list-unstyled text-center"></ul></div><div class="offset-4 col-4"><ul class="answers list-unstyled text-center"></ul></div></div>'
                    $(".preview_body").append(allRows)
                    for (var i = 0; i < pairs.length; i++) {
                        if (pairs[i]["question_image"] != undefined && pairs[i]["question_text"] != "") {
                            $(".preview_body .questions").append('<li class="question row"><img class="col-4 question_img" src="' + pairs[i]["question_image"] + '" alt="' + pairs[i]["question_image_name"] + '"><span class="col-8 question_text">' + pairs[i]["question_text"] + '</span></li>')
                        } else if (pairs[i]["question_image"] != undefined) {
                            $(".preview_body .questions").append('<li class="question row"><img class="col-12 question_img" src="' + pairs[i]["question_image"] + '" alt="' + pairs[i]["question_image_name"] + '"></li>')
                        } else if (pairs[i]["question_text"] != "") {
                            $(".preview_body .questions").append('<li class="question row"><span class="col-12 question_text">' + pairs[i]["question_text"] + '</span></li>')
                        }
                        if (pairs[i]["answer_image"] != undefined && pairs[i]["answer_text"] != "") {
                            $(".preview_body .answers").append('<li class="answer row"><span class="col-8 answer_text">' + pairs[i]["answer_text"] + '</span><img class="col-4 answer_img" src="' + pairs[i]["answer_image"] + '" alt="' + pairs[i]["answer_image_name"] + '"></li>')
                        } else if (pairs[i]["answer_image"] != undefined) {
                            $(".preview_body .answers").append('<li class="answer row"><img class="col-12 answer_img" src="' + pairs[i]["answer_image"] + '" alt="' + pairs[i]["answer_image_name"] + '"></li>')
                        } else if (pairs[i]["answer_text"] != "") {
                            $(".preview_body .answers").append('<li class="answer row"><span class="col-12 answer_text">' + pairs[i]["answer_text"] + '</span></li>')
                        }
                    }
                }



                $(".preview_body .totalChoices .choiceBox").on("click", function() {
                    $(this).addClass("selected").siblings().removeClass("selected")
                })

                // ----------------------------------------------------------

            })
        }
        // end:: check if the question is Drag & Drop

        // begin:: check if the question is Image Labeling
        else if ($(this).val() == 6) {

            // config Question Types Fade in & out
            $("#ImageLabeling").fadeIn()

            // Set select2
            $('#imageLabelingDisplayType').select2();

            $("#ImageLabeling .clearMark").on("click", function() {
                if (confirm("Are you sure, you want to clear all tags ??")) {
                    $("#ImageLabeling .mark, #ImageLabeling .input_div").remove()
                    answer_no = 0
                }
            })

            $("#ImageLabeling .deleteImg").on("click", function() {
                if (confirm("Are you sure, you want to remove the image ??")) {
                    $(".clearMark").fadeOut()
                    $(".deleteImg").fadeOut()
                    $("#imageLabelingQuestionUpload").parent().fadeIn()
                    $("#imageLabelingQuestionUpload").find("a[data-dz-remove]")[0].click()
                    $("#ImageLabeling .mark, #ImageLabeling .input_div").remove()
                    $(".question_img_div img").attr("src", "").attr("alt", "")
                    answer_no = 0
                }
            })

            var curMousePos = { x: 0, y: 0 }
            var colors_left = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]
            var colors_right = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]
            var answer_no = 0


            // Add Click Event
            $("#ImageLabeling .question_img_div").on("click", function(e) {

                // Set Answer ID
                answer_no += 1

                // Set Mouse Position
                curMousePos.x = e.pageX
                curMousePos.y = e.pageY

                // Add Items In Left Side
                if (e.pageX < $(".question_img_div img").offset().left + ($(".question_img_div img").css("width").replace("px", "")) / 2) {

                    //Choose Color
                    let randomNumber = Math.floor(Math.random() * colors_left.length)
                    let randomColor = colors_left[randomNumber]
                    colors_left.splice(randomNumber, 1)
                    if (colors_left.length == 0) {
                        colors_left = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
                    }
                    // Add Text Box
                    newElement = `<div style="position:relative" data-id = "${answer_no}" class="input_div"><span class="image_tag" style="background-color:${randomColor}">${answer_no}</span><input type="text" class="answer" id="${answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span></div>`
                    $(".left_group").append(newElement)

                    $("#ImageLabeling .question_img_div").append(`<span class = 'btn mark' id='${answer_no}' data-positionx='${(e.pageX - $('#ImageLabeling .question_img_div img').offset().left) / $('#ImageLabeling .question_img_div img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('#ImageLabeling .question_img_div img').offset().top) / $('#ImageLabeling .question_img_div img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('#ImageLabeling .question_img_div img').first().offset().top - 9}px; left: ${e.pageX - $('#ImageLabeling .question_img_div img').first().offset().left - 8}px;'>${answer_no}</span>`)

                    $(`.answer[id=${answer_no}]`).focus()

                    $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                        if (confirm("Are you sure, you want to remove this tag ?")) {
                            $("#ImageLabeling .mark[id='" + $(this).parent().data("id") + "']").remove()
                            $(this).parent().remove();
                        }
                    })

                    // add id to input file 
                    $(".left_group input.answer").last().attr("id", "input" + inputNumber)
                    let thisInput = document.getElementById("input" + inputNumber)
                    inputList.push(thisInput)
                    inputNumber += 1;
                    if ($("#StudentSection").val() === "0") {
                        inputList.forEach(element => {
                            MakeTextBoxArabicDisabled(element)
                            MakeTextBoxUrduEnabled(element)
                            element.style.textAlign = "right"
                            element.style.direction = "rtl"
                        });
                    } else if ($("#StudentSection").val() === "2") {
                        inputList.forEach(element => {
                            MakeTextBoxUrduDisabled(element)
                            MakeTextBoxArabicEnabled(element)
                            element.style.textAlign = "right"
                            element.style.direction = "rtl"
                        });
                    } else if ($("#StudentSection").val() === "1") {
                        inputList.forEach(element => {
                            element.style.textAlign = "left"
                        });
                    }

                }

                // Add Items In Right Side
                else if (e.pageX > $(".question_img_div img").offset().left + ($(".question_img_div img").css("width").replace("px", "")) / 2) {
                    //Choose Color
                    let randomNumber = Math.floor(Math.random() * colors_right.length)
                    let randomColor = colors_right[randomNumber]
                    colors_right.splice(randomNumber, 1)
                    if (colors_right.length == 0) {
                        colors_right = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
                    }
                    // Add Text Box
                    newElement = `<div style="position:relative" data-id = "${answer_no}" class="input_div"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span><input type="text" class="answer" id="${answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="image_tag" style="background-color:${randomColor}" >${answer_no}</span></div>`
                    $(".right_group").append(newElement)

                    $("#ImageLabeling .question_img_div").append(`<span class = 'btn mark' id='${answer_no}' data-positionx='${(e.pageX - $('#ImageLabeling .question_img_div img').offset().left) / $('#ImageLabeling .question_img_div img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('#ImageLabeling .question_img_div img').offset().top) / $('#ImageLabeling .question_img_div img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('#ImageLabeling .question_img_div img').first().offset().top - 9}px; left: ${e.pageX - $('#ImageLabeling .question_img_div img').first().offset().left - 8}px;'>${answer_no}</span>`)

                    $(".answer[id=" + answer_no + "]").focus()

                    $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                        if (confirm("Are you sure, you want to remove this tag ?")) {
                            $("#ImageLabeling .mark[id='" + $(this).parent().data("id") + "']").remove()
                            $(this).parent().remove();
                        }
                    })

                    // add id to input file 
                    $(".right_group input.answer").last().attr("id", "input" + inputNumber)
                    let thisInput = document.getElementById("input" + inputNumber)
                    inputList.push(thisInput)
                    inputNumber += 1;
                    if ($("#StudentSection").val() === "0") {
                        inputList.forEach(element => {
                            MakeTextBoxArabicDisabled(element)
                            MakeTextBoxUrduEnabled(element)
                            element.style.textAlign = "right"
                            element.style.direction = "rtl"
                        });
                    } else if ($("#StudentSection").val() === "2") {
                        inputList.forEach(element => {
                            MakeTextBoxUrduDisabled(element)
                            MakeTextBoxArabicEnabled(element)
                            element.style.textAlign = "right"
                            element.style.direction = "rtl"
                        });
                    } else if ($("#StudentSection").val() === "1") {
                        inputList.forEach(element => {
                            element.style.textAlign = "left"
                        });
                    }

                }

                $("#ImageLabeling .mark").click(function(e) {
                    e.stopPropagation()
                    $(`#ImageLabeling .input_div[data-id='${$(this).attr("id")}'] .answer`).focus()
                })

            })

            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })

                var questionHTML = $("#questionTextInput input").val();
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var randomizeOptions = $("#imageLabelingRandomizeOptions").prop("checked")
                var allowAttachment = $("#imageLabelingAllowAttach").prop("checked")
                var allowPartialCredit = $("#imageLabelingAllowPartialCredit").prop("checked")
                var maximumMarks = $("#imageLabelingMaximumMarks").val();
                var maximumTime = $("#imageLabelingMaximumTime").val();
                var imageLabelingDisplayType = $("#imageLabelingDisplayType").val()

                var questionImages = {}
                $("#imageLabelingAttachFilesWithQuestion").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionImages[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                    }
                })

                var spaces = []

                $("#ImageLabeling .left_group .input_div, #ImageLabeling .right_group .input_div").each(function() {
                    let space = {}

                    space["answer_number"] = $(this).data("id")
                    space["answer_text"] = $(this).find(".answer").val()
                    space["position_x"] = $("#ImageLabeling .mark[id='" + $(this).data("id") + "']").data("positionx")
                    space["position_y"] = $("#ImageLabeling .mark[id='" + $(this).data("id") + "']").data("positiony")
                    space["answer_color"] = $("#ImageLabeling .mark[id='" + $(this).data("id") + "']").css("background-color")

                    spaces.push(space)
                })

                var questionImageBase64 = $("#ImageLabeling .question_img_div img").attr('src')
                var questionImageName = $("#ImageLabeling .question_img_div img").attr('alt')

                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "rondomize_options": randomizeOptions,
                    "allow_attachment": allowAttachment,
                    "allow_partial_credit": allowPartialCredit,
                    "maximum_marks": maximumMarks,
                    "maximum_time": maximumTime,
                    "question_images": questionImages,
                    "spaces": spaces,
                    "display_type": imageLabelingDisplayType,
                    "question_image_base64": questionImageBase64,
                    "question_image_name": questionImageName
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);

            })

            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // randomize Options
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Randomize Options</span><span class="col-lg-4" id="imageLabelingRandomizeOptions">${$("#imageLabelingRandomizeOptions").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="imageLabelingAllowAttach">${$("#imageLabelingAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Partial Credit
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Partial Credit</span><span class="col-lg-4" id="imageLabelingAllowPartialCredit">${$("#imageLabelingAllowPartialCredit").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Display Type
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">display Type</span><span class="col-lg-4" id="imageLabelingDisplayType">${$("#imageLabelingDisplayType").val() == "dragging" ? "Display answer to students" : $("#imageLabelingDisplayType").val() == "fill" ? "Don't display answer to students" : $("#imageLabelingDisplayType").val() == "enumerate" ? "Student can answer of their choice" : "None"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="imageLabelingMaximumMarks">${$("#imageLabelingMaximumMarks").val() != 0 ? $("#imageLabelingMaximumMarks").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="imageLabelingMaximumTime">${$("#imageLabelingMaximumTime").val() != 0 ? $("#imageLabelingMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)

                var questionImageBase64 = $("#ImageLabeling .question_img_div img").attr('src')
                var questionImageName = $("#ImageLabeling .question_img_div img").attr('alt')


                // Set Question Text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)
                    // ----------------------------------------------------------

                // set question Uploads
                var questionUploads = {}
                $("#imageLabelingAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                })
                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName, fileBase64) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }
                // ----------------------------------------------------------

                var spaces = []

                $("#ImageLabeling .left_group .input_div, #ImageLabeling .right_group .input_div").each(function() {
                    let space = {}

                    space["answer_number"] = $(this).data("id")
                    space["answer_text"] = $(this).find(".answer").val()
                    space["position_x"] = $("#ImageLabeling .mark[id='" + $(this).data("id") + "']").data("positionx")
                    space["position_y"] = $("#ImageLabeling .mark[id='" + $(this).data("id") + "']").data("positiony")
                    space["answer_color"] = $("#ImageLabeling .mark[id='" + $(this).data("id") + "']").css("background-color")

                    spaces.push(space)
                })

                if ($("#imageLabelingDisplayType").val() == "dragging") {
                    $(".preview_body").append(`<div class="choices_div"></div>\
          <div class="row">\
              <div class="col-4 left_group">\
              </div>\
              <div class="col-4 preview_question_img_div" style="position:relative">\
              </div>\
              <div class="col-4 right_group">\
              </div>\
            </div>`)
                } else {
                    $(".preview_body").append(`<div class="row">\
              <div class="col-4 left_group">\
              </div>\
              <div class="col-4 preview_question_img_div" style="position:relative">\
              </div>\
              <div class="col-4 right_group">\
              </div>\
            </div>`)
                }

                if (questionImageBase64) {
                    let quesImage = `<img id="preview_img" src="${questionImageBase64}" alt="${questionImageName}">`
                    $('.preview_body .preview_question_img_div').append(quesImage)
                }

                if ($("#imageLabelingDisplayType").val() == "fill") {

                    setTimeout(function() {

                        for (i = 0; i < spaces.length; i++) {
                            let marker = `<span class = 'btn mark' id='${spaces[i]["answer_number"]}' style=' position:absolute; background-color: ${spaces[i]["answer_color"]} ; top: ${spaces[i]["position_y"] * $("#preview_img").css('height').replace("px", "") - 10}px; left: ${spaces[i]["position_x"] * $("#preview_img").css('width').replace("px", "")}px'>${spaces[i]["answer_number"]}</span>`
                            $('.preview_body .preview_question_img_div').append(marker)

                            if (spaces[i]["position_x"] < 0.5) {
                                newElement = `<div style="position:relative" data-id = "${spaces[i]["answer_number"]}" class="student_input_div"><span class="image_tag" style="background-color:${spaces[i]["answer_color"]}">${spaces[i]["answer_number"]}</span><input type="text" class="student_answer" id="${spaces[i]["answer_number"]}" style="border:2px solid ${spaces[i]["answer_color"]}; color:${spaces[i]["answer_color"]}; font-weight: bold"></div>`
                                $(".preview_body .left_group").append(newElement)

                            } else {
                                newElement = `<div style="position:relative" data-id = "${spaces[i]["answer_number"]}" class="student_input_div"><input type="text" class="student_answer" id="${spaces[i]["answer_number"]}" style="border:2px solid ${spaces[i]["answer_color"]}; color:${spaces[i]["answer_color"]}; font-weight: bold"><span class="image_tag" style="background-color:${spaces[i]["answer_color"]}" >${spaces[i]["answer_number"]}</span></div>`
                                $(".preview_body .right_group").append(newElement)
                            }

                            $(".preview_body .mark").click(function(e) {
                                e.stopPropagation()
                                $(`.preview_body .student_input_div[data-id='${$(this).attr("id")}'] .student_answer`).focus()
                            })
                        }
                    }, 1000)

                } else if ($("#imageLabelingDisplayType").val() == "dragging") {

                    setTimeout(function() {

                        for (i = 0; i < spaces.length; i++) {
                            if (spaces[i]["answer_text"] != "") {
                                let choice = `<span class="student_choice bg-primary" draggable="true">${spaces[i]["answer_text"]}</span>`
                                $('.preview_body .choices_div').append(choice)

                                let marker = `<span class = 'btn mark' id='${spaces[i]["answer_number"]}' style=' position:absolute; background-color: ${spaces[i]["answer_color"]} ; top: ${spaces[i]["position_y"] * $("#preview_img").css('height').replace("px", "") - 10}px; left: ${spaces[i]["position_x"] * $("#preview_img").css('width').replace("px", "")}px'>${spaces[i]["answer_number"]}</span>`
                                $('.preview_body .preview_question_img_div').append(marker)

                                if (spaces[i]["position_x"] < 0.5) {
                                    newElement = `<div style="position:relative" data-id = "${spaces[i]["answer_number"]}" class="student_input_div"><span class="image_tag" style="background-color:${spaces[i]["answer_color"]}">${spaces[i]["answer_number"]}</span><div class="student_answer" id="${spaces[i]["answer_number"]}" style="border:2px solid ${spaces[i]["answer_color"]}; color:${spaces[i]["answer_color"]}; font-weight: bold"></div></div>`
                                    $(".preview_body .left_group").append(newElement)

                                } else {
                                    newElement = `<div style="position:relative" data-id = "${spaces[i]["answer_number"]}" class="student_input_div"><div class="student_answer" id="${spaces[i]["answer_number"]}" style="border:2px solid ${spaces[i]["answer_color"]}; color:${spaces[i]["answer_color"]}; font-weight: bold"></div><span class="image_tag" style="background-color:${spaces[i]["answer_color"]}" >${spaces[i]["answer_number"]}</span></div>`
                                    $(".preview_body .right_group").append(newElement)
                                }

                                $(".preview_body .mark").click(function(e) {
                                    e.stopPropagation()
                                    $(`.preview_body .student_input_div[data-id='${$(this).attr("id")}'] .student_answer`).focus()
                                })
                            }
                        }
                    }, 1000)


                } else if ($("#imageLabelingDisplayType").val() == "enumerate") {

                    var curMousePos = { x: 0, y: 0 }
                    var colors_left = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]
                    var colors_right = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]
                    var answer_no = 0


                    // Add Click Event
                    setTimeout(function() {


                        $(".preview_question_img_div #preview_img").on("click", function(e) {

                            // Set Answer ID
                            answer_no += 1

                            // Set Mouse Position
                            curMousePos.x = e.pageX
                            curMousePos.y = e.pageY

                            // Add Items In Left Side
                            if (e.pageX <= $("#preview_img").offset().left + ($("#preview_img").css("width").replace("px", "")) / 2) {

                                //Choose Color
                                let randomNumber = Math.floor(Math.random() * colors_left.length)
                                let randomColor = colors_left[randomNumber]
                                colors_left.splice(randomNumber, 1)
                                if (colors_left.length == 0) {
                                    colors_left = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
                                }
                                // Add Text Box
                                newElement = `<div style="position:relative" data-id = "${answer_no}" class="student_input_div"><span class="student_image_tag" style="background-color:${randomColor}">${answer_no}</span><input type="text" class="student_answer" id="${answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span></div>`
                                $(".preview_body .left_group").append(newElement)

                                $(".preview_body .preview_question_img_div").append(`<span class = 'btn student_mark' id='${answer_no}' data-positionx='${(e.pageX - $('.preview_question_img_div #preview_img').offset().left) / $('.preview_question_img_div #preview_img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('.preview_question_img_div #preview_img').offset().top) / $('.preview_question_img_div #preview_img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('.preview_question_img_div #preview_img').first().offset().top - 9}px; left: ${e.pageX - $('.preview_question_img_div #preview_img').first().offset().left - 8}px;'>${answer_no}</span>`)

                                $(`.student_answer[id=${answer_no}]`).focus()

                                $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                                    if (confirm("Are you sure, you want to remove this tag ?")) {
                                        $(".preview_body .student_mark[id='" + $(this).parent().data("id") + "']").remove()
                                        $(this).parent().remove();
                                    }
                                })

                            }

                            // Add Items In Right Side
                            else if (e.pageX > $("#preview_img").offset().left + ($("#preview_img").css("width").replace("px", "")) / 2) {
                                //Choose Color
                                let randomNumber = Math.floor(Math.random() * colors_right.length)
                                let randomColor = colors_right[randomNumber]
                                colors_right.splice(randomNumber, 1)
                                if (colors_right.length == 0) {
                                    colors_right = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
                                }
                                // Add Text Box
                                newElement = `<div style="position:relative" data-id = "${answer_no}" class="student_input_div"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span><input type="text" class="student_answer" id="${answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="student_image_tag" style="background-color:${randomColor}" >${answer_no}</span></div>`
                                $(".preview_body .right_group").append(newElement)

                                $(".preview_body .preview_question_img_div").append(`<span class = 'btn student_mark' id='${answer_no}' data-positionx='${(e.pageX - $('.preview_question_img_div #preview_img').offset().left) / $('.preview_question_img_div #preview_img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('.preview_question_img_div #preview_img').offset().top) / $('.preview_question_img_div #preview_img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('.preview_question_img_div #preview_img').first().offset().top - 9}px; left: ${e.pageX - $('.preview_question_img_div #preview_img').first().offset().left - 8}px;'>${answer_no}</span>`)

                                $(".preview_body .student_answer[id=" + answer_no + "]").focus()

                                $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                                    if (confirm("Are you sure, you want to remove this tag ?")) {
                                        $(".preview_body .student_mark[id='" + $(this).parent().data("id") + "']").remove()
                                        $(this).parent().remove();
                                    }
                                })
                            }

                            $(".preview_body .student_mark").click(function(e) {
                                e.stopPropagation()
                                $(`.preview_body .student_input_div[data-id='${$(this).attr("id")}'] .student_answer`).focus()
                            })
                        })
                    }, 1000)
                }
            })
        }

        // end:: check if the question is Image Labeling

        // begin:: check if the question is fillSpaces
        else if ($(this).val() == 7) {

            // config Question Types Fade in & out
            $("#FillSpace").fadeIn()

            var num = 1

            $('.note-editing-area').on("keyup , change", function() {
                if ($(this).html().includes("___")) {
                    $(".fillSpaceInputs").append("<div class='input-group'><input type='text' class='form-control placeholder' id='placeholder" + num + "' data-num='" + num + "'><div class='input-group-append'><span class='input-group-text' style='min-width:50px; display:block; margin: auto'>" + num + "</span></div><div class='input-group-append'><span class='input-group-text btn btn-danger removeAnswer'>X</span></div></div>")
                    $(this).html($(this).html().replace("___", "<span data-num = '" + num + "' class='btn btn-primary removeSpan'> ((" + num + ")) </span>" + "&nbsp;"))
                    $("#placeholder" + num + "").focus()
                    $(".removeAnswer").on("click", function() {
                        $(this).parents(".input-group").remove()
                        $(".note-editing-area span[data-num='" + $(this).parents(".input-group").find("input").data("num") + "']").remove()
                    })
                    $(".removeSpan").on("click", function() {
                        $(".fillSpaceInputs .input-group #placeholder" + $(this).data("num")).parents(".input-group").remove()
                        $(this).remove()
                    })

                    // add id to input file 
                    let thisInput = document.getElementById("placeholder" + num)
                    inputList.push(thisInput)
                    if ($("#StudentSection").val() === "0") {
                        inputList.forEach(element => {
                            MakeTextBoxArabicDisabled(element)
                            MakeTextBoxUrduEnabled(element)
                            element.style.textAlign = "right"
                            element.style.direction = "rtl"
                        });
                    } else if ($("#StudentSection").val() === "2") {
                        inputList.forEach(element => {
                            MakeTextBoxUrduDisabled(element)
                            MakeTextBoxArabicEnabled(element)
                            element.style.textAlign = "right"
                            element.style.direction = "rtl"
                        });
                    } else if ($("#StudentSection").val() === "1") {
                        inputList.forEach(element => {
                            element.style.textAlign = "left"
                        });
                    }
                    num += 1
                }
            })

            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })

                var questionHTML = $("#questionTextInput input").val();
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var randomizeOptions = $("#fillSpaceRandomizeOptions").prop("checked")
                var allowAttachment = $("#fillSpaceAllowAttach").prop("checked")
                var allowPartialCredit = $("#fillSpaceAllowPartialCredit").prop("checked")
                var maximumMarks = $("#fillSpaceMaximumMarks").val();
                var maximumTime = $("#fillSpaceMaximumTime").val();

                var questionImages = {}
                $("#fillSpaceAttachFilesWithQuestion").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionImages[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                    }
                })

                var answers = []

                $("#FillSpace .fillSpaceInputs .input-group .placeholder").each(function() {
                    var answer = {}
                    answer["answer_text"] = $(this).val()
                    answer["answer_number"] = $(this).data("num")
                    answers.push(answer)
                })

                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "rondomize_options": randomizeOptions,
                    "allow_attachment": allowAttachment,
                    "allow_partial_credit": allowPartialCredit,
                    "maximum_marks": maximumMarks,
                    "maximum_time": maximumTime,
                    "question_images": questionImages,
                    "answers": answers
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);
            })

            // Set Preview Box
            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // randomize Options
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Randomize Options</span><span class="col-lg-4" id="fillSpaceRandomizeOptions">${$("#fillSpaceRandomizeOptions").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="fillSpaceAllowAttach">${$("#fillSpaceAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Allow Partial Credit
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Partial Credit</span><span class="col-lg-4" id="fillSpaceAllowPartialCredit">${$("#fillSpaceAllowPartialCredit").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="fillSpaceMaximumMarks">${$("#fillSpaceMaximumMarks").val() != 0 ? $("#fillSpaceMaximumMarks").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="fillSpaceMaximumTime">${$("#fillSpaceMaximumTime").val() != 0 ? $("#fillSpaceMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)

                // set question Uploads
                var questionUploads = {}
                $("#fillSpaceAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = allImages[$(this).find("span[data-dz-name]").text()]
                })
                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName, fileBase64) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }
                // ----------------------------------------------------------

                // Set Question Text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)
                    // ----------------------------------------------------------

                // Set Elements             
                $(".preview_body .question_text span").each(function(i) {
                    $(this).replaceWith(`<input type='text' class='form-control placeholder' id='placeholder${i + 1}' data-num='${i + 1}' style="display:inline-block; width:auto; margin: 1px auto; height: 35px;">`)
                })

            })

        }
        // end:: check if the question is fillSpaces

        // begin:: check if the question is AudioVideo
        else if ($(this).val() == 8) {

            $("#AudioVideo").fadeIn()

            $("#saveForm").on("click", function() {
                var academicYearID = $("#AcademicYear").val();
                var academicYear = $("#AcademicYear").find("option:selected").text();
                var gradeID = $("#StudentClass").val();
                var gradeName = $("#StudentClass").find("option:selected").text();
                var subjectID = $("#StudentSection").val();
                var subjectName = $("#StudentSection").find("option:selected").text();
                var topicName = $("#topicName").val();
                var filterTags = [];
                $("#FilterTags option").each(function() {
                    filterTags.push($(this).val())
                })

                var questionHTML = $("#questionTextInput input").val();
                var questionDetails = $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();

                var allowAttachment = $("#audioVideoAllowAttach").prop("checked")
                var maximumMarks = $("#audioVideoMaximumMarks").val();
                var maximumTime = $("#audioVideoMaximumTime").val();

                var questionUploads = {}
                $("#audioVideoQuestionUpload").find(".dz-preview").each(function() {
                    if ($(this).find(".dz-error-message").text() == "") {
                        questionUploads[$(this).find("span[data-dz-name]").text()] = audioVideoAllUploads[$(this).find("span[data-dz-name]").text()]
                    }
                })

                var data = {
                    "academic_id": academicYearID,
                    "academic_year": academicYear,
                    "grade_id": gradeID,
                    "grade_name": gradeName,
                    "subject_id": subjectID,
                    "subject_name": subjectName,
                    "topic_name": topicName,
                    "filter_tags": filterTags,
                    "question_html": questionHTML,
                    "question_details": questionDetails,
                    "allow_attachment": allowAttachment,
                    "maximum_marks": maximumMarks,
                    "maximum_time": maximumTime,
                    "question_uploads": questionUploads,
                }
                var dataJSON = JSON.stringify(data)
                console.log(dataJSON);
            })

            // Set Preview Box
            $("#previewButton").on("click", function() {

                $(".preview_body").children().remove()
                $(".preview_options").children().remove()

                // Set Options
                // Allow Attachments
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Allow Attachments</span><span class="col-lg-4" id="audioVideoAllowAttach">${$("#audioVideoAllowAttach").prop("checked") ? "Yes" : "No"}</span></div>`)

                // Maximum Marks
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Marks</span><span class="col-lg-4" id="audioVideoMaximumMarks">${$("#audioVideoMaximumMarks").val() != 0 ? $("#audioVideoMaximumMarks").val() : "N/A"}</span></div>`)

                // Maximum Time
                $(".preview_options").append(`<div class="row"><span class="col-lg-8">Maximum Time</span><span class="col-lg-4" id="audioVideoMaximumTime">${$("#audioVideoMaximumTime").val() != 0 ? $("#audioVideoMaximumTime").val() + " Minutes" : "N/A"}</span></div>`)


                // Set Question Text
                var questionHTML = $("#questionTextInput input").val() + "<br>" + $('#QuestionEditor').siblings(".note-editor").find(".note-editable.card-block").html();
                var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
                $(".preview_body").append(questionParagraph)
                    // ----------------------------------------------------------

                // Set Question Uploads
                var questionUploads = {}
                $("#audioVideoQuestionUpload").find(".dz-preview.dz-success").each(function() {
                    questionUploads[$(this).find("span[data-dz-name]").text()] = audioVideoAllUploads[$(this).find("span[data-dz-name]").text()]
                })

                if (Object.keys(questionUploads).length) {
                    var questionUploadsDiv = `<div class='question_uploads'><h4 class="text-center">Question Uploads</h4></div>`
                    $(".preview_body").append(questionUploadsDiv)

                    $.each(questionUploads, function(fileName, fileBase64) {
                        let file = `<a class= "fileName" href="#">${fileName}</a>`
                        $(".preview_body .question_uploads").append(file)
                    })
                }
                // ----------------------------------------------------------
            })

        }
        // end:: check if the question is AudioVideo

    })

})