package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 有和无
 *
 * @author Chen
 * @date 2021/5/22
 */
@Getter
@ApiModel(value = "有和无")
public enum HaveType {
    /**
     * 有
     */
    @ApiModelProperty("有")
    HAVE,
    /**
     * 无
     */
    @ApiModelProperty("无")
    NONE
}
