
class FormValidation {
    formValues = {
        email: "",
        password: "",
        re_password: "",
        fname: "",
        lname: "",
        contact: "",
        gender: "",
        country: "",
        checked: "",
        newsletter: ""
    }

    errorValues = {
        emailErr: "",
        passwordErr: "",
        re_passwordErr: "",
        fnameErr: "",
        lnameErr: "",
        contactErr: "",
        genderErr: "",
        countryErr: "",
        checkedErr: "",
        newsletterErr: ""
    }

    showErrorMsg(index, msg) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.add('error')
        form_group.getElementsByTagName('span')[0].textContent = msg
    }

    showSuccessMsg(index) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.remove('error')
        form_group.classList.add('success')

    }

    getInputs() {
        this.formValues.email = document.getElementById('email').value.trim()
        this.formValues.password = document.getElementById('password').value.trim()
        this.formValues.re_password = document.getElementById('password2').value.trim()
        this.formValues.fname = document.getElementById('fname').value.trim()
        this.formValues.lname = document.getElementById('lname').value.trim()
        this.formValues.contact = document.getElementById('contact').value.trim()
        this.formValues.gender = document.querySelectorAll('input[name="gender"]:checked');
        this.formValues.country = document.getElementById('country').value.trim()
        this.formValues.checked = document.querySelector('input[name="agree"]:checked')
        this.formValues.newsletter = document.querySelector('input[name="news"]:checked')

    }

    validateEmail() {
        const regExp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/
        if (this.formValues.email === "") {
            this.errorValues.emailErr = "* Please Enter valid Email"
            this.showErrorMsg(0, this.errorValues.emailErr)
        } else if (!(regExp.test(this.formValues.email))) {
            this.errorValues.emailErr = "* Invalid Email"
            this.showErrorMsg(0, this.errorValues.emailErr)
        } else {
            this.errorValues.emailErr = ""
            this.showSuccessMsg(0)
        }
    }

    validatePassword() {
        if (this.formValues.password === "") {
            this.errorValues.passwordErr = "* Please Provide a Password"
            this.showErrorMsg(1, this.errorValues.passwordErr)
        } else if (this.formValues.password.length <= 4) {
            this.errorValues.passwordErr = "* Password must be atleast 5 Characters"
            this.showErrorMsg(1, this.errorValues.passwordErr)
        } else {
            this.errorValues.passwordErr = ""
            this.showSuccessMsg(1)
        }
    }

    validateConfirmpassword() {
        if (this.formValues.re_password === "") {
            this.errorValues.re_passwordErr = "* Invalid Confirm Password"
            this.showErrorMsg(2, this.errorValues.re_passwordErr)
        } else if (this.formValues.re_password === this.formValues.password && this.errorValues.passwordErr === "") {
            this.errorValues.re_passwordErr = ""
            this.showSuccessMsg(2)
        } else if (this.errorValues.passwordErr) {
            this.errorValues.re_passwordErr = "* An error occurred in Password Field"
            this.showErrorMsg(2, this.errorValues.re_passwordErr)
        } else {
            this.errorValues.re_passwordErr = "* Password Must Match"
            this.showErrorMsg(2, this.errorValues.re_passwordErr)
        }
    }

    validateFirstName() {
        const regExp = /^[a-zA-Z]/;
        if (this.formValues.fname === "") {
            this.errorValues.fnameErr = "* Please Enter Your Name"
            this.showErrorMsg(3, this.errorValues.fnameErr)
        } else if (!(regExp.test(this.formValues.fname))) {
            this.errorValues.fnameErr = "* Please enter valid name"
            this.showErrorMsg(3, this.errorValues.fnameErr)
        } else if (this.formValues.fname.length <= 2) {
            this.errorValues.fnameErr = "* Username minimum 3 Characters"
            this.showErrorMsg(3, this.errorValues.fnameErr)
        } else {
            this.errorValues.fnameErr = ""
            this.showSuccessMsg(3)
        }
    }
    
    validateLastName() {
        const regExp = /^[a-zA-Z]/;
        if (this.formValues.lname === "") {
            this.errorValues.lnameErr = "* Please Enter Your Name"
            this.showErrorMsg(4, this.errorValues.lnameErr)
        } else if (!(regExp.test(this.formValues.lname))) {
            this.errorValues.lnameErr = "* * Please enter valid name"
            this.showErrorMsg(4, this.errorValues.lnameErr)
        } else if (this.formValues.lname.length > 14) {
            this.errorValues.lnameErr = "* Username should not exceeds 14 Characters"
            this.showErrorMsg(4, this.errorValues.lnameErr)
        } else {
            this.errorValues.lnameErr = ""
            this.showSuccessMsg(4)
        }
    }
    validateContact() {
        const contact = /^\d{10}$/;
        if (this.formValues.contact === "") {
            this.errorValues.contactErr = "* Please enter valid number"
            this.showErrorMsg(5, this.errorValues.contactErr)
        } else if (contact.test(this.formValues.contact)) {
            this.errorValues.contactErr = ""
            this.showSuccessMsg(5)
        } else {
            this.errorValues.contactErr = "* invalid phone number"
            this.showErrorMsg(5, this.errorValues.contactErr)
        }
    }

    validateGender() {
        if (!this.formValues.gender.length) {
            this.errorValues.genderErr = "* Please choose valid gender"
            this.showErrorMsg(6, this.errorValues.genderErr)
            return false;
        } else {
            this.errorValues.genderErr = ""
            this.showSuccessMsg(6)
        }
    }

    validateCountry() {
        if ("Default" == this.formValues.country) {
            this.errorValues.countryErr = "* Please choose valid country"
            this.showErrorMsg(7, this.errorValues.countryErr)
        }
        else {
            this.errorValues.countryErr = ""
            this.showSuccessMsg(7)
        }
    }

    validateChecked() {
        if (!this.formValues.checked) {
            this.errorValues.checkedErr = "* Please agree terms and condition"
            this.showErrorMsg(8, this.errorValues.checkedErr)
            return false;
        } else {
            this.errorValues.checkedErr = ""
            this.showSuccessMsg(8)
        }
    }

    validateNews() {

        if (!this.formValues.newsletter) {
            this.errorValues.newsletterErr = "* Please select  and conditon"
            this.showErrorMsg(9, this.errorValues.newsletterErr)
            return false;
        } else {
            this.errorValues.newsletterErr = ""
            this.showSuccessMsg(9)
        }
    }

    alertMessage() {
        const { emailErr, passwordErr, re_passwordErr, fnameErr, lnameErr, contactErr, genderErr, countryErr,
            checkedErr, newsletterErr } = this.errorValues
        if (emailErr === "" && passwordErr === "" && re_passwordErr === "" && fnameErr === "" && lnameErr === "" && contactErr === ""
            && genderErr === "" && countryErr === "" && checkedErr === "" && newsletterErr === "") {
            swal("Registration Successful", "ThankYou , " + this.formValues.email, "success").then(() => {
                console.log(this.formValues)
                this.removeInputs()
            })
        } else {
            swal("Give Valid Inputs", "Click ok to Continue", "error")
        }
    }

    removeInputs() {
        const form_groups = document.getElementsByClassName('form-group')
        Array.from(form_groups).forEach(element => {
            element.getElementsByTagName('input')[0].value = ""
            element.getElementsByTagName('span')[0].textContent = ""
            element.getElementsByTagName('select')[0].value = ""
            element.classList.remove('success')
        })
    }
}

const ValidateUserInputs = new FormValidation();
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault()
    ValidateUserInputs.getInputs()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePassword()
    ValidateUserInputs.validateConfirmpassword()
    ValidateUserInputs.validateFirstName()
    ValidateUserInputs.validateLastName()
    ValidateUserInputs.validateContact()
    ValidateUserInputs.validateGender()
    ValidateUserInputs.validateCountry()
    ValidateUserInputs.validateChecked()
    ValidateUserInputs.validateNews()
    ValidateUserInputs.alertMessage()
})
