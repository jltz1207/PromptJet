export default class TimeUtils{
    static currentHKT = () => {
        const now = new Date();
        const hktOffset = 8 * 60 * 60 * 1000; // HKT is UTC+8
        return new Date(now.getTime() + hktOffset);
    }
}

//static class vs singleton instance
// export the class directly, no need to declare any instance