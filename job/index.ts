import {DailyDataStatisticsJob} from "./daily-data-statistics-job";
import {RealtimeDataStatisticsJob} from "./realtime-data-statistics-job";

export const schedules = [
    DailyDataStatisticsJob,
    RealtimeDataStatisticsJob,
];