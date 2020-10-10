/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#saveChangesVideo").attr('disabled',true);
    $("#flieTypeBtn").attr('disabled',true);
    $("#ReasoningBlock").addClass("d-none");
    //For Video Calling Div
    count=1;
    //For File Type Div
    roww=1;
    option=1;
    optionGenRow=2;
    $("#videoCallSaveDataBtn").attr("disabled", true);
   
  
    
function createOptions(option){
    $("#fileEnableOpt").append('<select class="form-control select2 w-100 " name="param" id="isFileEnable_'+option+'"  style="width: 100%; opacity:1;">'+
    +'<option value="0">No</option>'+
    +'<option value="1">Yes</option>'+
+'</select>');

}

$('#kt_select2_1, #isFileEnable_'+option).select2({
    placeholder: 'Select YES for Enable File Button'
});

$('#kt_select2_1, #displayRecord').select2({
    placeholder: 'Set Your Display Record Settings'
});


function generateForms(count){
    $("#generate").append('<div id="ServerInformation_'+count+'" class="d-none row">'+
    '<div  id="VideoServerForm">'+
    '<div class="row" >'+
    '<h5 class="ml-4" id="serverInfoCountHeading_'+count+'"></h5>'+
    '</div>'+
    '<div class="form-group row mt-4">'+
    '   <div class="col-lg-6">'+
    '       <label>Server Address</label>'+
    '       <input type="text" id="serverAddress_'+count+'" name="serverAddress"  class="form-control " placeholder="Server Address"/>'+
    '       <div id="serverAddressMsg_'+count+'" class="textualEr"></div>'+
    '    </div>'+
    '   <div class="col-lg-6">'+
    '       <label>Server Port</label>'+
    '        <input type="text" id="port_'+count+'" class="form-control" placeholder="Server Port"/>'+
    '       <div id="serverPortMsg_'+count+'" class="textualEr"></div>'+
    '   </div>'+
    '</div>'+
    '<div class="form-group row">'+
    '   <div class="col-lg-6">'+
    '       <label>Server Username</label>'+
    '       <input type="text" id="ServerUsername_'+count+'" class="form-control" placeholder="Server username"/>'+
    '       <div id="serverUserMsg_'+count+'" class="textualEr"></div>'+
    '   </div>'+
    '   <div class="col-lg-6">'+
    '       <label>Server Password</label>'+
    '       <input type="text" id="serverPassword_'+count+'" class="form-control" placeholder="Server Password"/>'+
    '       <div id="serverPassMsg_'+count+'" class="textualEr"></div>'+
    '   </div>'+
    '</div>'+
    '<div class="form-group row">'+
    '   <div class="col-lg-6">'+
    '       <label>Maximum Concert Connections</label>'+
    '       <input type="text" id="serverConn_'+count+'" class="form-control" placeholder="Maximum Connections"/>'+
    '       <div id="serverConnMsg_'+count+'" class="textualEr"></div>'+
    '   </div>'+
    '   <div class="col-lg-6">'+
    '       <button type="button"  id="kt_sweetalert_demo_8" onclick="openConfirmationWindow('+count+')"  class="btn btn-danger float-right  mt-8">'+
    '       <i class="far fa-trash-alt"></i>'+ 
    '        <strong>Delete Server Info</strong></button>'+
    '   </div>'+
    '</div>'+
'</div><hr/></div>');
}

function rowFileGenerate(roww){
    
    //$("#dynamic-container").clone().appendTo()
    $(".addFileRows").append('<div class="row" id="rowFile_'+roww+'"><div  class="col-lg-5" >'+
    '<select class="form-control select2 mt-10" id="isFile_'+roww+'"  style="width: 100%; opacity:1;">'+
    '<option selected>.JPG</option>'+
    '<option>.PNG</option>'+
    '<option>.PDF</option>'+
    '</select>'+
    '</div>'+
    '<div class="col-lg-5 form-group ">'+
    '<div class="input-group">'+
    '<input type="text" class="form-control" id="fileSize_'+roww+'" placeholder="File Size" aria-describedby="basic-addon2">'+
    '<div class="input-group-append">'+
    '<span class="input-group-text">MB</span>'+
    '</div><div id="fileSizeEr_'+roww+'" class="textualEr"></div></div></div>'+
    '<div class="col-lg-2 chooseExtension mt-4 ">'+
    '<i onclick="delRow('+roww+')" class="far fa-window-close"></i>'+
    '</div></div></div>');

    $('#kt_select2_1, #isFile_'+roww).select2({
        placeholder: 'Select YES for Enable File Button'
    });

}



