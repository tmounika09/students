$(document).ready(function () {
    createInit();

})

function createInit() {
    jQuery("#createBtn").click(function () {
        captureCreateFormValues();

    })

}

function captureCreateFormValues() {
    student = {
        name: jQuery("#name").val(),
        class: jQuery("#class").val(),
        rollno:jQuery("#rollno").val(),
        marks: {
            english: jQuery("#english").val(),
            hindi: jQuery("#hindi").val(),
            maths: jQuery("#maths").val(),
            science: jQuery("#science").val(),
            social: jQuery("#social").val(),
        },

    };
    console.log("student",student);
    $.ajax( { url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
		  data: JSON.stringify( student ),
		  type: "POST",
		  contentType: "application/json" } );

}
