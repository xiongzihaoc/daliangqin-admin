package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * <p>
 * 转诊处理类型 枚举
 * </p>
 *
 * @author xiongzhilong
 * @since 2021-05-24
 */
@Getter
@ApiModel(value = "转诊处理")
public enum TransferDealType {
    /**
     * 确认
     */
    @ApiModelProperty("确认")
    CONFIRM,
    /**
     * 拒绝
     */
    @ApiModelProperty("拒绝")
    REFUSE;
}
