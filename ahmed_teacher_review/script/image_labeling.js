$(function() {
    $('#loading').fadeOut();

    // disable right click
    // $(document).on('contextmenu', e => e.preventDefault());

    // JSON input
    var json_input = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "2", "subject_name": "Urdu", "topic_name": "", "filter_tags": [], "question_html": "اذكر اسم العضو المذكور", "question_details": "<p>تأكد من اجابتك</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "30", "maximum_time": "20", "question_images": {}, "spaces": [{ "answer_number": 1, "answer_text": "Left Ear", "position_x": 0.05921093152319083, "position_y": 0.09384342301943199, "answer_color": "rgb(22, 160, 133)" }, { "answer_number": 2, "answer_text": "Nose", "position_x": 0.010586043360433605, "position_y": 0.45258781763826605, "answer_color": "rgb(44, 62, 80)" }, { "answer_number": 3, "answer_text": "Tongue", "position_x": 0.19536061837891108, "position_y": 0.5063994768310912, "answer_color": "rgb(52, 152, 219)" }, { "answer_number": 6, "answer_text": "Right Ear", "position_x": 0.43524339998184675, "position_y": 0.10580156950672645, "answer_color": "rgb(241, 196, 15)" }, { "answer_number": 4, "answer_text": "Tail", "position_x": 0.92797560003112, "position_y": 0.4944413303437967, "answer_color": "rgb(211, 84, 0)" }, { "answer_number": 5, "answer_text": "Legs", "position_x": 0.7367177065909416, "position_y": 0.6528867713004485, "answer_color": "rgb(46, 204, 113)" }], "display_type": "enumerate", "question_image_base64": "ahmed_teacher_review/img/donkey.png", "question_image_name": "donkey.png" }

    // check question language
    if (json_input.subject_id == "0" || json_input.subject_id == "2") {
        $(".questionText").css({ "font-size": "46px", "display": "inline-block", "width": "94%", "text-align": "right" }).attr("dir", "rtl")
        $(".questionDetails").css({ "font-size": "46px", "display": "inline-block", "width": "100%", "text-align": "right" }).attr("dir", "rtl")
    }

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
            y: (el.offset().top + (el.outerHeight() / 2) - 2.5)
        }
    }

    function getOffsetAnswer(el) {
        return {
            x: el.offset().left,
            y: (el.offset().top + (el.outerHeight() / 2) - 2.5)
        }
    }

    // add time alert
    setInterval(function() {
        let minutes = $(".countdown").text().split(":")[1]
        minutes < 1 ? $(".alert-danger").css("display", "block") : $(".alert-danger").css("display", "none")
    }, 1000);

    // set question text
    $(".questionText").html(json_input.question_html)
    $(".questionDetails").html(json_input.question_details)

    // set attachment
    if (!json_input.allow_attachment) {
        $("#answerAttachments").css("display", "none")
    }

    if (json_input.question_image_base64) {
        let quesImage = `<img id="question_img" class="img-fluid" src="${json_input.question_image_base64}" alt="${json_input.question_image_name}">`
        $('.question_img_div').append(quesImage)
    }

    if (json_input.display_type == "dragging") {
        $(".imageLabelingQuestion").prepend(`<div class="choices_div"></div>`)
        setTimeout(function() {
            for (i = 0; i < json_input.spaces.length; i++) {
                if (json_input.spaces[i]["answer_text"] != "") {
                    let choice = `<span class="student_choice" draggable="true">${json_input.spaces[i]["answer_text"]}</span>`
                    $('.imageLabelingQuestion .choices_div').append(choice)

                    let marker = `<span class = 'btn mark' data-id='${json_input.spaces[i]["answer_number"]}' style=' position:absolute; background-color: ${json_input.spaces[i]["answer_color"]} ; top: ${json_input.spaces[i]["position_y"] * $("#question_img").css('height').replace("px", "") - 10}px; left: ${json_input.spaces[i]["position_x"] * $("#question_img").css('width').replace("px", "")}px'>${json_input.spaces[i]["answer_number"]}</span>`
                    $('.imageLabelingQuestion .question_img_div').append(marker)

                    if (json_input.spaces[i]["position_x"] < 0.5) {
                        newElement = `<div style="position:relative" data-id = "${json_input.spaces[i]["answer_number"]}" class="student_input_div"><span class="image_tag" style="background-color:${json_input.spaces[i]["answer_color"]}">${json_input.spaces[i]["answer_number"]}</span><div class="student_answer" data-id="${json_input.spaces[i]["answer_number"]}" style="border:2px solid ${json_input.spaces[i]["answer_color"]}; color:${json_input.spaces[i]["answer_color"]}; font-weight: bold"></div></div>`
                        $(".imageLabelingQuestion .left_group").append(newElement)
                        console.log($(`.student_input_div[data-id = "${json_input.spaces[i]["answer_number"]}"]`).last());
                        console.log($(`.mark[data-id='${json_input.spaces[i]["answer_number"]}']`).last());
                        leftConnect($(`.student_input_div[data-id = "${json_input.spaces[i]["answer_number"]}"]`).last(), $(`.mark[data-id='${json_input.spaces[i]["answer_number"]}']`).last(), json_input.spaces[i]["answer_color"])
                    } else {
                        newElement = `<div style="position:relative" data-id = "${json_input.spaces[i]["answer_number"]}" class="student_input_div"><div class="student_answer" data-id="${json_input.spaces[i]["answer_number"]}" style="border:2px solid ${json_input.spaces[i]["answer_color"]}; color:${json_input.spaces[i]["answer_color"]}; font-weight: bold"></div><span class="image_tag" style="background-color:${json_input.spaces[i]["answer_color"]}" >${json_input.spaces[i]["answer_number"]}</span></div>`
                        $(".imageLabelingQuestion .right_group").append(newElement)
                        rightConnect($(`.mark[data-id='${json_input.spaces[i]["answer_number"]}']`).last(), $(`.student_input_div[data-id = "${json_input.spaces[i]["answer_number"]}"]`).last(), json_input.spaces[i]["answer_color"])
                    }

                    $(".imageLabelingQuestion .mark").click(function(e) {
                        e.stopPropagation()
                        $(`.imageLabelingQuestion .student_input_div[data-id='${$(this).attr("id")}'] .student_answer`).focus()
                    })
                }
            }
            // drag and drop functionality
            $(".student_choice").on("dragstart", function() {
                $(this).addClass("drag");
                $.each($(".student_input_div .student_answer"), function() {
                    if ($(this).find(".student_choice").length == 0) {
                        $(this).css("box-shadow", "0 0 0 0.2rem rgb(0 0 0 / 50%")
                    }
                })
            })
            $(".student_choice ").on("touchstart", function() {
                $(this).addClass("drag");
                $.each($(".student_input_div .student_answer"), function() {
                    if ($(this).find(".student_choice ").length == 0) {
                        $(this).css("box-shadow", "0 0 0 0.2rem rgb(0 0 0 / 50%")
                    }
                })
            })
            $(".student_choice").on("dragend", function() {
                $(this).removeClass("drag");
                $(".student_input_div .student_answer").css("box-shadow", "none")
            })

            $(".student_answer").each(function() {
                $(this).on("dragenter", function(e) {
                    e.preventDefault();
                    if ($(this).find(".student_choice").length == 0) {
                        $(this).append($(".student_choice.drag"))
                    }
                })
                $(this).on("dragleave", function(e) {
                    e.preventDefault();
                })
                $(this).on("dragover", function(e) {
                    e.preventDefault();
                })
                $(this).on("drop", function(e) {
                    e.preventDefault();
                    if ($(this).find(".student_choice").length != 0) {
                        $(".choices_div").append($(this).find(".student_choice"))
                        $(this).append($(".student_choice.drag"))
                    }
                })
            })
            $(".choices_div").each(function() {
                $(this).on("dragenter", function(e) {
                    e.preventDefault();
                    $(this).append($(".student_choice.drag"))
                })
                $(this).on("dragleave", function(e) {
                    e.preventDefault();
                })
                $(this).on("dragover", function(e) {
                    e.preventDefault();
                })
                $(this).on("drop", function(e) {
                    e.preventDefault();
                })
            })

        }, 500)

    } else if (json_input.display_type == "fill") {
        setTimeout(function() {
            for (i = 0; i < json_input.spaces.length; i++) {
                let marker = `<span class = 'btn mark' data-id='${json_input.spaces[i]["answer_number"]}' style=' position:absolute; background-color: ${json_input.spaces[i]["answer_color"]} ; top: ${json_input.spaces[i]["position_y"] * $("#question_img").css('height').replace("px", "") - 10}px; left: ${json_input.spaces[i]["position_x"] * $("#question_img").css('width').replace("px", "")}px'>${json_input.spaces[i]["answer_number"]}</span>`
                $('.imageLabelingQuestion .question_img_div').append(marker)

                if (json_input.spaces[i]["position_x"] < 0.5) {
                    newElement = `<div style="position:relative" data-id = "${json_input.spaces[i]["answer_number"]}" class="student_input_div"><span class="image_tag" style="background-color:${json_input.spaces[i]["answer_color"]}">${json_input.spaces[i]["answer_number"]}</span><input type="text" class="student_answer" id="${"fill" + i}" data-id="${json_input.spaces[i]["answer_number"]}" style="border:2px solid ${json_input.spaces[i]["answer_color"]}; color:${json_input.spaces[i]["answer_color"]}; font-weight: bold"></div>`
                    $(".imageLabelingQuestion .left_group").append(newElement)
                    leftConnect($(`.student_input_div[data-id = "${json_input.spaces[i]["answer_number"]}"]`).last(), $(`.mark[data-id='${json_input.spaces[i]["answer_number"]}']`).last(), json_input.spaces[i]["answer_color"])
                } else {
                    newElement = `<div style="position:relative" data-id = "${json_input.spaces[i]["answer_number"]}" class="student_input_div"><input type="text" id="${"fill" + i}" class="student_answer" data-id="${json_input.spaces[i]["answer_number"]}" style="border:2px solid ${json_input.spaces[i]["answer_color"]}; color:${json_input.spaces[i]["answer_color"]}; font-weight: bold"><span class="image_tag" style="background-color:${json_input.spaces[i]["answer_color"]}" >${json_input.spaces[i]["answer_number"]}</span></div>`
                    $(".imageLabelingQuestion .right_group").append(newElement)
                    rightConnect($(`.mark[data-id='${json_input.spaces[i]["answer_number"]}']`).last(), $(`.student_input_div[data-id = "${json_input.spaces[i]["answer_number"]}"]`).last(), json_input.spaces[i]["answer_color"])
                }

                $(".imageLabelingQuestion .mark").click(function(e) {
                    e.stopPropagation()
                    $(`.imageLabelingQuestion .student_input_div[data-id='${$(this).data("id")}'] .student_answer`).focus()
                })
            }
            $(".imageLabelingQuestion input").each(function() {
                let inputID = $(this).attr("id")
                    // Check Language
                if (json_input.subject_id == "0") {
                    $.getScript("ahmed_student/script/urdutextbox.js", function() {
                        MakeTextBoxUrduEnabled(document.getElementById(inputID))
                    })
                    $(this).attr("dir", "rtl")
                } else if (json_input.subject_id == "2") {
                    $.getScript("ahmed_student/script/arabictextbox.js", function() {
                        MakeTextBoxArabicEnabled(document.getElementById(inputID))
                    })
                    $(this).attr("dir", "rtl")
                }
            })
        }, 500)
    } else if (json_input.display_type == "enumerate") {
        var curMousePos = { x: 0, y: 0 }
        var colors_left = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]
        var colors_right = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#95a5a6", "#7f8c8d"]
        var answer_no = 0


        // Add Click Event
        $(".question_img_div #question_img").on("click", function(e) {

            // Set Answer ID
            answer_no += 1

            // Set Mouse Position
            curMousePos.x = e.pageX
            curMousePos.y = e.pageY

            // Add Items In Left Side
            if (e.pageX <= $("#question_img").offset().left + ($("#question_img").css("width").replace("px", "")) / 2) {

                //Choose Color
                let randomNumber = Math.floor(Math.random() * colors_left.length)
                let randomColor = colors_left[randomNumber]
                colors_left.splice(randomNumber, 1)
                if (colors_left.length == 0) {
                    colors_left = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
                }
                // Add Text Box
                newElement = `<div style="position:relative" data-id = "${answer_no}" class="student_input_div"><span class="student_image_tag" style="background-color:${randomColor}">${answer_no}</span><input type="text" class="student_answer" data-id="${answer_no}" id="${"space"+answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span></div>`
                $(".imageLabelingQuestion .left_group").append(newElement)

                $(".imageLabelingQuestion .question_img_div").append(`<span class = 'btn student_mark' data-id='${answer_no}' data-positionx='${(e.pageX - $('.question_img_div #question_img').offset().left) / $('.question_img_div #question_img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('.question_img_div #question_img').offset().top) / $('.question_img_div #question_img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('.question_img_div #question_img').first().offset().top - 9}px; left: ${e.pageX - $('.question_img_div #question_img').first().offset().left - 8}px;'>${answer_no}</span>`)

                $(`.student_answer[data-id=${answer_no}]`).focus()

                $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                    if (confirm("Are you sure, you want to remove this tag ?")) {
                        $(".imageLabelingQuestion .student_mark[data-id='" + $(this).parent().data("id") + "']").remove()
                        $(this).parent().remove();
                        $(".moving_line[data-answ_id=" + $(this).parent().data("id") + "]").remove()
                    }
                })

                leftConnect($(`.left_group .student_input_div`).last(), $(`.student_mark`).last(), randomColor)
            }

            // Add Items In Right Side
            else if (e.pageX > $("#question_img").offset().left + ($("#question_img").css("width").replace("px", "")) / 2) {
                //Choose Color
                let randomNumber = Math.floor(Math.random() * colors_right.length)
                let randomColor = colors_right[randomNumber]
                colors_right.splice(randomNumber, 1)
                if (colors_right.length == 0) {
                    colors_right = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
                }
                // Add Text Box
                newElement = `<div style="position:relative" data-id = "${answer_no}" class="student_input_div"><span class="delete_input" style="background-color:#f64e60; color:#fff">X</span><input type="text" class="student_answer" data-id="${answer_no}" id="${"space"+answer_no}" style="border:2px solid ${randomColor}; color:${randomColor}; font-weight: bold"><span class="student_image_tag" style="background-color:${randomColor}" >${answer_no}</span></div>`
                $(".imageLabelingQuestion .right_group").append(newElement)

                $(".imageLabelingQuestion .question_img_div").append(`<span class = 'btn student_mark' data-id='${answer_no}' data-positionx='${(e.pageX - $('.question_img_div #question_img').offset().left) / $('.question_img_div #question_img').css("width").replace("px", "")}' data-positiony='${(e.pageY - $('.question_img_div #question_img').offset().top) / $('.question_img_div #question_img').css("height").replace("px", "")}'  style=' background-color: ${randomColor} ; top: ${e.pageY - $('.question_img_div #question_img').first().offset().top - 9}px; left: ${e.pageX - $('.question_img_div #question_img').first().offset().left - 8}px;'>${answer_no}</span>`)

                $(".imageLabelingQuestion .student_answer[data-id=" + answer_no + "]").focus()

                $(`div[data-id = "${answer_no}"] .delete_input`).on("click", function() {
                    if (confirm("Are you sure, you want to remove this tag ?")) {
                        $(".imageLabelingQuestion .student_mark[data-id='" + $(this).parent().data("id") + "']").remove()
                        $(this).parent().remove();
                        $(".moving_line[data-answ_id=" + $(this).parent().data("id") + "]").remove()
                    }
                })

                rightConnect($(`.student_mark`).last(), $(`.right_group .student_input_div`).last(), randomColor)
            }

            let inputID = "space" + answer_no
                // Check Language
            if (json_input.subject_id == "0") {
                $.getScript("ahmed_student/script/urdutextbox.js", function() {
                    MakeTextBoxUrduEnabled(document.getElementById(inputID))
                })
                $("#" + inputID).attr("dir", "rtl")
            } else if (json_input.subject_id == "2") {
                $.getScript("ahmed_student/script/arabictextbox.js", function() {
                    MakeTextBoxArabicEnabled(document.getElementById(inputID))
                })
                $("#" + inputID).attr("dir", "rtl")
            }

            $(".imageLabelingQuestion .student_mark").click(function(e) {
                e.stopPropagation()
                $(`.imageLabelingQuestion .student_input_div[data-id='${$(this).data("id")}'] .student_answer`).focus()
            })
        })
    }


    $("#submitAnswer").on("click", function() {
        if (json_input.display_type == "dragging") {
            var answers = []
            for (let i = 0; i < $(".btn.mark").length; i++) {
                let answer = {}
                answer = {
                    "answer_number": $(".btn.mark").eq(i).data("id"),
                    "answer_text": $(".student_answer[data-id=" + $(".btn.mark").eq(i).attr("data-id") + "]").find(".student_choice").text()
                }
                answers.push(answer)
            }
        } else if (json_input.display_type == "fill") {
            var answers = []
            for (let i = 0; i < $(".btn.mark").length; i++) {
                let answer = {}
                answer = {
                    "answer_number": $(".btn.mark").eq(i).data("id"),
                    "answer_text": $(".student_answer[data-id=" + $(".btn.mark").eq(i).attr("data-id") + "]").val()
                }
                answers.push(answer)
            }
        } else if (json_input.display_type == "enumerate") {
            var answers = []

            $(".student_answer").each(function() {
                let answer = {}
                if ($(this).val() != "") {
                    answer["answer_number"] = $(this).data("id")
                    answer["answer_text"] = $(this).val()
                    answer["position_x"] = $(".student_mark[data-id='" + $(this).data("id") + "']").data("positionx")
                    answer["position_y"] = $(".student_mark[data-id='" + $(this).data("id") + "']").data("positiony")
                    answer["answer_color"] = $(".student_mark[data-id='" + $(this).data("id") + "']").css("background-color")

                    answers.push(answer)
                }
            })
        }

        // Make Screenshot
        html2canvas(document.getElementById("kt_body"), { "imageTimeout": 0 }).then(function(canvas) {

            output = {
                "answers": answers,
                "screenshot": canvas.toDataURL()
            }
            outputJSON = JSON.stringify(output)
            console.log(output);
        });
    })

})