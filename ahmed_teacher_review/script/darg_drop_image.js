$(function() {
    $('#loading').fadeOut();

    // JSON input  
    var json_input_question = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "", "subject_name": "", "topic_name": "", "filter_tags": [], "question_html": "وصل الحاجات ببعضها", "question_details": "<p>Try to match similar items together</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "20", "maximum_time": "1", "display_type": "image", "question_images": {}, "pairs": [{ "question_image_name": "ball.png", "question_image": "ahmed_teacher_review/img/ball.png", "question_text": "Ball", "answer_text": "كرة" }, { "question_text": "قطة", "answer_image_name": "cat.png", "answer_image": "ahmed_teacher_review/img/cat.png", "answer_text": "Cat" }, { "question_image_name": "frog.png", "question_image": "ahmed_teacher_review/img/frog.png", "question_text": "Frog", "answer_text": "Frog" }, { "question_text": "شنطة", "answer_text": "Bag" }] }

    // var json_input = { "pairs": { "pairs": [{ "question_image_name": "ball.png", "question_image": "ahmed_teacher_review/img/ball.png", "question_text": "Ball", "answer_image": "", "answer_text": "Bag" }, { "question_image": "", "question_text": "قطة", "answer_image_name": "cat.png", "answer_image": "ahmed_teacher_review/img/cat.png", "answer_text": "Cat" }, { "question_image_name": "frog.png", "question_image": "ahmed_teacher_review/img/frog.png", "question_text": "ضفدع", "answer_image_name": "frog.png", "answer_image": "ahmed_teacher_review/img/frog.png", "answer_text": "Frog" }, { "question_image": "", "question_text": "شنطة", "answer_image": "", "answer_text": "كرة" }] }, "screenshot": "canvas.toDataURL()" }

    var json_input = {
        "pairs": {
            "pairs": [{
                    "question_image_name": "ball.png",
                    "question_image": "ahmed_teacher_review/img/ball.png",
                    "question_text": "Ball",
                    "answer_text": ""

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
                    "answer_image_name": "frog.png",
                    "answer_image": "ahmed_teacher_review/img/frog.png",
                    "answer_text": "Frog"
                },
                {
                    "question_text": "شنطة",
                    "answer_text": "Bag"
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

    // set question text
    $(".questionText").html(json_input_question.question_html)
    $(".questionDetails").html(json_input_question.question_details)

    $("#questionNote h4").text("Match the Equivalent Elements Together")
    let allRows = '<div class="row lineMatchingDiv"><div class="col-4"><ul class="questions list-unstyled text-center"></ul></div><div class="offset-4 col-4"><ul class="answers list-unstyled text-center"></ul></div></div>'
    $(".drag_drop .totalPairs").append(allRows)
    let allQuestions = '<div class="all_questions row"></div>'
    let allAnswers = '<div class="all_answers row"></div>'
    $(".drag_drop .totalPairs").append(allQuestions).append(allAnswers)

    json_input_question["pairs"].forEach(element => {
        if (element["question_image"] != undefined && element["question_text"] != "") {
            $(".drag_drop .totalPairs .all_questions").prepend('<div class="col-12 col-sm-4 col-md-3"><div class="question"><img class="img-fluid question_img" src="' + element["question_image"] + '" alt="' + element["question_image_name"] + '"><span class="question_text">' + element["question_text"] + '</span><div class="question_answer empty"></div></div>')
        } else if (element["question_image"] != undefined) {
            $(".drag_drop .totalPairs .all_questions").prepend('<div class="col-12 col-sm-4 col-md-3"><div class="question"><img class="img-fluid question_img" src="' + element["question_image"] + '"  alt="' + element["question_image_name"] + '"><div class="question_answer empty"></div></div>')
        } else if (element["question_text"] != "") {
            $(".drag_drop .totalPairs .all_questions").prepend('<div class="col-12 col-sm-4 col-md-3"><div class="question"><span class="question_text">' + element["question_text"] + '</span><div class="question_answer empty"></div></div>')
        }
    })
    shuffleElements(json_input_question["pairs"])
    json_input_question["pairs"].forEach(element => {
        if (element["answer_image"] != undefined && element["answer_text"] != "") {
            $(".drag_drop .totalPairs .all_answers").prepend('<div class="answer" draggable="false" style="cursor:default"><img class="img-fluid answer_img" src="' + element["answer_image"] + '" class="answer_img" alt="' + element["answer_image_name"] + '"><span class="answer_text">' + element["answer_text"] + '</span></div>')
        } else if (element["answer_image"] != undefined) {
            $(".drag_drop .totalPairs .all_answers").prepend('<div class="answer" draggable="false" style="cursor:default"><img class="img-fluid answer_img" src="' + element["answer_image"] + '" class="answer_img" alt="' + element["answer_image_name"] + '"></div>')
        } else if (element["answer_text"] != "") {
            $(".drag_drop .totalPairs .all_answers").prepend('<div class="answer" draggable="false" style="cursor:default"><span class="answer_text">' + element["answer_text"] + '</span></div>')
        }
    });


    json_input["pairs"]["pairs"].forEach(element => {

        if (element["question_text"]) {
            var question = $(".question_text:contains(" + element["question_text"] + ")").siblings(".question_answer")
        } else if (element["question_image_name"]) {
            var question = $(".question_img[alt=" + element["question_image_name"] + "]").siblings(".question_answer")
        }

        if (element["answer_text"]) {
            var answer = $(".answer_text:contains(" + element["answer_text"] + ")").parents(".answer")
        } else if (element["answer_image_name"]) {
            var answer = $(".answer_img[alt=" + element["answer_image_name"] + "]").parents(".answer")
        }
        setTimeout(function() {
            if (question != undefined && answer != undefined) {
                question.append(answer);
            }
        }, 500)
    })

    setTimeout(() => {
        json_input_question["pairs"].forEach(element => {
            if (element["question_text"]) {
                var questionCheck = $(".question_text:contains(" + element["question_text"] + ")").siblings(".question_answer")
            } else if (element["question_image"]) {
                var questionCheck = $(".question_img[alt=" + element["question_image_name"] + "]").siblings(".question_answer")
            }
            if (element["answer_text"]) {
                var answerCheck = $(".answer_text:contains(" + element["answer_text"] + ")")
            } else if (element["answer_image"]) {
                var answerCheck = $(".answer_img[alt=" + element["answer_image_name"] + "]")
            }
            if (questionCheck.find(answerCheck).length) {
                questionCheck.parents(".question").css("background-color", "#1BC5BD")
            } else {
                questionCheck.parents(".question").css("background-color", "#F64E60")
            }
        });
    }, 500);


    $("#submitReview").on("click", function() {
        outputJSON = JSON.stringify({ "teacher_review": $("#teacherReview").val() })
        console.log(outputJSON);
    })

})