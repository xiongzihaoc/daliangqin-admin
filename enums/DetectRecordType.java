package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * <p>
 * 设备记录来源
 * </p>
 *
 * @author Qning
 * @since 2021/5/21
 */
@ApiModel(value = "设备记录来源")
public enum DetectRecordType {
    @ApiModelProperty(value = "手动录入")
    MANUAL,
    @ApiModelProperty(value = "设备检测")
    DETECTION
}
