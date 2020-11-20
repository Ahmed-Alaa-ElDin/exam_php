$(function() {
    $('#loading').fadeOut();

    // JSON input
    var json_input_teacher = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "", "subject_name": "", "topic_name": "", "filter_tags": [], "question_html": "complete the following statement ", "question_details": "<p>Hello there;</p><p>I'm <span data-num=\"1\" class=\"btn btn-primary removeSpan\"> ((1)) </span>&nbsp; from <span data-num=\"2\" class=\"btn btn-primary removeSpan\"> ((2)) </span>&nbsp;I love <span data-num=\"3\" class=\"btn btn-primary removeSpan\"> ((3)) </span>&nbsp; &amp; <span data-num=\"4\" class=\"btn btn-primary removeSpan\"> ((4)) </span>&nbsp;</p><p>Thank you for your time</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "5", "maximum_time": "6", "question_images": {}, "answers": [{ "answer_text": "Ahmed", "answer_number": 1 }, { "answer_text": "Egypt", "answer_number": 2 }, { "answer_text": "Computer Science", "answer_number": 3 }, { "answer_text": "Football", "answer_number": 4 }] }

    var json_input = { "blanks": [{ "blank_num": 1, "blank_filler": "Ahmed " }, { "blank_num": 2, "blank_filler": "Egypt" }, { "blank_num": 3, "blank_filler": "PHP" }, { "blank_num": 4, "blank_filler": "Python" }], "screenshot": "" }

    // check question language
    if (json_input_teacher.subject_id == "0" || json_input_teacher.subject_id == "2") {
        $(".questionText").css({ "font-size": "46px", "display": "inline-block", "width": "94%", "text-align": "right" }).attr("dir", "rtl")
    }

    // set question text
    $(".questionText").html(json_input_teacher.question_html)
    $(".questionDetails").html(json_input_teacher.question_details)

    // Set Question Text
    $(".questionText").append(json_input_teacher.question_html)
    $(".studentFilling").append(json_input_teacher.question_details)

    // Set Elements             
    $(".studentFilling span").each(function(i) {
        $(this).replaceWith(`<span class='form-control placeholder' id='placeholder${i}' data-num='${i}' style="display:inline-block; width:auto; margin: 1px auto; height: 35px;">${json_input["blanks"][i]["blank_filler"]}</span>`)
    })

    var totalMarks = json_input_teacher.answers.length;
    var studentMarks = 0;

    for (let i = 0; i < json_input_teacher.answers.length; i++) {
        if (json_input["blanks"][i]["blank_filler"].toLowerCase() == json_input_teacher.answers[i].answer_text.toLowerCase()) {
            $(`span[id='placeholder${i}']`).css({ "background-color": "#1BC5BD", "color": "#fff" })
            studentMarks += 1
        } else {
            $(`span[id='placeholder${i}']`).css({ "background-color": "#F64E60", "color": "#fff" })
        }
    }
    $(".studentMarks").text(`${studentMarks} of ${totalMarks}`)

    $("#submitAnswer").on("click", function() {
        outputJSON = JSON.stringify({
            "teacher_review": $("#teacherReview").val(),
            "teacher_marks": $(".teacherMarks").val()
        })
        console.log(outputJSON);

    })

})