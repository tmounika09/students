$(document).ready(function(){
    deleteInit();
    
    
})
function deleteInit(){
    
   $(document).on("click", ".btn-delete", function(){
       studentId=jQuery(this).attr("data-student-id");
       console.log(studentId);
       studentname=jQuery(this).attr("data-student-name");
       console.log(studentname);
       $("#confirmDelete").find("#name").text(studentname);
       $("#confirmDelete").find("#studentId").text(studentId);
       $("#confirmDelete").modal("show");
       
       
    })
    $(document).on("click","#confirmDelete #yesBtn", function(){
        studentId=$("#confirmDelete").find("#studentId").text();
        deleteStudent(studentId);
    })
   }

function deleteStudent(studentId){
        //TODO: write an API call to delete the student with method delete
    $.ajax({
        url:"https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+studentId+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
        type: "DELETE",
        success: function(){
        $("#confirmDelete").modal("hide");  
            location.reload();
        },
        error:function(){
            
        }
        
    })
}

//confirmation using defatlul javascript function
// we will create a popup asking for confirmation 
// we will use popup provided by bootstrap(known as modal) for confirmation

////$.ajax( { url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+id+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
//		  data: JSON.stringify( student ),
//		  type: "DELETE",
//		  contentType: "application/json" } );