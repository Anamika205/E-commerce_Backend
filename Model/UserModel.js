const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],

    },
    real_password: {
        type: String,
        default: false

    },
    password: {
        type: String,
        require: true,
        minlength: 8
    }

},
    { timestamps: true }
)
const User = mongoose.model("User", UserSchema);
module.exports = User;