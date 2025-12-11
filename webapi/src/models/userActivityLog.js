import mongoose from "mongoose";
import commonService from "../services/commonService.js";

const userActivityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    activityType: {
        type: String,
        required: true,
        enum:['login', 'logout','register', 'profile_update','password_change','shortcut_created','shortcut_updated', 'shortcut_deleted', 'prompt_executed']
    },
    isSuccess: {type: Boolean, default: true},
    description: { type: String, trim:true, maxLength:[500, 'Description cannot exceed 500 characters'] },
    timestamp: { type: Date, default: commonService.currentHKT() },
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