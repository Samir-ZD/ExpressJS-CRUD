const { json } = require("body-parser");
const Employee = require("../models/employeeModel");

const checkUserExistence = async (req) => {
    try {
        const employeeExist = await Employee.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }],
        });
        if (employeeExist) return true;
        else return false;
    } catch (err) {
        console.log(err);
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const doesEmployeeExist = await checkUserExistence(req);
        if (doesEmployeeExist) {
            return res.status(409).json({ message: "Employee Already Exists" });
        }
        const newEmployee = await Employee.create(req.body);

        res.status(201).json({
            status: "success",
            data: newEmployee,
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        if (req.body.username || req.body.email) {
            return res.status(400).json({
                message: "You're Not Allowed to Update Your Email or Username",
            });
        }
        const updatedEmployee = await Employee.findOneAndUpdate(
            { username: req.params.username },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({
                message: "Employee With Provided Username Does'nt Exist",
            });
        }
        return res.status(200).json({
            message: "Employee Updated Successfully",
            data: updatedEmployee,
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.deleteEmployee = async (req, res) => {
    try {
        const deleteEmployee = await Employee.findOneAndDelete({
            username: req.params.username,
        })
        if (!deleteEmployee) {
            res.status(404).json({ message: "Employee Doesnt Exist" })
        }
        return res.status(200).json({
            message: "Employee Deleted Successfully"
        })
    } catch (err) {
        res.status(500).send({ messgae: err.mssage })
    }
}

exports.deleteAllEmployees = async (req, res) => {
    try {
        const deletedEmployees = await Employee.deleteMany();

        if (deletedEmployees.deletedCount == 0) {
            res.status(404).json(
                {
                    message: "Database is Already Empty",
                    data: deletedEmployees
                }
            )
        }

        return res.status(200).json({ message: "All Employees Deleted Succcessfully" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employeeSELECTQuery = await Employee.findOne({
            username: req.params.username,
            data: this.getEmployee
        })
        if (!employeeSELECTQuery) {
            return res.status(404).json({ message: "Employee Doesn't Exist" })
        }
        return res.status(200).json({ message: "Employee Selected Successfully", employeeSELECTQuery })
    } catch (err) {
        return res.status(500).json({ message: "Error Selecting Employee" })

    }
}

exports.getAllEmployees = async (req, res) => {
    try {
        const employeeSELECTALL = await Employee.find()
        if (!employeeSELECTALL) {
            return res.status(404).json({ message: "Database is Empty" })
        }
        return res.status(200).json({ message: "All Employees Selected Successfully", employeeSELECTALL })

    } catch (err) {
        return res.status(500).json({ message: "Error Selecting All Employees" })

    }
}