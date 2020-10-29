$(function () {
  // disable right click
  $(document).on('contextmenu', e => e.preventDefault());

  // JSON input
  var json_input = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "", "subject_name": "", "topic_name": "", "filter_tags": [], "question_html": "complete the following statement ", "question_details": "<p>Hello there;</p><p>I'm <span data-num=\"1\" class=\"btn btn-primary removeSpan\"> ((1)) </span>&nbsp; from <span data-num=\"2\" class=\"btn btn-primary removeSpan\"> ((2)) </span>&nbsp;I love <span data-num=\"3\" class=\"btn btn-primary removeSpan\"> ((3)) </span>&nbsp; &amp; <span data-num=\"4\" class=\"btn btn-primary removeSpan\"> ((4)) </span>&nbsp;</p><p>Thank you for your time</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "5", "maximum_time": "6", "question_images": {}, "answers": [{ "answer_text": "Ahmed Alaa", "answer_number": 1 }, { "answer_text": "Egypt", "answer_number": 2 }, { "answer_text": "Computer Science", "answer_number": 3 }, { "answer_text": "Football", "answer_number": 4 }] }

  // set question text
  $(".questionText").html(json_input.question_html)
  $(".questionDetails").html(json_input.question_details)

  // set attachment
  if (!json_input.allow_attachment) {
    $("#answerAttachments").css("display", "none")
  }

  // Set Question Text
  $(".questionText").append(json_input.question_html)
  $(".studentFilling").append(json_input.question_details)
  // Set Elements             
  $(".studentFilling span").each(function (i) {
    $(this).replaceWith(`<input type='text' class='form-control placeholder' id='placeholder${i + 1}' data-num='${i + 1}' style="display:inline-block; width:auto; margin: 1px auto; height: 35px;">`)
  })

  var blanks = []
  $("#submitAnswer").on("click", function () {
    var blank = {}
    for (let i = 0; i < $(".studentFilling .placeholder").length; i++) {
      blank = {}
      blank["blank_num"] = $(".studentFilling .placeholder").eq(i).data("num")
      blank["blank_filler"] = $(".studentFilling .placeholder").eq(i).val()
      blanks.push(blank)
    }

    // Make Screenshot
    html2canvas(document.getElementById("kt_body"), { "imageTimeout": 0 }).then(function (canvas) {

      output = {
        "blanks": blanks,
        "screenshot": canvas.toDataURL()
      }
      outputJSON = JSON.stringify(output)
      console.log(output);
    });
  })

})