$(function() {
    $('#loading').fadeOut();

    // JSON input
    var json_input_teacher = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "2", "subject_name": "Urdu", "topic_name": "", "filter_tags": [], "question_html": "اذكر اسم العضو المذكور", "question_details": "<p>تأكد من اجابتك</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "30", "maximum_time": "20", "question_images": {}, "spaces": [{ "answer_number": 1, "answer_text": "Left Ear", "position_x": 0.05921093152319083, "position_y": 0.09384342301943199, "answer_color": "rgb(22, 160, 133)" }, { "answer_number": 2, "answer_text": "Nose", "position_x": 0.010586043360433605, "position_y": 0.45258781763826605, "answer_color": "rgb(44, 62, 80)" }, { "answer_number": 3, "answer_text": "Tongue", "position_x": 0.19536061837891108, "position_y": 0.5063994768310912, "answer_color": "rgb(52, 152, 219)" }, { "answer_number": 6, "answer_text": "Right Ear", "position_x": 0.43524339998184675, "position_y": 0.10580156950672645, "answer_color": "rgb(241, 196, 15)" }, { "answer_number": 4, "answer_text": "Tail", "position_x": 0.92797560003112, "position_y": 0.4944413303437967, "answer_color": "rgb(211, 84, 0)" }, { "answer_number": 5, "answer_text": "Legs", "position_x": 0.7367177065909416, "position_y": 0.6528867713004485, "answer_color": "rgb(46, 204, 113)" }], "display_type": "dragging", "question_image_base64": "ahmed_teacher_review/img/donkey.png", "question_image_name": "donkey.png" }

    var json_input = { "answers": [{ "answer_number": 1, "answer_text": "Right Ear" }, { "answer_number": 2, "answer_text": "Nose" }, { "answer_number": 3, "answer_text": "Tail" }, { "answer_number": 6, "answer_text": "Tongue" }, { "answer_number": 4, "answer_text": "" }, { "answer_number": 5, "answer_text": "Legs" }] }


    // check question language
    if (json_input_teacher.subject_id == "0" || json_input_teacher.subject_id == "2") {
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
            y: (el.offset().top + (el.outerHeight() / 2))
        }
    }

    function getOffsetAnswer(el) {
        return {
            x: el.offset().left,
            y: (el.offset().top + (el.outerHeight() / 2))
        }
    }

    // set question text
    $(".questionText").html(json_input_teacher.question_html)
    $(".questionDetails").html(json_input_teacher.question_details)

    if (json_input_teacher.question_image_base64) {
        let quesImage = `<img id="question_img" class="img-fluid" src="${json_input_teacher.question_image_base64}" alt="${json_input_teacher.question_image_name}">`
        $('.question_img_div').append(quesImage)
    }

    $(".imageLabelingQuestion").prepend(`<div class="choices_div"></div>`)

    var totalMarks = json_input_teacher.spaces.length
    var studentMarks = 0

    setTimeout(function() {
        for (i = 0; i < json_input_teacher.spaces.length; i++) {
            if (json_input_teacher.spaces[i]["answer_text"] != "") {
                let choice = `<span class="student_choice" draggable="false">${json_input_teacher.spaces[i]["answer_text"]}</span>`
                $('.imageLabelingQuestion .choices_div').append(choice)

                let marker = `<span class = 'btn mark' data-id='${json_input_teacher.spaces[i]["answer_number"]}' style=' position:absolute; background-color: ${json_input_teacher.spaces[i]["answer_color"]} ; top: ${json_input_teacher.spaces[i]["position_y"] * $("#question_img").css('height').replace("px", "") - 10}px; left: ${json_input_teacher.spaces[i]["position_x"] * $("#question_img").css('width').replace("px", "")}px'>${json_input_teacher.spaces[i]["answer_number"]}</span>`
                $('.imageLabelingQuestion .question_img_div').append(marker)

                if (json_input_teacher.spaces[i]["position_x"] < 0.5) {
                    newElement = `<div style="position:relative" data-id = "${json_input_teacher.spaces[i]["answer_number"]}" class="student_input_div"><span class="image_tag" style="background-color:${json_input_teacher.spaces[i]["answer_color"]}">${json_input_teacher.spaces[i]["answer_number"]}</span><div class="student_answer" data-id="${json_input_teacher.spaces[i]["answer_number"]}" style="border:2px solid ${json_input_teacher.spaces[i]["answer_color"]}; color:${json_input_teacher.spaces[i]["answer_color"]}; font-weight: bold"></div></div>`
                    $(".imageLabelingQuestion .left_group").append(newElement)
                } else {
                    newElement = `<div style="position:relative" data-id = "${json_input_teacher.spaces[i]["answer_number"]}" class="student_input_div"><div class="student_answer" data-id="${json_input_teacher.spaces[i]["answer_number"]}" style="border:2px solid ${json_input_teacher.spaces[i]["answer_color"]}; color:${json_input_teacher.spaces[i]["answer_color"]}; font-weight: bold"></div><span class="image_tag" style="background-color:${json_input_teacher.spaces[i]["answer_color"]}" >${json_input_teacher.spaces[i]["answer_number"]}</span></div>`
                    $(".imageLabelingQuestion .right_group").append(newElement)
                }
            }
        }

        setTimeout(() => {
            for (let i = 0; i < json_input.answers.length; i++) {
                if (json_input.answers[i].answer_text !== "") {
                    $(`.student_answer[data-id='${json_input.answers[i].answer_number}']`).append($(`.student_choice:contains(${json_input.answers[i].answer_text})`))
                }
            }
        }, 100);

        setTimeout(() => {
            for (i = 0; i < json_input_teacher.spaces.length; i++) {
                if (json_input_teacher.spaces[i]["answer_text"] != "") {
                    if (json_input_teacher.spaces[i]["position_x"] < 0.5) {
                        leftConnect($(`.student_input_div[data-id = "${json_input_teacher.spaces[i]["answer_number"]}"]`).last(), $(`.mark[data-id='${json_input_teacher.spaces[i]["answer_number"]}']`).last(), json_input_teacher.spaces[i]["answer_color"])
                    } else {
                        rightConnect($(`.mark[data-id='${json_input_teacher.spaces[i]["answer_number"]}']`).last(), $(`.student_input_div[data-id = "${json_input_teacher.spaces[i]["answer_number"]}"]`).last(), json_input_teacher.spaces[i]["answer_color"])
                    }
                }
            }
        }, 100);

        setTimeout(() => {
            $(`.student_answer`).css({ "border-color": "#F64E60", "color": "#F64E60" }).siblings().css("background-color", "#F64E60")
            $(`.moving_line`).css("background-color", "#F64E60").children().css("border-color", "#F64E60")
            $(`.mark`).css("background-color", "#F64E60")

            for (let i = 0; i < json_input_teacher.spaces.length; i++) {
                for (let x = 0; x < json_input.answers.length; x++) {
                    if (json_input_teacher.spaces[i].answer_number == json_input.answers[x].answer_number) {
                        if (json_input_teacher.spaces[i].answer_text == json_input.answers[x].answer_text) {
                            $(`.student_answer[data-id='${json_input_teacher.spaces[i].answer_number}']`).css({ "border-color": "#1BC5BD", "color": "#1BC5BD" }).siblings().css("background-color", "#1BC5BD")
                            $(`.moving_line[data-ques_id='${json_input_teacher.spaces[i].answer_number}']`).css("background-color", "#1BC5BD").children().css("border-color", "#1BC5BD")
                            $(`.mark[data-id='${json_input_teacher.spaces[i].answer_number}']`).css("background-color", "#1BC5BD")
                            studentMarks += 1
                        }
                    }
                }
            }

            $(".studentMarks").text(`${studentMarks} of ${totalMarks}`)

        }, 100);

    }, 500)





    $("#submitAnswer").on("click", function() {
        outputJSON = JSON.stringify({
            "teacher_review": $("#teacherReview").val(),
            "teacher_marks": $(".teacherMarks").val()
        })
        console.log(outputJSON);
        $(`.moving_line`).remove()
    })

})