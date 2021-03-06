<!DOCTYPE html>
<html lang="en">
<!--begin::Head-->

<head>
    <meta charset="utf-8" />
    <title>School Name XXXXXXX | Create Question</title>
    <meta name="description" content="Page with empty content" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <?php require_once './style.php'; ?>
    <style>
        .multi-choice-td {
            vertical-align: middle !important;
        }
    </style>

    <!-- begin:: ahmed_teacher_edit's style -->
    <link rel="stylesheet" href="ahmed_teacher_edit/style/style.css">
    <!-- end:: ahmed_teacher_edit's style -->

    <!-- begin:: jkanban's style -->
    <link rel="stylesheet" href="ahmed_teacher_edit/style/jkanban.min.css">
    <!-- end:: jkanban's style -->

    <!-- begin:: UrduEditor's style -->
    <!-- <link rel="stylesheet" href="ahmed_teacher_edit/style/UrduEditor.css"> -->
    <!-- end:: UrduEditor's style -->
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/ui-lightness/jquery-ui.css" rel="stylesheet">
    <!-- <link href="ahmed_teacher_edit/style/keyboard.css" rel="stylesheet"> -->
    <!-- <link rel="stylesheet" type="text/css" href="http://www.arabic-keyboard.org/keyboard/keyboard.css">  -->

</head>
<!--end::Head-->
<!--begin::Body-->

