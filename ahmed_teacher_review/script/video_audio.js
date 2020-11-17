$(function () {
  $('#loading').fadeOut();

  // disable right click
  $(document).on('contextmenu', e => e.preventDefault());

  // JSON input
  var json_input = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "", "subject_name": "", "topic_name": "", "filter_tags": [], "question_html": "See the Video & give opinion", "question_details": "<p style=\"text-align: center; \">See the video below</p><p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/59NLR252fFw\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>", "allow_attachment": true, "maximum_marks": "5", "maximum_time": "15", "question_uploads": {} }

  // check question language
  if (json_input.subject_id == "0" || json_input.subject_id == "2") {
    $(".questionText").css({ "font-size": "46px", "display": "inline-block", "width": "94%", "text-align": "right" }).attr("dir", "rtl")
    $(".questionDetails").css({ "font-size": "46px", "display": "inline-block", "width": "100%", "text-align": "right" }).attr("dir", "rtl")
  }

  // add time alert
  setInterval(function () {
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

  // make json 
  $("#submitAnswer").on("click", function () {

    var answerText = $("#answerTextarea").val();

    // Make Screenshot
    html2canvas(document.getElementById("answer"), { "y": "140", "imageTimeout": 0 }).then(function (canvas) {

      output = {
        "answer_text": answerText,
        "screenshot": canvas.toDataURL()
      }
      outputJSON = JSON.stringify(output)
      console.log(output);

    });
  })

})