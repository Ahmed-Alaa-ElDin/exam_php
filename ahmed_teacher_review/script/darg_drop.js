$(function () {
    $('#loading').fadeOut();

    // JSON input  
    var json_input_question = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "", "subject_name": "", "topic_name": "", "filter_tags": [], "question_html": "وصل الحاجات ببعضها", "question_details": "<p>Try to match similar items together</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "20", "maximum_time": "1", "display_type": "line", "question_images": {}, "pairs": [{ "question_image_name": "ball.png", "question_image": "ahmed_teacher_review/img/ball.png", "question_text": "Ball", "answer_text": "كرة" }, { "question_text": "قطة", "answer_image_name": "cat.png", "answer_image": "ahmed_teacher_review/img/cat.png", "answer_text": "Cat" }, { "question_image_name": "frog.png", "question_image": "ahmed_teacher_review/img/frog.png", "question_text": "Frog", "answer_text": "Frog" }, { "question_text": "شنطة", "answer_text": "Bag" }] }

    // var json_input = { "pairs": { "pairs": [{ "question_image_name": "ball.png", "question_image": "ahmed_teacher_review/img/ball.png", "question_text": "Ball", "answer_image": "", "answer_text": "Bag" }, { "question_image": "", "question_text": "قطة", "answer_image_name": "cat.png", "answer_image": "ahmed_teacher_review/img/cat.png", "answer_text": "Cat" }, { "question_image_name": "frog.png", "question_image": "ahmed_teacher_review/img/frog.png", "question_text": "ضفدع", "answer_image_name": "frog.png", "answer_image": "ahmed_teacher_review/img/frog.png", "answer_text": "Frog" }, { "question_image": "", "question_text": "شنطة", "answer_image": "", "answer_text": "كرة" }] }, "screenshot": "canvas.toDataURL()" }

    var json_input = {
        "pairs": {
            "pairs": [
                {
                    "question_image_name": "ball.png",
                    "question_image": "ahmed_teacher_review/img/ball.png",
                    "question_text": "Ball",
                    "answer_image_name": "cat.png",
                    "answer_image": "ahmed_teacher_review/img/cat.png",
                    "answer_text": "Cat"
                },
                {
                    "question_text": "قطة",
                    "answer_image_name": "frog.png",
                    "answer_image": "ahmed_teacher_review/img/frog.png",
                    "answer_text": "Frog"
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
        }, "screenshot": "canvas.toDataURL()"
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

    // add line functionality
    var colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]

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

        let randomNumber = Math.floor(Math.random() * colors.length)
        let randomColor = colors[randomNumber]
        colors.splice(randomNumber, 1)
        if (colors.length == 0) {
            colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
        }

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
        setTimeout(function () {
            if (question != undefined && answer != undefined) {
                connect(question, answer, randomColor);
                question.css("border-color", randomColor)
                answer.css("border-color", randomColor)
            }
        }, 500)
    })


    // $(".question").click(function () {
    //     // choose random color
    //     $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
    //     let randomNumber = Math.floor(Math.random() * colors.length)
    //     let randomColor = colors[randomNumber]
    //     colors.splice(randomNumber, 1)
    //     if (colors.length == 0) {
    //         colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
    //     }

    //     // change the status of the question
    //     if ($(".question.selected").length > 0 && $(".answer.selected").length > 0) {
    //         $(".question.selected").removeClass("selected").addClass("done")
    //         $(".answer.selected").removeClass("selected").addClass("done")
    //     }
    //     $(this).toggleClass("selected")
    //     if ($(this).hasClass("selected")) {
    //         $(".answer[id=" + $("div[data-ques_id='" + $(this).attr("id") + "']").data("answ_id") + "]").removeClass("selected").removeClass("done").css("border-color", "#ddd")
    //         $("div[data-ques_id='" + $(this).attr("id") + "']").remove()
    //         $(this).css("border-color", randomColor)
    //         $(this).siblings(":not(.done)").removeClass("selected").css("border-color", "#ddd")
    //     } else {
    //         $(this).css("border-color", "#ddd")
    //     }
    //     $(document).on("mousemove", function (e) {
    //         curMousePos.x = e.pageX
    //         curMousePos.y = e.pageY
    //         $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
    //         connectMouse($(".question.selected"), $(".question.selected")[0].style.borderColor);
    //     })

    // })

    // $(".answer").click(function () {
    //     $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
    //     $(document).off("mousemove")
    //     if ($(".question.selected").length > 0) {
    //         $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
    //         // change the status of the question
    //         $(this).toggleClass("selected")
    //         $("div[data-ques_id='" + $(".question.selected").attr("id") + "']").remove()
    //         connect($(".question.selected"), $(this), $(".question.selected")[0].style.borderColor);

    //         if ($(this).hasClass("selected")) {
    //             $(this).css("border-color", $(".question.selected")[0].style.borderColor)
    //             $(this).siblings(":not(.done)").removeClass("selected").css("border-color", "#ddd")

    //         } else {
    //             $(this).css("border-color", "#ddd")
    //             $("div[data-answ_id='" + $(this).siblings(".selected").attr("id") + "']").remove()
    //             $("div[data-answ_id='" + $(this).attr("id") + "']").remove()
    //         }
    //     }
    //     if ($(this).hasClass("done")) {
    //         $(this).removeClass("done").removeClass("selected").css("border-color", "#ddd")
    //         $(".question[id='" + $("div[data-answ_id='" + $(this).attr("id") + "']").data("ques_id") + "']").removeClass("done , selected").css("border-color", "#ddd")
    //         $("div[data-answ_id='" + $(this).attr("id") + "']").remove()
    //     }
    // })

    // }

    var data = {}

    // $("#submitAnswer").on("click", function () {
    //     if (json_input.display_type == "image") {
    //         var pairs = []

    //         for (let i = 0; i < $(".question").length; i++) {
    //             let pair = {}
    //             pair = {
    //                 "question_image_name": $(".question").eq(i).find(".question_img").attr("alt"),
    //                 "question_image": $(".question").eq(i).find(".question_img").attr("src"),
    //                 "question_text": $(".question").eq(i).find(".question_text").text(),
    //                 "answer_image_name": $(".question").eq(i).find(".answer_img").attr("alt"),
    //                 "answer_image": $(".question").eq(i).find(".answer_img").attr("src"),
    //                 "answer_text": $(".question").eq(i).find(".answer_text").text()
    //             }
    //             pairs.push(pair)
    //         }
    //         data["pairs"] = pairs
    //     } else if (json_input.display_type == "line") {
    //         var pairs = []

    //         for (let i = 0; i < $(".question").length; i++) {
    //             let pair = {}
    //             let answer_id = $(".moving_line[data-ques_id=" + $(".question").eq(i).attr("id") + "]").data("answ_id")
    //             pair = {
    //                 "question_image_name": $(".question").eq(i).find(".question_img").attr("alt"),
    //                 "question_image": $(".question").eq(i).find(".question_img").attr("src"),
    //                 "question_text": $(".question").eq(i).find(".question_text").text(),
    //                 "answer_image_name": $(".answer[id=" + answer_id + "]").find(".answer_img").attr("alt"),
    //                 "answer_image": $(".answer[id=" + answer_id + "]").find(".answer_img").attr("src"),
    //                 "answer_text": $(".answer[id=" + answer_id + "]").find(".answer_text").text()
    //             }
    //             pairs.push(pair)
    //         }
    //         data["pairs"] = pairs
    //     }


    //     // Make Screenshot
    //     html2canvas(document.getElementById("kt_body"), { "imageTimeout": 0 }).then(function (canvas) {

    //         output = {
    //             "pairs": data,
    //             "screenshot": canvas.toDataURL()
    //         }
    //         outputJSON = JSON.stringify(output)
    //         console.log(outputJSON);

    //     });
    // })
    // })

})