const express = require('express')
const router = express.Router()
const employeeController = require('../controller/employeesController')


//POST Request
router.post("/newEmployee", employeeController.createEmployee)
//Patch Request
router.patch("/updateEmployee/:username", employeeController.updateEmployee)
//Delete Requess
router.delete("/deleteEmployee/:username", employeeController.deleteEmployee)
router.delete("/deleteAllEmployees", employeeController.deleteAllEmployees)
//GET Requests
router.get("/getEmployee/:username", employeeController.getEmployee)
router.get("/getAllEmployees", employeeController.getAllEmployees)



module.exports = router;