<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">


    <!--begin::Main-->
    <!--begin::Header Mobile-->
    <?php require_once 'MobileHeader.php'; ?>
    <!--end::Header Mobile-->
    <div class="d-flex flex-column flex-root">
        <!--begin::Page-->
        <div class="d-flex flex-row flex-column-fluid page">
            <!--begin::Aside-->
            <?php require_once './leftmenu.php'; ?>
            <!--end::Aside-->
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                <!--begin::Header-->
                <div id="kt_header" class="header  header-fixed ">
                    <?php require_once 'topheader.php'; ?>
                </div>
                <!--end::Header-->
                <!--begin::Content-->
                <div class="content  d-flex flex-column flex-column-fluid" id="kt_content">
                    <!--begin::Subheader-->
                    <div class="subheader py-2 py-lg-6  subheader-solid " id="kt_subheader">
                        <div class=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                            <!--begin::Info-->
                            <div class="d-flex align-items-center flex-wrap mr-1">

                                <!--begin::Page Heading-->
                                <div class="d-flex align-items-baseline flex-wrap mr-5">
                                    <!--begin::Page Title-->
                                    <h5 class="text-dark font-weight-bold my-1 mr-5">
                                        Create Question </h5>
                                    <!--end::Page Title-->

                                    <!--begin::Breadcrumb-->
                                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                                        <li class="breadcrumb-item">
                                            <a href="" class="text-muted">
                                                XXXXXXX </a>
                                        </li>
                                        <li class="breadcrumb-item">
                                            <a href="" class="text-muted">
                                                XXXXXX </a>
                                        </li>
                                    </ul>
                                    <!--end::Breadcrumb-->
                                </div>
                                <!--end::Page Heading-->
                            </div>
                            <!--end::Info-->
                        </div>
                    </div>
                    <!--end::Subheader-->
                    <!--begin::Entry-->
                    <div class="d-flex flex-column-fluid">
                        <!--begin::Container-->
                        <div class=" container-fluid ">
                            <div class="card card-custom card-sticky" id="kt_page_sticky_card">
                                <div class="card-header">
                                    <div class="card-title">
                                        <h3 class="card-label">Create New Question</h3>
                                    </div>
                                    <div class="card-toolbar">
                                        <a href="#" class="btn btn-light-primary font-weight-bolder mr-2">
                                            <i class="ki ki-long-arrow-back icon-xs"></i>
                                            Back
                                        </a>
                                        <a href="#" id="previewButton" class="btn btn-light-primary font-weight-bolder mr-2" data-toggle="modal" data-target="#previewBox">
                                            <i class="nav-icon flaticon-eye"></i>
                                            Preview
                                        </a>
                                        <div class="btn-group">
                                            <button id="saveForm" type="button" class="btn btn-primary font-weight-bolder">
                                                <i class="ki ki-check icon-xs"></i>Save Form</button>
                                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                                <ul class="nav nav-hover flex-column">
                                                    <li class="nav-item">
                                                        <a href="#" class="nav-link">
                                                            <i class="nav-icon flaticon2-reload"></i>
                                                            <span class="nav-text">Save &amp; continue</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#" class="nav-link">
                                                            <i class="nav-icon flaticon2-add-1"></i>
                                                            <span class="nav-text">Save &amp; add new</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#" class="nav-link">
                                                            <i class="nav-icon flaticon2-power"></i>
                                                            <span class="nav-text">Save &amp; exit</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <!--begin::Form-->
                                    <form class="form" id="kt_form">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="form-group row">
                                                    <label class="col-6 col-form-label text-right">Academic Year</label>
                                                    <div class="col-6 text-left">
                                                        <select class="form-control select2 is-valid w-100" id="AcademicYear" name="param" style="width: 100%;">
                                                            <option value="1">2020 - 2021</option>
                                                            <option value="0">2021 - 2020</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="form-group row">
                                                    <div class="col-lg-3">
                                                        <label>Class / Grade</label>
                                                        <select class="form-control select2 is-valid w-100" id="StudentClass" name="param" style="width: 100%;">
                                                            <option value=""></option>

                                                            <option value="1">Grade 01</option>
                                                            <option value="0">Grade 02</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-lg-3">
                                                        <label>Subject Name</label>
                                                        <select class="form-control select2 is-valid w-100" id="StudentSection" name="param" style="width: 100%;">
                                                            <option value=""></option>
                                                            <option value="1">English</option>
                                                            <option value="0">Urdu</option>
                                                            <option value="2">Islamic Studies</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <label>Topic Name <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="You can write the topic name here, i.e. Environment Pollution."></i></label>
                                                        <input id="topicName" type="text" class="form-control" name="TopicName" placeholder="Environment Pollution">
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-lg-6">
                                                        <label>Filter Tags <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="You can add multiple tags with this question, these tags will help in searching the right question wile creating task"></i></label>
                                                        <select class="form-control select2 is-valid w-100" multiple="" id="FilterTags" name="param" style="width: 100%;">
                                                        </select>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <label>Question Type <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="We have multiple types of questions available in system, each question have their own pattren to answer"></i></label>
                                                        <select class="form-control select2 is-valid w-100" id="QuestionType" name="param" style="width: 100%;">
                                                            <option value=""></option>
                                                            <option value="1">Short Answer/Essay</option>
                                                            <option value="2">Multiple choice</option>
                                                            <option value="3">True/False</option>
                                                            <option value="4">Assortment</option>
                                                            <option value="5">Drag & Drop</option>
                                                            <option value="6">Image Labelling</option>
                                                            <option value="7">Fill in the blanks</option>
                                                            <option value="8">Audio/Video Based Questions</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-lg-12" id="questionTextInput">
                                                        <label>Type Your Question</label>
                                                        <input type="text" class="form-control keyboardInput keyboard" id="questionInput" value="" placeholder="Type Your Question Statement">
                                                    </div>

                                                    <div class="col-lg-6">

                                                        <!--end::Body-->
                                                        <div class="accordion accordion-solid accordion-panel accordion-svg-toggle mb-10" id="AdvanceSearch">
                                                            <div class="float-left btn btn-sm btn-light-primary font-weight-bolder text-uppercase collapsed mt-3" data-toggle="collapse" data-target="#AdvanceSearchElements" aria-expanded="false" role="button">
                                                                <span data-toggle="popover" data-placement="top" data-content="Whatever statement you will write in this box, will be displayed as the question statement.">
                                                                    <span id="detailsButtonLabel">
                                                                        Add Further Details of this question
                                                                    </span>
                                                                    <span class="svg-icon svg-icon-primary">
                                                                        <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-right.svg-->
                                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                                                <path d="M12.2928955,6.70710318 C11.9023712,6.31657888 11.9023712,5.68341391 12.2928955,5.29288961 C12.6834198,4.90236532 13.3165848,4.90236532 13.7071091,5.29288961 L19.7071091,11.2928896 C20.085688,11.6714686 20.0989336,12.281055 19.7371564,12.675721 L14.2371564,18.675721 C13.863964,19.08284 13.2313966,19.1103429 12.8242777,18.7371505 C12.4171587,18.3639581 12.3896557,17.7313908 12.7628481,17.3242718 L17.6158645,12.0300721 L12.2928955,6.70710318 Z" fill="#000000" fill-rule="nonzero" />
                                                                                <path d="M3.70710678,15.7071068 C3.31658249,16.0976311 2.68341751,16.0976311 2.29289322,15.7071068 C1.90236893,15.3165825 1.90236893,14.6834175 2.29289322,14.2928932 L8.29289322,8.29289322 C8.67147216,7.91431428 9.28105859,7.90106866 9.67572463,8.26284586 L15.6757246,13.7628459 C16.0828436,14.1360383 16.1103465,14.7686056 15.7371541,15.1757246 C15.3639617,15.5828436 14.7313944,15.6103465 14.3242754,15.2371541 L9.03007575,10.3841378 L3.70710678,15.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(9.000003, 11.999999) rotate(-270.000000) translate(-9.000003, -11.999999)" />
                                                                            </g>
                                                                        </svg>
                                                                        <!--end::Svg Icon-->
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>



                                                    </div>


                                                </div>
                                                <div id="AdvanceSearchElements" class="collapse" aria-labelledby="faqHeading1" data-parent="#AdvanceSearch">
                                                    <div class="form-group row">
                                                        <div class="col-lg-12 question_text">

                                                            <div class="summernote" id="QuestionEditor"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Image Labeling  (6) -->
                                                <div id="ImageLabeling" class="question_type" style="display: none;">

                                                    <div class="row">
                                                        <div class="offset-lg-4 col-lg-4 text-center font-weight-bold">
                                                            <label>Upload Question's Image</label>
                                                            <div class="dropzone dropzone-default dropzone-success" id="imageLabelingQuestionUpload">
                                                                <div class="dropzone-msg dz-message needsclick">
                                                                    <h3 class="dropzone-msg-title">Drop files here or click to upload.</h3>
                                                                    <span class="dropzone-msg-desc">Only images are allowed for upload</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6" style="display: flex;">
                                                            <a class="clearMark btn btn-warning" style="margin: auto; display:none">Clear All Marks</a>
                                                        </div>
                                                        <div class="col-lg-6" style="display: flex;">
                                                            <a class="deleteImg btn btn-danger" style="margin: auto; display:none">Delete Image</a>
                                                        </div>
                                                    </div>
                                                    <hr>

                                                    <div class="editing_body row">
                                                        <div class="col-4 left_group">
                                                        </div>
                                                        <div class="col-4 question_img_div">
                                                            <img src="" alt="">
                                                        </div>
                                                        <div class="col-4 right_group">
                                                        </div>
                                                    </div>

                                                    <hr>

                                                    <div class="row">
                                                        <div class="col-lg-7">
                                                            <div class="form-group row">

                                                                <div class="col-lg-4">
                                                                    <label> Randomize Options <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want randomized choices for every student, please turn this value ON."></i></label>
                                                                    <input id="imageLabelingRandomizeOptions" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <label> Allow Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want while answer if students can upload attachment, please turn this option ON."></i></label>
                                                                    <input id="imageLabelingAllowAttach" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <label> Allow Partial Credit <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want to enable partial credit, please turn this option ON."></i></label>
                                                                    <input id="imageLabelingAllowPartialCredit" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-lg-5">
                                                                    <label>Display Type</label><br>
                                                                    <select id="imageLabelingDisplayType" class="form-control select2 is-valid w-100" name="display_type">
                                                                        <option value="dragging">Display answer to students</option>
                                                                        <option value="fill">Don't display answer to students</option>
                                                                        <option value="enumerate">Student can answer of their choice </option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-lg-3">
                                                                    <label>Maximum Marks ? </label><br>
                                                                    <input id="imageLabelingMaximumMarks" type="text" class="form-control" name="MaximumMarks" value="0" />
                                                                    <small class="text-muted">Set '0' if no marks required</small>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <label>Set Maximum Time ? </label><br>
                                                                    <div class="input-group">
                                                                        <input id="imageLabelingMaximumTime" type="text" class="form-control" placeholder="Maximum Time Limit" aria-describedby="basic-addon2" value="0">
                                                                        <div class="input-group-append">
                                                                            <span class="input-group-text">Minutes</span>
                                                                        </div>
                                                                    </div>
                                                                    <small class="text-muted">Set '0' for unlimited Time</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-5">
                                                            <div class="form-group row">
                                                                <div class="col-lg-12">
                                                                    <label>Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="if you would like to share some images/diagram/pdf document with this question, please attach photo here. Attached file will display to the studens with this question."></i></label>
                                                                    <div class="dropzone dropzone-default dropzone-success" id="imageLabelingAttachFilesWithQuestion">
                                                                        <div class="dropzone-msg dz-message needsclick">
                                                                            <h3 class="dropzone-msg-title">Drop files here or click to upload.</h3>
                                                                            <span class="dropzone-msg-desc">Only image, .pdf, .doc & .docx files are allowed for upload</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                                <!-- End Image Labeling  -->

                                            </div>
                                        </div>
                                    </form>
                                    <!--end::Form-->
                                </div>

                            </div>
                        </div>
                        <!--end::Container-->
                    </div>
                    <!--end::Entry-->
                </div>
                <!--end::Content-->

                <!--begin::Footer-->
                <div class="footer bg-white py-4 d-flex flex-lg-column " id="kt_footer">
                    <!--begin::Container-->
                    <?php require_once 'footer.php'; ?>
                    <!--end::Container-->
                </div>
                <!--end::Footer-->
            </div>
            <!--end::Wrapper-->
        </div>
        <!--end::Page-->
    </div>
    <!--end::Main-->

    <!-- Modal-->
    <div class="modal fade" id="previewBox" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl " role="document">
            <div class="modal-content">
                <div class="modal-header row">
                    <h5 class="modal-title col-lg-6" id="previewModalLabel">
                        Preview Question Type :
                        <span class="previewQuestionType"></span>
                    </h5>
                    <h5 class="modal-subject col-lg-5">
                        <span class="grade"></span>
                        <span>|</span>
                        <span class="subject"></span>
                    </h5>
                    <button type="button" class="col-lg-1 close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <div class="modal-body row" data-scroll="true">
                    <div class="preview_body col-lg-9">
                    </div>
                    <div class="preview_options col-lg-3">

                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-primary font-weight-bold text-center closePreview" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>


    <?php require_once './HeaderRightTopPanel.php'; ?>

    <div class="keyboardDiv">
        <div class="keyboardIcon"><i class="far fa-keyboard"></i></div>
        <img src="ahmed_teacher_edit/img/keyboardUrdu.png" alt="keyboardUrdu" class="keyboardUrdu">
        <img src="ahmed_teacher_edit/img/keyboardArabic.png" alt="keyboardArabic" class="keyboardArabic">
    </div>
    <!--end::Global Config-->

    <?php require_once './scripts.php'; ?>

    <!-- <script type="text/javascript" src="http://www.arabic-keyboard.org/keyboard/keyboard.js" charset="UTF-8"></script>  -->
    <!-- <script src="ahmed_teacher_edit/script/jquery.keyboard/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script> -->

    <!-- begin:: jkanban -->
    <script src="ahmed_teacher_edit/script/jkanban.min.js" type="text/javascript"></script>
    <!-- end:: jkanban -->

    <!-- begin:: UrduEditor -->
    <script src="ahmed_teacher_edit/script/urdutextbox.js" type="text/javascript"></script>
    <!-- end:: UrduEditor -->

    <!-- begin:: arabicEditor -->
    <script src="ahmed_teacher_edit/script/arabictextbox.js" type="text/javascript"></script>
    <!-- end:: arabicEditor -->

    <!-- begin:: ahmed_teacher_edit's Script -->
    <script src="ahmed_teacher_edit/script/image_labeling.js" type="text/javascript"></script>
    <!-- end:: ahmed_teacher_edit's Script -->


    <script src="assets/custom/js/CreateQuestion.js" type="text/javascript"></script>
    <!--end::Page Scripts-->
</body>
<!--end::Body-->

</html>