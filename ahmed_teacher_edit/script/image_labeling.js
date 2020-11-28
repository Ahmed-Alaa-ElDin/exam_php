$(function() {

    var answer_no = 1

    // connections functions
    function leftConnect(question, answer, color) {
        var x1 = getOffsetQuestion(question).x;
        var y1 = getOffsetQuestion(question).y;
        var x2 = getOffsetAnswer(answer).x;
        var y2 = getOffsetAnswer(answer).y;
        // distance
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - 2.5;
        // angle
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        // make hr
        var htmlLine = `<div data-ques_id="${question.data("id")}" class= 'moving_line' data-answ_id="${answer.data("id")}" style='padding:0px; margin:0px; height:2px; background-color:${color}; line-height:1px; position:absolute; left:${cx}px; top:${cy}px; width:${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);z-index:2'><span class='right_arrow' style='border-color:${color}'></span></div>`;
        $("body").append(htmlLine)
    }

    function rightConnect(question, answer, color) {
        var x1 = getOffsetQuestion(question).x;
        var y1 = getOffsetQuestion(question).y;
        var x2 = getOffsetAnswer(answer).x;
        var y2 = getOffsetAnswer(answer).y;
        // distance
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - 2.5;
        // angle
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        // make hr
        var htmlLine = `<div data-ques_id="${question.data("id")}" class= 'moving_line' data-answ_id="${answer.data("id")}" style='padding:0px; margin:0px; height:2px; background-color:${color}; line-height:1px; position:absolute; left:${cx}px; top:${cy}px; width:${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);z-index:2'><span class='left_arrow' style='border-color:${color}'></span></div>`;
        $("body").append(htmlLine)

    }

    // get location of the begining and end of arrows
    function getOffsetQuestion(el) {
        return {
            x: el.offset().left + el.outerWidth(),
            y: (el.offset().top + (el.outerHeight() / 2))
        }
    }

    function getOffsetAnswer(el) {
        return {
            x: el.offset().left,
            y: (el.offset().top + (el.outerHeight() / 2))
        }
    }

    // get old json
    var json_input_teacher = { "academic_id": "", "academic_year": "2020 - 2021", "grade_id": "1", "grade_name": "Grade 01", "subject_id": "1", "subject_name": "Urdu", "topic_name": "Grammer", "filter_tags": ["Past", "Present", "Future"], "question_html": "اذكر اسم العضو المذكور", "question_details": "<p>تأكد من اجابتك</p>", "rondomize_options": false, "allow_attachment": false, "allow_partial_credit": false, "maximum_marks": "30", "maximum_time": "20", "question_images": {}, "spaces": [{ "answer_number": 1, "answer_text": "Left Ear", "position_x": 0.05921093152319083, "position_y": 0.09384342301943199, "answer_color": "rgb(22, 160, 133)" }, { "answer_number": 2, "answer_text": "Nose", "position_x": 0.010586043360433605, "position_y": 0.45258781763826605, "answer_color": "rgb(44, 62, 80)" }, { "answer_number": 3, "answer_text": "Tongue", "position_x": 0.19536061837891108, "position_y": 0.5063994768310912, "answer_color": "rgb(52, 152, 219)" }, { "answer_number": 6, "answer_text": "Right Ear", "position_x": 0.43524339998184675, "position_y": 0.10580156950672645, "answer_color": "rgb(241, 196, 15)" }, { "answer_number": 4, "answer_text": "Tail", "position_x": 0.92797560003112, "position_y": 0.4944413303437967, "answer_color": "rgb(211, 84, 0)" }, { "answer_number": 5, "answer_text": "Legs", "position_x": 0.7367177065909416, "position_y": 0.6528867713004485, "answer_color": "rgb(46, 204, 113)" }], "display_type": "dragging", "question_image_base64": "ahmed_teacher_edit/img/donkey.png", "question_image_name": "donkey.png" }

    // get question image
    if (json_input_teacher.question_image_base64 && json_input_teacher.question_image_base64 != "") {
        $("#imageLabelingQuestionUpload").parent().hide();
        $(".clearMark").show();
        $(".deleteImg").show();
        $('#ImageLabeling .question_img_div img').first().attr({ "src": json_input_teacher.question_image_base64, "alt": json_input_teacher.question_image_name })
    }

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
            if ($("a[data-dz-remove]").length) {
                $("#imageLabelingQuestionUpload").find("a[data-dz-remove]")[0].click()
            }
            $("#ImageLabeling .mark, #ImageLabeling .input_div").remove()
            $(".question_img_div img").first().attr("src", "").attr("alt", "")
            console.log($(".question_img_div img").first());
            answer_no = 0
        }
    })

    // Set Header Values
    setTimeout(() => {
        var optionID = 0
        var tagsID = []

        $("#AcademicYear").select2("val", json_input_teacher.academic_id != "" ? json_input_teacher.academic_id : "");

        $("#StudentClass").select2("val", json_input_teacher.grade_id != "" ? json_input_teacher.grade_id : "");

        $("#StudentSection").select2("val", json_input_teacher.subject_id != "" ? json_input_teacher.subject_id : "");

        $("#topicName").val(json_input_teacher.topic_name)

        json_input_teacher.filter_tags.forEach(element => {
            var newOption = new Option(element, optionID, false, false);
            $('#FilterTags').append(newOption).trigger('change');
            tagsID.push(optionID)
            optionID++
        });
        $('#FilterTags').val(tagsID).change();

        $("#QuestionType").select2("val", "6");

        $("#questionInput").val(json_input_teacher.question_html);
        $("#QuestionEditor").summernote("code", json_input_teacher.question_details);
        if (json_input_teacher.rondomize_options) {
            $("#imageLabelingRandomizeOptions").bootstrapSwitch('state', true);
        } else {
            $("#imageLabelingRandomizeOptions").bootstrapSwitch('state', false);
        }
        if (json_input_teacher.allow_attachment) {
            $("#imageLabelingAllowAttach").bootstrapSwitch('state', true);
        } else {
            $("#imageLabelingAllowAttach").bootstrapSwitch('state', false);
        }
        if (json_input_teacher.allow_partial_credit) {
            $("#imageLabelingAllowPartialCredit").bootstrapSwitch('state', true);
        } else {
            $("#imageLabelingAllowPartialCredit").bootstrapSwitch('state', false);
        }

        $("#imageLabelingDisplayType").val(json_input_teacher.display_type == "dragging" ? "dragging" : json_input_teacher.display_type == "fill" ? "fill" : "enumerate").trigger('change');

        $("#imageLabelingMaximumMarks").val(json_input_teacher.maximum_marks)

        $("#imageLabelingMaximumTime").val(json_input_teacher.maximum_time)

        for (i = 0; i < json_input_teacher.spaces.length; i++) {
            if (json_input_teacher.spaces[i]["position_x"] < 0.5) {
                // Add Text Box
                newElement = `<div style="position:relative" data-id = "${json_input_teacher.spaces[i].answer_number}" class="input_div"><span class="image_tag" style="background-color:${json_input_teacher.spaces[i].answer_color}">${json_input_teacher.spaces[i].answer_number}</span><input type="text" class="answer" id="${json_input_teacher.spaces[i].answer_number}" value = "${json_input_teacher.spaces[i].answer_text}" style="border:2px solid ${json_input_teacher.spaces[i].answer_color}; color:${json_input_teacher.spaces[i].answer_color}; font-weight: bold"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span></div>`
                $(".left_group").append(newElement)

                $("#ImageLabeling .question_img_div").append(`<span class = 'btn mark' id='${json_input_teacher.spaces[i].answer_number}' data-positionx='${json_input_teacher.spaces[i]["position_x"]}' data-positiony='${json_input_teacher.spaces[i]["position_y"]}'  style=' background-color: ${json_input_teacher.spaces[i].answer_color} ; top: ${json_input_teacher.spaces[i]["position_y"] * $("#ImageLabeling .question_img_div img").css('height').replace("px", "") - 10}px; left: ${json_input_teacher.spaces[i]["position_x"] * $("#ImageLabeling .question_img_div img").css('width').replace("px", "")}px;'>${json_input_teacher.spaces[i].answer_number}</span>`)
                $(`div[data-id = "${json_input_teacher.spaces[i].answer_number}"] .delete_input`).on("click", function() {
                    if (confirm("Are you sure, you want to remove this tag ?")) {
                        $("#ImageLabeling .mark[id='" + $(this).parent().data("id") + "']").remove()
                        $(this).parent().remove();
                    }
                })

                // add id to input file & set language
                $(".left_group input.answer").last().attr("id", "input" + json_input_teacher.spaces[i].answer_number)
                let thisInput = document.getElementById("input" + json_input_teacher.spaces[i].answer_number)
                inputList.push(thisInput)

            } else {
                // Add Text Box
                newElement = `<div style="position:relative" data-id = "${json_input_teacher.spaces[i].answer_number}" class="input_div"><span class="image_tag" style="background-color:${json_input_teacher.spaces[i].answer_color}">${json_input_teacher.spaces[i].answer_number}</span><input type="text" class="answer" id="${json_input_teacher.spaces[i].answer_number}" value = "${json_input_teacher.spaces[i].answer_text}" style="border:2px solid ${json_input_teacher.spaces[i].answer_color}; color:${json_input_teacher.spaces[i].answer_color}; font-weight: bold"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span></div>`
                $(".right_group").append(newElement)

                $("#ImageLabeling .question_img_div").append(`<span class = 'btn mark' id='${json_input_teacher.spaces[i].answer_number}' data-positionx='${json_input_teacher.spaces[i]["position_x"]}' data-positiony='${json_input_teacher.spaces[i]["position_y"]}'  style=' background-color: ${json_input_teacher.spaces[i].answer_color} ; top: ${json_input_teacher.spaces[i]["position_y"] * $("#ImageLabeling .question_img_div img").css('height').replace("px", "") - 10}px; left: ${json_input_teacher.spaces[i]["position_x"] * $("#ImageLabeling .question_img_div img").css('width').replace("px", "")}px;'>${json_input_teacher.spaces[i].answer_number}</span>`)

                $(`div[data-id = "${json_input_teacher.spaces[i].answer_number}"] .delete_input`).on("click", function() {
                    if (confirm("Are you sure, you want to remove this tag ?")) {
                        $("#ImageLabeling .mark[id='" + $(this).parent().data("id") + "']").remove()
                        $(this).parent().remove();
                    }
                })

                // add id to input file & set language
                $(".right_group input.answer").last().attr("id", "input" + json_input_teacher.spaces[i].answer_number)
                let thisInput = document.getElementById("input" + json_input_teacher.spaces[i].answer_number)
                inputList.push(thisInput)

            }
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
            answer_no++
        }
        answer_no--

    }, 100);

    if (json_input_teacher.display_type == "dragging") {

        setTimeout(function() {

        }, 500)

    }

    var inputNumber = 0
    var inputList = [document.getElementById("questionInput")]

    $("#StudentSection").on("change", function() {
        if ($(this).val() == 0) {
            $.getScript("ahmed_teacher_edit/script/urdutextbox.js", function() {
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
            $.getScript("ahmed_teacher_edit/script/arabictextbox.js", function() {
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

    $("#imageLabelingAttachFilesWithQuestion").dropzone({
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


    // Set functionality upon Question Type Change
    $("#QuestionType").on("change", function() {

        // Edit Preview Tilte According to Question Type 
        setTimeout(() => {
            `${$("#previewBox").find(".previewQuestionType").text($("#QuestionType").siblings(".select2-container").find("#select2-QuestionType-container").text())}`
        }, 10);

        // Disable the Save Form Button
        $("#saveForm").off("click");
        $("#previewButton").off("click");
        $('.note-editing-area').off("keyup , change")
        $(".question_type").css("display", "none");

        $("#questionTextInput input").val("")
        $("#QuestionEditor").siblings(".note-editor").find(".note-editable.card-block span").remove()
        $(".fillSpaceInputs").children().remove()
        $('#QuestionEditor').summernote("reset");

        // config Question Types Fade in & out
        $("#ImageLabeling").fadeIn()

        // Set select2
        $('#imageLabelingDisplayType').select2();



        var curMousePos = { x: 0, y: 0 }
        var colors_left = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]
        var colors_right = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]


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
                newElement = `<div style="position:relative" data-id = "${answer_no}" class="input_div"><span class="image_tag" style="background-color:${randomColor}">${answer_no}</span><input type="text" class="answer" id="input${answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span></div>`
                $(".left_group").append(newElement)

                $("#ImageLabeling .question_img_div").append(`<span class = 'btn mark' id='${answer_no}' data-positionx='${(e.pageX - $('#ImageLabeling .question_img_div img').offset().left) / $('#ImageLabeling .question_img_div img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('#ImageLabeling .question_img_div img').offset().top) / $('#ImageLabeling .question_img_div img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('#ImageLabeling .question_img_div img').first().offset().top - 9}px; left: ${e.pageX - $('#ImageLabeling .question_img_div img').first().offset().left - 8}px;'>${answer_no}</span>`)

                $(`.answer[id=input${answer_no}]`).focus()

                $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                    if (confirm("Are you sure, you want to remove this tag ?")) {
                        $("#ImageLabeling .mark[id='" + $(this).parent().data("id") + "']").remove()
                        $(this).parent().remove();
                    }
                })

                // add id to input file & set language
                $(".left_group input.answer").last().attr("id", "input" + answer_no)
                let thisInput = document.getElementById("input" + answer_no)
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
                newElement = `<div style="position:relative" data-id = "${answer_no}" class="input_div"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span><input type="text" class="answer" id="input${answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="image_tag" style="background-color:${randomColor}" >${answer_no}</span></div>`
                $(".right_group").append(newElement)

                $("#ImageLabeling .question_img_div").append(`<span class = 'btn mark' id='${answer_no}' data-positionx='${(e.pageX - $('#ImageLabeling .question_img_div img').offset().left) / $('#ImageLabeling .question_img_div img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('#ImageLabeling .question_img_div img').offset().top) / $('#ImageLabeling .question_img_div img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('#ImageLabeling .question_img_div img').first().offset().top - 9}px; left: ${e.pageX - $('#ImageLabeling .question_img_div img').first().offset().left - 8}px;'>${answer_no}</span>`)

                $(".answer[id='input" + answer_no + "']").focus()

                $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                    if (confirm("Are you sure, you want to remove this tag ?")) {
                        $("#ImageLabeling .mark[id='" + $(this).parent().data("id") + "']").remove()
                        $(this).parent().remove();
                    }
                })

                // add id to input file & set language
                $(".right_group input.answer").last().attr("id", "input" + answer_no)
                let thisInput = document.getElementById("input" + answer_no)
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
                            newElement = `<div style="position:relative" data-id = "${answer_no}" class="student_input_div"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span><input type="text" class="student_answer" id="input${answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="student_image_tag" style="background-color:${randomColor}" >${answer_no}</span></div>`
                            $(".preview_body .right_group").append(newElement)

                            $(".preview_body .preview_question_img_div").append(`<span class = 'btn student_mark' id='${answer_no}' data-positionx='${(e.pageX - $('.preview_question_img_div #preview_img').offset().left) / $('.preview_question_img_div #preview_img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('.preview_question_img_div #preview_img').offset().top) / $('.preview_question_img_div #preview_img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('.preview_question_img_div #preview_img').first().offset().top - 9}px; left: ${e.pageX - $('.preview_question_img_div #preview_img').first().offset().left - 8}px;'>${answer_no}</span>`)

                            $(".preview_body .student_answer[id='input" + answer_no + "']").focus()

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

        // end:: check if the question is Image Labeling

    })

})