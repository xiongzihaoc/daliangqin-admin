package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * <p>
 * 设备类型
 * </p>
 *
 * @author Qning
 * @since 2021/5/24
 */
@Getter
@ApiModel(value = "设备类型")
public enum DetectType {
    @ApiModelProperty(value = "血压仪")
    BLOOD_PRESSURE_METER,
    @ApiModelProperty(value = "血糖仪")
    GLUCOSE_METER,
    @ApiModelProperty(value = "心率")
    HEART_RATE
}
