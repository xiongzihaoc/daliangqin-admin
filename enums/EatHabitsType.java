package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 饮食习惯类型
 *
 * @author Chen
 */
@Getter
@ApiModel(value = "饮食习惯类型")
public enum EatHabitsType {
    /**
     * 清淡
     */
    @ApiModelProperty("清淡")
    LIGHT,
    /**
     * 高盐
     */
    @ApiModelProperty("高盐")
    HIGH_SALT,
    /**
     * 高脂
     */
    @ApiModelProperty("高脂")
    HIGH_FAT,
    /**
     * 高糖
     */
    @ApiModelProperty("高糖")
    HIGH_GLUCOSE
}
