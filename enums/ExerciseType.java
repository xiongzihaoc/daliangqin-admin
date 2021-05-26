package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 运动习惯类型
 *
 * @author Chen
 * @date 2021/5/22
 */
@Getter
@ApiModel(value = "运动习惯类型")
public enum ExerciseType {
    /**
     * 不运动
     */
    @ApiModelProperty("不运动")
    NONE,
    /**
     * 1-3次
     */
    @ApiModelProperty("1-3次")
    ONE_THREE,
    /**
     * 4-7次
     */
    @ApiModelProperty("4-7次")
    FOUR_SEVEN,
    /**
     * 大于7次
     */
    @ApiModelProperty("大于7次")
    EXCEED_SEVEN
}
