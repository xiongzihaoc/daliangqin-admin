package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 转诊状态
 *
 * @author Chen
 * @date 2021/05/10
 */
@Getter
@ApiModel(value = "转诊状态")
public enum TransferStatus {
    /**
     * 转诊中
     */
    @ApiModelProperty(value = "转诊中")
    ING,
    /**
     * 已转诊
     */
    @ApiModelProperty(value = "已转诊")
    END,
    /**
     * 待转诊
     */
    @ApiModelProperty(value = "待转诊")
    WAIT,
    /**
     * 未转诊
     */
    @ApiModelProperty(value = "未转诊")
    NONE
}
