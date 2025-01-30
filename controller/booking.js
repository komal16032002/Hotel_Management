
const pool = require("../config/db.config")
exports.bookRoom = async (req, res) => {
    try {
        const { guest_name, guest_email, guest_contact, check_in_date, check_out_date } = req.body;
        if (!guest_name || !guest_email || !guest_contact || !check_in_date || !check_out_date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const query = `SELECT * FROM room WHERE isAvailable = TRUE LIMIT 1`;
        const [rooms] = await pool.query(query);
       
        if (rooms.length === 0) {
            return res.status(500).json({ message: 'No rooms available' });
        }
        let insert= `INSERT INTO room_book (userName, email, mobileNumber, check_in_time, check_out_time,room_no) VALUES ( ?, ?, ?, ?, ?,?)`;
      
        let [booking_id]=  await pool.query(
            insert,
            [guest_name, guest_email, guest_contact, check_in_date, check_out_date,rooms[0].roomNumber]
        );
       await pool.query(`update room set isAvailable = 0 where roomNumber='${rooms[0].roomNumber}'`)
        res.status(201).json({
            message: 'Room booked successfully',
            bookingId: booking_id.insertId,
            guest_name: guest_name,
            room_number: rooms[0].roomNumber,
        });
 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }  
    
    
};
exports.userDetail = async (req, res) => {
    try {
        const { guest_email } = req.body;
        if (!guest_email) {
            return res.status(400).json({ message: 'Please provide email id' });
        }
        let query = `select * from room_book where email =?`;
        const [result] = await pool.query(query, [guest_email]);
        if (result.length == 0) {
            return res.status(500).json({ message: 'Email is id not valid' });
        }
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}
exports.allUser = async (req, res) => {
    try {
        let query = `select * from room_book`;
        const [result] = await pool.query(query);
        if (result.length == 0) {
            return res.status(500).json({ message: 'no one user are booked room yet' });
        }
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

exports.updateDetail = async (req, res) => {
    try {
        const { guest_email, check_in_date, check_out_date } = req.body;
        if (!guest_email || !check_in_date || !check_out_date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        let insert = `update room_book set check_in_time = ?,check_out_time = ? where email=?`
        await pool.query(
            insert,
            [check_in_date, check_out_date,guest_email]
        );
        let query = `select * from room_book where email =?;`
        const [result] = await pool.query(query, [guest_email]);
        res.status(201).json(result);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { guest_email} = req.body;
        if ( !guest_email) {
            return res.status(400).json({ message: 'Please provide email id' });
        }
        let query = `select * from room_book where email =?`;
        const [result] = await pool.query(query, [guest_email]);
        if (result.length == 0) {
            return res.status(500).json({ message: 'Email is id not valid' });
        }
        let deletQ = `delete from room_book where email =?;`
        await pool.query(
            deletQ,
            [ guest_email]
        );
        let test = await pool.query(`update room set isAvailable = 1 where roomNumber='${result[0].room_no}'`)
        console.log(test)
        res.status(201).json({
            message: 'booking canceled',
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






