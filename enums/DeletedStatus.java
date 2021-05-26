package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 逻辑删除
 *
 * @author Chen
 * @date 2020/05/11
 */
@Getter
@ApiModel(value = "删除枚举")
public enum DeletedStatus {
    /**
     * 显示
     */
    @ApiModelProperty("显示")
    SHOW,
    /**
     * 删除
     */
    @ApiModelProperty("删除")
    DELETE
}