$('#displayRecord').select2({
    placeholder: "Select a Record for Save a Setting"
});


$('#kt_select2_1, #isFile_'+roww).select2({
    placeholder: 'Select a File Extension'
});





  




$("#SystemSetupVideoCallingStatus").change(function () {
    
    SystemSetupVideoCallingStatus = parseInt($('#SystemSetupVideoCallingStatus').val());
    if (SystemSetupVideoCallingStatus === 1)
    {   
        $("#VideoCalling").addClass("d-block");
        $("#generate").removeClass("d-none");
        
       

    }else if(SystemSetupVideoCallingStatus === 0){
        $("#videoCallSaveDataBtn").attr("disabled", true);
        $("#ServerInfoBtn").removeClass("d-block");
        $("#VideoCalling").removeClass("d-block");
        $("#generate").addClass("d-none");
        for(i=1;i<count;i++){
            
            $("#ServerInformation_"+i).remove();
        }
        count=1;
    }
    
});



$("#SystemStatus").change(function () {
    
    SystemStatus = parseInt($('#SystemStatus').val());
    if (SystemStatus === 0)
    {
              
       $("#ReasoningBlock").removeClass("d-none");
      

    }else if(SystemStatus === 1){
        
        $("#ReasoningBlock").addClass("d-none");
    }
});

$("#SystemSetupVideoCallTool").change(function () {
    
    SystemSetupVideoCallTool = parseInt($('#SystemSetupVideoCallTool').val());
    if (SystemSetupVideoCallTool !== 0)
    {
              
       $("#ServerInfoBtn").addClass("d-block");
       $("#delServerInfo").addClass("d-block");

    }
});

$("#fileBtn").click(function(){
    $("#flieTypeBtn").attr('disabled',false);
    rowFileGenerate(roww,optionGenRow);
    roww++;
});

//
//$("#ServerInfoBtn").click(function () {
//    
//    $("#ServerInformation").addClass("d-block");   
//    $('#ServerInformation').append($('#ServerInformation'));
//    //$("#ServerInformation").append()
//              
//              
//              var row = $('#ServerInformation #row:eq(0)').clone();
//$('#ServerInfoBtn').data('#row',row);
////$('#ServerInfoBtn').click(function(){
////  $('#ServerInformation').append($(this).data('row').clone());
////});
//
//       
//
//    
//});

$("#isFileEnable_"+option).change(function () {
    
    isFileEnable = parseInt($('#isFileEnable_'+option).val());
    if (isFileEnable  === 1)
    {   
        $("#fileBtn").addClass("d-block");
    }else if(isFileEnable  === 0){
        $("#fileTypeSaves").attr("disabled", true);
        $("#fileBtn").removeClass("d-block");
        for(i=1;i<roww;i++){
            
            $("#rowFile_"+i).remove();
        }
    }
    
});





var $container = $('#ServerInformation');
var $row = $('#VideoServerForm');
var $add = $('#ServerInfoBtn');
var $dlt=$('#delServerInfo');
//var $remove = $('#removeButton');
var $focused;

$container.on('click', 'input', function () {
    $focused = $(this);
});


// $("#delServerInfo_1").click(function(){
//     alert("ok");
//   //  $("ServerInformation_"+mem).remove();
// });

$add.on('click', function () {
    $("#saveChangesVideo").attr('disabled',false);
    //var $dlt=$('#ServerInfoDltBtn_'+count);
    generateForms(count);
    $("#ServerInformation_"+count).addClass("d-block");
    $("#serverInfoCountHeading_"+count).text("Server Detail " + count);
    count++;
    var $newRow = $row.clone().insertAfter('.row:last');
    $newRow.find('input').each(function () {
        this.value = '';
    });
    
});




});

//function fileExtensionEnabler(){
   
  //  rowFileGenerate(roww);
    //$(".chooseExtension").addClass("d-block");
   // roww++;
//}

