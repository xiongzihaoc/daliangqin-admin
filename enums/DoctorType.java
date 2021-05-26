package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * <p>
 * 医生类型
 * </p>
 *
 * @author wanzicong
 * @since 2021/5/8
 */
@ApiModel(value = "医生类型")
public enum DoctorType {
    @ApiModelProperty(value = "医师")
    PHYSICIAN,
    @ApiModelProperty(value = "主治医师")
    ATTENDING_PHYSICIAN,
    @ApiModelProperty(value = "副主任医师")
    ASSOCIATE_CHIEF_PHYSICIAN,
    @ApiModelProperty(value = "主任医师")
    CHIEF_PHYSICIAN
}
