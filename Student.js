url = "http://localhost:8080/college/";
class CollegeManagement {
  constructor(url){
    this.url = url
  }
  editId = "";
  collegeLists = "";

  formValues = {
    nameField: "",
    universityField: "",
    rankField: "",
    inaugurationDateField: "",
    typeField: "",
    placeField: "",
  };

  getInputs() {
    this.formValues.nameField = document.getElementById("name").value;
    this.formValues.universityField =
      document.getElementById("university-name").value;
    this.formValues.rankField = document.getElementById("rank").value;
    this.formValues.inaugurationDateField =
      document.getElementById("date").value;
    for (const radioButton of document.querySelectorAll(
      "input[name='gender']"
    )) {
      if (radioButton.checked) {
        this.formValues.typeField = radioButton.value;
        break;
      }
    }
    this.typeCollege = document.querySelectorAll("input[name='gender']");
    this.formValues.placeField = document.getElementById("district").value;
  }

  async getData() {
    const response = await fetch(this.url);
    const data = await response.json();
    this.collegeLists = `<div class='content'>
    <table class='table'>
    <tr><th>S.No</th>
    <th>Name</th>
    <th>University</th>
    <th>Rank</th>
    <th>Date</th>
    <th>Place</th>
    <th>Type</th>
    <th>Code</th>
    <th>Options</th></tr>`;
    data.forEach((college) => {
      this.collegeLists += `
                 <tr><td></td>
                 <td>${college.name}</td>
                  <td>${college.university}</td>
                  <td>${college.rank}</td>
                  <td>${college.inaugurationDate}</td>
                  <td>${college.place}</td>
                  <td>${college.type}</td>
                  <td>${college.code}</td>
                  <td>
                  <button type='button'class='college edit'
                   onclick="updateCollegeValue(${college.id},'${college.name}','${college.university}',
                   ${college.rank},'${college.inaugurationDate}','${college.place}','${college.type}',
                   '${college.code}')" id='edit'>Edit</button>&nbsp
                  <button type='button' class='college delete' onclick="deleteCollege(${college.id})" 
                  id='delete'>Delete</button>
                  </td>
                  </tr></div>`;
    });
    this.collegeLists += "</table></div>";
    document.getElementById("body").innerHTML = this.collegeLists;
  }

  updateCollegeValue(
    id,
    name,
    university,
    rank,
    inaugurationDate,
    place,
    type
  ) {
    this.editId = id;
    if (type == "MEN_COLLEGE") {
      document.getElementById("men").checked = true;
    } else if (type == "WOMEN_COLLEGE") {
      document.getElementById("female").checked = true;
    } else if (type == "COEDUCATION_COLLEGE") {
      document.getElementById("co-ed").checked = true;
    }
    this.formValues.nameField = name;
    this.formValues.universityField = university;
    this.formValues.rankField = rank;
    this.formValues.placeField = place;
    this.formValues.inaugurationDateField = inaugurationDate;
    this.formValues.typeField = type;
    document.getElementById("head").innerHTML = "Update College Registeration";
    document.getElementById("register").innerHTML = "Update";
    document.getElementById("content").classList.toggle("active");
    document.getElementById("modal").style.display = "block";
  }

  addCollege() {
    fetch(this.url, {
      method: "POST",
      body: JSON.stringify(this.formValues),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        this.successmsg();
        getData();
        location.reload();
      } else {
        this.errormsg();
      }
    });
  }

  deleteCollege(id) {
    fetch(this.url + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        this.successmsg();
        getData();
      } else {
        this.errormsg();
      }
    });
  }

  editCollege(id) {
    fetch(this.url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.formValues),
    }).then((res) => {
      if (res.status === 200) {
        this.successmsg();
        getData();
      } else {
        this.errormsg();
      }
    });
  }

  addData() {
    document.getElementById("content").classList.toggle("active");
    document.getElementById("modal").style.display = "block";
  }

  close() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("content").classList.remove("active");
  }

  registeration() {
    var sub = document.getElementById("register");
    if ("Register" === sub.textContent) {
      this.addCollege();
      document.getElementById("modal").style.display = "none";
      document.getElementById("content").classList.remove("active");
    }
    if ("Update" === sub.textContent) {
      this.editCollege(this.editId);
      document.getElementById("modal").style.display = "none";
      document.getElementById("content").classList.remove("active");
    }
  }

  successmsg() {
    document.getElementById("msg-box").classList.toggle("toast");
    document.getElementById("msg-box").innerHTML = "Succesfull created";
    setTimeout(() => {
      document.getElementById("msg-box").classList.remove("toast");
      document.getElementById("msg-box").innerHTML = "";
    }, 3000);
  }

  errormsg() {
    document.getElementById("msg-box").classList.toggle("error-toast");
    document.getElementById("msg-box").innerHTML = "Something went wrong!!!";
    setTimeout(() => {
      document.getElementById("msg-box").classList.remove("error-toast");
      document.getElementById("msg-box").innerHTML = "";
    }, 3000);
  }
}

const management = new CollegeManagement(url);
management.getData();
document.getElementById("close").onclick = function () {
  management.close();
};
document.getElementById("register").onclick = function () {
  var sub = document.getElementById("register");
    if ("Register" === sub.textContent) {
      management.addCollege();
      document.getElementById("modal").style.display = "none";
      document.getElementById("content").classList.remove("active");
    }
    if ("Update" === sub.textContent) {
      management.editCollege(management.editId);
      document.getElementById("modal").style.display = "none";
      document.getElementById("content").classList.remove("active");
    }
};
document.getElementById("add").onclick = function () {
  management.addData()
};

//  collegeType() {
//   let gender = "";
//   for (const radioButton of this.typeCollege) {
//     if (radioButton.checked) {
//       gender = radioButton.value;
//       break;
//     }
//   }
//   return gender;
// }

// management.addData();
// management.close();
// management.addCollege();
// management.deleteCollege();
// management.editCollege();
// management.errormsg();
// management.successmsg();
// management.registeration();
// management.getInputs();
// management.updateCollegeValue();

// document.getElementById("form").addEventListener("submit", (event) => {
//   event.preventDefault();
//   var sub = document.getElementById("register");
//   if ("Register" === sub.textContent) {
//     addData();
//     document.getElementById("modal").style.display = "none";
//     document.getElementById("content").classList.remove("active");
//     // document.getElementById("form").reset();
//   }
//   if ("Update" === sub.textContent) {
//     editCOllege(editId);
//     document.getElementById("modal").style.display = "none";
//     document.getElementById("content").classList.remove("active");
//     // document.getElementById("form").reset();
//   }

// });
