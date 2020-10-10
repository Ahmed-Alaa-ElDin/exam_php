$(document).ready(function() {
	/* $('#select-grade a').click(function(){
		$('.select-grade').text($(this).text());
	}); */
	
	$('#select-grade').select2({
		placeholder: "Select a Grade"
	});
	
	$('#select-subject').select2({
		placeholder: "Select a Subject"
	});
	
	$('#select-teacher').select2({
		placeholder: "Select a Teacher"
	});


	
	var subjectData  = [
						{
							"id":1,
							"name":"English with 2 lines more and more and more",
							"maxClass":5,
							"teachers":[ 
								{
									"id": 1,
									"name": "Miss. English1"
								},
								{
									"id": 2,
									"name": "Miss. English2"
								},
								{
									"id": 3,
									"name": "Miss. English3"
								}
							]
						},
						{
							"id":2,
							"name":"Maths",
							"maxClass":4,
							"teachers":[ 
								{
									"id": 4,
									"name": "Miss. Maths1"
								},
								{
									"id": 5,
									"name": "Miss. Maths2"
								},
								{
									"id": 6,
									"name": "Miss. Maths3"
								}
							]
						},
						{
							"id":3,
							"name":"Science",
							"maxClass":3,
							"teachers":[ 
								{
									"id": 7,
									"name": "Miss. Science1"
								},
								{
									"id": 8,
									"name": "Miss. Science2"
								},
								{
									"id": 9,
									"name": "Miss. Science3"
								}
							]
						}
					]
	
	var response = {
				  "operationSuccess": true,
				  "content": [
					{
					  "timeTableId": 1,
					  "classSectionId": 0,
					  "dayId": 1,
					  "dayName": "Monday",
					  "slots": [
						{
						  "id": 0,
						  "slotId": 1,
						  "name": "P1",
						  "startTime": "12:05 AM",
						  "endTime": "12:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 2,
						  "name": "P2",
						  "startTime": "1:05 AM",
						  "endTime": "1:10 AM",
						  "timeTableId": 0,
						  "isBreak": true,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 4,
						  "name": "p3",
						  "startTime": "2:05 AM",
						  "endTime": "2:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						}
					  ]
					},
					{
					  "timeTableId": 1,
					  "classSectionId": 0,
					  "dayId": 2,
					  "dayName": "Tuesday",
					  "slots": [
						{
						  "id": 1002,
						  "slotId": 1,
						  "name": "P1",
						  "startTime": "12:05 AM",
						  "endTime": "12:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": "English",
						  "teacherName": "Adil Irshad Teacher"
						},
						{
						  "id": 1003,
						  "slotId": 2,
						  "name": "P2",
						  "startTime": "1:05 AM",
						  "endTime": "1:10 AM",
						  "timeTableId": 0,
						  "isBreak": true,
						  "subjectName": "Urdu",
						  "teacherName": "Adil Irshad Teacher"
						},
						{
						  "id": 1004,
						  "slotId": 4,
						  "name": "p3",
						  "startTime": "2:05 AM",
						  "endTime": "2:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": "Islamiat",
						  "teacherName": "Adil Irshad Teacher"
						}
					  ]
					},
					{
					  "timeTableId": 1,
					  "classSectionId": 0,
					  "dayId": 3,
					  "dayName": "Wednesday",
					  "slots": [
						{
						  "id": 0,
						  "slotId": 1,
						  "name": "P1",
						  "startTime": "12:05 AM",
						  "endTime": "12:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 2,
						  "name": "P2",
						  "startTime": "1:05 AM",
						  "endTime": "1:10 AM",
						  "timeTableId": 0,
						  "isBreak": true,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 4,
						  "name": "p3",
						  "startTime": "2:05 AM",
						  "endTime": "2:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						}
					  ]
					},
					{
					  "timeTableId": 1,
					  "classSectionId": 0,
					  "dayId": 4,
					  "dayName": "Thursday",
					  "slots": [
						{
						  "id": 0,
						  "slotId": 1,
						  "name": "P1",
						  "startTime": "12:05 AM",
						  "endTime": "12:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 2,
						  "name": "P2",
						  "startTime": "1:05 AM",
						  "endTime": "1:10 AM",
						  "timeTableId": 0,
						  "isBreak": true,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 4,
						  "name": "p3",
						  "startTime": "2:05 AM",
						  "endTime": "2:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						}
					  ]
					},
					{
					  "timeTableId": 1,
					  "classSectionId": 0,
					  "dayId": 5,
					  "dayName": "Friday",
					  "slots": [
						{
						  "id": 0,
						  "slotId": 1,
						  "name": "P1",
						  "startTime": "12:05 AM",
						  "endTime": "12:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 2,
						  "name": "P2",
						  "startTime": "1:05 AM",
						  "endTime": "1:10 AM",
						  "timeTableId": 0,
						  "isBreak": true,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 4,
						  "name": "p3",
						  "startTime": "2:05 AM",
						  "endTime": "2:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						}
					  ]
					},
					{
					  "timeTableId": 1,
					  "classSectionId": 0,
					  "dayId": 6,
					  "dayName": "Saturday",
					  "slots": [
						{
						  "id": 0,
						  "slotId": 1,
						  "name": "P1",
						  "startTime": "12:05 AM",
						  "endTime": "12:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 2,
						  "name": "P2",
						  "startTime": "1:05 AM",
						  "endTime": "1:10 AM",
						  "timeTableId": 0,
						  "isBreak": true,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 4,
						  "name": "p3",
						  "startTime": "2:05 AM",
						  "endTime": "2:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						}
					  ]
					},
					{
					  "timeTableId": 1,
					  "classSectionId": 0,
					  "dayId": 7,
					  "dayName": "Sunday",
					  "slots": [
						{
						  "id": 0,
						  "slotId": 1,
						  "name": "P1",
						  "startTime": "12:05 AM",
						  "endTime": "12:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 2,
						  "name": "P2",
						  "startTime": "1:05 AM",
						  "endTime": "1:10 AM",
						  "timeTableId": 0,
						  "isBreak": true,
						  "subjectName": null,
						  "teacherName": null
						},
						{
						  "id": 0,
						  "slotId": 4,
						  "name": "p3",
						  "startTime": "2:05 AM",
						  "endTime": "2:10 AM",
						  "timeTableId": 0,
						  "isBreak": false,
						  "subjectName": null,
						  "teacherName": null
						}
					  ]
					}
				  ],
				  "messages": []
				}
	var data = response.content;
	tableThead = '<th class="card-table"><div class="main">Days / Hours</div></th>';
	tableTbody= '';
	$.each(data, function(k, v){
		tableTbody += '<tr><td class="days-card"><div><div class="sub">'+v.dayName+'</div></div></td>';
		
		$.each(v.slots, function(key, value) {
			if(k == 0) {
				tableThead += '<th class="card-table" column-id="'+key+'"><div class="main"><div class="sub">'+value.startTime+' to '+value.endTime+'</div><i class="fas fa-trash"></i></div></th>';
			}
			if(value.isBreak) {
				if(k == 0) {
					tableTbody += '<td rowspan="'+data.length+'" class="break-card"><div class="main"><label>Break</label></div></td>';
				}
			} else {
				tableTbody += '<td class="add-card" column-id="'+key+'"><div class="main"><div class="sub">Add New</div></div></td>';
			}
		});
		tableTbody += '</tr>';
		
		console.log(v);
	});
	
	$(".time-table > thead > tr").html(tableThead);
	$(".time-table > tbody").html(tableTbody);
	
	$('.time-table').delegate('.add-card', 'click', function(){
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).find(".sub").text("Add New");
		} else {
			$(this).addClass("active");
			$(this).find(".sub").text("Selected");
		}
		
		if($(".time-table .add-card.active").length > 0 ) {
			$("#assignSubject").removeAttr("disabled");
		} else {
			$("#assignSubject").attr("disabled", true);
		}
		
	});
	
	$('.time-table').delegate('.card-table', 'click', function(){
		columnId = $(this).attr("column-id");
		console.log(columnId);
		if($(".time-table > tbody > tr > td[column-id='"+columnId+"'].active").length == data.length) {
			$(".time-table > tbody > tr > td[column-id='"+columnId+"']").removeClass("active");
			$(".time-table > tbody > tr > td[column-id='"+columnId+"']").find(".sub").text("Add New");
		} else {
			$(".time-table > tbody > tr > td[column-id='"+columnId+"']").addClass("active");
			$(".time-table > tbody > tr > td[column-id='"+columnId+"']").find(".sub").text("Selected");
		}
		
		if($(".time-table .add-card.active").length > 0 ) {
			$("#assignSubject").removeAttr("disabled");
		} else {
			$("#assignSubject").attr("disabled", true);
		}
	});
	
	$("#assignSubject").click(function() {
		$("#select-teacher").next(".select2-container").hide();
		$("#select-subject").html('<option value="">Select Subject</option>');
		//$('.select-subject').text("Select Subject");
		$.each(subjectData, function(k, v) {
			alreadyAssigned = $(".time-table .subject-card[subject-id='"+v.id+"']").length;
			if(v.maxClass >= $(".time-table .add-card.active").length+alreadyAssigned) {
				//$("#select-subject").append('<a class="dropdown-item" href="#" data-id="'+v.id+'">'+v.name+'</a>');
				$("#select-subject").append('<option value="'+v.id+'">'+v.name+'</option>');
			}
		});
		$("#select-subject").trigger("change");
	});
	
	$("#select-subject").change(function() {
		console.log($('#select-subject').val());
		subjectIdSelected = parseInt($('#select-subject').val());
		$("#select-teacher").html("");
		$.each(subjectData, function(k, v) {
			if(v.id == subjectIdSelected) {
				//subjectId = v.id;
				//subject = v.name;
				$.each(v.teachers, function(key, value) {
					$("#select-teacher").append('<option value="'+value.id+'">'+value.name+'</option>');
				});
				$("#select-teacher").next(".select2-container").show();
				//teacherName = v.teacherName;
			}
		});
	});
	/* $('#select-subject').delegate('a', 'click', function(){
		$('.select-subject').text($(this).text());
		teacherId = parseInt($(this).attr("data-id"));
		$.each(subjectData, function(k, v) {
			if(v.id == teacherId) {
				subjectId = v.id;
				subject = v.name;
				teacherName = v.teacherName;
			}
		});
	}); */
	
	$("#modelSave").click(function() {
		if($('#select-subject').val() != "" && $('#select-teacher').val() != "") {
			$("#assignSubject").attr("disabled", true);
			subjectId = $('#select-subject').val();
			subject = $('#select-subject').find(':selected').text();
			teacherName = $('#select-teacher').find(':selected').text();
			
			cardSelected = $(".time-table .add-card.active").length;

			$.each($(".time-table .add-card.active"), function() {
				columnId = $(this).attr("column-id");
				$(this).wrap('<p class="temp" column-id="'+columnId+'"/>');
				$(".time-table .temp").html('<td class="subject-card" subject-id="'+subjectId+'"><div class="main"><div class="sub"><label>'+subject+'</label><span>'+teacherName+'</span></div><i class="fas fa-trash"></i></div></td>');
			});
			$.each($(".time-table .temp"), function() {
				$(this).find(".subject-card").attr("column-id", $(this).attr("column-id"));
				$(this).find(".subject-card").unwrap();
			});

			oldResult = parseInt($(".summary tr[subject-id='"+subjectId+"'] .allocated").text());
			$(".summary tr[subject-id='"+subjectId+"'] .allocated").text(oldResult + cardSelected);
			
			oldTotal = parseInt($(".allocated-total span").text());
			$(".allocated-total span").text(oldTotal + cardSelected);
		}
	});
	
	$('.time-table').delegate('.subject-card i', 'click', function(e){
		e.stopPropagation();
		subjectId = $(this).parent().parent().attr("subject-id");
		$(this).parent().parent().wrap('<p class="temp" />');
		$(".time-table .temp").html('<td class="add-card"><div class="main"><div class="sub">Add New</div></div></td>');
		$.each($(".time-table .temp"), function() {
			$(this).find(".add-card").unwrap();
		});
		
		oldResult = parseInt($(".summary tr[subject-id='"+subjectId+"'] .allocated").text());
		$(".summary tr[subject-id='"+subjectId+"'] .allocated").text(oldResult - 1);
		
		oldTotal = parseInt($(".allocated-total span").text());
		$(".allocated-total span").text(oldTotal - 1);
	});
	
	$('.time-table').delegate('.card-table i', 'click', function(e){
		e.stopPropagation();
		columnId = $(this).parent().parent().attr("column-id");
		console.log(columnId);
		$.each($(".time-table .subject-card[column-id='"+columnId+"']"), function() {
			subjectId = $(this).attr("subject-id");
			$(this).wrap('<p class="temp" column-id="'+columnId+'"/>');
			$(".time-table .temp").html('<td class="add-card"><div class="main"><div class="sub">Add New</div></div></td>');
			
			oldResult = parseInt($(".summary tr[subject-id='"+subjectId+"'] .allocated").text());
			$(".summary tr[subject-id='"+subjectId+"'] .allocated").text(oldResult - 1);
			
			oldTotal = parseInt($(".allocated-total span").text());
			$(".allocated-total span").text(oldTotal - 1);
		});
		$.each($(".time-table .temp"), function() {
			$(this).find(".add-card").attr("column-id", $(this).attr("column-id"));
			$(this).find(".add-card").unwrap();
		});
	});
	
	$(".required span").text($(".time-table .add-card").length);
	$.each(subjectData, function(k, v) {
		$(".summary > tbody").append('<tr subject-id="'+v.id+'"><td>'+v.name+'</td><td><span class="allocated">0</span> / '+v.maxClass+'</td></tr>');
	});
})











