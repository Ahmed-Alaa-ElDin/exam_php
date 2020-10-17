$(function(){


  var allImages = {}

  // Set the Dropzones
  Dropzone.autoDiscover = false;

  // Activate Dropzone
  // for Question Attachment
  $("#essayAttachFilesWithQuestion, #mcqAttachFilesWithQuestion, #trueFalseAttachFilesWithQuestion, #dragDropAttachFilesWithQuestion, #assortmentAttachFilesWithQuestion, #fillSpaceAttachFilesWithQuestion").dropzone({
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
    $('.note-editing-area').off("keyup , change")
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
          "academic_id" : academicYearID,
          "academic_year" : academicYear,
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

      var mcqAllImages = {}

      // config Question Types Fade in & out

      $("#MultiChoice").find("button[data-repeater-create]").on("click",function () {

        // Enable Attachment box
        $("#MultiChoice tr[data-repeater-item]").last().find(".MCQAttachments").dropzone({
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
          "academic_id" : academicYearID,
          "academic_year" : academicYear,
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
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
          } else if (choices[i]["image"] != undefined) {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceImg = "<div class=' col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
          } else if (choices[i]["text"] != "") {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceText = "<div class='col-12 choiceText'><span>" + choices[i]["text"] + "</span></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 35%;'></i>")
          }
        }



        $(".preview_body .totalChoices .choiceBox").on("click", function () {
          $(this).toggleClass("selected")
        })

        // ----------------------------------------------------------


      })
    }
    // end:: check if the question is MultiChoice

    // begin:: check if the question is TrueFalse
    else if ($(this).val() == 3) {

      var trueFalseAllImages = {}
      // config Question Types Fade in & out
      $("#TrueFalse").fadeIn()

      // add new choice
      $('#TrueFalse').find("button[data-repeater-create]").on("click", function () {

        // create new node
        let newChoice = '<tr data-repeater-item="" class="choice">\
        <td class="multi-choice-td">\
        <div class="dropzone dropzone-default kt_dropzone_1 TFAttachments">\
        <div class="dropzone-msg dz-message needsclick">\
        <h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3>\
        </div>\
        </div>\
        </td>\
        <td class="multi-choice-td">\
        <input type="text" class="form-control choice-text" placeholder="Enter Possible Choice">\
        </td>\
        <td class="multi-choice-td pl-10  text-center" align="center">\
        <label class="radio radio-lg">\
        <input type="radio" class="choice-right-false" name="TFRadio" />\
        <span></span></label>\
        </td>\
        <td class="multi-choice-td  text-center">\
        <a href="javascript:;" data-repeater-delete="" class="btn font-weight-bold btn-danger btn-icon">\
        <i class="la la-remove"></i>\
        </a>\
        </td>\
        </tr>'

        $('#TrueFalse table').append(newChoice)

        // activate Dropzone
        $("#TrueFalse table .dropzone").last().dropzone({
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
                trueFalseAllImages[fileName] = base64String
                console.log(trueFalseAllImages)
              };
              reader.readAsDataURL(file);
            });
          }
        });

        // add action to delete button
        $("#TrueFalse table a[data-repeater-delete]").last().on("click",function () {
          let check = confirm("Are you sure you want to delete this element?")
          if (check) {
            $(this).parents("tr").remove()
          }
        })
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

        var choices = []

        $("#TrueFalse table .choice").each(function () {

          let choice = {}

          choice["image_name"] = $(this).find(".dz-success img").attr("alt")
          choice["image"] = trueFalseAllImages[$(this).find(".dz-success img").attr("alt")]
          choice["text"] = $(this).find(".choice-text").val()
          choice["true-false"] = $(this).find(".choice-right-false").prop("checked")

          choices.push(choice)
        })


        var data = {
          "academic_id" : academicYearID,
          "academic_year" : academicYear,
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

        var choices = []

        // Set Question Images
        var questionImages = {}
        $("#trueFalseAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function(){
          questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
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
        $("#TrueFalse table .choice").each(function () {

          let choice = {}

          choice["image_name"] = $(this).find(".dz-success img").attr("alt")
          choice["image"] = trueFalseAllImages[$(this).find(".dz-success img").attr("alt")]
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
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
          } else if (choices[i]["image"] != undefined) {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceImg = "<div class=' col-4 choiceImg'><img src='" + choices[i]["image"] + "' alt='" + choices[i]["image_name"] + "'></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceImg).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 42%;'></i>")
          } else if (choices[i]["text"] != "") {
            $(".preview_body .totalChoices").append(choiceBox)
            let choiceText = "<div class='col-12 choiceText'><span>" + choices[i]["text"] + "</span></div>"
            $(".preview_body .totalChoices .choiceBox").last().append(choiceText).append("<i class='fas fa-check' style='position: absolute;right: 15px;font-size: 16px;color: #fff;top: 35%;'></i>")
          }
        }

        $(".preview_body .totalChoices .choiceBox").on("click", function () {
          $(this).addClass("selected").siblings().removeClass("selected")
        })

        // ----------------------------------------------------------

      })
    }
    // end:: check if the question is TrueFalse

    // begin:: check if the question is Assortment
    else if ($(this).val() == 4) {

      var assortmentAllImages = {}
      // config Question Types Fade in & out
      $("#Assortment").fadeIn()

      // add new choice
      $('#Assortment').find("button[data-repeater-create]").on("click", function () {

        // create new node
        let newElement = '<tr data-repeater-item="" class="element"><td class="multi-choice-td"><div class="dropzone dropzone-default kt_dropzone_1 assortmentAttachments"><div class="dropzone-msg dz-message needsclick"><h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3></div></div></td><td class="multi-choice-td"><input type="text" class="form-control element-text" placeholder="Enter Element Text"></td><td class="multi-choice-td" align="center"><input type="number" class="form-control element-order" id="' + Math.random() * 10 + '" placeholder="Enter the Order of This Element"></td><td class="multi-choice-td  text-center"><a href="javascript:;" data-repeater-delete="" class="btn font-weight-bold btn-danger btn-icon"><i class="la la-remove"></i></a></td></tr>'

        $('#Assortment table').append(newElement)

        // activate Dropzone
        $("#Assortment table .dropzone").last().dropzone({
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
                assortmentAllImages[fileName] = base64String
              };
              reader.readAsDataURL(file);
            });
          }
        });

        // Check Duplications
        $("#Assortment table .element-order").on("keyup , change",function () {
          $(this).css({"background-color":"#fff", "color" : "#000"})
          let element = $(this)
          let elementId = $(this).attr("id")
          let elementOrder = $(this).val()
          $("#Assortment table .element-order").each(function () {
            if ($(this).val() == elementOrder && $(this).attr("id") != elementId)  {
              element.css({"background-color":"rgba(246, 78, 96, 0.1)", "color" : "#F64E60"})
            }
          })
        })

        // add action to delete button
        $("#Assortment table a[data-repeater-delete]").last().on("click",function () {
          let check = confirm("Are you sure you want to delete this element?")
          if (check) {
            $(this).parents("tr").remove()
          }
        })
      })

      // Sorting According Orders
      function compareElements( a, b ) {
        if ( a.order < b.order ){
          return -1;
        }
        if ( a.order > b.order ){
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

      // Adding Landing Zero
      function landingZero (str, max) {
        str = str.toString();
        return str.length < max ? landingZero("0" + str, max) : str;
      }

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

        var randomizeOptions = $("#assortmentRandomizeOptions").prop("checked")
        var allowAttachment = $("#assortmentAllowAttach").prop("checked")
        var allowPartialCredit = $("#assortmentAllowPartialCredit").prop("checked")
        var maximumMarks = $("#assortmentMaximumMarks").val();
        var maximumTime = $("#assortmentMaximumTime").val();

        var questionImages = {}
        $("#assortmentAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })


        var elements = []

        $("#Assortment table .element").each(function () {

          let element = {}

          element["image_name"] = $(this).find(".dz-success img").attr("alt")
          element["image"] = assortmentAllImages[$(this).find(".dz-success img").attr("alt")]
          element["text"] = $(this).find(".element-text").val()
          element["order"] = landingZero($(this).find(".element-order").val(),5)

          elements.push(element)
        })


        var data = {
          "academic_id" : academicYearID,
          "academic_year" : academicYear,
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
          "elements" : elements.sort(compareElements)
        }
        var dataJSON = JSON.stringify(data)
        console.log(data);
      })

      $("#previewButton").on("click",function () {

        $(".preview_body").children().remove()

        var elements = []

        // Set Question Images
        var questionImages = {}
        $("#assortmentAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function(){
          questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
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

        // Set Elements
        $("#Assortment table .element").each(function () {

          let element = {}

          element["image_name"] = $(this).find(".dz-success img").attr("alt")
          element["image"] = assortmentAllImages[$(this).find(".dz-success img").attr("alt")]
          element["text"] = $(this).find(".element-text").val()
          element["order"] = landingZero($(this).find(".element-order").val(),5)

          elements.push(element)
        })


        sortedElements = elements.sort(compareElements)


        var totalElements = "<div class='totalElements row'><div id='random' class='col-6'></div><div id='sorted' class='col-6'></div></div>"
        $(".preview_body").append(totalElements)


        var kanbanFixed = new jKanban({
          element : '#sorted',
          gutter : '10px' ,
          dragBoards : false,
          dragItems : false,
          boards : [
            {
              'id' : 'fixed',
              'title' : 'Sorted',
              'class' : 'success',
            }
          ]
        })

        for (var i = 0; i < sortedElements.length; i++) {
          // Image & Text
          if (sortedElements[i]["image"] != undefined && sortedElements[i]["text"] != "") {
            let elementImg = "<div class='col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
            let elementText = "<div class='col-8 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
            kanbanFixed.addElement("fixed",{'title': '<div class="row">' + elementImg + elementText + '</div>'})
          } else if (sortedElements[i]["image"] != undefined) {
            let elementImg = "<div class=' col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
            kanbanFixed.addElement("fixed",{'title': '<div class="row">' + elementImg + '</div>'})
          } else if (sortedElements[i]["text"] != "") {
            let elementText = "<div class='col-12 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
            kanbanFixed.addElement("fixed",{'title': '<div class="row">' + elementText + '</div>'})
          }
        }

        randomizedElements = shuffleElements(elements)

        var kanbanDynamic = new jKanban({
          element : '#random',
          gutter : '10px' ,
          dragBoards : false,
          dragItems : true,
          boards : [
            {
              'id' : 'dynamic',
              'title' : 'Unsorted',
              'class' : 'danger',
            }
          ]
        })

        for (var i = 0; i < randomizedElements.length; i++) {
          console.log(randomizedElements);
          // Image & Text
          if (randomizedElements[i]["image"] != undefined && randomizedElements[i]["text"] != "") {
            let elementImg = "<div class='col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
            let elementText = "<div class='col-8 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
            kanbanDynamic.addElement("dynamic",{'title': '<div class="row">' + elementImg + elementText + '</div>'})
          } else if (randomizedElements[i]["image"] != undefined) {
            let elementImg = "<div class=' col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
            kanbanDynamic.addElement("dynamic",{'title': '<div class="row">' + elementImg + '</div>'})
          } else if (randomizedElements[i]["text"] != "") {
            let elementText = "<div class='col-12 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
            kanbanDynamic.addElement("dynamic",{'title': '<div class="row">' + elementText + '</div>'})
          }
        }


      })

    }
    // begin:: check if the question is Assortment

    // begin:: check if the question is Drag & Drop
    else if ($(this).val() == 5) {

      var dragDropAllImages = {}
      // config Question Types Fade in & out
      $("#DragDrop").fadeIn()

      // Set select2
      $('#dragDropDisplayType').select2();

      // add new choice
      $('#DragDrop').find("button[data-repeater-create]").on("click", function () {

        // create new node
        let newPair =
        '<tr data-repeater-item="" class="pair">\
        <td class="multi-choice-td">\
        <div class="dropzone dropzone-default kt_dropzone_1 DDQuestionAttachments">\
        <div class="dropzone-msg dz-message needsclick">\
        <h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3>\
        </div>\
        </div>\
        </td>\
        <td class="multi-choice-td">\
        <input type="text" class="form-control question-text" placeholder="Enter Question Text" style="min-width:200px">\
        </td>\
        <td class="multi-choice-td">\
        <div class="dropzone dropzone-default kt_dropzone_1 DDAnswerAttachments">\
        <div class="dropzone-msg dz-message needsclick">\
        <h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3>\
        </div>\
        </div>\
        </td>\
        <td class="multi-choice-td">\
        <input type="text" class="form-control answer-text" placeholder="Enter Answer Text"  style="min-width:200px">\
        </td>\
        <td class="multi-choice-td  text-center">\
        <a href="javascript:;" data-repeater-delete="" class="btn font-weight-bold btn-danger btn-icon">\
        <i class="la la-remove"></i>\
        </a>\
        </td>\
        </tr>'

        $('#DragDrop table').append(newPair)


        // activate Dropzone Question
        $("#DragDrop table .DDQuestionAttachments").last().dropzone({
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
                dragDropAllImages[fileName] = base64String
              };
              reader.readAsDataURL(file);
            });
          }
        });

        // activate Dropzone Answer
        $("#DragDrop table .DDAnswerAttachments").last().dropzone({
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
                dragDropAllImages[fileName] = base64String
              };
              reader.readAsDataURL(file);
            });
          }
        });

        // add action to delete button
        $("#DragDrop table a[data-repeater-delete]").last().on("click",function () {
          let check = confirm("Are you sure you want to delete this element?")
          if (check) {
            $(this).parents("tr").remove()
          }
        })
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

        var randomizeOptions = $("#dragDropRandomizeOptions").prop("checked")
        var allowAttachment = $("#dragDropAllowAttach").prop("checked")
        var allowPartialCredit = $("#dragDropAllowPartialCredit").prop("checked")
        var displayType = $("#dragDropDisplayType").val();
        var maximumMarks = $("#dragDropMaximumMarks").val();
        var maximumTime = $("#dragDropMaximumTime").val();

        var questionImages = {}
        $("#dragDropAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })

        var pairs = []

        $("#DragDrop table .pair").each(function () {

          let pair = {}

          pair["question_image_name"] = $(this).find(".DDQuestionAttachments .dz-success img").attr("alt")
          pair["question_image"] = dragDropAllImages[$(this).find(".DDQuestionAttachments .dz-success img").attr("alt")]
          pair["question_text"] = $(this).find(".question-text").val()
          pair["answer_image_name"] = $(this).find(".DDAnswerAttachments .dz-success img").attr("alt")
          pair["answer_image"] = dragDropAllImages[$(this).find(".DDAnswerAttachments .dz-success img").attr("alt")]
          pair["answer_text"] = $(this).find(".answer-text").val()

          pairs.push(pair)
        })


        var data = {
          "academic_id" : academicYearID,
          "academic_year" : academicYear,
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
          "display_type" : displayType,
          "question_images" : questionImages,
          "pairs" : pairs
        }
        var dataJSON = JSON.stringify(data)
        console.log(data);
      })

      $("#previewButton").on("click",function () {

        $(".preview_body").children().remove()

        var pairs = []

        var displayType = $("#dragDropDisplayType").val();


        // Set Question Images
        var questionImages = {}
        $("#dragDropAttachFilesWithQuestion").find(".dz-preview").each(function(){
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
        $("#DragDrop table .pair").each(function () {

          let pair = {}

          pair["question_image_name"] = $(this).find(".DDQuestionAttachments .dz-success img").attr("alt")
          pair["question_image"] = dragDropAllImages[$(this).find(".DDQuestionAttachments .dz-success img").attr("alt")]
          pair["question_text"] = $(this).find(".question-text").val()
          pair["answer_image_name"] = $(this).find(".DDAnswerAttachments .dz-success img").attr("alt")
          pair["answer_image"] = dragDropAllImages[$(this).find(".DDAnswerAttachments .dz-success img").attr("alt")]
          pair["answer_text"] = $(this).find(".answer-text").val()

          pairs.push(pair)
        })


        var totalPairs = "<div class='totalPairs'></div>"
        $(".preview_body").append(totalPairs)

        if (displayType == "image") {
          let allQuestions = '<div class="all_questions row"></div>'
          let allAnswers = '<div class="all_answers row"></div>'
          $(".preview_body .totalPairs").append(allQuestions).append(allAnswers)

          for (var i = 0; i < pairs.length; i++) {
            if (pairs[i]["question_image"] != undefined && pairs[i]["question_text"] != "") {
              $(".preview_body .totalPairs .all_questions").prepend('<div class="col-4"><div class="question"><img src="' + pairs[i]["question_image"] + '" class="question_img" alt="' + pairs[i]["question_image_name"] + '"><span class="question_text">' + pairs[i]["question_text"] + '</span><div class="question_answer empty"></div></div>')
            } else if (pairs[i]["question_image"] != undefined) {
              $(".preview_body .totalPairs .all_questions").prepend('<div class="col-4"><div class="question"><img src="'+ pairs[i]["question_image"] +'" class="question_img" alt="' + pairs[i]["question_image_name"] + '"><div class="question_answer empty"></div></div>')
            } else if (pairs[i]["question_text"] != "") {
              $(".preview_body .totalPairs .all_questions").prepend('<div class="col-4"><div class="question"><span class="question_text">' + pairs[i]["question_text"] + '</span><div class="question_answer empty"></div></div>')
            }
            if (pairs[i]["answer_image"] != undefined && pairs[i]["answer_text"] != "") {
              $(".preview_body .totalPairs .all_answers").prepend('<div class="col-4 answer_block not_empty"><div class="answer"><img src="' + pairs[i]["answer_image"] +'" class="answer_img" alt="'+ pairs[i]["answer_image_name"] +'"><span class="answer_text">'+ pairs[i]["answer_text"] +'</div>')
            } else if (pairs[i]["answer_image"] != undefined) {
              $(".preview_body .totalPairs .all_answers").prepend('<div class="col-4 answer_block not_empty"><div class="answer"><img src="' + pairs[i]["answer_image"] +'" class="answer_img" alt="'+ pairs[i]["answer_image_name"] +'"></div>')
            } else if (pairs[i]["answer_text"] != "") {
              $(".preview_body .totalPairs .all_answers").prepend('<div class="col-4 answer_block not_empty"><div class="answer"><span class="answer_text">'+ pairs[i]["answer_text"] +'</div>')
            }
          }
        } else if (displayType == "line") {
          let allRows = '<div class="row"><div class="col-4"><ul class="questions list-unstyled text-center"></ul></div><div class="offset-4 col-4"><ul class="answers list-unstyled text-center"></ul></div></div>'
          $(".preview_body").append(allRows)
          for (var i = 0; i < pairs.length; i++) {
            if (pairs[i]["question_image"] != undefined && pairs[i]["question_text"] != "") {
              $(".preview_body .questions").append('<li class="question row"><img class="col-4 question_img" src="' + pairs[i]["question_image"] + '" alt="'+ pairs[i]["question_image_name"] +'"><span class="col-8 question_text">' + pairs[i]["question_text"] + '</span></li>')
            } else if (pairs[i]["question_image"] != undefined) {
              $(".preview_body .questions").append('<li class="question row"><img class="col-12 question_img" src="' + pairs[i]["question_image"] + '" alt="'+ pairs[i]["question_image_name"] +'"></li>')
            } else if (pairs[i]["question_text"] != "") {
              $(".preview_body .questions").append('<li class="question row"><span class="col-12 question_text">' + pairs[i]["question_text"] + '</span></li>')
            }
            if (pairs[i]["answer_image"] != undefined && pairs[i]["answer_text"] != "") {
              $(".preview_body .answers").append('<li class="answer row"><span class="col-8 answer_text">'+ pairs[i]["answer_text"] +'</span><img class="col-4 answer_img" src="'+ pairs[i]["answer_image"] +'" alt="'+ pairs[i]["answer_image_name"] +'"></li>')
            } else if (pairs[i]["answer_image"] != undefined) {
              $(".preview_body .answers").append('<li class="answer row"><img class="col-12 answer_img" src="'+ pairs[i]["answer_image"] +'" alt="'+ pairs[i]["answer_image_name"] +'"></li>')
            } else if (pairs[i]["answer_text"] != "") {
              $(".preview_body .answers").append('<li class="answer row"><span class="col-12 answer_text">'+ pairs[i]["answer_text"] +'</span></li>')
            }
          }
        }



        $(".preview_body .totalChoices .choiceBox").on("click", function () {
          $(this).addClass("selected").siblings().removeClass("selected")
        })

        // ----------------------------------------------------------

      })
    }
    // end:: check if the question is Drag & Drop

    // begin:: check if the question is fillSpaces
    else if ($(this).val() == 7) {

      // config Question Types Fade in & out
      $("#FillSpace").fadeIn()

      var num = 1

      $('.note-editing-area').on("keyup , change",function () {
        if ($(this).html().includes("___")) {
          $(".fillSpaceInputs").append("<div class='input-group'><input type='text' class='form-control placeholder' id='placeholder" + num + "' data-num='" + num + "'><div class='input-group-append'><span class='input-group-text' style='min-width:50px; display:block; margin: auto'>"+ num +"</span></div><div class='input-group-append'><span class='input-group-text btn btn-danger removeAnswer'>X</span></div></div>")
          $(this).html($(this).html().replace("___","<span data-num = '" + num + "' class='btn btn-primary removeSpan'> ((" + num + ")) </span>" + "&nbsp;"))
          $("#placeholder" + num + "").focus()
          num += 1
          $(".removeAnswer").on("click", function () {
            $(this).parents(".input-group").remove()
            $(".note-editing-area span[data-num='" + $(this).parents(".input-group").find("input").data("num") + "']").remove()
          })
          $(".removeSpan").on("click", function () {
            $(".fillSpaceInputs .input-group #placeholder" + $(this).data("num")).parents(".input-group").remove()
            $(this).remove()
          })
        }
      })

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

        var questionHTML = $('.note-editable').html()

        var randomizeOptions = $("#fillSpaceRandomizeOptions").prop("checked")
        var allowAttachment = $("#fillSpaceAllowAttach").prop("checked")
        var allowPartialCredit = $("#fillSpaceAllowPartialCredit").prop("checked")
        var maximumMarks = $("#fillSpaceMaximumMarks").val();
        var maximumTime = $("#fillSpaceMaximumTime").val();

        var questionImages = {}
        $("#fillSpaceAttachFilesWithQuestion").find(".dz-preview").each(function(){
          if ($(this).find(".dz-error-message").text() == "") {
            questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
          }
        })

        var answers = []

        $("#FillSpace .fillSpaceInputs .input-group .placeholder").each(function () {
          var answer = {}
          answer["answer_text"] = $(this).val()
          answer["answer_number"] = $(this).data("num")
          answers.push(answer)
        })

        var data = {
          "academic_id" : academicYearID,
          "academic_year" : academicYear,
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
          "answers" : answers
        }
        var dataJSON = JSON.stringify(data)
        console.log(data);
      })


      // Set Preview Box
      $("#previewButton").on("click",function () {

        $(".preview_body").children().remove()

        // Set Question Images
        var questionImages = {}
        $("#fillSpaceAttachFilesWithQuestion").find(".dz-preview.dz-success").each(function(){
          questionImages[$(this).find("img").attr("alt")] = allImages[$(this).find("img").attr("alt")]
        })

        var questionImageDiv = "<div class='question_images'></div>"
        $(".preview_body").append(questionImageDiv)

        $.each(questionImages, function(imgName,imgBase64){
          let image = "<img src=" + imgBase64 + " alt=" + imgName + ">"
          $(".preview_body .question_images").append(image)
        })
        // ----------------------------------------------------------

        // Set Question Text
        var questionHTML = $('.note-editable').html()
        var questionParagraph = "<div class='question_text'>" + questionHTML + "</div>"
        $(".preview_body").append(questionParagraph)
        // ----------------------------------------------------------

        // Set Elements
        var answers = []

        $("#FillSpace .fillSpaceInputs .input-group .placeholder").each(function () {
          var answer = {}
          answer["answer_text"] = $(this).val()
          answer["answer_number"] = $(this).data("num")
          answers.push(answer)
        })


        var totalAnswers = "<div class='totalAnswers'></div>"
        $(".preview_body").append(totalAnswers)


        for (var i = 0; i < answers.length; i++) {
          let answerBox = "<div class='answerBox row' data-val='" + answers[i]["answer_number"] + "'><div class='input-group'><input type='text' class='form-control placeholder' id='placeholder" + answers[i]["answer_number"] + "' data-num='" + answers[i]["answer_number"] + "'><div class='input-group-append'><span class='input-group-text' style='min-width:50px; display:block; margin: auto'>"+ answers[i]["answer_number"] +"</span></div><div class='input-group-append'></div></div></div>"
          $(".preview_body .totalAnswers").append(answerBox)
        }

      })

    }
    // end:: check if the question is fillSpaces

  })
})
