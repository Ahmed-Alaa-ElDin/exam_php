$(function(){

  var allImages = {}

  // Set the Dropzones
  Dropzone.autoDiscover = false;

  // Activate Dropzone
  // for Question Attachment
  $("#essayAttachFilesWithQuestion, #mcqAttachFilesWithQuestion, #trueFalseAttachFilesWithQuestion").dropzone({
    url: window.location.href,
    acceptedFiles: "image/*,application/pdf,.doc,.docx",
    addRemoveLinks: true,

    // create base64 image link
    init: function() {
      this.on("addedfile", function (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var base64String = event.target.result;
          var fileName = file.name
          allImages[fileName] = base64String
        };
        reader.readAsDataURL(file);
      });
    }
  });


  // Set functionality upon Question Type Change
  $("#QuestionType").on("change",function () {

    // Disable the Save Form Button
    $("#saveForm").off("click");
    $("#previewButton").off("click");

    $(".question_type").css("display","none");

    // begin:: check if the question is Short Answer/Essay
    if ($(this).val() == 1) {
      // config Question Types Fade in & out
      $("#ShortQuestion").fadeIn()
      // Add Function to Save Form Button
      $("#saveForm").on("click",function () {
        var academicYearID = $("#AcademicYear").val();
        var academicYear = $("#AcademicYear").find("option:selected").text();
        var gradeID = $("#StudentClass").val();
        var gradeName = $("#StudentClass").find("option:selected").text();
        var subjectID = $("#StudentSection").val();
        var subjectName = $("#StudentSection").find("option:selected").text();
        var topicName = $("#topicName").text();
        var filterTags = [];
        $("#FilterTags option").each(function () {
          filterTags.push($(this).val())
        })
        var questionHTML = $('#QuestionEditor').summernote('code')
        var allowRichText = $("#essayAllowRichText").prop("checked")
        var allowAttachment = $("#essayAllowAttach").prop("checked")
        var maximumMarks = $("#essayMaximumMarks").val();
        var wordsCountLimit = $("#essayWordCount").val();
        var maximumTime = $("#essayMaximumTime").val();
        var questionImages = {}
        $("#essayAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })
        var data = {
          "grade_id" : gradeID,
          "grade_name" : gradeName,
          "subject_id" : subjectID,
          "subject_name" : gradeName,
          "topic_name" : subjectName,
          "filter_tags" : filterTags,
          "question_html" : questionHTML,
          "allow_rich_text" : allowRichText,
          "allow_attachment" : allowAttachment,
          "maximum_marks" : maximumMarks,
          "words_count_limit" : wordsCountLimit,
          "maximum_time" : maximumTime,
          "question_images" : questionImages
        }
        var dataJSON = JSON.stringify(data)
        console.log(data);
      })

      $("#previewButton").on("click",function () {

        $(".preview_body").children().remove()

        // set question images
        var questionImage = "<div class='question_images'></div>"
        $(".preview_body").append(questionImage)
        $("#essayAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            let image = "<img src=" + allImages[$(this).find("img").attr("alt")] + " alt=" + $(this).find("img").attr("alt") + ">"
            $(".preview_body .question_images").append(image)
          }
        })

        // set question text
        var questionHTML = $('#QuestionEditor').summernote('code')
        var questionParagraph = "<div class='question_text'>" + $('#QuestionEditor').summernote('code') + "</div>"
        $(".preview_body").append(questionParagraph)

      })

    }
    // end:: check if the question is Short Answer/Essay

    // begin:: check if the question is MultiChoice
    else if ($(this).val() == 2) {

      $("#MultiChoice").fadeIn()

      var mcqAllImages = []

      // config Question Types Fade in & out

      $("#MultiChoice").find("button[data-repeater-create]").on("click",function () {

        // Enable Attachment box
        $("tr[data-repeater-item]").last().find(".MCQAttachments").dropzone({
          url: window.location.href,
          acceptedFiles: "image/*",
          addRemoveLinks: true,
          maxFiles:1,

          // create base64 image link
          init: function() {
            this.on("addedfile", function (file) {
              var reader = new FileReader();
              reader.onload = function(event) {
                var base64String = event.target.result;
                var fileName = file.name
                mcqAllImages[fileName] = base64String
              };
              reader.readAsDataURL(file);
            });
          }
        });
      })

      // handle save form clicking
      $("#saveForm").on("click",function () {
        var academicYearID = $("#AcademicYear").val();
        var academicYear = $("#AcademicYear").find("option:selected").text();
        var gradeID = $("#StudentClass").val();
        var gradeName = $("#StudentClass").find("option:selected").text();
        var subjectID = $("#StudentSection").val();
        var subjectName = $("#StudentSection").find("option:selected").text();
        var topicName = $("#topicName").text();
        var filterTags = [];
        $("#FilterTags option").each(function () {
          filterTags.push($(this).val())
        })

        var questionHTML = $('#QuestionEditor').summernote('code')
        var randomizeOptions = $("#mcqRandomizeOptions").prop("checked")
        var allowAttachment = $("#mcqAllowAttach").prop("checked")
        var allowPartialCredit = $("#mcqAllowPartialCredit").prop("checked")
        var maximumMarks = $("#mcqMaximumMarks").val();
        var maximumTime = $("#mcqMaximumTime").val();

        var questionImages = {}
        $("#mcqAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })

        var choices = []

        $("#MultiChoice table .choice").each(function () {

          let choice = {}

          choice["image_name"] = $(this).find(".dz-success").find("img").attr("alt")
          choice["image"] = mcqAllImages[$(this).find(".dz-success").find("img").attr("alt")]
          choice["text"] = $(this).find(".choice-text").val()
          choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

          choices.push(choice)
        })

        var data = {
          "grade_id" : gradeID,
          "grade_name" : gradeName,
          "subject_id" : subjectID,
          "subject_name" : gradeName,
          "topic_name" : subjectName,
          "filter_tags" : filterTags,
          "question_html" : questionHTML,
          "rondomize_options" : randomizeOptions,
          "allow_attachment" : allowAttachment,
          "allow_partial_credit" : allowPartialCredit,
          "maximum_marks" : maximumMarks,
          "maximum_time" : maximumTime,
          "question_images" : questionImages,
          "choices" : choices
        }
        var dataJSON = JSON.stringify(data)
        console.log(data);
      })

      $("#previewButton").on("click",function () {

        $(".preview_body").children().remove()

        var randomizeOptions = $("#mcqRandomizeOptions").prop("checked")
        var allowAttachment = $("#mcqAllowAttach").prop("checked")
        var allowPartialCredit = $("#mcqAllowPartialCredit").prop("checked")
        var maximumMarks = $("#mcqMaximumMarks").val();
        var maximumTime = $("#mcqMaximumTime").val();

        var choices = []

        // Set Question Images
        var questionImages = {}
        $("#mcqAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })

        var questionImageDiv = "<div class='question_images'></div>"
        $(".preview_body").append(questionImageDiv)

        $.each(questionImages, function(imgName,imgBase64){
          let image = "<img src=" + imgBase64 + " alt=" + imgName + ">"
          $(".preview_body .question_images").append(image)
        })
        // ----------------------------------------------------------

        // Set Question Text
        var questionHTML = $('#QuestionEditor').summernote('code')
        var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
        $(".preview_body").append(questionParagraph)
        // ----------------------------------------------------------



        // Set Choices
        $("#MultiChoice table .choice").each(function () {

          let choice = {}

          choice["image_name"] = $(this).find(".dz-success").find("img").attr("alt")
          choice["image"] = mcqAllImages[$(this).find(".dz-success").find("img").attr("alt")]
          choice["text"] = $(this).find(".choice-text").val()
          choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

          choices.push(choice)
        })


        var totalChoices = "<div class='totalChoices'></div>"
        $(".preview_body").append(totalChoices)


        for (var i = 0; i < choices.length; i++) {
          let choiceBox = "<div class='choiceBox row' data-val='" + choices[i]["text"] + "'></div>"
          // Image & Text
          if (choices[i]["image"] != undefined && choices[i]["text"] != "") {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceImg = "<div class='col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            let choiceText = "<div class='col-8 choiceText'><span>" + choices[i]["text"] + "</span></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append(choiceText)
          } else if (choices[i]["image"] != undefined) {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceImg = "<div class='offset-4 col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg)
          } else if (choices[i]["text"] != "") {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceText = "<div class='col-12 choiceText'><span>" + choices[i]["text"] + "</span></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceText)
          }
        }



        $(".preview_body .totalChoices .choiceBox").on("click", function () {
          $(this).toggleClass("selected")
        })

        // ----------------------------------------------------------


      })
    }
    // end:: check if the question is MultiChoice

    // begin:: check if the question is MultiChoice
    else if ($(this).val() == 3) {

      // config Question Types Fade in & out
      $("#TrueFalse").fadeIn()

      // handle save form clicking
      $("#saveForm").on("click",function () {
        var academicYearID = $("#AcademicYear").val();
        var academicYear = $("#AcademicYear").find("option:selected").text();
        var gradeID = $("#StudentClass").val();
        var gradeName = $("#StudentClass").find("option:selected").text();
        var subjectID = $("#StudentSection").val();
        var subjectName = $("#StudentSection").find("option:selected").text();
        var topicName = $("#topicName").text();
        var filterTags = [];
        $("#FilterTags option").each(function () {
          filterTags.push($(this).val())
        })

        var questionHTML = $('#QuestionEditor').summernote('code')

        var randomizeOptions = $("#trueFalseRandomizeOptions").prop("checked")
        var allowAttachment = $("#trueFalseAllowAttach").prop("checked")
        var allowPartialCredit = $("#trueFalseAllowPartialCredit").prop("checked")
        var maximumMarks = $("#trueFalseMaximumMarks").val();
        var maximumTime = $("#trueFalseMaximumTime").val();

        var questionImages = {}
        $("#trueFalseAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })

        var data = {
          "grade_id" : gradeID,
          "grade_name" : gradeName,
          "subject_id" : subjectID,
          "subject_name" : gradeName,
          "topic_name" : subjectName,
          "filter_tags" : filterTags,
          "question_html" : questionHTML,
          "rondomize_options" : randomizeOptions,
          "allow_attachment" : allowAttachment,
          "allow_partial_credit" : allowPartialCredit,
          "maximum_marks" : maximumMarks,
          "maximum_time" : maximumTime,
          "question_images" : questionImages,
        }
        var dataJSON = JSON.stringify(data)
        console.log(data);
      })

      $("#previewButton").on("click",function () {

        $(".preview_body").children().remove()

        var randomizeOptions = $("#mcqRandomizeOptions").prop("checked")
        var allowAttachment = $("#mcqAllowAttach").prop("checked")
        var allowPartialCredit = $("#mcqAllowPartialCredit").prop("checked")
        var maximumMarks = $("#mcqMaximumMarks").val();
        var maximumTime = $("#mcqMaximumTime").val();

        var choices = []

        // Set Question Images
        var questionImages = {}
        $("#mcqAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })

        var questionImageDiv = "<div class='question_images'></div>"
        $(".preview_body").append(questionImageDiv)

        $.each(questionImages, function(imgName,imgBase64){
          let image = "<img src=" + imgBase64 + " alt=" + imgName + ">"
          $(".preview_body .question_images").append(image)
        })
        // ----------------------------------------------------------

        // Set Question Text
        var questionHTML = $('#QuestionEditor').summernote('code')
        var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
        $(".preview_body").append(questionParagraph)
        // ----------------------------------------------------------



        // Set Choices
        $("#MultiChoice table .choice").each(function () {

          let choice = {}

          choice["image_name"] = $(this).find(".dz-success").find("img").attr("alt")
          choice["image"] = mcqAllImages[$(this).find(".dz-success").find("img").attr("alt")]
          choice["text"] = $(this).find(".choice-text").val()
          choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

          choices.push(choice)
        })


        var totalChoices = "<div class='totalChoices'></div>"
        $(".preview_body").append(totalChoices)


        for (var i = 0; i < choices.length; i++) {
          let choiceBox = "<div class='choiceBox row' data-val='" + choices[i]["text"] + "'></div>"
          // Image & Text
          if (choices[i]["image"] != undefined && choices[i]["text"] != "") {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceImg = "<div class='col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            let choiceText = "<div class='col-8 choiceText'><span>" + choices[i]["text"] + "</span></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append(choiceText)
          } else if (choices[i]["image"] != undefined) {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceImg = "<div class='offset-4 col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg)
          } else if (choices[i]["text"] != "") {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceText = "<div class='col-12 choiceText'><span>" + choices[i]["text"] + "</span></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceText)
          }
        }



        $(".preview_body .totalChoices .choiceBox").on("click", function () {
          $(this).toggleClass("selected")
        })

        // ----------------------------------------------------------


      })
    }
    // end:: check if the question is MultiChoice
  })
})
