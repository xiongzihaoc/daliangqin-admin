package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * <p>
 * 病症类型
 * </p>
 *
 * @author Qning
 * @since 2021/5/21
 */
@Getter
@ApiModel(value = "病症类型")
public enum DiseaseType {
    @ApiModelProperty(value = "高血压")
    HIGH_BLOOD,
    @ApiModelProperty(value = "糖尿病")
    DIABETES,
    @ApiModelProperty(value = "心率")
    HEART_RATE
}
