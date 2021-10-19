
import request from '@/utils/request'

/**
 * Ai数据分析
 */
export const httpAdminAiAnalysis = {
    // 列表
    getAnalysisList(data) {
        return request({
            url: 'ai/analysis/analysis',
            method: 'get',
            params: data
        })
    },
    // 汇总
    getCallSummary(data) {
        return request({
            url: 'ai/analysis/callSummary',
            method: 'get',
            params: data
        })
    },
    // 通话数据统计
    getJobStats(data) {
        return request({
            url: 'ai/analysis/jobStats/' + data.robotCallJobId,
            method: 'get',
        })
    },
}
