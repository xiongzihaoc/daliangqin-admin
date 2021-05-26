package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 病症类型
 *
 * @author wanzicong
 */
@Getter
@ApiModel(value = "病人状态")
public enum HealthStatus {
    @ApiModelProperty(value = "良好")
    HEALTH,
    @ApiModelProperty(value = "严重")
    SERIOUS,
    @ApiModelProperty(value = "轻微")
    SLIGHT
}
