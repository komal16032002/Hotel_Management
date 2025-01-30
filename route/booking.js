const bookingController=require("../controller/booking")

module.exports=(app)=>{
    app.post("/hotel/booking",bookingController.bookRoom)
    app.post("/hotel/userDetail",bookingController.userDetail)
    app.post("/hotel/alluserDetail",bookingController.allUser)
    app.post("/hotel/updateuserDetail",bookingController.updateDetail)
    app.post("/hotel/canceluserDetail",bookingController.cancelBooking)


}