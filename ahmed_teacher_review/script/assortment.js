$(function() {
    $('#loading').fadeOut();

    // JSON input
    var json_input_question = { "academic_id": "1", "academic_year": "2020 - 2021", "grade_id": "", "grade_name": "", "subject_id": "0", "subject_name": "Urdu", "topic_name": "", "filter_tags": [], "question_html": "اہلےنننہٹدددد پہ لن اللہ", "question_details": "<p>dfsdfsdfsfdfsd</p>", "rondomize_options": true, "allow_attachment": true, "allow_partial_credit": true, "maximum_marks": "10", "maximum_time": "50", "question_images": {}, "elements": [{ "text": "Apple", "order": "00001" }, { "image_name": "cat.png", "image": "ahmed_teacher_review/img/cat.png", "text": "", "order": "00002" }, { "image_name": "ball.png", "image": "ahmed_teacher_review/img/ball.png", "text": "Ball", "order": "00005" }, { "image_name": "frog.png", "image": "ahmed_teacher_review/img/frog.png", "text": "ضفدع", "order": "00009" }] }

    var json_input = {
        "sorted": [
            { "order": 1, "text": "Apple" },
            { "order": 2, "image": "ahmed_teacher_review/img/cat.png", "image_name": "cat.png", "text": "" },
            { "order": 3, "image": "ahmed_teacher_review/img/ball.png", "image_name": "ball.png", "text": "Ball" },
            { "order": 4, "image": "ahmed_teacher_review/img/frog.png", "image_name": "frog.png", "text": "ضفدع" }
        ],
        "random": [
            { "order": 1, "text": "Apple" },
            { "order": 2, "image": "ahmed_teacher_review/img/frog.png", "image_name": "frog.png", "text": "ضفدع" },
            { "order": 3, "image": "ahmed_teacher_review/img/cat.png", "image_name": "cat.png", "text": "" },
            { "order": 4, "image": "ahmed_teacher_review/img/ball.png", "image_name": "ball.png", "text": "Ball" }
        ],
        "screenshot": ""
    }

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

    // set question text
    $(".questionText").html(json_input_question.question_html)
    $(".questionDetails").html(json_input_question.question_details)

    // var inputElements = json_input_question.elements

    sortedElements = json_input["sorted"].sort(compareElements)

    var kanbanFixed = new jKanban({
        element: '#sorted',
        gutter: '10px',
        dragBoards: false,
        dragItems: false,
        boards: [{
            'id': 'fixed',
            'title': 'Sorted',
            'class': 'success',
        }]
    })

    for (var i = 0; i < sortedElements.length; i++) {
        // Image & Text
        if (sortedElements[i]["image"] != undefined && sortedElements[i]["text"] != "") {
            let elementImg = "<div class='col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
            let elementText = "<div class='col-8 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
            kanbanFixed.addElement("fixed", { 'title': '<div class="row" data-id="' + sortedElements[i]["order"] + '">' + elementImg + elementText + '</div>' })
        } else if (sortedElements[i]["image"] != undefined) {
            let elementImg = "<div class=' col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
            kanbanFixed.addElement("fixed", { 'title': '<div class="row" data-id="' + sortedElements[i]["order"] + '">' + elementImg + '</div>' })
        } else if (sortedElements[i]["text"] != "") {
            let elementText = "<div class='col-12 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
            kanbanFixed.addElement("fixed", { 'title': '<div class="row" data-id="' + sortedElements[i]["order"] + '">' + elementText + '</div>' })
        }
    }

    var kanbanDynamic = new jKanban({
        element: '#random',
        gutter: '10px',
        dragBoards: false,
        dragItems: false,
        boards: [{
            'id': 'dynamic',
            'title': 'Unsorted',
            'class': 'danger',
        }]
    })

    var randomizedElements = json_input["random"].sort(compareElements)

    for (var i = 0; i < randomizedElements.length; i++) {
        // Image & Text
        if (randomizedElements[i]["image"] != undefined && randomizedElements[i]["text"] != "") {
            let elementImg = "<div class='col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
            let elementText = "<div class='col-8 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
            kanbanDynamic.addElement("dynamic", { 'title': '<div class="row" data-id="' + randomizedElements[i]["order"] + '">' + elementImg + elementText + '</div>' })
        } else if (randomizedElements[i]["image"] != undefined) {
            let elementImg = "<div class=' col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
            kanbanDynamic.addElement("dynamic", { 'title': '<div class="row" data-id="' + randomizedElements[i]["order"] + '">' + elementImg + '</div>' })
        } else if (randomizedElements[i]["text"] != "") {
            let elementText = "<div class='col-12 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
            kanbanDynamic.addElement("dynamic", { 'title': '<div class="row" data-id="' + randomizedElements[i]["order"] + '">' + elementText + '</div>' })
        }
    }

    totalRowsDynamic = $(".kanban-board[data-id='dynamic'] .kanban-item .row")
    totalRowsFixed = $(".kanban-board[data-id='fixed'] .kanban-item .row")

    var totalMarks = totalRowsDynamic.length;
    var studentMarks = 0;

    for (i = 1; i <= totalRowsDynamic.length; i++) {
        var dynamicItem, fixedItem = "";

        if ($(".kanban-board[data-id='dynamic'] .kanban-item .row[data-id='" + i + "']").find(".elementText").length) {
            dynamicItem = $(".kanban-board[data-id='dynamic'] .kanban-item .row[data-id='" + i + "']").find(".elementText").text()
        } else if ($(".kanban-board[data-id='dynamic'] .kanban-item .row[data-id='" + i + "']").find(".elementImg img").length) {
            dynamicItem = $(".kanban-board[data-id='dynamic'] .kanban-item .row[data-id='" + i + "']").find(".elementImg img").attr("alt")
        }

        if ($(".kanban-board[data-id='fixed'] .kanban-item .row[data-id='" + i + "']").find(".elementText").length) {
            fixedItem = $(".kanban-board[data-id='fixed'] .kanban-item .row[data-id='" + i + "']").find(".elementText").text()
        } else if ($(".kanban-board[data-id='fixed'] .kanban-item .row[data-id='" + i + "']").find(".elementImg img").length) {
            fixedItem = $(".kanban-board[data-id='fixed'] .kanban-item .row[data-id='" + i + "']").find(".elementImg img").attr("alt")
        }

        if (dynamicItem == fixedItem) {
            $(".kanban-board[data-id='dynamic'] .kanban-item .row[data-id='" + i + "']").parents(".kanban-item").css({ "background-color": "#1BC5BD", "color": "#fff" })
            studentMarks += 1;
        } else {
            $(".kanban-board[data-id='dynamic'] .kanban-item .row[data-id='" + i + "']").parents(".kanban-item").css({ "background-color": "#F64E60", "color": "#fff" })
        }
    }

    $(".studentMarks").text(`${studentMarks} of ${totalMarks}`)

    $("#submitReview").on("click", function() {
        outputJSON = JSON.stringify({
            "teacher_review": $("#teacherReview").val(),
            "teacher_marks": $(".teacherMarks").val()
        })
        console.log(outputJSON);
    })
})