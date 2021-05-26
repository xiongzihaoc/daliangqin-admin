package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 亲属类型
 *
 * @author wanzicong
 */
@Getter
@ApiModel(value = "亲属类型")
public enum RelativesType {
    @ApiModelProperty("朋友")
    FRIENDS,
    @ApiModelProperty("家人")
    FAMILY,
    @ApiModelProperty("亲戚")
    RELATIVE
}
