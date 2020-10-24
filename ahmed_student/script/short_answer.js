$(function () {
  // disable right click
  $(document).on('contextmenu', e => e.preventDefault());

  // JSON input
  var json_input = {"academic_id":"1","academic_year":"2020 - 2021","grade_id":"","grade_name":"","subject_id":"","subject_name":"","topic_name":"","filter_tags":[],"question_html":"What's the color of banana ??","question_details":"<p>Explain it</p>","allow_rich_text":true,"allow_attachment":true,"maximum_marks":"15","words_count_limit":"10","maximum_time":"10","question_images":{}}

  // starter worder count
  $(".wordsCount").text(`${json_input.words_count_limit} Words Left`);

  // add time alert
  setInterval(function(){
    let minutes = $(".countdown").text().split(":")[1]
    minutes < 1 ? $(".alert-danger").css("display","block") : $(".alert-danger").css("display","none")
  }, 1000);

  // set question text
  $(".questionText").html(json_input.question_html)
  $(".questionDetails").html(json_input.question_details)

  // set answer text area
  if (json_input.allow_rich_text) {
    $("#answerSummernote").siblings("textarea").css("display","none")
    $('.note-editor .note-editable').on("keyup", function() {
      var words = $(this).html().split('</p><p>').join(' ').split(" ");
      $(".wordsCount").text(`${json_input.words_count_limit - words.length} Words Left`);
    });
  } else {
    $("#answerSummernote").siblings(".note-editor.note-frame.card").css("display","none")
    $("#answerSummernote").siblings("textarea").on("keyup", function() {
      var words = $(this).val().split(' ');
      $(".wordsCount").text(`${json_input.words_count_limit - words.length} Words Left`);
    });
  }

  // set attachment
  if (!json_input.allow_attachment) {
    $("#answerAttachments").css("display","none")
  }

  
  
  // make json 
  $("#submitAnswer").on("click",function () {

    var answerText = json_input.allow_rich_text ? $('#answerSummernote').siblings(".note-editor").find(".note-editable.card-block").html(): $('#answerSummernote').siblings("textarea").val();
    
    // Make Screenshot
    html2canvas(document.getElementById("answer"),{"y":"140", "imageTimeout":0}).then(function(canvas) {

      output = {
        "answer_text" : answerText,
        "screenshot" : canvas.toDataURL()
      }
      outputJSON = JSON.stringify(output)
      console.log(output);

     });
  })

})