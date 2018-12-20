// login logout btns
let login_li = document.getElementById("login_li");
let logout_li = document.getElementById("logout_li");

let reg_btn=document.getElementById("reg_btn");
let tbody=document.getElementById("tbody");
let wrap=document.getElementById("wrap");

// window load
let arr=[];
let dummy=56;
window.addEventListener("load",async()=>
{
    firebase.auth().onAuthStateChanged(async (data)=>
    {
        if(data)
        {
            login_li.style.display="none";
       logout_li.style.display="block";

     
     let db= await firebase.database().ref();
     db.child("donors").once("value",(donors)=>
     {
        dummy=donors.val();
        
    

     for(var key in dummy)
        {
         
         arr.push(dummy[key]);
        }
        console.log(arr)
        
    
     }).then(()=>
     {
        for(let i=0;i<arr.length;i++)
        {
            if(i%2==1)
            {
            tbody.innerHTML+=`<tr class="danger">
            <td>${i+1}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].blood_grp}</td>
            <td>${arr[i].address}</td>
            <td>${arr[i].number}</td>
            <td>${arr[i].email}</td>
            <td>${arr[i].age}</td>
          </tr>`;
            }
            else
            {
                tbody.innerHTML+=`<tr class="warning">
            <td>${i+1}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].blood_grp}</td>
            <td>${arr[i].address}</td>
            <td>${arr[i].number}</td>
            <td>${arr[i].email}</td>
            <td>${arr[i].age}</td>
          </tr>`;
            }
        }
     })
    }
    else
    {
       wrap.innerHTML=`<h2 class="jumbotron" style="background-color: rgb(191, 3, 15);color:white;text-align:center;">Login to continue<h2>`;
       login_li.style.display="block";
       logout_li.style.display="none";

    }

})
    

    // authentication check
    
   
    
})

// logout button


function logout()
{
    firebase.auth().signOut()
    .then(() => {
        localStorage.setItem("user",JSON.stringify({user:"null"}));

        swal({
            title: "Congratulations",
            text: "Successfully LoggedOut!",
            icon: "success",
            })
          .then((data) => {
            if (data) {
                window.location = "../index.html";
          }
        });
       
        // Sign-out successful.
    }).catch((error) => {
        let message = error.message;
        swal({
                title: "ERROR",
                text: errorMessage,
                icon: "warning",
                })
        // An error happened.
    });

}



// registration form pop up button

reg_btn.addEventListener("click",()=>
{
    firebase.auth().onAuthStateChanged((reg)=>
    {
        if(reg)
        {
            firebase.database().ref().child(reg.uid).once("value",(d)=>
            {
                if(d.val())
                {
                swal({
                    
                        title:"ERROR",
                        text:"You have already registered yourself!",
                        icon:"warning"
                })
            }
            else
            {
                swal(
                    {
                        title:"success",
                        text:"you can further proceed",
                        icon:"success"
                    }
                ).then(()=>
                {
                    location.assign("../pages/registration.html");
                })
            }
            })
            
        }
        else
        {
            swal(
                {
                    title:"success",
                    text:"you can further proceed",
                    icon:"success"
                }
            )

        }

    })
})

// back button
// let back_btn=document.getElementById("back_btn");
// back_btn.addEventListener()
// window.addEventListener("load", async()=>
// {

//     let user=await localStorage.getItem("user");
//     let data=JSON.parse(user)
//     if(data.user!=="null")
//     {
//     console.log(data.user.email);
//     down.innerHTML=`<h2 class="jumbotron">${data.user.email}</h2>`;
//     logout_li.style.display="block";
//     login_li.style.display="none";
//     }
//     else
//     {   console.log("errooro")
//         down.innerHTML=`<h2 class="jumbotron">Login first</h2>`;
//         logout_li.style.display="none";
//         login_li.style.display="block";
//     }
// }
// );