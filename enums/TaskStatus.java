package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 任务状态
 *
 * @author Chen
 * @date 2021/05/10
 */
@Getter
@ApiModel(value = "任务状态")
public enum TaskStatus {
    /**
     * 待完成
     */
    @ApiModelProperty(value = "待完成")
    PENDING,
    /**
     * 完成
     */
    @ApiModelProperty(value = "完成")
    FINISH,
    /**
     * 取消
     */
    @ApiModelProperty(value = "取消")
    CANCEL,
    /**
     * 过期
     */
    @ApiModelProperty(value = "过期")
    OVERDUE
}
