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

  // Sorting According Orders
  function compareElements(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }

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

  // check question type
  if (json_input.display_type == "image") {
    let allQuestions = '<div class="all_questions row"></div>'
    let allAnswers = '<div class="all_answers row"></div>'
    $(".drag_drop .totalPairs").append(allQuestions).append(allAnswers)

    json_input["pairs"].forEach(element => {
      if (element["question_image"] != undefined && element["question_text"] != "") {
        $(".drag_drop .totalPairs .all_questions").prepend('<div class="col-12 col-sm-4 col-md-3"><div class="question"><img class="img-fluid question_img" src="' + element["question_image"] + '" alt="' + element["question_image_name"] + '"><span class="question_text">' + element["question_text"] + '</span><div class="question_answer empty"></div></div>')
      } else if (element["question_image"] != undefined) {
        $(".drag_drop .totalPairs .all_questions").prepend('<div class="col-12 col-sm-4 col-md-3"><div class="question"><img class="img-fluid question_img" src="' + element["question_image"] + '"  alt="' + element["question_image_name"] + '"><div class="question_answer empty"></div></div>')
      } else if (element["question_text"] != "") {
        $(".drag_drop .totalPairs .all_questions").prepend('<div class="col-12 col-sm-4 col-md-3"><div class="question"><span class="question_text">' + element["question_text"] + '</span><div class="question_answer empty"></div></div>')
      }
    })
    if (json_input["rondomize_options"]) {
      shuffleElements(json_input["pairs"])
    }
    json_input["pairs"].forEach(element => {
      if (element["answer_image"] != undefined && element["answer_text"] != "") {
        $(".drag_drop .totalPairs .all_answers").prepend('<div class="answer" draggable="true"><img class="img-fluid answer_img" src="' + element["answer_image"] + '" class="answer_img" alt="' + element["answer_image_name"] + '"><span class="answer_text">' + element["answer_text"] + '</span></div>')
      } else if (element["answer_image"] != undefined) {
        $(".drag_drop .totalPairs .all_answers").prepend('<div class="answer" draggable="true"><img class="img-fluid answer_img" src="' + element["answer_image"] + '" class="answer_img" alt="' + element["answer_image_name"] + '"></div>')
      } else if (element["answer_text"] != "") {
        $(".drag_drop .totalPairs .all_answers").prepend('<div class="answer" draggable="true"><span class="answer_text">' + element["answer_text"] + '</span></div>')
      }
    });

    // drag and drop functionality
    $(".answer").on("dragstart", function () {
      $(this).addClass("drag");
      $.each($(".all_questions .question_answer"), function () {
        if ($(this).find(".answer").length == 0) {
          $(this).css("box-shadow", "0 0 0 0.2rem rgb(0 0 0 / 50%")
        }
      })
    })
    $(".answer").on("touchstart", function () {
      $(this).addClass("drag");
      $.each($(".all_questions .question_answer"), function () {
        if ($(this).find(".answer").length == 0) {
          $(this).css("box-shadow", "0 0 0 0.2rem rgb(0 0 0 / 50%")
        }
      })
    })
    $(".answer").on("dragend", function () {
      $(this).removeClass("drag");
      $(".all_questions .question_answer").css("box-shadow", "none")
    })

    $(".question_answer").each(function () {
      $(this).on("dragenter", function (e) {
        e.preventDefault();
        if ($(this).find(".answer").length == 0) {
          $(this).append($(".answer.drag"))
        }
      })
      $(this).on("dragleave", function (e) {
        e.preventDefault();
      })
      $(this).on("dragover", function (e) {
        e.preventDefault();
      })
      $(this).on("drop", function (e) {
        e.preventDefault();
        if ($(this).find(".answer").length != 0) {
          $(".all_answers").append($(this).find(".answer"))
          $(this).append($(".answer.drag"))
        }
      })
    })
    $(".all_answers").each(function () {
      $(this).on("dragenter", function (e) {
        e.preventDefault();
        $(this).append($(".answer.drag"))
      })
      $(this).on("dragleave", function (e) {
        e.preventDefault();
      })
      $(this).on("dragover", function (e) {
        e.preventDefault();
      })
      $(this).on("drop", function (e) {
        e.preventDefault();
      })
    })



  } else if (json_input.display_type == "line") {
    $("#questionNote h4").text("Match the Equivalent Elements Together")
    let allRows = '<div class="row lineMatchingDiv"><div class="col-4"><ul class="questions list-unstyled text-center"></ul></div><div class="offset-4 col-4"><ul class="answers list-unstyled text-center"></ul></div></div>'
    var num = 1
    $(".drag_drop .totalPairs").append(allRows)
    json_input["pairs"].forEach(element => {
      if (element["question_image"] != undefined && element["question_text"] != "") {
        $(".drag_drop .questions").append('<li class="question row" id="question' + num + '"><img class="col-4 question_img img-fluid" src="' + element["question_image"] + '" alt="' + element["question_image_name"] + '"><span class="col-8 question_text">' + element["question_text"] + '</span></li>')
      } else if (element["question_image"] != undefined) {
        $(".drag_drop .questions").append('<li class="question row" id="question' + num + '"><img class="col-12 question_img img-fluid" src="' + element["question_image"] + '" alt="' + element["question_image_name"] + '"></li>')
      } else if (element["question_text"] != "") {
        $(".drag_drop .questions").append('<li class="question row" id="question' + num + '"><span class="col-12 question_text">' + element["question_text"] + '</span></li>')
      }
      num += 1
    })

    if (json_input["rondomize_options"]) {
      shuffleElements(json_input["pairs"])
    }

    json_input["pairs"].forEach(element => {
      if (element["answer_image"] != undefined && element["answer_text"] != "") {
        $(".drag_drop .answers").append('<li class="answer row" id="answer' + num + '"><span class="col-8 answer_text">' + element["answer_text"] + '</span><img class="col-4 img-fluid answer_img" src="' + element["answer_image"] + '" alt="' + element["answer_image_name"] + '"></li>')
      } else if (element["answer_image"] != undefined) {
        $(".drag_drop .answers").append('<li class="answer row" id="answer' + num + '"><img class="col-12 img-fluid answer_img" src="' + element["answer_image"] + '" alt="' + element["answer_image_name"] + '"></li>')
      } else if (element["answer_text"] != "") {
        $(".drag_drop .answers").append('<li class="answer row" id="answer' + num + '"><span class="col-12 answer_text">' + element["answer_text"] + '</span></li>')
      }
      num += 1

    })

    // add line functionality
    var colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
    var curMousePos = { x: 0, y: 0 }

    function connect(question, answer, color) {
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
      var htmlLine = "<div data-ques_id=" + question[0].id + " class= 'moving_line' data-answ_id=" + answer[0].id + " style='padding:0px; margin:0px; height:5px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);z-index:2'><span class='arrow' style='border-color:" + color + "'></span></div>";
      $("body").append(htmlLine)
    }

    function connectMouse(question, color) {
      var x1 = getOffsetQuestion(question).x;
      var y1 = getOffsetQuestion(question).y;
      var x2 = curMousePos.x;
      var y2 = curMousePos.y;
      // distance
      var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))) - 5;
      // center
      var cx = ((x1 + x2) / 2) - (length / 2);
      var cy = ((y1 + y2) / 2) - 2.5;
      // angle
      var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
      // make hr
      var htmlLine = "<div data-mouse_ques_id=" + question[0].id + " class= 'moving_line' style='padding:0px; margin:0px; height:5px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg); z-index:1'><span class='arrow' style='border-color:" + color + "'></span></div>";
      $("body").append(htmlLine)

    }


    // get location of the begining and end of arrows
    function getOffsetQuestion(el) {
      return {
        x: el.offset().left + el.outerWidth(),
        y: (el.offset().top + (el.outerHeight() / 2) - 2.5)
      }
    }
    function getOffsetAnswer(el) {
      return {
        x: el.offset().left,
        y: (el.offset().top + (el.outerHeight() / 2) - 2.5)
      }
    }

    $(".question").click(function () {
      // choose random color
      $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
      let randomNumber = Math.floor(Math.random() * colors.length)
      let randomColor = colors[randomNumber]
      colors.splice(randomNumber, 1)
      if (colors.length == 0) {
        colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#bdc3c7", "#95a5a6", "#7f8c8d"]
      }

      // change the status of the question
      if ($(".question.selected").length > 0 && $(".answer.selected").length > 0) {
        $(".question.selected").removeClass("selected").addClass("done")
        $(".answer.selected").removeClass("selected").addClass("done")
      }
      $(this).toggleClass("selected")
      if ($(this).hasClass("selected")) {
        $(".answer[id=" + $("div[data-ques_id='" + $(this).attr("id") + "']").data("answ_id") + "]").removeClass("selected").removeClass("done").css("border-color", "#ddd")
        $("div[data-ques_id='" + $(this).attr("id") + "']").remove()
        $(this).css("border-color", randomColor)
        $(this).siblings(":not(.done)").removeClass("selected").css("border-color", "#ddd")
      } else {
        $(this).css("border-color", "#ddd")
      }
      $(document).on("mousemove", function (e) {
        curMousePos.x = e.pageX
        curMousePos.y = e.pageY
        $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
        connectMouse($(".question.selected"), $(".question.selected")[0].style.borderColor);
      })
    })

    $(".answer").click(function () {
      $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
      $(document).off("mousemove")
      if ($(".question.selected").length > 0) {
        $("div[data-mouse_ques_id='" + $(".question.selected").attr("id") + "']").remove()
        // change the status of the question
        $(this).toggleClass("selected")
        $("div[data-ques_id='" + $(".question.selected").attr("id") + "']").remove()
        connect($(".question.selected"), $(this), $(".question.selected")[0].style.borderColor);

        if ($(this).hasClass("selected")) {
          $(this).css("border-color", $(".question.selected")[0].style.borderColor)
          $(this).siblings(":not(.done)").removeClass("selected").css("border-color", "#ddd")

        } else {
          $(this).css("border-color", "#ddd")
          $("div[data-answ_id='" + $(this).siblings(".selected").attr("id") + "']").remove()
          $("div[data-answ_id='" + $(this).attr("id") + "']").remove()
        }
      }
      if ($(this).hasClass("done")) {
        $(this).removeClass("done").removeClass("selected").css("border-color", "#ddd")
        $(".question[id='" + $("div[data-answ_id='" + $(this).attr("id") + "']").data("ques_id") + "']").removeClass("done , selected").css("border-color", "#ddd")
        $("div[data-answ_id='" + $(this).attr("id") + "']").remove()
      }
    })

  }

  var data = {}

  $("#submitAnswer").on("click", function () {
    if (json_input.display_type == "image") {
      var pairs = []

      for (let i = 0; i < $(".question").length; i++) {
        let pair = {}
        pair = {
          "question_image_name": $(".question").eq(i).find(".question_img").attr("alt"),
          "question_image": $(".question").eq(i).find(".question_img").attr("src"),
          "question_text": $(".question").eq(i).find(".question_text").text(),
          "answer_image_name": $(".question").eq(i).find(".answer_img").attr("alt"),
          "answer_image": $(".question").eq(i).find(".answer_img").attr("src"),
          "answer_text": $(".question").eq(i).find(".answer_text").text()
        }
        pairs.push(pair)
      }
      data["pairs"] = pairs
    } else if (json_input.display_type == "line") {
      var pairs = []

      for (let i = 0; i < $(".question").length; i++) {
        let pair = {}
        let answer_id = $(".moving_line[data-ques_id=" + $(".question").eq(i).attr("id") + "]").data("answ_id")
        pair = {
          "question_image_name": $(".question").eq(i).find(".question_img").attr("alt"),
          "question_image": $(".question").eq(i).find(".question_img").attr("src"),
          "question_text": $(".question").eq(i).find(".question_text").text(),
          "answer_image_name": $(".answer[id=" + answer_id + "]").find(".answer_img").attr("alt"),
          "answer_image": $(".answer[id=" + answer_id + "]").find(".answer_img").attr("src"),
          "answer_text": $(".answer[id=" + answer_id + "]").find(".answer_text").text()
        }
        pairs.push(pair)
      }
      data["pairs"] = pairs
    }


    // Make Screenshot
    html2canvas(document.getElementById("kt_body"), { "imageTimeout": 0 }).then(function (canvas) {

      output = {
        "pairs": data,
        "screenshot": canvas.toDataURL()
      }
      outputJSON = JSON.stringify(output)
      console.log(output);

    });
  })
  // })

})