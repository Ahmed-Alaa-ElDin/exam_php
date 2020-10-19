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

  <!-- begin:: Ahmed's style -->
  <link rel="stylesheet" href="ahmed/style/style.css">
  <!-- end:: Ahmed's style -->

  <!-- begin:: jkanban's style -->
  <link rel="stylesheet" href="ahmed/style/jkanban.min.css">
  <!-- end:: jkanban's style -->

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
                      <div class="col-lg-4 offset-lg-8 float-right">
                        <div class="form-group row">
                          <label class="col-4 col-form-label text-right">Academic Year</label>
                          <div class="col-8">
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
                          <div class="col-lg-12">
                            <label>Type Your Question <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="Whatever statement you will write in this box, will be displayed as the question statement."></i></label>
                            <div class="summernote" id="QuestionEditor"></div>
                          </div>
                        </div>

                        <!-- Short Question (1)-->
                        <div id="ShortQuestion" class="question_type" style="display: none;">

                          <div class="form-group row">
                            <div class="col-lg-2">
                              <label> Allow Rich Text Editor <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want student will able to write answer into rich text editor, please turn this value ON."></i></label>
                              <input id="essayAllowRichText" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                            </div>
                            <div class="col-lg-2">
                              <label> Allow Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want while answer if students can upload attachment, please turn this option ON."></i></label>
                              <input id="essayAllowAttach" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                            </div>
                            <div class="col-lg-2">
                              <label>Maximum Marks ? </label><br>
                              <input id="essayMaximumMarks" type="text" class="form-control" name="MaximumMarks" value="0" />
                              <small class="text-muted">Set '0' if no marks required</small>
                            </div>
                            <div class="col-lg-3">
                              <label>Words Count Limit ? </label><br>
                              <input id="essayWordCount" type="text" class="form-control" name="WordsLimit" value="0" />
                              <small class="text-muted">Set '0' for unlimited words</small>
                            </div>
                            <div class="col-lg-3">
                              <label>Set Maximum Time ? </label><br>
                              <div class="input-group">
                                <input id="essayMaximumTime" type="text" class="form-control" placeholder="Maximum Time Limit" aria-describedby="basic-addon2" value="0">
                                <div class="input-group-append">
                                  <span class="input-group-text">Minutes</span>
                                </div>
                              </div>
                              <small class="text-muted">Set '0' for unlimited Time</small>
                            </div>
                          </div>


                          <div class="form-group row">
                            <div class="col-lg-12">
                              <label>Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="if you would like to share some images/diagram/pdf document with this question, please attach photo here. Attached file will display to the studens with this question."></i></label>
                              <div class="dropzone dropzone-default dropzone-success" id="essayAttachFilesWithQuestion">
                                <div class="dropzone-msg dz-message needsclick">
                                  <h3 class="dropzone-msg-title">Drop files here or click to upload.</h3>
                                  <span class="dropzone-msg-desc">Only image, .pdf, .doc & .docx files are allowed for upload</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- End Short Question  -->

                        <!-- MultiChoice (2)-->
                        <div id="MultiChoice" class="question_type" style="display: none;">

                          <div id="RepeaterContactNumber">

                            <div class="row">
                              <div class="col-lg-6">
                                <h4>Enter Possible Answers</h4>
                              </div>
                              <div class="col-lg-6 mb-10">
                                <button type="button" class="btn btn-danger float-right" data-repeater-create="">
                                  <i class="fas fa-plus"></i> <strong>Add New Choice</strong>
                                </button>
                              </div>
                            </div>

                            <div class="table-responsive">
                              <table class="table table-borderless" data-repeater-list="">
                                <thead>
                                  <th>Image</th>
                                  <th>Choice(s)</th>
                                  <th>Correct Answer</th>
                                  <th class="text-center">Remove</th>
                                </thead>
                                <tr data-repeater-item="" class="choice">
                                  <td class="multi-choice-td">
                                    <div class="dropzone dropzone-default kt_dropzone_1 MCQAttachments">
                                      <div class="dropzone-msg dz-message needsclick">
                                        <h3 class="dropzone-msg-title"><i class="fa fa-file fa-3x"></i></h3>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="multi-choice-td">
                                    <input type="text" class="form-control choice-text" placeholder="Enter Possible Choice">
                                  </td>
                                  <td class="multi-choice-td pl-10  text-center" align="center">
                                    <label class="checkbox checkbox-lg text-center">
                                      <input type="checkbox" class="choice-right-false" checked="checked" name="Checkboxes3_1" />
                                      <span></span>
                                    </label>
                                  </td>
                                  <td class="multi-choice-td  text-center">
                                    <a href="javascript:;" data-repeater-delete="" class="btn font-weight-bold btn-danger btn-icon">
                                      <i class="la la-remove"></i>
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <hr>

                          <div class="row">
                            <div class="col-lg-7">
                              <div class="form-group row">

                                <div class="col-lg-4">
                                  <label> Randomize Options <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want randomized choices for every student, please turn this value ON."></i></label>
                                  <input id="mcqRandomizeOptions" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want while answer if students can upload attachment, please turn this option ON."></i></label>
                                  <input id="mcqAllowAttach" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Partial Credit <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want to enable partial credit, please turn this option ON."></i></label>
                                  <input id="mcqAllowPartialCredit" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                              </div>
                              <div class="form-group row">
                                <div class="col-lg-6">
                                  <label>Maximum Marks ? </label><br>
                                  <input id="mcqMaximumMarks" type="text" class="form-control" name="MaximumMarks" value="0" />
                                  <small class="text-muted">Set '0' if no marks required</small>
                                </div>
                                <div class="col-lg-6">
                                  <label>Set Maximum Time ? </label><br>
                                  <div class="input-group">
                                    <input id="mcqMaximumTime" type="text" class="form-control" placeholder="Maximum Time Limit" aria-describedby="basic-addon2" value="0">
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
                                  <div class="dropzone dropzone-default dropzone-success" id="mcqAttachFilesWithQuestion">
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
                        <!-- End MultiChoice -->

                        <!-- True False (3)-->
                        <div id="TrueFalse" class="question_type" style="display: none;">

                          <div class="row">
                            <div class="col-lg-6">
                              <h4>Enter Possible Answers</h4>
                            </div>
                            <div class="col-lg-6 mb-10">
                              <button type="button" class="btn btn-danger float-right" data-repeater-create="">
                                <i class="fas fa-plus"></i> <strong>Add New Choice</strong>
                              </button>
                            </div>
                          </div>

                          <div class="table-responsive">
                            <table class="table table-borderless" data-repeater-list="">
                              <thead class="text-center">
                                <th>Image</th>
                                <th>Choice(s)</th>
                                <th>Correct Answer</th>
                                <th class="text-center">Remove</th>
                              </thead>
                              <!-- insert new choices here -->
                            </table>
                          </div>
                          <hr>

                          <div class="row">
                            <div class="col-lg-7">
                              <div class="form-group row">

                                <div class="col-lg-4">
                                  <label> Randomize Options <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want randomized choices for every student, please turn this value ON."></i></label>
                                  <input id="trueFalseRandomizeOptions" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want while answer if students can upload attachment, please turn this option ON."></i></label>
                                  <input id="trueFalseAllowAttach" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Partial Credit <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want to enable partial credit, please turn this option ON."></i></label>
                                  <input id="trueFalseAllowPartialCredit" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                              </div>
                              <div class="form-group row">
                                <div class="col-lg-6">
                                  <label>Maximum Marks ? </label><br>
                                  <input id="trueFalseMaximumMarks" type="text" class="form-control" name="MaximumMarks" value="0" />
                                  <small class="text-muted">Set '0' if no marks required</small>
                                </div>
                                <div class="col-lg-6">
                                  <label>Set Maximum Time ? </label><br>
                                  <div class="input-group">
                                    <input id="trueFalseMaximumTime" type="text" class="form-control" placeholder="Maximum Time Limit" aria-describedby="basic-addon2" value="0">
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
                                  <div class="dropzone dropzone-default dropzone-success" id="trueFalseAttachFilesWithQuestion">
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
                        <!-- End True False -->

                        <!-- Assortment  (4) -->
                        <div id="Assortment" class="question_type" style="display: none;">

                          <div class="row">
                            <div class="col-lg-6">
                              <h4>Enter New Element</h4>
                            </div>
                            <div class="col-lg-6 mb-10">
                              <button type="button" class="btn btn-danger float-right" data-repeater-create="">
                                <i class="fas fa-plus"></i> <strong>Add New Element</strong>
                              </button>
                            </div>
                          </div>

                          <div class="table-responsive">
                            <table class="table table-borderless" data-repeater-list="">
                              <thead class="text-center">
                                <th style="width: 25%">Image</th>
                                <th style="width: 50%">Text</th>
                                <th style="width: 15%">Order</th>
                                <th class="text-center" style="width: 10%">Remove</th>
                              </thead>
                              <!-- insert new choices here -->
                            </table>
                          </div>
                          <hr>

                          <div class="row">
                            <div class="col-lg-7">
                              <div class="form-group row">

                                <div class="col-lg-4">
                                  <label> Randomize Options <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want randomized choices for every student, please turn this value ON."></i></label>
                                  <input id="assortmentRandomizeOptions" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want while answer if students can upload attachment, please turn this option ON."></i></label>
                                  <input id="assortmentAllowAttach" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Partial Credit <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want to enable partial credit, please turn this option ON."></i></label>
                                  <input id="assortmentAllowPartialCredit" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                              </div>
                              <div class="form-group row">
                                <div class="col-lg-6">
                                  <label>Maximum Marks ? </label><br>
                                  <input id="assortmentMaximumMarks" type="text" class="form-control" name="MaximumMarks" value="0" />
                                  <small class="text-muted">Set '0' if no marks required</small>
                                </div>
                                <div class="col-lg-6">
                                  <label>Set Maximum Time ? </label><br>
                                  <div class="input-group">
                                    <input id="assortmentMaximumTime" type="text" class="form-control" placeholder="Maximum Time Limit" aria-describedby="basic-addon2" value="0">
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
                                  <div class="dropzone dropzone-default dropzone-success" id="assortmentAttachFilesWithQuestion">
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
                        <!-- End Assortment -->

                        <!-- Drag & Drop (5)-->
                        <div id="DragDrop" class="question_type" style="display: none;">

                          <div class="row">
                            <div class="col-lg-6">
                              <h4>Enter Possible Answers</h4>
                            </div>
                            <div class="col-lg-6 mb-10">
                              <button type="button" class="btn btn-danger float-right" data-repeater-create="">
                                <i class="fas fa-plus"></i> <strong>Add New Question/Answer</strong>
                              </button>
                            </div>
                          </div>

                          <div class="table-responsive">
                            <table class="table table-borderless" data-repeater-list="">
                              <tr class="text-center">
                                <th colspan="2">Questions</th>
                                <th colspan="2">Answers</th>
                                <th rowspan="2" class="align-middle">Remove</th>
                              </tr>
                              <tr class="text-center">
                                <td class="font-weight-bolder">Image</td>
                                <td class="font-weight-bolder">Text</td>
                                <td class="font-weight-bolder">Image</td>
                                <td class="font-weight-bolder">Text</td>
                              </tr>
                              <!-- insert new choices here -->
                            </table>
                          </div>
                          <hr>

                          <div class="row">
                            <div class="col-lg-7">
                              <div class="form-group row">

                                <div class="col-lg-4">
                                  <label> Randomize Options <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want randomized choices for every student, please turn this value ON."></i></label>
                                  <input id="dragDropRandomizeOptions" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want while answer if students can upload attachment, please turn this option ON."></i></label>
                                  <input id="dragDropAllowAttach" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Partial Credit <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want to enable partial credit, please turn this option ON."></i></label>
                                  <input id="dragDropAllowPartialCredit" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                              </div>
                              <div class="form-group row">
                                <div class="col-lg-5">
                                  <label>Display Type</label><br>
                                  <select id="dragDropDisplayType" class="form-control select2 is-valid w-100" name="display_type">
                                    <option value="image">Image Matching</option>
                                    <option value="line">Line Matching</option>
                                  </select>
                                </div>
                                <div class="col-lg-3">
                                  <label>Maximum Marks ? </label><br>
                                  <input id="dragDropMaximumMarks" type="text" class="form-control" name="MaximumMarks" value="0" />
                                  <small class="text-muted">Set '0' if no marks required</small>
                                </div>
                                <div class="col-lg-4">
                                  <label>Set Maximum Time ? </label><br>
                                  <div class="input-group">
                                    <input id="dragDropMaximumTime" type="text" class="form-control" placeholder="Maximum Time Limit" aria-describedby="basic-addon2" value="0">
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
                                  <div class="dropzone dropzone-default dropzone-success" id="dragDropAttachFilesWithQuestion">
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
                        <!-- End True False -->

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

                        <!-- fill spaces (7) -->
                        <div id="FillSpace" class="question_type" style="display: none;">

                          <p class="note text-center">If You Want to Make a Space, Just Write 3 Underscore (___)</p>

                          <div class="row">
                            <div class="col-12 text-center">
                              <h4>Enter Answers</h4>
                            </div>
                          </div>

                          <div class="fillSpaceInputs">

                          </div>

                          <hr>

                          <div class="row">
                            <div class="col-lg-7">
                              <div class="form-group row">

                                <div class="col-lg-4">
                                  <label> Randomize Options <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want randomized choices for every student, please turn this value ON."></i></label>
                                  <input id="fillSpaceRandomizeOptions" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Attachment(s) <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want while answer if students can upload attachment, please turn this option ON."></i></label>
                                  <input id="fillSpaceAllowAttach" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                                <div class="col-lg-4">
                                  <label> Allow Partial Credit <i class="far fa-question-circle fa-1x text-primary" data-container="body" data-toggle="popover" data-placement="top" data-content="If you want to enable partial credit, please turn this option ON."></i></label>
                                  <input id="fillSpaceAllowPartialCredit" data-switch="true" type="checkbox" checked="checked" data-on-color="primary" data-size="medium" />
                                </div>
                              </div>
                              <div class="form-group row">
                                <div class="col-lg-6">
                                  <label>Maximum Marks ? </label><br>
                                  <input id="fillSpaceMaximumMarks" type="text" class="form-control" name="MaximumMarks" value="0" />
                                  <small class="text-muted">Set '0' if no marks required</small>
                                </div>
                                <div class="col-lg-6">
                                  <label>Set Maximum Time ? </label><br>
                                  <div class="input-group">
                                    <input id="fillSpaceMaximumTime" type="text" class="form-control" placeholder="Maximum Time Limit" aria-describedby="basic-addon2" value="0">
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
                                  <div class="dropzone dropzone-default dropzone-success" id="fillSpaceAttachFilesWithQuestion">
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
                        <!-- End fill spaces -->

                        <!-- Audio/Video (8) -->
                        <!-- <div id="Audio/Video" class="question_type" style="display: none;">

                                </div> -->
                        <!-- End Audio/Video -->

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
        <div class="modal-header">
          <h5 class="modal-title" id="previewModalLabel">Preview Box</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <i aria-hidden="true" class="ki ki-close"></i>
          </button>
        </div>
        <div class="modal-body" data-scroll="true">
          <div class="preview_body">
          </div>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-light-primary font-weight-bold text-center closePreview" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>


  <?php require_once './HeaderRightTopPanel.php'; ?>



  <!--end::Global Config-->

  <?php require_once './scripts.php'; ?>

  <!-- begin:: jkanban -->
  <script src="ahmed/script/jkanban.min.js" type="text/javascript"></script>
  <!-- end:: jkanban -->

  <!-- begin:: Ahmed's Script -->
  <script src="ahmed/script/script.js" type="text/javascript"></script>
  <!-- end:: Ahmed's Script -->


  <script src="assets/custom/js/CreateQuestion.js" type="text/javascript"></script>
  <!--end::Page Scripts-->
</body>
<!--end::Body-->

</html>