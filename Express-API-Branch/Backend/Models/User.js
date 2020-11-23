const mongoose = require('mongoose');


const NotificationSchema = mongoose.Schema ({
    notificationRules: {
        overUnderSame: {
            type: String
        },
        typeItem: {
            type: String
        },
        transAmount: {
            type: Number
        },
    }


})

const UserSchema = mongoose.Schema( {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        balance: {
            type: Number,
            default: 0,
            required: true
        },
        transactionRules: {
            overAmount: {
                type: Number
            },
            withinState: {
                type: [String]
            },
            atVendor: {
                type: [String]
            }
        },
        notificationRules: {
            type: [NotificationSchema.notificationRules]
        },
        withinStateRule: {
            type: String
        },
        betweenTimeRule: {
            fromTime: {
                type: String
            },
            toTime: {
                type: String
            }
        }

    }});

module.exports = mongoose.model('Users', UserSchema);
