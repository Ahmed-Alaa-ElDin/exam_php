$(function () {
  console.log(json_input);

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

  // set attachment
  if (!json_input.allow_attachment) {
    $("#answerAttachments").css("display","none")
  }

  var inputElements = json_input.elements

  sortedElements = inputElements.sort(compareElements)

  var kanbanFixed = new jKanban({
    element: '#sorted',
    gutter: '10px',
    dragBoards: false,
    dragItems: false,
    boards: [
      {
        'id': 'fixed',
        'title': 'Sorted',
        'class': 'success',
      }
    ]
  })

  for (var i = 0; i < sortedElements.length; i++) {
    // Image & Text
    if (sortedElements[i]["image"] != undefined && sortedElements[i]["text"] != "") {
      let elementImg = "<div class='col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
      let elementText = "<div class='col-8 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
      kanbanFixed.addElement("fixed", { 'title': '<div class="row">' + elementImg + elementText + '</div>' })
    } else if (sortedElements[i]["image"] != undefined) {
      let elementImg = "<div class=' col-4 elementImg'><img src='" + sortedElements[i]["image"] + "' alt='" + sortedElements[i]["image_name"] + "'></div>"
      kanbanFixed.addElement("fixed", { 'title': '<div class="row">' + elementImg + '</div>' })
    } else if (sortedElements[i]["text"] != "") {
      let elementText = "<div class='col-12 elementText'><span>" + sortedElements[i]["text"] + "</span></div>"
      kanbanFixed.addElement("fixed", { 'title': '<div class="row">' + elementText + '</div>' })
    }
  }

  randomizedElements = shuffleElements(inputElements)

  var kanbanDynamic = new jKanban({
    element: '#random',
    gutter: '10px',
    dragBoards: false,
    dragItems: true,
    boards: [
      {
        'id': 'dynamic',
        'title': 'Unsorted',
        'class': 'danger',
      }
    ]
  })

  for (var i = 0; i < randomizedElements.length; i++) {
    // Image & Text
    if (randomizedElements[i]["image"] != undefined && randomizedElements[i]["text"] != "") {
      let elementImg = "<div class='col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
      let elementText = "<div class='col-8 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
      kanbanDynamic.addElement("dynamic", { 'title': '<div class="row">' + elementImg + elementText + '</div>' })
    } else if (randomizedElements[i]["image"] != undefined) {
      let elementImg = "<div class=' col-4 elementImg'><img src='" + randomizedElements[i]["image"] + "' alt='" + randomizedElements[i]["image_name"] + "'></div>"
      kanbanDynamic.addElement("dynamic", { 'title': '<div class="row">' + elementImg + '</div>' })
    } else if (randomizedElements[i]["text"] != "") {
      let elementText = "<div class='col-12 elementText'><span>" + randomizedElements[i]["text"] + "</span></div>"
      kanbanDynamic.addElement("dynamic", { 'title': '<div class="row">' + elementText + '</div>' })
    }
  }



  // make json 
  $("#submitAnswer").on("click",function () {

    let sortedElements = $("#sorted").find(".kanban-item")
    let randomElements = $("#random").find(".kanban-item")
    
    let element = {}

    let output = {}
    output.sorted = []
    output.random = []

    for (let i = 0; i < sortedElements.length; i++) {
      element = {}

      element["order"] = i + 1
      element["image"] = sortedElements.eq(i).find("img").attr("src")
      element["image_name"] = sortedElements.eq(i).find("img").attr("alt")
      element["text"] = sortedElements.eq(i).find(".elementText span").text()

      output.sorted.push(element)
    }

    for (let i = 0; i < randomElements.length; i++) {
      element = {}

      element["order"] = i + 1
      element["image"] = randomElements.eq(i).find("img").attr("src")
      element["image_name"] = randomElements.eq(i).find("img").attr("alt")
      element["text"] = randomElements.eq(i).find(".elementText span").text()

      output.random.push(element)
    }

    outputJSON = JSON.stringify(output)
    console.log(output);
  })

})