$(function() {
    $('#loading').fadeOut();

    // JSON input  
    var json_input_question = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "", "subject_name": "", "topic_name": "", "filter_tags": [], "question_html": "وصل الحاجات ببعضها", "question_details": "<p>Try to match similar items together</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "20", "maximum_time": "1", "display_type": "line", "question_images": {}, "pairs": [{ "question_image_name": "ball.png", "question_image": "ahmed_teacher_review/img/ball.png", "question_text": "Ball", "answer_text": "كرة" }, { "question_text": "قطة", "answer_image_name": "cat.png", "answer_image": "ahmed_teacher_review/img/cat.png", "answer_text": "Cat" }, { "question_image_name": "frog.png", "question_image": "ahmed_teacher_review/img/frog.png", "question_text": "Frog", "answer_text": "Frog" }, { "question_text": "شنطة", "answer_text": "Bag" }] }

    // var json_input = { "pairs": { "pairs": [{ "question_image_name": "ball.png", "question_image": "ahmed_teacher_review/img/ball.png", "question_text": "Ball", "answer_image": "", "answer_text": "Bag" }, { "question_image": "", "question_text": "قطة", "answer_image_name": "cat.png", "answer_image": "ahmed_teacher_review/img/cat.png", "answer_text": "Cat" }, { "question_image_name": "frog.png", "question_image": "ahmed_teacher_review/img/frog.png", "question_text": "ضفدع", "answer_image_name": "frog.png", "answer_image": "ahmed_teacher_review/img/frog.png", "answer_text": "Frog" }, { "question_image": "", "question_text": "شنطة", "answer_image": "", "answer_text": "كرة" }] }, "screenshot": "canvas.toDataURL()" }

    var json_input = {
        "pairs": {
            "pairs": [{
                    "question_image_name": "ball.png",
                    "question_image": "ahmed_teacher_review/img/ball.png",
                    "question_text": "Ball",
                    "answer_image_name": "frog.png",
                    "answer_image": "ahmed_teacher_review/img/frog.png",
                    "answer_text": "Frog"
                },
                {
                    "question_text": "قطة",

                    "answer_image_name": "cat.png",
                    "answer_image": "ahmed_teacher_review/img/cat.png",
                    "answer_text": "Cat"
                },
                {
                    "question_image_name": "frog.png",
                    "question_image": "ahmed_teacher_review/img/frog.png",
                    "question_text": "Frog",
                    "answer_text": "Bag"
                },
                {
                    "question_text": "شنطة",
                    "answer_image": "",
                    "answer_text": ""
                }
            ]
        },
        "screenshot": "canvas.toDataURL()"
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

    function connect(question, answer, color) {
        var x1 = getOffsetQuestion(question).x;
        var y1 = getOffsetQuestion(question).y;
        var x2 = getOffsetAnswer(answer).x;
        var y2 = getOffsetAnswer(answer).y;
        // distance
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2);
        // angle
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        // make hr
        var htmlLine = "<div data-ques_id=" + question[0].id + " class= 'moving_line' data-answ_id=" + answer[0].id + " style='padding:0px; margin:0px; height:5px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);z-index:2'><span class='arrow' style='border-color:" + color + "'></span></div>";
        $("body").append(htmlLine)
    }

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
    $(".questionText").html(json_input_question.question_html)
    $(".questionDetails").html(json_input_question.question_details)

    $("#questionNote h4").text("Match the Equivalent Elements Together")
    let allRows = '<div class="row lineMatchingDiv"><div class="col-4"><ul class="questions list-unstyled text-center"></ul></div><div class="offset-4 col-4"><ul class="answers list-unstyled text-center"></ul></div></div>'
    var num = 1
    $(".drag_drop .totalPairs").append(allRows)
    json_input_question["pairs"].forEach(element => {
        if (element["question_image"] != undefined && element["question_text"] != "") {
            $(".drag_drop .questions").append('<li class="question row" id="question' + num + '"><img class="col-4 question_img img-fluid" src="' + element["question_image"] + '" alt="' + element["question_image_name"] + '"><span class="col-8 question_text">' + element["question_text"] + '</span></li>')
        } else if (element["question_image"] != undefined) {
            $(".drag_drop .questions").append('<li class="question row" id="question' + num + '"><img class="col-12 question_img img-fluid" src="' + element["question_image"] + '" alt="' + element["question_image_name"] + '"></li>')
        } else if (element["question_text"] != "") {
            $(".drag_drop .questions").append('<li class="question row" id="question' + num + '"><span class="col-12 question_text">' + element["question_text"] + '</span></li>')
        }
        num += 1
    })
    shuffleElements(json_input_question["pairs"])
    json_input_question["pairs"].forEach(element => {
        if (element["answer_image"] != undefined && element["answer_text"] != "") {
            $(".drag_drop .answers").append('<li class="answer row" id="answer' + num + '"><span class="col-8 answer_text">' + element["answer_text"] + '</span><img class="col-4 img-fluid answer_img" src="' + element["answer_image"] + '" alt="' + element["answer_image_name"] + '"></li>')
        } else if (element["answer_image"] != undefined) {
            $(".drag_drop .answers").append('<li class="answer row" id="answer' + num + '"><img class="col-12 img-fluid answer_img" src="' + element["answer_image"] + '" alt="' + element["answer_image_name"] + '"></li>')
        } else if (element["answer_text"] != "") {
            $(".drag_drop .answers").append('<li class="answer row" id="answer' + num + '"><span class="col-12 answer_text">' + element["answer_text"] + '</span></li>')
        }
        num += 1
    })


    json_input["pairs"]["pairs"].forEach(element => {

        if (element["question_text"]) {
            var question = $(".question_text:contains(" + element["question_text"] + ")").parents("li")
        } else if (element["question_image_name"]) {
            var question = $(".question_img[alt=" + element["question_image_name"] + "]").parents("li")
        }

        if (element["answer_text"]) {
            var answer = $(".answer_text:contains(" + element["answer_text"] + ")").parents("li")
        } else if (element["answer_image_name"]) {
            var answer = $(".answer_img[alt=" + element["answer_image_name"] + "]").parents("li")
        }
        setTimeout(function() {
            if (question != undefined && answer != undefined) {
                connect(question, answer, "#555");
            }
        }, 500)
    })
    setTimeout(() => {
        var questionCheck, answerCheck, question, answer
        for (let i = 0; i < json_input_question["pairs"].length; i++) {
            if (json_input_question["pairs"][i]["question_text"]) {
                questionCheck = $(".question_text:contains(" + json_input_question["pairs"][i]["question_text"] + ")").parents("li")
            } else if (json_input_question["pairs"][i]["question_image_name"]) {
                questionCheck = $(".question_img[alt=" + json_input_question["pairs"][i]["question_image_name"] + "]").parents("li")
            }
            if (json_input_question["pairs"][i]["answer_text"]) {
                answerCheck = $(".answer_text:contains(" + json_input_question["pairs"][i]["answer_text"] + ")").parents("li")
            } else if (json_input_question["pairs"][i]["answer_image_name"]) {
                answerCheck = $(".answer_img[alt=" + json_input_question["pairs"][i]["answer_image_name"] + "]").parents("li")
            }
            for (let i = 0; i < json_input["pairs"]["pairs"].length; i++) {
                if (json_input["pairs"]["pairs"][i]["question_text"]) {
                    question = $(".question_text:contains(" + json_input["pairs"]["pairs"][i]["question_text"] + ")").parents("li")
                } else if (json_input["pairs"]["pairs"][i]["question_image_name"]) {
                    question = $(".question_img[alt=" + json_input["pairs"]["pairs"][i]["question_image_name"] + "]").parents("li")
                }
                if (json_input["pairs"]["pairs"][i]["answer_text"]) {
                    answer = $(".answer_text:contains(" + json_input["pairs"]["pairs"][i]["answer_text"] + ")").parents("li")
                } else if (json_input["pairs"]["pairs"][i]["answer_image_name"]) {
                    answer = $(".answer_img[alt=" + json_input["pairs"]["pairs"][i]["answer_image_name"] + "]").parents("li")
                } else {
                    continue
                }
                if (questionCheck.attr('id') == question.attr('id') && answerCheck.attr('id') == answer.attr('id')) {
                    questionCheck.css("border-color", "#1BC5BD")
                    answerCheck.css("border-color", "#1BC5BD")
                    break
                }
                questionCheck.css("border-color", "#F64E60")
                answerCheck.css("border-color", "#F64E60")
            }
        }
    }, 500);

    $("#submitReview").on("click", function() {
        outputJSON = JSON.stringify({ "teacher_review": $("#teacherReview").val() })
        console.log(outputJSON);
    })

})