package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * <p>
 * 性别
 * </p>
 *
 * @author wanzicong
 * @since 2021/5/8
 */
@ApiModel(value = "性别类型")
public enum GenderType {
    @ApiModelProperty(value = "女性")
    FEMALE,
    @ApiModelProperty(value = "男性")
    MALE
}
