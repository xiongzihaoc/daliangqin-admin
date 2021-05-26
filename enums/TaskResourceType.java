package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 任务来源
 *
 * @author Chen
 * @date 2021/05/10
 */
@Getter
@ApiModel(value = "任务来源")
public enum TaskResourceType {
    /**
     * 主动创建
     */
    @ApiModelProperty(value = "主动创建")
    INITIATIVE,
    /**
     * 后台创建
     */
    @ApiModelProperty(value = "后台创建")
    ADMIN
}
