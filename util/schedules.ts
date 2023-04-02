import {schedules} from "../job";

const ScheduleHelper = {
    /**
     *
     * @param jobName 任务名称
     * @param rule 规则
     * @param callback 回调函数
     */
    // createScheduleJob(jobName: string, rule: schedule.RecurrenceRule, callback: () => void) {
    //     rule.tz = "Asia/Shanghai";
    //     return () => {
    //         schedule.scheduleJob(jobName, rule, callback);
    //     }
    // },

    /**
     * 启动所有定时任务
     */
    startAllSchedules() {
        schedules.forEach(schedule => {
            schedule();
            console.log(`定时任务: ${schedule.name} 已启动`)
        });
    }
}

export default ScheduleHelper;