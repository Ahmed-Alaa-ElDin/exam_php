$(function() {
    $('#loading').fadeOut();

    // JSON input
    var json_input_teacher = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "", "subject_name": "", "topic_name": "", "filter_tags": [], "question_html": "Which of the following are animals ??", "question_details": "<p>Are you sure</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "10", "maximum_time": "50", "question_images": {}, "choices": [{ "image_name": "monkey.png", "image": "ahmed_teacher_review/img/monkey.png", "text": "قرد", "true-false": true }, { "image_name": "hourse.png", "image": "ahmed_teacher_review/img/hourse.png", "text": "Hoarse ", "true-false": true }, { "image_name": "elephant.png", "image": "ahmed_teacher_review/img/elephant.png", "text": "", "true-false": false }, { "text": "Cat", "true-false": true }] }

    var json_input = { "choices": [{ "image_name": "elephant.png", "image": "elephant.png", "text": "", "true-false": true }, { "text": "Cat", "true-false": true }, { "image_name": "hourse.png", "image": "hourse.png", "text": "Hoarse ", "true-false": true }, { "image_name": "monkey.png", "image": "monkey.png", "text": "قرد", "true-false": false }] }

    // delete empty text
    json_input_teacher.choices.forEach(element => {
        if (element.text == "") {
            delete element.text
        }
    });
    json_input.choices.forEach(element => {
        if (element.text == "") {
            delete element.text
        }
    });

    // check question language
    if (json_input_teacher.subject_id == "0" || json_input_teacher.subject_id == "2") {
        $(".questionText").css({ "font-size": "46px", "display": "inline-block", "width": "94%", "text-align": "right" }).attr("dir", "rtl")
        $(".questionDetails").css({ "font-size": "46px", "display": "inline-block", "width": "100%", "text-align": "right" }).attr("dir", "rtl")
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
    $(".questionText").html(json_input_teacher.question_html)
    $(".questionDetails").html(json_input_teacher.question_details)

    var choices = json_input_teacher.choices

    shuffleElements(choices)

    // set choices
    for (var i = 0; i < choices.length; i++) {
        let choiceBox = "<label class='checkbox' data-val='" + choices[i]["text"] + "'><div class='choiceBox row'></div></label>"

        var checkboxInput = `<input type="checkbox" name="multiChoice" disabled/><span></span>`

        // Check the Student answers
        for (let x = 0; x < json_input.choices.length; x++) {
            if (json_input.choices[x]["text"] && json_input.choices[x]["text"] == choices[i]["text"] && json_input.choices[x]["true-false"]) {
                var checkboxInput = `<input type="checkbox" name="multiChoice" checked disabled/><span></span>`
            } else if (json_input.choices[x]["image_name"] && json_input.choices[x]["image_name"] == choices[i]["image_name"] && json_input.choices[x]["true-false"]) {
                var checkboxInput = `<input type="checkbox" name="multiChoice" checked disabled/><span></span>`
            }
        }
        // Image & Text
        if (choices[i]["image"] != undefined && choices[i]["text"] != undefined) {
            $(".totalChoices").append(choiceBox)
            let choiceImg = "<div class='col-4 choiceImg'><img class='img-fluid' src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            let choiceText = "<div class='col-8 choiceText'>" + choices[i]["text"] + "</div>"
            $(".totalChoices .choiceBox").last().append(choiceImg).append(choiceText)
        } else if (choices[i]["image"] != undefined) {
            $(".totalChoices").append(choiceBox)
            let choiceImg = "<div class=' col-4 choiceImg'><img class='img-fluid' src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            $(".totalChoices .choiceBox").last().append(choiceImg)
        } else if (choices[i]["text"] != undefined) {
            $(".totalChoices").append(choiceBox)
            let choiceText = "<div class='col-12 choiceText'>" + choices[i]["text"] + "</div>"
            $(".totalChoices .choiceBox").last().append(choiceText)
        }
        $(".totalChoices label.checkbox").last().append(checkboxInput)
    }
    var totalMarks = choices.length
    var studentMarks = 0
    setTimeout(() => {
        for (var i = 0; i < choices.length; i++) {
            // Check the Student answers Right or Wrong
            for (let x = 0; x < json_input.choices.length; x++) {
                if (choices[i]["image_name"] && json_input.choices[x]["image_name"] == choices[i]["image_name"] && json_input.choices[x]["true-false"] === choices[i]["true-false"]) {
                    $(`.choiceImg img[alt='${choices[i]["image_name"]}' ]`).parents(`.checkbox`).css({ "background-color": "#1BC5BD", "color": "#fff" })
                    studentMarks += 1
                    break
                } else if (choices[i]["text"] && choices[i]["text"] !== "" && json_input.choices[x]["text"] == choices[i]["text"] && json_input.choices[x]["true-false"] === choices[i]["true-false"]) {
                    $(`.choiceText:contains(${choices[i]["text"]})`).parents(`.checkbox`).css({ "background-color": "#1BC5BD", "color": "#fff" })
                    studentMarks += 1
                    break
                } else {
                    $(`.choiceImg img[alt='${choices[i]["image_name"]}' ]`).parents(`.checkbox`).css({ "background-color": "#F64E60", "color": "#fff" })
                    $(`.choiceText:contains(${choices[i]["text"]})`).parents(`.checkbox`).css({ "background-color": "#F64E60", "color": "#fff" })
                }
            }
        }
        $(".studentMarks").text(`${studentMarks} of ${totalMarks}`)

    }, 200);

    // make json 
    $("#submitAnswer").on("click", function() {
        outputJSON = JSON.stringify({
            "teacher_review": $("#teacherReview").val(),
            "teacher_marks": $(".teacherMarks").val()
        })
        console.log(outputJSON);
    })

})