function delRow(id){
   
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function(result) {
        if (result.value) {
            $("#rowFile_"+id).remove();
           
            
           
            Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
            )
        }
    });
}

function openConfirmationWindow(id){
    

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function(result) {
        if (result.value) {
            $("#ServerInformation_"+id).remove();
            $("#saveChanges_"+id).remove();
            $("#reset_"+id).remove();
            Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
            )
        }
    });
}



//function checkEr(){
    
   //
//}
function saveFileInfo(){
    for(i=1;i<roww;i++){
           if($("#fileSize_"+i).val()===""){
            $("#fileSize_"+i).addClass("is-invalid");
               $("#fileSizeEr_"+i).text("Please Enter File Size ");
           }else{
            $("#fileSize_"+i).removeClass("is-invalid");
            $("#fileSizeEr_"+i).text("");
           }
       }
}

function saveVideoForm(){
    
    for(specForm=1;specForm<count;specForm++){
        var checkForNumeric=$("#port_"+specForm).val();
        if($("#serverAddress_"+specForm).val()===""){
            $("#serverAddress_"+specForm).addClass("is-invalid");
            $("#serverAddressMsg_"+specForm).text("Please Enter Server Name ");
        }else{
            $("#serverAddress_"+specForm).removeClass("is-invalid");
            $("#serverAddressMsg_"+specForm).text("");
        }
        if($("#ServerUsername_"+specForm).val()===""){
            $("#ServerUsername_"+specForm).addClass("is-invalid");
            $("#serverUserMsg_"+specForm).text("Please Enter Server Username ");
        }else{
            $("#ServerUsername_"+specForm).removeClass("is-invalid");
            $("#serverUserMsg_"+specForm).text("");
        }
        if($("#serverPassword_"+specForm).val()===""){
            $("#serverPassword_"+specForm).addClass("is-invalid");
            $("#serverPassMsg_"+specForm).text("Please Enter Server Password ");
        }else{
            $("#serverPassword_"+specForm).removeClass("is-invalid");
            $("#serverPassMsg_"+specForm).text("");
        }
        if($("#serverConn_"+specForm).val()===""){
            $("#serverConn_"+specForm).addClass("is-invalid");
            $("#serverConnMsg_"+specForm).text("Please Enter Server Password ");
        }else{
            $("#serverConn_"+specForm).removeClass("is-invalid");
            $("#serverConnMsg_"+specForm).text("");
        }
        if($("#port_"+specForm).val()===""){
            checkForNumeric=2;
            $("#port_"+specForm).addClass("is-invalid");
            $("#serverPortMsg_"+specForm).text("Please Enter Server Port ");
        }else{
            $("#port_"+specForm).removeClass("is-invalid");
            $("#serverPortMsg_"+specForm).text("");
        }
        if(!(0>=checkForNumeric)&&(!(5000<=checkForNumeric))){
            $("#port_"+specForm).addClass("is-invalid");
            $("#serverPortMsg_"+specForm).text("Invalid Input");
        }else{
            $("#port_"+specForm).removeClass("is-invalid");
            $("#serverPortMsg_"+specForm).text("");
        }
    }
}


// $(function() {
//     $("button").on("click", function() {
//       $("#dynamic-container").append($('<select class="form-control select2 w-100 mt-8" id="isFile_'+roww+'"  style="width: 100%; opacity:1;"><option value="0">.JPG</option><option value="1">.PNG</option><option value="2">.PDF</option></select>'));
//     });
  
//     // select the target node
//     var target = document.getElementById('dynamic-container');
  
//     if (target) {
//       // create an observer instance
//       var observer = new MutationObserver(function(mutations) {
//         //loop through the detected mutations(added controls)
//         mutations.forEach(function(mutation) {
//         //addedNodes contains all detected new controls
//           if (mutation && mutation.addedNodes) {
//             mutation.addedNodes.forEach(function(elm) {
//             //only apply select2 to select elements
//               if (elm && elm.nodeName === "SELECT") {
//                 $(elm).select2();
//               }
//             });
//           }
//         });
//       }); 
      
//       // pass in the target node, as well as the observer options
//       observer.observe(target, {
//         childList: true
//       });
  
//       // later, you can stop observing
//       //observer.disconnect();
//     }
//   });