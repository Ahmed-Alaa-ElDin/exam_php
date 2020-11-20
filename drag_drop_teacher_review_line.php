<!DOCTYPE html>
<html lang="en">
<!--begin::Head-->

<head>
    <meta charset="utf-8" />
    <title>School Name XXXXXXX | Page Name XXXXX</title>
    <meta name="description" content="Page with empty content" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <?php require_once './style.php'; ?>
    <style>
        .max-h-40px {
            max-height: 40px !important;
        }

        .preview_options .row {
            padding: 10 0px;
            display: flex;
        }
    </style>

    <!-- begin:: Ahmed's style -->
    <link rel="stylesheet" href="ahmed_teacher_review/style/style.css">
    <!-- end:: Ahmed's style -->


</head>
<!--end::Head-->

<!--begin::Body-->

<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading drag_drop">

    <!-- loading image  -->
    <div id="loading">
        <img id="loading-image" src="ahmed_teacher_review/img/waiting.gif" alt="Loading..." />
    </div>

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
                <div id="kt_header" class="header  header-fixed " data-html2canvas-ignore="true">
                    <?php require_once 'topheader.php'; ?>
                </div>
                <!--end::Header-->

                <!--begin::Content-->
                <div class="content  d-flex flex-column flex-column-fluid" id="kt_content">
                    <!--begin::Subheader-->
                    <div class="subheader py-2 py-lg-6  subheader-solid " id="kt_subheader" data-html2canvas-ignore="true">
                        <div class=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                            <!--begin::Info-->
                            <div class="d-flex align-items-center flex-wrap mr-1">

                                <!--begin::Page Heading-->
                                <div class="d-flex align-items-baseline flex-wrap mr-5">
                                    <!--begin::Page Title-->
                                    <h5 class="text-dark font-weight-bold my-1 mr-5">
                                        Page Title </h5>
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

                            <div class="col-lg-12">

                                <div class="card card-custom" id="answer">

                                    <div class="card-header flex-wrap py-5">
                                        <div class="card-title">
                                            <h3 class="card-label">
                                                English - Exam
                                                <div class="text-muted pt-2 font-size-sm">First Term Final Exam</div>
                                            </h3>

                                        </div>
                                        <!-- <div class="card-toolbar">
                                            begin::Timmer

                                            <h2 class="text-danger text-right font-size-h1">
                                                <div class="countdown"></div>

                                            </h2>

                                            end::Time
                                        </div> -->

                                    </div>


                                    <div class="card-body">

                                        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="display:none">
                                            You Have <strong>Less Than 60 seconds</strong>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <!--begin: Datatable-->

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <span class="text-danger">Q - 1/10: </span>
                                                <span class="questionText">

                                                </span>
                                                <br>
                                                <br>
                                                <p style="font-weight:bold;">Further Details</p>
                                                <p class="questionDetails">

                                                </p>
                                                <hr>
                                            </div>

                                            <div class="col-lg-12" id="questionNote">
                                                <h4>Drag and Drop the Equivalent Elements Together</h4>
                                            </div>
                                            <div class="col-lg-9">
                                                <div class="form-group">
                                                    <div class='totalPairs'>

                                                    </div>
                                                </div>
                                                <div class="guide form-group">
                                                    <span class="badge badge-success">Right Answer</span>
                                                    <span class="badge badge-danger">Wrong Answer</span>
                                                </div>
                                                <div class="teacherReview form-group">
                                                    <label for="teacherReview" class="form-label-teacher"> Teacher Review </label>
                                                    <textarea name="teacherReview" class="form-control" id="teacherReview" cols="100" rows="10"></textarea>
                                                </div>
                                            </div>




                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                                <!--begin::Card-->
                                                <div class="card">

                                                    <div class="card-body Stats">

                                                        <div class="row">
                                                            <span class="col-lg-8">Computed Marks</span>
                                                            <span class="col-lg-4 text-right studentMarks">5 of 5</span>

                                                        </div>
                                                        <hr>

                                                        <div class="row">
                                                            <span class="col-lg-8">Teacher Marks</span>
                                                            <input type="number" class="col-lg-4 text-right form-control teacherMarks">

                                                        </div>
                                                        <hr>

                                                        <div class="row">
                                                            <span class="col-lg-8">Maximum Marks</span>
                                                            <span class="col-lg-4 text-right">5</span>

                                                        </div>
                                                        <hr>
                                                        <div class="row">
                                                            <span class="col-lg-8">Maximum Words</span>
                                                            <span class="col-lg-4 text-right">500</span>
                                                        </div>
                                                        <hr>

                                                        <p class="text-dark text-uppercase text-muted">Question Attachment(s)</p>
                                                        <div class="d-flex mt-5">

                                                            <img alt="" class="max-h-40px" src="assets/media/svg/files/jpg.svg">

                                                            <a href="#" class="text-dark mt-5 font-weight-bold text-hover-primary ">Technical Requirements.jpg</a>
                                                            <!--end: Tite-->

                                                        </div>
                                                        <hr>
                                                        <div class="d-flex mt-5">
                                                            <img alt="" class="max-h-40px" src="assets/media/svg/files/pdf.svg">
                                                            <a href="#" class="text-dark mt-5 font-weight-bold text-hover-primary ">Technical.pdf</a>
                                                            <!--end: Tite-->
                                                        </div>
                                                        <hr>
                                                        <div class="d-flex mt-5">
                                                            <img alt="" class="max-h-40px" src="assets/media/svg/files/zip.svg">
                                                            <a href="#" class="text-dark mt-5 font-weight-bold text-hover-primary ">Requirements.zip</a>
                                                            <!--end: Tite-->
                                                        </div>
                                                        <hr>

                                                        <p class="text-dark text-uppercase text-muted">Student Attachment(s)</p>
                                                        <div class="d-flex mt-5">

                                                            <img alt="" class="max-h-40px" src="assets/media/svg/files/jpg.svg">

                                                            <a href="#" class="text-dark mt-5 font-weight-bold text-hover-primary ">Technical Requirements.jpg</a>
                                                            <!--end: Tite-->

                                                        </div>
                                                        <hr>
                                                        <div class="d-flex mt-5">
                                                            <img alt="" class="max-h-40px" src="assets/media/svg/files/pdf.svg">
                                                            <a href="#" class="text-dark mt-5 font-weight-bold text-hover-primary ">Technical.pdf</a>
                                                            <!--end: Tite-->
                                                        </div>
                                                        <hr>
                                                        <div class="d-flex mt-5">
                                                            <img alt="" class="max-h-40px" src="assets/media/svg/files/zip.svg">
                                                            <a href="#" class="text-dark mt-5 font-weight-bold text-hover-primary ">Requirements.zip</a>
                                                            <!--end: Tite-->
                                                        </div>


                                                    </div>




                                                </div>
                                                <!--end:: Card-->
                                            </div>
                                        </div>

                                        <!--end: Datatable-->
                                    </div>

                                    <div class="card-footer">
                                        <div class="row">
                                            <div class="col text-left">
                                                <button type="reset" class="btn btn-primary mr-2">Pervious</button>

                                            </div>
                                            <div class="col text-right">

                                                <button type="reset" class="btn btn-danger" id="submitReview">Submit & Next</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <!--end::Container-->
                        </div>
                        <!--end::Entry-->
                    </div>
                    <!--end::Entry-->
                </div>
                <!--end::Content-->

                <!--begin::Footer-->
                <div class="footer bg-white py-4 d-flex flex-lg-column " data-html2canvas-ignore="true" id="kt_footer">
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





    <?php require_once './HeaderRightTopPanel.php'; ?>



    <!--end::Global Config-->

    <?php require_once './scripts.php'; ?>

    <script src="ahmed_teacher_review/script/DragDropTouch.js" type="text/javascript"></script>
    <script src="ahmed_teacher_review/script/html2canvas.min.js" type="text/javascript"></script>
    <script src="assets/custom/js/question_student.js" type="text/javascript"></script>
    <script src="ahmed_teacher_review/script/darg_drop_line.js" type="text/javascript"></script>
    <!--end::Page Scripts-->
</body>
<!--end::Body-->

</html>