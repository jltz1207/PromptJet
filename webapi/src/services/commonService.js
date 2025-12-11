class CommonService {
    currentHKT = () => {
        const now = new Date();
        const hktOffset = 8 * 60 * 60 * 1000; // HKT is UTC+8
        return new Date(now.getTime() + hktOffset);
    }
}
const commonService = new CommonService()
export default commonService