import mongoose from "mongoose";
import timeUtils from '../utils/timeUtils.js'
const userActivityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    email :{
        type: String,
    },
    activityType: {
        type: String,
        required: true,
        enum:['login', 'logout','register', 'forgot_password', 'profile_update','password_change','shortcut_created','shortcut_updated', 'shortcut_deleted', 'prompt_executed']
    },
    isSuccess: {type: Boolean, default: true},
    description: { type: String, trim:true, maxLength:[500, 'Description cannot exceed 500 characters'] },
    timestamp: { type: Date, default: timeUtils.currentHKT() },
    metadata:{
        device: {
            platform: String,
            model:String,
            osVersion: String,
        },
        ipAddress:{type: String}
    }
});

const userActivityLog = mongoose.model('userActivityLog', userActivityLogSchema);
export default userActivityLog;