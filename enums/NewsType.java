package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 新闻分类
 *
 * @author Chen
 */
@Getter
@ApiModel(value = "新闻分类")
public enum NewsType {
    @ApiModelProperty(value = "医生端")
    DOCTOR,
    @ApiModelProperty(value = "病人端")
    PATIENT
}
