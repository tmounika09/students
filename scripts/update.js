$(document).ready(function(){
    updateinit()
    
})
function updateinit(){
    getStudent();
   jQuery("#updateBtn").click(function(){
       updateStudent();
   }) 
}
function getStudent(){
    console.log(location);
    
    splittedlocation = location.href.split("=");
    id = splittedlocation[1];
    console.log(splittedlocation);
   jQuery.ajax({
       url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+id+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
       method: "GET",
       success:function(response){
           console.log("response", response);
           populateStudentInForm(response);
       },
       error:function(){
           
       }
       
   })
   
   
    
}
function populateStudentInForm(student){
    jQuery("#name").val(student.name);
    jQuery("#class").val(student.class);
    jQuery("#rollno").val(student.rollno);
    jQuery("#english").val(student.marks.english);
     jQuery("#hindi").val(student.marks.hindi);
     jQuery("#maths").val(student.marks.maths);
     jQuery("#science").val(student.marks.science);
     jQuery("#social").val(student.marks.social);
    
}

function updateStudent() {
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
    splittedlocation = location.href.split("=");
    id = splittedlocation[1];
    $.ajax( { url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+id+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
		  data: JSON.stringify( student ),
		  type: "PUT",
		  contentType: "application/json" } );

}

