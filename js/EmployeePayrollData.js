class EmployeePayrollData {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id
    }

    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (nameRegex.test(name))
            this._name = name;
        else
            throw new Error("Name is incorrect  Rule : 1st letter should in caps,  Should contain min 3 letter");
    }

    get profilePic() {
        return this._profilePic;
    }

    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {

        this._gender = gender;
    }

    get department() {
        return this._department;
    }

    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;
    }

    getTodayDate=()=>{
        var objToday = new Date(),
        dayOfMonth = objToday.getDate(),
        months = new Array('jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear();
        return dayOfMonth + "-" + curMonth + "-" + curYear;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate){
        let currentDate = new Date();
        if (startDate > currentDate) {
            throw new Error("Start date is a future date");
        } else {
            let differnce = Math.abs(currentDate.getTime() - startDate.getTime());
            let date = differnce / (1000 * 60 * 60 * 24);
            if (date > 30) {
                throw new Error("Start date is beyond 30 days");
            }
        }
        this._startDate = startDate;
    }
    
    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" : 
                                this.startDate.toLocaleDateString("en-us", options);
        return "id=" + this.id + "name = " + this.name + ", profilePic = " + this.profilePic + ", gender = " + this.gender + 
        ", department = " + this.department + ", salary = " + this.salary + ", Start Date = " + employeeDate + ", notes = " + this.notes;
    }
}