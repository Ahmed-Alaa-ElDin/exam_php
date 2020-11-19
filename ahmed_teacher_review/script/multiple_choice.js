$(function () {
  $('#loading').fadeOut();

  // disable right click
  $(document).on('contextmenu', e => e.preventDefault());

  // JSON input

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

  // Sorting Rondom
  function shuffleElements(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
  $(".questionText").html(json_input.question_html)
  $(".questionDetails").html(json_input.question_details)

  // set attachment
  if (!json_input.allow_attachment) {
    $("#answerAttachments").css("display", "none")
  }

  var choices = json_input.choices

  // Check Randomization
  if (json_input.rondomize_options) {
    shuffleElements(choices)
  }

  // set choices
  for (var i = 0; i < choices.length; i++) {
    let choiceBox = "<label class='checkbox' data-val='" + choices[i]["text"] + "'><div class='choiceBox row'></div></label>"
    let checkboxInput = `<input type="checkbox" name="multiChoice"/><span></span>`

    // Image & Text
    if (choices[i]["image"] != undefined && choices[i]["text"] != "") {
      $(".totalChoices").append(choiceBox)
      let choiceImg = "<div class='col-4 choiceImg'><img class='img-fluid' src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
      let choiceText = "<div class='col-8 choiceText'>" + choices[i]["text"] + "</div>"
      $(".totalChoices .choiceBox").last().append(choiceImg).append(choiceText)
    } else if (choices[i]["image"] != undefined) {
      $(".totalChoices").append(choiceBox)
      let choiceImg = "<div class=' col-4 choiceImg'><img class='img-fluid' src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
      $(".totalChoices .choiceBox").last().append(choiceImg)
    } else if (choices[i]["text"] != "") {
      $(".totalChoices").append(choiceBox)
      let choiceText = "<div class='col-12 choiceText'>" + choices[i]["text"] + "</div>"
      $(".totalChoices .choiceBox").last().append(choiceText)
    }
    $(".totalChoices label.checkbox").last().append(checkboxInput)
  }

  // edit choice color
  $("input[name='multiChoice']").on("change", function () {
    $(this).prop('checked') ? $(this).parents(".checkbox").css("border-color", "#3699ff") : $(this).parents(".checkbox").css("border-color", "#ebedf3")
  })

  // make json 
  $("#submitAnswer").on("click", function () {
    var choices = []

    $(".multiple_choice .totalChoices .checkbox").each(function () {

      let choice = {}

      choice["image_name"] = $(this).find(".choiceImg").find("img").attr("alt")
      choice["image"] = $(this).find(".choiceImg").find("img").attr("alt")
      choice["text"] = $(this).find(".choiceText").text()
      choice["true-false"] = $(this).find("input[type='checkbox']").prop("checked")

      choices.push(choice)
    })

    // Make Screenshot
    html2canvas(document.getElementById("answer"), { "y": "140", "imageTimeout": 0 }).then(function (canvas) {

      output = {
        "choices": choices,
        "screenshot": canvas.toDataURL()
      }
      outputJSON = JSON.stringify(output)
      console.log(output);

    });

  })

})